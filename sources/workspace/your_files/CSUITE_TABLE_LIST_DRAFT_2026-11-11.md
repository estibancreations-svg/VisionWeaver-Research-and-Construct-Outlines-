# C-Suite Command — Table List, Auth Plan & Server-Route Plan (DRAFT)

**Status: DRAFT FOR OWNER REVIEW — nothing has been created.** No table, policy, grant, or row was written to Supabase to produce this document. Every fact in §1–§3 was read live (read-only queries, Supabase Management API) on the evening of 2026-11-11 CST. Nothing in this draft is executed until the owner approves it (Decision 9) plus Decisions 7 (auth) and 8 (server routes).

- **Project:** `azoqszhhmmkyqztubgem` — "MASTER_CEO_DASHBOARD", region `us-east-2`, Postgres 17, status `ACTIVE_HEALTHY`
- **Org:** "Estibancreations' Org" — one organization row exists: `EstibanCreationsPrime` (id `b4ff4670-a29b-46d1-8e92-38bb058b5bb7`, status `active`)
- **Plan reference:** `CSUITE_FINDINGS_AND_REAL_PLAN_2026-11-11.md`, Phase D (foundation) + Phase G (CEO pages)
- **App:** `csuite-command` (TanStack Start) — https://csuite-command.vercel.app

---

## §1 — What already exists: 20 tables, all with RLS enabled

Row counts are exact `count(*)` results from 2026-11-11 evening CST.

| Table | Rows | What it holds (observed) |
|---|---|---|
| `projects` | 11 | Projects. status: active 10, draft 1. kind: series 5, commercial 2, film 1, explainer 1, product 1, system 1 |
| `initiatives` | 12 | Initiatives. All status `active`. stage: intake 4, planning 3, progress 2, review 2, completed 1 |
| `records` | 20 | Generic store. kind: `asset` 13, `location` 5, `avatar` 2. This is what the Directors Guild / asset surfaces read |
| `release_gates` | 13 | Release gates. 0/13 implemented (all `UNIMPLEMENTED`) |
| `integration_inventory` | 18 | The 18 integrations. `prime_status`: NOT VERIFIED / PARTIAL / VERIFIED |
| `audit_events` | 6 | Append-only audit trail (UPDATE/DELETE blocked by trigger) |
| `organizations` | 1 | `EstibanCreationsPrime` (active) |
| `page_registry` | 27 | Page registry (id, route, group, primary view V1/V2/V3) |
| `memberships` | 1 | One member, role `architect` |
| `view_preferences` | 0 | Per-user, per-page V1/V2/V3 preference. Empty — no one has saved a view yet |
| `prime_workflow_definitions` | 0 | Prime workflow engine: versioned workflow specs |
| `prime_workflow_runs` | 0 | Prime workflow engine: runs of a definition |
| `prime_workflow_steps` | 0 | Prime workflow engine: steps within a run |
| `prime_dispatch_outbox` | 0 | Prime workflow engine: dispatch queue (thelma/worker/qc) |
| `prime_editorial_revisions` | 0 | Prime: editorial revisions of a run's output |
| `prime_delivery_manifests` | 0 | Prime: delivery manifests per format |
| `prime_qc_evidence` | 0 | Prime: QC pass evidence per run |
| `prime_memory_revisions` | 0 | Prime: versioned memory for avatar/scene/world/voice/workflow/rights/asset subjects |
| `prime_voice_profiles` | 0 | Prime: voice profiles (speaker rights, license) |
| `prime_location_anchors` | 0 | Prime: geographic anchors (country → restaurant) with rights approval |

**No table with any of the 14 proposed names exists.** The collision question is about *similar* tables, answered per-table in §4.

---

## §2 — Policies + grants: the Nov 10 fix is still in place (verified)

### 2a. Anon SELECT policies — all 9 present, unchanged

| Policy | Table | Role | Command | Condition |
|---|---|---|---|---|
| `anon_read_projects` | projects | anon | SELECT | `true` |
| `anon_read_initiatives` | initiatives | anon | SELECT | `true` |
| `anon_read_records` | records | anon | SELECT | `true` |
| `anon_read_release_gates` | release_gates | anon | SELECT | `true` |
| `anon_read_integration_inventory` | integration_inventory | anon | SELECT | `true` |
| `anon_read_audit_events` | audit_events | anon | SELECT | `true` |
| `anon_read_organizations` | organizations | anon | SELECT | `true` |
| `anon_read_page_registry` | page_registry | anon | SELECT | `true` |
| `anon_read_memberships` | memberships | anon | SELECT | `true` |

### 2b. Grants — anon is SELECT-only on the 9 tables

- `anon`: SELECT on all 9 app tables. **No** INSERT/UPDATE/DELETE anywhere. (This is why browser writes as anon fail — by design.)
- `authenticated`: full CRUD on projects / initiatives / records / memberships; INSERT+SELECT+UPDATE on organizations; INSERT+SELECT on audit_events; SELECT-only on integration_inventory / page_registry / release_gates; full CRUD on view_preferences; **no grants at all on any `prime_*` table**.
- `service_role`: ALL privileges on all 20 tables (and bypasses RLS). Lives only in Vercel env vars; never in client code or the repo.

### 2c. Authenticated policy pattern (the pattern new tables must copy)

All policies are PERMISSIVE and use three security-definer helper functions in the `private` schema:

- `private.is_member(org uuid)` — SELECT: the signed-in user has a `memberships` row for that org.
- `private.has_role(org uuid, roles text[])` — writes: the signed-in user holds one of the listed roles for that org.
- `private.org_has_members(org uuid)` — used only by the `mem_bootstrap` policy (first-member bootstrap).

The standard four-policy set (as on projects / initiatives / records):

| Command | Role | Condition |
|---|---|---|
| SELECT | authenticated | `private.is_member(organization_id)` |
| INSERT | authenticated | `private.has_role(organization_id, ARRAY['architect','director','editor']) AND created_by = auth.uid()` |
| UPDATE | authenticated | `private.has_role(organization_id, ARRAY['architect','director','editor'])` (both USING and WITH CHECK) |
| DELETE | authenticated | `private.has_role(organization_id, ARRAY['architect'])` (architect-only) |

Reference tables (integration_inventory, page_registry, release_gates) have only an authenticated SELECT policy (`USING (true)`) — no authenticated writes. `view_preferences` has a single ALL policy: `user_id = auth.uid()` (users touch only their own rows). `audit_events` has SELECT via `is_member` + INSERT via `is_member` AND `actor_id = auth.uid()`; UPDATE/DELETE are blocked by the `private.block_mutation()` trigger, so it is append-only. `memberships` additionally has `mem_bootstrap`: a signed-in user may insert themselves as `architect` for an org they created **only if the org has no members yet** — that condition is already false for EstibanCreationsPrime (it has a member), so bootstrap cannot fire again; new members must be added by the architect (see §6).

Roles (enforced by a CHECK on `memberships.role`): `architect`, `director`, `editor`, `viewer`.

### 2d. Observations (read-only findings, NOT changes — for owner awareness)

1. **Three `prime_*` tables have RLS enabled and ZERO policies** — `prime_dispatch_outbox`, `prime_qc_evidence`, `prime_workflow_steps`. With RLS on and no policy, every role except service_role is denied. Combined with §2b (no anon/authenticated grants on ANY `prime_*` table), the whole Prime engine is effectively **service-role-only** today — even the 7 member-read policies on the other Prime tables cannot be exercised by `authenticated` until grants are added. Recommendation: leave as-is; this is a Phase H question, not a Phase D change.
2. **`view_preferences` has no anon access** (by design — rows are keyed to `auth.uid()`). Until auth lands, V1/V2/V3 choices for signed-out visitors must stay in browser localStorage. Once a user signs in, the server route in §7 saves their choice to this table.
3. **`auth.users` holds 3 users; `memberships` holds 1 row.** Two signed-in-capable accounts have no membership row, so `private.is_member()` returns false for them and every authenticated policy denies them. Setup step in §6 covers adding membership rows (architect-only). Email addresses were NOT read and are not recorded here.
4. **`audit_events.event_type` is a fixed 19-value CHECK list** (see §3). Server routes that log audit events must use one of the 19 existing values, or the migration must extend the list (additive CHECK change — flagged as open question Q8 in §8).

---

## §3 — Existing column conventions (new tables follow these — nothing invented)

### 3a. The dominant shape (projects / initiatives / records / organizations / memberships)

| Column | Type | Default / constraint |
|---|---|---|
| `id` | uuid, PRIMARY KEY | `gen_random_uuid()` |
| `organization_id` | uuid NOT NULL | FK → `organizations(id)` ON DELETE CASCADE |
| `created_by` | uuid NOT NULL | DEFAULT `auth.uid()`, FK → `auth.users(id)` (memberships: nullable, no default) |
| `created_at` / `updated_at` | timestamptz NOT NULL | DEFAULT `now()` |
| `version` | integer NOT NULL | DEFAULT 1 |
| `status` | text | DEFAULT varies; value list enforced by CHECK (see §3b) — **no Postgres enums exist anywhere in this schema; statuses are TEXT + CHECK** |
| `meta` / `data` / `payload` | jsonb | DEFAULT `'{}'` |
| `source_asset_ids` | uuid[] | DEFAULT `'{}'` (projects, initiatives) |

**Triggers:** `private.touch_versioned()` (bumps `updated_at` + `version`) on projects, initiatives, records, organizations. `private.touch_updated()` (bumps `updated_at` only) on release_gates, view_preferences. `private.block_mutation()` on audit_events (append-only).

**Length CHECKs:** names/titles 1–160 chars; summary/note fields ≤ 2000 chars. New tables copy these limits.

### 3b. Status / vocabulary CHECK lists actually in force

| Table.column | Allowed values |
|---|---|
| projects.status | `draft`, `active`, `paused`, `completed`, `archived` |
| projects.kind | `book`, `commercial`, `film`, `image`, `series`, `clip`, `explainer`, `system`, `product`, `podcast`, `game` |
| projects.rights_state / initiatives.rights_state | `unreviewed`, `cleared`, `restricted`, `blocked` |
| initiatives.status | `active`, `paused`, `archived` |
| initiatives.stage | `intake`, `planning`, `progress`, `review`, `completed` |
| records.status | `draft`, `active`, `review`, `approved`, `blocked`, `archived` |
| records.kind | free text, 1–40 chars (in use: `asset`, `avatar`, `location`) |
| organizations.status | `active`, `archived` |
| memberships.role | `architect`, `director`, `editor`, `viewer` |
| release_gates.status | `UNIMPLEMENTED`, `DESIGNED`, `CODED`, `AUTOMATED_TESTED`, `RUNTIME_VERIFIED`, `USER_ACCEPTED`, `RELEASED` |
| integration_inventory.prime_status | `NOT VERIFIED`, `PARTIAL`, `VERIFIED` |
| page_registry.grp / primary_view | `CORE` / `PRODUCTION` / `GOVERNANCE`; `V1` / `V2` / `V3` |
| view_preferences.view | `V1`, `V2`, `V3` |
| audit_events.event_type | `asset.approved`, `project.created`, `avatar.state_locked`, `shot.keyframe_approved`, `provider.job_requested`, `provider.job_completed`, `guild.decision`, `publish.approved`, `release.diagnostic_requested`, `release.diagnostic_acknowledged`, `release.blocked`, `release.approved`, `org.created`, `import.completed`, `project.updated`, `record.created`, `record.updated`, `initiative.moved`, `walkthrough.completed` |

### 3c. Shapes that break the dominant pattern (do NOT copy these by accident)

- `audit_events`: PK is `event_id` (not `id`); no `created_at`/`updated_at`/`version` — it has `occurred_at`; `actor_id` and `correlation_id` are TEXT (not uuid); `project_id` FK → projects ON DELETE SET NULL; `idempotency_key` UNIQUE.
- `integration_inventory`: PK is `provider` (text). No `id`, no `organization_id`, no timestamps.
- `page_registry`: PK is `id` TEXT; `route` UNIQUE; `sort_order` UNIQUE; no `organization_id`.
- `release_gates`: PK is `id` INTEGER; no `organization_id`; `updated_at` only.
- `view_preferences`: composite PK (`user_id`, `page_id`); `page_id` FK → `page_registry(id)` ON DELETE CASCADE; `user_id` FK → `auth.users(id)` ON DELETE CASCADE; no `organization_id`.
- `prime_*` tables: all have `id` uuid + `organization_id` FK → organizations (no CASCADE clause on the Prime FKs); sha256 fields carry a regex CHECK (`^[a-f0-9]{64}$`); several carry `approval_evidence_uri`, `locked_at`/`locked_by`, `approved_at`/`approved_by`. Most have `created_at` only (no `updated_at`/`version`, no touch trigger) except `prime_workflow_runs` and `prime_workflow_steps`, which have `updated_at`.

---

## §4 — The 14-table draft

**Standard block (applies to every table marked "STANDARD" below):** `id` uuid PK DEFAULT `gen_random_uuid()`; `organization_id` uuid NOT NULL FK → `organizations(id)` ON DELETE CASCADE; `created_by` uuid NOT NULL DEFAULT `auth.uid()` FK → `auth.users(id)`; `created_at`/`updated_at` timestamptz NOT NULL DEFAULT `now()`; `version` integer NOT NULL DEFAULT 1; trigger `private.touch_versioned()`; RLS enabled; policies = the §2c four-policy set (with the table's own prefix, e.g. `dec_select`); PLUS `anon_read_<table>` SELECT policy USING (`true`) + `GRANT SELECT TO anon` (the Nov 10 pattern — public can view, never write); `GRANT SELECT, INSERT, UPDATE, DELETE TO authenticated`. Deviations from STANDARD are stated explicitly per table.

### 1. `decisions` — CREATE (no collision)

**Purpose:** The Decision Queue (CEO Dashboard home + VisionWeaver home). Today it reads browser localStorage; this table makes decisions real, shared, and auditable. Phase E wires queue items to a detail view with Approve / Reject / Advance.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `title` | text NOT NULL, CHECK length 1–160 |
| `description` | text, CHECK ≤ 2000 chars |
| `status` | text NOT NULL DEFAULT `'pending'`, CHECK (`pending`, `approved`, `rejected`, `deferred`) |
| `priority` | text NOT NULL DEFAULT `'normal'`, CHECK (`low`, `normal`, `high`, `urgent`) |
| `source` | text — where the decision came from: `guild`, `project`, `manual` |
| `project_id` | uuid NULL, FK → `projects(id)` ON DELETE SET NULL |
| `record_id` | uuid NULL, FK → `records(id)` ON DELETE SET NULL |
| `decided_by` | uuid NULL, FK → `auth.users(id)` |
| `decided_at` | timestamptz NULL |
| `decision_note` | text, CHECK ≤ 2000 chars |
| `meta` | jsonb NOT NULL DEFAULT `'{}'` |

**RLS:** STANDARD. **Collision:** none. (`audit_events` has a `guild.decision` event *type* — that is an audit record of a decision, not the queue item. The server route logs a `guild.decision` audit event when a decision is made; it does not replace this table.)

### 2. `finance_records` — CREATE (no collision)

**Purpose:** Financial Command page + CEO finance panels. Today finance/revenue/analytics are honest empty states; this table is the ledger they read.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `kind` | text NOT NULL, CHECK (`revenue`, `expense`, `budget`, `invoice`, `adjustment`) |
| `amount` | numeric(12,2) NOT NULL — money is `numeric`, never float |
| `currency` | text NOT NULL DEFAULT `'USD'`, CHECK length = 3 |
| `occurred_on` | date NOT NULL DEFAULT CURRENT_DATE |
| `category` | text (e.g. `production`, `licensing`, `operations`) |
| `description` | text, CHECK ≤ 2000 chars |
| `project_id` | uuid NULL, FK → `projects(id)` ON DELETE SET NULL |
| `status` | text NOT NULL DEFAULT `'draft'`, CHECK (`draft`, `posted`, `void`) |
| `reference_uri` | text NULL — link to invoice/receipt evidence (never a credential) |
| `meta` | jsonb NOT NULL DEFAULT `'{}'` |

**RLS:** STANDARD. **Collision:** none. **Rule:** no bank credentials, card numbers, or account logins ever go in this table — amounts and references only.

### 3. `analytics` — CREATE (no collision; append-only variant)

**Purpose:** Distribution / Reports analytics + CEO metric panels. Stores metric snapshots (a value measured at a time), read by charts and totals.

| Column | Type / notes |
|---|---|
| `id` | uuid PK DEFAULT `gen_random_uuid()` |
| `organization_id` | uuid NOT NULL, FK → `organizations(id)` ON DELETE CASCADE |
| `created_by` | uuid NOT NULL DEFAULT `auth.uid()`, FK → `auth.users(id)` |
| `created_at` | timestamptz NOT NULL DEFAULT `now()` |
| `metric_key` | text NOT NULL (e.g. `views`, `revenue_mtd`, `renders_completed`) |
| `metric_value` | numeric NOT NULL |
| `dimensions` | jsonb NOT NULL DEFAULT `'{}'` (e.g. `{"channel": "youtube", "project": "..."}`) |
| `measured_at` | timestamptz NOT NULL DEFAULT `now()` |
| `source` | text — where the measurement came from (`manual`, `runway`, `youtube`, …) |
| `project_id` | uuid NULL, FK → `projects(id)` ON DELETE SET NULL |
| `meta` | jsonb NOT NULL DEFAULT `'{}'` |

**RLS — DEVIATION (stated):** snapshots are immutable history, so there is **no `updated_at`, no `version`, no touch trigger, and no UPDATE/DELETE policy** for `authenticated`. Policies: anon SELECT + authenticated SELECT (`is_member`) + authenticated INSERT (`has_role` architect/director/editor). Corrections go through the service-role server route, which inserts a superseding snapshot rather than rewriting history. **Collision:** none. **Open question Q5 (§8):** retention — how long snapshots are kept before archival.

### 4. `team_members` — CREATE (adjacent to `memberships`, NOT a duplicate)

**Purpose:** C-Suite / Leadership cards (CEO C-Suite page) and the staff directory. Today the 8 officer cards are static; this table makes each card open a real detail view. The roster itself (which officers exist) is Decision 4 / Phase B — this table only stores whatever roster the owner confirms.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `name` | text NOT NULL, CHECK length 1–160 |
| `title` | text NOT NULL — officer/staff title as displayed (e.g. `Chief Executive Officer`) |
| `role_label` | text — directory grouping label, free text. Named `role_label` deliberately: it is NOT the access-control `role` in `memberships` |
| `bio` | text, CHECK ≤ 2000 chars |
| `photo_uri` | text NULL |
| `email` | text NULL — display/contact email only |
| `user_id` | uuid NULL, FK → `auth.users(id)` ON DELETE SET NULL — links a directory entry to a signed-in member when the person is also a system user |
| `sort_order` | integer NOT NULL DEFAULT 0 |
| `status` | text NOT NULL DEFAULT `'active'`, CHECK (`active`, `inactive`) |
| `meta` | jsonb NOT NULL DEFAULT `'{}'` |

**RLS:** STANDARD. **Collision — FLAGGED, resolved as separate:** `memberships` (1 row) is **access control** (who may sign in, with what role). `team_members` is the **public directory** (who the officers/staff are, with bios and photos). Merging them would force every displayed officer to be a login account and every login account to be displayed. Keep separate; link via `user_id` where a person is both. If the owner prefers one table, the alternative is extending `memberships` with title/bio/photo/sort_order — that alternative is NOT recommended, for the reason above.

### 5. `assets` — DO NOT CREATE. Use `records` (kind = 'asset') instead

**Collision — HIGH, verified:** `records` (20 rows) already IS the asset store: 13 rows with `kind = 'asset'`, plus `name`, `status` (CHECK already includes `review` / `approved` / `blocked` — exactly the Directors Guild workflow), `note`, `data` jsonb, `project_id`, and `source_asset_ids`. The live app already reads Directors Guild submissions from `records`. Creating an `assets` table would duplicate it and split every asset workflow across two tables.

**Proposal (needs owner's go):** keep `records` as the asset store. Asset file fields (file URI, MIME type, size, sha256) live in `records.data` jsonb today. If typed columns are wanted later, extend `records` with an additive `ALTER TABLE … ADD COLUMN` (e.g. `file_uri text`, `mime_type text`, `size_bytes bigint`, `sha256 text` with the Prime regex CHECK) — a separate, owner-approved change, not part of this draft. The §7 server routes for approve / request-changes act on `records.status` directly.

### 6. `agents` — CREATE (no collision)

**Purpose:** AI Co-Pilot agent configuration (the 6 agents that show "Not configured"). Stores each agent's identity, capabilities, model, and status — so the Co-Pilot page shows real config state instead of hardcoded placeholders. Live generation/AI behavior still needs Decisions 5–6 (providers + keys + spend); this table only stores config.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `key` | text NOT NULL — stable machine key (e.g. `research`, `writing`); UNIQUE (`organization_id`, `key`) |
| `name` | text NOT NULL, CHECK length 1–160 |
| `description` | text, CHECK ≤ 2000 chars |
| `capabilities` | jsonb NOT NULL DEFAULT `'{}'` |
| `model` | text NULL — model identifier (e.g. provider + model name) |
| `status` | text NOT NULL DEFAULT `'not_configured'`, CHECK (`not_configured`, `configured`, `disabled`) |
| `config` | jsonb NOT NULL DEFAULT `'{}'` — non-secret settings ONLY. **No API keys, tokens, or secrets ever in this table** — keys live in env vars / Secure Vault only |
| `last_run_at` | timestamptz NULL |
| `last_error` | text NULL — honest last-error text, shown in the UI when a run fails |

**RLS:** STANDARD, except UPDATE/DELETE restricted to `architect` only (agent config is governance, not editorial — deviation stated). **Collision:** none. (`prime_workflow_*` is the Prime execution engine — runs and steps — not agent configuration. `prime_dispatch_outbox` destinations `thelma`/`worker`/`qc` are dispatch targets, not agent configs.)

### 7. `avatar_captures` — CREATE (adjacent to `records` kind='avatar' + Prime memory)

**Purpose:** Avatar Studio / Avatar Engineering — the 32 angle slots per avatar. Today the 32 slots are numbered placeholders with no captures. Each row is one captured angle for one avatar subject.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `subject_key` | text NOT NULL — stable avatar subject key, matching the `prime_memory_revisions.subject_key` convention |
| `slot_number` | integer NOT NULL, CHECK 1–32; UNIQUE (`organization_id`, `subject_key`, `slot_number`) |
| `angle` | text NOT NULL (e.g. `front`, `three-quarter-left`, `profile-left`, `back`, `profile-right`, `three-quarter-right`) |
| `image_uri` | text NOT NULL |
| `image_sha256` | text NOT NULL, CHECK regex `^[a-f0-9]{64}$` (the Prime sha256 convention) |
| `status` | text NOT NULL DEFAULT `'draft'`, CHECK (`draft`, `approved`, `rejected`) |
| `record_id` | uuid NULL, FK → `records(id)` ON DELETE SET NULL — links to the kind='avatar' record when one exists |
| `meta` | jsonb NOT NULL DEFAULT `'{}'` |

**RLS:** STANDARD. **Collision — FLAGGED, resolved as separate:** `records` holds 2 kind='avatar' rows (the avatar *records*), and `prime_memory_revisions` can hold `subject_type = 'avatar'` memory (0 rows, service-role-only). Neither stores per-angle captures. This table is the capture store; `record_id` links it to the avatar record. Do not duplicate avatar identity here — `subject_key` is the join key, not a second identity table.

### 8. `saved_worlds` — CREATE (adjacent to Prime location/memory tables)

**Purpose:** Worlds page — saved world boards/layouts the user builds and reopens. Today Worlds view-switching works but there is no saved-world store behind it.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `world_key` | text NOT NULL — stable world key; UNIQUE (`organization_id`, `world_key`) |
| `name` | text NOT NULL, CHECK length 1–160 |
| `description` | text, CHECK ≤ 2000 chars |
| `data` | jsonb NOT NULL DEFAULT `'{}'` — the world definition (scenes, layout, placements) |
| `cover_image_uri` | text NULL |
| `status` | text NOT NULL DEFAULT `'draft'`, CHECK (`draft`, `active`, `archived`) |
| `project_id` | uuid NULL, FK → `projects(id)` ON DELETE SET NULL |
| `location_anchor_id` | uuid NULL, FK → `prime_location_anchors(id)` ON DELETE SET NULL — optional link to a Prime geo anchor when the world is grounded in a real place |

**RLS:** STANDARD. **Collision — FLAGGED, resolved as separate:** `prime_location_anchors` (geo anchors, 0 rows) and `prime_memory_revisions` `subject_type = 'world'` (0 rows) are Prime-engine internals, service-role-only, with rights-gate shapes. `records` kind='location' (5 rows) holds location records. None of them is the UI-facing saved-world store. This table is that store; `location_anchor_id` links outward to Prime rather than duplicating it.

### 9. `security_events` — CREATE (adjacent to `audit_events`, deliberately separate)

**Purpose:** Security Governance page — login attempts, password changes, role changes, policy changes, access denials, key rotations. The page the owner can open and see exactly what happened, when, and from where.

| Column | Type / notes |
|---|---|
| `event_id` | uuid PK DEFAULT `gen_random_uuid()` — matches the `audit_events` naming (not `id`) |
| `organization_id` | uuid NOT NULL, FK → `organizations(id)` ON DELETE CASCADE |
| `occurred_at` | timestamptz NOT NULL DEFAULT `now()` — matches `audit_events` (no `created_at`/`updated_at`/`version`) |
| `event_type` | text NOT NULL, CHECK list (DRAFT list for owner review — Q4, §8): `login.success`, `login.failed`, `logout`, `password.reset_requested`, `password.changed`, `mfa.enabled`, `mfa.disabled`, `role.changed`, `member.added`, `member.removed`, `policy.changed`, `access.denied`, `api_key.rotated`, `session.revoked` |
| `severity` | text NOT NULL DEFAULT `'info'`, CHECK (`info`, `warning`, `critical`) |
| `actor_id` | text NULL — matches the `audit_events.actor_id` TEXT convention (auth uid as text, or `system`, or an IP-derived label for failed logins with no user) |
| `ip_address` | inet NULL |
| `user_agent` | text NULL |
| `details` | jsonb NOT NULL DEFAULT `'{}'` |
| `correlation_id` | text NULL — matches `audit_events`, for tracing one incident across events |

**RLS — DEVIATION (stated, with reason):** append-only like `audit_events` — trigger `private.block_mutation()`; **NO anon policy and NO anon grant** (security events are never public — this is the one deliberate break from the Nov 10 pattern); authenticated SELECT via `private.is_member(organization_id)`; **no authenticated INSERT/UPDATE/DELETE policies** — rows are written only by server routes using the service-role key, so a signed-in user can never forge or erase their own security trail. **Collision — FLAGGED, resolved as separate:** `audit_events` is the *business* audit trail (asset approvals, project changes, guild decisions) with a fixed 19-value business vocabulary. Security events have a different vocabulary (logins, roles, denials), a severity axis, and IP/user-agent fields, and must never be publicly readable. Extending `audit_events` would require altering its CHECK list AND would expose security events through the existing anon policy. Separate table is the correct call.

### 10. `content_items` — CREATE (adjacent to `records`; owner call noted)

**Purpose:** Resources / Distribution content pipeline — publishable content (articles, videos, posts, podcast episodes) moving through draft → review → approved → scheduled → published, with channel and rights tracking.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `title` | text NOT NULL, CHECK length 1–160 |
| `content_type` | text NOT NULL, CHECK (`article`, `video`, `post`, `podcast`, `image`, `other`) |
| `status` | text NOT NULL DEFAULT `'draft'`, CHECK (`draft`, `review`, `approved`, `scheduled`, `published`, `archived`) |
| `channel` | text NULL (e.g. `youtube`, `instagram`, `blog`) |
| `scheduled_at` / `published_at` | timestamptz NULL |
| `content_uri` | text NULL |
| `rights_state` | text NOT NULL DEFAULT `'unreviewed'`, CHECK (`unreviewed`, `cleared`, `restricted`, `blocked`) — same list as projects/initiatives |
| `project_id` | uuid NULL, FK → `projects(id)` ON DELETE SET NULL |
| `record_id` | uuid NULL, FK → `records(id)` ON DELETE SET NULL — links to the underlying asset record when one exists |
| `meta` | jsonb NOT NULL DEFAULT `'{}'` |

**RLS:** STANDARD. **Collision — FLAGGED, with an explicit alternative for the owner:** `records` is a generic store and *could* hold content via a new `kind = 'content'` value (its `kind` is free text, 1–40 chars, and its status list already includes `review`/`approved`). Recommendation is still a dedicated table, because content has a publish workflow (channel, scheduled/published timestamps, rights gate) that does not fit `records`' shape without stuffing everything into `data` jsonb. If the owner prefers the single-store approach, the alternative is: no `content_items` table; use `records` kind='content' + workflow fields in `data`. Either way, NOT both — Q2 in §8.

### 11. `notes` — CREATE (no collision; the Notebook SECTION store)

**Purpose:** The Notebook SECTION (functional notes) — CEO Dashboard Notebook page + the "NOTE PAD" panel on the CEO home, which surfaces these notes. Built in the proper design language (CEO gold/dark; VisionWeaver dark navy + purple). The yellow-paper "Strategic Notepad" VIEW DESIGN is deleted permanently and is never used anywhere, including on any page that reads this table.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `title` | text NOT NULL, CHECK length 1–160 |
| `body` | text NOT NULL |
| `pinned` | boolean NOT NULL DEFAULT false |
| `tags` | text[] NOT NULL DEFAULT `'{}'` |
| `project_id` | uuid NULL, FK → `projects(id)` ON DELETE SET NULL |
| `status` | text NOT NULL DEFAULT `'active'`, CHECK (`active`, `archived`) |
| `sort_order` | integer NOT NULL DEFAULT 0 |

**RLS:** STANDARD. **Collision:** none. (`records.note` is a per-record note *field*, not a notes store. The hardcoded `NOTES` array in `ceo-dashboard.tsx` is replaced by a live read of this table once Phase D creates it.)

### 12. `pending_items` — CREATE (no collision)

**Purpose:** CEO Pending page — the owner's actionable pending list with checkboxes that save. Phase G wires the checkboxes to the §7 toggle route.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `title` | text NOT NULL, CHECK length 1–160 |
| `description` | text, CHECK ≤ 2000 chars |
| `kind` | text NOT NULL, CHECK (`approval`, `task`, `review`, `decision`) |
| `status` | text NOT NULL DEFAULT `'open'`, CHECK (`open`, `done`, `deferred`) |
| `priority` | text NOT NULL DEFAULT `'normal'`, CHECK (`low`, `normal`, `high`, `urgent`) |
| `due_at` | timestamptz NULL |
| `assigned_to` | uuid NULL, FK → `auth.users(id)` |
| `project_id` | uuid NULL, FK → `projects(id)` ON DELETE SET NULL |
| `record_id` | uuid NULL, FK → `records(id)` ON DELETE SET NULL |
| `completed_at` | timestamptz NULL |
| `meta` | jsonb NOT NULL DEFAULT `'{}'` |

**RLS:** STANDARD. **Collision:** none. (`prime_dispatch_outbox` has a `pending` status, but it is a machine dispatch queue for the Prime engine, not a human pending list — different domain entirely.)

### 13. `training_tracks` — CREATE (no collision)

**Purpose:** Training page — the 6 training tracks. Today the cards are static; this table makes each track open a real detail view with its lessons.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `title` | text NOT NULL, CHECK length 1–160 |
| `description` | text, CHECK ≤ 2000 chars |
| `level` | text NOT NULL DEFAULT `'beginner'`, CHECK (`beginner`, `intermediate`, `advanced`) |
| `duration_minutes` | integer NULL, CHECK > 0 |
| `lessons` | jsonb NOT NULL DEFAULT `'[]'` — ordered lesson list (title + content reference per lesson) |
| `cover_image_uri` | text NULL |
| `sort_order` | integer NOT NULL DEFAULT 0 |
| `status` | text NOT NULL DEFAULT `'active'`, CHECK (`draft`, `active`, `archived`) |

**RLS:** STANDARD. **Collision:** none. **Note:** per-user lesson progress (which lessons a signed-in user completed) needs a second table later (`training_progress`: `user_id`, `track_id`, `lesson_key`, `completed_at`) — NOT in this draft. Flagged as Q6 in §8; add only if the owner wants progress tracking.

### 14. `library_items` — CREATE (adjacent to `records` kind='asset')

**Purpose:** Library / Resources curated items — books, courses, articles, videos, templates, tools the owner curates, with links outward. Distinct from the asset store: these are *references* (often external), not stored files.

| Column | Type / notes |
|---|---|
| *(standard block)* | |
| `title` | text NOT NULL, CHECK length 1–160 |
| `creator` | text NULL — author / creator name |
| `item_type` | text NOT NULL, CHECK (`book`, `course`, `article`, `video`, `template`, `tool`, `other`) |
| `description` | text, CHECK ≤ 2000 chars |
| `item_uri` | text NULL — link to the item (external URL or internal path) |
| `tags` | text[] NOT NULL DEFAULT `'{}'` |
| `status` | text NOT NULL DEFAULT `'active'`, CHECK (`draft`, `active`, `archived`) |
| `record_id` | uuid NULL, FK → `records(id)` ON DELETE SET NULL — links to the stored asset record when the library item is also a stored file |
| `meta` | jsonb NOT NULL DEFAULT `'{}'` |

**RLS:** STANDARD. **Collision — FLAGGED, resolved as separate:** adjacent to `records` kind='asset' (stored files). Library items are curated references with creator/type/tags; the `record_id` link connects the two worlds without duplicating either.

---

## §5 — Creation summary (what this draft actually proposes)

| # | Table | Verdict |
|---|---|---|
| 1 | `decisions` | CREATE |
| 2 | `finance_records` | CREATE |
| 3 | `analytics` | CREATE (append-only variant) |
| 4 | `team_members` | CREATE (distinct from `memberships`) |
| 5 | `assets` | **DO NOT CREATE** — extend/use `records` kind='asset' |
| 6 | `agents` | CREATE (architect-only writes) |
| 7 | `avatar_captures` | CREATE |
| 8 | `saved_worlds` | CREATE |
| 9 | `security_events` | CREATE (append-only, no anon access) |
| 10 | `content_items` | CREATE (owner alternative: `records` kind='content' — Q2) |
| 11 | `notes` | CREATE |
| 12 | `pending_items` | CREATE |
| 13 | `training_tracks` | CREATE |
| 14 | `library_items` | CREATE |

**Net: 13 new tables, 1 deliberate non-creation.** No existing table is altered, renamed, or dropped by this draft. The only existing-table change ever discussed (typed columns on `records` for asset files) is explicitly deferred to a separate owner-approved change.

---

## §6 — AUTH plan (draft — Decision 7)

**Recommendation (from the findings doc, unchanged): email/password via Supabase Auth. Sign in to change; public to view.** The anon SELECT policies in §2 stay — a signed-out visitor can always view. Nothing in this plan gates viewing behind a login.

### 6a. What gets built

1. **`/login` page** (today it 404s). Email + password, Supabase Auth `signInWithPassword`. Design: CEO gold/dark (it is the front-door shell's auth screen). **Never the notepad paper look** — no yellow paper, no ruled lines, no red margin, no marker typography, anywhere on this page. This is the exact page where the owner saw the notebook design before; the grep in Phase A must confirm zero notepad tokens in the auth UI.
2. **Sign-out** — header user menu → `signOut()`, returns to the public view. Works from every page.
3. **Real user display** — the hardcoded "The Architect" label is replaced by the signed-in user's display name (from `memberships.display_name`, falling back to the auth email's local part) + their `memberships.role`. Signed-out visitors see "Sign in" instead of a fake identity.
4. **Password reset** — "Forgot password" on `/login` → Supabase Auth reset email → reset page → new password. Uses Supabase's email service (default sender) unless/until custom SMTP is configured in the Supabase dashboard (a later, owner-approved step — not in this draft).
5. **Sign-up: OFF for the public.** There is no public "Create account" on `/login`. New accounts are created by the architect (see §6b). This matches the existing data: 3 auth users exist, 1 membership row exists, and the `mem_bootstrap` policy can no longer fire (the org already has a member). A public sign-up would create auth users with no membership row — able to sign in, able to do nothing, and confusing. No self-service sign-up until the owner asks for it.

### 6b. How a new person gets access (the setup sequence)

1. Architect creates the auth user in the Supabase Dashboard (Authentication → Users → Add user) or via an architect-only server route (§7) that calls the Supabase Admin API with the service-role key.
2. Architect adds a `memberships` row for that user (`user_id`, `organization_id` = EstibanCreationsPrime, `role`, `display_name`, `email`). The existing `mem_insert` policy allows this for architects only. Until this row exists, the user signs in successfully but every `is_member` / `has_role` check fails and they see read-only public data — this is the current state of the 2 auth users without membership rows (see §2d.3). The fix for those two accounts is the same step: add their membership rows, with the owner's say-so on their roles.
3. The user signs in at `/login` and their role governs what the server routes allow (§7).

### 6c. Enforcement flag — OFF until verified

A single flag, `AUTH_ENFORCEMENT` (Vercel env var, default `off`), controls **UI gating only**:

- **OFF (initial state, until verified):** write buttons are visible to everyone, but clicking one while signed out shows an honest "Sign in to change this" prompt that links to `/login`. No page is gated. Server routes ALWAYS require a valid session + role regardless of the flag (they fail closed — see §7). The flag never weakens the server.
- **ON (only after verification):** write buttons are hidden/disabled for signed-out visitors; signed-in members see them normally. Flipped only after the verification in §6d passes live.

**Verification before flipping ON (all live, in the browser):** (1) sign in with the architect account → user display shows the real name + role; (2) perform one write through a server route (recommend: pause/resume a test project) → the change persists after reload; (3) sign out → the view returns to public, write buttons prompt for sign-in; (4) password reset email arrives and a reset completes; (5) a wrong password shows an honest error and logs a `login.failed` security event. If any step fails, the flag stays OFF and the failure is reported, not worked around.

### 6d. Recovery path if locked out

1. **Password reset email** (primary) — §6a.4. Works as long as the owner can receive email at the account's address.
2. **Supabase Dashboard** (break-glass) — Authentication → Users → select user → "Send password recovery" or set a new password directly. Requires Supabase dashboard access (estibancreations@gmail.com, the sole org Owner).
3. **Service-role reset** (last resort) — a server-side Admin API call with `SUPABASE_SERVICE_ROLE_KEY` (Vercel env var only) resets any user's password. Never exposed in client code; performed only on the owner's direct instruction.
4. **No custom password storage anywhere.** Passwords live only in Supabase Auth (`auth.users`, bcrypt-hashed by Supabase). No password, hash, or reset token is ever written to any `public` table, file, or log.

### 6e. What auth does NOT do

- Does not change any existing policy or grant (the §2 pattern is reused, not rewritten).
- Does not add OAuth (Google/Apple/Microsoft) — email/password only, until the owner asks. The 2.0 app's disabled OAuth buttons are a separate track.
- Does not create a second user store. `auth.users` is the identity store; `memberships` is the role store; `team_members` is the directory. Three different jobs, three different tables, linked by `user_id` — never merged.

---

## §7 — Server-route plan (draft — Decision 8)

**Pattern (every route, no exceptions):** TanStack Start server function. (1) Validate input (reject bad shapes with an honest error — never trust the client). (2) Read the session from the request cookies; require a signed-in user — fail closed with "Sign in required" if there is none. (3) Check the user's `memberships` role for EstibanCreationsPrime; require the role the action needs (see table). (4) Perform the write with a server-side Supabase client using `SUPABASE_SERVICE_ROLE_KEY` from env vars — **server-only, never imported into client code, never shipped to the browser**. (5) Log an `audit_events` row for business actions (using one of the 19 existing event types, §3b) and a `security_events` row for auth/security actions. (6) Return `{ ok: true, data }` or `{ ok: false, error }` — honest errors, never a silent success.

**Why service-role on the server instead of direct browser writes:** the browser client uses the publishable key as `anon`/`authenticated` and is bound by RLS; server routes centralize validation, role checks, and audit logging in one auditable place, and keep the service key off the client entirely. The RLS policies in §2c remain as defense-in-depth for any direct client access — they are not bypassed casually; the server route re-checks the same role rules before using the service key.

### 7a. Route list — one route per write type

Routes live under `src/routes/api/` (TanStack Start server functions; exact file layout follows the existing `csuite-command` conventions at build time).

| # | Route (draft name) | Action | Writes to | Min. role | Audit event |
|---|---|---|---|---|---|
| 1 | `guildApprove` | Approve a Directors Guild submission | `records.status` → `approved` | editor | `asset.approved` |
| 2 | `guildRequestChanges` | Request changes on a submission (with note) | `records.status` → `blocked` + `note` | editor | `record.updated` |
| 3 | `projectPause` / `projectResume` | Pause / resume a project | `projects.status` → `paused` / `active` | editor | `project.updated` |
| 4 | `projectCreate` | Create a project (from "New Project") | `projects` insert | editor | `project.created` |
| 5 | `projectUpdate` | Edit project fields | `projects` update | editor | `project.updated` |
| 6 | `decisionSave` | Create / edit a decision | `decisions` insert/update | editor | `guild.decision` |
| 7 | `decisionDecide` | Approve / reject / defer a decision | `decisions` status + `decided_by/at` | director | `guild.decision` |
| 8 | `noteSave` | Create / edit a Notebook note | `notes` insert/update | editor | *(see Q8 — new event type proposed)* |
| 9 | `noteDelete` | Archive a note (soft — status, not DELETE) | `notes.status` → `archived` | editor | *(see Q8)* |
| 10 | `pendingToggle` | Check / uncheck a pending item | `pending_items.status` + `completed_at` | editor | *(see Q8)* |
| 11 | `pendingSave` | Create / edit a pending item | `pending_items` insert/update | editor | *(see Q8)* |
| 12 | `financeSave` | Create / edit a finance record | `finance_records` insert/update | director | *(see Q8)* |
| 13 | `financePost` | Post a draft record (draft → posted) | `finance_records.status` | director | *(see Q8)* |
| 14 | `teamMemberSave` | Create / edit a directory entry | `team_members` insert/update | architect | *(see Q8)* |
| 15 | `trackSave` | Create / edit a training track | `training_tracks` insert/update | editor | *(see Q8)* |
| 16 | `librarySave` | Create / edit a library item | `library_items` insert/update | editor | *(see Q8)* |
| 17 | `contentSave` | Create / edit a content item | `content_items` insert/update | editor | `record.updated` |
| 18 | `contentPublish` | Publish / schedule content | `content_items.status` + timestamps | director | `publish.approved` |
| 19 | `worldSave` | Create / edit a saved world | `saved_worlds` insert/update | editor | *(see Q8)* |
| 20 | `avatarCaptureSave` | Save / approve an avatar angle capture | `avatar_captures` insert/update | editor | `avatar.state_locked` (on approve) |
| 21 | `agentConfigSave` | Change an agent's config/status | `agents` update | architect | *(see Q8)* |
| 22 | `viewPreferenceSave` | Save V1/V2/V3 choice for a page | `view_preferences` upsert | any member | none (preference, not audited) |
| 23 | `analyticsRecord` | Record a metric snapshot | `analytics` insert | server-only* | none |
| 24 | `memberAdd` | Add a membership row for a new user | `memberships` insert | architect | `org.created`† |
| 25 | `securityEventLog` | Log a security event (called by auth flows + other routes) | `security_events` insert | server-only* | none (it IS the security log) |

\* *Server-only* = no browser button calls it directly; it is called by other server code (auth callbacks, scheduled jobs, provider webhooks) with the service key. It still validates its input.
† `memberAdd` has no perfect existing event type; `org.created` is a placeholder suggestion — Q8 covers whether to extend the vocabulary instead.

### 7b. Verification — ONE route end-to-end before wiring all buttons

Per Phase D: build route #3 (`projectPause`/`projectResume`) first — smallest surface, exercises session + role + write + audit in one path. Verify live: sign in → pause a test project → reload → status persists → audit event row exists → resume → status persists → sign out → the same call fails closed with "Sign in required". Only after that pass do the remaining routes get built to the same pattern. No button in Phase E is wired to an unverified route.

### 7c. What server routes do NOT do

- Do not run generation or AI calls (Decisions 5–6 gate those; routes only store config/results).
- Do not accept the service-role key, or any secret, from the client.
- Do not skip the role check because "the UI hid the button" — the server is the enforcement point; the UI is convenience.
- Do not write to the `prime_*` engine tables (service-role-only internals; Phase H question).

---

## §8 — Open questions for the owner (decisions this draft needs)

| # | Question | Recommendation in this draft |
|---|---|---|
| Q1 | `assets`: confirm using `records` kind='asset' (no new table)? | Yes — §4.5. The duplicate is the thing to avoid. |
| Q2 | `content_items`: dedicated table, or `records` kind='content'? | Dedicated table (§4.10) — publish workflow doesn't fit `records`. Either way, not both. |
| Q3 | `team_members` vs `memberships`: keep separate (directory vs access control)? | Yes — §4.4. Linked by `user_id` where a person is both. |
| Q4 | `security_events` event-type list (§4.9) — approve as drafted, add, or remove? | Approve the 14 drafted values; additions later need a CHECK change. |
| Q5 | `analytics` retention — keep snapshots forever, or archive after N months? | No recommendation; needs the owner's call (affects a future cleanup job, not this migration). |
| Q6 | Training progress tracking — add `training_progress` now, or later? | Later (Phase E follow-up) — only if the owner wants per-user progress. |
| Q7 | The 2 auth users with no membership row — who are they, and what roles should they get (or should their access stay read-only)? | Owner's call; the architect adds rows per §6b. No emails were read for this draft. |
| Q8 | Audit vocabulary: extend `audit_events.event_type` CHECK with new values for the §7 routes marked *(see Q8)* (e.g. `note.created`, `note.updated`, `pending.completed`, `finance.posted`, `member.added`, `agent.configured`, `world.saved`, `track.updated`, `library.updated`)? Extending is an additive CHECK change on an existing table — needs explicit go. Alternative: reuse the closest existing value (`record.updated`, `project.updated`) and put the detail in `payload`. | Prefer extending the list (precise audit trail), but only with explicit go — it touches an existing table's constraint. |
| Q9 | `security_events` has no anon access by design (§4.9). Confirm the owner is comfortable that this is the one table the public can never read. | Yes — security events are never public. |

**Decisions this draft is gated on (from the findings doc §10):** Decision 7 (auth — §6), Decision 8 (server routes + service-role key — §7), Decision 9 (this table list — §4/§5). Decision 4 (roster) affects only the *seed data* for `team_members`, not the table shape — the table can be created before the roster is settled, and seeded when it is.

---

## §9 — Migration shape (draft — how Phase D will execute, after approval)

1. **One additive migration**, run via the Supabase Management API / SQL editor. Every statement idempotent: `CREATE TABLE IF NOT EXISTS`, `DROP POLICY IF EXISTS` before `CREATE POLICY`, `CREATE TRIGGER` guarded by existence check. No `DROP TABLE`, no `ALTER TABLE` on existing tables except Q8 (only with explicit go).
2. **Order:** tables → CHECKs/FKs (inline) → `touch_versioned` / `block_mutation` triggers → `ENABLE ROW LEVEL SECURITY` → policies → grants → verification queries.
3. **Verification queries (read-only, run immediately after):** table count = 33 (20 + 13); every new table has RLS enabled; every new table except `security_events` has its `anon_read_*` policy + anon SELECT grant; `security_events` has NO anon policy/grant; a signed-out REST read of each new table returns 200 with 0 rows (not 42501); an anon INSERT attempt fails; one server route passes the §7b end-to-end test.
4. **Types + build:** regenerate real Supabase types from the live schema; add `tsc --noEmit` to the build (the Nov 10 home-page crash shipped because the build was `vite build` only).
5. **Rollback:** because the migration is purely additive (new tables only, no existing-table changes except possibly Q8), rollback is `DROP TABLE IF EXISTS` on the new tables in reverse dependency order. No data loss is possible from the migration itself — the new tables start empty.

---

## §10 — Basis of this draft (what was actually verified, and what was not)

**Verified live (read-only, 2026-11-11 evening CST):** 20 tables + exact row counts; full column shapes for all 20 tables; all 42 RLS policies verbatim; all grants for anon/authenticated/service_role; all PK/FK/UNIQUE/CHECK constraints; all triggers; the 6 `private` helper functions; zero custom enums; the single organization row; `auth.users` count = 3. The Nov 10 anon SELECT policies + grants are intact and unchanged.

**NOT verified / NOT done (honest gaps):** email addresses and identities of the 3 auth users were deliberately not read; contents of any table beyond the aggregate counts and value distributions in §1/§3 were not dumped; the `prime_*` engine's runtime behavior was not tested (all 10 tables are empty and service-role-only); Supabase Auth email deliverability (reset emails) was not tested — that is part of §6c verification, live, after build. No code was written, no table created, no policy changed, no GitHub repo touched.

**Files:** this draft — `~/workspace/your_files/CSUITE_TABLE_LIST_DRAFT_2026-11-11.md`. Governing plan — `~/workspace/your_files/CSUITE_FINDINGS_AND_REAL_PLAN_2026-11-11.md` (Phase D, §10 Decisions 7/8/9).
