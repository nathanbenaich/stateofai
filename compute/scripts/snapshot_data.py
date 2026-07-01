#!/usr/bin/env python3
"""Snapshot the Compute Index DATA object into a dated, version-controlled file.

Every monthly refresh should leave a browsable copy of the exact chart data so we
have a history of how each graph changed over time (independent of digging through
git). Run this as the LAST data step, after editing assets/compute-charts.js.

Usage (from repo root):
  python3 compute/scripts/snapshot_data.py            # month inferred from compute.html cutoff
  python3 compute/scripts/snapshot_data.py 2026-07    # explicit YYYY-MM

Writes compute/data-history/<YYYY-MM>.json — a pretty-printed copy of the DATA
object (stable key/label order), so `git diff` between two snapshots (or a plain
file compare) shows exactly which series/tiers moved that month.
"""
import json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MONTHS = {m: f"{i:02d}" for i, m in enumerate(
    ["January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"], 1)}


def extract_data(js_text):
    """Pull the `var DATA={...};` object (it lives on a single line) out of the JS."""
    for line in js_text.splitlines():
        s = line.strip()
        if s.startswith("var DATA="):
            body = s[len("var DATA="):].rstrip()
            if body.endswith(";"):
                body = body[:-1]
            return json.loads(body)
    raise SystemExit("var DATA= not found in assets/compute-charts.js")


def infer_month():
    html = open(os.path.join(ROOT, "compute.html"), encoding="utf-8").read()
    m = re.search(r"Data cutoff:\s*1\s+([A-Za-z]+)\s+(\d{4})", html)
    if not m:
        raise SystemExit("could not infer the cutoff month from compute.html — pass YYYY-MM explicitly")
    return f"{m.group(2)}-{MONTHS[m.group(1)]}"


def main():
    month = sys.argv[1] if len(sys.argv) > 1 else infer_month()
    if not re.fullmatch(r"\d{4}-\d{2}", month):
        raise SystemExit("month argument must be YYYY-MM, e.g. 2026-07")
    js = open(os.path.join(ROOT, "assets/compute-charts.js"), encoding="utf-8").read()
    data = extract_data(js)
    outdir = os.path.join(ROOT, "compute/data-history")
    os.makedirs(outdir, exist_ok=True)
    out = os.path.join(outdir, f"{month}.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"wrote compute/data-history/{month}.json ({len(data)} charts)")


if __name__ == "__main__":
    main()
