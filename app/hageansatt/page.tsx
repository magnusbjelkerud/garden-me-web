import type { Metadata } from "next";
import SiteNav from "../SiteNav";
import Quiz from "./Quiz";
import { byKey } from "./data";

/* Siden er norsk, som /hvorfor, og av samme grunn: den er skrevet for et norsk
   nettverk og skal deles der. Resten av nettstedet er engelsk fordi App Store
   er det.

   En delt lenke bærer resultatet i adressen (?er=padde). Uten det ville alle
   delinger sett like ut i forhåndsvisningen, og et resultatkort ingen kan se
   uten å klikke, er ikke et resultatkort — det er en oppfordring til å ta en
   test, og den er langt mindre fristende. */

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ er?: string }> },
): Promise<Metadata> {
  const { er } = await searchParams;
  const who = er ? byKey(er) : undefined;

  const title = who
    ? `${who.emoji} Jeg er ${who.name} — ${who.quip}`
    : "Hvilken hageansatt er du?";
  const description = who
    ? `${who.dept}. Ta testen og finn ut hvem du er i hagen.`
    : "Meitemarken gjør grovarbeidet mens du tar æren. Bien tar betalingen i nektar. Løpebillen jobber netter og takkes av ingen. Åtte spørsmål, elleve ansatte.";

  return {
    title: `${title} · Garden Me`,
    description,
    openGraph: {
      title,
      description,
      url: who ? `https://gardenme.app/hageansatt?er=${who.key}` : "https://gardenme.app/hageansatt",
      siteName: "Garden Me",
      images: [{ url: "/icon.png", width: 1024, height: 1024 }],
    },
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ er?: string }> }) {
  const { er } = await searchParams;
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>
      <SiteNav />
      <Quiz initial={er && byKey(er) ? er : null} />
    </div>
  );
}
