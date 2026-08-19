import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// To telefoner, én hage. Rutens hele oppgave er å oppbevare det siste
// dokumentet husholdningen ble enige om, og å nekte å ta imot et som er
// skrevet oppå noe nyere.
//
// Det er med vilje at all sammenslåing skjer på telefonen og ikke her. To
// utgaver av den logikken, én i TypeScript på serveren og én i appen, ville
// blitt uenige i det øyeblikket bare den ene ble oppdatert — og en app som
// ligger ute i App Store er alltid noen uker bak serveren. Serveren er derfor
// en hylle, ikke en dommer.
//
// Bilder er ikke med. Appen legger dem i sitt eget dokumentområde, og en filsti
// på hennes telefon betyr ingenting på din. En plante hun legger til kommer
// derfor uten bilde, og appen sier det rett ut i stedet for å vise en tom ramme.

const TTL = 60 * 60 * 24 * 400;   // fornyes ved hver skriving; en hage som ikke synkroniseres på over et år slipper taket
const MAX_BODY = 2_000_000;
const CODE = /^[a-hjkmnp-tv-z2-9]{12}$/;   // uten 0/o/1/i/l — de leses feil når koden tastes av papir

const doc = (code: string) => `hh:${code}`;
const ver = (code: string) => `hh:${code}:v`;

function auth(req: NextRequest) {
  const appKey = process.env.APP_SHARED_SECRET;
  return !!appKey && req.headers.get("x-app-key") === appKey;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const code = (req.nextUrl.searchParams.get("code") ?? "").toLowerCase();
  if (!CODE.test(code)) return NextResponse.json({ error: "Bad code" }, { status: 400 });

  const redis = Redis.fromEnv();
  const [stored, v] = await Promise.all([redis.get(doc(code)), redis.get<number>(ver(code))]);
  // v er tallet neste skriving må oppgi. Er hyllen tom, er den 0, og den
  // første telefonen som legger noe der oppgir 0.
  return NextResponse.json({ doc: stored ?? null, version: Number(v ?? 0) });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ error: "Too large" }, { status: 413 });

  let body: { code?: unknown; doc?: unknown; version?: unknown };
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: "Bad JSON" }, { status: 400 }); }

  const code = String(body.code ?? "").toLowerCase();
  if (!CODE.test(code)) return NextResponse.json({ error: "Bad code" }, { status: 400 });

  const d = body.doc as { data?: { gardens?: unknown }; meta?: unknown } | undefined;
  if (!d || !d.meta || !Array.isArray(d.data?.gardens)) {
    return NextResponse.json({ error: "Bad document" }, { status: 400 });
  }
  const version = Number(body.version);
  if (!Number.isInteger(version) || version < 0) return NextResponse.json({ error: "Bad version" }, { status: 400 });

  /* Kom begge hjem samtidig og åpnet appen i samme sekund, ville den ene
     skrevet oppå den andre uten at noen merket det — og en tapt endring er
     nøyaktig den feilen denne funksjonen ikke har lov til å gjøre. Derfor
     oppgir telefonen hvilken utgave den bygget videre på, og skrivingen går
     bare gjennom hvis hyllen fortsatt står på den. Ellers får den 409, henter
     på nytt, slår sammen igjen og prøver en gang til. */
  const cas = `
    local cur = tonumber(redis.call('GET', KEYS[2]) or '0')
    if cur ~= tonumber(ARGV[2]) then return cur end
    redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[3])
    redis.call('SET', KEYS[2], cur + 1, 'EX', ARGV[3])
    return -1
  `;
  const result = await Redis.fromEnv().eval(cas, [doc(code), ver(code)], [JSON.stringify(d), String(version), String(TTL)]);

  if (Number(result) !== -1) {
    return NextResponse.json({ error: "Stale", version: Number(result) }, { status: 409 });
  }
  return NextResponse.json({ ok: true, version: version + 1 });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const code = (req.nextUrl.searchParams.get("code") ?? "").toLowerCase();
  if (!CODE.test(code)) return NextResponse.json({ error: "Bad code" }, { status: 400 });
  // Å forlate husholdningen sletter det som ligger på hyllen. Begge telefoner
  // beholder hver sin fulle kopi av hagen — det er ingenting å miste her.
  await Redis.fromEnv().del(doc(code), ver(code));
  return NextResponse.json({ ok: true });
}
