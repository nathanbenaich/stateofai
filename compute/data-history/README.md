# Compute Index — data history

A version-controlled history of the chart data behind [stateof.ai/compute](https://www.stateof.ai/compute), so we can see how each graph changed over time and recover any prior version.

## What's here

- **`<YYYY-MM>.json`** — a pretty-printed snapshot of the entire `DATA` object (all nine charts: `cited_chip`, `cited_nvidia`, `cited_startup`, `hopper`, `a100`, `blackwell`, `grace_blackwell`, `demand`, `research_topic`) exactly as it shipped for that month's cutoff. One file per monthly refresh.
- **`CHANGELOG.md`** — the human-readable, newest-first log: which figures/tiers moved each iteration, old → new, with the source.

The live source of truth remains the `DATA = {…}` object at the top of [`assets/compute-charts.js`](../../assets/compute-charts.js). These files are a byproduct snapshot, not the runtime data.

## How to use it

Compare any two iterations of a single chart:

```bash
# Everything that changed between June and July 2026
diff compute/data-history/2026-06.json compute/data-history/2026-07.json

# Just the Grace-Blackwell chart, June vs July
diff <(jq .grace_blackwell compute/data-history/2026-06.json) \
     <(jq .grace_blackwell compute/data-history/2026-07.json)
```

Recover a prior version of a chart: read the field out of the dated file and paste it back into `assets/compute-charts.js`.

## How it's produced

Each monthly refresh runs, as its last data step (see the RUNBOOK):

```bash
python3 compute/scripts/snapshot_data.py   # month inferred from the compute.html cutoff
```

That extracts the current `DATA` object into `compute/data-history/<YYYY-MM>.json`. Then add a dated entry to `CHANGELOG.md`. The snapshots use a stable, pretty-printed layout so `git diff` and `diff` line up cleanly across months.
