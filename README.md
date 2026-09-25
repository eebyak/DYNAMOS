# DYNAMOS live research dashboard

This patch adds a public-facing live research status while keeping raw contributions private.

## What changes

- New `/research/` page with live aggregate statistics from the Cloudflare `/v1/stats` endpoint.
- Homepage section: **“Help us find where the model works — and where it doesn’t.”**
- Live homepage counters for contributed profiles and PRECEPTA judgments.
- “Donate your data to research” call-to-action.
- Pattern-level evidence appears only when the Worker marks a cell as published (currently n >= 20).
- Overall recognition percentage is hidden until at least 10 contributed profiles exist.
- Navigation gains `Explore` and `Research`.

## Add / replace

- `src/pages/research/index.astro` — NEW
- `src/pages/index.astro` — REPLACE
- `src/pages/explore/index.astro` — REPLACE
- `src/pages/model/index.astro` — REPLACE
- `src/pages/model/[id].astro` — REPLACE
- `src/pages/precepta/index.astro` — REPLACE
- `src/pages/precepta/[id].astro` — REPLACE
- `src/pages/responsible-use.astro` — REPLACE

No Cloudflare Worker or D1 change is required for this dashboard.

Keep your existing `model/research/backend.json` with the already-working Cloudflare Worker URL.

Suggested commit:

`Add live DYNAMOS research status`
