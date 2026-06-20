import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, lat, lon, plants, devils, lang, gender } = body;

    if (!token || lat == null || lon == null || !lang || !gender) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const redis = Redis.fromEnv();
    await redis.set(
      `user:${token}`,
      { token, lat, lon, plants, devils, lang, gender, lastSeen: Date.now() },
      { ex: 60 * 60 * 24 * 90 }
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
