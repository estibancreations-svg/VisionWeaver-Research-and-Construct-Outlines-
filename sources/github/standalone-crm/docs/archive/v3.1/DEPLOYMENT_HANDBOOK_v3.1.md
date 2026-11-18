> **RETIRED — kept for the record only. Do not deploy from this file.** Current system: T.H.E.L.M.A. CRM Complete, Version 2.0 — see `/START_HERE.md`.

# Standalone CRM — Deployment Handbook (v3.1)

**Updated:** October 13, 2026 · **Stack:** GitHub + Supabase + Vercel (Next.js 16, installable mobile web app)
**Installer / backup admin:** seniorestibancreations@gmail.com (Sire)
**Replaces:** v2.1 and earlier. Live commit: `bdb035656ecd17fd80466e98e3e7408a9a6560f8`.

**New in v3:** four looks (Sculpted Paper, Professional Greyscale, Stealth, Auto), an agency team
(Owner · Admin 1, admins, assistants), client logos and brand colors, 10 industry starter setups,
owner money numbers, a cross-client "Due now" list, CSV contact import, sign-in with outside
accounts, phone codes and two-step codes.

**New in v3.1:** the Owner gets in by an **email sign-in link**, a **first-sign-in walk-through**,
**ownership hand-off** (the installer steps back to a visible **backup admin**), the
**T.H.E.L.M.A. AI Fail Safe** release code, **required two-step sign-in** for the agency team,
an **encrypted connections vault** (upload a JSON / text / Markdown file), **Vercel sign-in**, paid
sign-in options that stay **off until an administrator activates them**, and a **team look** the
Owner picks.

This handbook tells any person or AI build assistant exactly how to rebuild, test and deploy this
CRM. It covers **two deployment models**:

| Model | What it is | When to use it |
|---|---|---|
| **A. Shared test run** (what is live today) | One Supabase project holds one agency with up to **75 client sub-accounts**, each walled off by row-level security (RLS). | Demos, test runs, low-cost pilots. |
| **B. Production — one paid database per client (PRIMARY)** | Each client gets its **own Supabase project on a paid plan** and its own Vercel project and domain. | Real customer data, contract-level separation, per-client backups and billing. |

Think of it like housing. **Model A** is one apartment building with 75 locked units; the building
checks every key at every door. **Model B** gives every client their own house on their own lot.

---

## 1. Current live test run (Model A) — facts you can verify

| Item | Value |
|---|---|
| Live app | https://standalone-crm-nine.vercel.app (also https://standalone-crm-estibancreations101.vercel.app) |
| GitHub repo (private) | https://github.com/estibancreations-svg/standalone-crm (branch `main`, PR #2 = v3.1) |
| Vercel project | `standalone-crm` (team **Estibancreations**, id `prj_HCnnZkLkHHMfxFvBmq9aQGgcgO07`) |
| Supabase project | `standalone-crm-test` · ref **`csxtrhwzswluismrayen`** · region `us-east-2` · Free plan |
| Agency | "Demo Agency" — **Owner · Admin 1:** seniorestibancreations@gmail.com · **Agency admin:** estibancreations@gmail.com |
| Sub-accounts | 75 (mock), each with 1 login `client01@crm-demo.test` … `client75@crm-demo.test` |
| Database | 16 public tables, RLS on all 16 · 7 migrations |
| Edge Functions | `manage-logins`, `account`, `setup-owner`, `handoff`, `connections` (all check the caller's token themselves) |
| Health check | https://standalone-crm-nine.vercel.app/api/health |
| Figma design file | https://www.figma.com/design/kv3r9nGw6cETcM95M5gaXk |

Passwords are **never** stored in this repository. The shared test password lives only in the
owner's private guide (Google Drive). Because two-step sign-in is now required for the agency team,
both owner logins are asked to set it up at their next sign-in.

---

## 2. Product boundary (updated in v3.1)

- One independent CRM. Its own Supabase database is the **only** place client records live.
- GitHub = source code · Supabase = sign-in + Postgres + Edge Functions + Vault · Vercel = hosting.
- **Outside sign-in is allowed for logging in only.** Google, Microsoft, GitHub, Vercel, Apple and
  phone codes prove *who you are*. They never receive CRM records.
- **Connections vault:** owners can store other tools' API keys and MCP addresses, encrypted. In this
  release they are **stored only** — nothing sends CRM data to those tools. Any future use needs its
  own scoped request, security review and tests.
- No GoHighLevel, SeldonFrame, other CRMs, marketing email/SMS, payments, webhooks or outside AI
  agents read or write CRM data.
- Figma and Google Drive are for design and documentation only.
- "Sign in with Supabase" does not exist as a login option, so it is not offered.

---

## 3. What was built

### 3.1 Screens

| Area | Screens |
|---|---|
| Access | Sign in (password, **email me a sign-in link**, outside accounts, phone code) · Forgot / set password · Two-step code (`/mfa`) · First-time setup (`/setup`) · **Welcome walk-through** (`/welcome`) · Offline page |
| Agency | Sub-accounts dashboard (money numbers, capacity meter, search, archived) · **Due now** (every client's overdue and due-today tasks) · New sub-account (10 starter setups) · **Team** (roles, hand-off, fail safe) · **Connections** (vault, switch-on, paid options) · Account (look, **team look**, sign-in methods, two-step, password) |
| Each sub-account | Overview · Contacts (search, filter, **CSV import**, detail, edit, archive) · Companies · Deals board · Tasks · Notes · History (audit) · Settings (logo, brand color, logins, CSV exports, archive, delete) |

Mobile first: bottom tab bar on phones, sidebar on desktop, 16 px inputs, safe-area padding, focus
rings, skip link, reduced motion. Installs from Safari (iPhone) and Chrome (Android). The service
worker caches only the app shell — **never CRM data**.

### 3.2 Roles

| Role | Where | Can do |
|---|---|---|
| **Owner · Admin 1** | `agency_members` | Everything. Only one per agency. Hands off ownership, removes admins, removes the backup admin **with the release code** |
| **Backup admin** | `agency_members` | The installer after a hand-off. Same access as an admin, always **visible** on Team, protected by the T.H.E.L.M.A. AI Fail Safe |
| **Agency admin** | `agency_members` | Opens every sub-account, creates sub-accounts, manages logins and assistants, connections |
| **Assistant** | `agency_members` | Works inside every sub-account as a member. Can't create sub-accounts or manage logins |
| Sub-account **admin / member / viewer** | `workspace_members` | Full / add-and-edit / read-only inside **their one** sub-account |

### 3.3 Security rules (all tested)

1. RLS is on for **every** public table; anonymous visitors have no table access.
2. Access is decided in Postgres from the **signed-in person's** membership, never from what the
   browser sends.
3. Records can't be linked or moved across sub-accounts (composite keys + a trigger).
4. History (`activities`) is written only by triggers and can't be changed.
5. **Two-step is enforced by the database:** once someone turns it on, a session that hasn't
   entered the 6-digit code loses every permission until it does. The app requires two-step for the
   Owner, agency admins and the backup admin.
6. **Keys in the connections vault** live in Supabase Vault. People see only `••••` + the last 4
   characters. Only the `connections` Edge Function (service role) can read a key, and removing a
   connection overwrites the key in Vault. Website passwords are refused.
7. **Hand-offs** finish only inside the `handoff` Edge Function after the new Owner proves they own
   the mailbox. There is always exactly one Owner.
8. **Release codes** are stored only as a SHA-256 fingerprint. No signed-in person — not even the
   Owner — can read the table. The backup admin can't be removed through the database directly.
9. The service-role key exists **only** inside Supabase Edge Functions. Never in Vercel, the browser
   or Git.
10. CSV exports neutralise formula injection; security headers are on (frame-deny, nosniff, strict
    referrer, permissions policy, HSTS).

**Expected Supabase advisor notes (intentional):** signed-in users may call these SECURITY DEFINER
functions, and each one checks permission itself: `bootstrap_agency`, `create_workspace`,
`my_workspace_role`, `my_default_theme`, `save_connections`, `remove_connection`,
`set_paid_signin`, `signin_options`. `signin_options` is also callable signed-out on purpose (the
login page asks which buttons to show; it returns only on/off flags). `backup_release_codes` has RLS
on with no policies on purpose (only the Edge Function uses it). "Leaked password protection" is a
Supabase setting that may need a paid plan.

---

## 4. First launch, ownership and the fail safe (new)

Analogy: you build a house for a client. You hand them the keys, and they change the locks. You keep
one **labeled spare key** in a lockbox on the front porch — the client can always see it — and the
lockbox only opens with a code **you** give them when the job is paid.

### 4.1 Owner setup by email link

1. When installing for a client, the installer runs `bash scripts/provision-client.sh` and answers
   `link`. It stores the **Executive Owner email** (and name) as Supabase secrets.
2. The script (or anyone opening `/setup`) presses **Email the sign-in link**. The page shows only a
   masked hint of the address (for example `s•••••••@gmail.com`); visitors can't type a different
   email. Setup locks forever once any agency exists.
3. The owner opens the link → the **walk-through** starts.
4. Spare way in: a one-time **setup code** (printed by the script) works on `/setup` until an owner
   exists.

### 4.2 The walk-through (`/welcome`) — each step only appears when it applies

| Step | What happens |
|---|---|
| 1. Accept ownership | Only for someone named in a hand-off. They become **Owner**; the old Owner becomes **backup admin**. |
| 2. Who owns this CRM? | The installer types the client's email → they get a one-time link. Or press **I'm the Owner — keep this email**. |
| 3. Choose a password | Required (10+ characters, a letter and a number). |
| 4. Turn on two-step | Required for Owner, admins and backup admin. Any free authenticator app works. |
| 5. Sign-in options, connections & look | Connect Google / Microsoft / GitHub / Vercel, upload the connections file, pick a look. |

### 4.3 Hand-off later

Team → **Hand over ownership** (Owner only): type the new email → **Send hand-off link**. You can
**Resend** or **Cancel** while it waits (links stay open 7 days). Nothing changes until the new
person accepts.

### 4.4 T.H.E.L.M.A. AI Fail Safe (release code)

- The Owner sees a notice on **Team**: *"T.H.E.L.M.A. AI Fail Safe is on"*, and the backup admin's row
  says *"Protected by T.H.E.L.M.A. AI Fail Safe."*
- The backup admin signs in → **Team → Your T.H.E.L.M.A. AI Fail Safe → Create release code**. It
  looks like `THELMA-XXXX-XXXX-XXXX-XXXX-XXXX`, is **shown once**, and should go in a password
  manager. Making a new code cancels the old one.
- When it's time (for example, after final payment), give the code to the Owner. They open the
  backup row → **Remove with release code** → type it. Case, spaces and dashes don't matter. It works
  once; wrong codes are refused and slowed down.
- Until a code exists, nobody can remove the backup admin.

---

## 5. Sign-in options and the connections file (new)

### 5.1 What's free and what costs money

| Option | Cost | Starts |
|---|---|---|
| Email + password, email sign-in link | Free | On |
| Google, Microsoft, GitHub | Free | On once its keys are uploaded and switched on |
| Vercel ("Sign in with Vercel") | Free | On once its keys are uploaded and switched on |
| Apple | Apple Developer Program, about **$99/year** | **Off** until an administrator presses **Activate** |
| Phone text codes (Twilio) | Charged **per message** | **Off** until an administrator presses **Activate** |

Outside accounts work **after** a person connects them to their existing login (Account → Sign-in
methods). Sign-ups stay off, so a stranger's Google account can't create a login.

### 5.2 The connections file

Upload under **Connections** (or step 5 of the walk-through). Templates: `/templates/connections-template.json`
and `/templates/connections-template.md`. Each entry lists the **site** and **how the CRM reaches it**:

| Type | Needs |
|---|---|
| `oauth` (sign-in app) | `provider`, `client_id`, `client_secret` (Microsoft also `tenant`) |
| `smtp` (email sender) | `host`, `port`, `user`, `password`, `sender_email`, `sender_name` |
| `sms` (Twilio) | `account_sid`, `auth_token`, `message_service_sid` |
| `platform` (Supabase access token) | `access_token` — lets the CRM switch Google, Microsoft, GitHub, Apple, phone and the email sender on |
| `api_key` / `mcp` (other tools) | `api_key` / `token`, or `mcp_url` — **stored only** |

Rules: website passwords are refused · up to 50 entries and 64 KB · uploading a name that already
exists replaces it · keys are never shown again (only the last 4 characters) · the file itself isn't
kept. After uploading, press **Switch on uploaded sign-in options**. Each row then shows **On**,
**Stored**, **Saved** or **Needs attention** with a reason. Tip: after switching on, remove the
Supabase access token entry and revoke the token in Supabase.

### 5.3 Where to get each provider's keys

For every sign-in app, the **callback / redirect URL** is
`https://<project-ref>.supabase.co/auth/v1/callback` (live test run: `https://csxtrhwzswluismrayen.supabase.co/auth/v1/callback`).
Menu names change over time; look for the words below.

| Provider | Where | Notes |
|---|---|---|
| Google | Google Cloud Console → APIs & Services → Credentials → OAuth client ID (Web) | Add the callback as an authorized redirect URI |
| Microsoft | Microsoft Entra admin center → App registrations → New registration (Web) → Certificates & secrets | Use `tenant: common` unless the client wants only their company |
| GitHub | GitHub → Settings → Developer settings → OAuth Apps → New | Paste the callback as "Authorization callback URL" |
| Vercel | Vercel dashboard → create a "Sign in with Vercel" app | The CRM creates the custom provider `custom:vercel` for you |
| Apple (paid) | Apple Developer → Certificates, Identifiers & Profiles → Services ID → Sign in with Apple | The client secret is a signed token that must be renewed about every 6 months |
| Twilio (paid) | Twilio Console → Messaging Service | Needs the Account SID, Auth Token and Messaging Service SID |
| Email sender | Resend, Postmark, SendGrid or your mail host | **Needed before sign-in links reach anyone outside your Supabase team** |
| Supabase token | Supabase → Account → Access Tokens | Only needed to switch sign-in options on from the app |

Installer alternative: copy `scripts/auth.env.example` to `scripts/auth.env` (Git ignores it), fill it
in, run `bash scripts/apply-auth.sh`.

---

## 6. Setup out of the box (Model A test run)

Analogy: a cake mix. Get the box (the repo), add two ingredients (a Supabase project and a Vercel
project), run one command, and it comes out the same every time.

### 6.0 What you need (one time)

| Tool | Why | Get it |
|---|---|---|
| GitHub, Vercel, Supabase accounts | Code, hosting, database | Sign in as the installer |
| Supabase CLI | Database, functions, auth settings | `brew install supabase/tap/supabase` or `npm i -g supabase` |
| PostgreSQL client 17 (`psql`, `pg_dump`) | Seed data, safety tests, backups | `brew install libpq` / `apt install postgresql-client-17` |
| Node.js 22+ | Local development only | nodejs.org |

**Cost gate:** Supabase Free allows **2 active projects**. More needs Pro (from **$25/month** per
organization plus compute). Show the price and get the owner's OK before creating anything
billable. Never paste passwords or keys into a chat.

### 6.1 Five steps

1. **GitHub:** copy the repo into a **private** repo. Move `ci/github-workflows/*.yml` to `.github/workflows/`.
2. **Supabase:** create a project; copy the **Session pooler** connection string and the project ref.
3. **Vercel:** import the repo; add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
   `NEXT_PUBLIC_APP_URL`. Deployment Protection: previews only. **Never** add a secret key to Vercel.
   Every deploy runs lint → typecheck → unit tests → build.
4. **One command:** `bash scripts/setup-test-run.sh` — applies all 7 migrations → deploys the 5 Edge
   Functions → pushes auth settings and email templates from `supabase/config.toml` → loads 75 mock
   sub-accounts → runs the **92** isolation checks → checks `/api/health`.
5. **Check it:** `/api/health` says `"status":"ok"`; sign in as the owner (you'll be asked to set up
   two-step).

### 6.2 Manual fallback

In the Supabase SQL editor run every file in `supabase/migrations/` in name order. Deploy the
functions with `supabase functions deploy <name> --no-verify-jwt` for `manage-logins`, `account`,
`setup-owner`, `handoff`, `connections`. Paste `supabase/tests/rls_isolation.sql` (it rolls back).
In Authentication → URL Configuration set the Site URL and redirect URLs `<app>/auth/confirm` and
`<app>/auth/callback`; turn **off** "Allow new users to sign up"; turn **on** manual linking and TOTP
two-step; paste the three email templates from `supabase/templates/`.

### 6.3 Daily care

- **Backups:** `bash scripts/backup.sh` (two files, kept out of Git). Do a restore drill before real data.
- **Health:** point a free uptime monitor at `/api/health`.
- **Advisor:** Supabase → Advisors → Security should show only the expected notes in §3.3.

### 6.4 Release checks

- [x] Vercel gate: lint ✔ typecheck ✔ 33 unit tests ✔ build ✔
- [x] Isolation suite: **92 / 92** on local Postgres
- [x] Live end-to-end for v3.1: **25 / 25** (hand-off, two-step, vault, fail safe)
- [x] Earlier live smoke (client isolation): 26 / 26
- [ ] Email sender (SMTP) added — needed before sign-in links reach clients
- [ ] Sign-in provider keys uploaded and switched on
- [ ] Move CI workflow files into `.github/workflows`
- [ ] Backups + restore drill before any real data

---

## 7. Production — one paid database per client (Model B, PRIMARY)

1. Upgrade the Supabase organization to **Pro** (show pricing first).
2. Per client: create Supabase project `crm-<client>` and a Vercel project (3 env vars + domain).
3. Run `bash scripts/provision-client.sh` and answer:
   - **link** (recommended) — Executive Owner email + name + publishable key → emails the sign-in
     link. If no email sender is set yet, use the printed setup code.
   - **now** — temporary password (owner changes it at first sign-in).
   - **code** — web page + setup code only.
   It applies migrations, deploys the functions, pushes auth settings, makes the setup code, runs
   the isolation tests and checks health. **No mock data.**
4. Owner opens the link → walk-through. If you installed it for them, hand it off in step 2, then
   create your **release code** as backup admin.
5. Turn on PITR (paid) or schedule `scripts/backup.sh`. Add the email sender.
6. Ship updates by merging to `main`; run `scripts/update-all-clients.sh` for `supabase db push` per project.

| Need | Model A (shared) | B2 (grouped, e.g. 25 per Pro project) | B1 (per client) |
|---|---|---|---|
| Cost | Lowest | Medium | Highest |
| Data separation | Strong (RLS) | Strong + smaller blast radius | Physical (separate databases) |
| Backup/restore | All at once | Per group | Per client |
| Custom domain | Shared | Per group | Yes |

---

## 8. Recommended next upgrades (not built yet)

| Upgrade | Why |
|---|---|
| Email sender (SMTP) on the live project | Sign-in links and resets reach real clients |
| Commit `package-lock.json` | Same add-on versions on every install |
| Uptime alerts on `/api/health` | Know within minutes if the app is down |
| Supabase Pro + PITR | Point-in-time recovery before real data |
| Two-step recovery codes | A way back in if a phone is lost (today the installer resets it) |

---

## 9. Troubleshooting

| Problem | Fix |
|---|---|
| Sign-in link email never arrives | Add an email sender (§5). Until then, free Supabase email reaches only project team members. Use the setup code or a password. |
| Stuck on "Turn on two-step" | Required for owners and admins. Install any authenticator app and scan the QR code (or type the key). |
| "That code didn't match" | Check the phone's clock is set automatically; use the newest code. |
| Lost the authenticator phone | Ask the installer: remove that person's factor in Supabase (Authentication → Users, or the `auth.mfa_factors` row), then set it up again. |
| Lost the release code | The backup admin makes a new one (the old one stops working). |
| A sign-in button doesn't show | Its keys aren't uploaded/switched on yet, or it's a paid option not activated. |
| "Couldn't connect that" when linking an account | Manual linking or that provider isn't switched on in Supabase yet. |
| Connection shows "Needs attention" | Read the note on the row (missing secret, wrong token, provider refused). Fix the file and upload again. |
| Vercel build fails | Read the first error; `npm run verify` locally. Never disable checks. |
| Data empty or denied | Check the person's membership and that their two-step code was entered. **Never** disable RLS. |
| Cross-client data appears | Stop. Security blocker. Reproduce with the isolation suite, fix, retest. |
| A secret leaked | Rotate it with the provider right away; re-upload the connection. |

---

## 10. Remaining limitations

1. The test run is on Supabase **Free**: no point-in-time recovery; projects pause after a week idle.
2. Sign-in and reset **emails** reach only Supabase team members until an email sender is added.
3. Other tools' API/MCP keys are **stored only**; nothing uses them yet (product boundary).
4. Removing a sign-in connection doesn't switch that provider off in Supabase by itself.
5. Two leftover **test logins** (`e2e-owner@e2e-crm.test`, `e2e-newowner@e2e-crm.test`, both locked
   and with scrambled passwords) and one empty test agency remain on the live test project because
   the automatic delete was cancelled. Delete them in Supabase when convenient.
6. CI workflow files must be moved into `.github/workflows` by hand once.
7. Native App Store / Google Play packaging is out of scope (installable web app).

---

## 11. Copy-paste prompt for another AI system

See `docs/AI_HANDOFF_PROMPT.md`. Attach this repository (or the build-kit ZIP) and this handbook.

### Sources

- Apple. (n.d.). *Choosing a membership*. Apple Developer. https://developer.apple.com/support/compare-memberships/
- Supabase. (n.d.). *Pricing*. https://supabase.com/pricing
- Supabase. (n.d.). *Send emails with custom SMTP*. https://supabase.com/docs/guides/auth/auth-smtp
- Supabase. (n.d.). *Login with Apple*. https://supabase.com/docs/guides/auth/social-login/auth-apple
