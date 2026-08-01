import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { CREDIT_PACKS, SUBSCRIPTIONS } from "../_lib/quota";

// Credits and premium access are granted ONLY here, from a RevenueCat webhook
// fired by a store-verified purchase. The app can never grant itself anything —
// it has no endpoint to do so, and this one is not reachable with the app key.

const EVENT_TTL = 60 * 60 * 24 * 30; // idempotency window
const GRACE_SECONDS = 60 * 60 * 24 * 3;

interface RCEvent {
  id?: string;
  type?: string;
  app_user_id?: string;
  product_id?: string;
  expiration_at_ms?: number;
  cancel_reason?: string;
}

export async function POST(req: NextRequest) {
  const secret = process.env.REVENUECAT_WEBHOOK_AUTH;
  if (!secret || req.headers.get("authorization") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { event?: RCEvent };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const event = body.event;
  if (!event?.type) return NextResponse.json({ error: "No event" }, { status: 400 });
  if (event.type === "TEST") return NextResponse.json({ ok: true, test: true });

  const deviceId = event.app_user_id;
  if (!deviceId) return NextResponse.json({ error: "No app_user_id" }, { status: 400 });

  const redis = Redis.fromEnv();

  // RevenueCat guarantees at-least-once delivery and reuses the event id on
  // retries, so the same purchase must not be able to grant credits twice.
  if (event.id) {
    const first = await redis.set(`evt:${event.id}`, 1, { nx: true, ex: EVENT_TTL });
    if (first === null) return NextResponse.json({ ok: true, duplicate: true });
  }

  const pack = event.product_id ? CREDIT_PACKS[event.product_id] : undefined;

  switch (event.type) {
    case "NON_RENEWING_PURCHASE": {
      if (!pack) return NextResponse.json({ ok: true, ignored: "unknown product" });
      const balance = await redis.incrby(`bal:${deviceId}`, pack);
      return NextResponse.json({ ok: true, granted: pack, balance });
    }

    case "INITIAL_PURCHASE":
    case "RENEWAL":
    case "UNCANCELLATION":
    case "PRODUCT_CHANGE":
    case "SUBSCRIPTION_EXTENDED": {
      const expiresAt = event.expiration_at_ms;
      const ttl = expiresAt
        ? Math.max(60, Math.floor((expiresAt - Date.now()) / 1000) + GRACE_SECONDS)
        : 60 * 60 * 24 * 32;
      // Store which plan, not merely that there is one — the allowance differs
      // by tier now, and an upgrade must take effect without waiting for a
      // renewal. An unrecognised subscription product grants the smallest paid
      // tier rather than nothing, so a mistake in App Store Connect cannot
      // leave a paying subscriber with no allowance at all.
      const tier = event.product_id ? SUBSCRIPTIONS[event.product_id] ?? "bronze" : "bronze";
      await redis.set(`prem:${deviceId}`, tier, { ex: ttl });
      return NextResponse.json({ ok: true, premium: true, tier, ttl });
    }

    case "EXPIRATION": {
      // Note: CANCELLATION of a subscription only means auto-renew was switched
      // off — access continues until it expires. Only EXPIRATION revokes.
      await redis.del(`prem:${deviceId}`);
      return NextResponse.json({ ok: true, premium: false });
    }

    case "CANCELLATION": {
      // For a consumable this is a refund, not an auto-renew change — claw the
      // credits back, but never below zero.
      if (!pack) return NextResponse.json({ ok: true, ignored: "subscription cancel" });
      const balance = await redis.decrby(`bal:${deviceId}`, pack);
      if (balance < 0) await redis.set(`bal:${deviceId}`, 0);
      return NextResponse.json({ ok: true, revoked: pack, balance: Math.max(0, balance) });
    }

    default:
      return NextResponse.json({ ok: true, ignored: event.type });
  }
}
