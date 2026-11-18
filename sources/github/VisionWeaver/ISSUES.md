# Issues — estibancreations-svg/VisionWeaver

Source: list_issues (open + closed), retrieved 2026-11-18 (read-only). Total: 1.

## Issue #2: Build Scene Dissection Engine + Persistent World Physics Model

- State: OPEN
- Author: estibancreations-svg
- Created: 2026-10-03T20:42:35Z | Updated: 2026-10-03T20:49:34Z
- Body:

## Objective
Implement the 2026-10-03 world-physics and scene-dissection architecture.

## Canonical spec
`docs/architecture/WORLD-PHYSICS-AND-SCENE-DISSECTION.md`

## Initial implementation slices
- [ ] scene/shot segmentation
- [ ] visible entity extraction + persistent IDs
- [ ] off-screen source registry with confidence/uncertainty
- [ ] spatial acoustic source map
- [ ] environmental physics state (light/rain/wind/water/air displacement)
- [ ] avatar perception/reaction contract
- [ ] camera state + 360 world coordinates
- [ ] temporal/continuity state
- [ ] continuity capsule serialization
- [ ] Director's Guild approval integration
- [ ] THELMA orchestration handoff
- [ ] Integration Fabric job/evidence state
- [ ] Boy and the Red Balloon validation fixture

## Acceptance principle
A camera move must reveal another view of the same persistent world rather than invent contradictory geography.

Do not mark complete until the balloon test proves spatial, acoustic, avatar, weather/physics, camera, and continuity behavior end to end.

---

