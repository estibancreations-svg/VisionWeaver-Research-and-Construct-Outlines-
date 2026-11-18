# Pull requests — estibancreations-svg/OSIRIS

Source: list_pull_requests state=all, retrieved 2026-11-18 (read-only). Total: 1.

## PR #1: Implement OSIRIS logistics intelligence foundation

- State: closed; merged
- Author: estibancreations-svg
- Head: feature/osiris-logistics-intelligence-foundation-20260919 → Base: main
- Created: 2026-09-19T02:47:08Z | Updated: 2026-09-19T02:47:28Z | Closed: 2026-09-19T02:47:27Z | Merged: 2026-09-19T02:47:27Z
- Body:

## Outcome

Implements the OSIRIS-to-logistics intelligence boundary as an executable Supabase foundation.

### Included
- corridor, normalized-signal and sync-audit schema
- authenticated `sync-world-signals` Edge Function
- Continental U.S. baseline relevance filter
- explicit RLS deny controls for browser roles
- source/freshness/audit evidence
- exclusion of recon/scanner routes
- updated implementation status and architecture contract

### Live verification
- migrations applied to Supabase project `yqealeekngxooyoemfba`
- Edge Function version 1 ACTIVE with JWT verification enabled
- three tables present with RLS and restrictive policies
- anonymous/authenticated direct SELECT denied
- unauthenticated function invocation returns HTTP 401

### Still gated
- authorized live sync
- scheduler
- controlled OSIRIS source deployment
- attachment to the separate logistics T.H.E.L.M.A. target when located
- upstream data-license review

---

