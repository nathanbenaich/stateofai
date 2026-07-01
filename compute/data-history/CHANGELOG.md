# Compute Index — change log

Newest first. Each entry records what moved in that month's refresh (old → new), the tier, and the source. Full data snapshots live alongside this file as `<YYYY-MM>.json`.

Snapshots: [`2026-06.json`](2026-06.json) · [`2026-07.json`](2026-07.json)

---

## 2026-07 (cutoff 1 July 2026)

GPU-fleet charts refreshed via the RUNBOOK §7 research sweep. Chartable changes:

| Chart | Item | Old | New | Tier | Source |
|---|---|---|---|---|---|
| `demand` | OpenAI — non-NVIDIA | 0 GW | 16 GW (AMD 6 GW MI450 + Broadcom 10 GW "Jalapeño" ASIC) | committed | [OpenAI/Broadcom, CNBC 24 Jun 2026](https://www.cnbc.com/2026/06/24/openai-and-broadcom-reveal-jalapeno-first-ai-chip-in-partnership.html) · [OpenAI/AMD](https://openai.com/index/openai-amd-strategic-partnership/) |
| `blackwell` | Naver Cloud — B200 | — | 4,000 | Deployed | [DCD](https://www.datacenterdynamics.com/en/news/naver-cloud-completes-cluster-of-4000-nvidia-b200-gpus-in-south-korea/) |
| `grace_blackwell` | CoreWeave — GB300 | — | 8,192 | Deployed | [CoreWeave MLPerf Training v6.0, 16 Jun 2026](https://www.coreweave.com/news/coreweave-sets-new-ai-training-records-in-mlperf-r-training-v6-0-training-deepseek-v3-in-approximately-two-minutes) |
| `grace_blackwell` | Mistral "Bruno" — 13,800 GB300 | Installing | Deployed | tier move | [DCD](https://www.datacenterdynamics.com/en/news/mistral-ai-raises-830m-in-debt-financing-for-data-center-in-paris-france/) |

Both stacked bars re-sorted descending by row total. Hopper and A100 unchanged (June 2026 Top500 confirms existing counts). Citation charts (`cited_*`, `research_topic`) unchanged — Zeta Alpha's citation data has no monthly source; it refreshes annually with the report. Held out of the bars per the never-invent rule: Fairwater Wisconsin (→ Deployed but count undisclosed), xAI Colossus 2 (~550k target, no audited count), Reliance Jio GB300 (count undisclosed), new Top500 sovereign entrants (Rmax only, no die counts).

## 2026-06 (cutoff 1 June 2026)

Baseline. First release of the self-hosted Chart.js Compute Index (nine charts), migrated off the previous Graphy embeds. Full operator/tier/source detail for this iteration is in [`compute/scripts/data-reference-2026-06.md`](../scripts/data-reference-2026-06.md).
