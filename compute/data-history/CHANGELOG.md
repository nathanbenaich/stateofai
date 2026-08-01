# Compute Index — change log

Newest first. Each entry records what moved in that month's refresh (old → new), the tier, and the source. Full data snapshots live alongside this file as `<YYYY-MM>.json`.

Snapshots: [`2026-06.json`](2026-06.json) · [`2026-07.json`](2026-07.json) · [`2026-08.json`](2026-08.json)

---

## 2026-08 (cutoff 1 August 2026)

GPU-fleet charts refreshed via the RUNBOOK §7 research sweep, then audited cell-by-cell against primary sources (§10 checker pass). Chartable changes:

| Chart | Item | Old | New | Tier | Source |
|---|---|---|---|---|---|
| `hopper` | Gefion (DCAI, Denmark) — H100 | — | 1,528 | Deployed | [NVIDIA](https://blogs.nvidia.com/blog/denmark-sovereign-ai-supercomputer) |
| `hopper` | DeltaAI (NCSA) — GH200 | — | 608 | Deployed | [NCSA](https://delta.ncsa.illinois.edu/deltaai-hardware-and-network/) |
| `hopper`, `grace_blackwell` | xAI Colossus 1 / Colossus 2 | "xAI …" | "SpaceXAI …" | label only, no count or tier moved | [CNBC](https://www.cnbc.com/2026/02/03/musk-xai-spacex-biggest-merger-ever.html) |
| `blackwell` | Eli Lilly (LillyPod) — B300 | — | 1,016 | Deployed | [NVIDIA](https://blogs.nvidia.com/blog/lilly-ai-factory-live) |
| `blackwell` | Yotta D2 (Greater Noida) — HGX B300 | — | 20,736 | Announced | [Yotta](https://yotta.com/press-releases/yotta-to-deploy-20000-nvidia-blackwell-ultra-gpus/) |
| `grace_blackwell` | Jane Street — GB300 (56× NVL72) | — | 4,032 | Deployed | [NVIDIA AI Infrastructure](https://x.com/NVIDIADC/status/2056419748225691802) |
| `demand` | OpenAI — non-NVIDIA | 16 GW | 16.75 GW | contracted (adds Cerebras 750 MW, signed 14 Jan 2026) | [Cerebras](https://www.cerebras.ai/blog/openai-partners-with-cerebras-to-bring-high-speed-inference-to-the-mainstream) |
| `demand` | Anthropic — non-NVIDIA | 5 GW | 7 GW | contracted (adds AMD up to 2 GW MI450, 22 Jul 2026) | [AMD](https://ir.amd.com/news-events/press-releases/detail/1292/amd-and-anthropic-announce-strategic-partnership-to-deploy-up-to-2-gigawatts-of-amd-instinct-mi450-series-gpus) |

All three stacked bars re-sorted descending by row total. A100 unchanged. Citation charts (`cited_*`, `research_topic`) unchanged — Zeta Alpha data refreshes annually with the report.

Reverted by the checker (proposed but not published): IREN 50,000 B300 stays Announced (purchase agreements with phased H2 2026 delivery; the June financing close covers separate GB300 silicon); Sines 12,600 stays Installing ("builds on the deployment of" is not a claim of operation); Leonardo LISA 1,328 stays Installing (inaugurated 11 Jun 2026, user availability only "expected during summer 2026"); SpaceXAI Colossus 2 110,000 stays Installing (Google's contracted capacity starts October 2026 — no evidence of present operation). Held out per the never-invent rule: Arrhenius (NAISS publishes no total accelerator count), Firmus Southgate (~18,400 GB300 not yet deployed, ownership unresolved, likely the same hardware as its Oct 2025 18,500 announcement), Nscale Keflavik 4,600 (source is Nov 2025, B300/GB300 split unresolved), Blue Swan / HammerHAI / Mimer (EuroHPC procurement contracts, not installed), NERSC Cech 144 GB200 (LBNL says "currently being installed"), Microsoft Fairwater, Meta Prometheus, Reliance Jio, Korea national phase 2, ByteDance Indonesia.

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
