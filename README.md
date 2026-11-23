# VisionWeaver Research Hub

**Gathered 2026-11-18. Gathering only — nothing here changes the live system.**

> **In the owner's words** — the description he wrote when he created this repo
> (initial commit `6423172`, 2026-11-18), preserved verbatim, typos and all:
>
> "This is where we are now gsthering all the works we've done to date on this
> system and where we are so we can realign with the vision that crested the
> system."

This repo is the research hub for the Estiban Creations system: every version, every
side build, every outline, spec, prompt, and design record, from the beginning of the
concept to now, pulled into one spot so the whole thing can be seen at once.

The owner commissioned it on 2026-11-18 (09:47 CST) with one direction: *don't change
anything, don't update anything, don't force anything to be amended or retracted —
gather it so I can see it.* A correction the same morning (09:51 CST) added: *don't
summarize nothing — put everything where I asked you to put it.* So this hub holds the
**full content** of the source materials, copied as-is under `sources/`, plus the
analysis documents listed below, built from those materials.

## What this system is

Estiban Creations Enterprise is a creative-production operating system: one front door
(the CEO Master Dashboard) opening onto six Core Systems that together run an
AI-assisted media studio — projects, characters, worlds, scripts, renders, approvals,
distribution, finance, and governance — with human approval gates on every consequential
action. The governing design record is the C-Suite System of Record v1.1 (July 13,
2026), the Enterprise Build Spec v1.0, and the Canonical Build Specification of
November 9, 2026 (Directives D1–D25). The live system today is `csuite-command`
(TanStack Start) at https://csuite-command.vercel.app — see [VERSIONS.md](VERSIONS.md)
for the full lineage and [LEFT-BEHIND.md](LEFT-BEHIND.md) for what is unfinished.

## The corrected architecture (owner ruling, 2026-11-11 21:20 CST)

The CEO Master Dashboard (gold/dark, ESTIBAN CREATIONS ENTERPRISE) is the **primary
front door** at `/`. VisionWeaver is **one of 6 Core Systems** linked within it, at
`/visionweaver/*`. The six Core Systems are:

1. **VisionWeaver** — the creative production system (27 pages).
2. **GrantOS** — grants and funding.
3. **LandWeaver** — property and land intelligence.
4. **THELMA** — the AI assistant / intelligence federation (also the CRM system of record).
5. **CMGIO** — the CMGIO office system.
6. **OSIRIS** — the OSIRIS system.

Before November 11, 2026, the app had this backwards (VisionWeaver as the shell, the
CEO Dashboard inside it). Phases A+C (done and verified live 2026-11-11 22:07 CST)
restructured the live app to the corrected shape. The pre-correction structure still
appears throughout the older gathered materials — that is the history, preserved as-is.

## How to navigate

| File | What it answers |
|---|---|
| [TIMELINE.md](TIMELINE.md) | When did things happen? Chronological, concept → now, with retired/dropped markers. |
| [SYSTEM-DESIGN.md](SYSTEM-DESIGN.md) | How did he design it to work? Systems, modules, pages, roles, gates, data homes, providers, design languages. |
| [VERSIONS.md](VERSIONS.md) | Every version and lineage: what it is, where it lives, dates, status, what superseded it. |
| [SECTIONS-AND-SYSTEMS.md](SECTIONS-AND-SYSTEMS.md) | Every system and every section: designed behavior vs. what exists vs. what's missing. |
| [OUTLINES-AND-SPECS.md](OUTLINES-AND-SPECS.md) | Index of every outline, spec, prompt, and build doc — location + status. The full texts live under `sources/`. |
| [LEFT-BEHIND.md](LEFT-BEHIND.md) | Everything dropped, retired, unfinished, or never started, with evidence and dates. |
| [SOURCES.md](SOURCES.md) | Every source consulted, what was withheld and why, and the files that could not be pushed here (binaries). |

Full materials live under `sources/`:

| Directory | Contents |
|---|---|
| `sources/github/` | 26 mirrored repos (default branch): full file contents, file trees, commit histories, pull requests, issues. |
| `sources/drive/` | Google Drive harvest: full document/prompt/spec texts, folder structure preserved. |
| `sources/email/` | 4 system-related emails in full (headers + bodies). |
| `sources/workspace/` | Local workspace system files, copied byte-for-byte. |
| `sources/memory/` | System-related entries from the dated memory logs and goal files, copied verbatim. |

## Gathering-only notice

- **Nothing in this repo changes the live system.** No source repo, Drive file, email,
  database, or deployment was modified to build it. The only writes were new files
  in this repo.
- **Nothing was summarized away.** Source files are copied in full. Duplication across
  sources is preserved, not deduped — the same spec appearing in three places appears
  three times, because that *is* the record.
- **One narrow exception:** literal secret values (API keys, tokens, passwords,
  connection strings, `.env` contents) and OTP codes were never copied. Where a source
  file contained one, only the value was replaced with `[secret value withheld]` and
  the rest of the file kept intact. Two `.env` files were withheld entirely (paths
  noted, contents never read). See [SOURCES.md](SOURCES.md) for the complete list.
- **Binaries could not be pushed by the gathering route** (the snapshot push carries
  UTF-8 text only). 346 binary files — images, PDFs, zips, Office documents — remain
  staged locally and are fully listed in [SOURCES.md](SOURCES.md), with a note on
  adding them via GitHub web upload if wanted.
- **Drafts are drafts.** Several analysis inputs (the Phase B reconciliation record,
  the Phase D table-list draft, the fix plan) are explicitly marked DRAFT / awaiting
  the owner's confirmation in their own texts. This hub reports them as drafts; it
  does not decide them.

## Standing rules that govern this system (from the record)

- **Notebook rule (2026-11-11 21:37 CST):** the Notebook SECTION (functional notes)
  stays and is built, in proper design language. The notebook VIEW DESIGN ("Strategic
  Notepad": yellow paper, blue ruled lines, red margin, marker typography) is deleted
  permanently, never anywhere.
- **Canonical ruling (2026-10-22):** vw3 in `MASTER_CEO_DASHBOARD` is the canonical
  VisionWeaver design. The Director Studio build 0.4.02 is the wrong version.
- **One-system decision (2026-11-01):** C (Master fullstack build) as the body, B (2.0
  loop engine) as the engine, A (vw3) as the design crown.
- **Gate 0 (2026-11-09):** no code / deploy / modify until foundation items M1–M5 are
  provided and verified. M4 (the BOY-001 bundle) is still missing; M5 still awaits the
  owner's confirmation. See [LEFT-BEHIND.md](LEFT-BEHIND.md).
- **Diversity rule (2026-11-05):** every character and cast must reflect the owner's
  blend of 11 backgrounds — never all-Caucasian casting, never a defaulted face.
- **Sealed worlds:** each creative series keeps its own story world; lines are never
  invented; drafts are marked as drafts.

## Counts (as gathered 2026-11-18)

- GitHub: 27 repos live under `estibancreations-svg`; 26 mirrored; 1,090 files copied
  verbatim; 1,901 files inventoried; 1,194 commits; 123 pull requests; 13 issues.
- Drive: 2,003 items enumerated; 1,323 included; 1,088 files staged.
- Email: 4 system-related emails in full; 60+ searches; zero transactional mail from
  Supabase, Vercel, GitHub, Lovable, Resend, or Twilio found.
- Workspace: 601 files copied byte-for-byte + 40 hidden-files texts.
- Memory: 40 files; 1,572 system-related entries copied verbatim.
- Staged text total: 2,629 files, 115.66 MiB. Binaries left local: 346 files, 179.55 MiB.

See [SOURCES.md](SOURCES.md) for the full accounting, including everything withheld,
everything unresolvable, and everything excluded as out of scope.

## Hosting decision and deployment mapping

Estiban Creations selected **Render** for application hosting. Existing Supabase projects continue to provide PostgreSQL, authentication and storage where applicable. This repository's placement is **Discovery · research and build lineage**. Reconcile the repo with the referenced C-Suite and VisionWeaver app before choosing a runtime. Preserve distinct research and product sources.

The GrantOS review verified 27 failed Vercel preview checks across nine commit SHAs, a temporary successful preview checkpoint and a separate production availability block. See the [repository mapping and evidence](docs/RENDER-MIGRATION-MAP.md) for context and release requirements.
