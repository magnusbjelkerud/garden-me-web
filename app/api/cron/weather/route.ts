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
      if (user.lastSeen > twelveHoursAgo) continue;

      const lang: Lang = isLang(user.lang) ? user.lang : "en";

      try {
        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${user.lat}&longitude=${user.lon}` +
          `&current=temperature_2m,precipitation,weather_code` +
          `&daily=precipitation_sum&past_days=7&forecast_days=10&timezone=auto`;

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

        let alert: { title: string; body: string } | null = null;

        if (temp < 2) {
          const names = (user.plants ?? []).slice(0, 3).map((p) => p.name).join(", ");
          alert = {
            title: TITLES[lang].frost,
            body: `${MSGS[lang].frost}${names ? `: ${names}` : ""}`,
          };
        } else if (rainToday > 8 || precipitation > 5) {
          const slugNames = (user.devils ?? [])
            .filter((d) => d.type === "slug")
            .map((d) => d.name)
            .join(", ");
          alert = {
            title: TITLES[lang].rain,
            body: `${MSGS[lang].rain}${slugNames ? ` (${slugNames})` : ""}`,
          };
        } else if (recentRain < 5 && temp > 18) {
          const names = (user.plants ?? []).slice(0, 3).map((p) => p.name).join(", ");
          alert = {
            title: TITLES[lang].drought,
            body: `${MSGS[lang].drought}${names ? `: ${names}` : ""}`,
          };
        } else if (temp > 28) {
          alert = { title: TITLES[lang].heat, body: MSGS[lang].heat };
        } else if (month === 9 || month === 10) {
          alert = { title: TITLES[lang].winter, body: MSGS[lang].winter };
        } else if (month === 2 || month === 3) {
          alert = { title: TITLES[lang].spring, body: MSGS[lang].spring };
        }

        if (!alert) continue;

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

  return NextResponse.json({ ok: true, processed, sent });
}
