import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

type Lang = "no" | "sv" | "da" | "en" | "de" | "nl";
type AlertType = "frost" | "rain" | "drought" | "heat" | "winter" | "spring";

const TITLES: Record<Lang, Record<AlertType, string>> = {
  no: { frost: "❄️ Frostvarsel", rain: "🌧️ Kraftig regn", drought: "☀️ Tørke", heat: "🌡️ Hetebølge", winter: "🍂 Vinterforberedelse", spring: "🌱 Vekk fra vinterdvalen" },
  sv: { frost: "❄️ Frostvarning", rain: "🌧️ Kraftigt regn", drought: "☀️ Torka", heat: "🌡️ Värmebölja", winter: "🍂 Vinterförberedelse", spring: "🌱 Uppvakna efter vintern" },
  da: { frost: "❄️ Frostvarsel", rain: "🌧️ Kraftig regn", drought: "☀️ Tørke", heat: "🌡️ Hedebølge", winter: "🍂 Vinterforberedelse", spring: "🌱 Vågn op efter vinteren" },
  en: { frost: "❄️ Frost warning", rain: "🌧️ Heavy rain coming", drought: "☀️ Drought risk", heat: "🌡️ Heat wave", winter: "🍂 Winter prep time", spring: "🌱 Spring wake-up call" },
  de: { frost: "❄️ Frostwarnung", rain: "🌧️ Starkregen", drought: "☀️ Trockenheit", heat: "🌡️ Hitzewelle", winter: "🍂 Wintervorbereitung", spring: "🌱 Frühjahrsbelebung" },
  nl: { frost: "❄️ Vorstmelding", rain: "🌧️ Zware regenval", drought: "☀️ Droogterisico", heat: "🌡️ Hittegolf", winter: "🍂 Wintervoorbereiding", spring: "🌱 Lente-opwekking" },
};

const MSGS: Record<Lang, Record<AlertType, string>> = {
  no: { frost: "Dekk til sårbare planter i natt", rain: "Snegler og sopprisiko øker — sjekk hagen", drought: "Hagen tørster — tid for grundig vanning", heat: "Vann morgen og kveld, unngå middagssol for sarte planter", winter: "Dekk til, ta inn potteplanter, beskjær roser", spring: "Sjekk om plantene overlevde vinteren og start stellet" },
  sv: { frost: "Täck känsliga växter i natt", rain: "Sniglar och svamprisiko ökar — kolla trädgården", drought: "Trädgården törstar — dags för ordentlig vattning", heat: "Vattna morgon och kväll, skydda känsliga växter från middagssolen", winter: "Täck, ta in krukväxter, beskär rosor", spring: "Kontrollera om växterna överlevde vintern och börja skötseln" },
  da: { frost: "Dæk sårbare planter til i nat", rain: "Snegle og svamperisiko stiger — tjek haven", drought: "Haven tørster — tid til grundig vanding", heat: "Vand morgen og aften, undgå middagssol for sarte planter", winter: "Dæk til, tag potteplanter ind, beskær roser", spring: "Tjek om planterne overlevede vinteren og start plejen" },
  en: { frost: "Cover tender plants tonight", rain: "Slug and disease risk up — check the garden", drought: "Garden is thirsty — time for a deep water", heat: "Water morning and evening, shade tender plants at midday", winter: "Cover up, bring in pots, prune roses", spring: "Check plants after winter and start your care routine" },
  de: { frost: "Empfindliche Pflanzen heute Nacht abdecken", rain: "Schnecken- und Pilzrisiko steigt — Garten kontrollieren", drought: "Der Garten dürstet — gründlich wässern", heat: "Morgens und abends wässern, empfindliche Pflanzen vor Mittagssonne schützen", winter: "Abdecken, Kübelpflanzen reinholen, Rosen schneiden", spring: "Pflanzen nach dem Winter kontrollieren und Pflege starten" },
  nl: { frost: "Dek kwetsbare planten af vannacht", rain: "Slakken- en schimmelrisico stijgt — controleer de tuin", drought: "De tuin heeft dorst — tijd voor grondig water geven", heat: "Water geven ochtend en avond, bescherm kwetsbare planten tegen middagzon", winter: "Afdekken, potten naar binnen, rozen snoeien", spring: "Controleer planten na de winter en start de verzorging" },
};

// These land on a lock screen while the app is closed — the widest audience any
// text in the product gets. Rotated by alert type so a user who gets frost twice
// in a week does not read the same joke twice.
const ASIDES: Record<Lang, string[]> = {
  no: [
    "Plantene sier ingenting. De regner med at du skjønner det.",
    "Jeg maser ikke. Jeg nevner det.",
    "Du hørte det ikke fra meg.",
  ],
  sv: [
    "Växterna säger inget. De utgår från att du fattar.",
    "Jag tjatar inte. Jag nämner det.",
    "Du hörde det inte från mig.",
  ],
  da: [
    "Planterne siger ingenting. De regner med, at du forstår det.",
    "Jeg brokker mig ikke. Jeg nævner det.",
    "Du hørte det ikke fra mig.",
  ],
  en: [
    "The plants are saying nothing. They assume you have noticed.",
    "I am not nagging. I am mentioning.",
    "You did not hear it from me.",
  ],
  de: [
    "Die Pflanzen sagen nichts. Sie gehen davon aus, dass Sie es merken.",
    "Ich dränge nicht. Ich erwähne es.",
    "Sie haben es nicht von mir.",
  ],
  nl: [
    "De planten zeggen niets. Ze gaan ervan uit dat u het doorheeft.",
    "Ik zeur niet. Ik noem het even.",
    "U heeft het niet van mij.",
  ],
};

const ASIDE_INDEX: Record<AlertType, number> = {
  frost: 0, rain: 1, drought: 2, heat: 0, winter: 1, spring: 2,
};

interface UserData {
  token: string;
  lat: number;
  lon: number;
  plants: { name: string; emoji: string }[];
  devils: { name: string; emoji: string; type: string }[];
  lang: string;
  gender: string;
  lastSeen: number;
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    precipitation: number;
    weather_code: number;
  };
  daily: {
    precipitation_sum: number[];
    /* Uten denne kunne frostvarselet aldri vite noe om natten. Jobben så på
       temperaturen i det øyeblikket den våknet, klokka seks om morgenen, og
       sa «dekk til i natt» — om en natt den ikke hadde spurt om. */
    temperature_2m_min: number[];
  };
}

const SUPPORTED_LANGS: Lang[] = ["no", "sv", "da", "en", "de", "nl"];

function isLang(l: string): l is Lang {
  return SUPPORTED_LANGS.includes(l as Lang);
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  /* To kjøringer med hver sin jobb.
     Morgenen tar det som gjelder dagen: regn, tørke, hete, årstidens
     forberedelser. Kvelden har én oppgave, og bare én — frost. Skal noen rekke
     å dekke til tomatene, må beskjeden komme før det blir mørkt, ikke klokka
     seks neste morgen når natten er over.
     `force` hopper over tolvtimersregelen, så en rettelse kan prøves på et
     minutt i stedet for et døgn. Hemmeligheten kreves fortsatt. */
  const evening = req.nextUrl.searchParams.get("evening") === "1";
  const force = req.nextUrl.searchParams.get("force") === "1";

  const redis = Redis.fromEnv();
  const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
  const month = new Date().getMonth();

  let processed = 0;
  let sent = 0;
  let cursor = 0;

  do {
    const [nextCursor, keys] = await redis.scan(cursor, { match: "user:*", count: 100 });
    cursor = Number(nextCursor);

    for (const key of keys) {
      processed++;
      const user = await redis.get<UserData>(key);
      if (!user) continue;
      const recentlySeen = user.lastSeen > twelveHoursAgo;

      const lang: Lang = isLang(user.lang) ? user.lang : "en";

      try {
        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${user.lat}&longitude=${user.lon}` +
          `&current=temperature_2m,precipitation,weather_code` +
          `&daily=precipitation_sum,temperature_2m_min&past_days=7&forecast_days=10&timezone=auto`;

        const weatherRes = await fetch(weatherUrl);
        if (!weatherRes.ok) continue;
        const weather: OpenMeteoResponse = await weatherRes.json();

        const temp = weather.current.temperature_2m;
        const precipitation = weather.current.precipitation;
        const dailyPrecip: number[] = weather.daily.precipitation_sum ?? [];
        const past7 = dailyPrecip.slice(0, 7);
        const forecast10 = dailyPrecip.slice(7);
        const rainToday = forecast10[0] ?? 0;
        const recentRain = past7.reduce((a, b) => a + (b ?? 0), 0);

        /* Nattens laveste, ikke temperaturen akkurat nå. Rekkefølgen fra
           Open-Meteo er sju dager bakover, så i dag, så framover — så indeks 8
           er natten som kommer. */
        const dailyMin: number[] = weather.daily.temperature_2m_min ?? [];
        const tonightLow = dailyMin[8] ?? dailyMin[7] ?? temp;

        let alert: { title: string; body: string; type: AlertType } | null = null;

        if (evening) {
          // Kveldskjøringen har én jobb. Alt annet venter til morgenen.
          if (tonightLow < 2) {
            const names = (user.plants ?? []).slice(0, 3).map((p) => p.name).join(", ");
            alert = {
              type: "frost",
              title: TITLES[lang].frost,
              body: `${MSGS[lang].frost}${names ? `: ${names}` : ""} (${Math.round(tonightLow)}°C)`,
            };
          }
        } else if (rainToday > 8 || precipitation > 5) {
          const slugNames = (user.devils ?? [])
            .filter((d) => d.type === "slug")
            .map((d) => d.name)
            .join(", ");
          alert = {
            type: "rain",
            title: TITLES[lang].rain,
            body: `${MSGS[lang].rain}${slugNames ? ` (${slugNames})` : ""}`,
          };
        } else if (recentRain < 5 && temp > 18) {
          const names = (user.plants ?? []).slice(0, 3).map((p) => p.name).join(", ");
          alert = {
            type: "drought",
            title: TITLES[lang].drought,
            body: `${MSGS[lang].drought}${names ? `: ${names}` : ""}`,
          };
        } else if (temp > 28) {
          alert = { type: "heat", title: TITLES[lang].heat, body: MSGS[lang].heat };
        } else {
          // The temperature-driven alerts above are self-correcting anywhere on
          // earth. These two are not: they fire on the calendar, so south of the
          // equator they must be shifted half a year or they arrive backwards —
          // telling someone to wrap up for winter in the middle of their summer.
          const localMonth = user.lat < 0 ? (month + 6) % 12 : month;
          if (localMonth === 9 || localMonth === 10) {
            alert = { type: "winter", title: TITLES[lang].winter, body: MSGS[lang].winter };
          } else if (localMonth === 2 || localMonth === 3) {
            alert = { type: "spring", title: TITLES[lang].spring, body: MSGS[lang].spring };
          }
        }

        if (!alert) continue;

        /* Tolvtimersregelen finnes for å ikke fortelle folk noe de nettopp har
           sett i appen, og den er riktig for råd. Men den var festet til om
           noen ÅPNET appen, ikke til om de vet hva natten bringer — så en som
           huket av en oppgave klokka elleve mistet frostvarselet klokka seks.
           Frost og hete kan drepe over natten. De får avbryte. */
        const mayInterrupt = force || !recentlySeen || alert.type === "frost" || alert.type === "heat";
        if (!mayInterrupt) continue;

        alert.body = `${alert.body}. ${ASIDES[lang][ASIDE_INDEX[alert.type]]}`;

        const pushRes = await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: user.token,
            title: alert.title,
            body: alert.body,
            sound: "default",
          }),
        });

        if (pushRes.ok) sent++;
      } catch {
        // skip user on error
      }
    }
  } while (cursor !== 0);

  return NextResponse.json({ ok: true, run: evening ? "evening" : "morning", forced: force, processed, sent });
}
