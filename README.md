# DYNAMOS social preview + subtle homepage background fix

This patch combines the current FAQ-enabled site with the social-preview metadata and the new transparent systems graphic.

## Why LinkedIn probably stopped working

The later FAQ update replaced `src/pages/index.astro` with a version that did not yet contain the Open Graph metadata from the earlier LinkedIn patch. This package combines both changes, so the FAQ/navigation is preserved and the social tags are restored.

## Add

- `public/social/dynamos-system-background.png`
- `public/social/dynamos-link-preview-v2.png`

## Replace

- `src/pages/index.astro`

Nothing else needs to change. No Cloudflare or D1 changes are required.

## Visible website change

Only the homepage hero gets the new systems graphic, at very low opacity. The rest of the site stays unchanged.

## LinkedIn fix

The homepage now contains:
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- `og:image:secure_url`
- image MIME type and 1200×627 dimensions
- Twitter/X large-card fallbacks

The social image uses a new filename (`dynamos-link-preview-v2.png`) so LinkedIn does not keep requesting the old image asset.

After GitHub Pages deploys successfully, run the clean homepage URL through LinkedIn Post Inspector:

https://eebyak.github.io/DYNAMOS/

Suggested commit:

`Add systems background and restore social preview`
