# Pull requests — estibancreations-svg/Leadstack-Clone

Source: list_pull_requests state=all, retrieved 2026-11-18 (read-only). Total: 6.

## PR #1: Initialize Leadstack native control plane

- State: closed; merged
- Author: estibancreations-svg
- Head: foundation/native-control-plane → Base: main
- Created: 2026-10-15T02:12:41Z | Updated: 2026-10-15T02:14:09Z | Closed: 2026-10-15T02:14:09Z | Merged: 2026-10-15T02:14:09Z
- Body:

## Summary

Initializes Leadstack as an EstibanCreations-owned CRM intelligence and automation control plane.

### Included
- strict TypeScript foundation
- MCP v2 server dependency line
- provider-neutral CRM port
- native tool catalog
- workspace/agency actor context
- explicit agent permission delegation
- AAL2 requirement for externally visible actions
- append-only audit sink contract
- policy and execution tests
- architecture, feature matrix, implementation plan and source policy
- GitHub Quality Gate

### Boundary
GoHighLevel is explicitly excluded from runtime, credentials, connectors, SDKs, endpoints, webhooks and copied source. Public feature categories were used only as product research.

### Gate
Do not merge until the Quality Gate is green on the exact PR head SHA.

---

## PR #2: Bind Leadstack to owned standalone CRM with RLS-preserving adapter

- State: closed; merged
- Author: estibancreations-svg
- Head: feature/standalone-crm-adapter → Base: main
- Created: 2026-10-15T02:17:22Z | Updated: 2026-10-15T02:18:34Z | Closed: 2026-10-15T02:18:34Z | Merged: 2026-10-15T02:18:34Z
- Body:

## Summary

Begins Phase 1 by binding Leadstack's provider-neutral CRM port to the EstibanCreations standalone CRM schema.

### Security model
- Supabase publishable key only
- user access-token JWT supplied per request
- no service-role key option
- workspace_id filter on every query as defense in depth
- standalone CRM Row Level Security remains the final database authority

### Implemented
- contact search/get/create/update
- company listing
- deal listing
- task creation
- adapter error normalization
- configuration safety tests
- bridge documentation
- current Supabase JS client dependency

### Excluded
- GoHighLevel
- third-party CRM synchronization
- direct SQL/RLS bypass
- duplicate Leadstack CRM database

Do not merge until the Quality Gate is green on the exact head SHA.

---

## PR #3: Add secure MCP v2 Phase 1 CRM tools

- State: closed; merged
- Author: estibancreations-svg
- Head: feature/mcp-v2-phase1 → Base: main
- Created: 2026-10-15T02:20:56Z | Updated: 2026-10-15T02:24:15Z | Closed: 2026-10-15T02:24:15Z | Merged: 2026-10-15T02:24:15Z
- Body:

## Summary

Adds the first native MCP v2 server factory over Leadstack's owned CRM services.

### Tools
- leadstack_search_contacts
- leadstack_get_contact
- leadstack_create_contact
- leadstack_update_contact
- leadstack_list_companies
- leadstack_list_deals
- leadstack_create_task

### Security design
- authenticated ActorContext is resolved per call/connection
- tool authorization occurs before CRM adapter resolution
- agent permissions must be explicitly delegated
- workspace scope comes from authenticated context, not model input
- CRM adapter keeps RLS and workspace filtering underneath Leadstack policy
- no shared global user token is baked into the MCP factory

### Tests
Includes a test proving an undelegated agent is denied before the CRM adapter is resolved.

Do not merge until the exact PR head passes the Leadstack Quality Gate.

---

## PR #4: Docs: operating policy + MCP plan + refresh notes (drafts, no code change)

- State: closed; merged
- Author: estibancreations-svg
- Head: docs/fixup-plan-policy → Base: main
- Created: 2026-10-17T21:18:45Z | Updated: 2026-10-17T21:23:36Z | Closed: 2026-10-17T21:23:36Z | Merged: 2026-10-17T21:23:36Z
- Body:

## What this PR does (docs only)

- docs/OPERATING_POLICY.md — same one-rule policy as standalone-crm (mirror). Default = T.H.E.L.M.A. gateway + Owner approval; Leadstack direct writes only internal CRUD, delegated + scoped + AAL2 + audited.
- docs/LEADSTACK_MCP_PLAN.md — deployed MCP plan: transport/hosting/auth/audit decisions required, pre-deploy gate, explicitly NOT in this phase.
- docs/DOCS_REFRESH_NOTES.md — staged corrections incl. IMPLEMENTATION_PLAN stale marks (Phase 0/1).

## Status

DRAFTS. Policy NOT in effect until Sire approves. No deploy done. No code change.


---

## PR #5: Docs: correct IMPLEMENTATION_PLAN Phase 0/1 marks

- State: closed; merged
- Author: estibancreations-svg
- Head: fix/implementation-plan-corrections → Base: main
- Created: 2026-10-17T21:31:03Z | Updated: 2026-10-17T21:32:02Z | Closed: 2026-10-17T21:32:01Z | Merged: 2026-10-17T21:32:01Z
- Body:

Direct correction (follow-up to merged PR #4):

- Phase 0: Green Quality Gate [x] (passes on 9eaf00a), status → foundation complete, transport pending. MCP transport stays unchecked.
- Phase 1: adapter, workspace mapping, contacts, companies (list), deals (list), tasks (create), cross-workspace + delegation tests [x] with test file names.
- Still unchecked: Notes, Audit read, live smoke test, broader company/deal/task management.
- Adds correction note + Operating Policy pointer.

Docs only. No code change.

---

## PR #6: Docs: mark OPERATING_POLICY approved + in effect (mirror)

- State: closed; merged
- Author: estibancreations-svg
- Head: fix/policy-approved → Base: main
- Created: 2026-10-17T21:53:42Z | Updated: 2026-10-17T22:19:20Z | Closed: 2026-10-17T22:19:20Z | Merged: 2026-10-17T22:19:20Z
- Body:

Recreates the declined Leadstack side of the policy-approved follow-up (was declined as part of the batch with CRM PR #9).

CRM PR #9 has now merged on re-ask (2be8547a), so the canonical policy is IN EFFECT. This PR marks the Leadstack mirror the same way.

Docs only. Leaves merge decision to Owner — NOT auto-merged.

---

