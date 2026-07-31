import { Redis } from "@upstash/redis";

export type Kind = "plant" | "plant_retry" | "devil" | "ask" | "light" | "equipment" | "weather";

export interface KindConfig {
  model: string;
  maxTokens: number;
  /** Credits this action costs the user. 0 = automatic background work, capped instead. */
  cost: 0 | 1;
  /** Only meaningful when cost is 0. */
  freeCap: number;
  premiumCap: number;
  capWindow: "day" | "month";
}

/** One credit buys one user-initiated AI action, whichever kind it is.
 *  Weather and the shopping/equipment list run on their own without being asked
 *  for, so charging credits for them would drain a balance the user is watching.
 *  They are free but capped — the cap is what protects the margin. */
export const KINDS: Record<Kind, KindConfig> = {
  plant:     { model: "claude-sonnet-4-6", maxTokens: 1500, cost: 1, freeCap: 0, premiumCap: 0, capWindow: "month" },
  // "That is definitely not it" — a second look after the user rejects an
  // identification. Free, because charging someone to correct our own mistake
  // is a poor trade: it costs us ~0.3 kr and buys back the moment the app
  // looked wrong. Capped per day so it cannot be farmed as free identification.
  plant_retry: { model: "claude-sonnet-4-6", maxTokens: 1500, cost: 0, freeCap: 5, premiumCap: 20, capWindow: "day" },
  devil:     { model: "claude-sonnet-4-6", maxTokens: 1000, cost: 1, freeCap: 0, premiumCap: 0, capWindow: "month" },
  ask:       { model: "claude-sonnet-4-6", maxTokens: 700,  cost: 1, freeCap: 0, premiumCap: 0, capWindow: "month" },
  light:     { model: "claude-sonnet-4-6", maxTokens: 1000, cost: 1, freeCap: 0, premiumCap: 0, capWindow: "month" },
  equipment: { model: "claude-sonnet-4-6", maxTokens: 2500, cost: 0, freeCap: 3, premiumCap: 10, capWindow: "month" },
  weather:   { model: "claude-sonnet-4-6", maxTokens: 800,  cost: 0, freeCap: 1, premiumCap: 2,  capWindow: "day" },
};

/** One-time welcome allowance so a new user can load a real garden and see the
 *  year wheel, notifications and shopping list fill up before meeting the wall. */
export const FREE_WELCOME = 10;

/** Included with Garden Me +. Advertised explicitly — never call it unlimited. */
export const PREMIUM_MONTHLY = 150;

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

export async function isPremium(redis: Redis, deviceId: string): Promise<boolean> {
  const allowlist = (process.env.PREMIUM_DEVICE_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowlist.includes(deviceId)) return true;
  // Set and cleared by the RevenueCat webhook.
  return (await redis.get(`prem:${deviceId}`)) !== null;
}
