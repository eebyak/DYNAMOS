# LinkedIn static share workaround

This is deliberately separate from the normal Astro homepage.

Add these two files:

- `public/share/index.html`
- `public/social/dynamos-linkedin-v3.jpg`

Then share this URL on LinkedIn:

`https://eebyak.github.io/DYNAMOS/share/`

Why this is different:
- the share page is literal static HTML copied directly by Astro/GitHub Pages;
- its Open Graph tags are hard-coded in the first HTML response;
- it uses a brand-new URL, so LinkedIn has no old cache entry for it;
- it uses a brand-new JPEG filename;
- `og:url` points to the share URL itself rather than the previously cached homepage URL;
- normal human visitors are redirected by JavaScript to the real DYNAMOS homepage.

After deployment:
1. Open `https://eebyak.github.io/DYNAMOS/social/dynamos-linkedin-v3.jpg`
2. Open `https://eebyak.github.io/DYNAMOS/share/`
3. Inspect the `/share/` URL in LinkedIn Post Inspector.
4. Use the `/share/` URL in the LinkedIn post.

Suggested commit:
`Add static LinkedIn share endpoint`
