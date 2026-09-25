# DYNAMOS research donation contract — v0.1

This package defines the provider-agnostic research donation boundary and adds a **local-only donation preview** to the Cognitive PRECEPTA pilot.

## Add / replace

- `src/pages/explore/index.astro`
- `model/precepta-derivation-cognitive.json`
- `model/research/research-contribution.schema.json`
- `model/research/public-stats.schema.json`
- `model/research/research-api-contract.json`
- `model/research/cognitive-missing-followups.json`
- `docs/RESEARCH_CONTRIBUTION_PROTOCOL.md`
- `docs/RESEARCH_CONSENT_V0.1.md`

## Important

The website patch **does not send data yet**. The Donate button remains disabled until a private backend is connected.

It does let you test:

- staged missing-pattern feedback;
- targeted follow-ups for selected missing patterns;
- consent wording;
- exact donated-record preview;
- random submission id;
- locally generated withdrawal token hash.

The next implementation step is to choose/configure the private backend against this contract.
