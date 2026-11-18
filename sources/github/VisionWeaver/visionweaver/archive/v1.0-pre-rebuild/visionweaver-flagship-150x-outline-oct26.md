# VisionWeaver Flagship — the 150× Upgrade Outline
October 26, 2026 · OUTLINE ONLY — nothing built · For Steve's review and direction · Basis: the Oct 26 full system sweep + the Higgsfield GitHub walkthrough

## The surpass thesis
The open and commercial references each hold one piece. Higgsfield holds the engine room: a model catalog behind one async job API — but no studio, no story, no QC, no publishing, no memory. The little OpenHiggsfield holds a studio sketch — characters, six scenes, a cost estimate, an FFmpeg assembly — with no engine of its own. Open Generative AI holds a front-end over someone else's aggregator. **Nobody holds the whole chain.** The flagship VisionWeaver is the whole chain, owned end to end: intake → conversation-first production → generation across every major catalog → QC → edit → approval → publish → reporting — with the memory of every decision saved where the system can find it again. That is the 150×: not a better generator, a complete production company in a box, at the top tier ("the most expensive set").

## §1 — The Provider Router (the key setting)
One internal job contract for every generation, modeled on the pattern the Higgsfield packages prove: submit → request ID → poll or webhook → five-state lifecycle (queued / in progress / completed / failed-refunded / rejected-refunded) → hosted result pulled into our own storage immediately. **Cost is estimated before any job runs** (your standing rule, as a system feature, the way their CLI does it).
Adapters, in order: **Runway** (proven here, Oct 23 run) · **Higgsfield API** (their full catalog behind one key: Soul identity line, Cinematic Studio, plus hosted Veo, Kling, Seedance, FLUX, GPT Image, and the rest — and "all the ones Runway also hosts," reached through whichever door is cheaper or better per job) · **fal** (the OpenHiggsfield adapter pattern) · **self-hosted inference nodes** (§2). Prime's Create & Produce preflight plugs into the router; a job that cannot price itself does not run.

## §2 — Self-hosted platform + hosted models
Two meanings of "host," both accounted for:
- **The platform, self-hosted:** Prime packaged as a deployable unit (container + database + storage config) that runs on our infrastructure — or a flagship subscriber's — with automatic workspace provisioning at sign-up, fixing the manual-workspace defect by design. Data is never trapped: every workspace exports whole.
- **The models, hosted the way Higgsfield hosts them:** a catalog behind our API — third-party models reached by key, PLUS open-weight models (Wan-class video, Stable Diffusion-class image) running on GPU nodes we control, orchestrated with the same queue-and-shard pattern their open framework repo demonstrates. Open weights on our nodes = no per-call provider fee and no 7-day output window; proprietary models stay on their clouds, reached through the router. The system picks per job: ours when we can, theirs when we must.

## §3 — The new-user floor
Sign-up creates the workspace automatically; the first session lands in a working demo project (Sample data clearly labeled in every view — the Finance/Reports contradiction dies here) with a guided first production: one scene, real router, cost shown before it runs. Sign-in options stay exactly as they are today (Steve's instruction, Oct 26) so the build-up starts accurately.

## §4 — The studio pipeline (what none of the references have)
Cast → Voice → Animate → Assemble (the proven loop) **plus the missing stages the sweep named**: a real **QC stage** inside the pipeline (probe, silence scan, frame grabs, runtime reconciliation, finished-video scoring of our own) → a **track editor** (the QC & Edit Window grows into it: cue-level trim/re-match, re-render from inside) → **delivery stage** (master + receipts land in the save map automatically) → **publish adapters** for the canonical listing: YouTube, TikTok, Instagram, Facebook, X, Yahoo, Etsy, Amazon/Amazon KDP — books flow to KDP from the new **book pipeline** (index → manuscript → EPUB/PDF/print export). Job intake becomes a form, not a hand-written file. Master reuse is hash-verified, never timestamp-trusted. Business reporting (views, reach, engagement, spend, sales, attribution, ROI) closes the chain — your standing reporting want, built into the flagship tier.

## §5 — Memory, saving & retention (the locked-in layer)
The system knows what to save, where, and for how long — a **Save Map** in system settings that every stage obeys:
- **Masters & media of record** → Dropbox hub (`/Estiban Creations/<Project>/`) — the standing route, now enforced by the delivery stage, with byte-size receipts in the run manifest.
- **Cross-system handoffs** → Drive Master Folder (00–04 structure already standing).
- **Project memory** — cast locks, voice picks, conversation maps, EDLs, QC verdicts, manifests → the project record in the database AND a plain-file mirror in the project folder, so memory survives any single system.
- **Working files** → local workspace; **exports** (MP4, EPUB, PDF, packets, brandbooks) generatable on demand to Dropbox, Drive, or direct download — external options always available.
- **Retention:** masters permanent · provider outputs pulled into our storage the moment they complete (a provider's hosting window is never our archive) · intermediates 30 days, then reviewed before any delete (deletes stay gated) · wrong files go to quarantine, never silently deleted.
Identity gets both mechanisms: our locked-still/reference method **and** trained identity references (Soul ID-class) through the router — the avatar system gains the piece it has no equivalent of today.

## §6 — The agent layer
Our own skills, on the Higgsfield pattern but wired to our gates: THELMA and the officers drive the router and the pipeline through typed actions; grants default DISABLED and activate one at a time by your authorization (the C-Suite rule, unchanged). The Hold Queue remains the human surface: questions up front, costs before runs, verdicts recorded.

## What this surpasses, reference by reference
- **vs Higgsfield:** they rent generation; the flagship owns the studio, the memory, the QC, the publishing, and the customer relationship — and can still call their catalog through the router when it's the best tool.
- **vs OpenHiggsfield:** same studio idea, production-grade: real provider router, real QC, real gates, real retention — not a six-scene demo.
- **vs Open Generative AI:** no intermediary skimming the keys; our catalog, our billing, our brand — and a story pipeline, not a model browser.

## Order of build (when you say go — not before)
Doors/rewrites → new-user floor → Provider Router (Runway adapter first) → Save Map + delivery stage → QC stage → editor → publish adapters + expanded listing → book pipeline → self-host packaging → agent skills → commerce/tiers last. Each stage lands with its walkthrough-checklist section updated, and the relaunch walk (§ checklist) is re-run per stage.
