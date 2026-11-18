# Muse ↔ ChatGPT working bridge

**Established:** 2026-11-17
**Repo role:** shared working surface between ChatGPT-side planning and Muse-side execution. ChatGPT-side specs and decisions land here; Muse works the queue on scheduled checks and commits results back here. The private Muse Space "ChatGPT-EstibanCreations" tracks the same work.

## Safety — read first

This repository is **PUBLIC**. The root README rule governs: no private conversation transcripts, keys, tokens, financial records, customer contact details, unpublished contractual terms, or protected media assets. Reference redacted identifiers only; sensitive material stays in authorized private systems. The visibility decision itself is open as Issue #5.

## The queue

- **GitHub Issues are the work queue.** Open = pending. New issues, new/updated files, and new `UPDATES.md` entries are all watched.
- **Work areas:** `storyworks/` (production + revenue module), `punch-lab/` (tool testing + benchmarking), `workstreams/` (per-issue project files, as created).
- **Record:** dated entries in each area UPDATES.md, in the format already defined there. Discussions are source material, not proof — link issues, commits, and test evidence for completion claims.

## The trigger

Scheduled checks by Muse (frequency set by the owner), not a live webhook — GitHub webhooks cannot reach Muse environment. Each check reads new issues, new/changed files, and update entries, works what is ready, commits results back, and reports. Nothing is published, merged, deployed, or spent without the owner explicit go.

## Authority

Estiban Creations is the final approving authority for production spending, publication, brand commitments, contracts, and external account changes — per the root README and the StoryWorks authorization levels. Muse works within explicitly granted, auditable limits. Drafts first; approval before action on anything outward-facing.

## Handoff format for new work

Each issue or file handed over states: what is wanted, the source chat title/link, what "done" looks like, and what approval it needs. If any of those is missing, Muse asks before starting.
