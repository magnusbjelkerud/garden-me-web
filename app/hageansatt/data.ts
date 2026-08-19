/* «Hvilken hageansatt er du?»
 *
 * Et markedsføringsstunt, og det later ikke som noe annet. Men de elleve
 * ansatte er ikke funnet på for anledningen: navnene, avdelingene og
 * replikkene er nøyaktig de samme som står under Hagegjester i appen, og
 * rådene nederst på resultatkortet er de samme rådene appen gir. Et resultat
 * som er oppdiktet, er en spøk. Et resultat som er sant, er en grunn til å
 * laste ned appen.
 *
 * Poengene regnes i nettleseren. Ingen AI, ingen server, ingen kostnad per
 * besøkende — som er hele poenget med en side som forhåpentligvis blir tatt
 * av mange flere enn dem som betaler for noe.  */

export interface Employee {
  key: string;
  emoji: string;
  name: string;
  dept: string;
  quip: string;
  /** Medarbeidersamtalen. Den delen folk skjermdumper. */
  review: string;
  /** Hva du faktisk kan gjøre for denne i hagen. Ordrett fra appen. */
  act: string;
}

/* Rekkefølgen her avgjør uavgjort, så den er fast og ikke tilfeldig. */
export const EMPLOYEES: Employee[] = [
  {
    key: "meitemark", emoji: "🪱", name: "Meitemarken", dept: "Drift og vedlikehold",
    quip: "Gjør grovarbeidet mens du tar æren.",
    review: "Du er ikke synlig, og du har aldri bedt om å bli det. Mens de andre flyr rundt og blir fotografert, tar du løvet ned i jorda og gjør det om til noe som virker. Hele hagen står på arbeid du har gjort under bakken, og ingen har noensinne sagt takk for det. Det plager deg mindre enn det burde.",
    act: "La bladene ligge i bedet i stedet for å rake dem bort. Han tar dem ned selv.",
  },
  {
    key: "bie", emoji: "🐝", name: "Bien", dept: "Pollinering",
    quip: "Jobber skift. Tar betalingen i nektar.",
    review: "Du er den alle kjenner. Du møter opp, du gjør jobben, og du er akkurat sjarmerende nok til at ingen legger merke til hvor hardt du faktisk arbeider. Uten deg blir det blomster i mai og ingenting i september — men prøv å si det høyt uten å høres ut som du skryter.",
    act: "Sørg for at noe blomstrer hele sesongen, og sett ut vann i varmen — legg noen steiner i skålen, ellers drukner hun.",
  },
  {
    key: "humle", emoji: "🐝", name: "Humla", dept: "Tidligvakt",
    quip: "Møter opp før alle andre. Klager likevel ikke.",
    review: "Du er der før det finnes noe å hente. Kaldt, vått, grått — du er ute uansett, mens resten venter på bedre forhold og kaller det planlegging. Du er ikke den raskeste og du er ikke den peneste. Du er den som er der.",
    act: "Ikke rydd bort det som blomstrer tidlig — krokus, selje og løvetann er frokosten.",
  },
  {
    key: "marihone", emoji: "🐞", name: "Marihøna", dept: "Biologisk skadedyrkontroll",
    quip: "Søt på utsiden. Bladlusenes verste mareritt.",
    review: "Folk liker deg før de vet hva du gjør, og det er en fordel du for lengst har lært å bruke. Bak det søte ligger en appetitt ingen hadde forventet. De som har sett deg i arbeid, snakker om det med en viss respekt og litt lavere stemme.",
    act: "La være å sprøyte når du ser bladlus. Gi henne en uke til å møte på jobb først.",
  },
  {
    key: "lopebille", emoji: "🪲", name: "Løpebillen", dept: "Nattskift, sneglepatrulje",
    quip: "Spiser sneglen før den blir en snegl. Ingen takker henne.",
    review: "Du løser problemene før noen rekker å oppdage at de var problemer, og det er nettopp derfor ingen takker deg. En brunsnegl som aldri ble født, står ikke i noen rapport. Du jobber når de andre sover, og du foretrekker det slik.",
    act: "La en flat stein eller et bord ligge i bedet. Hun jakter om natta og trenger et mørkt sted å være om dagen.",
  },
  {
    key: "padde", emoji: "🐸", name: "Padden", dept: "Nattevakt",
    quip: "Ikke pen. Bryr seg ikke. Spiser sneglene dine likevel.",
    review: "Du sluttet for lenge siden å bry deg om hva folk synes, og det er den mest undervurderte egenskapen på hele arbeidsplassen. Du sitter stille mesteparten av tiden. Så gjør du noe. Så er det over.",
    act: "Sett ut en grunn vannskål i skyggen og la et hjørne stå uryddet. Hun trenger fuktighet og et sted å gjemme seg om dagen.",
  },
  {
    key: "blomsterflue", emoji: "🪰", name: "Blomsterflua", dept: "Bladlus og pollinering",
    quip: "Marihøna får æren. Hun gjør jobben.",
    review: "Du blir forvekslet med noen andre hele tiden. Folk tror du er farligere enn du er, og de tror noen andre gjorde det du nettopp gjorde. Larvene dine spiser flere bladlus enn marihøna sine — men det er marihøna som havner på forsiden, og det kommer hun til å fortsette med.",
    act: "La noen skjermplanter blomstre — dill, koriander, ryllik. Hun trenger flat, åpen nektar hun kommer til med kort snabel.",
  },
  {
    key: "gulloye", emoji: "🦋", name: "Gulløya", dept: "Bladluskontroll",
    quip: "Ser skjør ut. Larvene heter bladlusløver av en grunn.",
    review: "Folk tar deg for å være skjør, og det er en misforståelse du ikke har hatt noe hastverk med å oppklare. Du lar dem tro det. Ettermælet ditt heter bladlusløve, og det er fortjent hver eneste bokstav.",
    act: "La visne stengler og hule strå stå gjennom vinteren, eller heng opp et insekthotell. Hun overvintrer som voksen og trenger et tørt sted.",
  },
  {
    key: "edderkopp", emoji: "🕷️", name: "Edderkoppen", dept: "Fangst og nattevakt",
    quip: "Gratis skadedyrkontroll. Litt urovekkende uniform.",
    review: "Du bygger én ting, på nøyaktig riktig sted, og så venter du. For dem som ikke forstår hva som ble bygget, ser det ut som du ikke gjør noe. Uniformen din gjør folk urolige. Det har aldri vært ditt problem.",
    act: "La nettene stå. De er satt opp der det faktisk flyr noe.",
  },
  {
    key: "pinnsvin", emoji: "🦔", name: "Pinnsvinet", dept: "Nattpatrulje",
    quip: "Ingen kappe. Mange pigger. Fortsatt en helt.",
    review: "Du dukker opp når det passer deg, gjør noe nyttig, spiser godt og forsvinner igjen. Ingen vet helt hva du driver med om dagen, og du har ingen planer om å oppklare det. Du har seks uker på deg til noe viktig. Du kommer til å klare det på fem.",
    act: "La en løvhaug ligge i et hjørne. Det kan hende noen har sendt inn søknad.",
  },
  {
    key: "fugler", emoji: "🐦", name: "Fuglene", dept: "Opprydding, vinterskift",
    quip: "Spiser larvene dine hele sommeren. Sender aldri regning.",
    review: "Du er høylytt, du er overalt, og du har aldri sendt en faktura. Du rydder opp etter andre hele sommeren uten at det står et ord om det i stillingsbeskrivelsen din. Til gjengjeld tar du deg til rette i bærbuskene, og det synes du er en rimelig ordning.",
    act: "La frøstandene stå — solhatt, rudbeckia og tistel. De ser døde ut og er middag.",
  },
];

export const byKey = (k: string) => EMPLOYEES.find((e) => e.key === k);

export interface Option { text: string; points: Record<string, number> }
export interface Question { q: string; options: Option[] }

/* Spørsmålene handler om arbeidsliv og ikke om hagestell. Det er hele vitsen:
   du svarer på hvordan du er på jobb, og får vite hvilket dyr du er. */
export const QUESTIONS: Question[] = [
  {
    q: "Klokka er kvart over fem om morgenen. Hvor er du?",
    options: [
      { text: "Oppe. Har vært det en stund.", points: { fugler: 3, humle: 2 } },
      { text: "Legger meg akkurat nå.", points: { lopebille: 3, padde: 1, pinnsvin: 1 } },
      { text: "Sover. Jobben begynner når den begynner.", points: { bie: 2, marihone: 2 } },
      { text: "Under bakken. Der er klokka den samme hele døgnet.", points: { meitemark: 3, edderkopp: 1 } },
    ],
  },
  {
    q: "Noen andre får ros for noe du gjorde.",
    options: [
      { text: "Jeg sier ingenting. Arbeidet ble gjort.", points: { meitemark: 2, lopebille: 2 } },
      { text: "Det skjer hver eneste gang. Hver. Eneste. Gang.", points: { blomsterflue: 4 } },
      { text: "Det pleier å være meg som får rosen, egentlig.", points: { marihone: 2, bie: 2 } },
      { text: "Jeg var ikke i rommet. Jeg spiste.", points: { pinnsvin: 3, fugler: 2 } },
    ],
  },
  {
    q: "Beskriv arbeidsplassen din.",
    options: [
      { text: "Ryddig. Samme rute hver dag, og den ruta er god.", points: { bie: 3, humle: 1 } },
      { text: "Et nett jeg har bygget selv. Nå venter jeg.", points: { edderkopp: 4 } },
      { text: "En stein jeg kan ligge under til det blir mørkt.", points: { lopebille: 2, padde: 2 } },
      { text: "En løvhaug. Ikke rør den.", points: { pinnsvin: 4 } },
    ],
  },
  {
    q: "Været er elendig. Kaldt, vått og grått.",
    options: [
      { text: "Jeg jobber. Noen må.", points: { humle: 4 } },
      { text: "Endelig. Fuktig er min favorittilstand.", points: { padde: 3, meitemark: 1 } },
      { text: "Jeg venter til det blir bedre. Det blir alltid bedre.", points: { bie: 3, marihone: 1 } },
      { text: "Jeg merker det ikke. Jeg er innendørs — altså under noe.", points: { lopebille: 2, edderkopp: 2 } },
    ],
  },
  {
    q: "Hva sier folk om deg før de har møtt deg?",
    options: [
      { text: "At jeg er søt.", points: { marihone: 4 } },
      { text: "At jeg er farligere enn jeg er.", points: { blomsterflue: 4, edderkopp: 1 } },
      { text: "At jeg er skjør.", points: { gulloye: 4 } },
      { text: "At jeg er stygg. De tar ikke helt feil.", points: { padde: 4 } },
    ],
  },
  {
    q: "Hva er du faktisk best til?",
    options: [
      { text: "Å ta problemet før det rekker å bli et problem.", points: { lopebille: 3, gulloye: 2 } },
      { text: "Å gjøre om det andre kaster, til noe brukbart.", points: { meitemark: 3 } },
      { text: "Å møte opp. Hver gang. Uten unntak.", points: { humle: 3, fugler: 2 } },
      { text: "Å vente helt stille til det rette øyeblikket.", points: { edderkopp: 3, padde: 2 } },
    ],
  },
  {
    q: "Hvor lenge har du vært her?",
    options: [
      { text: "Lenger enn alle andre. Ingen husker at jeg kom.", points: { padde: 2, meitemark: 1, edderkopp: 1 } },
      { text: "Jeg kommer og går. Ingen har helt oversikt.", points: { pinnsvin: 3, fugler: 1 } },
      { text: "Sesongen. Så drar jeg videre.", points: { fugler: 4 } },
      { text: "Jeg overvintrer. Jeg er tilbake i mars.", points: { gulloye: 3, humle: 2 } },
    ],
  },
  {
    q: "Hva skal det stå på skiltet ved døra?",
    options: [
      { text: "Drift og vedlikehold", points: { meitemark: 2, edderkopp: 2 } },
      { text: "Nattevakt", points: { lopebille: 2, padde: 2, pinnsvin: 2 } },
      { text: "Kundekontakt", points: { bie: 3, humle: 2, fugler: 1 } },
      { text: "Skadedyrkontroll", points: { marihone: 3, gulloye: 2, blomsterflue: 3 } },
    ],
  },
];

/* Uavgjort avgjøres av rekkefølgen i EMPLOYEES, aldri av tilfeldighet: to
   personer som svarer likt skal få samme svar, også når de tar den om igjen. */
export function score(answers: number[]): { winner: Employee; runnersUp: Employee[] } {
  const total: Record<string, number> = {};
  answers.forEach((choice, i) => {
    const opt = QUESTIONS[i]?.options[choice];
    if (!opt) return;
    for (const [k, v] of Object.entries(opt.points)) total[k] = (total[k] ?? 0) + v;
  });
  const ranked = EMPLOYEES
    .map((e, i) => ({ e, n: total[e.key] ?? 0, i }))
    .sort((a, b) => b.n - a.n || a.i - b.i);
  return { winner: ranked[0].e, runnersUp: [ranked[1].e, ranked[2].e] };
}
