# Decisions — Master System Build Out Live

Locked decisions behind the one system. New replicas must honor all of them.

## 1. One system (owner, 2026-11-01)
Too many lineages, too many conversations. One working VisionWeaver; the
multi-track debate is put to rest. Canonical record committed as
`CANONICAL-SYSTEM.md` (VisionWeaver repo `main`) and mirrored to Drive.

## 2. C body + B engine + A crown
- **C (fullstack Master build)** is the body: the only lineage running
  end-to-end (real sign-in, real ticker, real health checks).
- **B (repo 2.0 line)** contributes the engine and the six missing pages:
  Characters/Cast, Voice Library, Hold Queue, Loop Engine & Run Manifests,
  Save Map & Storage, Plans & Tiers.
- **A (vw3)** is the design crown: the Oct 22 ruled visual lock. The 16-panel
  buildout board is the visual source of truth — reproduce it, don't
  reinterpret it.

## 3. Demo / Blank contract
- Demo: full sample set, **every figure labeled Sample**.
- Blank: zero figures, no demo data, same pages/structure/gates.
- Nothing sample may leak into Blank. (A past defect showed fabricated
  activity entries rendering in Blank — that class of bug is a contract
  violation, not a cosmetic issue.)

## 4. Propose-only THELMA
THELMA never publishes, runs, or spends. It proposes; proposals land in the
Directors Guild queue; approvals persist. Nothing reaches the outside world
without a human approval. See `AI-ASSISTANT.md`.

## 5. Gate 2: the APPROVED word
No publish without the literal word APPROVED entered at Gate 2. The gate
blocks and records the attempt either way. Verified: blocked without the word,
recorded with it.

## 6. Honest health checks
Status comes only from real checks. If a check fails, the monitor says
DEGRADED with the reason and timestamp — e.g. the Vercel deployments read
returning the `estibancreations101` scope 403. Static "Online" dots and
hardcoded "Connected" labels are banned (a past defect class).

## 7. Data-home hold
The Supabase data home ("Master Dashboard", 153 tables) is a **verified
reference**, not a wired backend. The app runs on its own database until the
owner completes the credential step. No Supabase writes without the owner's
explicit word. The app must say so on its own sign-in screen and footer.

## 8. Static window superseded
The static `master-system-build-out` artifact is retired as reference only.
The fullstack build is the system. Nothing rebuilds over it with a second
create; it changes only by edit.

## 9. Visual Views must really recompose
Picking V1/V2/V3 in Settings → Visual Views must genuinely re-render the
page layout — a recorded pick that only changes badge text is a defect
(a past defect class; verified fixed for Worlds V1/V2/V3).

## 10. Stale platform artifacts are mapped, not silently retired
The Vercel `master-system-buildout` / `-lzaa` projects are stale BLOCKED
deploys of unrelated docs — not the system. Pause/remove needs the owner's
explicit call. Retiring is hard to undo.
