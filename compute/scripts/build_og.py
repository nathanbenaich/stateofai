#!/usr/bin/env python3
import re, os, html
ROOT="."
CH=open(f"{ROOT}/compute.html").read()

# map slug -> (title, date) by parsing each .graph block
charts=[]
for part in CH.split('<div class="graph">')[1:]:
    mt=re.search(r'<span class="graph-title"><b>(.*?)</b>', part, re.DOTALL)
    md=re.search(r'<span class="graph-date">\s*(.*?)</span>', part, re.DOTALL)
    mc=re.search(r'id="chart-([a-z0-9-]+)"', part)
    if mt and mc:
        title=re.sub(r'\s+',' ',mt.group(1)).strip()
        date=re.sub(r'\s+',' ',md.group(1)).strip() if md else ''
        charts.append((mc.group(1), title, date))
print("charts:", [c[0] for c in charts])

os.makedirs(f"{ROOT}/compute/cardgen", exist_ok=True)
os.makedirs(f"{ROOT}/compute/share", exist_ok=True)
os.makedirs(f"{ROOT}/og", exist_ok=True)

CARD_CSS = """
html,body{margin:0;padding:0;background:#fff}
.card{width:1200px;height:630px;background:#fff;box-sizing:border-box;padding:30px 44px 0;font-family:'PT Sans',sans-serif;color:#161E59;position:relative}
.t{font-weight:700;font-size:31px;line-height:1.15}
.d{color:#6b7280;font-size:17px;margin-top:3px}
.cw{position:absolute;left:44px;right:44px;top:104px;bottom:82px}
.ft{position:absolute;left:44px;right:44px;bottom:26px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e3e6ee;padding-top:15px}
.wm{font-family:'Francois One','PT Sans',sans-serif;font-size:20px;color:#161E59;letter-spacing:.4px}
.wm i{display:inline-block;width:10px;height:10px;background:#ff9900;margin-left:6px}
.su{color:#6b7280;font-size:16px}
"""

for slug,title,date in charts:
    card=f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Francois+One" rel="stylesheet">
<style>{CARD_CSS}</style></head><body>
<div class="card">
  <div class="t">{html.escape(title)}</div>
  <div class="d">{html.escape(date)}</div>
  <div class="cw"><canvas id="chart-{slug}"></canvas></div>
  <div class="ft"><span class="wm">STATE OF AI REPORT COMPUTE INDEX<i></i></span><span class="su">stateof.ai</span></div>
</div>
<script src="/assets/chart.umd.min.js"></script>
<script src="/assets/compute-charts.js"></script>
</body></html>"""
    open(f"{ROOT}/compute/cardgen/{slug}.html","w").write(card)

    t2=html.escape(title+" — State of AI Report Compute Index")
    desc=html.escape((date+". " if date else "")+"Discover more AI compute trends on the State of AI Report Compute Index.")
    img=f"https://www.stateof.ai/og/{slug}.png"
    share=f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{t2}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="https://www.stateof.ai/compute">
<meta property="og:type" content="article">
<meta property="og:site_name" content="State of AI Report">
<meta property="og:title" content="{t2}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="https://www.stateof.ai/compute/share/{slug}">
<meta property="og:image" content="{img}">
<meta property="og:image:width" content="2400">
<meta property="og:image:height" content="1260">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@stateofaireport">
<meta name="twitter:title" content="{t2}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{img}">
<script>location.replace('/compute#chart-{slug}');</script>
</head><body style="font-family:sans-serif;padding:24px">
<p>Redirecting to the <a href="/compute#chart-{slug}">State of AI Report Compute Index</a>…</p>
</body></html>"""
    open(f"{ROOT}/compute/share/{slug}.html","w").write(share)

print("wrote", len(charts), "cardgen + share pages")
open(f"{ROOT}/compute/cardgen/_slugs.txt","w").write("\n".join(c[0] for c in charts))
