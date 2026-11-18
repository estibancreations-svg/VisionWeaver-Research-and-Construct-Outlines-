# VisionWeaver Prime

A fresh, dedicated VisionWeaver front end with its own Supabase project. Not a fork or copy of the earlier VisionWeaver repo.

Static single-page app (vanilla JS, hash routing). 27 pages (CORE 10, PRODUCTION 10, GOVERNANCE 7), each with V1/V2/V3 views.

Live: https://visionweaver-prime-estibancreations101.vercel.app

Latest handoff and change record: [docs/HANDOFF-2026-10-11.md](docs/HANDOFF-2026-10-11.md)

## Layout
- `index.html`, `config.js`, `registry.js`, `content.js` - page shell, public config, page registry, per-page view content
- `src/app.01.js` to `src/app.17.js` - app logic in 17 parts, joined in order into `dist/app.js` at build
- `assets-b64/*.b64` - page images stored as base64 text, decoded at build
- `manifest.json` - sha256 integrity manifest (4 text files, 13 images, 17 app parts) checked by `scripts/build.mjs`
- `vercel.json` - build command, output dir, security headers (CSP, HSTS, nosniff, frame deny)
- `supabase/migrations/` - database migrations (see the handoff for what is and is not saved here)
- `docs/` - handoff and change records

## What it does now
- **Sign-in:** email and password, magic link, password reset, and Google, Apple and Microsoft. The three company buttons work once each provider is switched on in Supabase (Authentication, then Sign In / Providers).
- **Live and Sample data:** a pill at the top switches between practice figures and your real records. Live mode shows only what is in your private database.
- **Workspace:** each signed-in person gets a workspace with roles (architect, director, editor, viewer). Projects, initiatives, records and an append-only activity log are stored in Supabase.
- **Guided new-project walkthrough** and a **system tour** for training.
- Pages without real data yet are collected in a collapsed "will fill in" box instead of showing empty or invented content.

## Build
`node scripts/build.mjs` verifies every text file, image and app part against `manifest.json`, decodes images, and writes `dist/`.

If you change an app part, update its hash in `manifest.json` (sha256 over the part's content with trailing whitespace trimmed). When pushing several parts through an API, push the parts first and `manifest.json` last. A build in between can fail; the last good deployment stays live.

## Supabase
Dedicated project `azoqszhhmmkyqztubgem`. RLS is enabled on every table; `anon` has no read access. Only the publishable key is in `config.js` (safe for browsers). No service-role key belongs in this repo.

## Status honesty
Integrations and release gates are shown as NOT VERIFIED / PARTIAL / VERIFIED. Provider integrations (Runway, Higgsfield, YouTube and others) are not connected. Nothing here claims a live connection that has not been probed.
