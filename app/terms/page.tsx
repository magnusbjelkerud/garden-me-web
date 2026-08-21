import SiteNav from "../SiteNav";
const serif = { fontFamily: "var(--font-serif)" };

export default function TermsPage() {
  const terms = [
    "Garden Me is a personal garden assistance tool, not a professional horticultural service.",
    "AI identification of plants and pests may be incorrect. You are responsible for verifying information against experts and authoritative sources.",
    "Garden Me is not liable for damage to plants, gardens, property, or health resulting from incorrect identification or incorrect use of information in the app.",
    "We never recommend dangerous chemicals, pesticides, or other harmful substances. All recommendations are based on natural and eco-friendly methods.",
    "The app is provided “as is” without warranty. Always use common sense and consult experts for important decisions.",
    "Weather alerts are informational only and based on publicly available weather data. Garden Me is not responsible for garden damage resulting from weather events.",
    "Sharing a garden with your household puts that garden, and the photographs in it, on our server so both telephones can reach it. Use it for your garden. It is not a file store, a messaging service, or a way to pass material between people, and using it as one — or to hold anything unlawful — ends your access and, where the law requires it, is reported. We may remove stored content and close a shared garden without notice where we have reason to believe this clause is being broken.",
    "Photographs shared with a household are held for at most ninety days from when they were last synchronised, and are deleted when either of you stops sharing. Write to us through the support page to have anything removed sooner.",
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>
      <SiteNav />
      <main className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 style={serif} className="text-4xl font-semibold mb-2">Terms of Service</h1>
        <p className="text-sm mb-12" style={{ color: "#4d5a2a" }}>Last updated: August 2026</p>

        <p className="leading-relaxed mb-8" style={{ color: "#4d5a2a" }}>By using Garden Me you agree to the following:</p>

        <ol className="space-y-6">
          {terms.map((t, i) => (
            <li key={i} className="leading-relaxed flex gap-3" style={{ color: "#4d5a2a" }}>
              <span style={{ ...serif, color: "#c2a14e" }} className="text-xl font-semibold">{i + 1}.</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>

        {/* Apple guideline 3.1.2 requires the subscription terms and a link to
            the Terms of Use (EULA) to be reachable from the app itself. The
            paywall links here, so this is where they must live — the first
            submission was refused for want of exactly this. */}
        <section className="mt-16">
          <h2 style={serif} className="text-2xl font-semibold mb-4">Subscriptions and credits</h2>

          <p className="leading-relaxed mb-4" style={{ color: "#4d5a2a" }}>
            Garden Me is free to use. Recording plants, reminders, the year wheel, pest
            tracking, shopping lists, the journal and weather warnings cost nothing and
            always will. Only the AI actions — identification, questions and light checks —
            are counted, and every account begins with ten of them.
          </p>

          <p className="leading-relaxed mb-4" style={{ color: "#4d5a2a" }}>
            <strong>Bronze, Silver and Gold</strong> are auto-renewing subscriptions,
            offered monthly or yearly, granting 25, 60 and 150 actions per month
            respectively. The price and period are shown in the app before you confirm,
            and payment is charged to your Apple ID account at confirmation of purchase.
          </p>

          <p className="leading-relaxed mb-4" style={{ color: "#4d5a2a" }}>
            A subscription renews automatically unless it is cancelled at least 24 hours
            before the end of the current period, and is charged for renewal within the
            24 hours before that period ends. You may manage or cancel it at any time in
            iOS Settings, under your name, then Subscriptions. We cannot cancel one on
            your behalf — Apple does not permit it.
          </p>

          <p className="leading-relaxed mb-4" style={{ color: "#4d5a2a" }}>
            <strong>Action packs</strong> of 20, 60 and 150 are one-off purchases rather
            than subscriptions. They do not renew, they do not expire, and there is
            nothing to cancel. Unused actions from a subscription do not carry into the
            following month; purchased packs are unaffected and simply wait.
          </p>

          <p className="leading-relaxed mb-8" style={{ color: "#4d5a2a" }}>
            All payments are handled by Apple. We never see your card details, and
            refunds are requested from Apple rather than from us.
          </p>

          <h2 style={serif} className="text-2xl font-semibold mb-4">Terms of Use (EULA)</h2>
          <p className="leading-relaxed" style={{ color: "#4d5a2a" }}>
            In addition to the terms above, your use of Garden Me is governed by Apple's
            standard End User Licence Agreement:{" "}
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              className="underline"
              style={{ color: "#c2a14e" }}
            >
              Apple Standard EULA
            </a>
            .
          </p>
        </section>

        <div className="mt-14 pt-8 flex gap-6 text-sm flex-wrap" style={{ borderTop: "1px solid #e5ddc8", color: "#9aa861" }}>
          <a href="/faq" className="underline hover:opacity-70">Questions &amp; Answers</a>
          <a href="/support" className="underline hover:opacity-70">Support</a>
          <a href="/privacy" className="underline hover:opacity-70">Privacy Policy</a>
        </div>
      </div>
      </main>
    </div>
  );
}
