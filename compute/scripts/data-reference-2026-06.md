# State of AI Compute Index — GPU fleet update (June 2026, v2)

Data cutoff: 1 June 2026. Built from ~15 parallel source sweeps (hyperscalers, frontier labs West + China, neoclouds + long tail, crypto-to-AI hosts, enterprise/finance/telco, sovereign HPC across US/EU/ME/Asia). Primary sources prioritized; high-impact figures independently verified (see end).

---

## READ FIRST

**1. Disclosure has collapsed to MW/$.** National HPC still publishes exact GPU counts; hyperscalers and most neoclouds now disclose power (MW/GW) or dollars, not chips. So a true GPU-count chart is only fully defensible for National HPC + a handful of companies (Meta historically, xAI, Tesla, Microsoft's one GB300 cluster, SoftBank, a few sovereigns). Everything else is an estimate or a commitment.

**2. Stacked bars solve the deployed-vs-hype problem (your idea — done).** Every operator bar is split into three series: **Deployed / Installing / Announced**. This shows, honestly, how little of the giant headline numbers (Stargate 450k, HUMAIN 600k, Korea 260k) is actually live. Use the colored segments; don't sum the totals as if installed.

**3. Double-counting is THE hazard.** OpenAI/Anthropic/most startups own ~no GPUs — they rent from Microsoft/Oracle/CoreWeave/Crusoe/Google/AWS. Neoclouds' fleets are contracted to those same hyperscalers. Crypto "AI" hosts (TeraWulf, Core Scientific, Cipher, Galaxy, Applied Digital) are landlords; the silicon belongs to their tenants. **Chart by owner/operator; never add a renter on top of its host.** Full register at the end.

**4. "GB100" is not a product.** Blackwell = B100 (barely shipped) / B200 / B300 (Ultra). Superchips = GB200 / GB300 (NVL72 rack = 72 GPUs). Next gen = Vera Rubin (VR200). New charts are B200/B300 and GB200/GB300.

**5. China is a separate callout, not in the main bars.** Chinese NVIDIA holdings are mostly export-variant parts (H20/H800/A800), not the standard H100/A100/Blackwell the charts track. Kept separate.

---

## CHART 1 — A100 (Ampere). All deployed; legacy/declining.
File: `chart1_a100_stacked.csv`

| Operator / System | Deployed | Category |
|---|---|---|
| Meta Research SuperCluster | 16,000 | Private (aging) |
| Leonardo Booster (CINECA) | 13,824 | National HPC |
| Perlmutter (NERSC) | 7,168 | National HPC |
| Polaris (Argonne) | 2,240 | National HPC |
| Berzelius (Linköping) | 752 | National HPC |
| Delta (NCSA) | 440 | National HPC |
| Jean Zay (IDRIS) | 416 | National HPC |
| NSCC ASPIRE 2A (Singapore) | 352 | National HPC |
| Gadi (NCI) | 16 | National HPC |

Nobody is adding Ampere; several A100 fleets are being retired. Expect flat-to-down. (Chinese A100/A800: see callout.)

---

## CHART 2 — Hopper (H100 + H200 + GH200). GH200 = 1 Hopper GPU/superchip.
File: `chart2_hopper_stacked.csv`

| Operator / System | Deployed | Installing | Chip | Category | Note |
|---|---|---|---|---|---|
| **xAI Colossus 1** | 200,000 | – | H100+H200 | Private | owner xAI/SpaceX; **leased to Anthropic from May'26** |
| Tesla Cortex | 66,000 | – | H100+H200 | Private | figure is "H100-equivalent" (perf-normalized) |
| Meta GenAI clusters | 49,152 | – | H100 | Private | **350k "H100-equivalent" target incl A100/AMD/MTIA — not verifiable; footnote not bar** |
| CoreWeave (one cluster) | 42,000 | – | H200 | Public | ⚠ serves MS/OpenAI/Meta |
| Voltage Park | 24,000 | – | H100 | Public | |
| JUPITER Booster (Jülich) | 23,536 | – | GH200 | National HPC | Top500 #5 |
| Microsoft Eagle | 14,400 | – | H100 | Public | |
| Alps (CSCS) | 10,752 | – | GH200 | National HPC | Top500 #10 |
| AIST ABCI 3.0 (JP) | 6,128 | – | H200 | National HPC | |
| Isambard-AI (UK) | 5,448 | – | GH200 | National HPC | |
| NVIDIA Eos | 4,608 | – | H100 | Vendor | |
| MareNostrum 5 (BSC) | 4,480 | – | H100 | National HPC | |
| KAUST Shaheen III | 2,800 | – | GH200 | National HPC | |
| Venado (LANL) | 2,560 | – | GH200 | National HPC | |
| Israel-1 (NVIDIA) | 2,048 | – | H100 | Vendor | |
| NSCC ASPIRE 2B (SG) | 1,536 | – | H200 | National HPC | |
| Jean Zay (IDRIS) | 1,456 | – | H100 | National HPC | |
| Leonardo LISA (CINECA) | – | 1,328 | H100 | National HPC | summer 2026 |

**xAI Colossus 1 (200k) dominates the chart.** Total xAI fleet ~500k (DCD). Owner-basis it's xAI/SpaceX; the workload tenant is Anthropic from May 2026 — footnote.

---

## CHART 3 — Blackwell GPUs standalone (B200 + B300). B100 ≈ 0.
File: `chart3_blackwell_b200_b300_stacked.csv`

| Operator | Deployed | Installing | Announced | Chip | Note |
|---|---|---|---|---|---|
| Deutsche Telekom (Munich) | 10,000 | – | – | B200 | Industrial AI Cloud, live Q1'26 |
| SoftBank DGX SuperPOD | 4,000 | – | – | B200 | |
| SK Telecom Haein | 1,000 | – | – | B200 | Upstage rents ~500 here (don't double-count) |
| E2E Networks (India) | 1,024 | – | – | B200 | |
| IREN | – | – | 50,000 | B300 | ordered Mar'26; 150k fleet target |
| Cloud GA instances | n/d | – | – | B200/B300 | Google A4 / AWS P6 / Azure / Lambda / RunPod / DataCrunch — counts undisclosed |

Standalone B200/B300 is thin — the volume is in NVL72 (next chart). B100 did not ship at scale. (TensorWave's 8,192 MI325X is AMD — excluded.)

---

## CHART 4 — Grace-Blackwell (GB200 + GB300). NVL72 rack = 72 GPUs. The big one.
File: `chart4_grace_blackwell_stacked.csv`

| Operator | Deployed | Installing | Announced | Chip | Note / double-count |
|---|---|---|---|---|---|
| Stargate Abilene (OpenAI/Oracle/Crusoe) | – | 64,000 | 386,000 | GB200 | owner Oracle/Crusoe, tenant OpenAI — count once |
| HUMAIN (Saudi) | – | 18,000 | 582,000 | GB300 | US license cap ~35k near-term |
| Nscale → Microsoft | – | – | 200,000 | GB300 | TX/NO/UK/PT; tenant Microsoft |
| South Korea (national) | – | – | 260,000 | Blackwell | aggregate of 5 entities |
| xAI Colossus 2 | – | 110,000 | – | GB200 | phase 1 ops Feb'26 |
| Stargate Norway (Nscale/Aker) | – | – | 100,000 | Blackwell | OpenAI withdrew; MS offtake |
| Argonne Solstice+Equinox (DOE) | – | 10,000 | 100,000 | Blackwell | largest US national NVIDIA |
| Together / Hypertec | 36,000 | – | – | GB200 | Hypertec owns; Together resells |
| ByteDance (Malaysia, offshore) | – | 36,000 | – | GB200 | export-compliant offshore |
| Stargate UAE / G42 | – | 35,000 | – | GB300 | |
| xAI Colossus 1 | 30,000 | – | – | GB200 | |
| AWS Project Ceiba | – | 20,736 | – | GB200 | NVIDIA captive (288 racks) |
| UK Nebius/Nscale | – | – | 14,000 | Blackwell | |
| Mistral "Bruno" (FR) | – | 13,800 | – | GB300 | Fluidstack-operated (CONSOLIDATED — was double-listed) |
| Sines (MS/Nscale, PT) | – | 12,600 | – | Blackwell Ultra | |
| Taiwan Foxconn | – | – | 10,000 | GB300 | |
| IT4LIA (Bologna) | – | – | 8,000 | GB200 NVL4 | |
| Microsoft Azure NDv6 (GB300) | 4,608 | – | – | GB300 | for OpenAI — cleanest GB300 figure |
| Microsoft Azure NDv6 (GB200) | 4,000 | – | – | GB200 | |
| HIVE/BUZZ HPC (Canada Bell/Cohere) | – | 2,304 | – | GB200 | |
| Indosat (Indonesia) | 2,304 | – | – | GB200 | |
| SoftBank | 1,224 | – | – | GB200 | |

Plus undisclosed: Microsoft **Fairwater** (WI + GA) "hundreds of thousands" GB200/GB300 — real but no count, footnote. CoreWeave GB200/GB300 "thousands" (→110k ceiling).

**The story this chart tells:** deployed Grace-Blackwell worldwide is on the order of ~80–120k GPUs; *installing* adds a few hundred thousand; *announced* is well over 2 million. The announced segment should visually dwarf — and be visually distinct from — the deployed.

---

## CHINA (callout, export-restricted — NOT in main bars)
- Big 3 (ByteDance/Alibaba/Tencent) collectively ordered ~1.0–1.3M **H20** in early 2025 (~$12–16B), largely stranded by US/China policy whipsaw. Per-company splits undisclosed.
- DeepSeek/High-Flyer ~60k mixed (10k A100, 10k H800, 10k H100 grey-market, 30k H20).
- ByteDance offshore: Malaysia **36,000 GB200** (in Chart 4), Indonesia >7,000 B200.
- H200-to-China: >400k approved (75k/firm cap), ~0 shipped as of May'26.
- Domestic (NON-NVIDIA): Zhipu ~100k Huawei Ascend 910B; iFlytek ~10k Ascend; Huawei CloudMatrix 384 (Ascend 910C); Baidu Kunlunxin.

---

## DEMAND-SIDE LENS — who has rented what, and from whom (NOT double-counting)
File: `chart5_rental_demandside.csv`. This is the complement to the supply charts: the supply charts say who owns the iron; this says who has *contracted* it. Same physical GPUs, different question. Attribute each renter to its host so the two reconcile.

Key reality: renters announce **$ and GW**, rarely GPU counts. Keep native units; don't fabricate counts.

**Mega-renters (frontier labs):**
- **OpenAI** — ~$1.15T across 2025–35: NVIDIA 10 GW / up to $100B (Vera Rubin, 1st GW H2'26); Oracle $300B (~4.5 GW, 450k GB200 Stargate); Microsoft Azure $250B; AWS $38B (100k+ GB200/GB300); CoreWeave $22.4B; **Broadcom $350B (custom ASIC, non-NVIDIA); AMD $90B (non-NVIDIA)**. Stargate total ~7 GW / $400B+.
- **Anthropic** — ~$200B+ portfolio, deliberately multi-silicon: Google **up to 1M TPU → 3.5–5 GW (non-NVIDIA)**; AWS **Project Rainier ~500k–1M Trainium2 (non-NVIDIA)**; Microsoft Azure+NVIDIA **$30B / up to 1 GW (NVIDIA)**; **xAI Colossus 1 lease ~220k NVIDIA GPUs, $1.25B/mo**; Fluidstack $50B. → Most of Anthropic's compute is NON-NVIDIA; its NVIDIA exposure is the Azure 1 GW + the Colossus 1 lease.
- **Microsoft** (as offtaker): Nscale 200k GB300; IREN 200 MW/$9.7B; Lambda tens of thousands GB300; Nebius multi-$B; Crusoe Abilene #2 900 MW.
- **Meta** (as offtaker): CoreWeave $35.2B total; Nebius up to $27B (EU). 2026 capex $115–135B.

**Startups (NVIDIA, host attributed):** Cohere→CoreWeave (GB200); Perplexity→AWS+CoreWeave; Thinking Machines→Google Cloud (GB300) + NVIDIA (≥1 GW Rubin '27); World Labs/Magic/Character→Google Cloud; Runway→CoreWeave (GB300); Reka/Suno→Oracle; Luma→HUMAIN; Sarvam→Yotta (4,096 H100); Upstage→SKT (~500 B200); Mistral→Fluidstack (13,800 GB300, dedicated); Databricks→CoreWeave (3,072 H100 run); Snowflake→AWS (>1,000); Jane St→CoreWeave; HRT→Google/Lambda; Inflection→CoreWeave (22k H100, legacy). Cancelled: Poolside 40k GB300.

**How to chart this without double-counting the supply side:** show it as a SEPARATE demand view — e.g. a stacked bar per renter, segmented by provider, measured in **GW** (the only unit every mega-deal shares) with GPU counts in tooltips. A reconciliation note can tie, e.g., OpenAI's Oracle 4.5 GW to the Stargate Abilene bar on the supply chart.

## DOUBLE-COUNT REGISTER (within a single lens — count owner once on the supply chart)
- **Renters → host:** OpenAI→MS/Oracle/CoreWeave/Crusoe; Anthropic→AWS Trainium+Google TPU+xAI Colossus1; Cohere/Perplexity/Runway/Inflection(legacy 22k)→CoreWeave; Thinking Machines/World Labs/Character/Magic→Google Cloud; Reka/Suno→Oracle; Sarvam→Yotta; Upstage→SKT; Jane St/Databricks→CoreWeave; Snowflake→AWS; e&→Oracle.
- **Crypto landlords (GPUs = tenant's):** TeraWulf/Cipher/Hut8-colo→Fluidstack(→Anthropic); Core Scientific/Galaxy-Helios/Applied Digital→CoreWeave.
- **Marketplaces/brokers (capacity on others):** Vast.ai, Hyperbolic, SF Compute, Lepton (NVIDIA), Modal, Baseten, RunPod Community tranche, Fluidstack marketplace tranche.
- **Neocloud↔hyperscaler:** CoreWeave (MS 67% of rev; Meta/OpenAI backlog), Nscale (MS offtake), Crusoe/Nebius (MS/Meta).
- **Cancelled (do NOT count):** Poolside 40,000 GB300 (CoreWeave deal dead Mar'26).
- **My own fix:** Mistral 13,800 GB300 and "Fluidstack >18k" were the same buildout — consolidated.

## EXCLUDED — non-NVIDIA
Trainium (Anthropic/Decart), Google TPU (Anthropic/Apple/SSI/Character partial), Tesla Dojo (dead), AMD (El Capitan, Frontier, LUMI, Oracle MI300/450, TensorWave, Liquid AI, Essential, Silo/Poro, HUMAIN-AMD), Intel (Aurora, Dawn), Cerebras (G42 Condor Galaxy), Qualcomm (HUMAIN AI200/250), Huawei Ascend / Kunlunxin (China), Fugaku.

## NVIDIA Blackwell ramp (context)
Blackwell volume from ~Q1 FY26; "sold out". NVIDIA FY2026 revenue $215.9B (+65%); DC ~$62B/qtr; Q4 FY26 guide ~$65B. NVIDIA does not publish unit counts — total-shipped figures are analyst estimates.

## VERIFICATION (primary-source checks on the dominant bars)
- Microsoft GB300 4,608: NVIDIA blog "over 4,600 Blackwell Ultra GPUs," 72/rack, Oct 9 2025, for OpenAI. ✓
- xAI Colossus 1 ~200k Hopper + 30k GB200: DCD (May 6 2026) "more than 220,000 GPUs (H100/H200/GB200)," leased to Anthropic; fleet ~500k. ✓ (per-SKU split is SemiAnalysis)
- xAI Colossus 2 ~110k GB200 installing: SemiAnalysis; target 555k/$18B/2GW. ✓
- Meta 49,152: Meta engineering blog (two 24,576 clusters). ✓ 350k is a target, not verified.

## Recommendations
1. Publish all four as **stacked Deployed/Installing/Announced** bars; color Announced lightly so it reads as pipeline.
2. Chart by owner; footnote big tenants (OpenAI, Anthropic).
3. Add the China callout as a side panel, not a bar.
4. Where only MW exists (neoclouds, crypto hosts), consider a companion MW chart rather than fabricating GPU counts.
5. Re-pull quarterly — these move monthly.
