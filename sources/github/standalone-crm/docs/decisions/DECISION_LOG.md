# Decision log — T.H.E.L.M.A. CRM Complete

Every decision Sire (Owner) made while building this system. "Proposed" items still need his answer.
Don't reverse a decision here without asking him.

| Date | Decision | Notes |
|---|---|---|
| Oct 12, 2026 | Build a standalone CRM: one agency, up to 75 client sub-accounts, installable mobile web app | Next.js + Supabase + Vercel (Supabase/Vercel replaced n8n) |
| Oct 12, 2026 | Test run with 75 mock sub-accounts in one database; production = one paid Supabase project per client (Model B, primary) | |
| Oct 12, 2026 | Visual style: "Sculpted Paper" (gray paper sculpture, mustard, walnut) | Later looks: Professional Greyscale, Stealth, Auto |
| Oct 13, 2026 | Executive Owner set up by email; installer stays as a **visible** backup admin | Visibility chosen for trust |
| Oct 13, 2026 | **T.H.E.L.M.A. AI Fail Safe**: backup admin can only be removed with a one-time release code the installer creates | Also put the rule in client contracts (have a lawyer check wording) |
| Oct 13, 2026 | Two-step sign-in required for Owner, admins and backup admin; encrypted connections vault | |
| Oct 14, 2026 | Compare against GoHighLevel / Leadstack public projects for **missing features only**; take nobody's code | |
| Oct 14, 2026 | T.H.E.L.M.A. is in every system; works with internal assistant bots, chat bots and agents inside the air gap; outside agents only through a gated, zero-trust door; Sire approves all moves | Sealed vs Gated modes: **proposed**, awaiting choice |
| Oct 14, 2026 | Controlled meeting connection is **Zoom** (not Skype — mis-speak) | |
| Oct 14, 2026 | Email for everyone; text (SMS), FaceTime and Zoom on the higher-paid tier | |
| Oct 14, 2026 | 3 business email addresses per sub-account: Owner, Admin, Accounting; extras on request, billed | Addresses use the client's business name/domain |
| Oct 14, 2026 | Internal messaging between users with role-based ("slotted") access | |
| Oct 14, 2026 | Owner sees every user's usage and progress, dashboard style | |
| Oct 14, 2026 | **Layout locked**; users may change the color scheme only | |
| Oct 14, 2026 | Add advertising and templates; industry setups for bail bondsmen, insurance brokers, financial brokers, restaurants and more | Build order: bail bonds, insurance, advertising, social connectors |
| Oct 14, 2026 | Connectors: WhatsApp, LinkedIn, all social platforms, Google Drive, Dropbox, Outlook-style email | |
| Oct 14, 2026 | Websites: 1 per sub-account now (demo + Owner account); cap 6 per owned account at go-live; higher tiers get more | Tier details still to discuss |
| Oct 14, 2026 | Courses and communities included so clients learn the system; keep the first-sign-in walk-through as reference | |
| Oct 14, 2026 | Payments off in the Owner's own copy; on for paying end users by tier | |
| Oct 14, 2026 | Pricing about **30% under GoHighLevel**; Claude decides tiers; numbers are **suggested** until set | Essentials $67 · Growth $207 · Pro $347 per month |
| Oct 14, 2026 | Payment methods: Stripe, Google Pay, Apple Pay, Tap to Pay | Tap to Pay needs a native app or Stripe's app |
| Oct 14, 2026 | Rename to **T.H.E.L.M.A. CRM Complete**, label **Version 2.0**; retire and lock old versions; home repo = `standalone-crm` | Acronym: Trusted Hub for Engagement, Leads, Marketing & Automation (default pick; Owner may change) |
| Oct 14, 2026 | Clear old Vercel versions so everyone uses Version 2.0 | Deletions wait for Owner approval (`docs/VERCEL_CLEANUP.md`) |
| Oct 14, 2026 | Add to the Master CEO Dashboard | Waiting on the dashboard repository |
