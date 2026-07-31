import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { FREE_WELCOME, PREMIUM_MONTHLY, isPremium, month } from "../_lib/quota";

// Read-only balance lookup so the app can show "34 av 150" without having to
// make an AI call first.
export async function GET(req: NextRequest) {
  const appKey = process.env.APP_SHARED_SECRET;
  if (!appKey || req.headers.get("x-app-key") !== appKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deviceId = req.nextUrl.searchParams.get("deviceId");
  if (!deviceId || deviceId.length < 8 || deviceId.length > 64) {
    return NextResponse.json({ error: "Bad deviceId" }, { status: 400 });
  }

  const redis = Redis.fromEnv();
  const premium = await isPremium(redis, deviceId);

  const [monthlyUsed, freeUsed, credits] = await Promise.all([
    redis.get<number>(`spent:mo:${deviceId}:${month()}`),
    redis.get<number>(`spent:free:${deviceId}`),
    redis.get<number>(`bal:${deviceId}`),
  ]);

  return NextResponse.json({
    premium,
    monthlyUsed: monthlyUsed ?? 0,
    monthlyLimit: premium ? PREMIUM_MONTHLY : 0,
    freeUsed: freeUsed ?? 0,
    freeLimit: FREE_WELCOME,
    credits: Math.max(0, credits ?? 0),
  });
}
