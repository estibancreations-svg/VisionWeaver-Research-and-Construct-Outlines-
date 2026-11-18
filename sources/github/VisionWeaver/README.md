# VisionWeaver

Complete AI-powered video and image generation platform — parallel system architecture to Runway AI with Vercel + Supabase integration.

VisionWeaver runs Sire's productions under a **Directors Guild** structure: Design, Motion, Sound, Edit, Marketing and Automation bring triple-checked work to the director in a timestamped queue, and nothing moves until he decides. Since Oct 20 2026 the standing rule is absolute: **everything runs in and through VisionWeaver** — no hand-finishing from chat (see [`feed/DECISIONS.md`](feed/DECISIONS.md)).

**Status and what's next live in [`ROADMAP.md`](ROADMAP.md). The work record lives in [`feed/`](feed/).**

## Where everything stands — October 30, 2026

| Piece | State |
|---|---|
| **VisionWeaver 2.0** — the unified front end | Built and verified Oct 26–27. One file, two launches: **Blank** (new user, workspace auto-created, truly empty) and **Demo** (seeded with the real work). 14/14 render tests passed in both modes at build. **Not hosted** — it runs by opening the file; the Vercel deploy was refused (connector token lacked team write access). See [`visionweaver-2.0/`](visionweaver-2.0/). |
| **The production system (the loop)** | Built and proven Oct 20–23, **finished/verified/deploy-ready within its proven scope** (Oct 22 finish review). Cast → voice → animate → assemble → publish, with two hard gates. It has run real work: the Fireside Instagram season and Fireside Ep1 v3 production. See [`system/`](system/). |
| **VisionWeaver Prime** (the earlier platform build) | **Not deploy-ready.** The Oct 23 full audit's verdict: a records application wearing a production platform's interface — 27 routes mapped (REAL 3 · PARTIAL 7 · STUBBED 3 · DISPLAY 14), **0 of 18 integrations fully verified**, no generation, upload, publishing, or payments in the live build. Separate track; the realign order is in [`ROADMAP.md`](ROADMAP.md). Map: [`visionweaver/archive/v1.0-pre-rebuild/visionweaver-prime-system-map.md`](visionweaver/archive/v1.0-pre-rebuild/visionweaver-prime-system-map.md). |
| **Fireside** | v1 season publishing through the loop: Instagram reels **eps 1–12 live**; the remaining episodes (13–28, 29, 30) are queued in the same job and resume at ep13 when Instagram's daily publish window allows. Ep1 **v3** (grandmother-tells-it format) is in production under the **photorealistic design standard** — Grand's look is LOCKED. |
| **Crossroads of Identity, Ep 1** | Part 1 finished (13 clips). Part 2 animation batch not fired: the keyframes could not be confirmed in Drive under that name (Oct 20–21 sweep); the ≈1,200-credit authorization sits untouched. |
| **The feed** | Opened Oct 22: every working conversation is uploaded here with a mapping of what was done, what system did it, and when — retroactive to Oct 15. 3 conversation records + standing decisions are up; the remaining backfill is named honestly in [`feed/MAPPING.md`](feed/MAPPING.md). |

## What's here

| Path | What it is |
|---|---|
| [`visionweaver-2.0/`](visionweaver-2.0/) | **VisionWeaver 2.0**, the unified rebuild (single-file app): Blank + Demo launches, 16 sections, Socials, KPI & Reports on one data object, Connections, Save Map, Plans & Tiers, Settings with the v1 sign-in. Start at its README. |
| [`system/`](system/) | **The production system**: the loop engine ([`system/loop/`](system/loop/) — `run.py`, `stages.py`, jobs, run manifests), [`SYSTEM.md`](system/SYSTEM.md), the [overnight build report](system/OVERNIGHT-REPORT.md) and the [finish review](system/FINISH-REVIEW.md). Committed Oct 30 (`dfbe0c81`). |
| [`visionweaver/archive/v1.0-pre-rebuild/`](visionweaver/archive/v1.0-pre-rebuild/) | The v1 snapshot's documents: [archive index](visionweaver/archive/v1.0-pre-rebuild/ARCHIVE-INDEX.md), the [Prime system map](visionweaver/archive/v1.0-pre-rebuild/visionweaver-prime-system-map.md), door-fix plan, issues register, flagship 150× outline. (The full 287 MB snapshot — loop copy, queue database, media — lives in the workspace / Dropbox hub, not in git.) Committed Oct 30 (`06f4c66b`). |
| [`feed/`](feed/) | The working record: [charter](feed/README.md), [master mapping](feed/MAPPING.md), [standing decisions](feed/DECISIONS.md), and the conversation records in [`feed/conversations/`](feed/conversations/). |
| [`ROADMAP.md`](ROADMAP.md) | Done / in progress / next-and-missed, with commit references. |
| [`apps/director-studio/`](apps/director-studio/) | **VisionWeaver Studio**, the director control surface. Built from the production records by `build.py`. v7: THELMA AI assistant, Cast & avatars, Settings, Database, Claude uplink, live connector checks. |
| [`connections/`](connections/) | API, MCP and OAuth settings: what's connected, how, secret names (no values), the Supabase connector registry SQL, and an MCP config for Claude Code. |
| [`projects/creative-ip/`](projects/creative-ip/) | Production records for Crossroads of Identity, This Is Your Life and The Arc (pointers; each property's canon lives in its own repo and Drive). |
| [`standards/`](standards/) | House standards: Shot Standard v1, 360 View Storyboard, Avatar State boards, Character Identity Boards, the Avatar Catalog, and more (sections below). |
| [`research/`](research/) | Research and build logs. |
| [`docs/CURRENT-WORKSTATE-2026-10-04.md`](docs/CURRENT-WORKSTATE-2026-10-04.md) | Earlier Avatar State → World State → continuity/stitching workstate and Global Catalog decisions (Oct 4; the Oct 30 state is at the top of this README). |

## The production system — the loop

One story in → finished master out, no hand-carrying between steps (`system/loop/run.py`):

```
cast → voice → animate → assemble → publish
```

- **Gates (hard stops):** every character must carry `approved: true` (look + voice locked) before anything renders; the publish stage runs only when the job carries `approved_for_publish: true` — otherwise the loop stages everything and stops.
- **Repairs made in the system (Oct 20–21):** the assembler's caption crash fixed upstream (captions burn in a second pass; pixel-verified); the loop's `crossroads` assemble wiring fixed; a `prebuilt` assemble mode added; the Instagram season logic moved into the publish stage — the ad-hoc script was retired.
- **Proof:** the loop's test job ran clean end to end, twice, zero credits; ~40 run manifests in `system/loop/runs/` are the receipts.
- **Design standard (Steve, Oct 22):** main-line work is AI **photorealistic**, cinematic live-action, at the standard of the Runway avatars/worlds built for Crossroads Season 1. Illustrated/cartoon looks are reserved for children's content. Animation is the Crossroads method — Runway image-to-video from locked stills — with motion matched to the voice and **never a single looped gesture**.

## The pipeline (house view)

```
Books (Drive) → Locks (faces, light, camera pins) → Pictures (key frames)
   → GATE 1: Sire approves key frames
   → Motion (Runway Gen-4.5) → Sound (voices, effects, score, Sire's narration)
   → Edit (assembler / edit list) → Deliver (masters, covers, captions)
   → GATE 2: Sire writes APPROVED
   → Publish (Publisher → Zapier → YouTube, Instagram; TikTok prepared)
```

## Current production

**Fireside** (the radio-speech series; YouTube + Instagram traction underway)

- v1 season: 30 episodes staged; Instagram reels eps 1–12 live via the loop's publish stage; YouTube eps 1–11 private via Zapier from the earlier push. Remaining IG episodes resume through the same loop job (Instagram's daily publish limit sets the pace).
- Ep 29 is **v3 of the audio renders** — settled Oct 19, re-confirmed Oct 21 ("Go with 3"); the staged master already matches.
- Format v3 (locked Oct 20): Gather → Grand's Explanation (kids ask questions) → the **entire** speech through the radio, verbatim → Afterglow. Cast: Grand (locked, photorealistic) + Nadia, Theo, June.
- Ep1 v3 status: produced through the loop (voices, animation, assembly); Steve's review found timing/motion defects in the first cartoon-style pass; the work was reset to the photorealistic standard Oct 22 — Grand locked, one check piece approved as the pattern, full realistic run is the next step (see ROADMAP).

**Crossroads of Identity · Book 1 *Convergence* · Episode 1 "The News"**, 5 parts

| PART | Status |
|---|---|
| 1 "The Text" | Finished: 13 clips, edit list, captions. |
| 2 "The Performance" | Clips: 1 of 15 in the workspace (S01). Animation batch waits on the keyframes (see ROADMAP). |
| 3 "The Bathroom" · 4 "The Box" · 5 "The Porch" | Scripted and locked; no pictures yet. |

## VisionWeaver Prime — the honest state

Prime is the earlier platform build (its own live door: `visionweaver-prime.vercel.app`; the October-screenshots address `estibancreations101.vercel.app` is dead). The Oct 23, 2026 audit — every route clicked, every control tested — established: a working records application behind a production-platform interface. Auth is genuinely complete; 24 of 27 routes do something real, but **no route can generate, receive an upload, publish, or take a payment**, and **0 of 18 integrations are fully verified** (3 partial: Supabase, Vercel, GitHub). Prime is **not** deploy-ready and is never described as such. The full map is in the [archive](visionweaver/archive/v1.0-pre-rebuild/visionweaver-prime-system-map.md); the audit record is in the [feed](feed/conversations/2026-10-23-visionweaver-prime-audit.md); the 8-step realign order is in [`ROADMAP.md`](ROADMAP.md).

## Infrastructure

- **Supabase** "Master Dashboard" (`yqealeekngxooyoemfba`): `production_log`, `social_connections`, `social_post_queue`, `vw_*` tables, `ec_connectors` registry (46 connectors, 12 active); edge functions `visionweaver-orchestrator`, `visionweaver-studio`, `oauth-callback` and others.
- **Vercel**: hosting (team "Estibancreations").
- **Runway, Zapier, Google Drive, GitHub**: live as connectors. See [`connections/README.md`](connections/README.md).

## Rules for this repo

1. Production records only: no manuscript text beyond what's already published, no secret values, no personal account details. Media masters live in the Dropbox hub / Drive Master Folder — this repo holds code, docs, indexes, and the feed.
2. Original manuscripts outrank production mappings. Crossroads, This Is Your Life and The Arc are separate canons.
3. Every generated asset is logged with its Runway task ID so it can be rebuilt.
4. A settled item is never reported as open again; an unverified item is never reported as done (Steve's verification standard, Oct 21 2026).

## Character identity board standard

New character work follows [Character Identity Board System v1](standards/character-board-system-v1.md): a **Cast Board** for multi-character scene fallout, a **Character Detail Specifications Board** as the canonical detail source, and a **360 View Board** for individual character anchoring. The default is a 32-view master for new or materially changed appearances. A 16-view state board is used for clothing-only or limited non-identity changes. Scene-specific states are versioned and then referenced by the Cast Board.

## Representation and historical locations

The authorized [Representation and Place-Time Standard v1](standards/representation-and-place-time-v1.md) governs new character defaults: intentional inclusive casting, normal representation of Black and fat people, preservation of approved appearance, and evidence-backed scene location/date accuracy. The current balloon-film boy is Black and fat. Runtime enforcement and end-to-end verification remain open release gates.

## Founding pitch and production design

[Preserved founding pitch](strategy/2026-10-02-VISIONWEAVER-FOUNDING-PITCH.md) and [Production Design v2](strategy/VISIONWEAVER-PRODUCTION-DESIGN-v2.md) connect canon, avatars, voices, editable worlds, continuity, physics, autonomy, books and publishing. The revised design contains 30 concrete improvements and evidence gates. **Proposal only: awaiting the Architect's approval to build.**

## Avatar State and animated production — October 3, 2026

- [Avatar State v1.1](standards/avatar-state-board-specification-v1.1.md): the three boards, 16/24/32/full coverage, avatar reference lineage, changes, camera/world anchors, stimulus/contact/reaction, spacecraft/enclosure continuity and acceptance/source gaps.
- [Children's animation and teaching v1.0](standards/children-animation-production-standard-v1.md): YouTube assessment, original style/performance/lesson contracts, exact text/audio, animation/world continuity, workflow and acceptance.

These are documented implementation contracts. Runtime deployment, completed animation and calibrated full coverage are not certified here. Existing accepted production and paused balloon continuation work are preserved.

## Avatar Catalog

[Avatar Catalog v1](standards/avatar-catalog-v1.md) is the dedicated VisionWeaver section and implementation contract for reusable character identity, appearance, coverage, voice, scenes, and product-linked wardrobe. It defines a provisional African American Chicago-origin man (47, 5 ft 11 in, 302 lb, trimmed haircut and beard, glasses, sweat suit, white active shoes) with a user-supplied Poramea shopping link. Visual likeness, shoe variant, camera calibration, and commercial affiliation remain explicit verification gates. The Catalog and purchase path are specifications; their runtime behavior has not been deployed or certified.

## Design Studio — connected authoring 0.2.02

[VisionWeaver | Design Studio](https://visionweaver-design-studio.vercel.app/) provides eleven connected authoring pages, including reusable character states and wardrobe variants, reference coverage/calibration, multi-cast scenes, performance cues, environment/time direction, a review queue, rights/package preparation, history, and proposed Creator / Studio / Enterprise tiers. The [canonical source](https://github.com/estibancreations-svg/DESIGN_STUDIO) owns the shared module.

A **Design Studio** page is part of the Director Studio source navigation. See the [integration record](docs/DESIGN_STUDIO_INTEGRATION.md) for generation, verified behavior, source revision, and deployment boundaries. Cloud login, generated media, checkout, and public asset publication are not certified by this authoring release. The existing approved production and paused balloon continuation are preserved.

## Global Place + People Reference Catalog — October 4, 2026

[Global Place + People Reference Catalog v1](standards/GLOBAL_PLACE_PEOPLE_REFERENCE_CATALOG-v1.md) defines the worldwide reference architecture for believable scenes and original avatar/crowd creation. It covers travel/maps, lodging, cruise/transport, event/community, tourism, open geographic data, licensed photography and social discovery sources through a rights-aware source router.

Each Location Pack pins geography, architecture, transport, population/casting ranges, wardrobe, seasonal/weather state, lighting, ambience, animals/insects, signage/language, activities, camera references and provenance. Source content is classified before reuse; public availability and attribution alone do not grant training or redistribution rights.

This is an implementation contract. Provider credentials, automated ingestion, runtime rights enforcement and generated Location Packs remain open build/verification gates.

## CI — October 4, 2026

The [Quality Gate](docs/QUALITY_GATE.md) is configured for pushes, pull requests and manual runs. The first GitHub run [passed on `bc71815`](https://github.com/estibancreations-svg/VisionWeaver/actions/runs/37334505859) on October 5, 2026: repository integrity, six world-state/balloon regression tests and Director Studio build. This is offline verification; live Avatar State certification and branch-rule enforcement remain pending. The October 4 [workstate](docs/CURRENT-WORKSTATE-2026-10-04.md) is historical on CI.

## Activation checkpoint — October 8, 2026

VisionWeaver closed the navigation/UI buildout review and moved into Avatar State runtime activation and automation proof. Canonical recovery/handoff: [docs/CANONICAL-RECOVERY-AND-PHASE-2-ACTIVATION-2026-10-08.md](docs/CANONICAL-RECOVERY-AND-PHASE-2-ACTIVATION-2026-10-08.md). Current pointer at that time: [docs/CURRENT-WORKSTATE-2026-10-08.md](docs/CURRENT-WORKSTATE-2026-10-08.md). For the current state, see the top of this README and [`ROADMAP.md`](ROADMAP.md).
