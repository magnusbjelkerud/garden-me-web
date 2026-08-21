import Anthropic from "@anthropic-ai/sdk";
import { createHash } from "crypto";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { CAP_FIELD, FREE_WELCOME, KINDS, TIERS, isKind, month, tierOf, today } from "../_lib/quota";
import type { Kind } from "../_lib/quota";

// Vision calls take 20-40s. Hobby plan caps functions at 60s.
// A plant reply is long — identity, care, a year of tasks, a starter kit and
// the threat list — and 60s was not enough for it. Worse, a function killed
// at the ceiling never reaches the refund, so the timeout billed the user
// for an answer they never saw.
export const maxDuration = 300;

// Comfortably above human speed — a new user loading a whole garden in one
// sitting must never be told to slow down — but still far below scripted abuse.
const DEVICE_CALLS_PER_MIN = 20;
const IP_CALLS_PER_MIN = 40;
const MAX_BODY_CHARS = 6_000_000; // ~4.5 MB of base64 image plus prompt
const MAX_MESSAGES = 40;
const LIFETIME_TTL = 60 * 60 * 24 * 400;
const MONTH_TTL = 60 * 60 * 24 * 70;

/** How long a shared answer stays good.
 *
 *  We were paying full price to answer the same question repeatedly. "What eats
 *  a Victoria plum in Norway and what does it fall ill with" has one answer —
 *  it is the plum's answer, not the owner's, and it is as true tomorrow as
 *  today. Keyed on the question rather than on who asked it, the first person
 *  to scan a plum pays for it and everyone after reads it back.
 *
 *  Only the kinds the owner does not pay for are cached. That keeps the rule
 *  easy to state — we cache what is free — and means a cache hit can never
 *  make a balance behave in a way nobody can explain. */
const CACHE_TTL: Partial<Record<string, number>> = {
  threats: 60 * 60 * 24 * 30,   // species facts move on a scale of years
  equipment: 60 * 60 * 24 * 7,  // what a garden needs shifts with the season
  weather: 60 * 60 * 6,         // conditions move through the day
  sowing: 60 * 60 * 24 * 20,    // what to sow shifts with the month, not the day
};

/** Text-only requests only. An image is unique to the person who took it, so
 *  it would never be hit again and hashing megabytes of base64 to discover
 *  that would cost more than it saves. */
function cacheKeyFor(kind: string, system: string | undefined, messages: unknown[]): string | null {
  if (!CACHE_TTL[kind]) return null;
  const body = JSON.stringify(messages);
  if (body.includes('"type":"image"')) return null;
  return `ans:${kind}:${createHash("sha256").update((system ?? "") + body).digest("hex").slice(0, 32)}`;
}

function fail(status: number, code: string, message: string, extra?: object) {
  return NextResponse.json({ error: { code, message }, ...extra }, { status });
}

export async function POST(req: NextRequest) {
  const appKey = process.env.APP_SHARED_SECRET;
  if (!appKey || req.headers.get("x-app-key") !== appKey) {
    return fail(401, "UNAUTHORIZED", "Missing or invalid app key");
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fail(500, "SERVER_MISCONFIGURED", "No API key configured");

  const raw = await req.text();
  if (raw.length > MAX_BODY_CHARS) {
    return fail(413, "TOO_LARGE", "Request body too large");
  }

  let body: { deviceId?: unknown; kind?: unknown; messages?: unknown; system?: unknown; spend?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "BAD_JSON", "Body is not valid JSON");
  }

  const { deviceId, kind, messages, system } = body;
  // Sant bare når eieren selv trykket på knappen som sa hva den koster.
  // Bakgrunnsjobbene sender den aldri, og en forespørsel som lyver om den
  // kjøper ingenting den ikke allerede kunne fått.
  const spend = body.spend === true;

  if (typeof deviceId !== "string" || deviceId.length < 8 || deviceId.length > 64) {
    return fail(400, "BAD_DEVICE_ID", "Missing or malformed deviceId");
  }
  if (!isKind(kind)) return fail(400, "BAD_KIND", "Unknown request kind");
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return fail(400, "BAD_MESSAGES", "Missing or malformed messages");
  }
  if (system !== undefined && typeof system !== "string") {
    return fail(400, "BAD_SYSTEM", "system must be a string");
  }

  const config = KINDS[kind];
  const redis = Redis.fromEnv();
  const day = today();
  const mo = month();

  // Global kill switch — a hard ceiling on total spend per day, so a leaked
  // app key cannot run up an unbounded bill before it is noticed and rotated.
  const globalCap = Number(process.env.GLOBAL_DAILY_CAP ?? 5000);
  const globalCount = await redis.incr(`global:${day}`);
  if (globalCount === 1) await redis.expire(`global:${day}`, 60 * 60 * 48);
  if (globalCount > globalCap) {
    return fail(503, "GLOBAL_CAP", "Daily service capacity reached");
  }

  // Rate limits: per device, and per IP so that minting fresh device ids
  // does not give an attacker unlimited free-tier quota.
  const minute = Math.floor(Date.now() / 60000);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  const deviceRate = await redis.incr(`rl:d:${deviceId}:${minute}`);
  if (deviceRate === 1) await redis.expire(`rl:d:${deviceId}:${minute}`, 120);
  if (deviceRate > DEVICE_CALLS_PER_MIN) {
    return fail(429, "RATE_LIMIT", "Too many requests, slow down");
  }

  const ipRate = await redis.incr(`rl:i:${ip}:${minute}`);
  if (ipRate === 1) await redis.expire(`rl:i:${ip}:${minute}`, 120);
  if (ipRate > IP_CALLS_PER_MIN) {
    return fail(429, "RATE_LIMIT", "Too many requests, slow down");
  }

  /* Looked up before the quota is touched. A hit costs us nothing, so it must
     not consume the owner's allowance either — but the rate limits above still
     apply, because a cache is not a reason to let anyone hammer the door. */
  const cacheKey = cacheKeyFor(kind, system as string | undefined, messages as unknown[]);
  if (cacheKey) {
    const hit = await redis.get<{ content: unknown }>(cacheKey);
    if (hit?.content) {
      return NextResponse.json({ content: hit.content, cached: true });
    }
  }

  const tier = await tierOf(redis, deviceId);
  const premium = tier !== "free";
  const allowance = TIERS[tier];

  // How this request gets paid for, decided before Claude is called and undone
  // if the call fails. `spent` records what to refund.
  let spent: "month" | "free" | "credits" | "none" = "none";
  const monthKey = `spent:mo:${deviceId}:${mo}`;
  const freeKey = `spent:free:${deviceId}`;
  const balKey = `bal:${deviceId}`;

  /* Kinds a user may deliberately pay for once the automatic allowance is
     spent. Only the shopping list: the others (weather, follow-ups, the sowing
     calendar) are things the app fetches on its own, and something nobody
     pressed must never be purchasable on their behalf. */
  const SPENDABLE = new Set<Kind>(["equipment"]);

  let charge = config.cost === 1;

  if (config.cost === 0) {
    // Automatic background work (weather, shopping list). The user never asked
    // for it, so it must never cost them a credit — capped instead.
    const field = CAP_FIELD[kind];
    const cap = field ? allowance[field] : 0;
    const window = config.capWindow === "day" ? day : mo;
    const capKey = `cap:${kind}:${deviceId}:${window}`;
    const used = await redis.incr(capKey);
    if (used === 1) await redis.expire(capKey, MONTH_TTL);
    if (used > cap) {
      // Give the reservation back. INCR is how the cap is claimed atomically,
      // so a refusal that keeps the number leaves a counter that only ever
      // climbs — and a free account, whose cap is nought, would carry a
      // tally of every time it was told no.
      await redis.decr(capKey);
      /* The list is free and automatic for subscribers. Everyone else may buy
         one outright: they pressed the button, the price was on it, and one
         action is what everything else in the app costs. Without this, a
         credit pack bought expressly to get the list would have delivered
         nothing — the packs write to the balance, and the list reads the
         subscription. */
      if (!(spend && SPENDABLE.has(kind))) {
        return fail(429, "AUTO_CAP", "Automatic refresh limit reached");
      }
      charge = true;
    }
  }

  if (charge && premium) {
    const used = await redis.incr(monthKey);
    if (used === 1) await redis.expire(monthKey, MONTH_TTL);
    if (used > allowance.monthly) {
      await redis.decr(monthKey);
      // Monthly allowance is gone — fall back to purchased credits.
      const left = await redis.decr(balKey);
      if (left < 0) {
        await redis.incr(balKey);
        return fail(402, "NEEDS_CREDITS", "Monthly allowance used up", {
          state: { premium, tier, monthlyUsed: allowance.monthly, monthlyLimit: allowance.monthly, credits: 0 },
        });
      }
      spent = "credits";
    } else {
      spent = "month";
    }
  } else if (charge) {
    const used = await redis.incr(freeKey);
    if (used === 1) await redis.expire(freeKey, LIFETIME_TTL);
    if (used > FREE_WELCOME) {
      await redis.decr(freeKey);
      const left = await redis.decr(balKey);
      if (left < 0) {
        await redis.incr(balKey);
        return fail(402, "NEEDS_CREDITS", "Free allowance used up", {
          state: { premium, freeUsed: FREE_WELCOME, freeLimit: FREE_WELCOME, credits: 0 },
        });
      }
      spent = "credits";
    } else {
      spent = "free";
    }
  }

  const refund = async () => {
    if (spent === "month") await redis.decr(monthKey);
    else if (spent === "free") await redis.decr(freeKey);
    else if (spent === "credits") await redis.incr(balKey);
  };

  const anthropic = new Anthropic({ apiKey });

  try {
    const message = await anthropic.messages.create({
      model: config.model,
      max_tokens: config.maxTokens,
      ...(system ? { system } : {}),
      messages: messages as Anthropic.MessageParam[],
    });

    // Anthropic returns 200 for a reply it had to cut off at max_tokens. The
    // JSON is then half-written, the app cannot parse it, and the user has paid
    // a credit for nothing — which is exactly what happened to the blueberry.
    // Charging for an answer we know is incomplete is not defensible.
    if (message.stop_reason === "max_tokens") {
      await refund();
      return fail(502, "TRUNCATED", "The reply was cut short; nothing was charged");
    }

    if (cacheKey) {
      // Best effort. A cache that cannot be written is a slower service, not a
      // broken one, so a failure here must never cost the caller their answer.
      await redis.set(cacheKey, { content: message.content }, { ex: CACHE_TTL[kind]! }).catch(() => {});
    }

    const [monthlyUsed, freeUsed, credits] = await Promise.all([
      redis.get<number>(monthKey),
      redis.get<number>(freeKey),
      redis.get<number>(balKey),
    ]);

    return NextResponse.json({
      content: message.content,
      // What the call actually cost us. Returned so pricing can be argued from
      // measurements rather than from guesses about how long a reply looks.
      usage: {
        in: message.usage.input_tokens,
        out: message.usage.output_tokens,
      },
      state: {
        premium,
        tier,
        monthlyUsed: monthlyUsed ?? 0,
        monthlyLimit: allowance.monthly,
        freeUsed: freeUsed ?? 0,
        freeLimit: FREE_WELCOME,
        credits: Math.max(0, credits ?? 0),
      },
    });
  } catch (e) {
    await refund();
    if (e instanceof Anthropic.RateLimitError) {
      return fail(429, "UPSTREAM_BUSY", "Service is busy, try again shortly");
    }
    if (e instanceof Anthropic.BadRequestError) {
      return fail(400, "BAD_REQUEST", "The request was rejected upstream");
    }
    return fail(502, "UPSTREAM_ERROR", "Could not reach the garden brain");
  }
}
