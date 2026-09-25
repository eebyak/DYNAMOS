# DYNAMOS LinkedIn / social preview update

This update changes **only link-preview metadata**. It does not alter the visible website design.

## Add

- `public/social/dynamos-link-preview.png`

## Replace

- `src/pages/index.astro`

## What the homepage now exposes to LinkedIn and other social platforms

- Open Graph title
- Open Graph description
- canonical URL
- 1200 × 627 social preview image
- image dimensions and alt text
- `summary_large_image` metadata for platforms that also read Twitter/X-style card tags

## Suggested commit

`Add DYNAMOS social link preview`

## After GitHub Pages deploys

Paste the homepage URL into LinkedIn's Post Inspector to force a fresh scrape:

`https://www.linkedin.com/post-inspector/`

Inspect:

`https://eebyak.github.io/DYNAMOS/`

If LinkedIn had already cached the old preview, the inspector is the cleanest way to refresh it.
