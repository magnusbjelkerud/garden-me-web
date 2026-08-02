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
      h: "If the garden is only on my phone, how does the neighbour see it?",
      p: "Because sharing uploads a copy. When you make a link, we take a snapshot of that garden — plant names, what wants doing, the notes for whoever is watering, and a small photograph of each plant — and put it on our server so a browser can open it without an app or an account. It is the one time the garden leaves your phone, and it is the only way a link could work. The copy deletes itself after ninety days, or sooner if you ask us.",
    },
    {
      h: "How do I cancel a subscription?",
      p: "In iOS Settings, under your name, then Subscriptions. Bronze, Silver and Gold all live there. We cannot cancel one for you — Apple does not permit it, and it would not be right in any case. Credits you have bought are not a subscription and need no cancelling.",
    },
    {
      h: "Twenty actions costs the same as a month of Silver. Why?",
      p: "Because you are buying two different things. Silver is sixty actions a month, every month, and it stops when you stop it. Twenty actions is twenty actions, and they sit there until you use them — through a winter, or two, or until you remember the app exists again in April. A subscription is always the better rate per action; that is rather the point of it. The packs are for gardens that want attention twice a year, where a monthly bill would be an insult.",
    },
    {
      h: "Which subscription should I take?",
      p: "Bronze if you have a few pots. Silver if the garden asks you something most weeks. Gold if you would rather stop counting — a hundred and fifty a month is more than a large garden manages to use, which is the whole idea. You can move between them in iOS Settings, and moving up takes effect at once.",
    },
    {
      h: "Did the app get a plant wrong?",
      p: "Say so. There is a button under every identification that makes it think again without repeating itself, and it costs nothing. If it is still wrong after a few attempts, a clearer photograph usually settles it — leaf, bark and flower separately works better than the whole shrub.",
    },
    {
      h: "What do you know about me?",
      p: "No account, no name, no email address. Photographs and questions pass through our server to Anthropic to be answered; we keep a count of how many actions your device has used so the allowance works, and briefly your IP address to stop abuse. Your rough location goes up for weather alerts, along with a notification token so the alerts can reach you when the app is closed. If you have shared the garden, a copy of it sits on our server too, thumbnails included. None of it is tied to a name, none of it is sold, and none of it advertises to you. The details are in the privacy policy.",
    },
    {
      h: "Can I have my data deleted?",
      p: "Delete the app and the garden goes with it. For what sits on our servers — a device identifier, a balance, your last known area, and any garden you have shared a link to — write to us and it is removed. There is not much of it.",
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
