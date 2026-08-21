import Image from "next/image";
import SiteNav from "./SiteNav";

const serif = { fontFamily: "var(--font-serif)" };

/* Den ene lenken ut av siden. Sto som href="#" fra siden ble skrevet, fordi
   appen den gang ikke fantes ennå — og ble stående etter at den gjorde det.
   Hovedknappen på forsiden gikk altså ingen steder i akkurat den perioden
   noen kunne ha lastet den ned. */
const APP_STORE = "https://apps.apple.com/app/id6796947839";

export default function Home() {
  const features = [
    {
      icon: "🔍",
      title: "Plant Detective",
      desc: "Photograph any plant and receive an identification down to the cultivar where the evidence allows — not merely 'apple tree', but which apple tree. Leaf, bark, fruit and habit all considered.",
    },
    {
      icon: "✎",
      title: "Write It Down for Nothing",
      desc: "Not every plant needs identifying. If you already know it is a rhubarb, type “rhubarb” and it costs you nothing at all — no photograph, no action spent, no ceremony. Record the whole garden for free, and save the asking for the ones you genuinely wonder about.",
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
      icon: "🦌",
      title: "Uninvited Guests",
      desc: "The roe deer strips a newly planted apple in its first winter, and by the time there is damage worth photographing the tree is already finished. So we name who is coming before they arrive — deer, elk, voles, hares — and what to do about it, with measurements. Mesh width, guard height, the month it must be standing. Not merely “protect from deer”.",
    },
    {
      icon: "🩺",
      title: "Ailments Worth Recognising",
      desc: "A reminder that says “watch for silver leaf in August” is no use whatever to somebody who has never seen silver leaf. So every plant carries the illnesses that actually threaten it: what you will see, in the order you will notice it, and the one test that settles the matter — cut a dying branch and look for the dark stain in the wood.",
    },
    {
      icon: "🔬",
      title: "Damage Forensics",
      desc: "The culprit has fled, but the evidence remains. Photograph a half-eaten leaf and we deduce the offender — slug, caterpillar, beetle or blight — from the holes, the trails, the telltale spots.",
    },
    {
      icon: "🏷️",
      title: "Should You Even Buy It?",
      desc: "Standing in the garden centre, holding something beautiful and expensive. Photograph it before you commit and we will tell you plainly what it demands of you — watering, pruning, winter coddling — and how forgiving it is when you forget. Photograph the label rather than the leaves if you like: a printed cultivar name beats any amount of squinting at foliage. Some plants are a joy. Some are a second job.",
    },
    {
      icon: "🌱",
      title: "Knows Its Age — And Keeps Track",
      desc: "Tag each plant as freshly planted, settling in, or well established. A seedling and a veteran want entirely different things — and only one of them is permitted to be dramatic about it. It then grows up on its own: we count growing seasons, not calendar days, because nothing puts down roots in February.",
    },
    {
      icon: "🏡",
      title: "Pot, Bed, Greenhouse or Windowsill",
      desc: "A potted bay dries out in a day; the border two metres away holds water for a week. Under glass it never rains at all, and the pests are entirely different ones. Tell us where each plant actually stands and the advice changes accordingly — not the garden in general, this plant in particular.",
    },
    {
      icon: "☀️",
      title: "Sun, or the Lack of It",
      desc: "We ask where the plant stands, not merely what it would prefer. When the two disagree, we say so in the first breath — what it wants, what it is getting, and precisely how that ends.",
    },
    {
      icon: "✉",
      title: "A Link for the Neighbour",
      desc: "Going away? Share the garden as a web page. Whoever is watering will see what needs doing, how much is too much, and a photograph of every plant — so “the one by the shed” need never be attempted over a bad line from the airport. No app, no account, no explanation required.",
    },
    {
      icon: "🙅",
      title: "\"No, That Is Wrong\"",
      desc: "You know your own garden. Reject an identification and Garden Me starts the reasoning over — never offering the same answer twice, and telling you which visible detail separates the new guess from the one you ruled out. You may also simply say what you think it is: “this is a plum tree, I am fairly certain” is treated as the strongest evidence in the room, because you are standing next to it and we are not. Being corrected costs you nothing. It rather ought not to.",
    },
    {
      icon: "🌾",
      title: "What to Sow, and When",
      desc: "Every gardening app tells you how to look after the plants you already own. This one also tells you what to put in the ground this month — five to eight things worth sowing where you live, in the setting you actually have, with sowing depth and spacing in real numbers rather than a vague handful. January on a Norwegian windowsill is chilli, aubergine and celery, going out in June. August in the open ground is spinach, autumn radish and kale. Under glass it is a different list on the same day, which is rather the point of glass.",
    },
    {
      icon: "🧺",
      title: "What the Garden Gave Back",
      desc: "Two kilos of tomatoes on the eleventh. Twelve courgettes nobody asked for. Keep a running note of what you actually picked, and the season adds itself up in the corner of the plant's page. We will happily tell you what you harvested from the plant you planted — and we will still never tell you whether something you found is safe to eat, because being wrong about that is a different order of wrong.",
    },
    {
      icon: "🧑‍🌾",
      title: "The Allotment",
      desc: "Schrebergarten, volkstuin, kolonihave, kolonilott — five of our six languages have a word for it and a culture behind it, and it is not a garden. It is a rented plot you reach twice a week, worked in rows, mostly annuals, with a shared tap, no shed and a committee with opinions. So the watering advice assumes four days of absence, crop rotation becomes real advice rather than theory, tools are the ones that fit in a bag, and nothing permanent is suggested without noting that your site may not permit it.",
    },
    {
      icon: "🐞",
      title: "The Garden Heroes",
      desc: "Every garden has a workforce, and most of it is never thanked. Bees, bumblebees, ladybirds, hoverflies, lacewings, earthworms, spiders, hedgehogs, toads and the ground beetle that eats slug eggs out of the soil in April — a slug you never meet being the cheapest slug you will ever have. Garden Me keeps a page for them beside the one for the Gremlins, because the difference is worth stating plainly: gremlins arrive uninvited and eat your plants, and heroes arrive uninvited and eat the ones eating your plants.",
    },
    {
      icon: "🏅",
      title: "Employee of the Month",
      desc: "One of them is picked each month — not the one you are most likely to see, but the one that most needs you right now. In June the ladybird, because the aphids have arrived. In October the hedgehog, looking for somewhere to sleep the winter away. You get one explanation and one small thing to do: leave the leaf pile, put water out, let the seed heads stand. The seasons turn the right way round below the equator, and nobody suggests a hedgehog to a fourth-floor balcony.",
    },
    {
      icon: "🤝",
      title: "Who to Plant Beside It",
      desc: "Open any plant and it will tell you which welcome creatures it wants nearby, what to plant to bring them, and how far away to put it — a real measurement, not \u201cnearby\u201d. And if the plant cannot set fruit from its own pollen, which many apples, plums and pears cannot, it says so and names the cultivars that will do it. That sentence is the difference between an apple tree and an apple tree with apples on it.",
    },
    {
      icon: "🧪",
      title: "The Soil It Actually Wants",
      desc: "Acid, neutral, or happy with lime. Clay, sand, or something in between. Wrong soil is the commonest way a plant dies after wrong watering, and the cruellest, because it takes two years and you blame yourself. In a pot you are told which compost to buy and how much. In the ground you are told how to work out what you have, what to dig in — or, honestly, that the plant belongs somewhere else.",
    },
    {
      icon: "🎩",
      title: "A Name of Your Own",
      desc: "The app has to call you something, and \"gardener\" is what a form calls you. So give yourself a name instead — Tom the Garden Gnome, Her Ladyship of the Compost Heap, whatever you can defend at a dinner party — and it will use it. Once a week you will be addressed by a title you invented, which is a small and unreasonable pleasure, and there is no earthly reason an app should not offer it.",
    },
    {
      icon: "⇅",
      title: "Put Them in the Order You Want",
      desc: "The heart floats a favourite to the top, which is a sensible default and remains the default — right up until the first time you move a plant yourself. From that moment the order is yours and the heart goes back to being merely a heart, because two rules quarrelling over one list gives you the worst of both: you drag the rose to the top and the app puts it back, on the grounds that it is not marked. Three buttons rather than a long press and a drag — to the top, up one, down one — all reachable with a thumb while the other hand holds something muddy. Anything planted after you have arranged matters has no place yet, and queues politely at the end.",
    },
    {
      icon: "📝",
      title: "The Wishlist",
      desc: "You found something in the woods, in a shop, or in a friend\u2019s garden, and you are not taking it home today. Scan it anyway and put it on the list, with the photograph and an honest note on how much work it will be. Each one can say what it is waiting for \u2014 money, room, or time \u2014 because that is almost always the reason it stayed on the shelf.",
    },
    {
      icon: "🪴",
      title: "Garden, Terrace, Balcony or Greenhouse",
      desc: "A window box has nothing in common with an acre. Tell us whether you tend a garden, a terrace, a single balcony or a greenhouse, and the watering, feeding and overwintering advice adapts to your soil — or your charming lack of it.",
    },
    {
      icon: "🌱",
      title: "The Greenhouse Is Its Own Country",
      desc: "Most plant apps treat a greenhouse as a garden that happens to be warmer. It is not. It is a room with a roof, walls and its own weather, and almost everything changes at the door. No rain gets in, so every drop of water for the whole year is yours to carry. The season opens earlier and closes later. The afternoon runs far hotter than the forecast promises, which makes ventilating and shading real work rather than an afterthought. Still, humid air breeds mildew, botrytis and damping off. The pests are whitefly, spider mite and thrips — the ones that flourish precisely because their predators are outside, on the wrong side of the glass. And the pollinators are out there too, which is why a greenhouse tomato may need the vents open at flowering, or its flowers tapped by hand. Set a greenhouse up as its own garden and every plant inside it is advised accordingly, without your having to say so twice. An unheated greenhouse still freezes in January, and Garden Me will not pretend otherwise.",
    },
    {
      icon: "🗺️",
      title: "A Garden Here, a Cabin There",
      desc: "Keep as many gardens as you have places, and give each one its own country. The cabin in Finland is then told about Finnish winters rather than about yours, and a garden below the equator is not warned of frost in July — the seasons turn the right way round on their own. Switch between them from the header; every reminder, warning and piece of advice follows.",
    },
    {
      icon: "✓",
      title: "Lists That Write Themselves",
      desc: "Shopping and equipment lists, composed automatically from what your garden actually contains. Each item tied to a specific plant or pest. No generic 'buy fertiliser'. The real kind.",
    },
    {
      icon: "✿",
      title: "Ask Garden Me",
      desc: "A conversation with your personal AI gardener — shy, but endlessly knowledgeable. Ask anything: why the leaves are yellow, when to divide the irises, whether that's a friend or a foe. No question too small.",
    },
    {
      icon: "☀",
      title: "Light Check",
      desc: "Hold up your phone to a corner and we judge the light it receives — then suggest what would actually thrive there. The feature other apps lock behind a paywall. Here, it simply comes along.",
    },
    {
      icon: "❡",
      title: "The Garden Journal",
      desc: "A diary for every plant. Photograph the first bud, the first bloom, the triumphant first tomato. Watch the seasons accumulate. Sentimental? Perhaps. But a garden is a slow story worth keeping.",
    },
    {
      icon: "✚",
      title: "Safe & Sound",
      desc: "Every plant flagged for toxicity to cats, dogs, and curious children. Know at a glance whether the new arrival is a gentle houseguest or quietly plotting against the family pet.",
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

  const quotes: { who: string; text: string; stars?: number }[] = [
    { who: "A fern, formerly", text: "I requested water for six weeks. Nobody listened. Then they installed the app. Alas, too late for me." },
    { who: "A very smug cactus", text: "I personally required no assistance. My owner, however, required a great deal." },
    { who: "A brown slug", stars: 1, text: "Dreadful. They located me at once and relocated me humanely. Where is the sport in that?" },
    { who: "A tomato plant", text: "A frost warning arrived at ten in the evening. I was covered. I survived. I owe this app my marinara." },
    { who: "A rose bush", text: "At last, someone who knows precisely when to prune. The audacity I had endured until now." },
    { who: "An anonymous weed", stars: 1, text: "Would not recommend. Registered as a 'Garden Devil'. The disrespect. The accuracy." },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>

      <SiteNav />

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
          <p style={{ ...serif, color: "#c2a14e" }} className="text-xl mb-6">
            In the aisle, before you buy it. In the garden, for years afterwards.
          </p>
          <p style={{ color: "#9aa861" }} className="text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Photograph anything green and learn what it is, what it wants, and — before you part
            with your money — how much work it will actually be. Then year-round care, pest
            stewardship and weather alerts, for the devoted gardener and the serial offender
            alike. No judgement. Very little, anyway.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={APP_STORE} className="font-medium px-8 py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90" style={{ backgroundColor: "#c2a14e", color: "#2c3517" }}>
              App Store
            </a>
            {/* Android is a separate account, build, review and store listing —
                none of it done yet. Promising it here would be a lie with a
                button on it. */}
            <span className="font-medium px-8 py-4 rounded-xl text-base tracking-wide border inline-block" style={{ borderColor: "#4d5a2a", color: "#9aa861" }}>
              Google Play · in due course
            </span>
          </div>
          <p style={{ color: "#4d5a2a" }} className="text-sm mt-8 tracking-wide">
            Free to download, with ten actions to begin. No subscription required.
            Side effects may include keeping things alive.
          </p>
        </div>
      </section>

      {/* Gold divider line */}
      <div className="flex items-center justify-center gap-4 py-8" style={{ backgroundColor: "#38431e" }}>
        <span style={{ color: "#c2a14e" }} className="text-lg tracking-[0.2em] text-center px-4">
          ❦ &nbsp; Free to download · No subscription required · Markedly fewer dead ferns &nbsp; ❦
        </span>
      </div>

      {/* App preview tiles */}
      <section className="py-16 flex justify-center gap-4 flex-wrap px-6" style={{ backgroundColor: "#38431e" }}>
        {[
          { label: "In the Shop", icon: "🛒" },
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
      {/* scroll-mt keeps the section's top edge clear of the sticky bar when
          the anchor is jumped to, rather than sliding underneath it. */}
      <section id="features" className="scroll-mt-16 py-24 px-6 max-w-5xl mx-auto">
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

      {/* Two places you will use it */}
      <section className="py-24 px-6" style={{ backgroundColor: "#38431e", color: "#f6f1e6" }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "#c2a14e" }} className="text-center text-sm tracking-[0.3em] uppercase mb-3">Two places, one app</p>
          <h2 style={serif} className="text-4xl font-semibold text-center mb-4">
            In the garden centre. And then at home.
          </h2>
          <p className="text-center text-lg mb-14 max-w-2xl mx-auto" style={{ color: "#c9d4a8" }}>
            Most garden apps assume the plant is already yours. Rather a lot of gardening
            happens before that — standing in an aisle, wondering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#2c3517", borderColor: "#4d5a2a" }}>
              <div className="text-3xl mb-4" style={{ color: "#c2a14e" }}>🛒</div>
              <h3 style={serif} className="text-2xl font-semibold mb-3">Before you buy</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#c9d4a8" }}>
                Photograph it on the shelf. Learn what it is, what light it wants, and — the
                question nobody else answers — how much work it will actually be. Then put it
                back, or do not. We shall not judge either way, though the plant might.
              </p>
            </div>
            <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#2c3517", borderColor: "#4d5a2a" }}>
              <div className="text-3xl mb-4" style={{ color: "#c2a14e" }}>🌿</div>
              <h3 style={serif} className="text-2xl font-semibold mb-3">Once it is yours</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#c9d4a8" }}>
                Tell us where it stands — pot or bed, sun or shade, greenhouse or windowsill —
                and the care becomes specific to that plant in that spot. Then the reminders
                begin, and carry on quietly for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Helper link */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f6f1e6" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-4" style={{ color: "#c2a14e" }}>✉</div>
          <p style={{ color: "#c2a14e" }} className="text-sm tracking-[0.3em] uppercase mb-3">While you are away</p>
          <h2 style={serif} className="text-4xl font-semibold mb-6">
            Your neighbour is willing.<br />Your neighbour is not psychic.
          </h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#4d5a2a" }}>
            Send them a link. They will see exactly what wants doing this week, which plant is
            which, and how much water is in fact too much — in an ordinary browser, with no app
            to install and no account to invent. They need never learn the word cultivar.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#9aa861" }}>
            The link keeps working if you share again, and quietly expires when the holiday is
            long over. Whether the tomatoes survive your uncle remains, as ever, between you
            and your uncle.
          </p>
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
              beer traps, companion planting.
            </p>
            {/* Pulled out of the paragraph above. It was the line the whole box
                exists to arrive at, and it was reading as the fourth item in a
                list of pest remedies. */}
            <p className="text-xl md:text-2xl font-semibold mt-5 leading-snug" style={{ ...serif, color: "#f6f1e6" }}>
              A garden at war with itself is no garden at all.
            </p>
          </div>
          <p className="text-sm mt-8 italic" style={{ ...serif, color: "#c2a14e" }}>
            And should it all become too much — there is an &quot;I surrender&quot; button that summons professional gardeners nearby. No shame. Only survival.
          </p>
        </div>
      </section>

      {/* Who is it for */}
      {/* Its own colour. This and the pricing section below both sat on cream
          with white cards, so the page ran straight through the join without
          anyone noticing they had arrived somewhere new. */}
      <section className="py-24 px-6" style={{ backgroundColor: "#9aa861" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ color: "#2c3517" }} className="text-sm tracking-[0.3em] uppercase mb-3">For whom</p>
          <h2 style={{ ...serif, color: "#2c3517" }} className="text-4xl font-semibold mb-3">Who is Garden Me for?</h2>
          <p className="mb-14" style={{ color: "#2c3517" }}>You, in all likelihood.</p>
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

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-16 py-24 px-6" style={{ backgroundColor: "#f6f1e6" }}>
        <div className="max-w-4xl mx-auto">
          {/* The same mark that sits in the app's header and opens the paywall.
              Somebody who has read this page should recognise it on the day they
              tap it, rather than meeting it for the first time. */}
          <div className="flex justify-center mb-4" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#c2a14e"
              strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
            </svg>
          </div>
          <p style={{ color: "#c2a14e" }} className="text-center text-sm tracking-[0.3em] uppercase mb-3">What it costs</p>
          <h2 style={serif} className="text-4xl font-semibold text-center mb-4">
            How much garden have you got?
          </h2>
          {/* The confusing part was never the numbers — it was that "action" is a
              word nobody has met before, and that people assume the free version
              is the crippled one. Answer both before showing a price. */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#4d5a2a" }}>
              <strong>The app itself is free.</strong> Every reminder, the whole year&apos;s
              calendar, the pest tracking, the shopping lists, the journal, the weather, sharing
              the garden with a neighbour — all of it, for everyone, always.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#4d5a2a" }}>
              One thing costs: <strong>asking the app to think.</strong> Identifying a plant from
              a photograph, asking Garden Me a question, checking the light in a corner. We call
              those actions, and you begin with ten.
            </p>
            <p className="leading-relaxed" style={{ color: "#9aa861" }}>
              Most of them go at the start. Loading a garden of twenty plants costs about twenty
              actions, and then it goes quiet — a settled garden asks for five or ten in a month,
              and rather fewer in January. Being told we got something wrong costs nothing at all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: "Bronze",
                who: "A few pots, and some curiosity.",
                body: "Twenty-five actions a month is a windowsill, a balcony, or a garden you have already got the measure of. Enough to identify what the neighbour planted over the fence and ask why it looks like that.",
                price: "29 kr", eur: "2,49 €", per: "a month", year: "or 299 kr / 26,99 € a year",
              },
              {
                name: "Silver",
                who: "A garden that asks something of you every week.",
                body: "Sixty actions a month. Room to load a border in one sitting, work out what is eating the roses, and still have plenty left when something unexpected comes up in August.",
                price: "49 kr", eur: "4,49 €", per: "a month", year: "or 499 kr / 44,99 € a year",
              },
              {
                name: "Gold",
                who: "You would rather stop counting.",
                body: "A hundred and fifty actions a month, which is more than a large garden manages to use. That is the actual point: you stop thinking about it and simply ask.",
                price: "79 kr", eur: "6,99 €", per: "a month", year: "or 899 kr / 79,99 € a year", top: true,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-7 flex flex-col ${tier.top ? "border-2" : "border"}`}
                style={{ backgroundColor: "#ffffff", borderColor: tier.top ? "#c2a14e" : "#e5ddc8" }}
              >
                <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#9aa861" }}>{tier.name}</p>
                <h3 style={serif} className="text-xl font-semibold mb-3 leading-snug">{tier.who}</h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "#4d5a2a" }}>{tier.body}</p>
                <p style={{ ...serif, color: "#2c3517" }} className="text-3xl font-semibold">
                  {tier.price} <span className="text-lg font-normal" style={{ color: "#9aa861" }}>/ {tier.eur} {tier.per}</span>
                </p>
                <p className="text-sm mt-1" style={{ color: "#9aa861" }}>{tier.year}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-7 border mt-6" style={{ backgroundColor: "#ffffff", borderColor: "#e5ddc8" }}>
            <h3 style={serif} className="text-xl font-semibold mb-2 leading-snug">
              Or nothing at all, until you need something.
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#4d5a2a" }}>
              The app is free, and stays free. When the ten actions you begin with run out, you can
              buy more a handful at a time — <strong>from 49 kr / 4,49 € for twenty actions</strong>. They never expire,
              there is nothing to renew and nothing to remember to cancel. Some gardens want attention
              twice a year and then nothing until spring, and we shall not bill you monthly for that.
            </p>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#9aa861" }}>
              Yes, twenty actions costs about what a month of Silver does, and Silver would give you
              sixty. That is not a mistake. A subscription is always the better rate — that is rather
              the point of one. What you are buying instead is the absence of a subscription: twenty
              actions that will still be there next April, with nothing to cancel in between.
            </p>
          </div>

          <p className="text-center text-xs mt-10" style={{ color: "#9aa861" }}>
            Prices shown in kroner and euro; the App Store will quote you in your own currency, which we are told is the civilised arrangement. Swedish and Danish kroner are close cousins of the Norwegian, and Apple works out the difference.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ backgroundColor: "#9aa861" }}>
        <div className="max-w-5xl mx-auto">
          <p style={{ color: "#2c3517" }} className="text-center text-sm font-bold tracking-[0.3em] uppercase mb-3">Notices from the garden</p>
          <h2 style={{ ...serif, color: "#2c3517" }} className="text-4xl font-semibold text-center mb-3">What the garden is saying</h2>
          <p className="text-center mb-14" style={{ color: "#2c3517" }}>Reviews from actual plants. And one slug.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((q) => (
              <div key={q.who} className="rounded-2xl p-7" style={{ backgroundColor: "#f6f1e6" }}>
                <div className="mb-3 tracking-widest" style={{ color: "#c2a14e" }}>{"★".repeat(q.stars ?? 5)}</div>
                <p style={{ ...serif, color: "#2c3517" }} className="text-lg italic leading-relaxed mb-4">&quot;{q.text}&quot;</p>
                <p className="text-xs tracking-wide uppercase" style={{ color: "#4d5a2a" }}>— {q.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Green fingers band */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#f6f1e6" }}>
        <div className="max-w-3xl mx-auto">
          <p style={{ color: "#c2a14e" }} className="text-sm tracking-[0.3em] uppercase mb-5">A universal affliction</p>
          {/* One phrase per line. Left as a single paragraph they wrapped wherever
              the viewport happened to end, which broke them mid-phrase. */}
          <div className="mb-6 space-y-1">
            {["Green fingers.", "Grønne fingre.", "Gröna fingrar.", "Grüner Daumen.", "Groene vingers."].map((phrase) => (
              <p key={phrase} style={{ ...serif, color: "#2c3517" }} className="text-2xl md:text-3xl italic leading-snug">
                &quot;{phrase}&quot;
              </p>
            ))}
          </div>
          <p className="text-lg leading-relaxed" style={{ color: "#4d5a2a" }}>
            Every language has a phrase for the gift of growing things — and a polite silence regarding the soil
            beneath the nails. Whether yours are green by nature or merely by enthusiasm, Garden Me makes them a little greener.
          </p>
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
            <a href={APP_STORE} className="font-medium px-8 py-4 rounded-xl text-base tracking-wide transition-opacity hover:opacity-90" style={{ backgroundColor: "#c2a14e", color: "#2c3517" }}>
              App Store
            </a>
            <span className="font-medium px-8 py-4 rounded-xl text-base tracking-wide border inline-block" style={{ borderColor: "#4d5a2a", color: "#9aa861" }}>
              Google Play · in due course
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ backgroundColor: "#2c3517", borderTop: "1px solid #4d5a2a" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "#9aa861" }}>
          <span style={serif} className="italic">© 2026 Garden Me. No plants were harmed in the making of this app. A few slugs were politely relocated.</span>
          <div className="flex gap-6 tracking-wide">
            <a href="/faq" className="hover:opacity-60 transition-opacity">FAQ</a>
            <a href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</a>
            <a href="/terms" className="hover:opacity-60 transition-opacity">Terms</a>
            <a href="/support" className="hover:opacity-60 transition-opacity">Support</a>
            <a href="mailto:magnus@bjelkerud.no" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
