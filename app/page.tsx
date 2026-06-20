import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: "🔍",
      title: "Plant Detective",
      desc: "Snap a photo and get an instant AI identification. Works on roses, weeds, and that mysterious thing growing under the fence that your neighbour swears is ornamental.",
    },
    {
      icon: "📅",
      title: "The Nagging Calendar",
      desc: "Year-round care reminders for every plant in your garden. We push-notify you when it's time to prune, water, or fertilise — so you stop discovering dead things in October.",
    },
    {
      icon: "👿",
      title: "Garden Devil Registry",
      desc: "Slugs. Weeds. Invasive species. Register your enemies, track their spread, and get safe removal advice. Violence against plants strictly prohibited. Slugs: negotiable.",
    },
    {
      icon: "🌤️",
      title: "Weather Patrol",
      desc: "Push alerts when frost, drought, or heavy rain threatens your specific garden. Even when you haven't opened the app in two weeks and have completely forgotten the garden exists.",
    },
    {
      icon: "🌍",
      title: "Speaks Your Language",
      desc: "Norwegian, Swedish, Danish, English, German, Dutch. Climate-aware advice per country. The plants don't care about borders. We do, a little.",
    },
    {
      icon: "🤖",
      title: "Powered by Claude AI",
      desc: "Not the kind of AI that confidently tells you a cactus needs daily watering. The kind that knows the difference between a rose and a ranunculus — and admits when it's not sure.",
    },
  ];

  const personas = [
    {
      emoji: "🌷",
      who: "The enthusiast",
      desc: "You have opinions about soil pH and buy plants before you know where to put them. Garden Me finally organises your beautiful chaos.",
    },
    {
      emoji: "😬",
      who: "The reluctant gardener",
      desc: "You inherited a garden and are doing your best. Garden Me tells you what things are, what they need, and whether to panic.",
    },
    {
      emoji: "🏡",
      who: "The cabin owner",
      desc: "You visit four times a year and something always dies in between. With weather alerts and care reminders, maybe not this year.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-xl font-bold text-emerald-800">
          <Image src="/flower.png" alt="Garden Me" width={32} height={32} /> Garden Me
        </div>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#features" className="hover:text-emerald-700 transition-colors">Features</a>
          <a href="/privacy" className="hover:text-emerald-700 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-emerald-700 transition-colors">Terms</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-emerald-950 text-white px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <Image src="/flower.png" alt="Garden Me" width={140} height={140} className="mx-auto mb-6" priority />
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">Garden Me</h1>
          <p className="text-emerald-300 text-2xl font-medium mb-4">
            Because your plants can&apos;t text you when they&apos;re dying.
          </p>
          <p className="text-emerald-400 text-lg mb-10 max-w-xl mx-auto">
            AI plant identification, year-round care reminders, pest tracking, and weather alerts —
            for people who take their garden seriously. Or at least feel bad when things die.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="bg-white text-emerald-900 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-emerald-50 transition-colors">
              🍎 App Store
            </a>
            <a href="#" className="bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-emerald-600 transition-colors">
              🤖 Google Play
            </a>
          </div>
          <p className="text-emerald-600 text-sm mt-6">Free to download. No subscription. No hidden fees. Just plants.</p>
        </div>
      </section>

      {/* Fake phone mockups */}
      <section className="bg-emerald-900 py-12 flex justify-center gap-4 overflow-hidden">
        {[
          { bg: "bg-emerald-800", label: "My Garden", icon: "🌱" },
          { bg: "bg-red-900", label: "Garden Devils", icon: "🐌" },
          { bg: "bg-sky-900", label: "Tasks & Weather", icon: "📅" },
          { bg: "bg-lime-800", label: "Equipment", icon: "🛠️" },
        ].map((screen) => (
          <div key={screen.label} className={`w-28 h-52 rounded-2xl border-2 border-emerald-700 ${screen.bg} flex-shrink-0 shadow-xl flex flex-col items-center justify-center gap-2`}>
            <span className="text-3xl">{screen.icon}</span>
            <span className="text-white text-xs font-semibold text-center px-2">{screen.label}</span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-emerald-900 mb-4">
          Everything your garden needs. Nothing it doesn&apos;t.
        </h2>
        <p className="text-center text-gray-500 mb-16 text-lg">
          Except rain. We can&apos;t actually make it rain.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold text-emerald-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who is it for */}
      <section className="bg-lime-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-emerald-900 mb-12">Who is Garden Me for?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {personas.map((p) => (
              <div key={p.who} className="bg-white rounded-2xl p-6 shadow-sm border border-lime-100">
                <div className="text-3xl mb-2">{p.emoji}</div>
                <div className="font-bold text-emerald-900 mb-1">{p.who}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather push highlight */}
      <section className="bg-sky-950 text-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">❄️</div>
          <h2 className="text-3xl font-bold mb-4">Your garden calls. You answer.</h2>
          <p className="text-sky-300 text-lg mb-4">
            Garden Me monitors the weather and sends you a push notification when something needs attention —
            frost warnings, slug weather, drought alerts, spring wake-up calls.
          </p>
          <p className="text-sky-500 text-base">
            Even if you haven&apos;t opened the app since last Tuesday. Especially then.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-emerald-950 text-white py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <Image src="/flower.png" alt="Garden Me" width={90} height={90} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to stop killing plants?</h2>
          <p className="text-emerald-400 mb-8">Download Garden Me. Your garden will notice.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="bg-white text-emerald-900 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-emerald-50 transition-colors">
              🍎 App Store
            </a>
            <a href="#" className="bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-emerald-600 transition-colors">
              🤖 Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 border-t border-emerald-900 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-emerald-600">
          <span>🌿 © 2026 Garden Me. No plants were harmed in the making of this app.</span>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="mailto:magnus@bjelkerud.no" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
