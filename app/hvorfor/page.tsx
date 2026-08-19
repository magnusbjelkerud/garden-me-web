import SiteNav from "../SiteNav";

const serif = { fontFamily: "var(--font-serif)" };

export const metadata = {
  title: "Hvorfor Garden Me — hagen prøver å fortelle deg noe",
  description:
    "Om hvorfor appen finnes: hagegjestene, hageheltene, og hvorfor det beste hagestellet noen ganger er å la være. Ingen pekefinger, ingen forventning om grønne fingre.",
};

/** Manifestet. Ligger med vilje på sin egen side og ikke på forsiden: forsiden
 *  skal selge appen på tolv sekunder, denne skal leses av dem som allerede lurer
 *  på hvorfor den finnes. Teksten står i presens om Hagehelter og Månedens
 *  ansatt, og forutsetter derfor at funksjonen er ute — den er det siden
 *  19. august 2026. Kilden ligger i `kilder/hvorfor.md` i app-repoet. */

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-relaxed mb-4" style={{ color: "#4d5a2a" }}>{children}</p>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 style={serif} className="text-2xl font-semibold mt-14 mb-4" >{children}</h2>
);

const Beat = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-relaxed mb-4 text-lg" style={{ color: "#2c3517" }}>{children}</p>
);

export default function Hvorfor() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f1e6", color: "#2c3517" }}>
      <SiteNav />
      <main className="py-16 px-6 max-w-2xl mx-auto">
        <h1 style={serif} className="text-4xl font-semibold mb-3 leading-tight">
          Hagen prøver å fortelle deg noe. Jeg har laget en app som oversetter.
        </h1>
        <p className="text-sm mb-12" style={{ color: "#9aa861" }}>Av Magnus Bjelkerud</p>

        <P>Det finnes mennesker som vet nøyaktig når en syrin skal beskjæres. De kjenner jordens pH. De har sterke meninger om kompost.</P>
        <P>Garden Me er også for dem.</P>
        <P>Men det er ikke først og fremst dem jeg tenker på. Jeg tenker på oss andre.</P>
        <Beat>Vi som planter et epletre og seks måneder senere lurer på hvorfor det ser personlig fornærmet ut.</Beat>
        <Beat>Vi som vanner fordi bladene henger, og deretter vanner litt mer fordi de fortsatt henger.</Beat>
        <P>Vi som ser et insekt på en rose og tenker: <em>spray?</em></P>
        <P>Garden Me har et ganske enkelt prinsipp: <strong>ikke spray først og spør etterpå.</strong> Finn først ut hvem som faktisk bor der.</P>

        <H>Hagen er full av gjester</H>
        <P>Noen er mindre velkomne enn andre. Vi kaller dem <strong>Plageånder</strong>. Brunsnegler. Bladlus. Sykdommer. Ting med en nesten imponerende evne til å finne akkurat den planten du var mest fornøyd med.</P>
        <P>Men så finnes de andre. Biene. Marihønene. Meitemarkene. Edderkoppene. Pinnsvinene. <strong>Hageheltene.</strong></P>
        <P>Forskjellen kan oppsummeres ganske enkelt:</P>
        <blockquote className="border-l-2 pl-5 my-8" style={{ borderColor: "#c2a14e" }}>
          <p className="leading-relaxed mb-2" style={{ color: "#2c3517" }}>Plageånder kommer ubedt og spiser plantene dine.</p>
          <p className="leading-relaxed font-semibold" style={{ color: "#2c3517" }}>Hagehelter kommer ubedt og spiser dem som spiser plantene dine.</p>
        </blockquote>
        <P>I appen bor de sammen, under <strong>Hagegjester</strong>. Det er med vilje: du skal se begge to samtidig, ikke velge deg inn i det ene rommet.</P>
        <P>Natur er ikke en samling enkeltstående planter. Det er et system. Og når vi begynner å forstå systemet, blir spørsmålet ikke lenger bare <em>hvordan blir jeg kvitt dette?</em> Det blir også: <em>hva bør jeg passe på å beholde?</em> Det er en ganske viktig forskjell.</P>

        <H>Noen ganger er det beste hagestellet å la være</H>
        <P>En hage trenger ikke alltid mer innsats. Noen ganger trenger den mindre.</P>
        <P>La frøstandene stå litt lenger. La noen blader ligge. Sett frem vann når det er varmt og tørt. La marihøna få forsøke seg på bladlusene før kjemiavdelingen tilkalles. Ikke rydd bort alle steder der noe kan bo.</P>
        <P>Og kanskje la den løvhaugen ligge i oktober. Det kan hende et pinnsvin har sendt inn søknad.</P>
        <P>I Garden Me har Hageheltene derfor sin egen plass, med sin <strong>Månedens ansatt</strong>. Ikke fordi pinnsvinet trenger anerkjennelse på LinkedIn, men fordi tidspunkt betyr noe. Når bladlusene kommer, er marihøna relevant. Når pollinatorene trenger mat, er blomstring relevant. Når vinteren nærmer seg, trenger andre arter mat, skjul og steder å overvintre.</P>
        <P>Én hagehelt. Én forklaring. Én liten ting du kan gjøre akkurat nå. Da blir kunnskap til hagestell.</P>

        <H>Plantene snakker allerede</H>
        <P>Problemet er bare at de har et noe begrenset ordforråd.</P>
        <Beat>Gult blad. Brunt blad. Hull i blad. Ikke noe blad.</Beat>
        <P>Garden Me er laget for å hjelpe med oversettelsen. Ta et bilde av en plante, og appen forsøker å finne ut hva den er. Fortell hvor den står, og rådene tilpasses den faktiske planten på det faktiske stedet. Sol eller skygge. Potte eller bed. Drivhus eller vinduskarm. Nyplantet eller godt etablert.</P>
        <P>Appen følger været og sier fra når frost, tørke eller kraftig regn gjør at akkurat din hage bør få litt oppmerksomhet. Den kan hjelpe deg å forstå hva som spiser planten din, hva planten forsøker å fortelle deg, når den bør beskjæres — og, kanskje enda viktigere, når den absolutt ikke bør beskjæres.</P>
        <P>Og står du i hagesenteret med en vakker plante til 1 499 kroner, kan du spørre Garden Me <strong>før</strong> du kjøper den hvor mye arbeid den kommer til å kreve.</P>
        <Beat>Noen planter er en glede. Andre er en deltidsstilling.</Beat>

        <H>Hvorfor jeg lager dette nå</H>
        <P>Europa opplever mer ekstrem varme. Byene våre består av stadig mer asfalt og betong — materialer som er svært dyktige til å holde på varme og bemerkelsesverdig dårlige til å blomstre.</P>
        <P>Trær, vegetasjon og levende jord gjør det motsatte. De gir skygge. De kjøler. De holder på vann. De gir leveområder for insekter og fugler.</P>
        <P>Et tre er med andre ord ikke bare pynt.</P>
        <Beat>Det er infrastruktur med blader.</Beat>
        <P>Og det gjelder ikke bare kommunens trær. Det gjelder hagen din. Balkongen. Borettslaget. Hytta. Bedet utenfor kontoret. Den litt triste plantekassen utenfor restauranten som ingen helt husker hvem som har ansvaret for.</P>
        <P>Vi må plante. Men vi må også klare å holde i live det vi planter. Et stort gammelt tre kan ikke erstattes neste tirsdag av et nytt tre på 180 centimeter fra et hagesenter, uansett hvor optimistisk etiketten ser ut.</P>
        <P>Det høres nesten pinlig selvfølgelig ut. Likevel er det vanskeligere enn det burde være.</P>

        <H>Verden blir ikke reddet av en vannkanne</H>
        <P>Garden Me kommer ikke til å løse klimakrisen. Det ville vært en noe offensiv påstand for en hageapp. Og ansvaret for klima, natur og gode bymiljøer kan selvfølgelig ikke skyves over på mennesker som tilfeldigvis eier en hortensia.</P>
        <P>Vi trenger politikk. Vi trenger bedre byplanlegging. Vi trenger å bevare store trær og eksisterende natur. Vi trenger natur også der mennesker faktisk bor.</P>
        <P>Men store endringer består også av svært mange små beslutninger. Om vi planter eller lar være. Om treet får leve eller felles. Om vi velger en plante som faktisk passer stedet. Om vi lar blomster stå for pollinatorene. Om vi bruker kjemikalier automatisk — eller først finner ut hva problemet faktisk er. Om en hage blir litt mer levende neste år enn den var i år.</P>
        <Beat>Én handling er liten. Millioner av dem er ikke det.</Beat>

        <H>Mer liv gir mer liv</H>
        <P>Jeg tror vi lenge har sett på hagen som noe vi skal kontrollere. Plenen skal være der. Ugresset skal ikke være der. Rosen skal blomstre på kommando. Sneglen har åpenbart misforstått hele opplegget.</P>
        <P>Men kanskje en god hage ikke er den vi har full kontroll over. Kanskje den er den vi har lært å samarbeide med.</P>
        <P>En hage med frukttrær, bær, blomster, fugler, pollinatorer, meitemark og alle de andre små systemene som holder den i gang, gir oss noe tilbake. Noen ganger epler. Noen ganger blåbær. Noen ganger bare en humle som dukker opp fordi du lot den riktige blomsten stå.</P>
        <P>Det er også en avkastning.</P>

        <H>Dette er Garden Me</H>
        <P>Garden Me er min lille oversetter mellom mennesker og det som gror rundt oss. Den skal hjelpe deg å forstå hva du har. Hva det trenger. Hva som er galt. Hva som ikke er galt. Hvem som bør få bli. Og hvem som forsiktig bør vises døren.</P>
        <P>Ingen pekefinger. Ingen forventning om grønne fingre. Og ingen anbefaling om å starte kjemisk krigføring fordi noe har spist et halvt blad av hostaen.</P>
        <P>Bare litt mer kunnskap. Litt bedre timing. Og forhåpentligvis litt mer liv.</P>
        <P>For hvis vi vil ha grønnere byer, levende hager og mer natur rundt oss, er det kanskje et ganske godt sted å begynne:</P>
        <Beat><strong>Lær å lytte til det som allerede gror der.</strong></Beat>

        <div className="mt-16 pt-8" style={{ borderTop: "1px solid #e5ddc8" }}>
          <P>Garden Me er ute nå.</P>
          <P>Hagen har ventet en stund. Den har riktignok ikke vært stille.</P>
          <P>Vi har bare ikke forstått hva den sa.</P>
        </div>
      </main>
    </div>
  );
}
