# Delivery Plan — Email + Text, Phase 1 (Inbox sends)

Date: 2026-11-13. Decision: user picked "Build delivery first (email and text)" after the verified-gaps review. This plan is preparation only — no code written, no accounts created, no charges. Building starts after the provider pick below, and sending starts only after keys, verification, tests, and his switch-on.

Read-only evidence: repo `estibancreations-svg/standalone-crm` at main `2be8547`, plus provider pricing research (see Prices). Companion: `THELMA-GHL-verified-gaps-2026-11-13.md` in this folder.

## Scope: Phase 1 = Inbox outbound only

- [ ] Send queued Inbox messages on the `email` and `sms` channels only.
- [ ] Record delivery results (delivered / failed) and inbound replies (received) via provider webhooks.
- [ ] Consent + opt-out enforcement and STOP/START handling (required, not optional).
- [ ] OUT OF SCOPE in Phase 1: social-post publishing, WhatsApp/Messenger/Instagram/LinkedIn, campaign broadcasts, OAuth per app, agent/bot sending, forms, reviews, workflows, usage billing/rebilling. Those stay Next, as the blueprint lists them.

## What already exists (build on it, do not rebuild)

- [x] Delivery queue in the database: `messages.status` is `sent / queued / needs_connection / delivered / failed / received`, default `queued`. The `prepare_message()` trigger (migration 08) forces internal messages to `sent`, customer messages to `queued` — or `needs_connection` when the plan feature is missing or (for email) the workspace domain is not verified.
- [x] Status UI already built: the conversation page shows Sent / Queued / Waiting for connection / Delivered / Failed / Received pills. No UI change needed for status display.
- [x] Send actions queue honestly: `sendMessage` inserts the row and returns "Queued." for customer messages. `startConversation` inserts conversation + first message the same way.
- [x] Connection gating designed: `workspace_apps.status` (`off / requested / connected / error`); `connected` is set only by the service role after the provider's own sign-in. Keys never live in that table — they stay in the vault.
- [x] Key ingest already built: Connections page upload (JSON/text/Markdown) → `parseConnectionsFile` → saved connections with secrets encrypted, never shown again. Recognized: SMTP senders (Resend, Postmark, SendGrid, Mailgun), Twilio → `sms` kind (account SID as client id, messaging service SID as setting). Website passwords refused (SMTP password is the one exception).
- [x] Worker pattern to follow: the `payments` edge function (Deno, `--no-verify-jwt`, checks the caller's token itself, RLS read as the user, service-role writes, HMAC webhook verification with timestamp freshness, idempotency key, plain-word errors, OFF switch in a settings table).
- [x] Compliance check reusable: `complianceFlags` + the database `compliance_flags` guard already block approval of flagged marketing wording. Phase 1 reuses the same rules for outbound message review where the design calls for it; it does not invent new wording rules.
- [x] Sender identity columns exist: `messages.from_mailbox` (mailbox reference). The UI does not set it today; the worker defaults to the workspace's mailbox address on its verified domain (build detail, confirm in code review).

## Policy boundary (Operating Policy, APPROVED and IN EFFECT 2026-10-17)

- Sending a message/email/SMS, publishing a post, connecting an app/OAuth, charging a card, putting a site live, and deleting data ALWAYS go through the T.H.E.L.M.A. approval queue for external helpers/agents — never direct. Leadstack direct writes cover internal CRUD only.
- Enforcement in this build: the delivery worker sends ONLY messages created by signed-in workspace members through the app's own UI (sender = authenticated member, workspace from session, RLS underneath) — the same standing as the existing Stripe checkout. Anything filed by a bot, agent, or outside helper goes through `thelma-gateway` into `thelma_requests` and waits for Owner approval. The T.H.E.L.M.A. executor is a separate Next item; Phase 1 does NOT build agent sending.
- Every send writes an auditable record (message status + provider result + audit rows already written by triggers). No send without a record.

## What gets built (fix in place)

Phase 0 — Decisions (this plan). No code until D1–D5 are answered.

Phase 1a — Migration (needs his approval; no Supabase writes without his say-so):
- [ ] Contact consent/opt-out columns (email + SMS separately; opt-out timestamp + source). No consent fields exist today — repo search for consent/opt-out/unsubscribe/STOP: zero hits.
- [ ] Scoped service-role-only RPC for the worker to read delivery keys for one agency (follows the `connections_for_apply` RPC pattern). Keys never reach the browser or Vercel.
- [ ] Message provider fields: provider message id, provider error text, delivered/failed timestamps. (Confirm exact columns in code review; do not widen the messages table beyond what delivery needs.)
- [ ] Delivery settings table per agency (mirror `payment_settings`): delivery OFF by default; Owner switches on only after keys + verification pass. Usage log: one row per send attempt (workspace, channel, provider result, cost when the provider reports it) for the future usage addon. Billing/rebilling itself is out of scope.
- [ ] Migration-number caution: main has migrations 01–08; the unmerged v2.1 branch (PR #5, do NOT merge) already uses 09–11. The delivery migration number is set at build time after reconciling with that branch. Do not assume 09 is free.

Phase 1b — Delivery edge function (new, follows the payments pattern):
- [ ] Claim `queued` messages atomically (one claim per message; no double-send on retry or duplicate invoke).
- [ ] Pre-send checks, in order: delivery switched on for the agency → plan feature for the channel → app connected (Twilio) / domain verified (email) → contact not opted out → recipient address/number present and valid.
- [ ] Send via Twilio Messages API (SMS) and Resend emails API (email) — or the picked alternatives. One provider call per message. Idempotency key per message id.
- [ ] Update status to `sent`, then `delivered` / `failed` from provider webhooks. Webhooks verify HMAC signatures + timestamp freshness (payments pattern). Failed sends keep the provider's error in plain words, never raw payloads in the UI.
- [ ] Inbound webhooks: Twilio inbound SMS → `received` message rows in the matching conversation (create the conversation row only when the sender matches a contact in that workspace; otherwise hold for review — confirm matching rule in code review). STOP / START / STOPALL handling sets/clears SMS opt-out immediately and replies with the required confirmation wording. Email bounces/complaints via Resend webhooks mark the message failed and flag the contact (confirm webhook event set in code review; if a feed is unavailable, failed-on-error only, stated honestly).
- [ ] Never send a `needs_connection` message. Never send for a workspace whose app is not `connected`. Never send to an opted-out contact.

Phase 1c — App wiring (minimal, existing design):
- [ ] After a message is queued, invoke the worker (recommended: server action invokes the function right after insert, so sends go out immediately; no cron infrastructure in Phase 1). If the worker is unreachable, the message stays `queued` and the user sees Queued — never a false Sent.
- [ ] Retry for `failed` messages: small "Retry" control on failed messages in the conversation view, same design language, re-queues through the same checks. (Only addition to the Inbox UI in Phase 1.)
- [ ] No changes to the Sculpted Paper design, nav, or plan flags in Phase 1.

Phase 1d — Tests before any real send (TEST-ALL standard):
- [ ] Isolation: cross-workspace send denied; missing plan feature denied; unconnected app denied; opted-out contact refused; agent-filed send refused without Owner approval.
- [ ] Safety: double-invoke sends once; bad webhook signature rejected; stale webhook rejected; oversized/empty body rejected.
- [ ] Live test run on the test project only, to his own email + phone first: one email, one text, one STOP, one reply, one failure. Owner switch-on only after the test run passes.
- [ ] Negative tests from the Operating Policy evidence list that this build can cover (undelegated denied, cross-workspace denied, audit present) are run and recorded. The persistent audit-sink item remains open for the MCP track; it does not block user-initiated delivery.

## Providers + prices (direction for the pick — re-verify at signup)

No Twilio/Resend pricing research existed in the repo (provider facts covered Stripe/FaceTime/Zoom only). Figures below are secondary summaries of the vendors' own pricing pages, checked July–October 2026. They are for choosing a direction, not a quote. Re-verify on the vendor pricing page before creating an account or funding anything.

Email — Resend (recommended; named first in the codebase for the SMTP sender; API + SMTP relay; DKIM/SPF/DMARC included):
- Free: $0, 3,000 emails/month, 100/day cap. Enough to build + test with.
- Pro: $20/month, 50,000 emails, $0.90 per extra 1,000. Pro $35/month: 100,000 emails. Scale from $90/month. Monthly billing only.
- Sources: resend.com/pricing via https://www.budgetforge.dev/tools/resend-pricing-2026 (July 2026), https://email-sdk.dev/blog/resend-pricing (Oct 2026), https://apis.io/providers/resend/ (Oct 28, 2026).
- Alternatives named in code: Postmark, SendGrid, mail host (Microsoft 365 / Google Workspace SMTP). Postmark entry paid tier was reported at $15/month for 10,000 emails (Oct 7, 2026 comparison). If he prefers one, the worker's email client swaps; the queue, checks, and webhooks stay the same.

Text — Twilio (recommended; the only SMS provider named anywhere in the codebase and plans):
- US SMS: $0.0083 per segment, both directions, plus carrier pass-through fees $0.0035–$0.005 per outbound segment. Effective roughly $0.012–$0.013 per single-segment message.
- Number rental: local long code $1.15/month; toll-free $2.15/month. Plan design is one Twilio number per sub-account.
- A2P 10DLC registration (US, carrier-required for business texting on long codes): brand registration about $4–$4.50 one-time; campaign $1.50–$10/month; approval commonly 1–3 weeks. Registration is the long-lead item — start it first if Twilio is picked.
- Sources: https://textbee.dev/blog/twilio-pricing-real-cost-breakdown (Oct 22, 2026), https://www.zavu.dev/en/blog/twilio-sms-pricing (Aug 2026), https://hivebook.wiki/wiki/twilio-sms-pricing (Oct 3, 2026).
- Spend note: Twilio is pay-as-you-go with no contract/minimum reported. No account is created and nothing is funded until he explicitly approves the priced steps. The usage addon in plans ("texts, calls, email sends and AI — at cost + margin, margin to be set") is his pricing call and is not build-blocking for the Owner copy.

## Decisions needed before building

- [ ] D1 — Email sender: Resend (recommended) / Postmark / SendGrid / mail-host SMTP. Blocks the email client + webhook set.
- [ ] D2 — Text provider: Twilio (recommended, as designed) / other (he names it). Blocks the SMS client + number/registration steps. If Twilio: approve starting A2P 10DLC registration early (1–3 weeks, fees above).
- [ ] D3 — Keys route: upload via the existing Connections page into the vault (recommended; no new secret UI) / Supabase function secrets via installer. Blocks the key-read design.
- [ ] D4 — Spend approval: Resend Free ($0) to start; Twilio pay-as-you-go + number + 10DLC fees as priced above, re-verified at signup. Picking providers does NOT approve spend — the priced account/funding steps come back for his explicit go, one batch.
- [ ] D5 — First-sends scope: Inbox email + SMS only (recommended) / add scheduled-post publishing to Phase 1 (not recommended — needs OAuth per app, a separate Next item).
- [ ] D6 — Acknowledge: consent/opt-out + STOP handling ship in Phase 1 and add one migration + webhook work. No sends to opted-out contacts, ever. (Included, not optional; no separate pick needed.)
- [ ] D7 — Acknowledge: agent/bot sends stay approval-gated per Operating Policy; Phase 1 sends only what signed-in members send from the app. (Included, not optional.)

## Whose steps (credential-gated parts)

- Provider accounts, phone numbers, 10DLC registration, domain DNS records (SPF/DKIM/DMARC), and key uploads live in HIS accounts. Per the credential-handoff rule, he gets exact self-service steps first (account URL, menu path, button, confirmation to expect), verified against the provider's current help pages once providers are picked — steps are not guessed in advance. The assisted route (browser sign-in help) is offered beside it, never alone, and never pressed after hesitation.
- Keys: he uploads the connections file in the CRM (Connections → Upload connections) or hands the installer the file; keys go to the vault encrypted and are never shown again, never pasted in chat. No raw key is ever asked for in chat.
- Function deploy + function secrets (if D3 picks that route) are installer steps run with the Supabase CLI (`supabase functions deploy <name> --no-verify-jwt`, per the handbook). Code reaches GitHub via batched commits with approval cards; deploy itself is not promised from chat. Exact deploy commands ship with the build.

## Standing constraints

- Fix in place in `standalone-crm`; never recreate. No Supabase writes or table creates without his say-so (migration approval is part of D-phase sign-off). PR #5 (v2.1) NOT merged — do not merge until he says OK. Stack/batch GitHub writes into as few commits/cards as possible; reads need no approval. No merges, no deploys, no charges without his explicit go on that step. Delivery stays OFF until keys + verification + tests pass and he switches it on.
