import Image from "next/image";

const serif = { fontFamily: "var(--font-serif)" };

export const metadata = {
  title: "Support — Garden Me",
  description: "Help with Garden Me: how actions work, restoring purchases, your data, and how to reach a human.",
};

export default function Support() {
  const faqs = [
    {
      h: "Something is wrong. Who do I write to?",
      p: "Magnus, who made it. There is no support department and no ticket number — magnus@bjelkerud.no reaches a person. Say which phone you have and what happened, and expect a reply within a day or two.",
    },
    {
      h: "What is an action?",
      p: "One identification, one question to Garden Me, or one light check — anything where the app has to think. Everything else is free and always will be: the reminders, the year wheel, the pest tracking, the shopping lists, the journal, the weather. You begin with ten.",
    },
    {
      h: "I have paid but nothing arrived.",
      p: "Purchases are confirmed by the App Store first and credited a moment later, so give it a few seconds and reopen the paywall. If the balance still has not moved, write to us with the date of the purchase and we will put it right — the receipt is proof enough, and you will not be asked for more than that.",
    },
    {
      h: "I reinstalled the app and my plants are gone.",
      p: "Your garden lives on the device, not on our servers. Deleting the app deletes the garden with it. Your subscription and any credits do survive — tap Restore purchases in the paywall.",
    },
    {
      h: "How do I cancel Garden Me +?",
      p: "In iOS Settings, under your name, then Subscriptions. We cannot cancel it for you — Apple does not permit it, and would not be right in any case. Credits you have bought are not a subscription and need no cancelling.",
    },
    {
      h: "Did the app get a plant wrong?",
      p: "Say so. There is a button under every identification that makes it think again without repeating itself, and it costs nothing. If it is still wrong after a few attempts, a clearer photograph usually settles it — leaf, bark and flower separately works better than the whole shrub.",
    },
    {
      h: "What do you know about me?",
      p: "No account, no name, no email address. The app sends photographs and questions to Anthropic to be answered, and your rough location for weather and to find nearby garden centres. Nothing is sold, and nothing is used to advertise to you. The details are in the privacy policy.",
    },
    {
      h: "Can I have my data deleted?",
      p: "Delete the app and the garden goes with it. For what sits on our servers — a device identifier, a balance, your last known area — write to us and it is removed. There is not much of it.",
    },
    {
      h: "Is the advice to be trusted?",
      p: "It is generated, and it can be wrong. Treat it as a well-read friend rather than an authority: helpful, usually right, occasionally confident about something it should not be. Do not eat anything on our say-so, and check anything that matters — particularly around children and pets.",
    },
  ];

  return (
    <main className="min-h-screen py-20 px-6" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>
      <div className="max-w-2xl mx-auto">
        <a href="/" aria-label="Garden Me — home" className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity">
          <Image src="/logo.png" alt="Garden Me" width={32} height={32} />
          <span style={{ ...serif, color: "#2c3517" }} className="text-xl font-semibold tracking-wide">Garden Me</span>
        </a>

        <h1 style={serif} className="text-4xl font-semibold mt-6 mb-2">Support</h1>
        <p className="text-sm mb-10" style={{ color: "#4d5a2a" }}>
          Something not working, or simply puzzling? Start here.
        </p>

        <div className="rounded-2xl p-6 border mb-12" style={{ backgroundColor: "#ffffff", borderColor: "#c2a14e" }}>
          <p className="text-sm mb-2" style={{ color: "#9aa861" }}>Write to us</p>
          <a href="mailto:magnus@bjelkerud.no" style={{ ...serif, color: "#2c3517" }} className="text-2xl font-semibold underline">
            magnus@bjelkerud.no
          </a>
          <p className="text-sm mt-3 leading-relaxed" style={{ color: "#4d5a2a" }}>
            In Norwegian or English, whichever you prefer. A real person reads it.
          </p>
        </div>

        {faqs.map((f) => (
          <section key={f.h} className="mb-8">
            <h2 style={serif} className="text-xl font-semibold mb-2">{f.h}</h2>
            <p className="leading-relaxed" style={{ color: "#4d5a2a" }}>{f.p}</p>
          </section>
        ))}

        <div className="mt-14 pt-8 flex gap-6 text-sm" style={{ borderTop: "1px solid #e5ddc8", color: "#9aa861" }}>
          <a href="/privacy" className="underline hover:opacity-70">Privacy Policy</a>
          <a href="/terms" className="underline hover:opacity-70">Terms of Service</a>
        </div>
      </div>
    </main>
  );
}
