# DYNAMOS collection backend + readable report patch

This package adds two things.

## 1. Dedicated printable DYNAMOS Result Report

The Print button now prints only a readable result report, not the website. The report contains:

- model/questionnaire/derivation versions;
- integrated PRECEPTA interpretation;
- PRECEPTA results and participant feedback;
- all 26 scores grouped by category;
- missing-pattern selections;
- targeted follow-up answers;
- a readable explanation of what the research contribution contains;
- contribution status and submission ID if already donated.

## 2. Serverless private collection backend

`research-backend/` contains a Cloudflare Worker + D1 implementation for:

- POST `/v1/contributions`
- POST `/v1/withdraw`
- GET `/v1/stats`
- GET `/v1/health`

No server machine is required.

Start with `docs/DEPLOY_RESEARCH_BACKEND.md`.

`model/research/backend.json` is intentionally blank until the Worker is deployed, so the website cannot accidentally transmit data.
