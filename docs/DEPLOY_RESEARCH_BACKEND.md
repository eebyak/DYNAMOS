# DYNAMOS data collection without owning a server

Keep the current website on GitHub Pages. Add only a managed serverless API/database:

GitHub Pages -> Cloudflare Worker -> private Cloudflare D1 database

No raw participant rows are stored in GitHub.

## Why GitHub Pages alone cannot collect the private data

GitHub Pages serves static HTML/CSS/JavaScript. It does not provide a private server-side database or a secure public write endpoint. A GitHub write token must never be embedded in browser code.

## What you need

- existing GitHub repository;
- free Cloudflare account;
- one Worker;
- one D1 database.

## Setup

1. Create a D1 database named `dynamos-research`.
2. Copy its database ID into `research-backend/wrangler.jsonc`.
3. From `research-backend/` run:

```bash
npm install
npx wrangler login
npx wrangler d1 execute dynamos-research --remote --file=./schema.sql
npx wrangler deploy
```

4. Cloudflare returns a URL like `https://dynamos-research.<name>.workers.dev`.
5. Put that URL into `model/research/backend.json` as `api_base`.
6. Commit and redeploy GitHub Pages.

The Donate button activates automatically after the URL is configured.

## Before public launch

Add Cloudflare Turnstile (or equivalent anti-bot protection) so automated submissions do not contaminate the research data. Also verify the actual hosting/logging settings before making any strong anonymity claim.

The research dataset itself is designed not to store names, email, employer, diagnosis, exact location, free text, IP address, or analytics identifiers.
