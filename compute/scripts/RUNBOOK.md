# State of AI Compute Index — monthly update runbook

How the `/compute` page is built and how to refresh the data each month and publish it live.
Built June 2026. Live at https://www.stateof.ai/compute (Netlify auto-deploys on push to `master`).

---

## 1. What's on the page

Nine charts, all self-hosted **Chart.js** (no external runtime). Each chart block in `compute.html` is:
title (`.graph-title`) + date (`.graph-date`) + `<canvas id="chart-<slug>">` + a toolbar (Download / Share / Embed) + notes.

| slug | chart | type | source |
|---|---|---|---|
| `cited-chip` | Cited chip usage in AI papers | line, log y | Zeta Alpha |
| `cited-nvidia` | Cited NVIDIA usage in AI papers | line | Zeta Alpha |
| `cited-startup` | Cited AI chip startup usage | line | Zeta Alpha |
| `hopper` | Hopper GPU count (H100/H200/GH200) | stacked bar | operator/HPC disclosures |
| `a100` | A100 GPU count | bar | operator/HPC disclosures |
| `blackwell` | Blackwell GPU count (B200/B300) | stacked bar | operator disclosures |
| `grace-blackwell` | Grace-Blackwell (GB200/GB300) | stacked bar | operator disclosures |
| `demand` | Frontier-lab contracted compute (GW) | stacked bar | company announcements |
| `research-topic` | Research topic signals by AI chip | diverging bar | Zeta Alpha |

## 2. File map

- `compute.html` — the page. Chart blocks + toolbar + `<script src="/assets/chart.umd.min.js">` and `<script src="/assets/compute-charts.js">` before `</body>`.
- `assets/compute-charts.js` — **the single source of truth for chart data** (the `DATA = {…}` object at the top), plus all rendering, legend-hover highlight, and the Download/Share/Embed toolbar logic.
- `assets/chart.umd.min.js` — vendored Chart.js v4 (self-hosted to satisfy CSP `script-src 'self'`).
- `compute/sources.html` — itemised data-sources page (`/compute/sources`).
- `compute/embed/<slug>.html` — single-chart pages for third-party `<iframe>` embedding (`/compute/embed/<slug>`).
- `compute/share/<slug>.html` — social share pages with Twitter/OG card metadata; JS-redirect humans to `/compute#chart-<slug>`.
- `og/<slug>.png` — pre-rendered 1200×630 (@2×) card images that X/LinkedIn unfurl.
- `netlify.toml` — security headers; `/compute/embed/*` is allowed to be framed cross-origin (`frame-ancestors *`).
- `compute/scripts/` — generators + reference data + this runbook.
- `compute/data-history/` — version-controlled snapshots of the chart data (`<YYYY-MM>.json`) + `CHANGELOG.md`, so we keep a history of how each graph changed over time.

## 3. Data model (`DATA` in `assets/compute-charts.js`)

- **Line** (`cited_chip`/`cited_nvidia`/`cited_startup`): `{labels:[years], log:bool, ytitle, series:[{name, data:[…]}]}`. Use `null` for a missing year.
- **Stacked bar** (`hopper`/`a100`/`blackwell`/`grace_blackwell`): `{labels:[operators], unit, series:[{name:'Deployed'|'Installing'|'Announced', color, data:[…]}]}`. Sort `labels`/`data` descending by row total.
- **demand**: `{labels:['OpenAI','Anthropic'], unit:' GW', series:[{name:'NVIDIA'|'Non-NVIDIA', color, data}]}`.
- **research_topic**: `{labels, values:[signed pp], colors:[green if ≥0 else red], xtitle}`. Sort ascending by value.

Colors: Deployed `#161E59`, Installing `#154ee3`, Announced `#F2A65A`; line palette at top of the file; NVIDIA `#76B900`, Non-NVIDIA `#9aa0b4`; diverging green `#2CA02C` / red `#D62728`.

## 4. Definitions & rules (keep these consistent every month)

- Counts are **NVIDIA data-center GPUs**. GH200/GB200/GB300 count as GPU dies; one NVL72 rack = 72 GPUs.
- **Status tiers:** Deployed (operating) / Installing (racked or energising) / Announced (committed, not installed). Only Deployed is live capacity.
- **Count by owner/operator.** Renters (OpenAI, Anthropic, startups) belong in the `demand` chart, never added on top of the cloud/host that owns the silicon (avoids double-counting).
- National-HPC counts are exact (published); company/neocloud/sovereign figures are estimates or announced commitments — label them, and **never invent a count** where the source doesn't disclose one.
- China = export-variant parts (H20/H800/A800) → keep in the sources callout, not in the main bars.

## 5. Monthly update procedure

1. **Pick the new cutoff date** (e.g. `1 Jul 2026`).
2. **Citation charts (Zeta Alpha):** these refresh **annually with the State of AI Report**, not monthly — there is no live feed. Zeta Alpha supplies the per-year counts (chip family, NVIDIA chip, AI-chip startup, research-topic skew) as a dataset; paste them into `DATA.cited_chip` / `cited_nvidia` / `cited_startup` / `research_topic` in `assets/compute-charts.js`. `citation-data.json` / `research-topic-data.json` here are the shape reference (values as last refreshed for the Oct 2025 report). **We no longer use Graphy** — the old `visualize.graphy.app` embeds were retired when the charts moved to self-hosted Chart.js; don't fetch them. On a normal monthly run these four charts are unchanged, so leave their "Last update" labels as-is rather than bumping them.
3. **GPU fleet charts:** refresh `DATA.hopper` / `a100` / `blackwell` / `grace_blackwell` / `demand` by re-running the research sweep (§7). Move operators between Deployed/Installing/Announced as builds progress; re-sort each bar descending by total.
4. **Update dates:** the `.graph-date` spans in `compute.html` ("Last update: …" / "Data cutoff: …") and the cutoff line in `compute/sources.html`.
5. **Update sources:** edit the source map in `compute/scripts/build_sources.py` and run it (`cd` repo root → `python3 compute/scripts/build_sources.py`) to regenerate `compute/sources.html`. (Or hand-edit the page.)
6. **Snapshot the data (version history):** `python3 compute/scripts/snapshot_data.py` (infers the month from the `compute.html` cutoff). Writes `compute/data-history/<YYYY-MM>.json` — a pretty-printed copy of the whole `DATA` object — then add a dated entry (old → new, tier, source) to `compute/data-history/CHANGELOG.md`. This is how we keep a browsable history of how each graph changed over time.
7. **Regenerate the social card images:** `bash compute/scripts/render_og.sh` (needs Google Chrome). This rebuilds `compute/share/*` and the `og/*.png` cards.
8. **Publish:** commit and push to `master` (or open a PR for review — see §9). Netlify deploys to www.stateof.ai automatically.
9. If you changed an `og/*.png` that was previously shared, X/LinkedIn may serve a cached card — re-scrape via their card validators if needed.

## 6. Scripts (`compute/scripts/`)

Run all from the **repo root**.
- `render_og.sh` — regenerate `compute/share/*` + `og/*.png` (serves the repo, screenshots each chart card with headless Chrome, cleans up the temp `compute/cardgen/`).
- `build_og.py` — generates the per-chart render pages + share pages from `compute.html` (called by `render_og.sh`).
- `build_sources.py` — regenerate `compute/sources.html` (edit its source map first).
- `snapshot_data.py` — snapshot the current `DATA` object into `compute/data-history/<YYYY-MM>.json` (run last, after editing `compute-charts.js`).
- `data-reference-2026-06.md` — the full June 2026 dataset: every operator, count, tier, and source, with the double-count register. Use as the baseline to diff against next month.
- `citation-data.json`, `research-topic-data.json` — Zeta Alpha extracts (shape reference for step 2; values as of the Oct 2025 report).
- `../data-history/` — version history of the chart data: one `<YYYY-MM>.json` snapshot per refresh plus `CHANGELOG.md`. See `../data-history/README.md`.

## 7. GPU-fleet research method

The June 2026 baseline was built by fanning out parallel research agents, each owning a slice and returning a sourced table, then deduping and applying the §4 rules. Slices:
hyperscalers + frontier labs (xAI, Microsoft/Azure, OpenAI, Tesla, Meta) · neoclouds (CoreWeave, Nscale, Crusoe, Nebius, Lambda, Together, Voltage Park, Fluidstack, …) · sovereign / national HPC (US DOE, EuroHPC, Middle East, Asia) · China (export-variant) · Western frontier startups (rental attribution) · crypto-to-AI hosts (landlord vs owner) · enterprise / finance / telco.

**Per-slice agent prompt template:**
> You are an AI-infrastructure research analyst. Today is <MONTH YEAR>. Do all web searching yourself; do NOT delegate. Cover <SLICE / named operators>. For each operator find NVIDIA GPU holdings by generation (A100/H100/H200/B200/B300/GB200/GB300). Return a markdown table: Operator | System/region | Chip | Count (GPUs) | Category (Public/Private/National HPC) | Status (deployed/installing/announced) | As-of date | Confidence (H/M/L) | Source URL. Rules: primary sources first; exact counts where disclosed, else say "undisclosed" (never invent); NVL72 racks = 72 GPUs; flag non-NVIDIA (TPU/Trainium/AMD/Ascend) for exclusion; flag renters/landlords for double-count. End with "Notes & uncertainties".

Then: dedupe, apply double-count register, tier by deployed/installing/announced, and write into the `DATA` object.

## 8. Gotchas

- **Subdirectory pages** (`compute/sources`, `compute/share/*`, `compute/embed/*`) must use **absolute** asset paths (`/main.css`, `/assets/…`). Relative paths resolve under `/compute/…` and 404.
- **OG images are static snapshots** — regenerate (step 6) whenever chart data changes.
- Chart export font sizes scale by `devicePixelRatio` so the title stays larger than axis labels on mobile.
- Animation is auto-disabled on `/compute/cardgen/` and `/compute/embed/` pages so headless renders/embeds are clean.
- **Graphy is retired.** All nine charts are self-hosted Chart.js; there are no `visualize.graphy.app` embeds or Graphy API keys anymore. Citation data is maintained inline in `compute-charts.js` (see §5 step 2). If you find a lingering Graphy reference, remove it.

## 9. Scheduling

To run this monthly with an agent: have it execute §5 and open a **branch / PR for review** rather than auto-publishing to `master` — the data has accuracy stakes and the deployed/installing/announced tiering needs judgment. A human approves, then merge → live. (A Claude Code scheduled routine can draft the refresh + PR on the 1st of each month.)
