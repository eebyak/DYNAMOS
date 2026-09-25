# DYNAMOS FAQ update

This patch adds a structured public FAQ explaining the model in plain language.

## Add
- `src/pages/faq/index.astro`

## Replace
The package also includes current site pages with `FAQ` added to navigation:
- `src/pages/index.astro`
- `src/pages/model/index.astro`
- `src/pages/model/[id].astro`
- `src/pages/precepta/index.astro`
- `src/pages/precepta/[id].astro`
- `src/pages/explore/index.astro`
- `src/pages/research/index.astro`
- `src/pages/responsible-use.astro`

No Cloudflare Worker or D1 changes are required.

Suggested commit:
`Add DYNAMOS FAQ and diagnostic context`
