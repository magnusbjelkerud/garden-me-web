import SiteNav from "../SiteNav";

const serif = { fontFamily: "var(--font-serif)" };

export const metadata = {
  title: "Questions & Answers — Garden Me",
  description:
    "How Garden Me works: actions and what they cost, adding plants for free, several gardens in several countries, sharing one garden between two telephones, what happens if you lose your phone, and how far the advice may be trusted.",
};

/** Everything here answers "how does this work". Anything that answers "something
 *  has gone wrong" belongs on /support instead — the two pages are kept apart on
 *  purpose, because a question and a complaint want very different tones, and an
 *  answer written in both places drifts apart within a month. */
const groups: { group: string; items: { h: string; p: string }[] }[] = [
  {
    group: "Beginning",
    items: [
      {
        h: "Do I need an account?",
        p: "No. No name, no email address, no password, nothing to forget. Open the app and it works. The garden lives on your telephone and belongs to you — which is pleasant, and also means that deleting the app deletes the garden, so do consider the export before any dramatic gesture.",
      },
      {
        h: "What does it cost to begin?",
        p: "Nothing. The app is free, and you arrive with ten actions to spend as you please. No card, no trial that quietly becomes a subscription on the fourteenth day, no countdown in the corner.",
      },
      {
        h: "What is an action?",
        p: "One identification, one question to Garden Me, or one light check — anything where the app has to stop and think. Everything else is free and always will be: the reminders, the year wheel, the pest tracking, the journal, the weather warnings. The one exception is the shopping list, which is written afresh from your particular garden every time it changes — no two gardens being alike, it is the one answer we cannot work out once and share with everybody — so it comes with a subscription, or costs a single action.",
      },
      {
        h: "Must I spend an action to add a plant?",
        p: "Not at all. If you already know it is a rhubarb, type “rhubarb” and it costs nothing whatever — no photograph, no thinking, no action. You may record an entire garden that way and still have all ten in hand for the shrub by the fence that nobody has ever been able to name.",
      },
      {
        h: "Does it work without a signal?",
        p: "The garden itself does — plants, reminders, tasks, notes, the journal, all of it sits on the telephone and opens whether or not there is a bar of coverage, which is the usual state of affairs at a cabin. Identification and questions need the network, since that is where the thinking happens.",
      },
    ],
  },
  {
    group: "What it costs",
    items: [
      {
        h: "What happens when the ten run out?",
        p: "Nothing breaks. Every plant you have recorded stays exactly where it is, the reminders continue to arrive, the weather still warns you. Only the thinking pauses — and it resumes the moment you take a subscription or buy a pack. The ten are a welcome rather than a monthly allowance, so they do not quietly return in the new year.",
      },
      {
        h: "Which subscription should I take?",
        p: "Bronze if you have a few pots. Silver if the garden asks you something most weeks. Gold if you would rather stop counting altogether — a hundred and fifty actions a month is more than a large garden manages to use, which is precisely the idea.",
      },
      {
        h: "May I change my mind afterwards?",
        p: "Yes, in iOS Settings under your name, then Subscriptions. Moving up takes effect at once; moving down takes effect when the month you have already paid for runs out. You may also stop entirely, and everything you have recorded remains.",
      },
      {
        h: "Twenty actions costs about the same as a month of Silver. Why?",
        p: "Because you are buying two different things. Silver is sixty actions a month, every month, and it stops when you stop it. Twenty actions is twenty actions, and they sit there until you use them — through a winter, or two, or until you remember the app exists again in April. A subscription is always the better rate per action; that is rather the point of it. The packs are for gardens that want attention twice a year, where a monthly bill would be an insult.",
      },
    ],
  },
  {
    group: "Gardens and plants",
    items: [
      {
        h: "May I have more than one garden?",
        p: "As many as you have places, each with its own name, its own kind, and — this matters more than it sounds — its own country. The cabin in Finland is then advised about Finnish winters rather than about yours. A garden below the equator has its seasons turned the right way round without being asked. Switch between them from the header, and every reminder and warning follows.",
      },
      {
        h: "I named a garden badly, or chose the wrong country.",
        p: "Both are corrected in a moment — open the garden list and tap the pencil beside the one in question. Names get typed in a hurry and countries get chosen before one has thought about the cabin, and neither ought to be permanent.",
      },
      {
        h: "May I keep several photographs of the same plant?",
        p: "Yes, and you should. Photograph the label at the garden centre so the identification has printed text to work from, then replace the cover picture with the plant itself once it is in the ground. The rest gather in the journal, and a rose acquires a history.",
      },
      {
        h: "It got the plant wrong.",
        p: "Say so — there is a button beneath every identification that makes it think again without repeating an answer you have already rejected, and it costs nothing. You may also tell it what you believe it to be: “this is a plum tree, I am fairly certain” is treated as the strongest evidence in the room, since you are standing beside it and we are not.",
      },
      {
        h: "Do the reminders arrive when the app is closed?",
        p: "Yes — they are proper notifications, and they arrive whether or not you have opened the app since Tuesday. Especially then. If they become too much during a busy month, they can be paused without losing anything; the year wheel keeps turning underneath.",
      },
      {
        h: "Which languages does it speak?",
        p: "Norwegian, Swedish, Danish, English, German and Dutch, with advice that knows the difference between a Norwegian winter and a Dutch one. Seventeen countries may be chosen for a garden, including three below the equator.",
      },
    ],
  },
  {
    group: "Sharing",
    items: [
      {
        h: "If the garden is only on my telephone, how does the neighbour see it?",
        p: "Because sharing uploads a copy. When you make a link we take a snapshot of that garden — the plant names, what wants doing, the notes for whoever is watering, and a small photograph of each plant — and place it on our server so that a browser may open it without an app or an account. It is the one occasion on which the garden leaves your telephone, and it is the only way a link could possibly work. The copy deletes itself after ninety days, or sooner if you ask.",
      },
      {
        h: "Can the two of us keep the same garden?",
        p: "Yes, and without inventing an account between you. One of you opens Share the garden and gets a code of twelve characters; the other types it in. From then on it is one garden on two telephones — she adds the plum tree, you tick off the pruning, and each of you sees the other. Both phones hold the whole garden and work without a signal; our server only keeps the last thing you agreed on. If a merge ever looks wrong, one button puts the garden back exactly as it stood before it.",
      },
      {
        h: "Do the photographs travel too?",
        p: "Between the two of you, yes — otherwise one of you photographs a new plant and the other is left looking at an empty frame. They stay on our server only for as long as you share, at most ninety days from the last time the phones spoke, and they are deleted the moment either of you stops. If you do not share your garden with anybody, not a single photograph ever leaves your telephone.",
      },
      {
        h: "What happens if I lose my telephone?",
        p: "The honest answer is that the garden goes with it, unless you have done one of two things. There is no account to recover it from — that is the same choice that spared you a password, and it cuts both ways. So take the export now and again and send it to yourself, or share the garden with a second telephone, in which case that phone is the copy and keeps itself up to date. The app will say this to you once, quietly, when your garden has grown large enough to be worth losing.",
      },
      {
        h: "What exactly does the neighbour get to see?",
        p: "That one garden, as it stood when you made the link, and nothing else: no other garden of yours, no purchase history, no location, no way back to you. They cannot change anything, and there is nothing to sign into.",
      },
    ],
  },
  {
    group: "Trust",
    items: [
      {
        h: "Is the advice to be trusted?",
        p: "It is generated, and it can be wrong. Treat it as a well-read friend rather than an authority: helpful, usually right, occasionally confident about something it ought not to be. Do not eat anything on our say-so, and check anything that genuinely matters — particularly where children and pets are concerned.",
      },
      {
        h: "Are my photographs used to train an AI?",
        p: "No. They pass through our server to Anthropic in order to be answered, and Anthropic's commercial terms are that traffic through their API is not used to train their models. We keep no copy ourselves — the single exception being the small thumbnails in a garden you have chosen to share, which expire after ninety days.",
      },
      {
        h: "What do you actually know about me?",
        p: "Remarkably little, and none of it a name. There is a device identifier so that your allowance and your purchases find their way back to you, a count of actions used, and — if you have allowed weather warnings — your area rounded to about a kilometre, so that we know the valley and not the address. Nothing is sold and nothing advertises to you. The particulars are in the privacy policy, and the deletion request is one email.",
      },
    ],
  },
];

export default function Faq() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>
      <SiteNav />
      <main className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 style={serif} className="text-4xl font-semibold mb-2">Questions &amp; Answers</h1>
        <p className="text-base mb-12 leading-relaxed" style={{ color: "#4d5a2a" }}>
          How the thing works, what it costs, and what becomes of your photographs.
          If something has gone wrong rather than merely puzzled you,{" "}
          <a href="/support" className="underline hover:opacity-70">support is over here</a>.
        </p>

        {groups.map((g) => (
          <div key={g.group} className="mb-14">
            <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "#c2a14e" }}>{g.group}</p>
            {g.items.map((f) => (
              <section key={f.h} className="mb-8">
                <h2 style={serif} className="text-xl font-semibold mb-2">{f.h}</h2>
                <p className="leading-relaxed" style={{ color: "#4d5a2a" }}>{f.p}</p>
              </section>
            ))}
          </div>
        ))}

        <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#ffffff", borderColor: "#c2a14e" }}>
          <p className="text-sm mb-2" style={{ color: "#9aa861" }}>Not answered here?</p>
          <a href="mailto:magnus@bjelkerud.no" style={{ ...serif, color: "#2c3517" }} className="text-2xl font-semibold underline">
            magnus@bjelkerud.no
          </a>
          <p className="text-sm mt-3 leading-relaxed" style={{ color: "#4d5a2a" }}>
            In Norwegian or English, whichever you prefer. A real person reads it, and there is no ticket number.
          </p>
        </div>

        <div className="mt-14 pt-8 flex gap-6 text-sm flex-wrap" style={{ borderTop: "1px solid #e5ddc8", color: "#9aa861" }}>
          <a href="/privacy" className="underline hover:opacity-70">Privacy Policy</a>
          <a href="/terms" className="underline hover:opacity-70">Terms of Service</a>
        </div>
      </div>
      </main>
    </div>
  );
}
