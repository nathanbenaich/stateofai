#!/usr/bin/env python3
import re, html
CH = open("compute.html").read()
head = re.search(r'<head>.*?</head>', CH, re.DOTALL).group(0)
# absolutize relative asset paths (this page lives at /compute/sources)
head = head.replace('href="main.css"','href="/main.css"').replace('href="favicon.ico"','href="/favicon.ico"').replace('href="site.webmanifest"','href="/site.webmanifest"')
# fix relative title/canonical lightly: keep as-is (fine for a sub-page)

def esc(s): return html.escape(str(s), quote=True)
def li(item, src, url=None):
    s = f'<b>{esc(item)}</b> — {esc(src)}'
    if url: s += f' (<a href="{esc(url)}" target="_blank" rel="noopener noreferrer">link</a>)'
    return f'<li>{s}</li>'

ZETA = "https://www.zeta-alpha.com/"
sections = []

sections.append(("Cited chip usage / Cited NVIDIA usage / Cited AI chip startup usage / Research topic signals", "intro", [
 ("All four citation charts", "Zeta Alpha analysis of open-source AI papers (per-year citation counts by chip family, by NVIDIA chip, by AI-chip startup, and chip-topic skew vs corpus baseline). Figures for 2026 are counts as of 1 June 2026 plus H2 predictions adjusted for volume. The research-topic dataset covers 6,356 papers (Jan 1 to June 1, 2025), topic-labelled with GPT-4o-mini.", ZETA),
]))

A100 = [
 ("Meta Research SuperCluster — 16,000", "Meta AI blog", "https://ai.meta.com/blog/supercomputer-meta-research-supercluster-2023/"),
 ("Leonardo Booster (CINECA) — 13,824", "CINECA / Top500", "https://leonardo-supercomputer.cineca.eu/hpc-system/"),
 ("Perlmutter (NERSC) — 7,168", "NERSC architecture docs", "https://docs.nersc.gov/systems/perlmutter/architecture/"),
 ("Polaris (Argonne) — 2,240", "ALCF", "https://www.alcf.anl.gov/polaris"),
 ("Berzelius (Linkoping) — 752", "Prior State of AI Compute Index", None),
 ("Delta (NCSA) — 440", "NCSA Delta docs", "https://delta.ncsa.illinois.edu/hardware_and_network/"),
 ("Jean Zay (IDRIS) — 416", "IDRIS", "http://www.idris.fr/eng/jean-zay/"),
 ("NSCC ASPIRE 2A (Singapore) — 352", "NSCC", "https://www.nscc.sg/"),
 ("Gadi (NCI) — 16", "NCI", "https://nci.org.au/infrastructure/hpc-systems"),
]
HOPPER = [
 ("xAI Colossus 1 — 200,000 (150k H100 + 50k H200)", "Data Center Dynamics; SemiAnalysis", "https://www.datacenterdynamics.com/en/news/anthropic-to-use-all-of-spacex-xais-colossus-1-data-center-compute/"),
 ("Tesla Cortex — ~66,000 (H100-equivalent)", "Tesla shareholder deck / 8-K", "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001318605&type=8-K"),
 ("Meta GenAI clusters — 49,152 (2x 24,576 H100)", "Meta Engineering blog", "https://engineering.fb.com/2024/03/12/data-center-engineering/building-metas-genai-infrastructure/"),
 ("CoreWeave (one cluster) — 42,000 H200", "Epoch AI; The Next Platform", "https://epoch.ai/data/gpu_clusters.csv"),
 ("Voltage Park — 24,000 H100", "Data Center Dynamics", "https://www.datacenterdynamics.com/en/news/ai-cloud-computing-non-profit-buys-24000-nvidia-h100-chips/"),
 ("JUPITER Booster (Julich) — 23,536 GH200", "EuroHPC JU; Top500 (June 2026)", "https://www.eurohpc-ju.europa.eu/jupiter-officially-propels-europe-exascale-era-2025-11-17_en"),
 ("Microsoft Eagle — 14,400 H100", "Top500", "https://top500.org/lists/top500/2026/06/"),
 ("Alps (CSCS) — 10,752 GH200", "CSCS; Top500", "https://www.cscs.ch/"),
 ("AIST ABCI 3.0 — 6,128 H200", "NVIDIA / AIST", "https://blogs.nvidia.com/blog/abci-aist/"),
 ("Isambard-AI (Bristol) — 5,448 GH200", "UKRI / University of Bristol (BriCS)", "https://docs.isambard.ac.uk/specs/"),
 ("NVIDIA Eos — 4,608 H100", "NVIDIA", "https://blogs.nvidia.com/blog/eos/"),
 ("MareNostrum 5 ACC (BSC) — 4,480 H100", "Barcelona Supercomputing Center", "https://www.bsc.es/marenostrum/marenostrum-5"),
 ("KAUST Shaheen III — 2,800 GH200", "KAUST; Top500", "https://www.hpc.kaust.edu.sa/"),
 ("Venado (LANL) — 2,560 GH200", "Top500", "https://top500.org/system/180246/"),
 ("Israel-1 (NVIDIA) — 2,048 H100", "NVIDIA", "https://blogs.nvidia.com/blog/israel-1-performance/"),
 ("NSCC ASPIRE 2B (Singapore) — 1,536 H200", "NSCC", "https://www.nscc.sg/aspire-2b/"),
 ("Jean Zay (IDRIS) — 1,456 H100", "IDRIS", "http://www.idris.fr/eng/jean-zay/modifications-extension-jean-zay-h100-eng.html"),
 ("Leonardo LISA upgrade (CINECA) — 1,328 H100 (installing)", "EuroHPC JU", "https://www.eurohpc-ju.europa.eu/"),
]
BWELL = [
 ("Deutsche Telekom Industrial AI Cloud (Munich) — up to 10,000 B200", "Deutsche Telekom", "https://www.telekom.com/en/media/media-information/archive/ai-sovereignty-for-germany-and-europe-1098708"),
 ("SoftBank DGX SuperPOD — >4,000 B200", "SoftBank", "https://www.softbank.jp/en/corp/news/press/sbkk/2025/20250723_01/"),
 ("Naver Cloud — 4,000 B200 (deployed)", "Data Center Dynamics", "https://www.datacenterdynamics.com/en/news/naver-cloud-completes-cluster-of-4000-nvidia-b200-gpus-in-south-korea/"),
 ("E2E Networks (India) — 1,024 B200", "E2E Networks", "https://www.e2enetworks.com/blog/b200-live-blog"),
 ("SK Telecom Haein — >1,000 B200", "Data Center Dynamics", "https://www.datacenterdynamics.com/en/news/sk-telecom-launches-gpuaas-based-on-nvidia-b200-cluster-in-south-korea/"),
 ("IREN — 50,000 B300 (announced/ordered)", "IREN; SEC filings", "https://investors.iren.com/"),
 ("Cloud GA instances (Google A4, AWS P6, Azure, Lambda, RunPod, DataCrunch)", "Vendor product pages; counts not disclosed", None),
]
GBWELL = [
 ("Stargate Abilene (OpenAI/Oracle/Crusoe) — ~64k installing / 450,000 target", "Data Center Dynamics; OpenAI", "https://www.datacenterdynamics.com/en/news/openai-and-oracle-to-deploy-450000-gb200-gpus-at-stargate-abilene-data-center/"),
 ("HUMAIN (Saudi) — 18,000 GB300 phase 1 / up to 600,000", "NVIDIA newsroom; Middle East AI News", "https://nvidianews.nvidia.com/news/humain-and-nvidia-announce-strategic-partnership-to-build-ai-factories-of-the-future-in-saudi-arabia"),
 ("South Korea (national) — 260,000 Blackwell (announced)", "NVIDIA newsroom", "https://nvidianews.nvidia.com/news/south-korea-ai-infrastructure"),
 ("Nscale to Microsoft — 200,000 GB300 (announced)", "Nscale", "https://www.nscale.com/press-releases/nscale-microsoft-2025"),
 ("xAI Colossus 2 — ~110,000 GB200 (installing)", "SemiAnalysis", "https://newsletter.semianalysis.com/p/xais-colossus-2-first-gigawatt-datacenter"),
 ("Stargate Norway (Nscale/Aker) — 100,000 (announced)", "Nscale", "https://www.nscale.com/press-releases/stargate-norway-nscale-aker-openai"),
 ("Argonne Solstice + Equinox (DOE) — 100,000 + 10,000 Blackwell", "NVIDIA newsroom", "https://nvidianews.nvidia.com/news/nvidia-oracle-us-department-of-energy-ai-supercomputer-scientific-discovery"),
 ("Together / Hypertec — 36,000 GB200", "Together AI", "https://www.together.ai/blog/nvidia-gb200-together-gpu-cluster-36k"),
 ("ByteDance (Malaysia, offshore) — 36,000 GB200", "Tom's Hardware", "https://www.tomshardware.com/pc-components/gpus/chinas-bytedance-to-access-36-000-blackwell-gpu-cluster-through-malaysia-cloud-operator"),
 ("Stargate UAE / G42 — 35,000 GB300 (installing)", "OpenAI", "https://openai.com/index/introducing-stargate-uae/"),
 ("xAI Colossus 1 — 30,000 GB200", "SemiAnalysis", "https://newsletter.semianalysis.com/p/xais-colossus-2-first-gigawatt-datacenter"),
 ("AWS Project Ceiba — 20,736 GB200 (288 NVL72 racks)", "AWS; Data Center Dynamics", "https://www.datacenterdynamics.com/en/news/aws-upgrades-project-ceiba-to-feature-20736-nvidia-blackwell-gpus-boosting-power-6x-to-414-ai-exaflops/"),
 ("UK Nebius/Nscale — 14,000 Blackwell (announced)", "NVIDIA newsroom", "https://nvidianews.nvidia.com/news/europe-ai-infrastructure"),
 ("CoreWeave — 8,192 GB300 NVL72 (deployed; MLPerf Training v6.0)", "CoreWeave", "https://www.coreweave.com/news/coreweave-sets-new-ai-training-records-in-mlperf-r-training-v6-0-training-deepseek-v3-in-approximately-two-minutes"),
 ("Mistral 'Bruno' (France) — 13,800 GB300 (deployed; Fluidstack-operated)", "Data Center Dynamics", "https://www.datacenterdynamics.com/en/news/mistral-ai-raises-830m-in-debt-financing-for-data-center-in-paris-france/"),
 ("Sines / Start Campus (Microsoft/Nscale, PT) — 12,600 Blackwell Ultra", "Data Center Dynamics", "https://www.datacenterdynamics.com/"),
 ("Taiwan Foxconn 'Big Innovation' — 10,000 GB300 (announced)", "NVIDIA newsroom", "https://nvidianews.nvidia.com/news/foxconn-builds-ai-factory-in-partnership-with-taiwan-and-nvidia"),
 ("IT4LIA AI Factory (Bologna) — 8,000+ GB200 NVL4 (announced)", "EuroHPC JU", "https://www.eurohpc-ju.europa.eu/eurohpc-ju-signs-contract-boost-ai-capabilities-it4lia-ai-factory-2026-04-22_en"),
 ("Microsoft Azure NDv6 GB300 — 4,608 (for OpenAI)", "NVIDIA newsroom", "https://blogs.nvidia.com/blog/microsoft-azure-worlds-first-gb300-nvl72-supercomputing-cluster-openai/"),
 ("Microsoft Azure NDv6 GB200 — ~4,000", "Microsoft Azure blog", "https://azure.microsoft.com/en-us/blog/microsoft-and-nvidia-accelerate-ai-development-and-performance/"),
 ("HIVE / BUZZ HPC (Canada, Bell/Cohere) — 2,304 GB200", "HIVE Digital", "https://www.stocktitan.net/news/HIVE/"),
 ("Indosat (Indonesia) — 2,304 GB200", "Tom's Hardware", "https://www.tomshardware.com/"),
 ("SoftBank — 1,224 GB200", "SoftBank", "https://www.softbank.jp/en/corp/news/press/sbkk/2025/20251225_01/"),
]
DEMAND = [
 ("OpenAI — NVIDIA 10 GW / up to $100B", "NVIDIA newsroom", "https://nvidianews.nvidia.com/news/openai-and-nvidia-announce-strategic-partnership-to-deploy-10gw-of-nvidia-systems"),
 ("OpenAI — Oracle $300B (~4.5 GW, Stargate)", "OpenAI; CNBC", "https://openai.com/index/stargate-advances-with-partnership-with-oracle/"),
 ("OpenAI — Microsoft Azure $250B; AWS $38B; CoreWeave $22.4B", "CNBC ($1T AI deals guide)", "https://www.cnbc.com/2025/10/15/a-guide-to-1-trillion-worth-of-ai-deals-between-openai-nvidia.html"),
 ("OpenAI — AMD 6 GW / MI450 (non-NVIDIA)", "OpenAI; TechCrunch", "https://openai.com/index/openai-amd-strategic-partnership/"),
 ("OpenAI — Broadcom 10 GW / custom 'Jalapeño' ASIC (non-NVIDIA)", "OpenAI / Broadcom; CNBC (24 Jun 2026)", "https://www.cnbc.com/2026/06/24/openai-and-broadcom-reveal-jalapeno-first-ai-chip-in-partnership.html"),
 ("Anthropic — Google up to 1M TPU / 3.5-5 GW (non-NVIDIA)", "Anthropic", "https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services"),
 ("Anthropic — AWS Project Rainier ~500k-1M Trainium2 (non-NVIDIA)", "Anthropic", "https://www.anthropic.com/news/anthropic-invests-50-billion-in-american-ai-infrastructure"),
 ("Anthropic — Microsoft Azure + NVIDIA $30B / up to 1 GW", "Microsoft / NVIDIA / Anthropic announcements", None),
 ("Anthropic — xAI Colossus 1 lease ~220,000 GPUs ($1.25B/mo)", "Data Center Dynamics", "https://www.datacenterdynamics.com/en/news/anthropic-to-use-all-of-spacex-xais-colossus-1-data-center-compute/"),
 ("Microsoft (offtaker) — Nscale 200k GB300; IREN 200 MW/$9.7B; Lambda; Nebius; Crusoe 900 MW", "Operator press releases", None),
 ("Meta (offtaker) — CoreWeave $35.2B; Nebius up to $27B", "The Globe and Mail; press", "https://www.theglobeandmail.com/investing/markets/stocks/MSFT/pressreleases/1244844/coreweave-inks-21b-ai-infrastructure-deal-with-meta-platforms/"),
 ("Startups (Cohere/Runway->CoreWeave; Thinking Machines/World Labs->Google Cloud; Reka/Suno->Oracle; Sarvam->Yotta 4,096 H100; Upstage->SKT ~500 B200; Inflection->CoreWeave 22k legacy)", "Respective cloud case studies / press", None),
]

charts = [
 ("Cited chip / NVIDIA / startup usage and Research topic signals", sections[0][2]),
 ("A100 GPU count (Ampere)", A100),
 ("Hopper GPU count (H100 / H200 / GH200)", HOPPER),
 ("Blackwell GPU count (B200 / B300)", BWELL),
 ("Grace-Blackwell GPU count (GB200 / GB300)", GBWELL),
 ("Frontier-lab contracted compute (GW) — demand side", DEMAND),
]

body_items = []
for title, items in charts:
    body_items.append(f'<h2 class="src-h2">{esc(title)}</h2>')
    body_items.append('<ul class="src-list">')
    for it in items:
        body_items.append(li(*it))
    body_items.append('</ul>')

intro = '''<p>This page documents the source for each data point in the State of AI Report Compute Index charts. Data cutoff: <b>1 July 2026</b>. GPU-count charts show NVIDIA data-center GPUs (GH200/GB200/GB300 counted as GPU dies; one NVL72 rack = 72 GPUs), split into <b>Deployed / Installing / Announced</b>. Figures are charted by owner/operator; renters are listed separately under the demand-side chart and are not double-counted. National-HPC counts are exact (published); large company, neocloud and sovereign figures are best-available estimates or announced commitments. Where a primary source did not disclose a GPU count, none is invented.</p>'''

page = f'''<!DOCTYPE html>
<html lang="en">
{head}
<body>
<main>
  <div class="announcement"><p><b>👋 Take the</b> <u><a href="https://airstreet.typeform.com/survey">State of AI Report Survey!</a></u></p></div>
  <section class="hero is-info is-as">
    <div class="hero-body">
      <div class="container main has-text-centered">
        <h1 class="title as-title" style="font-family: Francois One;">COMPUTE INDEX SOURCES<span style="color: #ff9900;">.</span></h1>
        <a href="/compute/" class="button">🏠 Compute Index</a>
        <a href="https://www.stateof.ai/" class="button">State of AI</a>
        <div class="subtext" style="margin-top:24px">
          {intro}
          {''.join(body_items)}
          <p style="margin-top:20px;font-size:12px;color:#666">Compiled July 2026. Citation-chart data: Zeta Alpha (last refreshed with the October 2025 report; no monthly update). Compute-cluster data: operator disclosures, EuroHPC, Top500 (June 2026), SemiAnalysis, The Next Platform, Data Center Dynamics, company earnings and SEC filings, and NVIDIA newsroom. Estimates and announced commitments are labelled as such in the underlying dataset.</p>
        </div>
      </div>
    </div>
  </section>
</main>
<style>
.src-h2{{font-weight:800;color:#161E59;margin:26px 0 6px;font-size:1.25rem}}
.src-list{{text-align:left;font-size:0.95rem;line-height:1.5;margin:0 0 10px}}
.src-list li{{list-style-type:disc;list-style-position:outside;margin-left:1.2em;padding-left:0.3em;margin-bottom:4px}}
.src-list a{{color:#154ee3}}
.hero.is-as{{min-height:auto}}
</style>
</body>
</html>'''

import os
os.makedirs("compute", exist_ok=True)
open("compute/sources.html","w").write(page)
print("wrote compute/sources.html", len(page), "bytes;", sum(len(i) for _,i in charts), "items")
