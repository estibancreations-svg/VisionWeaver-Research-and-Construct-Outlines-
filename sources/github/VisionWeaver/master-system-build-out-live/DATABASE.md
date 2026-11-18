# Database — Master System Build Out Live

Server-owned tables. Table names are VERIFIED (build attestation). Every
column below is INFERRED from the table name and the verified actions unless
noted; treat the schema as the contract to implement, not a dump.

## users — VERIFIED table
Purpose: local app accounts. The sign-in screen states: "Local accounts live
in this app's own database — separate from Supabase and Vercel."
Columns (INFERRED): id, email (unique), password_hash, created_at.

## sessions — VERIFIED table
Purpose: server-side sessions. Sign-out ends the session server-side and
returns to the sign-in screen (verified).
Columns (INFERRED): id, user_id → users, token, created_at, expires_at.

## projects — VERIFIED table
Purpose: Programs & Projects workspace rows.
Columns (INFERRED): id, user_id → users, name, status, mode (demo/blank),
created_at, updated_at.

## worlds — VERIFIED table
Purpose: Worlds & Locations saves. Verified: world "Probe World Zeta" saved
and listed with its filter detail.
Columns (INFERRED): id, user_id → users, name, filters (json), settings
(json), created_at.

## characters — VERIFIED table
Purpose: Characters / Cast bundle builder with lock chain. Verified:
createCharacter, setCharacterStatus (Locked); probe character shown Locked on
top; Demo cast (Grand, Marcus, Secretary) labeled SAMPLE.
Columns (INFERRED): id, user_id → users, name, status (e.g. Locked), bundle
(json — lock chain), is_sample (bool), created_at.

## proposals — VERIFIED table
Purpose: THELMA proposals. Verified: "Probe Proposal Zeta" landed in the
Guild queue and was approved PENDING → APPROVED, persisted.
Columns (INFERRED): id, user_id → users, title, body, status
(PENDING/APPROVED), created_at, decided_at.

## gate_decisions — VERIFIED table
Purpose: pipeline gate records. Verified: Gate 2 blocked a publish without
the word APPROVED and recorded the attempt with APPROVED.
Columns (INFERRED): id, user_id → users, gate (e.g. "Gate 2"), action,
approved_word_present (bool), created_at.

## hold_items — VERIFIED table
Purpose: Hold Queue cards. Verified: createHoldItem, advanceHoldItem
(Cast → Voice). Stages: Cast → Voice → Animate → Assemble → Publish.
Columns (INFERRED): id, user_id → users, title, stage, created_at, updated_at.

## loop_runs — VERIFIED table
Purpose: Loop Engine run manifests. Verified: registerLoopRun; registry row
"run-probe-001". Page shows Python engine stages + three hard gates
(including an IG 429 hard gate, observed).
Columns (INFERRED): id, user_id → users, manifest_ref, stage, gate_results
(json), created_at. The 40 historical manifests are NOT seeded rows —
they are counted/sourced on the page; import is a separate GitHub step.

## health_checks — VERIFIED table
Purpose: monitor check runs. Verified: one full cycle returned backend LIVE
(DB roundtrip), Vercel projects LIVE (11 projects), Vercel deployments
DEGRADED with the verbatim 403 reason; failed runs recorded DEGRADED with
reason + timestamp instead of painting green.
Columns (INFERRED): id, target (backend/vercel-projects/vercel-deployments),
status (LIVE/DEGRADED), detail (text), checked_at.

## monitor_sessions — VERIFIED table
Purpose: uptime monitor sessions. Verified: ticker counted 00:11:29 against
the server-recorded monitor start, re-synced by 15s heartbeats.
Columns (INFERRED): id, user_id → users, started_at, last_heartbeat_at.

## activity_log — VERIFIED table
Purpose: real user/system actions only. Verified: entries written by actions
and surfaced in getState. Fabricated entries are banned (Blank renders none).
Columns (INFERRED): id, user_id → users, action, detail (json), created_at.

## app_settings — VERIFIED table
Purpose: per-user app settings. Verified: saved working-tier pick
(Plans & Tiers: Starter/Studio/Pro/Flagship).
Columns (INFERRED): id, user_id → users, key, value (json), updated_at.

## Verified server actions
signup · sign-in · sign-out · getState · createCharacter · setCharacterStatus ·
createHoldItem · advanceHoldItem · registerLoopRun. (20 actions exist on the
build; the rest are INFERRED/unknown — re-derive from the pages during build.)
