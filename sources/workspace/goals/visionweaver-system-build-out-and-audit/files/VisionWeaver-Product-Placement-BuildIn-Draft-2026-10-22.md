# VisionWeaver — Product Placement & Advertising Build-In (DRAFT for approval, 2026-10-22)

**Status:** draft spec only. No code changed, nothing wired into any repo.
Waiting on the user's go before any build-in.

## What this locks in

The user's directive (2026-10-22): Product Placement and Advertising gets
built into the VisionWeaver system, tightened up and locked in, so the system
runs a smooth, tight ship. The reference review (filed the same day) found the
craft worth keeping — rival product as the story's problem state, hero product
in hands at the payoff, branded environment, product-only end card — and one
ship-blocking defect: a raw production note burned into the end-card frame
("100mm macro slow pull era locked tripod premium Commercial polish"). Finished
pieces must ship clean; production notes live in the project record, never in
the frame.

Build target: the correct system — the v3 UI workspace in
estibancreations-svg/MASTER_CEO_DASHBOARD (`src/components/VisionWeaverWorkspace.tsx`),
live home master-ceo-dashboard.vercel.app (verified serving, 2026-10-22).
NOT the archived Director Studio build.

## Part 1 — Placement registry (per project)

Lives in Design & Commercial → the existing "Placement & Performance" view.
One registry entry per brand/product appearing in a project:

| Field | What it holds |
|---|---|
| Brand | Brand name (e.g., Pepsi) |
| Product | Product + variant (e.g., Pepsi Zero Sugar, 12oz can) |
| Product role | hero / rival / prop / environment — one only |
| Scenes & shots | Scene + shot ranges where it appears |
| Story beat | Why it's in those frames (e.g., "rival cans = the before state, scene 1") |
| Brand asset ref | Logo file, tagline lockup, usage rules link — no recoloring, no stretching |
| Disclosure | Paid / organic; platform label required for paid (e.g., #ad) |
| Approval state | draft → brand-approved → locked |

Rule: **every brand visible in a finished piece is registered. Nothing
unregistered ships.**

## Part 2 — QC gate (runs before Publish / Gate 2)

Six checks. All six pass or the piece does not publish:

1. **Clean-frame check.** No production notes, prompt text, watermarks, or
   placeholder copy burned into any exported frame. (This is the Pepsi
   end-card defect, made into a permanent rule.)
2. **Rival-brand containment.** Rival branding appears ONLY in registered
   story-beat frames. Any rival brand outside its declared beats = fail.
3. **Hero payoff presence.** Hero product present and legible in the
   registered payoff frames and end card.
4. **Brand lockup compliance.** Logo, tagline, and product rendering match the
   registered brand asset ref — no alteration.
5. **Disclosure completeness.** Every placement has a disclosure entry; paid
   placements carry the platform-appropriate label.
6. **Registry completeness.** Cross-check: every brand detected in the piece
   matches a registry entry.

The gate runs inside Quality & Audit and must pass before Publish (Gate 2)
unlocks — same authority pattern as the existing Gate 1/Gate 2 discipline.

## Part 3 — First application (proposed pilot)

The Pepsi Zero Ad Campaign, currently sitting in Review in Programs & Projects:

1. Re-export the end card clean — remove the burned-in production note.
2. Register its four beats (rival-cans problem state / holographic payoff /
   tailgate hero-in-hands / end card) in the registry with disclosure.
3. Run the six QC checks against it.

## What needs the user's call

- Approve this spec as-is, change it, or defer it.
- If approved: apply it to the Pepsi Zero Ad Campaign first as the pilot, or
  start with a different project.

No system code is touched until the user picks one of those.
