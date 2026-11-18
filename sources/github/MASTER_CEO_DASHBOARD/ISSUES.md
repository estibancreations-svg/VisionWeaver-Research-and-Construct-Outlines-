# Issues — estibancreations-svg/MASTER_CEO_DASHBOARD

Source: list_issues (open + closed), retrieved 2026-11-18 (read-only). Total: 3.

## Issue #39: Independent verifier: Enterprise Recalibration release gates not complete

- State: OPEN
- Author: estibancreations-svg
- Created: 2026-08-27T20:54:12Z | Updated: 2026-08-29T16:07:09Z
- Body:

## Independent ChatGPT verifier result — 2026-08-27

**Authority:** The Architect / Base Ten Standard
**Verdict:** PARTIAL — do not certify the Enterprise Recalibration as complete.

This issue records the first adversarial verifier pass against the current GitHub state and the Enterprise Recalibration directive.

### Verified positive evidence

- `resource-intelligence-routing` exists and is **23 commits ahead / 0 behind** current `main`.
- The branch contains Resource Intelligence, Ecosystem Intelligence, THELMA updates, Gemini canonicalization, Resource/Ecosystem migrations, and the Gemini credential-name regression test.
- Vercel commit status for branch head `62eab315333b630ea419fe16aed4b277b41dbefd` is `success`.
- `Master-System-Buildout/main` contains the merged Base Ten governance and Social-Commerce Measurement doctrine at `6f97c806bc43a0228e23848abc9a58c3992dff27`.

### Failed / missing release gates

1. **Required GitHub handoff artifacts are absent.** Neither of the required files exists on `resource-intelligence-routing`:
   - `docs/verification/GITHUB_ENTERPRISE_RECALIBRATION_REPORT_2026-08-27.md`
   - `docs/verification/GITHUB_ENTERPRISE_RECALIBRATION_MANIFEST_2026-08-27.json`

2. **No Enterprise Recalibration PR is open** against `MASTER_CEO_DASHBOARD/main`.

3. **No Quality Gate workflow run exists for branch head** `62eab315333b630ea419fe16aed4b277b41dbefd`. Vercel preview success is not a substitute for Quality Gate.

4. **Production `main` is still old.** `main` remains `e1bd08286e769b3bcfac5f891464e482cc3bfbe8`; Resource Intelligence/Ecosystem work is not merged to production.

5. **Repository governance is not configured.** `MASTER_CEO_DASHBOARD/main` is still `protected=false`; repository rulesets endpoint returns `[]`. The GitHub subscription upgrade has therefore not yet been translated into repository policy.

6. **The global “All Systems” surface does not actually expose all registered systems.** `GlobalNavigation.tsx` and `routing.ts` expose six named executable system workspaces: VisionWeaver, LandWeaver, GrantOS, THELMA, CMGIO and EC Integration Fabric. Backend Ecosystem watch coverage for 17 systems does not make the UI/system implementation complete.

7. **CEO Resource & Usage is not fully recalibrated.** `src/App.tsx` still points the C-Suite Resource & Usage page primarily to Fabric usage, CMGIO usage, THELMA usage and Finance instead of making the new Resource Intelligence control plane authoritative.

8. **The current Master-System-Buildout system registry is stale/incomplete relative to the required 17-system enterprise view.** Current `main` registry still contains the older smaller system set and older THELMA/n8n language. Open draft PR #10 contains potentially valuable reconciliation work but is now **diverged (2 ahead / 8 behind)** and includes stale n8n-era assumptions; it must not be merged as-is.

9. **Base Ten is canonical but executable enforcement is not yet proven.** The canonical document exists in Master-System-Buildout, but no verifier evidence yet proves the 60/100 reserved-authority contract has been propagated as runtime policy across the production application, THELMA, agents and approval boundaries.

10. **Social-Commerce doctrine is canonical but implementation is not certified.** The doctrine requires weekly/monthly views, spend, boost, sales, attribution and forecasting. The verifier did not find a completed production implementation/certification of that reporting contract in the current release state.

### Required correction order

1. Reconcile `resource-intelligence-routing` against current `main` and the Base Ten/Social-Commerce canonical rules.
2. Reconcile old/open `Master-System-Buildout` PR #10 selectively; recover valid current material only and replace stale n8n assumptions with current EC Fabric/Ecosystem v3 architecture.
3. Update the canonical system registry to the evidence-supported enterprise system set and explicitly classify any additional candidate system (such as EDLS) rather than silently adding/removing identities.
4. Carry Base Ten authority into executable governance and tests.
5. Implement or explicitly mark NOT IMPLEMENTED the Social-Commerce weekly/monthly reporting ledger, attribution, accounting connection and forecast-evaluation loop.
6. Update CEO `Resource & Usage` and `Intelligence & Research` surfaces to the new Resource Intelligence/Ecosystem controls.
7. Decide how missing domain systems appear in UI: real workspace, clearly PARTIAL/MISSING entry, or governed placeholder that does not pretend to work.
8. Create the required Markdown report + JSON manifest.
9. Open the release PR from the exact current reconciled head.
10. Run Quality Gate on that exact SHA.
11. Configure branch protection/rulesets now available under the updated GitHub subscription.
12. Merge only if green.
13. Verify merged SHA == tested SHA and deployed SHA == merged SHA.
14. Return the report/manifest for independent ChatGPT verification.

### Independent verifier rule

Do not close this issue merely because code was written. Close only when the evidence artifacts, PR, Quality Gate, governance settings and post-merge deployment proof all exist, with any remaining domain-system work truthfully classified as PARTIAL/BLOCKED/NOT IMPLEMENTED rather than implied complete.

---

## Issue #46: Fix VisionWeaver Quality Gate failures and update THELMA protocol

- State: CLOSED
- Author: estibancreations-svg
- Created: 2026-08-29T16:02:47Z | Updated: 2026-08-29T16:07:08Z
- Body:

## Task

Fix the VisionWeaver Quality Gate failures discovered after PR #45, scan for similar release-certification gaps, and feed the lesson into THELMA's repair training/protocols.

## Current blockers found

- PR #45 merged VisionWeaver Studio source sync, but GitHub Quality Gate failed.
- PR run `33215733581` failed at `Install locked dependencies`.
- Main push run `33215745553` failed at `Install locked dependencies`.
- Root cause: `package.json` added `ffmpeg-static@5.3.0`, but `package-lock.json` was not updated.
- Local follow-up scan then found a second gate failure: VisionWeaver orchestrator no longer referenced canonical `GEMINI_CONNECTION`, causing `tests/gemini-connection-name.test.mjs` to fail.

## Fix prepared

Branch: `fix/visionweaver-quality-gate-thelma-protocol`

Prepared changes:

- synchronize `package-lock.json` with `ffmpeg-static@5.3.0`;
- add `GEMINI_CONNECTION` provider-slot truth state to `visionweaver-orchestrator` health output without changing Runway long-form rendering;
- add `docs/tasks/2026-08-29-visionweaver-quality-gate-and-thelma-protocol.md`;
- update VisionWeaver release notes with the Quality Gate addendum;
- update THELMA repair protocol with the lockfile drift training rule.

## Local verification

Passed locally:

```text
npm ci
npm run lint
npm test
npm run verify:release
npm run build
```

Test result: 22/22 passing.

## Acceptance criteria

- PR Quality Gate passes on the exact branch head.
- Post-merge `main` Quality Gate passes.
- Issue #39 is updated with passing run IDs.
- THELMA retains this as a training/protocol case.
- Remaining Issue #39 operational gates stay open until independently certified.

---

## Issue #61: Expose VisionWeaver world-physics capability state truthfully

- State: OPEN
- Author: estibancreations-svg
- Created: 2026-10-03T20:42:40Z | Updated: 2026-10-03T20:42:40Z
- Body:

Implement dashboard representation from `docs/architecture/VISIONWEAVER-WORLD-PHYSICS-INTEGRATION.md`.

Surface capability state separately as:
Defined → Implemented → Connected → Runtime Verified → Production Certified

Include world-state version, dissection state, environmental-physics state, acoustic/off-screen mapping, camera/360 continuity, uncertainty warnings, Director/Guild approval, THELMA orchestration, and Integration Fabric execution evidence.

Do not infer completion from the presence of UI controls.

---

