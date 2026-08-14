import SiteNav from "../SiteNav";

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
      h: "I have paid but nothing arrived.",
      p: "Purchases are confirmed by the App Store first and credited a moment later, so give it a few seconds and reopen the paywall. If the balance still has not moved, write to us with the date of the purchase and we will put it right — the receipt is proof enough, and you will not be asked for more than that.",
    },
    {
      h: "I reinstalled the app and my plants are gone.",
      p: "Your garden lives on the device, not on our servers. Deleting the app deletes the garden with it. Your subscription and any credits do survive — tap Restore purchases in the paywall.",
    },
    {
      h: "How do I cancel a subscription?",
      p: "In iOS Settings, under your name, then Subscriptions. Bronze, Silver and Gold all live there. We cannot cancel one for you — Apple does not permit it, and it would not be right in any case. Credits you have bought are not a subscription and need no cancelling.",
    },
    {
      h: "What do you know about me?",
      p: "No account, no name, no email address. Photographs and questions pass through our server to Anthropic to be answered; we keep a count of how many actions your device has used so the allowance works, and briefly your IP address to stop abuse. Your rough location goes up for weather alerts, along with a notification token so the alerts can reach you when the app is closed. If you have shared the garden, a copy of it sits on our server too, thumbnails included. None of it is tied to a name, none of it is sold, and none of it advertises to you. The details are in the privacy policy.",
    },
    {
      h: "Can I have my data deleted?",
      p: "Delete the app and the garden goes with it. For what sits on our servers — a device identifier, a balance, your last known area, and any garden you have shared a link to — write to us and it is removed. There is not much of it.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>
      <SiteNav />
      <main className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 style={serif} className="text-4xl font-semibold mb-2">Support</h1>
        <p className="text-base mb-10 leading-relaxed" style={{ color: "#4d5a2a" }}>
          When something has gone wrong. If you are merely wondering how the thing
          works — actions, subscriptions, several gardens, what the neighbour sees —{" "}
          <a href="/faq" className="underline hover:opacity-70">the questions and answers are over here</a>.
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

        <div className="mt-14 pt-8 flex gap-6 text-sm flex-wrap" style={{ borderTop: "1px solid #e5ddc8", color: "#9aa861" }}>
          <a href="/privacy" className="underline hover:opacity-70">Privacy Policy</a>
          <a href="/terms" className="underline hover:opacity-70">Terms of Service</a>
        </div>
      </div>
      </main>
    </div>
  );
}
