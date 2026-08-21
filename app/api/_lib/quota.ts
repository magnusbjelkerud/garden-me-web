import { Redis } from "@upstash/redis";

export type Kind = "plant" | "plant_retry" | "devil" | "ask" | "light" | "equipment" | "weather" | "threats" | "sowing";

export interface KindConfig {
  model: string;
  maxTokens: number;
  /** Credits this action costs the user. 0 = automatic background work, capped instead. */
  cost: 0 | 1;
  /** Only meaningful when cost is 0 — the allowance itself comes from the tier. */
  capWindow: "day" | "month";
}

/** One credit buys one user-initiated AI action, whichever kind it is.
 *  Weather and the shopping/equipment list run on their own without being asked
 *  for, so charging credits for them would drain a balance the user is watching.
 *  They are free but capped — the cap is what protects the margin. */
export const KINDS: Record<Kind, KindConfig> = {
  // 1500 was set when the reply was name, care and a few tasks. It now also
  // carries toxicity, effort, effortSummary and a starter kit with quantities,
  // in languages wordier than English. Too tight, and a truncated reply is
  // worse than a slow one: it costs a credit and delivers nothing.
  plant:     { model: "claude-sonnet-4-6", maxTokens: 3000, cost: 1, capWindow: "month" },
  // "That is definitely not it" — a second look after the user rejects an
  // identification. Free, because charging someone to correct our own mistake
  // is a poor trade: it costs us ~0.3 kr and buys back the moment the app
  // looked wrong. Capped per day so it cannot be farmed as free identification.
  plant_retry: { model: "claude-sonnet-4-6", maxTokens: 3000, cost: 0, capWindow: "day" },
  devil:     { model: "claude-sonnet-4-6", maxTokens: 1000, cost: 1, capWindow: "month" },
  ask:       { model: "claude-sonnet-4-6", maxTokens: 700,  cost: 1, capWindow: "month" },
  light:     { model: "claude-sonnet-4-6", maxTokens: 1000, cost: 1, capWindow: "month" },
  /* Handlelista er den dyreste bakgrunnsjobben vi har, og nesten hele prisen er
     teksten modellen skriver: 8-14 varer med en begrunnelse hver, rundt 1800
     utdata-tokens. Haiku 4.5 koster $1/$5 per million mot Sonnet 4.6 sin $3/$15
     - nøyaktig tre ganger billigere på begge - og "list opp det hagen trenger"
     er en oppgave den skal klare.
     Modellen står i en miljøvariabel og ikke i koden, fordi dette er et bytte
     man må kunne angre uten en utrulling: blir listene tynnere enn de var, er
     EQUIPMENT_MODEL=claude-sonnet-4-6 veien tilbake, og den virker med en gang. */
  equipment: { model: process.env.EQUIPMENT_MODEL ?? "claude-haiku-4-5", maxTokens: 2500, cost: 0, capWindow: "month" },
  weather:   { model: "claude-sonnet-4-6", maxTokens: 800,  cost: 0, capWindow: "day" },
  // Who is likely to eat this plant. Split out of the identification, which
  // it had grown long enough to push past a minute. Free and capped rather
  // than charged: the app asks for this on its own, and a balance the owner
  // is watching should only move when they asked for something.
  // Everything about the year rather than the plant in your hand: the task
  // wheel, who will eat it, and what it falls ill with. The wire name stayed
  // "threats" from when that was all it carried.
  threats:   { model: "claude-sonnet-4-6", maxTokens: 3000, cost: 0, capWindow: "month" },
  // Hva som skal sås denne måneden. Svaret avhenger av klima, måned og hagetype
  // — ikke av hvem som spør — så det deles av alle i samme bøtte og treffer
  // cachen nesten alltid. Derfor gratis, og derfor et romslig tak.
  sowing:    { model: "claude-sonnet-4-6", maxTokens: 2000, cost: 0, capWindow: "month" },
};

/** One-time welcome allowance so a new user can load a real garden and see the
 *  year wheel, notifications and shopping list fill up before meeting the wall. */
export const FREE_WELCOME = Number(process.env.FREE_WELCOME ?? 10);

export type Tier = "free" | "bronze" | "silver" | "gold";

export interface TierConfig {
  /** Charged actions per month. Advertised explicitly — never call it unlimited. */
  monthly: number;
  weatherPerDay: number;
  /** Second looks after the owner says an identification is wrong. */
  retryPerDay: number;
  equipmentPerMonth: number;
  followupPerMonth: number;
  sowingPerMonth: number;
}

/** The background allowances rise with the tier because they are a fixed floor
 *  under every subscriber: a bronze subscriber paying 29 kr must not be handed
 *  the same automatic spend as one paying 79. Since answers to these are shared
 *  between everyone asking the same question, the floor is now small — but it
 *  should still not be flat. */
export const TIERS: Record<Tier, TierConfig> = {
  // The equipment list is the one background call the shared cache barely
  // helps with — a garden's composition is close to unique, so almost every
  // request is a miss. At 0.3 kr each it was the whole of what a free user
  // cost per month. Free accounts no longer generate one; paid ones do.
  free:   { monthly: 0,   retryPerDay: 10, weatherPerDay: 1, equipmentPerMonth: 0,  followupPerMonth: 30, sowingPerMonth: 4 },
  bronze: { monthly: 25,  retryPerDay: 15, weatherPerDay: 1, equipmentPerMonth: 5,  followupPerMonth: 60, sowingPerMonth: 8 },
  silver: { monthly: 60,  retryPerDay: 25, weatherPerDay: 2, equipmentPerMonth: 8,  followupPerMonth: 120, sowingPerMonth: 12 },
  gold:   { monthly: 150, retryPerDay: 40, weatherPerDay: 2, equipmentPerMonth: 12, followupPerMonth: 250, sowingPerMonth: 20 },
};

/** Store product identifier to the tier it grants. Keys must match App Store
 *  Connect and RevenueCat exactly; a typo grants nothing and says nothing. */
export const SUBSCRIPTIONS: Record<string, Tier> = {
  gardenme_bronze_monthly: "bronze", gardenme_bronze_yearly: "bronze",
  gardenme_silver_monthly: "silver", gardenme_silver_yearly: "silver",
  gardenme_gold_monthly:   "gold",   gardenme_gold_yearly:   "gold",
};

/** Which tier allowance governs each free background kind. */
export const CAP_FIELD: Partial<Record<Kind, keyof TierConfig>> = {
  // Missing this entry meant `cap` fell through to 0, so every retry was
  // refused by the quota before it reached the model — the owner pressed
  // "think again", nothing changed, and nothing said why.
  plant_retry: "retryPerDay",
  weather: "weatherPerDay",
  equipment: "equipmentPerMonth",
  threats: "followupPerMonth",
  sowing: "sowingPerMonth",
};

/** Credits granted per consumable product. Keys must match the App Store /
 *  Play Store product identifiers configured in RevenueCat. */
export const CREDIT_PACKS: Record<string, number> = {
  credits_20: 20,
  credits_60: 60,
  credits_150: 150,
};

export function isKind(k: unknown): k is Kind {
  return typeof k === "string" && Object.prototype.hasOwnProperty.call(KINDS, k);
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function month(): string {
  return new Date().toISOString().slice(0, 7);
}

export function isTier(v: unknown): v is Tier {
  return v === "free" || v === "bronze" || v === "silver" || v === "gold";
}

export async function tierOf(redis: Redis, deviceId: string): Promise<Tier> {
  const allowlist = (process.env.PREMIUM_DEVICE_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowlist.includes(deviceId)) return "gold";
  // Set and cleared by the RevenueCat webhook.
  const stored = await redis.get(`prem:${deviceId}`);
  if (stored === null) return "free";
  // Subscriptions sold before the tiers existed stored a bare 1. They were all
  // the 150-action plan, so they stay on it rather than being quietly demoted.
  return isTier(stored) ? stored : "gold";
}
