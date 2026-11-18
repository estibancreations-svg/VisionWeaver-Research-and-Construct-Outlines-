# Pull requests — estibancreations-svg/Master-dashboard-

Source: list_pull_requests state=all, retrieved 2026-11-18 (read-only). Total: 4.

## PR #1: [Aikido] Fix security issue in enhanced-resolve via minor version upgrade from 5.21.6 to 5.22.1

- State: closed
- Author: aikido-autofix[bot]
- Head: fix/aikido-security-update-packages-66765591-usw8 → Base: main
- Created: 2026-07-14T23:25:27Z | Updated: 2026-08-15T01:28:10Z | Closed: 2026-08-15T01:28:07Z | Merged: None
- Body:

Upgrade enhanced-resolve to fix path traversal vulnerability in SymlinkPlugin that allows bypassing directory restrictions via symlink resolution.
✅ There are no breaking changes
<details>
<summary>✅ 1 CVE resolved by this upgrade</summary>
<br>

This PR will resolve the following CVEs:
| Issue | Severity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
| --- | --- | --- |
| <pre>[AIKIDO-2026-11084](https://app.aikido.dev/issues/35925705/detail?groupId=121403#AIKIDO-2026-11084)</pre> | <pre>MEDIUM</pre> | [enhanced-resolve] A symlink resolution vulnerability allows attackers to bypass path restrictions by placing symlinks in allowed directories that point outside the restricted root, causing unauthorized module resolution outside confined paths. |

</details>

---

## PR #2: Ship canonical VisionWeaver production console

- State: closed; merged
- Author: estibancreations-svg
- Head: agent/visionweaver-production-v6 → Base: main
- Created: 2026-08-10T21:20:25Z | Updated: 2026-08-12T17:50:57Z | Closed: 2026-08-12T17:50:57Z | Merged: 2026-08-12T17:50:57Z
- Body:

## Outcome
Ships the finished VisionWeaver v6 production console and reconciles the recovered system into one governed runtime.

## Product
- Focused authenticated production intake and live command console
- Durable seven-stage pipeline with realtime job and scene state
- Human approval, QC visibility, render access and exception handling
- Responsive production UI replacing the generic workspace as the primary VisionWeaver surface

## Runtime completed
- Supabase migration `visionweaver_production_hardening_20260810` applied
- Orchestrator v7 deployed; authenticated production probe returned HTTP 200
- Vault-backed cron runs every minute
- Owner isolation plus CEO/Architect override policies
- Review decisions, prompt versions, provenance and integration receipts
- CEO Dashboard status updated to production/healthy

## Evidence
- `npm run build` passes (TypeScript + Vite)
- Source manifest, release record, connections, next run period and governed conversation continuation are committed under `docs/run-records/`
- Historical plaintext secrets are excluded; provider calls remain server-side


---

## PR #3: feat: VisionWeaver v6 production hardening — backup, observability, API hardening, runbook, tests

- State: open (draft)
- Author: Copilot
- Head: copilot/finalize-production-data-integrity → Base: main
- Created: 2026-08-19T19:19:23Z | Updated: 2026-09-16T19:30:36Z | Closed: None | Merged: None
- Body:

VisionWeaver v6 was live in production with no backup export, no structured logging, no rate limiting or circuit breaker, and no operational documentation. This PR closes all five remaining backend gaps.

## Monitoring & Observability
- Replaced all bare `console.*` calls with a structured JSON logger emitting `{ ts, level, stage, message, meta }` per event
- `GET /api/health` now returns per-pipeline-stage status (`intake→parse→breakdown→cinematography→render→qc→package`) and all circuit breaker states
- `GET /api/health/:stage` — per-stage probe, updates `lastCheck` on each call

## Data Integrity & Backup
- `GET /api/backup/export` — JSON snapshot of audit trail + stage health + CB state, returned as a timestamped attachment
- `POST /api/audit/transition` — records job/scene state transitions (caller: orchestrator or operator)
- In-memory audit trail bounded at 10k entries (oldest-first eviction)

## API Hardening
- **Rate limiter**: sliding-window 60 req/min/IP on all `/api` routes → 429 on breach
- **Circuit breaker** on `n8n` dispatch: 5 failures → open → 30s recovery → 2 half-open successes → closed; open state returns 503
- **SSRF fix** on `/api/dispatch-n8n`: enforces `https:` protocol and optional `N8N_WEBHOOK_BASE_URL` prefix allowlist before any server-side fetch
- `POST /api/validate/scene` — pre-submit payload validation with field-level errors and sanitized output

```ts
// SSRF guard example
const parsedUrl = new URL(webhookUrl);
if (parsedUrl.protocol !== 'https:') { res.status(400)... }
if (allowedBase && !webhookUrl.startsWith(allowedBase)) { res.status(403)... }
const response = await fetch(parsedUrl.toString(), ...);
```

## Operational Documentation
- `docs/runbook/PRODUCTION-RUNBOOK.md` — architecture overview, 5 common failure scenarios with diagnosis/resolution, manual SQL procedures, backup SLA, escalation matrix
- `docs/runbook/API-REFERENCE.md` — all endpoints with request/response shapes, error codes, rate limits
- `docs/runbook/INCIDENT-RESPONSE-TEMPLATE.md` — structured incident report template

## Tests
- `src/__tests__/server-hardening.test.ts` — 18 unit tests covering payload validator, rate limiter, circuit breaker, and audit trail (pure logic, no network or Express dependency)

---

## PR #4: Rebuild Master Dashboard as Estiban Systems Desktop

- State: closed; merged
- Author: estibancreations-svg
- Head: fix/estiban-systems-desktop-full-rebuild → Base: main
- Created: 2026-09-06T16:11:59Z | Updated: 2026-09-06T16:15:48Z | Closed: 2026-09-06T16:13:12Z | Merged: 2026-09-06T16:13:12Z
- Body:

This is a full replacement of the misidentified VisionWeaver console with the Estiban Systems Desktop.

What changed:
- Replaced the VisionWeaver-only shell with a real system desktop.
- Added working surfaces: Home, Launch a Workspace, Active Work, Review, Returned Work.
- Added direct links to VisionWeaver, LandWeaver, GrantOS, T.H.E.L.M.A., CMGIO, EC Integration Fabric, and CEO Command Center.
- Launch now creates a durable `workspace_jobs` record, queues an `orchestration_commands` request, and records lifecycle events.
- Review can approve & return, request changes, or reject.
- Returned work preserves the user-selected return workspace.
- Replaced fragile Firebase-era build scope with the new Desktop entrypoint.
- Added public Supabase client configuration for reliable preview/production builds.

Verification performed:
- Vercel preview build: READY.
- Preview HTTP load: 200.
- Synthetic Supabase transaction verified Request → Working → Review → Returned.
- Final state: returned / approved.
- Orchestration command remained linked.
- Four lifecycle audit events were written.
- Synthetic verification transaction was rolled back, leaving no test data.

This PR is intended to replace, not layer over, the old VisionWeaver console in this repository. VisionWeaver remains in its proper workspace under MASTER_CEO_DASHBOARD.

---

