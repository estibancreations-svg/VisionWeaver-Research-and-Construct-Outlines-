# T.H.E.L.M.A. CRM — Delivery Deploy + Keys Steps (v4.1)

Prepared 2026-11-14. Code: Draft PR #11 (`delivery/email-sms-v41`, commit `62cda85`).
Nothing here creates an account, spends money, or sends a message. Each priced step
is marked. Say the word before any charge — the priced batch is §8.

Steps were checked 2026-11-14 against Resend, Twilio, and Supabase's current
documentation and against the repo's own code (Connections upload, vault parser,
delivery worker). Where sources disagreed on a fee, the guide gives the range and
says the provider's console controls. Never paste a key into chat — keys go only
into the places named below.

Order matters. Start the Twilio 10DLC registration FIRST — it is the long wait
(10–15 days right now). Everything else can proceed while it is pending.

---

## 0. Pick the Supabase project (your call — nothing assumed)

The delivery code needs a Supabase project to live in. The old test project,
`standalone-crm-test` (ref `csxtrhwzswluismrayen`), is INACTIVE — you paused it
yourself, and it stays untouched unless you say otherwise.

- **Option A:** Resume `standalone-crm-test` in the Supabase dashboard and deploy
  there for testing. (Resume is your tap in Supabase; nothing here resumes it.)
- **Option B:** Use a different project (for example a fresh per-client project,
  which is the handbook's primary model).

Every command below uses `<project-ref>` — the short ID in the project URL
(`https://<project-ref>.supabase.co`). Find it in the Supabase dashboard URL.

You also need your **agency UUID** for the webhook URLs (§6) and the switch-on
(§7). In Supabase Dashboard → SQL Editor, run:

```sql
select id, name from public.agencies;
```

Copy the UUID for your agency. Keep it handy — it goes in the webhook URLs.

---

## 1. Resend — free email sending ($0)

1. Sign up at [resend.com](https://resend.com). No card needed for the Free plan:
   3,000 emails a month, 100 a day, 3 domains, 1 webhook endpoint. (Pro is
   $20/month for 50,000, only if you outgrow Free.)
2. **Pick a region before adding a domain.** The region sets where mail sends
   from, and changing it later means removing and re-adding the domain.
3. **Domains → Add Domain.** Enter the domain you will send from (root domain
   or a sending subdomain — Resend recommends a dedicated sending subdomain so
   bulk mail doesn't touch your root domain's reputation).
4. **Add the DNS records Resend shows you** at your DNS host (registrar, or
   wherever your nameservers point). Copy each record EXACTLY as the dashboard
   shows it — type and value. Resend has changed record shapes over time (older
   domains get TXT + MX; newer ones may get CNAMEs), so never copy an example
   from a guide. Expect a DKIM record plus SPF/return-path records. Do NOT turn
   on Cloudflare proxying (orange cloud) for a CNAME record — it blocks
   verification.
5. Click **Verify**. Often under 15 minutes; can take up to 72 hours. If it
   stalls past 72 hours, use Resend's "Restart verification" button.
6. After verification, add a **DMARC** record (recommended, not required to
   verify). Start at monitoring: `v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com`
7. **API Keys → Create API Key.** Choose **Sending access** (least privilege —
   the worker only sends) and, if offered, restrict it to your sending domain.
   **Copy the key immediately** — Resend shows it once. It starts with `re_`.
   Save it in your password manager for now; it goes into the CRM in §4.
   Do NOT use the `onboarding@resend.dev` test sender for real mail — before a
   domain is verified it can only send to your own account email.
8. **Webhooks** come after the function deploys — see §6. (Free includes 1
   webhook endpoint, which is exactly what delivery needs.)

---

## 2. Twilio — texting (priced — approval needed, see §8)

1. Sign up at [twilio.com](https://www.twilio.com) and **upgrade to a paid
   account**. Trial accounts cannot text unverified numbers, and 10DLC
   registration requires a paid account. Add a payment method in the Console.
2. **Buy a local number:** Console → Phone Numbers → Buy a Number. Pick a US
   local number with SMS turned on. About **$1.15/month**. (Toll-free is about
   $2.15/month but follows a separate verification process — local + 10DLC is
   the path this build assumes.)
3. **Create a Messaging Service:** Console → Messaging → Services → Create.
   Name it (e.g. "THELMA CRM"), add your number to its Sender Pool, and copy
   the **Messaging Service SID** (starts with `MG`). The worker sends through
   the Messaging Service, which is what keeps texts routed through your
   approved campaign.
4. **Start 10DLC registration NOW — the long wait.** Console → Messaging →
   Trust Hub:
   - **Customer Profile** → create one for your business.
   - **A2P Brand Registration** → register your brand. Brand fee about
     **$4–$4.50** one-time (Sole Proprietor / Low-Volume Standard). A Standard
     brand costs more (about $44–$46 with vetting — the Console shows the exact
     charge). Twilio texts a verification code to the authorized contact's
     mobile.
   - **A2P Campaign Registration** → describe what you send and why, with your
     opt-in evidence and sample messages. Campaign vetting is **$15 one-time,
     non-refundable per submission** — a rejection + resubmission pays again,
     so write the description carefully. Monthly campaign fee **$1.50–$10**
     depending on use case (Sole Proprietor: $2/month).
   - **Reviews are currently taking 10–15 days** (Twilio's onboarding guide).
     Plan on 1–3 weeks. Until the campaign is approved and your number is
     attached to it, US texts from the number are blocked (error 30034).
   - After approval, attach the number to the campaign (Trust Hub → your
     campaign → Add Phone Numbers) and confirm it sits in the Messaging
     Service's sender pool.
5. **Copy your credentials:** Console home → Account Info shows your **Account
   SID** (starts with `AC`) and **Auth Token**. Save both in your password
   manager for now; they go into the CRM in §4. Never share the Auth Token in
   chat or email.
6. **Incoming webhook** comes after the function deploys — see §6.
7. **Per-text cost once live:** $0.0083 per segment, sent or received, plus a
   carrier fee of $0.0035–$0.005 per message depending on the carrier. A plain
   160-character text is 1 segment; longer or special-character texts cost more
   segments. The worker logs every send in `delivery_usage_log` so usage is
   auditable.

---

## 3. Get the code onto the project (Supabase CLI — your machine)

You need the Supabase CLI on a computer with the repo checked out. Install it
from [supabase.com/docs/guides/cli](https://supabase.com/docs/guides/cli)
(`npm i -g supabase`, `brew install supabase/tap/supabase`, or the Supabase
installer for your OS).

```bash
# 1. Check out the delivery branch (PR #11 is still a draft — do not merge
#    until testing passes and you say OK).
git checkout delivery/email-sms-v41

# 2. Sign in and point the CLI at your project from §0.
supabase login
supabase link --project-ref <project-ref>

# 3. Apply the database changes FIRST (migration 12: opt-outs, delivery
#    switch, vault keys function, usage log). Functions second — never reverse
#    the order; the function reads tables the migration creates.
supabase db push
```

If `supabase db push` asks for the database password, it is the one set when
the project was created (Supabase Dashboard → Project Settings → Database).

---

## 4. Upload the keys into the CRM vault (Connections file)

Keys live encrypted in Supabase Vault. The CRM never shows them again — only
their last 4 characters. Upload happens on the **Connections** page
(agency-level, Owner/agency-admin only):

1. In the CRM, open **Connections** (from the agency home).
2. Scroll to **Upload connections**. Paste the JSON below into the paste box
   (or save it as a `.json` file and upload it — max 64 KB). Replace the
   `PASTE-…` placeholders with the real values from §1 and §2. Uploading a name
   that already exists replaces it.
3. Press upload. You should see "Saved 2 connections, locked away encrypted."

```json
{
  "connections": [
    {
      "name": "Resend email",
      "type": "api_key",
      "provider": "resend",
      "site": "https://resend.com",
      "api_key": "PASTE-RESEND-API-KEY"
    },
    {
      "name": "Phone texts (paid)",
      "type": "sms",
      "provider": "twilio",
      "site": "https://console.twilio.com",
      "account_sid": "PASTE-ACCOUNT-SID",
      "auth_token": "PASTE-AUTH-TOKEN",
      "message_service_sid": "PASTE-MESSAGING-SERVICE-SID"
    }
  ]
}
```

Notes, verified against the upload code:

- The Resend entry uses the generic API-key shape (`provider: "resend"`,
  `api_key`). That is the contract the delivery worker reads. The email
  domain comes from each sub-account's settings, not from this file.
- The Twilio entry must include `message_service_sid` — the worker sends
  through the Messaging Service, and the vault upload has no field for a
  bare sending number. (An earlier draft of the delivery plan suggested a
  `from_number` setting could be uploaded; the upload code drops unknown
  fields, so that does not work. Messaging Service SID is the supported path.
  A one-line parser fix could add `from_number` later if ever needed.)
- Do NOT press **"Switch on uploaded sign-in options"** for delivery. That
  button applies sign-in providers (Google, Apple, phone sign-in codes) to
  Supabase Auth — a different job. Delivery reads the vault directly and needs
  no apply step. The Twilio connection may show "Stored" rather than "On" —
  that is fine for delivery.
- The file itself is not kept after upload. Keep your copies in your password
  manager.

---

## 5. Deploy the delivery worker + its secret

Back in the terminal, in the repo on the `delivery/email-sms-v41` branch,
with the CLI still linked (§3):

```bash
# 1. Run the SQL tests FIRST, in Supabase Dashboard → SQL Editor:
#    paste supabase/tests/delivery_features.sql and run it.
#    It runs in one transaction and rolls back — it changes nothing.
#    It must end with: ALL DELIVERY TESTS PASSED
#    If any line says FAIL, stop and send me the failing line.

# 2. Deploy the worker. --no-verify-jwt is required: Twilio and Resend call
#    this function directly, and the worker verifies their signatures itself.
supabase functions deploy delivery --no-verify-jwt
```

The webhook signing secret comes after §6 (Resend shows it when you create the
webhook). Once you have it, set it — do NOT put it in any file:

```bash
supabase secrets set RESEND_WEBHOOK_SECRET=whsec_PASTE-SIGNING-SECRET
```

(Twilio needs no function secret — the worker verifies Twilio signatures with
the Auth Token already in the vault.)

---

## 6. Paste the webhook URLs (exact — including `?agency=`)

Your function lives at:

```
https://<project-ref>.supabase.co/functions/v1/delivery
```

Build the two webhook URLs with your agency UUID from §0:

```
https://<project-ref>.supabase.co/functions/v1/delivery/webhooks/twilio?agency=<agency-uuid>
https://<project-ref>.supabase.co/functions/v1/delivery/webhooks/resend?agency=<agency-uuid>
```

**Resend:** Dashboard → **Webhooks → Add Webhook**. Paste the Resend URL.
Subscribe to exactly these events: `email.delivered`, `email.bounced`,
`email.complained`. (The worker ignores anything else.) Copy the **Signing
Secret** (starts with `whsec_`) and set it as in §5 step 2. The secret is
shown on the webhook's details page afterwards if you need it again.

**Twilio:** Console → Messaging → Services → your service → **Integration**
(or Phone Numbers → your number → Messaging). Set the incoming-message
webhook ("A message comes in" / "Inbound Settings → Request URL") to the
Twilio URL, method **POST**. Delivery receipts need no separate setup — the
worker attaches its own status callback to every text it sends.

If a webhook URL is pasted without `?agency=`, the worker refuses the call —
the agency check is what keeps one agency's receipts out of another's data.

---

## 7. Test, then switch on (in this order)

1. **Keep delivery OFF.** The switch defaults to off; nothing sends while off.
2. In the CRM Inbox, queue one test email to your own address and one test
   text to your own phone. They will sit Queued — that is correct while off.
3. **Switch on TEST mode** (SQL Editor, as the signed-in Owner — the switch
   refuses anyone else):

```sql
select public.set_delivery_settings(
  '<agency-uuid>'::uuid, 'test', true, true);
```

4. Retry the queued messages (Inbox → "Try again"). Confirm: the email
   arrives, the text arrives, the Inbox pills change to Delivered, and a reply
   text to your Twilio number lands in the Inbox as a received message.
5. Text **STOP** to your Twilio number from your phone, then check the contact
   shows opted out of texts. Text **START** to clear it. (Email opt-out is
   driven by spam complaints via the Resend webhook.)
6. Check **the other agency sees nothing**: sign in as a member of a different
   sub-account/agency and confirm no test messages, receipts, or usage rows
   leak across.
7. Only when every check passes, switch to **LIVE**:

```sql
select public.set_delivery_settings(
  '<agency-uuid>'::uuid, 'live', true, true);
```

To turn a channel off later, call the same function with `false` for that
channel (`'live', true, false` = email on, texts off). To turn everything off:
`('off', false, false)`. Messages queued while off stay queued — they are
never auto-sent by flipping the switch; retry them deliberately.

---

## 8. What it costs — the priced batch (approve before spending)

| Item | Cost | When |
|---|---|---|
| Resend Free | $0 | — |
| Resend Pro (only if you outgrow 3,000/mo) | $20/mo | Later, your call |
| Twilio local number | ~$1.15/mo | At number purchase |
| Twilio 10DLC brand (Sole Prop / Low-Volume) | ~$4–$4.50 once | At brand registration |
| Twilio 10DLC brand (Standard, if applicable) | ~$44–$46 once | At brand registration |
| Twilio campaign vetting | $15 once, non-refundable | Per campaign submission |
| Twilio campaign monthly | $1.50–$10/mo ($2 Sole Prop) | Monthly after approval |
| Twilio texts | ~$0.012–$0.013 per message | Per send/receive |
| Supabase CLI / function deploy | $0 new | — |

First-month estimate for the cheapest start (local number + Sole Prop brand +
vetting + campaign + a few dozen test texts): roughly **$22–$25 one-time plus
~$3/month ongoing**, before text usage. Re-check every price in the Console at
the moment you pay — the Console controls.

**Nothing in this guide has been charged.** The Twilio upgrade, number,
brand, and campaign steps are yours to approve one batch at a time. Say the
word and start §2, or tell me to walk a step with you.

---

## 9. If you want help on a step (assisted route)

Every step above is written to do yourself, in your own accounts. If any step
sticks — a DNS record that won't verify, a 10DLC rejection, a CLI error — tell
me which step and what you see, and I will walk it with you or take the
browser with you. I will never ask for a password or key in chat; anything I
need you to paste goes only into the provider's own page or the CRM's
Connections upload.

## Sources (checked 2026-11-14)

- Resend: domain setup + DNS records, API key permissions, webhook signing
  (resend.com/docs, resend.com/pricing via current summaries).
- Twilio: A2P 10DLC overview + Trust Hub registration, SMS pricing, Messaging
  Services, webhook security (twilio.com/docs, help.twilio.com fee article).
- Supabase: CLI reference — `link`, `db push`, `functions deploy
  --no-verify-jwt`, `secrets set` (supabase.com/docs).
- Repo: `src/app/(agency)/connections/page.tsx`,
  `src/lib/connections.ts` (upload parser),
  `supabase/functions/connections/index.ts` (Twilio contract),
  `supabase/functions/delivery/index.ts` (PR #11, webhook paths + event names),
  `docs/INTEGRATIONS.md`.
