# T.H.E.L.M.A. CRM vs GoHighLevel — Verified Gaps (inside the pages)

Date: 2026-11-13. Scope: read-only. Repo `estibancreations-svg/standalone-crm` at main `2be8547`, 37 files read in full (all workspace pages, server actions, lib, key docs) plus repo-wide code search. No commits, no Supabase writes, no merges. Live sign-in page verified loading earlier the same day; no signed-in click-through was done, so verdicts are code-verified, not live-tested.

GoHighLevel reference: the ematch homepage's five jobs — get leads, build relationships, close deals, create fans, win people back.

## The central pattern: nothing sends

- [x] Verified: the only outbound calls in all workspace server actions are `manage-logins` (sign-ins) and `payments` (Stripe checkout). Every other action inserts or updates database rows only.
- [x] Verified: `docs/INTEGRATIONS.md` states keys can be stored in the vault but "nothing sends CRM data out."
- [x] Verified: `docs/BUILD_BLUEPRINT.md` lists as Next (v4.1): delivery workers (email/SMS/social), OAuth per app, T.H.E.L.M.A. executor, website publisher, forms, reviews, workflows, API.
- [x] Verified: Inbox copy — "Messages to customers wait until that channel is connected and included in the plan." Marketing copy — "posts go out only to pages connected under Apps." Apps copy — "Nothing sends CRM records to an app until it shows Connected."

T.H.E.L.M.A. is a strong system of record and planning. It is not yet a system of delivery.

## 1. Get leads

- [x] REAL — CRM core: contacts (tags, import 1–2,000 rows, companies, notes/tasks/deals per contact), deals pipeline board (stages with probability, move, won/lost), tasks.
- [ ] ABSENT — Forms, surveys, quizzes. Repo-wide search: 0 hits. Forms are explicitly Next in the blueprint.
- [ ] PARTIAL — Websites, funnels, landing pages. Website page is an outline planner only ("the installer builds and publishes it"). No builder, no funnels, no landing pages. Publisher is Next.
- [ ] ABSENT — Webinar funnels. 0 hits.
- [ ] ABSENT — Chat widget / Conversation AI. No widget, no bot. The T.H.E.L.M.A. page is an approval gate (Owner approves/rejects asks); the executor is Next. A `thelma-gateway` edge function exists in the repo.
- [ ] ABSENT — Voice AI. No voice feature in app code; repo "voice" hits trace to "invoice" and competitor research docs.
- [ ] ABSENT — Call tracking, missed-call text-back as automation. "Missed call follow-up" exists only as SMS template text in the bail-bonds industry kit.
- [ ] STORED ONLY — Inbound SMS and social DMs. Inbox accepts email, SMS, WhatsApp, Messenger, Instagram, LinkedIn, webchat, Zoom, FaceTime as channel labels; messages are stored and wait for connection + plan. No delivery workers.
- [ ] PARTIAL — Social planner. Draft/schedule posts with compliance check + admin approve, gated by the `social_planner` plan flag. No delivery until workers land.
- [ ] ABSENT — AI business-card scanner, QR codes, prospecting tool. 0 hits.
- [ ] PLANNING ONLY — Ad Manager. Campaigns are planning records (channel, objective, budget, UTM, headline, ad text) with approve/pause. No ad-platform API.

## 2. Build relationships

- [ ] SHELL — Consolidated conversation stream. One inbox list; team chat messages are stored and work internally; customer messages are stored-not-sent until the channel is connected and on-plan.
- [x] REAL — Sales pipelines (see §1).
- [ ] ABSENT — Workflows and automations. Repo "workflow" hits are docs and CI (GitHub Actions) only; no builder, no triggers beyond database audit triggers. "Automation/broadcast" search: 0 hits.
- [x] REAL (basic) — Calendars. Appointments with manual Zoom/FaceTime link paste. No reminders, no booking page, no calendar sync, no paid calendar.
- [ ] ABSENT — Appointment reminders as sends. Reminder texts exist only as industry-kit template wording.
- [ ] ABSENT — Ringless voicemail, automated outbound call connect. "Voicemail": 0 hits.
- [ ] PWA ONLY — Mobile app. Manifest + service-worker registration + "put it on your home screen" guide. No native app, no video messages.

## 3. Close deals

- [ ] ABSENT — Lead scoring. Repo search: 0 hits. Closest primitives that exist: per-stage probability on pipeline stages, and contact status (lead / qualified / customer / inactive).
- [ ] ABSENT — Estimates and proposals as documents. "Proposal" and "Estimate" appear only as pipeline stage names in industry templates.
- [x] REAL — Invoicing. Invoices table (draft/open/paid/void), Stripe checkout via the `payments` edge function: card, Apple Pay, Google Pay, Link, bank transfer. Cash/check marking exists.
- [ ] ABSENT — Text-2-Pay, Tap-2-Pay, order forms, upsells/downsells, gift cards. 0 hits.
- [ ] PARTIAL — Membership offers / courses. Courses + lessons + community board exist and work, free and internal. No paid access gating, no membership offers.
- [ ] ABSENT — Paid calendars (see §2).

## 4. Create fans

- [ ] FLAG ONLY — Reputation / review requests. `reviews` is a Growth-plan flag with the label "Review requests," but no page, table query, or request flow checks or uses it. "Reviews" elsewhere is only a campaign-objective label and a Google Business app description. Reviews are explicitly Next in the blueprint.
- [ ] ABSENT — Automated review requests, review widgets, video review capture/widgets, AI review reply, auto-review posts.
- [ ] ABSENT — Affiliate manager. 0 hits.
- [x] REAL (internal) — Communities. Community board per sub-account (posts, pin, remove). Internal to the sub-account, not a customer membership community.
- [ ] ABSENT — Loyalty programs. 0 hits.

## 5. Win back

- [ ] ABSENT — Broadcast campaigns (email/SMS/WhatsApp/Messenger). 0 hits. Marketing campaigns do not send.
- [ ] PRIMITIVE ONLY — Smart lists / segmentation. Contact tags exist (free-text + suggested tags in Settings; "add tags so you can find groups later"). No saved lists, no segmentation builder.
- [ ] ABSENT — Automated birthday / seasonal campaigns, database reactivation sends.
- [ ] TEMPLATES ONLY — Reactivation wording. Industry kits (bail bonds, insurance, financial, general) include follow-up, renewal, and reminder email/SMS template text. No sending or sequencing.
- [ ] ABSENT — Newsletter automation, Content AI. `content_templates` holds ad/social/email/SMS/script/outline text; nothing generates or sends it.

## Plan-flag drift (needs his call)

- `reviews`, `api`, and `thelma_agents` are plan flags/labels with no checking UI in any page read (only generic Apps gating). `social_planner`, `ads`, `payments`, and `zoom` flags ARE checked and real.
- Do not silently remove flags. Either build the feature behind the flag or remove the flag from plan marketing — his decision.

## Other verified facts

- Mail page is mailbox/domain administration only (3 included addresses, domain DNS status, installer provisions Microsoft 365 / Google Workspace). It is not an email client and sends nothing.
- Export is a route handler (`src/app/w/[ws]/export/route.ts`), not a page — no `page.tsx` exists there.
- Edge functions in repo (7): account, connections, handoff, manage-logins, payments, setup-owner, thelma-gateway. The integrations doc table lists 5; payments + thelma-gateway are present in the repo but not in that table (minor doc drift).
- Settings covers sub-account details, branding, logins, archive/delete. No automations, reminders, or notification settings.
- Mock data note: `docs/MOCK_DATA.md` seeds a test project (75 sub-accounts, 750 contacts, 450 deals/tasks). Production projects use an empty-owner seed instead. Do not treat demo counts as production data.

## Recommended batches (fix in place, no rebuild)

Batch A — Delivery first (makes stored things send): delivery workers for email/SMS/social, OAuth per app, sends gated by real connection status. NEEDS his decisions first: providers (Twilio? SMTP sender? Meta?), keys, and spend. Per `docs/INTEGRATIONS.md`, any integration touching client records needs its own scoped request, security review, and isolation tests. No sending starts on assumption.

Batch B — Scoring and lists first (no providers needed): lead score field + rules from stage/tags/activity, smart lists built from existing tags, internal follow-up automation (stored tasks on stage change / overdue), reminder records queued for delivery when Batch A lands. Needs his approval for any table/migration changes. No Supabase writes without his say-so.

Batch C — Fans + win-back (depends on A): real review-request flow behind the `reviews` flag, broadcasts over saved segments, birthday/seasonal queues, referral/affiliate + loyalty records.

Standing constraints: fix in place in `standalone-crm` (+ prototype artifact where it mirrors live); never recreate. PR #5 (v2.1) NOT merged — do not merge until he says OK. Stack/batch GitHub writes into as few commits/cards as possible. TEST-ALL standard before calling anything live.
