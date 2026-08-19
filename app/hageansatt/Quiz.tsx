"use client";

import { useState } from "react";
import { QUESTIONS, byKey, score, type Employee } from "./data";

const serif = { fontFamily: "var(--font-serif)" };
const APP_STORE = "https://apps.apple.com/app/id6796947839";

/* Hele testen kjører i nettleseren. Ingen forespørsel, ingen AI, ingen kostnad
   per besøkende — og det er ikke gjerrighet, det er hele forutsetningen: en
   side som forhåpentligvis blir tatt av tusen mennesker kan ikke koste to øre
   per stykk når ingen av dem har betalt for noe ennå. */

export default function Quiz({ initial }: { initial: string | null }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  /* Kom du hit via noen andres delte lenke, ser du deres resultat først. Da er
     du en leser, ikke en deltaker — og knappen under sier «ta den selv». */
  const shared = initial ? byKey(initial) : undefined;
  const [showShared, setShowShared] = useState(!!shared);

  const done = answers.length === QUESTIONS.length;
  const result = done ? score(answers) : null;

  const restart = () => { setAnswers([]); setStarted(true); setShowShared(false); };

  if (showShared && shared) {
    return (
      <main className="py-14 px-6 max-w-2xl mx-auto">
        <Card who={shared} colleagues={null} lead="Noen delte dette med deg." />
        <button onClick={restart}
          className="w-full mt-8 font-medium px-8 py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#4d5a2a", color: "#f6f1e6" }}>
          Finn ut hvem du er
        </button>
      </main>
    );
  }

  if (!started && !done) {
    return (
      <main className="py-16 px-6 max-w-2xl mx-auto">
        <h1 style={serif} className="text-4xl sm:text-5xl font-semibold mb-5 leading-tight">
          Hvilken hageansatt er du?
        </h1>
        <p className="text-lg leading-relaxed mb-4" style={{ color: "#4d5a2a" }}>
          Hver hage har en arbeidsstokk, og mesteparten av den blir aldri takket.
          Meitemarken gjør grovarbeidet mens du tar æren. Bien tar betalingen i
          nektar. Løpebillen spiser sneglen før den rekker å bli en snegl, og
          ingen har noen gang sagt et ord om det.
        </p>
        <p className="text-lg leading-relaxed mb-10" style={{ color: "#4d5a2a" }}>
          Åtte spørsmål om hvordan du er på jobb. Elleve ansatte du kan være.
        </p>

        <button onClick={() => setStarted(true)}
          className="w-full font-medium px-8 py-4 rounded-xl text-lg tracking-wide transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#c2a14e", color: "#2c3517" }}>
          Begynn
        </button>

        <p className="text-sm mt-6" style={{ color: "#9aa861" }}>
          Ingen innlogging, ingen e-post, ingenting lagres. Elleve hagegjester,
          hentet rett fra appen — de finnes på ordentlig, og de gjør det som står her.
        </p>
      </main>
    );
  }

  if (!done) {
    const i = answers.length;
    const q = QUESTIONS[i];
    return (
      <main className="py-14 px-6 max-w-2xl mx-auto">
        {/* Framdrift som tall og strek. Åtte spørsmål er kort, men det vet man
            ikke før noen sier det. */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2" style={{ color: "#9aa861" }}>
            <span>Spørsmål {i + 1} av {QUESTIONS.length}</span>
            {i > 0 && (
              <button onClick={() => setAnswers(answers.slice(0, -1))} className="underline hover:opacity-70">
                tilbake
              </button>
            )}
          </div>
          <div className="h-1 rounded-full" style={{ backgroundColor: "#e5ddc8" }}>
            <div className="h-1 rounded-full transition-all" style={{ backgroundColor: "#4d5a2a", width: `${(i / QUESTIONS.length) * 100}%` }} />
          </div>
        </div>

        <h2 style={serif} className="text-3xl font-semibold mb-8 leading-snug">{q.q}</h2>

        <div className="flex flex-col gap-3">
          {q.options.map((o, n) => (
            <button key={n} onClick={() => setAnswers([...answers, n])}
              className="text-left px-5 py-4 rounded-xl border transition-colors hover:bg-white"
              style={{ borderColor: "#ddd3b6", backgroundColor: "#faf7f0", color: "#2c3517" }}>
              {o.text}
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="py-14 px-6 max-w-2xl mx-auto">
      <Card who={result!.winner} colleagues={result!.runnersUp} lead="Du er" />
      <Share who={result!.winner} />
      <button onClick={restart}
        className="w-full mt-3 px-8 py-3 rounded-xl text-base tracking-wide border transition-opacity hover:opacity-70"
        style={{ borderColor: "#ddd3b6", color: "#4d5a2a" }}>
        Ta den om igjen
      </button>
    </main>
  );
}

function Card({ who, colleagues, lead }: { who: Employee; colleagues: Employee[] | null; lead: string }) {
  return (
    <>
      <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#9aa861" }}>{lead}</p>

      <div className="rounded-2xl p-7 border" style={{ backgroundColor: "white", borderColor: "#e5ddc8" }}>
        <div className="text-6xl mb-3 leading-none">{who.emoji}</div>
        <h1 style={serif} className="text-4xl font-semibold mb-1">{who.name}</h1>
        <p className="text-sm tracking-wide uppercase mb-5" style={{ color: "#c2a14e" }}>{who.dept}</p>
        <p className="text-lg italic mb-6" style={{ color: "#4d5a2a" }}>«{who.quip}»</p>
        <p className="leading-relaxed" style={{ color: "#4d5a2a" }}>{who.review}</p>
      </div>

      {colleagues && (
        <div className="mt-4 rounded-2xl p-6 border" style={{ backgroundColor: "#faf7f0", borderColor: "#e5ddc8" }}>
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#9aa861" }}>Du hadde også passet på</p>
          {colleagues.map((c) => (
            <p key={c.key} className="mb-1" style={{ color: "#4d5a2a" }}>
              <span className="mr-2">{c.emoji}</span>
              <strong style={{ color: "#2c3517" }}>{c.name}</strong> — {c.dept.toLowerCase()}
            </p>
          ))}
        </div>
      )}

      {/* Det som gjør kortet til noe annet enn en spøk: rådet er ekte, og det er
          det samme rådet appen gir når den forteller hvem som er på jobb nå. */}
      <div className="mt-4 rounded-2xl p-6 border" style={{ backgroundColor: "#faf7f0", borderColor: "#e5ddc8" }}>
        <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#9aa861" }}>
          Vil du ha {who.name.toLowerCase()} i hagen din?
        </p>
        <p className="leading-relaxed" style={{ color: "#4d5a2a" }}>{who.act}</p>
      </div>

      <div className="mt-4 rounded-2xl p-6 border" style={{ backgroundColor: "#2c3517", borderColor: "#2c3517" }}>
        <p className="leading-relaxed mb-4" style={{ color: "#e5ddc8" }}>
          Garden Me forteller deg hvem av de elleve som er på jobb i din hage denne
          måneden, og hva du kan gjøre for dem. Og resten av året: hva plantene dine
          trenger, hva som spiser dem, og når frosten kommer.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a href={APP_STORE}
            className="font-medium px-6 py-3 rounded-xl tracking-wide transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c2a14e", color: "#2c3517" }}>
            Last ned Garden Me
          </a>
          <a href="/hvorfor"
            className="px-6 py-3 rounded-xl tracking-wide border transition-opacity hover:opacity-70"
            style={{ borderColor: "#9aa861", color: "#9aa861" }}>
            Hvorfor appen finnes
          </a>
        </div>
      </div>
    </>
  );
}

function Share({ who }: { who: Employee }) {
  const [said, setSaid] = useState<string | null>(null);
  const url = `https://gardenme.app/hageansatt?er=${who.key}`;
  const text = `${who.emoji} Jeg er ${who.name} — ${who.quip}\n\nHvilken hageansatt er du?`;

  const share = async () => {
    /* navigator.share finnes på telefoner og er den knappen folk faktisk
       bruker. På en maskin finnes den sjelden, og da er utklippstavlen det
       nærmeste vi kommer. Feiler begge — eller avbryter man delingen — sier
       vi ingenting, for et varsel om at man ikke delte er bare kjefting. */
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Hvilken hageansatt er du?", text, url });
        return;
      }
    } catch { return; }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setSaid("Kopiert. Lim den inn der du vil.");
      setTimeout(() => setSaid(null), 4000);
    } catch { setSaid(url); }
  };

  return (
    <>
      <button onClick={share}
        className="w-full mt-8 font-medium px-8 py-4 rounded-xl text-lg tracking-wide transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#4d5a2a", color: "#f6f1e6" }}>
        Del hvem du er
      </button>
      {said && <p className="text-sm mt-3 text-center" style={{ color: "#9aa861" }}>{said}</p>}
    </>
  );
}
