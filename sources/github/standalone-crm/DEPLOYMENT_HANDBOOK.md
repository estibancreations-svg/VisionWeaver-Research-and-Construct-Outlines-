# T.H.E.L.M.A. CRM Complete — Deployment Manual (Version 2.0)

**T.H.E.L.M.A.** = **T**rusted **H**ub for **E**ngagement, **L**eads, **M**arketing & **A**utomation.

> **Version history.** Version 2.0 is the first release under the new name. Everything before it —
> the "Standalone CRM" builds v1, v2, v2.1, v3 and v3.1 — is **Version 1 (retired)**. The retired
> manuals are kept, read-only, in `docs/archive/`. New here? Read `/START_HERE.md` first.

**Updated:** October 14, 2026 · **Stack:** GitHub + Supabase + Vercel (Next.js 16, installable mobile web app)
**Installer / backup admin:** seniorestibancreations@gmail.com (Sire)
**Replaces:** v3.1 and earlier. v3.1 live commit: `bdb035656ecd17fd80466e98e3e7408a9a6560f8`; Version 2.0 is in the repository but **not yet applied to the live test run** (see §12.9).

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

**New in Version 2.0:** plans and **suggested pricing** (about 30% under GoHighLevel), **3 professional
email addresses per sub-account** (Owner, Admin, Accounting; extras billed), a **unified inbox with
internal team chat**, **app connectors** (Google Drive, Dropbox, OneDrive, Box, Outlook/Gmail,
calendars, Facebook, Instagram, LinkedIn, X, TikTok, YouTube, Pinterest, Threads, Google Business,
WhatsApp, Zoom, FaceTime links, text messages, Stripe), **advertising and a social planner with a
built-in compliance check**, **industry kits** (bail bonds, insurance brokers and financial brokers
first), **websites** (one per sub-account for now), **calendar**, **courses, community and "Learn the
system" lessons**, **invoices and payments** (Stripe: card, Apple Pay, Google Pay, Link, bank; Tap to
Pay plan), the **T.H.E.L.M.A. approval gate**, and **owner tracking** of every user's activity and
every sub-account's setup progress. The look and layout are unchanged; only the color scheme is
user-selectable. Full details: **§12**.

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

## 2. Product boundary (updated in Version 2.0)

- One independent CRM. Its own Supabase database is the **only** place client records live.
- GitHub = source code · Supabase = sign-in + Postgres + Edge Functions + Vault · Vercel = hosting.
- **Outside sign-in is allowed for logging in only.** Google, Microsoft, GitHub, Vercel, Apple and
  phone codes prove *who you are*. They never receive CRM records.
- **Connections vault:** owners store other tools' keys and MCP addresses, encrypted. Keys never
  leave the vault except inside Supabase Edge Functions.
- **Version 2.0 change (approved by the Owner):** email, texting, social messaging, ad tracking, payments and
  T.H.E.L.M.A.'s helpers are now part of the product, **under these rules**:
  - People can only *draft, request or approve*. Anything that leaves the system — sending a message,
    publishing a post, connecting an app, charging a card, putting a site live — is marked done only
    by the service role inside an Edge Function, after the provider is connected.
  - Every outside tool is **off until requested by a sub-account admin and connected by the installer**.
  - **T.H.E.L.M.A.'s assistant bots, chat bots and outside agents never touch CRM tables.** They send
    signed requests to the `thelma-gateway` function; each request waits for the **Owner's**
    approval (two-step sign-in required). Nothing is deleted from that record.
  - Payments stay **off in the Owner copy**; only the Owner can turn them on in a client's copy.
- No GoHighLevel, SeldonFrame or other CRM code or data is used. Public projects were studied for a
  feature checklist only; every line here is original.
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

- [x] v3.1 Vercel gate: lint ✔ typecheck ✔ 33 unit tests ✔ build ✔
- [ ] **Version 2.0 Vercel gate (lint, typecheck, unit tests, build) — run on the first Version 2.0 deploy** (§12.9)
- [x] Isolation suite: **92 / 92** on local Postgres (still passing with Version 2.0 applied)
- [x] Version 2.0 feature + isolation suite (`supabase/tests/v4_features.sql`): **54 / 54** on local Postgres
- [x] Version 2.0 pure-logic unit tests (`tests/v4.test.ts`): **13 / 13**
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
| Delivery workers for queued messages and approved posts | Version 2.0 queues them; a worker sends through the connected provider (Resend/Twilio/Meta/LinkedIn) |
| OAuth flows for each app in Apps | Turns "Requested" into "Connected" without the installer's hands |
| Executor for approved T.H.E.L.M.A. requests | Version 2.0 records approvals; the executor carries them out and marks them executed |
| Native phone app (Stripe Terminal SDK) | Tap to Pay inside the CRM; until then use the Stripe Dashboard app |
| Website builder/publisher | Version 2.0 plans the pages; the publisher builds and puts them live |
| Public forms, review requests, workflows, API | Remaining items from the competitor checklist (§12.8) |
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
7. Native App Store / Google Play packaging is out of scope (installable web app) — this is also why
   Tap to Pay needs Stripe's own app for now.
8. Version 2.0 sends nothing by itself yet: messages queue, posts wait as approved/scheduled, apps wait as
   requested, sites wait as planned, T.H.E.L.M.A. approvals wait to be executed — until the delivery
   workers and provider connections in §8 are added.
9. Mail hosting (Microsoft 365 / Google Workspace) is a separate paid service per mailbox; the CRM
   reserves and tracks the addresses but does not host mailboxes itself.
10. FaceTime has no outside connection: links are made on an Apple device and pasted in.

---

## 11. Copy-paste prompt for another AI system

See `docs/AI_HANDOFF_PROMPT.md`. Attach this repository (or the build-kit ZIP) and this handbook.

## 12. Version 2.0 platform — what was added and how it works

Think of Version 2.0 like adding rooms to a house you already built: the walls, locks and paint (layout,
security, colors) stay the same; new rooms (inbox, mail, marketing and more) open off the same hallway
(the left menu, or **Settings → tools row** on a phone).

### 12.1 Plans and suggested pricing

Prices are **suggested** until the Owner sets them. Each paid tier is about 30% under the GoHighLevel
list price it is compared with (HighLevel, n.d.). Annual = 10 × monthly.

| Plan | Suggested price | Sub-accounts | Websites | What's included |
|---|---|---|---|---|
| **Owner copy** | $0 (no billing) | 75 | 1 per sub-account | Everything; **payments stay off** |
| **Essentials** | $67/mo · $670/yr (GHL Starter $97 → 30% less) | 3 | 1 each, 3 total | CRM, email (3 addresses each), team chat, calendar, kits, courses, community, social planner, drives, website |
| **Growth** | $207/mo · $2,070/yr (GHL Unlimited $297 → 30% less) | 75 per build-out | 1 each, 6 total | Essentials + ads, Messenger/Instagram/LinkedIn messages, WhatsApp, reviews, payments |
| **Pro** | $347/mo · $3,470/yr (GHL Agency Pro $497 → 30% less) | 75 per build-out | 2 each, 12 total | Growth + **text (SMS), Zoom, FaceTime**, T.H.E.L.M.A. assistants/agents, API |

Suggested add-ons: extra email address $4/mo · extra website $7/mo · WhatsApp line $7/mo (GHL $10)
· branded client portal $34/mo (GHL $49) · SEO and listings $55/mo (GHL $79) · texts, calls, email
sends and AI at cost plus a margin to be set. The database enforces the plan (`public.plans`,
`private.ws_has_feature`); the **billing service** (Stripe webhook) changes an agency's plan — people
cannot.

### 12.2 System map (who sees what)

```
Owner (you) ── Agency ─┬─ Team: Owner · Admin 1, backup admin, admins, assistants
                       ├─ Owner tools: Usage and progress · T.H.E.L.M.A. queue · Plans and payments · Connections
                       └─ Sub-accounts (up to 75) ── each one has:
                            Overview · Contacts · Deals · Tasks · Companies · History · Settings
                            Inbox (team chat + customers) · Calendar · Marketing · Templates
                            Mail (owner@ admin@ accounting@ + extras) · Apps · Website · Learn · Payments
T.H.E.L.M.A. ── talks to the Owner ── her helpers (assistant bots, chat bots, outside agents)
                 └── can only ASK through the signed gateway → Owner approves → system acts
```

### 12.3 Professional email (Mail page)

- Every sub-account gets **owner@, admin@ and accounting@** reserved automatically (existing sub-accounts, including
  the 75 test ones, get theirs when the migration is applied). Extra addresses are reserved by a sub-account admin and **billed**.
- The admin types the business domain (e.g. `lonestarbail.com`). It shows **Waiting for DNS records**
  until the installer connects a mail host under Apps (Microsoft 365/Outlook or Google Workspace) and
  adds MX, SPF, DKIM and DMARC records; then the installer marks the domain **verified** and the
  addresses **active** (service role only).
- Email from the inbox **queues** only when the domain is verified; otherwise it shows *Waiting for
  connection*.

### 12.4 Inbox and team chat

- **Team chat** (internal) is delivered at once and stays inside the sub-account.
- Customer conversations by email, text, WhatsApp, Messenger, Instagram, LinkedIn, website chat, Zoom
  or FaceTime **queue** when the channel is on the plan; otherwise they wait. People can never record
  an "inbound" message or mark one delivered — only the delivery service can.

### 12.5 Apps (connectors)

A sub-account admin presses **Request**; the installer completes the provider's own sign-in and stores
keys in the vault; the service marks it **Connected**. Groups: calendar and mail, storage (Google
Drive, Dropbox, OneDrive, Box), social (Facebook, Instagram, LinkedIn, X, TikTok, YouTube, Pinterest,
Threads, Google Business), advertising (Google, Meta, TikTok, LinkedIn Ads), calls and messages
(WhatsApp, Twilio texts, Zoom, FaceTime), payments (Stripe). Zoom meetings are created through Zoom's
meeting API (Zoom, n.d.). **FaceTime has no outside API**: links are made on an iPhone, iPad or Mac
and pasted on the appointment; Android and Windows guests join in Chrome or Edge (Apple, n.d.).

### 12.6 Marketing and the compliance check

- **Social posts**: pick platforms, write, optionally schedule. **Ad campaigns**: channel, goal,
  budget, dates, headline, ad text and a tracking code (`utm_campaign`); contacts now store
  `utm_source`, `utm_medium` and `utm_campaign`.
- Every save runs the compliance check for the sub-account's business type (database:
  `private.compliance_flags`; screen: `src/lib/compliance.ts`). Flags: promises like "guaranteed";
  anything offered for reviews (FTC); bail bonds — "get out free", legal advice or case-outcome
  claims; insurance — lowest-rate, free-coverage or approve-everyone claims; financial — risk-free or
  sure-return claims.
- Only a **sub-account admin** can approve, and **nothing with a flag can be approved**. Editing an
  approved post sends it back to draft. Only the delivery service marks posts published or campaigns
  active.

### 12.7 Industry kits (Templates page)

New starter setups: **Bail bonds**, **Insurance broker or agency**, **Financial broker or advisor**
(13 setups in all). Each new kit installs its 5-step pipeline, tags, and a set of ready-to-edit
emails, texts (including Spanish court reminders for bail bonds), social posts, ads, call scripts,
tasks and a website outline — **36 kit items, all passing the compliance check** (tested in code and
in the database). Other business types get the general kit until their own is written.

### 12.8 Website, calendar, learning, payments, T.H.E.L.M.A., owner tracking

- **Website:** one per sub-account now (Owner copy and demo); plan limits at go-live are in §12.1. The
  page holds the site name, domain and page outline; the publisher puts it live (service role only).
- **Calendar:** in-person, phone, Zoom and FaceTime appointments (Zoom/FaceTime on Pro), linked to
  contacts.
- **Learn:** 10 built-in "Learn the system" lessons with per-person progress, plus each sub-account's
  own **courses** (for the team or customers) and a **community** board. The first-sign-in
  walk-through stays as the setup guide.
- **Payments:** invoices (draft → open → paid or void). "Pay online" opens a Stripe-hosted page;
  card, Apple Pay, Google Pay, Link and bank payments appear when switched on in Stripe, and Apple
  Pay/Google Pay need the payment domain registered (Stripe, n.d.-a). Card and wallet payments are
  marked paid **only by the Stripe webhook**; cash and checks can be marked by staff. **Tap to Pay**
  needs a native phone app with Stripe's Terminal SDK, or the Stripe Dashboard app (Stripe, n.d.-b).
- **T.H.E.L.M.A. gate:** helpers `POST` to `/functions/v1/thelma-gateway` with JSON
  `{agency_id, workspace_id?, source, source_name, action, summary, details?, risk?}` and headers
  `x-thelma-timestamp` (unix seconds, within 5 minutes) and `x-thelma-signature` (hex HMAC-SHA256 of
  `"<timestamp>.<body>"` with `THELMA_GATEWAY_SECRET`). The request waits on **Owner tools →
  T.H.E.L.M.A.**; only the Owner approves or rejects; helpers poll with `{check: "<id>", agency_id}`.
- **Owner tracking (Usage and progress):** people with access, last activity, actions and messages
  in 30 days, and each sub-account's 7 setup steps (logo, verified domain, contacts, deals, kit,
  website, client login).

### 12.9 Deploying Version 2.0 (do these in order)

1. Make sure the repository holding this code is **private**.
2. Apply migration `20261014000008_v4_platform.sql` (`supabase db push`, or the setup scripts — they
   now also deploy `thelma-gateway` and `payments` and run both test suites).
3. Add Edge Function secrets in Supabase (never in Vercel): `THELMA_GATEWAY_SECRET` (32+ random
   characters); later `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` for a client copy that takes
   payments.
4. Deploy to Vercel; the build runs lint, typecheck, unit tests and build. **Version 2.0 has not been through
   that gate yet** — the build machine used to write it could not download packages — so watch the
   first build and fix anything it reports before promoting it.
5. Run `supabase/tests/rls_isolation.sql` and `supabase/tests/v4_features.sql` against the project;
   both must end with "PASSED".
6. Regenerate `src/lib/database.types.ts` from the live schema when convenient (Version 2.0 tables were
   typed by hand).
7. Move everyone onto Version 2.0 and retire old web addresses: `docs/VERCEL_CLEANUP.md`.
8. Assignee checklist and reading order: `START_HERE.md`. T.H.E.L.M.A.'s duties: `docs/thelma/`.

### 12.10 Competitor checklist coverage

Built in Version 2.0: agency → sub-account hierarchy (already), templates/kits (snapshot-like), unified
inbox, social planner, ad tracking, calendars, courses, communities, payments and invoices, owner
reporting, per-feature plan gates, T.H.E.L.M.A. assistant layer with approval. **Still to build:**
public forms and surveys, visual workflow builder, review requests, AI voice agent, funnels,
white-label mobile app, public API and webhooks (§8).

### Sources

- Apple. (n.d.). *Choosing a membership*. Apple Developer. https://developer.apple.com/support/compare-memberships/
- Supabase. (n.d.). *Pricing*. https://supabase.com/pricing
- Supabase. (n.d.). *Send emails with custom SMTP*. https://supabase.com/docs/guides/auth/auth-smtp
- Supabase. (n.d.). *Login with Apple*. https://supabase.com/docs/guides/auth/social-login/auth-apple
- Apple. (n.d.). *Join a FaceTime call from an Android or Windows device*. Apple Support. https://support.apple.com/en-gb/109364
- HighLevel. (n.d.). *HighLevel pricing*. Retrieved October 14, 2026, from https://www.gohighlevel.com/pricing
- Stripe. (n.d.-a). *Register domains for payment methods*. Stripe Docs. https://docs.stripe.com/payments/payment-methods/pmd-registration
- Stripe. (n.d.-b). *Tap to Pay on iPhone or Android and Stripe Terminal*. Stripe Support. https://support.stripe.com/questions/tap-to-pay-on-iphone-or-android-and-stripe-terminal
- Zoom. (n.d.). *Create a meeting*. Zoom Developer Docs. https://developers.zoom.us/docs/isv/workflows/create-meeting/
