# How-To Guides — Master System Build Out Live

## Run the Hold Queue pipeline
1. Hold Queue → create a card (title + what it's waiting on).
2. Advance it stage by stage: **Cast → Voice → Animate → Assemble → Publish**.
   Each advance is a server action and persists.
3. At Publish, Gate 2 applies: the card cannot publish unless the word
   APPROVED was entered at the gate. No exceptions, no bypass.

## Register a loop manifest
1. Loop Engine & Run Manifests → review the Python engine stages and the
   three hard gates shown on the page.
2. Register a run: give it a manifest reference. It appears in the registry
   (e.g. `run-probe-001` on the reference build).
3. Historical manifests: the page counts and sources the 40 repo manifests;
   row-by-row import is the pending GitHub step — do not hand-type them.

## Save / export the workspace
1. Save Map & Storage → the page holds the Dropbox hub / Drive Master Folder
   map (where things live).
2. "Workspace export" produces the real workspace JSON (your data only).
3. In Blank, the export contains only what you created — no sample rows.

## Switch Demo / Blank
- The mode toggle sits at the top of the app. Demo loads the full sample
  set (every figure labeled Sample). Blank shows zero figures.
- Switching never mixes the two: sample rows must not leak into Blank.

## Use Visual Views (V1/V2/V3)
1. Settings → Visual Views → pick a page and a view (V1/V2/V3).
2. The page must GENUINELY recompose — new layout, not just a badge change.
   (Verified on the reference build for Worlds V1/V2/V3.)
3. If a pick only changes labels, file it as a defect.

## Read the health monitor
- **LIVE** = the check just ran and passed (backend = DB roundtrip;
  Vercel projects = 11 projects read).
- **DEGRADED** = the check just ran and failed — the reason and timestamp
  are shown (e.g. the deployments 403). This is the monitor doing its job.
- Anything showing "Online" without a fresh check behind it is a defect.

## Manage the cast lock chain
- Characters / Cast → create a character → set status (e.g. Locked).
- The lock chain is the bundle builder: statuses persist server-side.
- Demo cast members arrive labeled SAMPLE; your own cast starts clean.

## Set the working tier
- Plans & Tiers → Starter / Studio / Pro / Flagship → save your pick.
- The pick persists (app_settings) and survives reload.
