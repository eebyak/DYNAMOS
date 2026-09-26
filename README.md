# DYNAMOS questionnaire wording + result readability update

This patch implements the agreed small changes without redesigning the 1–10 scale.

## 1. Removes comparison-to-other-people framing

The public site no longer asks participants to judge themselves against other people.

The questionnaire now says:
- rate your typical functioning over time;
- use the same 1–10 scale;
- use the existing low/high descriptions for each dimension;
- scores are not currently population norms or percentiles.

The numerical scale and derivation thresholds are unchanged.

## 2. Makes the integrated result easier to read

The large uninterrupted synthesis paragraph is replaced by:
- a short explanatory lead;
- one visually separated observation per represented PRECEPTA domain;
- smaller body typography and clearer spacing.

The underlying PRECEPTA inference and wording are unchanged.

The printable report uses the same clearer domain-by-domain synthesis.

## 3. Questionnaire version becomes 1.2.0-pilot

This is intentional. Although the 1–10 scale itself is unchanged, the response instruction changed materially. New donations should therefore not be silently pooled with records collected under the old comparison-based instruction.

- Model remains `2.0.0`
- Derivation remains `0.3.0-pilot`
- Questionnaire becomes `1.2.0-pilot`

The homepage and Research dashboard now request statistics for the new 1.2 cohort. Existing 1.1 data remain in the database as a separate historical cohort.

## Replace these four files

- `src/pages/explore/index.astro`
- `src/pages/faq/index.astro`
- `src/pages/research/index.astro`
- `src/pages/index.astro`

No Cloudflare Worker or D1 change is required.

Suggested commit:

`Simplify questionnaire framing and improve result readability`
