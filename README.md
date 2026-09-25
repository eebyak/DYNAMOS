# DYNAMOS full PRECEPTA pilot — v0.3

This patch expands the working research loop from the Cognitive & Learning pilot to all **32 PRECEPTA patterns in all five domains**.

## GitHub files

Add:

- `model/precepta-derivation.json`
- `model/research/precepta-followups.json`

Replace:

- `src/pages/explore/index.astro`

Do **not** overwrite your working `model/research/backend.json`; keep the Cloudflare URL you already configured.

The old files `model/precepta-derivation-cognitive.json` and `model/research/cognitive-missing-followups.json` become unused. They may be left in the repository temporarily or deleted later.

## Cloudflare Worker

Replace the current Worker code with:

- `cloudflare/worker-dashboard-v3.js`

No D1 database schema change is required.

The Worker update is necessary because the donation record now declares all five PRECEPTA domains rather than only `cognitive_learning`.

## Recommended order

1. Update/deploy the Cloudflare Worker v3.
2. Confirm `/v1/health` still works.
3. Add/replace the three GitHub files above.
4. Let GitHub Pages build.
5. Run your profile again.
6. Inspect the new all-domain PRECEPTA result.
7. Donate one v0.3 test record.
8. Check the stats endpoint using `derivation_version=0.3.0-pilot`.

Suggested GitHub commit:

`Expand Explore to all 32 PRECEPTA patterns`
