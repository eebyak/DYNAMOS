# DYNAMOS research backend

A tiny serverless Cloudflare Worker + D1 database. No server administration is required.

Endpoints:
- POST /v1/contributions
- POST /v1/withdraw
- GET /v1/stats
- GET /v1/health

Before public launch, add bot protection such as Cloudflare Turnstile and verify the final logging/privacy configuration.
