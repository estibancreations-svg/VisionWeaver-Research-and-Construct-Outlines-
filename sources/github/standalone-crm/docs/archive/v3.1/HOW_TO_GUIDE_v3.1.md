> **RETIRED — kept for the record only. Do not deploy from this file.** Current system: T.H.E.L.M.A. CRM Complete, Version 2.0 — see `/START_HERE.md`.

# How to Use Your CRM — Simple Guide (v3.1)

*Written so anyone can follow it. No tech skills needed.*

## The big idea (an analogy)

Think of your CRM like an **apartment building**.

- **The Owner** has the master key and can walk into any of the **75 apartments**.
- Each **apartment is a client sub-account** (one business) with its own contacts, companies, deals,
  tasks and notes.
- Each **client gets their own key** (a login). Their key opens **only their apartment**.
- The **building checks every key at every door**. Guessing another apartment number doesn't help.
- **Two-step sign-in** is a second lock: your password **plus** a 6-digit code from your phone that
  changes every 30 seconds.

## 1. Your first sign-in (the walk-through)

1. Open the **sign-in link** from your email (it works once). Or go to
   **https://standalone-crm-nine.vercel.app** and sign in.
2. The CRM walks you through only the steps you need:
   - **Accept ownership** — if someone set the CRM up for you.
   - **Who owns this CRM?** — if you installed it for someone else, type **their** email. Otherwise tap
     **I'm the Owner — keep this email**.
   - **Choose a password** — 10+ characters with a letter and a number.
   - **Turn on two-step** — required for owners and admins. Install a free app (Google Authenticator,
     Microsoft Authenticator, 1Password or Authy), scan the square code, type the 6 numbers.
   - **Sign-in options, connections and look** — optional extras. Tap **Continue to my CRM** when done.

## 2. Put it on your home screen

- **iPhone (Safari):** **Share** → **Add to Home Screen** → **Add**.
- **Android (Chrome):** **⋮** → **Install app**.

## 3. Pick your look

**Account → Look:** Sculpted Paper (soft gray and gold), Professional Greyscale (marble black and
white), Stealth (dark), Auto (light by day, dark at night) or **Team look** (whatever the Owner
picked). Owners and admins set the **Team look** for everyone on the same page.

## 4. Your home screen: all sub-accounts

- The top shows money numbers for all clients and how many of your **75** spots are used.
- **Due now** lists every client's overdue and due-today tasks in one place.
- Tap a tile to go inside a client. Use **Search** to find one. **Archived** shows clients you put away.

## 5. Inside a client

| Button | What it does |
|---|---|
| **Overview** | Money in the pipeline, what's due, recent activity |
| **Contacts** | People. **Add contact**, or **Import** a CSV file (duplicates are skipped) |
| **Deals** | Money you're working on, in columns. Use **Move** to change a column |
| **Tasks** | To-do list. Tap the circle to finish one |
| **More** | Settings (logo, brand color, logins), companies, downloads |

## 6. Your team

**Team** shows everyone who works across all clients:

- **Owner · Admin 1** — the boss of the CRM. Only one.
- **Backup admin** — the person who installed the CRM. Always visible to you.
- **Agency admin** — opens every client, adds clients and logins.
- **Assistant** — works inside every client but can't add clients or logins.

**Hand over ownership** (Owner only): type the new Owner's email → they get a link → when they accept,
they become Owner and you become backup admin.

## 7. The T.H.E.L.M.A. AI Fail Safe

Your installer stays as a **backup admin** so they can help you. To remove them you need a **release
code** they give you (for example, after the final payment).

- **Backup admin:** Team → **Create release code**. Copy it and keep it safe. It's shown only once.
- **Owner:** Team → the backup admin's row → **Remove with release code** → type the code → **Remove**.

It's like a lockbox on the porch: everyone can see it, but only the right code opens it.

## 8. Sign-in options and connections

- **Account → Sign-in methods:** connect Google, Microsoft, GitHub or Vercel so you can sign in with
  them. They only prove who you are; they never see your CRM data.
- **Connections** (owners and admins): upload one file that lists each service, its website and its
  keys. Keys are locked away; you'll only ever see the last 4 characters. Website passwords are refused.
- **Apple** and **phone text codes** cost money, so they stay off until an admin taps **Activate** on
  the Connections page.

## 9. Give a client their own login

Client → **More** → **Add a login** → email, name, role, temporary password → **Create login**. Share the
password privately. They choose their own at first sign-in.

- **Admin** — everything in that one client, including logins.
- **Member** — add and edit, can't permanently delete.
- **Viewer** — look only.

## 10. Add, download, archive

- **Add a client:** Home → **New** → name + business type (10 starter setups) → **Create sub-account**.
- **Download:** Client → **More** → Contacts / Deals / Tasks / Companies CSV.
- **Archive** = put in storage (can come back). **Delete permanently** = gone forever (type the exact name).

## 11. Is it working?

Open **https://standalone-crm-nine.vercel.app/api/health**. `"status":"ok"` means the app and the
database are talking — like checking that the lights turn on.

## 12. Test logins (mock data only)

- **Owner:** seniorestibancreations@gmail.com + the test password from your private guide (you'll set up
  two-step the first time).
- **Clients:** `client01@crm-demo.test` … `client75@crm-demo.test`, same test password. Each sees only
  its own business.

Everything in the test run is **made-up data**. Don't type real customer info until you move to the
paid production setup (`DEPLOYMENT_HANDBOOK.md`, section 7).
