import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// Bildene i en husholdning.
//
// Fram til 21. august 2026 fulgte de aldri med: `image` ble strippet av
// `forTheWire()`, og en filsti på hennes telefon betyr ingenting på hans. Det
// var riktig valgt så lenge man tenkte på deling som en engangsflytting. Men to
// voksne som deler en hage deler den hver uke — hun kjøper en plante, tar bilde
// av den, og han fikk en tom ramme. For alltid, ikke bare den første dagen.
//
// Derfor denne hyllen. Den er atskilt fra hagedokumentet med vilje:
//
//   · Er du ikke i en husholdning, forlater ikke ett eneste bilde telefonen.
//     Det er de aller fleste, og for dem står det opprinnelige løftet urørt.
//   · Hagedokumentet bærer fortsatt ingen bilder. Sammenslåingen er uendret,
//     og en telefon som ikke kjenner denne ruten mister ingenting.
//   · Slutter dere å dele, slettes hyllen. Bildene begge har lastet ned, blir
//     liggende hos dem — de er deres.
//
// Ett bilde per forespørsel, med vilje. En hel hage i én kropp lykkes helt
// eller feiler helt over et svakt nett, og en overføring som må begynne forfra
// på første plante er en overføring ingen fullfører.

const TTL = 60 * 60 * 24 * 400;    // som hagen: fornyes ved hver skriving
const MAX_BODY = 1_400_000;        // ett komprimert bilde som base64, med rom å gå på
const MAX_SLOTS = 800;             // en husholdning, ikke et bildearkiv

const CODE = /^[a-hjkmnp-z2-9]{12}$/;
// Nøyaktig de nøklene synkroniseringen selv bruker: plante, plageånd, ønske, og
// dagboknotat som ligger under en eier. Da vet mottakeren hvor bildet hører
// hjemme uten at noe ekstra må sendes med.
const SLOT = /^[pdw]:[A-Za-z0-9_-]{1,64}$|^j:[A-Za-z0-9_-]{1,64}:[A-Za-z0-9_-]{1,64}$/;

const shelf = (code: string, slot: string) => `ph:${code}:${slot}`;
const index = (code: string) => `ph:${code}:i`;

function auth(req: NextRequest) {
  const appKey = process.env.APP_SHARED_SECRET;
  return !!appKey && req.headers.get("x-app-key") === appKey;
}

function codeOf(req: NextRequest): string | null {
  const code = (req.nextUrl.searchParams.get("code") ?? "").toLowerCase();
  return CODE.test(code) ? code : null;
}

/** Uten slot: hva som ligger på hyllen. Med slot: selve bildet.
 *  Telefonen spør først om listen og henter så bare det den mangler — det den
 *  allerede har, skal den ikke laste ned en gang til. */
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const code = codeOf(req);
  if (!code) return NextResponse.json({ error: "Bad code" }, { status: 400 });

  const redis = Redis.fromEnv();
  const slot = req.nextUrl.searchParams.get("slot");

  if (slot === null) {
    const slots = await redis.smembers(index(code));
    return NextResponse.json({ slots: slots ?? [] });
  }

  if (!SLOT.test(slot)) return NextResponse.json({ error: "Bad slot" }, { status: 400 });
  const photo = await redis.get<string>(shelf(code, slot));
  if (!photo) {
    /* Listen sa at det lå her, og det gjorde det ikke. Rydd sporet ut av den,
       ellers spør telefonen om det samme bildet ved hver eneste synkronisering
       til levetiden løper ut. */
    await redis.srem(index(code), slot);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ photo });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ error: "Too large" }, { status: 413 });

  let body: { code?: unknown; slot?: unknown; photo?: unknown };
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: "Bad JSON" }, { status: 400 }); }

  const code = String(body.code ?? "").toLowerCase();
  if (!CODE.test(code)) return NextResponse.json({ error: "Bad code" }, { status: 400 });

  const slot = String(body.slot ?? "");
  if (!SLOT.test(slot)) return NextResponse.json({ error: "Bad slot" }, { status: 400 });

  // Base64, og ingenting annet. En streng med et innhold vi ikke har bedt om
  // har ingenting her å gjøre.
  const photo = body.photo;
  if (typeof photo !== "string" || !photo.length || !/^[A-Za-z0-9+/=\s]+$/.test(photo)) {
    return NextResponse.json({ error: "Bad photo" }, { status: 400 });
  }

  const redis = Redis.fromEnv();

  /* Taket telles før skrivingen, ikke etter. Er hyllen full, sies det rett ut i
     stedet for at bilde nummer 801 forsvinner uten et ord. Et spor som alt er
     lagret får skrive oppå seg selv — et bilde som byttes ut skal ikke telles
     to ganger. */
  const [already, count] = await Promise.all([
    redis.sismember(index(code), slot),
    redis.scard(index(code)),
  ]);
  if (!already && Number(count) >= MAX_SLOTS) {
    return NextResponse.json({ error: "Shelf full", slots: Number(count) }, { status: 507 });
  }

  await redis.set(shelf(code, slot), photo, { ex: TTL });
  await redis.sadd(index(code), slot);
  await redis.expire(index(code), TTL);

  return NextResponse.json({ ok: true });
}

/** Uten slot: hele hyllen tømmes — det er dette som skjer når noen slutter å
 *  dele. Med slot: ett bilde, for en plante som er slettet. */
export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const code = codeOf(req);
  if (!code) return NextResponse.json({ error: "Bad code" }, { status: 400 });

  const redis = Redis.fromEnv();
  const slot = req.nextUrl.searchParams.get("slot");

  if (slot !== null) {
    if (!SLOT.test(slot)) return NextResponse.json({ error: "Bad slot" }, { status: 400 });
    await redis.del(shelf(code, slot));
    await redis.srem(index(code), slot);
    return NextResponse.json({ ok: true });
  }

  const slots = (await redis.smembers(index(code))) ?? [];
  if (slots.length) await redis.del(...slots.map((s: string) => shelf(code, s)));
  await redis.del(index(code));
  return NextResponse.json({ ok: true, cleared: slots.length });
}
