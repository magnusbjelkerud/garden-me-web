import Image from "next/image";

const serif = { fontFamily: "var(--font-serif)" };

export default function Home() {
  const features = [
    {
      icon: "🔍",
      title: "Plant Detective",
      desc: "Photograph any plant and receive an identification down to the cultivar where the evidence allows — not merely 'apple tree', but which apple tree. Leaf, bark, fruit and habit all considered.",
    },
    {
      icon: "📅",
      title: "The Quiet Reminder",
      desc: "Year-round care notifications for every plant you own. We tell you when to prune, water, and feed — so nothing is discovered, browned and lifeless, come October.",
    },
    {
      icon: "❦",
      title: "The Garden Devils",
      desc: "Slugs, weeds, invasive species, disease. Identify your adversaries, track their advance, and receive removal advice — natural methods only. The slugs do not deserve a war crime.",
    },
    {
      icon: "🔬",
      title: "Damage Forensics",
      desc: "The culprit has fled, but the evidence remains. Photograph a half-eaten leaf and we deduce the offender — slug, caterpillar, beetle or blight — from the holes, the trails, the telltale spots.",
    },
    {
      icon: "🌱",
      title: "Knows Its Age",
      desc: "Tag each plant as freshly planted, settling in, or well established. A seedling and a veteran want entirely different things — and only one of them is permitted to be dramatic about it.",
    },
    {
      icon: "🪴",
      title: "Garden, Terrace or Balcony",
      desc: "A window box has nothing in common with an acre. Tell us whether you tend a garden, a terrace, or a single balcony, and the watering, feeding and overwintering advice adapts to your soil — or your charming lack of it.",
    },
    {
      icon: "✓",
      title: "Lists That Write Themselves",
      desc: "Shopping and equipment lists, composed automatically from what your garden actually contains. Each item tied to a specific plant or pest. No generic 'buy fertiliser'. The real kind.",
    },
    {
      icon: "☂",
      title: "Weather Watch",
      desc: "Push alerts when frost, drought, or heavy rain threatens your particular garden. Even when you have not opened the app in a fortnight and forgotten the garden exists.",
    },
    {
      icon: "✦",
      title: "Six Languages",
      desc: "Norwegian, Swedish, Danish, English, German, Dutch — with climate-aware advice for each country. The plants care nothing for borders. We care, a little.",
    },
    {
      icon: "❉",
      title: "Powered by Claude AI",
      desc: "Not the kind of AI that insists a cactus needs daily watering. The kind that knows a rose from a ranunculus — and has the grace to admit when it is uncertain.",
    },
  ];

  const personas = [
    {
      who: "The Connoisseur",
      desc: "You hold opinions on soil pH and acquire plants before deciding where they shall live. Garden Me brings order to your magnificent chaos.",
    },
    {
      who: "The Reluctant Heir",
      desc: "You inherited a garden and are doing your best. Garden Me tells you what things are, what they require, and whether the moment calls for panic.",
    },
    {
      who: "The Absent Landlord",
      desc: "You visit the cabin four times a year, and something always perishes in between. With weather alerts and care reminders — perhaps not this year.",
    },
  ];

  const quotes = [
    { who: "A fern, formerly", text: "I requested water for six weeks. Nobody listened. Then they installed the app. Alas, too late for me." },
    { who: "A very smug cactus", text: "I personally required no assistance. My owner, however, required a great deal." },
    { who: "A brown slug — one star", text: "Dreadful. They located me at once and relocated me humanely. Where is the sport in that?" },
    { who: "A tomato plant", text: "A frost warning arrived at ten in the evening. I was covered. I survived. I owe this app my marinara." },
    { who: "A rose bush", text: "At last, someone who knows precisely when to prune. The audacity I had endured until now." },
    { who: "An anonymous weed", text: "Would not recommend. Registered as a 'Garden Devil'. The disrespect. The accuracy." },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Garden Me" width={36} height={36} />
          <span style={serif} className="text-2xl font-semibold tracking-wide" >Garden Me</span>
        </div>
        <div className="flex gap-8 text-sm tracking-wide" style={{ color: "#4d5a2a" }}>
          <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
          <a href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</a>
          <a href="/terms" className="hover:opacity-60 transition-opacity">Terms</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center" style={{ backgroundColor: "#2c3517", color: "#f6f1e6" }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-block rounded-3xl p-3 mb-8" style={{ backgroundColor: "#f6f1e6" }}>
            <Image src="/icon.png" alt="Garden Me" width={120} height={120} className="rounded-2xl" priority />
          </div>
          <p style={{ color: "#c2a14e" }} className="text-base tracking-[0.3em] uppercase mb-3">
            Pardon me — it is actually
          </p>
          <h1 style={serif} className="text-6xl font-semibold mb-6 tracking-wide">Garden Me</h1>
          <p style={{ ...serif, color: "#d2ad5c" }} className="text-3xl italic mb-6">
            Your plants are pleading. You simply cannot hear them. We can.
          </p>
          <p style={{ color: "#9aa861" }} className="text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Plant identification, year-round care, pest stewardship, and weather alerts —
            for the devoted gardener and the serial offender alike. No judgement. Very little, anyway.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="font-medium px-8 py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90" style={{ backgroundColor: "#c2a14e", color: "#2c3517" }}>
              App Store
            </a>
            <a href="#" className="font-medium px-8 py-4 rounded-xl text-base tracking-wide border transition-colors" style={{ borderColor: "#9aa861", color: "#f6f1e6" }}>
              Google Play
            </a>
          </div>
          <p style={{ color: "#4d5a2a" }} className="text-sm mt-8 tracking-wide">
            Free to download. No subscription. Side effects may include keeping things alive.
          </p>
        </div>
      </section>

      {/* Gold divider line */}
      <div className="flex items-center justify-center gap-4 py-8" style={{ backgroundColor: "#38431e" }}>
        <span style={{ color: "#c2a14e" }} className="text-lg tracking-[0.2em] text-center px-4">
          ❦ &nbsp; Free to download · No subscription · Markedly fewer dead ferns &nbsp; ❦
        </span>
      </div>

      {/* App preview tiles */}
      <section className="py-16 flex justify-center gap-4 flex-wrap px-6" style={{ backgroundColor: "#38431e" }}>
        {[
          { label: "My Garden", icon: "🌿" },
          { label: "Garden Devils", icon: "❦" },
          { label: "Tasks & Weather", icon: "☂" },
          { label: "Equipment", icon: "✦" },
        ].map((s) => (
          <div key={s.label} className="w-28 h-52 rounded-2xl flex-shrink-0 shadow-xl flex flex-col items-center justify-center gap-3 border" style={{ backgroundColor: "#2c3517", borderColor: "#4d5a2a" }}>
            <span className="text-3xl" style={{ color: "#c2a14e" }}>{s.icon}</span>
            <span className="text-xs tracking-wide text-center px-2" style={{ color: "#9aa861" }}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-5xl mx-auto">
        <p style={{ color: "#c2a14e" }} className="text-center text-sm tracking-[0.3em] uppercase mb-3">What it offers</p>
        <h2 style={serif} className="text-4xl font-semibold text-center mb-4" >
          Everything the garden requires.
        </h2>
        <p className="text-center text-lg mb-16" style={{ color: "#4d5a2a" }}>
          Rain excepted. We have tried; the heavens are uncooperative.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl p-8 border" style={{ backgroundColor: "#ffffff", borderColor: "#e5ddc8" }}>
              <div className="text-3xl mb-4" style={{ color: "#c2a14e" }}>{f.icon}</div>
              <h3 style={serif} className="text-2xl font-semibold mb-3" >{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4d5a2a" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* All sizes band */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#9aa861" }}>
        <div className="max-w-3xl mx-auto">
          <p style={{ color: "#2c3517" }} className="text-sm tracking-[0.3em] uppercase mb-4">For every green space</p>
          <h2 style={{ ...serif, color: "#2c3517" }} className="text-4xl font-semibold mb-4">
            From a single pot to a teeming plant kingdom.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "#2c3517" }}>
            You need not own an acre to be a gardener. Whether you tend one brave geranium on a city balcony,
            a cluster of pots on a terrace, or a sprawling, opulent realm of green — Garden Me fits every size,
            and tailors its advice to the soil you actually have.
          </p>
        </div>
      </section>

      {/* Garden Devils spotlight */}
      <section className="py-24 px-6" style={{ backgroundColor: "#2c3517", color: "#f6f1e6" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-4" style={{ color: "#c2a14e" }}>❦</div>
          <h2 style={serif} className="text-4xl font-semibold mb-6">The Garden Devils</h2>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: "#9aa861" }}>
            Every garden has its adversaries. Slugs that materialise after rain like small, gelatinous opportunists.
            Weeds with more ambition than one&apos;s houseplants. We help you identify them, track them, and prevail —
            by natural means alone.
          </p>
          <p className="text-base mb-12 leading-relaxed italic" style={{ ...serif, color: "#d2ad5c" }}>
            And when the offender has already slipped away? Photograph the damage instead. From the holes, the slime trails,
            the spotted leaves, we name the most likely suspect — slug, caterpillar, beetle or blight.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { n: "Slugs", d: "Active after rain. Ravenous. Slow, yet deeply committed." },
              { n: "Weeds", d: "They were here first. They intend to be here last." },
              { n: "Pests", d: "Small. Numerous. Famished for your hostas." },
              { n: "Disease", d: "Damp weather's most persistent houseguest." },
            ].map((d) => (
              <div key={d.n} className="rounded-xl p-5 border" style={{ backgroundColor: "#38431e", borderColor: "#4d5a2a" }}>
                <div style={{ ...serif, color: "#d2ad5c" }} className="text-xl font-semibold mb-2">{d.n}</div>
                <p className="text-xs leading-relaxed" style={{ color: "#9aa861" }}>{d.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border px-6 py-5" style={{ borderColor: "#c2a14e", backgroundColor: "#38431e" }}>
            <p className="text-base" style={{ ...serif, color: "#d2ad5c" }}>
              We never recommend harmful chemicals — neither for your garden nor the little rascals.
              Every method we suggest is natural, organic, and kind to the soil. Hand-picking, copper tape,
              beer traps, companion planting. A garden at war with itself is no garden at all.
            </p>
          </div>
          <p className="text-sm mt-8 italic" style={{ ...serif, color: "#c2a14e" }}>
            And should it all become too much — there is an &quot;I surrender&quot; button that summons professional gardeners nearby. No shame. Only survival.
          </p>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f6f1e6" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ color: "#c2a14e" }} className="text-sm tracking-[0.3em] uppercase mb-3">For whom</p>
          <h2 style={serif} className="text-4xl font-semibold mb-3">Who is Garden Me for?</h2>
          <p className="mb-14" style={{ color: "#4d5a2a" }}>You, in all likelihood.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {personas.map((p) => (
              <div key={p.who} className="rounded-2xl p-8 border" style={{ backgroundColor: "#ffffff", borderColor: "#e5ddc8" }}>
                <div style={serif} className="text-2xl font-semibold mb-3" >{p.who}</div>
                <p className="text-sm leading-relaxed" style={{ color: "#4d5a2a" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ backgroundColor: "#9aa861" }}>
        <div className="max-w-5xl mx-auto">
          <p style={{ color: "#2c3517" }} className="text-center text-sm tracking-[0.3em] uppercase mb-3">Notices from the garden</p>
          <h2 style={{ ...serif, color: "#2c3517" }} className="text-4xl font-semibold text-center mb-3">What the garden is saying</h2>
          <p className="text-center mb-14" style={{ color: "#2c3517" }}>Reviews from actual plants. And one slug.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((q) => (
              <div key={q.who} className="rounded-2xl p-7" style={{ backgroundColor: "#f6f1e6" }}>
                <div className="mb-3 tracking-widest" style={{ color: "#c2a14e" }}>★★★★★</div>
                <p style={{ ...serif, color: "#2c3517" }} className="text-lg italic leading-relaxed mb-4">&quot;{q.text}&quot;</p>
                <p className="text-xs tracking-wide uppercase" style={{ color: "#4d5a2a" }}>— {q.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather highlight */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: "#38431e", color: "#f6f1e6" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4" style={{ color: "#c2a14e" }}>☂</div>
          <h2 style={serif} className="text-4xl font-semibold mb-6">The garden calls. You answer.</h2>
          <p className="text-lg mb-4 leading-relaxed" style={{ color: "#9aa861" }}>
            Garden Me observes the weather and sends word when attention is required —
            frost warnings, slug weather, drought, the first stirrings of spring.
          </p>
          <p className="text-base italic" style={{ ...serif, color: "#d2ad5c" }}>
            Even if you have not opened the app since last Tuesday. Especially then.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: "#2c3517", color: "#f6f1e6" }}>
        <div className="max-w-xl mx-auto">
          <div className="inline-block rounded-2xl p-3 mb-6" style={{ backgroundColor: "#f6f1e6" }}>
            <Image src="/icon.png" alt="Garden Me" width={80} height={80} className="rounded-xl" />
          </div>
          <h2 style={serif} className="text-4xl font-semibold mb-4">Shall we keep things alive?</h2>
          <p className="mb-10" style={{ color: "#9aa861" }}>Download Garden Me. The garden will notice. The ferns may weep with relief.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="font-medium px-8 py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90" style={{ backgroundColor: "#c2a14e", color: "#2c3517" }}>
              App Store
            </a>
            <a href="#" className="font-medium px-8 py-4 rounded-xl text-base tracking-wide border" style={{ borderColor: "#9aa861", color: "#f6f1e6" }}>
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ backgroundColor: "#2c3517", borderTop: "1px solid #4d5a2a" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "#9aa861" }}>
          <span style={serif} className="italic">© 2026 Garden Me. No plants were harmed in the making of this app. A few slugs were politely relocated.</span>
          <div className="flex gap-6 tracking-wide">
            <a href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</a>
            <a href="/terms" className="hover:opacity-60 transition-opacity">Terms</a>
            <a href="mailto:magnus@bjelkerud.no" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
