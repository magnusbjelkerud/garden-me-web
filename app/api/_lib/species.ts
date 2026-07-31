// Regulated plant species — the legal lists, kept deliberately separate from any
// ecological risk assessment.
//
// TWO DISTINCT THINGS, NEVER MERGE THEM:
//   `no` — Norway, forskrift om fremmede organismer (FOR-2015-06-19-716) Vedlegg I,
//          the "forbudslista". Forbidden to import, release and trade.
//   `eu` — EU Regulation 1143/2014, the Union list. Directly binding in SE, DK,
//          DE and NL. The number is the year the species was added.
//
// Artsdatabanken's Fremmedartslista is a RISK assessment and is NOT this list.
// Every banned species is high risk, but far from every high-risk species is
// banned — telling a Norwegian user their hagelupin is illegal would be wrong.
//
// The obligations also differ by country and must not be flattened into one
// "forbidden" label: Norway does not require you to remove what you already
// have, only to stop it spreading beyond your garden. The EU rules prohibit
// keeping Union-list species at all.
//
// SOURCE DATA COMPILED 2026-07-31. The EU list grew from 36 to 49 plants across
// the 2024 and 2025 amendments, and Miljødirektoratet proposed expanding the
// Norwegian list in February 2026 — so this file WILL go stale. It is served
// from the API rather than bundled in the app precisely so it can be corrected
// without an App Store release.
//
// NOT YET VERIFIED against the consolidated Implementing Regulation or the
// Lovdata text by a human. Do not surface legal wording to users until it has
// been.

export const SPECIES_LIST_VERSION = "2026-07-31";


export interface RegulatedSpecies {
  /** Canonical accepted binomial. */
  latin: string;
  /** Year added to the EU Union list, if listed. */
  eu?: number;
  /** On Norway's Vedlegg I. */
  no?: boolean;
  /** Accepted alternative names. Claude may return any of these, and for the
   *  knotweeds in particular the older names are still the common ones. */
  synonyms?: string[];
  names: { no?: string; en?: string };
}

export const REGULATED_SPECIES: RegulatedSpecies[] = [
  // ── On both lists ─────────────────────────────────────────────────────────
  { latin: "Heracleum mantegazzianum", no: true, eu: 2017, names: { no: "Kjempebjørnekjeks", en: "Giant hogweed" } },
  { latin: "Heracleum persicum", no: true, eu: 2016, names: { no: "Tromsøpalme", en: "Persian hogweed" } },
  { latin: "Impatiens glandulifera", no: true, eu: 2017, names: { no: "Kjempespringfrø", en: "Himalayan balsam" } },
  { latin: "Elodea nuttallii", no: true, eu: 2017, names: { no: "Smal vasspest", en: "Nuttall's waterweed" } },
  { latin: "Reynoutria japonica", no: true, eu: 2025,
    synonyms: ["Fallopia japonica", "Polygonum cuspidatum"],
    names: { no: "Parkslirekne", en: "Japanese knotweed" } },
  { latin: "Reynoutria sachalinensis", no: true, eu: 2025,
    synonyms: ["Fallopia sachalinensis", "Polygonum sachalinense"],
    names: { no: "Kjempeslirekne", en: "Giant knotweed" } },
  { latin: "Reynoutria × bohemica", no: true, eu: 2025,
    synonyms: ["Fallopia × bohemica", "Reynoutria bohemica"],
    names: { no: "Hybridslirekne", en: "Bohemian knotweed" } },

  // ── Norway only (Vedlegg I) ───────────────────────────────────────────────
  // Several of these are extremely common in Norwegian gardens — rynkerose and
  // hagelupin especially — so this is the part users will actually hit.
  { latin: "Solidago canadensis", no: true, names: { no: "Kanadagullris", en: "Canadian goldenrod" } },
  { latin: "Solidago gigantea", no: true, names: { no: "Kjempegullris", en: "Giant goldenrod" } },
  { latin: "Berberis thunbergii", no: true, names: { no: "Høstberberis", en: "Japanese barberry" } },
  { latin: "Campanula latifolia macrantha", no: true, names: { no: "Prydstorklokke", en: "Giant bellflower (cv.)" } },
  { latin: "Cerastium biebersteinii", no: true, names: { no: "Sølvarve", en: "Taurus chickweed" } },
  { latin: "Cerastium tomentosum", no: true, names: { no: "Filtarve", en: "Snow-in-summer" } },
  { latin: "Swida sericea", no: true, synonyms: ["Cornus sericea", "Cornus stolonifera"],
    names: { no: "Alaskakornell", en: "Red osier dogwood" } },
  { latin: "Laburnum alpinum", no: true, names: { no: "Alpegullregn", en: "Scotch laburnum" } },
  { latin: "Laburnum anagyroides", no: true, names: { no: "Gullregn", en: "Common laburnum" } },
  { latin: "Lupinus polyphyllus", no: true, names: { no: "Hagelupin", en: "Garden lupin" } },
  { latin: "Lupinus nootkatensis", no: true, names: { no: "Sandlupin", en: "Nootka lupin" } },
  { latin: "Lupinus perennis", no: true, names: { no: "Jærlupin", en: "Sundial lupin" } },
  { latin: "Elodea canadensis", no: true, names: { no: "Vasspest", en: "Canadian waterweed" } },
  { latin: "Cotoneaster dielsianus", no: true, names: { no: "Dielsmispel", en: "Diels' cotoneaster" } },
  { latin: "Cotoneaster divaricatus", no: true, names: { no: "Sprikemispel", en: "Spreading cotoneaster" } },
  { latin: "Cotoneaster monopyrenus", no: true, names: { no: "Blomstermispel", en: "Cotoneaster" } },
  { latin: "Rosa rugosa", no: true, names: { no: "Rynkerose", en: "Japanese rose" } },
  { latin: "Populus balsamifera", no: true, names: { no: "Balsampoppel", en: "Balsam poplar" } },
  { latin: "Populus × berolinensis", no: true, names: { no: "Berlinerpoppel", en: "Berlin poplar" } },
  { latin: "Salix euxina", no: true, names: { no: "Skjørpil", en: "Crack willow" } },
  { latin: "Salix × fragilis", no: true, synonyms: ["Salix fragilis"],
    names: { no: "Grønnpil", en: "Hybrid crack willow" } },
  { latin: "Phedimus hybridus", no: true, synonyms: ["Sedum hybridum"],
    names: { no: "Sibirbergknapp", en: "Siberian stonecrop" } },
  { latin: "Phedimus spurius", no: true, synonyms: ["Sedum spurium"],
    names: { no: "Gravbergknapp", en: "Caucasian stonecrop" } },

  // ── EU Union list only ────────────────────────────────────────────────────
  { latin: "Acacia mearnsii", eu: 2025, names: { en: "Black wattle" } },
  { latin: "Acacia saligna", eu: 2019, names: { en: "Golden wreath wattle" } },
  { latin: "Ailanthus altissima", eu: 2019, names: { no: "Gudetre", en: "Tree of heaven" } },
  { latin: "Alternanthera philoxeroides", eu: 2017, names: { en: "Alligator weed" } },
  { latin: "Andropogon virginicus", eu: 2019, names: { en: "Broomsedge bluestem" } },
  { latin: "Asclepias syriaca", eu: 2017, names: { no: "Silkeplante", en: "Common milkweed" } },
  { latin: "Baccharis halimifolia", eu: 2016, names: { en: "Eastern baccharis" } },
  { latin: "Broussonetia papyrifera", eu: 2025, names: { en: "Paper mulberry" } },
  { latin: "Cabomba caroliniana", eu: 2016, names: { en: "Green cabomba" } },
  { latin: "Cardiospermum grandiflorum", eu: 2019, names: { en: "Balloon vine" } },
  { latin: "Celastrus orbiculatus", eu: 2027, names: { en: "Oriental bittersweet" } },
  { latin: "Cortaderia jubata", eu: 2019, names: { en: "Purple pampas grass" } },
  { latin: "Crassula helmsii", eu: 2025, names: { en: "Swamp stonecrop" } },
  { latin: "Delairea odorata", eu: 2025, names: { en: "Cape ivy" } },
  { latin: "Ehrharta calycina", eu: 2019, names: { en: "Perennial veldtgrass" } },
  { latin: "Eichhornia crassipes", eu: 2016, synonyms: ["Pontederia crassipes"],
    names: { en: "Water hyacinth" } },
  { latin: "Gunnera tinctoria", eu: 2017, names: { no: "Kjempegunnera", en: "Chilean rhubarb" } },
  { latin: "Gymnocoronis spilanthoides", eu: 2019, names: { en: "Senegal tea plant" } },
  { latin: "Hakea sericea", eu: 2022, names: { en: "Silky hakea" } },
  { latin: "Heracleum sosnowskyi", eu: 2016, names: { en: "Sosnowsky's hogweed" } },
  { latin: "Humulus scandens", eu: 2019, names: { en: "Japanese hop" } },
  { latin: "Hydrocotyle ranunculoides", eu: 2016, names: { en: "Floating pennywort" } },
  { latin: "Koenigia polystachya", eu: 2022, synonyms: ["Persicaria wallichii", "Polygonum polystachyum"],
    names: { no: "Kjempeslirekne (Himalaya)", en: "Himalayan knotweed" } },
  { latin: "Lagarosiphon major", eu: 2016, names: { en: "Curly waterweed" } },
  { latin: "Lespedeza cuneata", eu: 2019, names: { en: "Chinese bushclover" } },
  { latin: "Ludwigia grandiflora", eu: 2016, names: { en: "Water primrose" } },
  { latin: "Ludwigia peploides", eu: 2016, names: { en: "Floating primrose willow" } },
  { latin: "Lygodium japonicum", eu: 2019, names: { en: "Japanese climbing fern" } },
  { latin: "Lysichiton americanus", eu: 2016, names: { no: "Gul kjempekala", en: "American skunk cabbage" } },
  { latin: "Microstegium vimineum", eu: 2017, names: { en: "Japanese stiltgrass" } },
  { latin: "Myriophyllum aquaticum", eu: 2016, names: { en: "Parrot's feather" } },
  { latin: "Myriophyllum heterophyllum", eu: 2017, names: { en: "Broadleaf watermilfoil" } },
  { latin: "Nanozostera japonica", eu: 2025, synonyms: ["Zostera japonica"],
    names: { en: "Dwarf eelgrass" } },
  { latin: "Parthenium hysterophorus", eu: 2016, names: { en: "Whitetop weed" } },
  { latin: "Pennisetum setaceum", eu: 2017, synonyms: ["Cenchrus setaceus"],
    names: { en: "Crimson fountaingrass" } },
  { latin: "Persicaria perfoliata", eu: 2016, synonyms: ["Polygonum perfoliatum"],
    names: { en: "Asiatic tearthumb" } },
  { latin: "Pistia stratiotes", eu: 2024, names: { en: "Water lettuce" } },
  { latin: "Prosopis juliflora", eu: 2019, names: { en: "Mesquite" } },
  { latin: "Pueraria montana var. lobata", eu: 2016, synonyms: ["Pueraria lobata", "Pueraria montana"],
    names: { en: "Kudzu vine" } },
  { latin: "Rugulopteryx okamurae", eu: 2022, names: { en: "Okamura's brown alga" } },
  { latin: "Salvinia molesta", eu: 2019, names: { en: "Giant salvinia" } },
  { latin: "Triadica sebifera", eu: 2019, synonyms: ["Sapium sebiferum"],
    names: { en: "Chinese tallow tree" } },
];

/** Countries where the EU Union list applies directly. */
export const EU_COUNTRIES = ["SE", "DK", "DE", "NL", "FI", "FR", "ES", "IT", "PL", "BE", "AT", "IE", "PT", "CZ", "EE", "LV", "LT"];

/** Claude returns names like `Malus domestica 'Aroma'` or `Fallopia japonica`.
 *  Reduce both to something comparable: drop the cultivar, normalise the hybrid
 *  sign, lowercase, and collapse whitespace. Kept deliberately conservative —
 *  a missed match shows nothing, a wrong match makes a false legal claim. */
export function normaliseLatin(raw: string): string {
  return raw
    .replace(/['"«»‹›].*$/g, " ")      // drop cultivar and everything after it
    .replace(/\b(var|subsp|ssp|cv|f)\.\s*/gi, "")
    .replace(/[×xX]\s+/g, "× ")        // unify hybrid marker spacing
    .replace(/[^\p{L}\s×]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Genus + species only, so `Pueraria montana lobata` still matches `Pueraria montana`. */
function shortKey(normalised: string): string {
  const parts = normalised.split(" ").filter(Boolean);
  if (parts.length >= 2 && parts[1] === "×") return parts.slice(0, 3).join(" ");
  return parts.slice(0, 2).join(" ");
}

const INDEX = new Map<string, RegulatedSpecies>();
for (const s of REGULATED_SPECIES) {
  for (const name of [s.latin, ...(s.synonyms ?? [])]) {
    const n = normaliseLatin(name);
    INDEX.set(n, s);
    // Only register the genus+species key when the listed taxon IS a plain
    // binomial. Otherwise `Campanula latifolia` — the native Norwegian
    // storklokke, entirely legal — would match the banned garden cultivar
    // `Campanula latifolia macrantha` and be reported as prohibited.
    const parts = n.split(" ").filter(Boolean);
    if (parts.length === 2 || (parts.length === 3 && parts[1] === "×")) {
      INDEX.set(shortKey(n), s);
    }
  }
}

export function lookupSpecies(latin: string | undefined | null): RegulatedSpecies | null {
  if (!latin) return null;
  const n = normaliseLatin(latin);
  return INDEX.get(n) ?? INDEX.get(shortKey(n)) ?? null;
}

export type Applicability = "banned" | "restricted" | "none";

/** What the listing actually means where this user gardens. Returns the status
 *  and which list it comes from — never a legal conclusion. */
export function statusFor(species: RegulatedSpecies | null, countryCode: string): {
  status: Applicability;
  lists: ("NO" | "EU")[];
} {
  if (!species) return { status: "none", lists: [] };
  const lists: ("NO" | "EU")[] = [];
  const cc = countryCode.toUpperCase();

  if (cc === "NO" && species.no) lists.push("NO");
  if (species.eu && EU_COUNTRIES.includes(cc)) lists.push("EU");

  if (lists.length === 0) return { status: "none", lists: [] };
  // Norway: keeping is allowed, spreading is not. EU: keeping is prohibited too.
  return { status: lists.includes("EU") ? "banned" : "restricted", lists };
}
