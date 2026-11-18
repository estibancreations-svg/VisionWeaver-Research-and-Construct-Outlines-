# Commit history — estibancreations-svg/standalone-crm

Source: default branch, retrieved 2026-11-18 via list_commits (read-only). Total commits retrieved: 32. No API cap hit: pagination ran until a short page.

## 2be8547a622531fba60e127c0374dea684837082

- Date: 2026-10-17T21:42:17Z
- Author: Estiban Creations
- Message:

```
docs: mark OPERATING_POLICY approved + in effect 2026-10-17 (#9)
```

## d8726dcffc98f26086c1d6645be54484618a5951

- Date: 2026-10-17T21:31:45Z
- Author: Estiban Creations
- Message:

```
Docs: fix START_HERE stale claim + verification addendum (#8)

* docs: fix START_HERE stale v2.0 build claim + migration + policy pointer

* docs: append v2.0/v2.1/CI addendum to verification report
```

## eba9e644f007795577b4f5791fd1b4667bd46177

- Date: 2026-10-17T21:21:28Z
- Author: Estiban Creations
- Message:

```
Docs: operating policy + v2.1 verification + prod runbook (drafts, no behavior change) (#7)

* docs: add docs/OPERATING_POLICY.md (fix-up draft, needs Owner approval)

* docs: add docs/V2_1_VERIFICATION_CHECKLIST.md (fix-up draft, needs Owner approval)

* docs: add docs/DOCS_REFRESH_NOTES.md (fix-up draft, needs Owner approval)

* docs: add docs/PRODUCTION_BACKUP_SECURITY_RUNBOOK.md (fix-up draft, needs Owner approval)
```

## 609ca862d8242e1bf5e40ab4779256059af80e88

- Date: 2026-10-15T04:45:00Z
- Author: Estiban Creations
- Message:

```
Merge pull request #4 from estibancreations-svg/thelma-crm-v2.0
```

## 7a791254fcf170ed104d0fc7bb01beda809b5a94

- Date: 2026-10-15T04:15:38Z
- Author: Claude
- Message:

```
Migration 08: read campaign/post text via to_jsonb in marketing_guard (matches live database)

Applied to live Supabase project on 2026-10-14 along with thelma-gateway and payments functions.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012AnuYozViFVPSeZ2Wxq7nQ
```

## fac8ccc841c9a2ed497fb6b72ef0189963b90ae7

- Date: 2026-10-15T01:51:42Z
- Author: Claude
- Message:

```
T.H.E.L.M.A. CRM Complete — Version 2.0: rename, manual and walk-throughs, archive of Version 1, T.H.E.L.M.A. profile and duties, research, decisions, conversation summaries, Vercel cutover plan

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012AnuYozViFVPSeZ2Wxq7nQ
```

## e62e1b9f06989f8b31fd7dc13f479b341a097f9a

- Date: 2026-10-15T01:13:04Z
- Author: Claude
- Message:

```
v4.0: plans, business email, inbox, connectors, marketing, kits, payments, T.H.E.L.M.A. gate

- Migration 08: plans/tiers with suggested pricing, 3 reserved mailboxes per sub-account,
  conversations + messages (team chat and customer channels), app connectors, campaigns and
  social posts with compliance checks, bail bonds / insurance / financial kits, websites,
  courses, lessons, community, learning progress, appointments, payment settings, invoices,
  T.H.E.L.M.A. request queue (Owner-only decisions), owner usage and progress reports.
- Edge Functions: thelma-gateway (signed, air-gapped requests) and payments (Stripe checkout
  and webhook; Owner copy stays off).
- New pages: Inbox, Calendar, Marketing, Templates, Mail, Apps, Website, Learn, Payments,
  and owner pages Usage, T.H.E.L.M.A., Plans. Layout and look unchanged.
- Tests: supabase/tests/v4_features.sql (54 checks) and tests/v4.test.ts (13 tests);
  existing isolation suite still 92/92.
- Handbook v4.0 (section 12), README and blueprint updated.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012AnuYozViFVPSeZ2Wxq7nQ
```

## ff6209a56be45f861936a5b213f69efe8449db01

- Date: 2026-10-14T06:08:28Z
- Author: Estiban Creations
- Message:

```
v3.1 docs: handbook, guides, verification report, hand-off browser test (#3)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_014nF6s6SnZBCUKeTSE1f6qR
```

## bdb035656ecd17fd80466e98e3e7408a9a6560f8

- Date: 2026-10-13T20:53:26Z
- Author: Estiban Creations
- Message:

```
v3.1: owner setup by email link, hand-off, required two-step, connections vault, T.H.E.L.M.A. AI Fail Safe (#2)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_014nF6s6SnZBCUKeTSE1f6qR
```

## d1e5da1609043fc7f484336c8cdb705a014fc5b7

- Date: 2026-10-13T17:39:22Z
- Author: Estiban Creations
- Message:

```
Look picker: keep the hidden radio inside its card so it can't cover nearby buttons on phones

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 728220e537fee679b844b1088fb7b4f0dc3612b0

- Date: 2026-10-13T17:31:12Z
- Author: Estiban Creations
- Message:

```
First password change: sign back in with the new password (old session ends on change)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 03d486834bb6de393b9dbe3d9689c47317c7fe84

- Date: 2026-10-13T17:25:33Z
- Author: Estiban Creations
- Message:

```
Welcome page reads fresh account state so step 2 shows right after the new password

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 77c361390dd9e10dde06fec7df1ba2d95c8663bb

- Date: 2026-10-13T17:21:03Z
- Author: Estiban Creations
- Message:

```
Send logins with a temporary password straight to /welcome at sign-in

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## d713366e57ec0a46bcc45d04aa76afcb6ed4974a

- Date: 2026-10-13T17:12:37Z
- Author: Estiban Creations
- Message:

```
Standalone CRM v3: team roles, owner setup, sign-in methods, looks, branding, CSV import (#1)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 62d91b5e27dac068856aa2bbdcc47c874e1abbcd

- Date: 2026-10-12T22:28:12Z
- Author: Estiban Creations
- Message:

```
docs: integrations (health check, setup automation) and verification report v2.1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## dc3c8c63b53cfbadccd02f904a682b2946e68e8f

- Date: 2026-10-12T22:27:38Z
- Author: Estiban Creations
- Message:

```
docs: handbook v2.1 (out-of-the-box setup), owner email seniorestibancreations@gmail.com

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## ceace4bd4b1da5cad49e21c4e84218cdc78b89f2

- Date: 2026-10-12T22:26:16Z
- Author: Estiban Creations
- Message:

```
feat: out-of-the-box setup (v2.1) — setup/provision/backup scripts, auth config, /api/health, owner email seniorestibancreations@gmail.com

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 1241d826866492fe9aa372dce5153feb40b4cf0b

- Date: 2026-10-12T14:11:32Z
- Author: Estiban Creations
- Message:

```
docs: v2 deployment handbook, how-to guide, integrations, mock data, design system, verification report

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 61154865a312ded0e2fa9040c837e9cd04392432

- Date: 2026-10-12T13:35:48Z
- Author: Estiban Creations
- Message:

```
test(db): 75 sub-account mock seed and two-tenant RLS isolation suite

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 09c82a25aef6cc4a73364662eef99ce11b34cec7

- Date: 2026-10-12T13:34:41Z
- Author: Estiban Creations
- Message:

```
feat(db): core tables, auth helpers/triggers, RLS + grants, RPCs (applied to standalone-crm-test)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 3a65b1068876664ca72a7da4672ec19bb38d4070

- Date: 2026-10-12T13:33:15Z
- Author: Estiban Creations
- Message:

```
fix: export typing; add Supabase migrations, login Edge Function, 75-sub-account mock seed, RLS + live E2E tests

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## c2724acf13e431631b95ef830443c252141fcb8c

- Date: 2026-10-12T13:30:05Z
- Author: Estiban Creations
- Message:

```
feat: sub-account settings — details, logins, roles, password resets, archive/delete

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 8c6e53b695952298bef0be01cde064671c47dd38

- Date: 2026-10-12T13:29:27Z
- Author: Estiban Creations
- Message:

```
feat: deals board, tasks, settings with login management, CSV export

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## a3d39f454016806b8450b9d3d6a890077b429349

- Date: 2026-10-12T13:28:24Z
- Author: Estiban Creations
- Message:

```
feat: contacts and companies (list, search, paging, create, detail, notes, archive)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## f4959b7ab29a4937c58760b25d50e17da51b30f0

- Date: 2026-10-12T13:27:13Z
- Author: Estiban Creations
- Message:

```
feat: sub-account shell, server actions, overview, contacts and companies

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 4ef6316ec26aaa5e1aa03db471a6436b5e3724ae

- Date: 2026-10-12T13:26:06Z
- Author: Estiban Creations
- Message:

```
feat: agency home, onboarding, account pages and shared record forms

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 99ed9fb17906f7c062d04ed171dc637cebab91ac

- Date: 2026-10-12T13:25:00Z
- Author: Estiban Creations
- Message:

```
feat: auth flow, PWA manifest/icons, agency dashboard for 75 sub-accounts

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 3b9b8dc48fcb7f09c0d68fb82394085545343c53

- Date: 2026-10-12T13:23:52Z
- Author: Estiban Creations
- Message:

```
feat: sculpted-paper design system stylesheet

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## fae5a1523f90ff1cf33ac0e630ef24498bcdebee

- Date: 2026-10-12T13:22:33Z
- Author: Estiban Creations
- Message:

```
feat: sculpted-paper UI components, offline service worker and brand art

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 53aab76f74a10d166d47eb5f4354c6b32229fad9

- Date: 2026-10-12T13:21:22Z
- Author: Estiban Creations
- Message:

```
feat: Supabase SSR clients, validation, CSV, session helpers and unit tests

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 6a997440629571bb881606d438966551099aac08

- Date: 2026-10-12T13:20:08Z
- Author: Estiban Creations
- Message:

```
chore: project configuration and CI templates

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

## 224c156bea3e9f0b2f767e7af764e669b53f6d49

- Date: 2026-10-12T13:19:05Z
- Author: Estiban Creations
- Message:

```
chore: initial commit

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HJKoQxrQCaq7b3A25Gkgr5
```

