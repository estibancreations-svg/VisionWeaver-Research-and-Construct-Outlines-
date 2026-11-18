# Pull requests — estibancreations-svg/VisionWeaver-Prime

Source: list_pull_requests state=all, retrieved 2026-11-18 (read-only). Total: 1.

## PR #1: Prime: locked workflow memory, self-hosted voice guardrails, triple QC

- State: open (draft)
- Author: estibancreations-svg
- Head: feat/approved-workflow-memory-voice-qc → Base: main
- Created: 2026-10-12T05:37:35Z | Updated: 2026-10-17T00:31:14Z | Closed: None | Merged: None
- Body:

**Prime backend verified:** frontend config `config.js` points to Supabase `azoqszhhmmkyqztubgem`. The project is listed as MASTER_CEO_DASHBOARD but has Prime's 27 page registry, 18 integration rows, 13 gates and live workspace tables. Live DB uses `private.is_member`; migration corrected to match.

**On this feature branch:** approved immutable workflow/memory schema, dispatch queue, rights-gated voice profiles, 3-pass QC, geographic avatar/location reference catalog (countries/regions/states/cities/landmarks/restaurants), non-destructive video/audio editing revisions, multi-format delivery manifests, deterministic checks and CI tests.

**Release status: BLOCKED; draft.** Schema migration 04/05 was NOT applied to Supabase, because deployment of migration was not authorized by the tool safety checks. No live authenticated worker, signed THELMA callback, editorial UI controls, TTS model serving, rendered outputs, licensed geospatial photo ingestion or per-format playback certification is installed. Do not merge/promote until these components pass 2-user RLS and triple end-to-end tests. Attribution alone does not grant image-use rights.

---

