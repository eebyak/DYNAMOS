# DYNAMOS Research Contribution Protocol v0.1

## Purpose

The first empirical loop is not intended to validate the 26 self-ratings against themselves. It tests whether a higher-order PRECEPTA interpretation derived from those self-ratings is recognized by the participant.

The record therefore preserves three layers separately:

1. **Input** — the 26 comparative self-estimates.
2. **Model output** — the PRECEPTA patterns actually shown under a named derivation version.
3. **Participant response** — recognition, rejection, uncertainty, and structured reports of important missing patterns.

## Missing-pattern flow

To reduce suggestion bias:

1. First ask: **“Is an important part of how you think or work missing from this interpretation?”**
2. Response: `yes / no / unsure`.
3. Only if `yes`, reveal the PRECEPTA patterns that were *not* presented by the model.
4. Allow at most three missing-pattern selections in this pilot.
5. If a selected pattern has a predefined targeted follow-up, show it only after selection.
6. Do not use the follow-up answer to change the result the participant already saw. Store it as a separate model-development observation.

This lets later analysis distinguish:

- **false positive candidate** — model presented a pattern; participant rejects it;
- **false negative candidate** — model omitted a pattern; participant selects it as missing;
- **measurement-gap evidence** — omitted pattern is selected and its targeted follow-up is endorsed, while the defining phenomenon was not represented by the 26 inputs;
- **rule-gap evidence** — omitted pattern is selected even though the current 26 inputs already contain the information that the derivation rule was supposed to use.

These are research-analysis labels, not statements about an individual participant.

## No free text in v1

The donation contract contains no participant free-text field. This is deliberate:

- reduces accidental disclosure of identity, employer, diagnosis, location, or personal history;
- simplifies data governance;
- makes aggregate analysis reproducible;
- avoids turning the public research form into an uncontrolled sensitive-data collection channel.

Free-text research can be added later as a separate, separately consented study if needed.

## Withdrawal without identity

When donating:

1. browser generates a cryptographically random withdrawal token;
2. browser computes a one-way SHA-256 hash;
3. contribution sends only the hash;
4. participant receives/downloads the plaintext token;
5. `/withdraw` later accepts that token, hashes it, finds the row, and deletes it.

No name or account is required.

## Public evidence dashboard

GitHub Pages may call `GET /v1/stats`.

The public endpoint must return aggregates only. Raw vectors never go to GitHub.

Initial public displays should include:

- total contributed profiles;
- total PRECEPTA recognition judgments;
- overall recognition counts;
- pattern-level recognition only when the minimum cell threshold is met;
- missing-pattern counts only when the threshold is met;
- the exact model/questionnaire/derivation version represented.

Do not label these figures “validity.” Suggested language: **descriptive-fit evidence**, **participant recognition**, or **model-development evidence**.

## Version separation

Never pool incompatible derivation cohorts silently.

Every row includes:

- `model_version`
- `questionnaire_version`
- `derivation_version`
- `consent_version`

If a derivation rule changes, publish the new cohort separately. Historical cohorts remain interpretable as evidence about the model that produced them.

## Privacy boundary

The research schema intentionally excludes:

- names
- email addresses
- usernames/accounts
- phone numbers
- employer/institution
- diagnosis or medical history
- precise location
- dates of birth
- free text
- browser/device fingerprints
- advertising identifiers
- analytics identifiers

The final privacy claim depends on the actual backend and logging configuration. Do not describe collection as fully anonymous until infrastructure behavior has been verified.
