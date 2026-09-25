# DYNAMOS Explore build fix

Replace only:

`src/pages/explore/index.astro`

This fixes the Astro build failure at the first CSS rule by restoring the missing `</style>` block and the dedicated print-report CSS. It also closes the pilot-note section cleanly before the print-only report.

Do not change `model/research/backend.json` in the same commit yet; first confirm this build is green.
