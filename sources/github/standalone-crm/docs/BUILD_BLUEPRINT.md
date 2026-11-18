# Build Blueprint (Version 2.0)

## Goal
A self-contained CRM where one agency runs up to **75 client sub-accounts**, each with its own
section and its own logins, delivered as an installable mobile web app.

## Architecture
- **Web app:** Next.js 16 App Router + TypeScript, server components + server actions, `@supabase/ssr`
  cookies, `proxy.ts` session refresh, zod validation. Deployed on Vercel.
- **Database & sign-in:** Supabase Postgres + Auth (password, email link, TOTP two-step, outside
  sign-in, phone); RLS on every table; Vault for connection keys; 5 Edge Functions hold the only
  privileged key.
- **PWA:** `app/manifest.ts`, generated PNG icons, shell-only service worker.
- **Design:** four looks (Sculpted Paper, Professional Greyscale, Stealth, Auto) — `docs/DESIGN_SYSTEM.md`.

## Tenancy and roles
`agencies` (plan) → `workspaces` (cap 75) → CRM records, mailboxes, conversations, marketing, websites, courses, appointments, invoices. Access is computed in Postgres by
`private.workspace_role(ws)` and gated by `private.mfa_ok()`. Agency roles: owner (one), backup,
admin, assistant. Sub-account roles: admin, member, viewer.

## Stages
- Stage 0–2 (v2): ✔ provision, ✔ secure foundation, ✔ CRM workflows, ✔ PWA
- Stage 3 (v2.1): ✔ one-command setup, ✔ per-client script, ✔ backups, ✔ health check, ✔ sign-ups off
- Stage 4 (v3): ✔ looks, ✔ team roles, ✔ branding, ✔ starter setups, ✔ owner numbers, ✔ due list, ✔ CSV import, ✔ outside sign-in
- Stage 5 (v3.1): ✔ owner email link, ✔ walk-through, ✔ hand-off, ✔ T.H.E.L.M.A. AI Fail Safe, ✔ required two-step, ✔ connections vault, ✔ Vercel sign-in, ✔ paid switches, ✔ team look
- Stage 6 (Version 2.0): ✔ plans + suggested pricing, ✔ 3 business addresses per sub-account, ✔ inbox + team chat, ✔ app connectors (request/connect), ✔ marketing + compliance check, ✔ bail bonds / insurance / financial kits, ✔ websites (1 per sub-account), ✔ calendar (Zoom/FaceTime links), ✔ courses + community + Learn lessons, ✔ invoices + Stripe checkout, ✔ T.H.E.L.M.A. approval gate, ✔ owner usage + progress
- Next (v4.1): ☐ delivery workers (email/SMS/social), ☐ OAuth per app, ☐ T.H.E.L.M.A. executor, ☐ website publisher, ☐ forms, reviews, workflows, API
- Open: ☐ SMTP sender · ☐ provider keys uploaded · ☐ CI files moved · ☐ backups + restore drill

## Acceptance checks
See `docs/VERIFICATION_REPORT.md`.
