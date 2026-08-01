# Vera Rubin research sweep — 1 August 2026 (pre-chart scoping)

One-off RUNBOOK §7-style fan-out to decide whether a Vera Rubin fleet chart is viable.
**Verdict: NO-GO for a fleet chart this month.** Only four rows have any disclosed count, two are
single validation racks, and two are unit-ambiguous 2027 pipeline. Revisit at the **October 2026
refresh** — NVIDIA production shipments begin "this fall" (fiscal Q3 = Aug–Oct 2026), so disclosed
counts should start landing then. The demand chart already carries the Rubin-era GW commitments.

Method note: five research slices were commissioned; **hyperscalers/frontier labs, neoclouds, and
supply-side completed. Sovereign/national-HPC and enterprise/finance/telco did not complete** (session
limits) — re-run those two slices before proposing the chart. Their absence is unlikely to change the
verdict: sovereign Rubin procurements at this stage would be announced contracts without installed
counts, and no enterprise Rubin count surfaced in adjacent searches.

## Rows with a disclosed count (chart candidates, pending checker pass)

| Operator | System/region | Count (GPU dies) | Basis | Status | As-of | Conf | Source |
|---|---|---|---|---|---|---|---|
| CoreWeave | First customer-cloud VR200 NVL72 rack (Dell-built, US); benchmarking | 144 | "1 NVL72 rack" (industry-first bring-up) | Deployed (validated; NVIDIA confirms racks running) | 1 Jun 2026 | H | https://www.coreweave.com/news/coreweave-completes-industry-first-bring-up-of-nvidia-vera-rubin-nvl72 |
| Nebius | Mäntsälä, Finland — first VR200 NVL72 received & validated | 144 | "its first Vera Rubin NVL72 system" = 1 rack | Installing (customer availability H2 2026) | 21 Jul 2026 | H | https://blogs.nvidia.com/blog/vera-rubin/ |
| Nscale (owner; tenant Microsoft) | Start Campus Sines, PT — 2nd 200 MW building | 66,000+ **unit ambiguous** (132,000 dies if packages) | "66,000+ NVIDIA Rubin GPUs" — unit undefined | Announced (deployment starts late 2027) | 5 May 2026 | M | https://www.nscale.com/press-releases/nscale-start-campus |
| Nscale (owner; tenant Microsoft) | Narvik, Norway (ex-"Stargate Norway" capacity) | 30,000 **unit ambiguous** (60,000 dies if packages) | Microsoft "will rent 30,000 additional Nvidia Vera Rubin chips"; delivery 2027 | Announced | 15 Apr 2026 | M | https://www.datacenterdynamics.com/en/news/microsoft-contracts-30000-nvidia-rubin-gpus-from-nscale-at-data-center-in-narvik-norway/ |

Under §4's never-invent rule the two Nscale rows are not chartable until the die/package unit is
confirmed (a 2× swing), and the two single racks make a chart of validation events, not fleets.

## Adoption signals with NO disclosed count (do not chart)

- **Microsoft Azure** — first hyperscaler to power on VR200 NVL72 in labs (16 Mar); initial production
  racks running (21 Jul); next-gen Fairwater superfactories to scale to "hundreds of thousands" of VR
  superchips (unit = superchip = 2 packages + 1 Vera CPU; vague, not counted).
- **Google Cloud** — A5X bare-metal VR200 NVL72 instances announced at Next '26 (22 Apr), first racks
  running 21 Jul. No counts.
- **Oracle OCI** — initial racks running (21 Jul). No counts.
- **AWS** — ">1 million NVIDIA GPUs including Blackwell and Rubin" from 2026: mixed-generation, Rubin
  share not broken out (16 Mar).
- **Meta** — multiyear deal for "millions" of NVIDIA chips incl. Rubin (17 Feb); initial VR systems
  shipped to Meta (21 Jul). No Rubin-specific count. Separately: Nebius–Meta ~$27B/5yr agreement is
  "one of the first large-scale deployments of Vera Rubin" — dollars only, delivery from early 2027.
- **OpenAI** — initial systems delivered; "plans to adopt Vera Rubin at scale during Q3" (21 Jul).
  Renter — capacity will sit on partner-owned sites; no site-level VR counts anywhere yet.
- **SpaceXAI, Tesla** — Rubin-platform adoption signals only (Spectrum-6 switch early adopters);
  no VR GPU purchase disclosed.
- **CoreWeave (fleet), Lambda, Crusoe, Together AI, Vultr, GMI Cloud, Firmus** — named partners/adopters,
  availability H2 2026–2027, zero counts.
- **IREN** — Sweetwater 200 MW phase "designed for Vera Rubin"; $9.7B Microsoft contract reportedly has a
  GB300→VR200 substitution clause. No Rubin order disclosed.
- **Anthropic** — up to 1 GW on "Grace Blackwell and Vera Rubin systems" via Azure (18 Nov 2025);
  VR portion unspecified; capacity belongs to Microsoft's fleet when live.

## GW/$-only disclosures (already in / destined for the `demand` chart — never fleet bars)

| Party | Disclosure | As-of | Source |
|---|---|---|---|
| OpenAI–NVIDIA | LOI ≥10 GW of NVIDIA systems; first VR gigawatt tokens 2H 2026; Feb 2026 restructure: NVIDIA investment $30B; ~3 GW inference + 2 GW training on VR systems reported | 22 Sep 2025 / 4 Mar 2026 | https://openai.com/index/openai-nvidia-systems-partnership/ · https://www.cnbc.com/2026/03/04/nvidia-huang-openai-investment.html |
| Anthropic–Microsoft–NVIDIA | $30B Azure compute + up to 1 GW on GB/VR systems | 18 Nov 2025 | https://www.anthropic.com/news/microsoft-nvidia-anthropic-announce-strategic-partnerships |
| Nebius–Meta | ~$27B over 5 years, first large-scale VR deployment, from early 2027 | 16 Mar 2026 | https://nebius.com/newsroom/nebius-signs-new-ai-infrastructure-agreement-with-meta |
| Global AI | VR200 rollout 100 MW (2026) → 250 MW (2027) → 1 GW (2029) | 16 Mar 2026 | https://finance.yahoo.com/news/global-ai-deploys-largest-nvidia-140000520.html |

## Supply-side timeline (context for chart notes)

- **5 Jan 2026 (CES):** Rubin platform launch; "in full production"; rack renamed NVL144→NVL72. First
  cloud cohort: AWS, Google, Microsoft, OCI + CoreWeave, Lambda, Nebius, Nscale.
- **25 Feb 2026 (FY26 Q4 call):** first VR200 samples shipped to customers.
- **16 Mar 2026 (GTC):** "seven new chips in full production"; ~$1T Blackwell+Rubin bookings visibility
  through 2027. **Rubin CPX cancelled** — replaced by Groq 3 LPX (post-$20B Groq deal; track as a
  separate non-GPU accelerator line, excluded from Rubin die counts).
- **20 May 2026 (FY27 Q1 call):** production shipments commence fiscal Q3 (Aug–Oct 2026), ramp in fiscal Q4.
- **21 Jul 2026:** Ian Buck — "absolutely in full production… being stood up at all of our major
  customers": OpenAI, Azure, Google Cloud, CoreWeave, Meta, Dell named.
- **Estimates (never chartable):** Kuo 5,000–7,000 VR200 racks in H2 2026 (≈720k–1.01M dies);
  TrendForce cut Rubin's 2026 high-end share ~29%→~22%; SemiAnalysis reports Rubin Ultra/Kyber slip
  to 2028 (NVIDIA: "roadmap intact"); rack pricing $5–8M (third-party only). The viral "1,000 racks/day"
  figure traces to no NVIDIA statement or named analyst — do not cite.

## Counting rule (adopted into RUNBOOK §4)

1 VR200 NVL72 rack = 72 Rubin GPU packages = **144 GPU dies** = 36 Vera CPUs. Store dies (racks ×144);
"GPU" flipped meaning mid-roadmap (2025 materials counted dies — NVL144/NVL576; 2026 materials count
packages), so dies are the only unambiguous unit. A bare "N Rubin GPUs" quote is ambiguous — record the
source's unit and hold the row until confirmed. Never count Vera CPUs; superchips = 2 packages = 4 dies.
Rubin Ultra (2027, "Kyber", 576 dies/rack) gets the same die treatment when it arrives.

## Re-check triggers (September/October refresh)

1. NVIDIA FY27 Q2 earnings (late Aug 2026) — first Rubin production-shipment commentary.
2. Operator disclosures as fiscal-Q3 production units land (CoreWeave/Nebius/Nscale fleet counts,
   Azure/Google/OCI region counts, OpenAI's "at scale" Q3 deployment).
3. Nscale unit clarification (66,000 / 30,000 — dies or packages).
4. Re-run the two incomplete slices: sovereign/national HPC and enterprise/finance/telco.
5. Chart ships when ~6+ checker-confirmed rows with disclosed counts exist; run the §10 checker pass
   over this file's candidates at that point.
