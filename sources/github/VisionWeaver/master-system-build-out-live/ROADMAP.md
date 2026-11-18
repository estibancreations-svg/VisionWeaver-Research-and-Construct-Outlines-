# Roadmap — Master System Build Out Live

## Done (verified 2026-11-01)
- [x] One-system consolidation: 27 → 33 pages, B's six pages folded in as
      full pages, loop engine stages + three hard gates + manifest registry.
- [x] Server-side auth with sessions; sign-up / sign-in / sign-out exercised.
- [x] Live uptime ticker counting from real sign-in (verified 00:11:29 vs
      server clock; 15s heartbeat re-sync).
- [x] Real health checks: backend LIVE (DB roundtrip), Vercel projects LIVE
      (11 projects), Vercel deployments DEGRADED reported honestly on the
      `estibancreations101` scope 403.
- [x] THELMA propose-only → Guild queue; proposal approved PENDING → APPROVED
      persisted; Gate 2 blocks without the word APPROVED.
- [x] Demo/Blank verified: Blank shows zero SAMPLE labels and no sample
      figures; every new page visited live (Characters, Hold Queue, Voice
      Library, Loop Engine, Save Map, Plans & Tiers).
- [x] New server tables + actions; cast, queue cards, manifests survive reload.
- [x] Full test-all pass; audit clean (0 console errors, 0 broken assets,
      mobile pass).
- [x] Canonical records: `CANONICAL-SYSTEM.md` on VisionWeaver repo `main`;
      copy in Drive VisionWeaver Hub.
- [x] Lineage comparison filed
      (`visionweaver-lineage-comparison-2026-11-01.md`).

## Next
- [x] **Auth bug (user-reported 2026-11-02, RESOLVED same day):** root cause was
      zero accounts in the app's own database; sign-in copy never stated
      accounts are local. Fixed and verified end-to-end. Replica rule: create
      the account on the Create account tab first; verify auth before delivery.
- [ ] **Supabase wiring:** owner credential step (project URL + key entered in
      the app's Connections/Settings — INFERRED mechanism), then read-verify
      against the data home before any write. No writes without owner's word.
- [ ] **40 historical run manifests:** counted and sourced on the Loop Engine
      page; row-by-row import lands with the GitHub step (contents live in the
      VisionWeaver repo).
- [ ] **Vercel decision:** pause/remove the two stale BLOCKED projects only on
      owner's explicit call.
- [ ] **Dropbox:** needs owner's sign-in; then realign per the Save Map page's
      Dropbox hub map.
- [ ] **D-label check:** directives D1–D16 labels vs the final directives PDF
      (pending from Oct 30).

## Blocked on owner
- Supabase credential step.
- Vercel stale-project pause/remove call.
- Dropbox sign-in.
- (Standing, unchanged) New "Senior" accounts move: ON HOLD since 2026-10-22.
  All work stays on the connected OLD accounts.
