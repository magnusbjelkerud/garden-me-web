import Image from "next/image";
const serif = { fontFamily: "var(--font-serif)" };

export default function PrivacyPage() {
  const sections = [
    {
      h: "Data stored locally on your device",
      body: ["Garden Me stores your garden data (plants, garden devils, tasks) locally on your device using AsyncStorage. This data does not leave your device except as described below."],
    },
    {
      h: "Weather alerts and push notifications",
      body: [
        "To send weather-based garden alerts when the app is not open, Garden Me may transmit the following to our servers (hosted on Vercel with Upstash Redis):",
      ],
      list: [
        "Your Expo push notification token",
        "Your approximate location (latitude/longitude)",
        "A summary of your plants and garden devils (names and types only)",
        "Your language preference and last app-open timestamp",
      ],
      after: "This data is used solely to check local weather conditions and send relevant garden alerts. It is automatically deleted after 90 days of inactivity.",
    },
    {
      h: "AI plant identification",
      body: [
        "When you ask for an identification, a piece of advice or an answer, the photograph or question passes through Garden Me's server to Anthropic, who provide the AI. We do not store the content, and it is not used to train models.",
        "Our server counts how many actions your device has used, so that your allowance works. For that it keeps a random device ID, and your IP address briefly to prevent abuse. Neither is tied to a name, an email or an account — you never sign up.",
      ],
    },
    {
      h: "Location",
      body: ["Location data is used for finding nearby garden centres and for weather alerts. We do not build location history or track movement."],
    },
    {
      h: "Purchases",
      body: ["Purchases are handled by the App Store and RevenueCat. We never see your card details."],
    },
  ];

  return (
    <main className="min-h-screen py-20 px-6" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>
      <div className="max-w-2xl mx-auto">
        <a href="/" aria-label="Garden Me — home" className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity">
          <Image src="/logo.png" alt="Garden Me" width={32} height={32} />
          <span style={{ ...serif, color: "#2c3517" }} className="text-xl font-semibold tracking-wide">Garden Me</span>
        </a>
        <h1 style={serif} className="text-4xl font-semibold mt-6 mb-2">Privacy Policy</h1>
        <p className="text-sm mb-12" style={{ color: "#4d5a2a" }}>Last updated: August 2026</p>

        {sections.map((s) => (
          <section key={s.h} className="mb-10">
            <h2 style={serif} className="text-2xl font-semibold mb-3" >{s.h}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="leading-relaxed mb-3" style={{ color: "#4d5a2a" }}>{p}</p>
            ))}
            {s.list && (
              <ul className="space-y-1 leading-relaxed mb-3" style={{ color: "#4d5a2a" }}>
                {s.list.map((li) => <li key={li}>— {li}</li>)}
              </ul>
            )}
            {s.after && <p className="leading-relaxed" style={{ color: "#4d5a2a" }}>{s.after}</p>}
          </section>
        ))}

        <section className="mb-8">
          <h2 style={serif} className="text-2xl font-semibold mb-3">Contact</h2>
          <p className="leading-relaxed" style={{ color: "#4d5a2a" }}>
            Questions? Write to{" "}
            <a href="mailto:magnus@bjelkerud.no" className="underline" style={{ color: "#c2a14e" }}>magnus@bjelkerud.no</a>
          </p>
        </section>
      </div>
    </main>
  );
}
