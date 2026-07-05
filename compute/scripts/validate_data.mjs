#!/usr/bin/env node
// validate_data.mjs — the verifier gate for the Compute Index refresh loop.
//
// Encodes the RUNBOOK §4 rules as machine checks so a monthly refresh agent
// cannot ship a DATA object that breaks them. Run from the repo root:
//   node compute/scripts/validate_data.mjs [path/to/compute-charts.js]
// Exit 0 = all gates pass (safe to open the PR). Exit 1 = a gate failed.
//
// This checks *mechanical* integrity only (schema, sort, double-count, colors,
// no-invented-negatives). It cannot verify a count is TRUE or that the
// Deployed/Installing/Announced tiering is judged right — that stays a human
// call at PR review (RUNBOOK §9).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const target = process.argv[2]
  ? resolve(process.argv[2])
  : resolve(REPO_ROOT, "assets", "compute-charts.js");

// --- RUNBOOK constants -----------------------------------------------------
const LINE = ["cited_chip", "cited_nvidia", "cited_startup"];
const STACKED = ["hopper", "a100", "blackwell", "grace_blackwell"];
const TIER_NAMES = ["Deployed", "Installing", "Announced"];
const TIER_COLORS = { Deployed: "#161E59", Installing: "#154ee3", Announced: "#F2A65A" };
const DEMAND_LABELS = ["OpenAI", "Anthropic"]; // renters — belong ONLY in `demand`
const ALL_SLUGS = [...LINE, ...STACKED, "demand", "research_topic"];

// --- extract the DATA object (it is JSON: `var DATA={...};`) ----------------
function extractDATA(src) {
  const marker = src.indexOf("DATA=");
  if (marker === -1) throw new Error("could not find `DATA=` in the file");
  const start = src.indexOf("{", marker);
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) return JSON.parse(src.slice(start, i + 1)); }
  }
  throw new Error("unbalanced braces extracting DATA");
}

// --- check harness ----------------------------------------------------------
const fails = [];
const warns = [];
const fail = (m) => fails.push(m);
const warn = (m) => warns.push(m);

const DATA = extractDATA(readFileSync(target, "utf8"));

// 1. every expected chart present
for (const slug of ALL_SLUGS) if (!DATA[slug]) fail(`missing chart: ${slug}`);

// 2. line + stacked: series data length must equal labels length
for (const slug of [...LINE, ...STACKED, "demand"]) {
  const c = DATA[slug];
  if (!c) continue;
  const n = c.labels?.length ?? 0;
  for (const s of c.series ?? [])
    if ((s.data?.length ?? -1) !== n)
      fail(`${slug}: series "${s.name}" has ${s.data?.length} points, expected ${n} (labels)`);
}

// 3. no invented negatives (nulls allowed for missing data; negatives never)
for (const slug of [...LINE, ...STACKED, "demand"]) {
  for (const s of DATA[slug]?.series ?? [])
    for (const v of s.data ?? [])
      if (v != null && v < 0) fail(`${slug}: series "${s.name}" has a negative value ${v}`);
}

// 4. stacked bars sorted DESCENDING by row total (RUNBOOK §3/§4)
for (const slug of STACKED) {
  const c = DATA[slug];
  if (!c) continue;
  const totals = c.labels.map((_, i) =>
    (c.series ?? []).reduce((t, s) => t + (s.data?.[i] ?? 0), 0));
  for (let i = 1; i < totals.length; i++)
    if (totals[i] > totals[i - 1] + 1e-9) {
      fail(`${slug}: not sorted desc by total — "${c.labels[i]}" (${totals[i]}) > "${c.labels[i - 1]}" (${totals[i - 1]})`);
      break;
    }
  // tier names + colors
  for (const s of c.series ?? []) {
    if (!TIER_NAMES.includes(s.name)) fail(`${slug}: unexpected series name "${s.name}"`);
    else if (s.color !== TIER_COLORS[s.name]) warn(`${slug}: "${s.name}" color ${s.color} != canonical ${TIER_COLORS[s.name]}`);
  }
}

// 5. research_topic: ascending by value, color matches sign
{
  const c = DATA.research_topic;
  if (c) {
    const { labels = [], values = [], colors = [] } = c;
    if (!(labels.length === values.length && values.length === colors.length))
      fail(`research_topic: labels/values/colors length mismatch (${labels.length}/${values.length}/${colors.length})`);
    for (let i = 1; i < values.length; i++)
      if (values[i] < values[i - 1] - 1e-9) { fail(`research_topic: not sorted ascending by value at index ${i}`); break; }
    for (let i = 0; i < values.length; i++) {
      const want = values[i] >= 0 ? "#2CA02C" : "#D62728";
      if (colors[i] !== want) fail(`research_topic: "${labels[i]}" value ${values[i]} colored ${colors[i]}, expected ${want}`);
    }
  }
}

// 6. double-count gate — a renter (demand chart) must not own a fleet bar (§4)
{
  const demand = new Set((DATA.demand?.labels ?? []).map((l) => l.trim()));
  for (const slug of STACKED) {
    for (const label of DATA[slug]?.labels ?? []) {
      const t = label.trim();
      if (demand.has(t) || DEMAND_LABELS.includes(t))
        fail(`${slug}: "${label}" is a renter owned in the demand chart — double-count (§4)`);
      else
        for (const r of DEMAND_LABELS)
          if (new RegExp(`(^|[^a-zA-Z])${r}([^a-zA-Z]|$)`).test(label))
            warn(`${slug}: "${label}" mentions "${r}" — confirm it is the operator/site, not the renter (§4 double-count)`);
    }
  }
}

// --- report -----------------------------------------------------------------
const rel = target.replace(REPO_ROOT + "/", "");
if (warns.length) {
  console.log(`\n⚠  ${warns.length} warning(s) — review, not blocking:`);
  for (const w of warns) console.log(`   - ${w}`);
}
if (fails.length) {
  console.error(`\n✗ ${fails.length} gate failure(s) in ${rel}:`);
  for (const f of fails) console.error(`   - ${f}`);
  console.error(`\nDo NOT open the PR. Fix the DATA object and re-run.\n`);
  process.exit(1);
}
console.log(`\n✓ ${rel}: all ${ALL_SLUGS.length} charts pass the RUNBOOK §4 gates${warns.length ? ` (${warns.length} warning(s) above)` : ""}.\n`);
process.exit(0);
