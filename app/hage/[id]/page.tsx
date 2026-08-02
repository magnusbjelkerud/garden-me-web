import Image from "next/image";
import { Redis } from "@upstash/redis";
import type { Metadata } from "next";
import type { SharedGarden } from "../../api/share/route";

// The page the neighbour opens. No app, no account, no login — a link in a
// message. Every string here comes from the snapshot, already in the owner's
// language, so this file stays language-agnostic.

const serif = { fontFamily: "var(--font-serif)" };

export const dynamic = "force-dynamic";

async function load(id: string): Promise<SharedGarden | null> {
  if (!/^[a-z0-9]{6,24}$/.test(id)) return null;
  try {
    return await Redis.fromEnv().get<SharedGarden>(`share:${id}`);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const g = await load(id);
  return {
    title: g ? `${g.gardenName} — Garden Me` : "Garden Me",
    // A shared garden is a private thing; keep it out of search results.
    robots: { index: false, follow: false },
  };
}

export default async function SharedGardenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = await load(id);

  if (!g) {
    return (
      <main style={{ backgroundColor: "#f6f1e6", minHeight: "100vh" }} className="flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-5" style={{ color: "#c2a14e" }}>❦</div>
          <h1 style={{ ...serif, color: "#2c3517" }} className="text-3xl font-semibold mb-3">
            This garden has closed its gate
          </h1>
          <p style={{ color: "#4d5a2a" }}>
            The link has expired, or was never quite right. Ask for a fresh one.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#f6f1e6", minHeight: "100vh" }}>
      <header className="px-6 py-14 text-center" style={{ backgroundColor: "#2c3517", color: "#f6f1e6" }}>
        <p style={{ color: "#c2a14e" }} className="text-sm tracking-[0.3em] uppercase mb-3">{g.gardenName}</p>
        <h1 style={serif} className="text-4xl font-semibold mb-4">{g.title}</h1>
        <p className="max-w-xl mx-auto leading-relaxed" style={{ color: "#9aa861" }}>{g.intro}</p>
      </header>

      <section className="px-6 py-14 max-w-2xl mx-auto">
        <h2 style={{ ...serif, color: "#2c3517" }} className="text-2xl font-semibold mb-5">{g.tasksHeading}</h2>

        {g.tasks.length === 0 ? (
          <p className="rounded-2xl p-6 border italic" style={{ backgroundColor: "#ffffff", borderColor: "#e5ddc8", color: "#4d5a2a" }}>
            {g.nothingDue}
          </p>
        ) : (
          <ul className="space-y-3 list-none p-0">
            {g.tasks.map((t, i) => (
              <li key={i} className="rounded-2xl p-5 border flex gap-4" style={{ backgroundColor: "#ffffff", borderColor: "#e5ddc8" }}>
                <span className="text-2xl leading-none">{t.emoji}</span>
                <div>
                  <p className="font-semibold" style={{ color: "#2c3517" }}>{t.task}</p>
                  <p className="text-sm mt-1" style={{ color: "#9aa861" }}>{t.plant}</p>
                  {t.detail && <p className="text-sm mt-2 leading-relaxed" style={{ color: "#4d5a2a" }}>{t.detail}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}

        <h2 style={{ ...serif, color: "#2c3517" }} className="text-2xl font-semibold mt-14 mb-5">{g.plantsHeading}</h2>
        <ul className="space-y-3 list-none p-0">
          {g.plants.map((p, i) => (
            <li key={i} className="rounded-2xl p-5 border flex gap-4" style={{ backgroundColor: "#ffffff", borderColor: "#e5ddc8" }}>
              {/* A plain img, not next/image: these are data URIs held in Redis
                  for ninety days, not files the optimiser could ever fetch. */}
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photo} alt="" width={64} height={64}
                  className="rounded-xl object-cover shrink-0" style={{ width: 64, height: 64 }} />
              ) : (
                <span className="text-2xl leading-none">{p.emoji}</span>
              )}
              <div>
                <p className="font-semibold" style={{ color: "#2c3517" }}>{p.name}</p>
                {p.latin && <p className="text-sm italic" style={{ color: "#a8a29e" }}>{p.latin}</p>}
                {p.note && <p className="text-sm mt-2" style={{ color: "#9aa861" }}>{p.note}</p>}
                {p.water && <p className="text-sm mt-1 leading-relaxed" style={{ color: "#4d5a2a" }}>{p.water}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="px-6 py-12 text-center" style={{ backgroundColor: "#38431e", color: "#9aa861" }}>
        <p className="text-sm mb-5 max-w-md mx-auto leading-relaxed">{g.footer}</p>
        {/* The helper is meeting Garden Me for the first time here. Make the way
            in obvious — this page is the best advertisement the app has. */}
        <a href="/" aria-label="Garden Me" className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity">
          <Image src="/logo.png" alt="" width={32} height={32} />
          <span style={{ ...serif, color: "#c2a14e" }} className="text-xl font-semibold tracking-wide">Garden Me</span>
        </a>
      </footer>
    </main>
  );
}
