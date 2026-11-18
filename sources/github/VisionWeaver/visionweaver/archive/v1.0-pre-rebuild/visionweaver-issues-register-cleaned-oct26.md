# VisionWeaver — Issues Register, Cleaned & Corrected
October 26, 2026 · Consolidates the Oct 23 Prime audit + Oct 26 full system sweep · Duplicates removed, settled items closed, every open item carries its fix and its gate.

## FIXED — closed today, with proof
| # | Issue | Fix | Proof |
|---|---|---|---|
| F1 | Loop assembler did not expand `~/` paths (killed the first Oct 23 run; mitigated one layer up only) | `assemble.py` now expands `~` in the EDL, shots dir, audio dir, output, timeline, and captions path — at the source | Live test Oct 26: full assembly run with tilde paths only → valid 13.83s master from real segments |
| F2 | No Hold Queue card for the photorealistic Ep 1 run — the review surface didn't show the newest work | Card created: "Fireside Ep 1 (v3) — Photorealistic Master," staged, Publish stage at gate | Queue DB now holds 6 jobs; card facts mirror the run manifest |
| F3 | Ep 1 runtime numbers unreconciled (map 1027.5s vs master 1025.42s) | Reconciliation receipt written beside the run manifest: master = EDL within 0.01s; the 2.08s is the trim pass; map is a pre-trim total | `visionweaver/loop/runs/fireside-ep01-v3-runtime-reconciliation.md` |
| F4 | Staged post packet pointed at the WRONG file (old cartoon master) and wrong runtime | Corrected packet v3 written (right file, 17:05, verified facts); v2 preserved, renamed SUPERSEDED — not deleted | `fireside-v3-ep01-post-preview-v3.md` |
| F5 | Wrong "stretched" master sat beside the real one, deliverable by mistake | Moved to `fireside-video/quarantine/` with a DO-NOT-DELIVER readme | Folder listing verified Oct 26 |
| F6 | Dropbox copy of the master claimed but unreceipted | Verified live Oct 26: 270,225,555 B, byte-identical | Dropbox search + metadata, home namespace |
| F7 | "Dead address" (estibancreations101) confusion | Closed by Steve Oct 24; inventory confirmed no workspace document presents it as a live link; no swap needed | Door inventory, Oct 25 |

## FIX-SPECIFIED — fix defined, executes in the relaunch build (Prime code)
| # | Issue | Specified fix |
|---|---|---|
| S1 | `/app/*` and `/auth` routes 404 | Vercel rewrites so both land in the app (door-fix plan on file) |
| S2 | Social sign-in buttons shown but "not turned on yet" | Steve's standing instruction (Oct 26): **sign-ins stay exactly as they are** — no change in this round |
| S3 | Workspace creation is manual after sign-up | Automatic workspace provisioning on account creation — part of the flagship outline, §3 |
| S4 | Worlds Pack filter + Media Library search/type filters do not filter | Wire filters to the asset index (real data layer, flagship §2/§4) |
| S5 | Teams and C-Suite both labeled "09" | Renumber in the relaunch build; checklist verifies |
| S6 | "+ Create → New project" bounces to sign-in in Sample mode | Sample mode gets a working demo project flow (flagship §3) |
| S7 | Home "Open Project" lands on Programs & Projects | Route to project detail |
| S8 | Finance V1 vs V3 contradict; Reports V1 vs V3 contradict | One data source per page; sample figures labeled as sample in every view (flagship §4) |
| S9 | Create & Produce preflight fails 7/7 — no provider connected | Provider Router (flagship §1): Runway first (proven), Higgsfield second (key-gated) |
| S10 | No upload / export / download control anywhere in Prime | Media deposit spaces + export service (flagship §2/§4) |
| S11 | Distribution listing incomplete | Canonical listing set Oct 26 (see below); connections light up per platform as adapters land |
| S12 | Loop has no QC stage, no editing stage, no delivery stage, publish is a stub, jobs are hand-written files | Studio pipeline stages (flagship §4); QC & Edit Window (built Oct 26) is the interim surface |
| S13 | Loop master-reuse decided by timestamp, no content check | Hash-verified reuse (flagship §4) |
| S14 | Crossroads Ep 1 unassembled; Part 2 keyframes in Drive, not local; Part 2 = 1 shot local | Missing-masters procedure — walkthrough checklist §E |
| S15 | No book export path (EPUB/PDF/print); Book 6 manuscript incomplete in Drive inventory | Book pipeline + KDP listing (flagship §4); manuscript completion is a content task for Steve's call |

## GATED — waiting on Steve's tap (not defects)
| # | Item | Gate |
|---|---|---|
| G1 | Fireside Ep 1 publish | His QC verdict: APPROVED in chat |
| G2 | Fresh-account creation walk | His password tap (account creation is on the big-things list) |
| G3 | AvatarEngineering face defect (Prime sample-board art) | His directions (held since Oct 24, per his instruction) |
| G4 | GitHub feed push (Oct 23 audit record, staged) | His approval tap on the push |
| G5 | June's voice lock (currently provisional) | His pick |
| G6 | Higgsfield API key for the router | His key + spend authorization (provider keys one at a time) |

## Canonical distribution & social listing (set Oct 26, 2026, on Steve's order)
**Video/social:** YouTube · TikTok · Instagram · Facebook · **X** · **Yahoo** (video/content syndication)
**Commerce/creator:** **Etsy** · **Amazon / Amazon KDP** (books + merch)
**Already-listed four stay.** Sign-in options are NOT changed in this round — they stay exactly as they are so the build-up starts accurately.
The listing is set in the build spec (this register + the flagship outline §4); the live site shows it when the relaunch build deploys, and the relaunch walkthrough verifies it item by item.
