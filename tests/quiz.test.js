/* Alle 4^8 = 65 536 måter å svare på, telt opp.
 *
 * En personlighetstest der to av elleve svar er umulige å få, er ødelagt på en
 * måte ingen oppdager før noen klager på at de alltid får bien. Og en der ett
 * svar dekker halve trafikken er kjedelig, hvilket for et markedsføringsstunt
 * er den samme feilen.  */
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const here = __dirname;
const src = path.join(here, "..", "app", "hageansatt", "data.ts");
// tsc navngir utdata etter kildefilen, ikke etter oensket.
const out = path.join(here, "data.js");

execFileSync("npx", ["tsc", src, "--outDir", here, "--target", "es2020", "--module",
  "commonjs", "--moduleResolution", "node", "--skipLibCheck"],
  { stdio: "inherit", cwd: path.join(here, ".."), shell: process.platform === "win32" });

const { EMPLOYEES, QUESTIONS, score } = require(out);

let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log("  ok   " + n); } else { fail++; console.log("  FAIL " + n + (x ? "\n         " + x : "")); } };

console.log("\nQUIZEN\n");

ok("elleve ansatte, som i appen", EMPLOYEES.length === 11, String(EMPLOYEES.length));
ok("atte sporsmal", QUESTIONS.length === 8, String(QUESTIONS.length));
ok("fire svar pa hvert", QUESTIONS.every((q) => q.options.length === 4));

// Hvert poeng må peke på en ansatt som finnes.
const keys = new Set(EMPLOYEES.map((e) => e.key));
const ukjent = [];
for (const q of QUESTIONS) for (const o of q.options) for (const k of Object.keys(o.points)) if (!keys.has(k)) ukjent.push(k);
ok("ingen poeng gar til en ansatt som ikke finnes", ukjent.length === 0, ukjent.join(", "));

// Alle 65 536 kombinasjoner.
const wins = {};
const n = QUESTIONS.length, total = Math.pow(4, n);
for (let i = 0; i < total; i++) {
  const answers = [];
  let x = i;
  for (let k = 0; k < n; k++) { answers.push(x % 4); x = Math.floor(x / 4); }
  const w = score(answers).winner.key;
  wins[w] = (wins[w] ?? 0) + 1;
}

const rows = EMPLOYEES.map((e) => ({ key: e.key, name: e.name, n: wins[e.key] ?? 0 }))
  .sort((a, b) => b.n - a.n);
console.log("");
for (const r of rows) {
  const pct = (r.n / total) * 100;
  const bar = "█".repeat(Math.round(pct / 1.5));
  console.log("    " + r.name.padEnd(14) + String(pct.toFixed(1)).padStart(5) + " %  " + bar);
}
console.log("");

const unreachable = rows.filter((r) => r.n === 0).map((r) => r.name);
ok("alle elleve er mulige a fa", unreachable.length === 0, "umulig: " + unreachable.join(", "));

const biggest = rows[0];
ok("ingen ansatt dekker mer enn 18 % av svarene", biggest.n / total < 0.18, biggest.name + " " + ((biggest.n / total) * 100).toFixed(1) + " %");

const rarest = rows[rows.length - 1];
ok("den sjeldneste far minst 4 % av svarene", rarest.n / total > 0.04, rarest.name + " " + ((rarest.n / total) * 100).toFixed(2) + " %");

// Samme svar skal alltid gi samme resultat — også ved uavgjort.
{
  let stable = true;
  for (let i = 0; i < 4000; i++) {
    const a = Array.from({ length: n }, () => Math.floor(Math.random() * 4));
    if (score(a).winner.key !== score([...a]).winner.key) { stable = false; break; }
  }
  ok("samme svar gir alltid samme ansatt", stable);
}

// Andreplassene skal aldri være vinneren om igjen.
{
  let clean = true;
  for (let i = 0; i < 4000; i++) {
    const a = Array.from({ length: n }, () => Math.floor(Math.random() * 4));
    const r = score(a);
    if (r.runnersUp.some((x) => x.key === r.winner.key) || r.runnersUp[0].key === r.runnersUp[1].key) { clean = false; break; }
  }
  ok("kollegene er tre forskjellige dyr", clean);
}

fs.unlinkSync(out);
console.log("\n" + pass + " av " + (pass + fail) + " holdt.\n");
process.exit(fail ? 1 : 0);
