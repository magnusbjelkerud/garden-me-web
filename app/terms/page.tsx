const serif = { fontFamily: "var(--font-serif)" };

export default function TermsPage() {
  const terms = [
    "Garden Me is a personal garden assistance tool, not a professional horticultural service.",
    "AI identification of plants and pests may be incorrect. You are responsible for verifying information against experts and authoritative sources.",
    "Garden Me is not liable for damage to plants, gardens, property, or health resulting from incorrect identification or incorrect use of information in the app.",
    "We never recommend dangerous chemicals, pesticides, or other harmful substances. All recommendations are based on natural and eco-friendly methods.",
    "The app is provided “as is” without warranty. Always use common sense and consult experts for important decisions.",
    "Weather alerts are informational only and based on publicly available weather data. Garden Me is not responsible for garden damage resulting from weather events.",
  ];

  return (
    <main className="min-h-screen py-20 px-6" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-sm tracking-wide hover:opacity-60 transition-opacity" style={{ color: "#c2a14e" }}>← Garden Me</a>
        <h1 style={serif} className="text-4xl font-semibold mt-6 mb-2">Terms of Service</h1>
        <p className="text-sm mb-12" style={{ color: "#4d5a2a" }}>Last updated: June 2026</p>

        <p className="leading-relaxed mb-8" style={{ color: "#4d5a2a" }}>By using Garden Me you agree to the following:</p>

        <ol className="space-y-6">
          {terms.map((t, i) => (
            <li key={i} className="leading-relaxed flex gap-3" style={{ color: "#4d5a2a" }}>
              <span style={{ ...serif, color: "#c2a14e" }} className="text-xl font-semibold">{i + 1}.</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
