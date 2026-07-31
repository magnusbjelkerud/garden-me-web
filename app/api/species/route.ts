import { NextRequest, NextResponse } from "next/server";
import { REGULATED_SPECIES, SPECIES_LIST_VERSION } from "../_lib/species";

// Served rather than bundled so the lists can be corrected without an App Store
// release — both the EU and Norwegian lists are actively being amended.
// The app caches the payload and only refetches when the version changes.
export async function GET(req: NextRequest) {
  const appKey = process.env.APP_SHARED_SECRET;
  if (!appKey || req.headers.get("x-app-key") !== appKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    { version: SPECIES_LIST_VERSION, species: REGULATED_SPECIES },
    { headers: { "Cache-Control": "public, max-age=86400" } },
  );
}
