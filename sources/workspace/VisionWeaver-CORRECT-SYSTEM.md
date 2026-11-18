# VisionWeaver — CORRECT SYSTEM (marked 2026-10-22 by user ruling)

**Use this one:** the VisionWeaver **v3 UI workspace** inside the CEO Dashboard repo.

- Repo: `estibancreations-svg/MASTER_CEO_DASHBOARD`
- File: `src/components/VisionWeaverWorkspace.tsx` (~50K chars, `vw3-` components)
- Live home: Vercel project `master-ceo-dashboard` (https://master-ceo-dashboard.vercel.app)
- Why this is the correct one (verified 2026-10-22): its page registry carries the
  labeled pages from the user's uploaded "COMPLETE NAVIGATION BUILDOUT" board —
  Home, Vision Builder, Strategic Planner, Initiatives, Programs & Projects,
  AI Co-Pilot, CMI, Directors Guild, Teams, C-Suite, Book Creation, Avatar
  Engineering, Worlds & Locations, Design Studio, Design & Commercial,
  Scene & Production, Post Production, Distribution & Growth, Quality & Audit,
  Finance & Accounting, IT & Security, Resources, Assets & Knowledge,
  Reports & Insights, Settings — each page with a locked primary view (V1/V2)
  and three named alternate views (the board's V1/V2/V3 options, switchable in
  Settings → Visual Views). Board headlines found verbatim in the code:
  "Bring Your Ideas to Life", "Strategic Command Center", "Initiative Pipeline",
  "Program & Project Workspace", "Creative & Market Intelligence",
  "Review & Decision Queue", "Organization Command", "Avatar State Studio",
  "Create Without Limits", "Visual Views". Fingerprint match: the board's
  Programs & Projects panel lists Crossroads of Identity, Children's Educational
  Series, Pepsi Zero Ad Campaign, True Stories Series — the code's project rows
  are the same four.
- This is also the "attached VisionWeaver v3 UI" the VisionWeaver repo's
  2026-10-08 commit locked as the canonical runtime target, and the subject of
  MASTER_CEO_DASHBOARD PR #64 (canonical UI runtime stabilization).

**NOT the correct system:** the Director Studio build (apps/director-studio,
UI host 0.4.02, visionweaver-design-studio.vercel.app). Archived locally at
`~/workspace/visionweaver-archive/wrong-version-director-studio-ui-0.4.02/`
with a wrong-version note. Do not use it as the reference build.
