import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// A snapshot of one garden, for the neighbour watering it while you are away.
// The app sends text that is already translated, so this route and the page it
// feeds never need to know a word of Norwegian, Dutch or German.
//
// Snapshot, not a live view: it is what the garden looked like when shared.
// Re-sharing overwrites the same id, so the link an owner gave out keeps working.

const TTL = 60 * 60 * 24 * 90; // a long holiday, then it lets go
const MAX_BODY = 200_000;

export interface SharedGarden {
  gardenName: string;
  title: string;
  intro: string;
  tasksHeading: string;
  plantsHeading: string;
  nothingDue: string;
  footer: string;
  tasks: { plant: string; emoji: string; task: string; detail?: string }[];
  plants: { name: string; emoji: string; latin?: string; note?: string; water?: string }[];
  updatedAt: number;
}

function shareId(): string {
  const chunk = () => Math.floor(Math.random() * 36 ** 6).toString(36).padStart(6, "0");
  return `${chunk()}${chunk()}`;
}

export async function POST(req: NextRequest) {
  const appKey = process.env.APP_SHARED_SECRET;
  if (!appKey || req.headers.get("x-app-key") !== appKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ error: "Too large" }, { status: 413 });
  }

  let body: { id?: unknown; garden?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const garden = body.garden as SharedGarden | undefined;
  if (!garden || typeof garden.gardenName !== "string" || !Array.isArray(garden.plants)) {
    return NextResponse.json({ error: "Bad garden" }, { status: 400 });
  }

  // Reuse the id the app already handed out, so a re-share updates the link
  // rather than stranding whoever is holding the old one.
  const id = typeof body.id === "string" && /^[a-z0-9]{6,24}$/.test(body.id) ? body.id : shareId();

  const redis = Redis.fromEnv();
  await redis.set(`share:${id}`, { ...garden, updatedAt: Date.now() }, { ex: TTL });

  // www is canonical here; the apex 308-redirects, and a redirect is one more
  // thing that can go wrong in a message preview.
  return NextResponse.json({ id, url: `https://www.gardenme.app/hage/${id}` });
}

export async function DELETE(req: NextRequest) {
  const appKey = process.env.APP_SHARED_SECRET;
  if (!appKey || req.headers.get("x-app-key") !== appKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = req.nextUrl.searchParams.get("id");
  if (!id || !/^[a-z0-9]{6,24}$/.test(id)) {
    return NextResponse.json({ error: "Bad id" }, { status: 400 });
  }
  await Redis.fromEnv().del(`share:${id}`);
  return NextResponse.json({ ok: true });
}
