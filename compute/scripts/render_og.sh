#!/usr/bin/env bash
# Regenerate the social share/card pages and the /og/*.png card images.
# Run from the repo root:  bash compute/scripts/render_og.sh
set -euo pipefail
cd "$(cd "$(dirname "$0")/../.." && pwd)"   # repo root

python3 compute/scripts/build_og.py          # writes compute/cardgen/* (render) + compute/share/* (social)

PORT=8831
python3 -m http.server "$PORT" >/dev/null 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null || true; rm -rf compute/cardgen' EXIT

# wait for the server
for i in $(seq 1 60); do curl -s "http://localhost:$PORT/compute/cardgen/_slugs.txt" >/dev/null 2>&1 && break; done

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for slug in $(cat compute/cardgen/_slugs.txt); do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
    --window-size=1200,630 --default-background-color=FFFFFFFF --virtual-time-budget=6000 \
    --screenshot="og/$slug.png" "http://localhost:$PORT/compute/cardgen/$slug.html" >/dev/null 2>&1
  echo "rendered og/$slug.png"
done
echo "OG card images regenerated. (compute/cardgen/ is temporary and auto-removed.)"
