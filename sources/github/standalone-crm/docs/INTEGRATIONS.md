# Integrations — How Every System Connects (v3.1)

Analogy: **GitHub is the recipe book, Vercel is the kitchen, Supabase is the locked pantry (with a
safe inside it for keys), Figma is the drawing of the plate, and Google Drive is the binder of
instructions.** Sign-in apps like Google are the **ID check at the door** — they say who you are, but
they never go into the pantry.

```
 Figma (design)          Google Drive (docs)
      │                        │
      ▼                        ▼
 GitHub repo ── push ──► Vercel (lint → typecheck → tests → build → deploy)
      │                        │  env: NEXT_PUBLIC_SUPABASE_URL / _PUBLISHABLE_KEY / APP_URL
      │ migrations             ▼
      └──────────────► Supabase
                         ├─ Auth (password, email link, two-step, Google/Microsoft/GitHub/Vercel/Apple/phone)
                         ├─ Postgres + RLS (all client records)
                         ├─ Vault (encrypted connection keys)
                         └─ Edge Functions: manage-logins · account · setup-owner · handoff · connections
```

| System | Resource | What it does here | How it's connected |
|---|---|---|---|
| **GitHub** | `estibancreations-svg/standalone-crm` (private) | Code, migrations, tests, docs | Vercel watches `main`; every push deploys |
| **Vercel** | Team *Estibancreations* → `standalone-crm` | Hosts the app | 3 env vars; Vercel Authentication on previews only |
| **Supabase** | `standalone-crm-test` (ref `csxtrhwzswluismrayen`) | Sign-in, database, RLS, Vault, Edge Functions | App uses the **publishable** key only |
| **Sign-in providers** | Google, Microsoft, GitHub, Vercel (`custom:vercel`), Apple, Twilio | Prove identity only | Keys uploaded through **Connections**, applied by the `connections` function |
| **Email sender (SMTP)** | Resend / Postmark / SendGrid / mail host | Sign-in links, resets, email-change | Uploaded through **Connections** or `scripts/apply-auth.sh` |
| **Figma** | [Design System & Mobile Screens](https://www.figma.com/design/kv3r9nGw6cETcM95M5gaXk) | Design reference | Tokens mirror `src/app/globals.css` |
| **Google Drive** | Folder *Standalone CRM — Test Run* | Private guide, handbook, build kit | Manual upload; no client data |

## Edge Functions

| Function | Who may call it | Does |
|---|---|---|
| `manage-logins` | Signed-in team / sub-account admins | Creates logins, resets passwords, manages the team, creates and checks **release codes** |
| `account` | Any signed-in person | Replaces a temporary password and clears the "must change" flag |
| `setup-owner` | Anyone, **only before an agency exists** | Emails the installer-chosen Owner email a sign-in link, or accepts the one-time setup code |
| `handoff` | Owner (start/resend/keep/cancel), the named new Owner (accept) | Moves ownership; old Owner becomes backup admin |
| `connections` | Owner, agency admin, backup admin | Reads Vault keys and switches sign-in options on |

All five are deployed with `--no-verify-jwt` because each checks the caller's token itself, and each
requires the two-step code (aal2) once the caller has turned two-step on.

## Environment variables and secrets (names only)

| Name | Where | Secret? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel | No |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Vercel | No — protected by RLS |
| `NEXT_PUBLIC_APP_URL` | Vercel | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Edge runtime only (auto) | **Yes** |
| `OWNER_EMAIL`, `OWNER_NAME`, `SETUP_CODE` | Supabase function secrets (set by `provision-client.sh`) | Setup code: **yes** |
| Provider / SMTP keys | Supabase Vault (via Connections) or your shell (`scripts/auth.env`, Git-ignored) | **Yes** |

## Setup automation

| File | Does |
|---|---|
| `supabase/config.toml` | Auth settings: Site URL, redirect URLs, sign-ups off, password rules, manual linking, TOTP, email templates, SMTP (off until filled), function JWT settings |
| `supabase/templates/*.html` | Sign-in link, reset and email-change emails (token links that work on any device) |
| `scripts/setup-test-run.sh` | Model A in one command |
| `scripts/provision-client.sh` | Model B per client — Owner by **link**, **now** (temporary password) or **code** |
| `scripts/apply-auth.sh` + `scripts/auth.env.example` | Switch sign-in options and SMTP on from your computer |
| `scripts/backup.sh` · `scripts/update-all-clients.sh` | Backups · update every client project |
| `public/templates/connections-template.{json,md}` | Connections file templates |

## Data flow: "add a contact"

1. Phone → server action with the person's session cookie.
2. Server validates the form, then calls Supabase **as that person**.
3. RLS checks membership **and** (if they use two-step) that the code was entered. Otherwise denied.
4. A trigger writes the audit row.

## Adding a new integration later

Keys for other tools can already be **stored** in the vault, but nothing sends CRM data out. Any
future integration that reads or writes client records needs its own scoped request, a security
review and new isolation tests.
