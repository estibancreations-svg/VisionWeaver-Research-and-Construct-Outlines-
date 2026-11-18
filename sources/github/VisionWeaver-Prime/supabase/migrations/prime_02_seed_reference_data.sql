-- prime_02_seed_reference_data
-- Reconstructed source-control baseline for reference data already applied to the dedicated Prime database.
-- Runtime user starter projects are inserted by the signed-in app per workspace; this file seeds global reference tables only.

create table if not exists public.page_registry (
  id text primary key,
  label text not null,
  grp text not null,
  route text not null,
  primary_view text not null,
  view_names jsonb not null,
  purpose text not null,
  sort_order integer not null
);

create table if not exists public.integration_inventory (
  provider text primary key,
  scope text not null,
  observed text not null,
  prerequisites text not null,
  prime_status text not null default 'NOT VERIFIED',
  probe_note text,
  verified_at timestamptz,
  evidence_uri text
);

create table if not exists public.release_gates (
  id integer primary key,
  gate text not null,
  status text not null,
  evidence_uri text,
  updated_at timestamptz not null default now()
);

alter table public.page_registry enable row level security;
alter table public.integration_inventory enable row level security;
alter table public.release_gates enable row level security;

drop policy if exists page_registry_read on public.page_registry;
create policy page_registry_read on public.page_registry for select using (true);
drop policy if exists integration_inventory_read on public.integration_inventory;
create policy integration_inventory_read on public.integration_inventory for select using (true);
drop policy if exists release_gates_read on public.release_gates;
create policy release_gates_read on public.release_gates for select using (true);

insert into public.page_registry (id,label,grp,route,primary_view,view_names,purpose,sort_order) values
('home','Home Dashboard','CORE','/app/home','V1','{"V1":"Cinematic Dashboard","V2":"Studio Overview","V3":"Project Focus"}','VisionWeaver Prime landing, featured real projects, active project, production pipeline, connection health, recent activity.',1),
('vision-builder','Vision Builder','CORE','/app/vision-builder','V1','{"V1":"Creative Command Canvas","V2":"Blueprint & Dependencies","V3":"Concept-to-Production Map"}','Prompt-to-project intake for videos, images, books and movies; model selection, references and approval.',2),
('strategic-planner','Strategic Planner','CORE','/app/strategic-planner','V1','{"V1":"Strategic Command Center","V2":"Scenario & Roadmap Studio","V3":"Goals, Risks & Outcomes"}','Plan, align, execute and measure objectives, milestones, dependency and cost.',3),
('initiatives','Initiatives','CORE','/app/initiatives','V2','{"V1":"Initiative Overview","V2":"Initiative Pipeline","V3":"Impact & Dependencies"}','Kanban with Intake, Planning, Progress, Review, Completed; live records and drag/drop with audit.',4),
('programs-projects','Programs & Projects','CORE','/app/programs-projects','V2','{"V1":"Portfolio Command","V2":"Program & Project Workspace","V3":"Timeline & Dependencies"}','Project portfolio, episodes, tasks, production stage, asset lineage and project permissions.',5),
('ai-co-pilot','AI Co-Pilot','CORE','/app/ai-co-pilot','V2','{"V1":"AI Command Center","V2":"Agent Workflow Center","V3":"Specialist Marketplace"}','Orchestrate THELMA, research, content, video, compliance, CMGIO and quality agents; human approval.',6),
('cmi','CMI','CORE','/app/cmi','V1','{"V1":"Creative & Market Intelligence","V2":"Signals & Trends","V3":"Opportunity Intelligence"}','Creative and market intelligence with attributable sources and observed trends; no fabricated analytics.',7),
('directors-guild','Directors Guild','CORE','/app/directors-guild','V2','{"V1":"Guild Overview","V2":"Review & Decision Queue","V3":"Department Workrooms"}','Department submissions, shot/keyframe approval, revision queue, explicit publishing authorization.',8),
('teams','Teams','CORE','/app/teams','V1','{"V1":"Organization Command","V2":"Authority & Handoff Map","V3":"Workforce & Agent Capacity"}','People, membership, invitations, team tasks, department collaboration.',9),
('c-suite','C-Suite','CORE','/app/c-suite','V1','{"V1":"Executive Team","V2":"Authority & Handoff Map","V3":"Agent Operations"}','Executive agents including THELMA and CMGIO; delegation, role-based authority, reports.',10),
('create-produce','Create & Produce','PRODUCTION','/app/create-produce','V1','{"V1":"Creation Launcher","V2":"Production Workflow","V3":"Provider Workbench"}','Start a book, commercial, film, image, series or clip; select project, lock references, and run preflight.',11),
('book-creation','Book Creation','PRODUCTION','/app/book-creation','V1','{"V1":"Book Command Center","V2":"Writing Workspace","V3":"Publishing Pipeline"}','Series canon, manuscripts, chapter-to-episode, adaptation, cover, edits, publication; preserve approved Book Creation page.',12),
('avatar-engineering','Avatar Engineering','PRODUCTION','/app/avatar-engineering','V2','{"V1":"Avatar Overview","V2":"Avatar State Studio","V3":"360 Engineering"}','A Cast Board, Character Detail Specifications Board, 360 View Board; 32 default, 16 wardrobe, 64 expansion.',13),
('worlds-locations','Worlds & Locations','PRODUCTION','/app/worlds-locations','V2','{"V1":"Cinematic Grid","V2":"Interactive Map","V3":"World Builder Studio"}','Real-world location packs, geospatial anchors, time/place evidence, weather/acoustics, offscreen state and rights.',14),
('design-studio','Design Studio','PRODUCTION','/app/design-studio','V2','{"V1":"Create Grid","V2":"Design Workspace","V3":"Catalogue Builder"}','Avatar and scene design, catalog, performance, effects, private licensing/store, history and safe publishing.',15),
('design-commercial','Design & Commercial','PRODUCTION','/app/design-commercial','V1','{"V1":"Campaign Command Grid","V2":"Interactive Commercial Studio","V3":"Placement & Performance"}','Brief, script, brand/product lock, 30s storyboard, scene/voice/text cards, variants and approvals.',16),
('scene-production','Scene & Production','PRODUCTION','/app/scene-production','V1','{"V1":"Production Workspace","V2":"Timeline & Continuity","V3":"Scene Operations"}','Shot list, storyboard, maps, camera/face/light locks, clip continuation, stitching, sound and generation.',17),
('media-library','Media Library','PRODUCTION','/app/media-library','V2','{"V1":"Asset Overview","V2":"Search & Filter","V3":"Collections & Lineage"}','Versioned images, video, audio, text, reference packs, thumbnails, provenance, rights and reuse.',18),
('post-production','Post Production','PRODUCTION','/app/post-production','V1','{"V1":"Edit & Finish Desk","V2":"Color, Audio & VFX","V3":"AI Finishing & Delivery"}','Timeline editing, audio/VO, color, effects, captions, stitch, export 16:9 and 9:16.',19),
('distribution-growth','Distribution & Growth','PRODUCTION','/app/distribution-growth','V2','{"V1":"Distribution Overview","V2":"Content Pipeline","V3":"Analytics & Growth"}','Approval-led YouTube/TikTok/Instagram/Facebook publication, repurposing, campaign insights.',20),
('quality-audit','Quality & Audit','GOVERNANCE','/app/quality-audit','V1','{"V1":"Quality Command Center","V2":"Evidence & Verification","V3":"Release Gate & Audit Trail"}','The Auditor, VERITAS, Quality Control Agency, rights, immutable evidence, THELMA acknowledgment.',21),
('finance-accounting','Finance & Accounting','GOVERNANCE','/app/finance-accounting','V1','{"V1":"Financial Command Center","V2":"Project Budget & Cost Control","V3":"Accounting & Revenue Operations"}','Real budgets, cost/credit ledger, invoices, revenue, subscriptions, provider spend, approvals.',22),
('it-security','IT & Security','GOVERNANCE','/app/it-security','V2','{"V1":"IT & Security Command","V2":"Security & Infrastructure","V3":"Security, Reliability & Incidents"}','Provider connection inventory, RBAC, zero-trust policy, backups, logs, service health and incidents.',23),
('resources','Resources','GOVERNANCE','/app/resources','V2','{"V1":"Resource Library","V2":"Resources Hub","V3":"Collections & Collaboration"}','Training, tutorials, workflows, templates, production guides, licensed sources.',24),
('assets-knowledge','Assets & Knowledge','GOVERNANCE','/app/assets-knowledge','V2','{"V1":"Assets Overview","V2":"Assets Library","V3":"Collections & Knowledge"}','Canon, scripts, approved visual references, knowledge base, asset rights, source evidence.',25),
('reports-insights','Reports & Insights','GOVERNANCE','/app/reports-insights','V2','{"V1":"Executive Reporting","V2":"Intelligence & Reporting","V3":"Insight Explorer"}','Real system and production metrics, provenance, filters, export, scheduled reporting.',26),
('settings','Settings','GOVERNANCE','/app/settings','V2','{"V1":"Quick Settings","V2":"Visual Views & System Control","V3":"Advanced Administration"}','Per-page V1/V2/V3 selections, theme, provider connections, team roles, notifications and permissions.',27)
on conflict (id) do update set label=excluded.label, grp=excluded.grp, route=excluded.route, primary_view=excluded.primary_view, view_names=excluded.view_names, purpose=excluded.purpose, sort_order=excluded.sort_order;

insert into public.integration_inventory (provider,scope,observed,prerequisites,prime_status,probe_note) values
('Prime UI','static frontend, manifest build, approved visual shell','Dedicated VisionWeaver Prime site deployed.','Mobile and desktop visual acceptance against approved board.','PARTIAL','Shell visible; workspace/data checks still required.'),
('GitHub','canonical repo, release evidence, future Actions gate','Private repo created and committed.','Branch protection and GitHub Actions quality gate.','PARTIAL','Repository exists; automated workflow now tracked separately.'),
('Vercel','hosting, SSO protection, deployment status','Dedicated Vercel project serves the site.','Deployment verification after each commit.','PARTIAL','Vercel build status is external release evidence.'),
('Supabase','auth, RLS, data, audit ledger','Dedicated project reachable with RLS enforced.','Workspace setup, two-user RLS isolation, complete migration baseline.','PARTIAL','Baseline files reconstructed in repo.'),
('Sign-in','email/password, magic link, OAuth provider buttons','Signed-in mobile session observed.','Configure Google, Apple and Azure provider secrets in Supabase.','PARTIAL','Provider buttons depend on owner setup.'),
('Workspace setup','organization, membership, starter records, active project','Previously incomplete.','Successful signed-in workspace reconciliation.','PARTIAL','Repair layer seeds starter records for architects with empty workspace.'),
('THELMA AI','diagnostics, agent acknowledgment, release readiness','Not directly connected to Prime runtime.','Signed server-to-server diagnostic callback and stored response id.','NOT VERIFIED','Current automation queues a diagnostic directive in the audit log.'),
('Runway','video/image generation and provider task state','Workspace connector exists outside Prime.','Server-side adapter, credit guard, webhook/polling.','NOT VERIFIED',null),
('Higgsfield','video/camera/3D/marketing generation','Workspace connector exists outside Prime.','Server-side adapter, credit guard, reference manifest support.','NOT VERIFIED',null),
('Figma','design source and token export','Canonical Figma file not identified.','File key, component/token export, design acceptance.','NOT VERIFIED',null),
('Canva','templates and marketing assets','No VisionWeaver design found in connector search.','Design/template ids and export permissions.','NOT VERIFIED',null),
('Lovable','optional prototype builder','No Vision-named project found.','Explicit decision whether it is a builder or not.','NOT VERIFIED',null),
('Base44','legacy concept import only','Read path denied previously.','Owner authorization if needed.','NOT VERIFIED',null),
('Zillow','location/real-estate context','No Prime integration.','Permitted API/source rules.','NOT VERIFIED',null),
('Google Drive','source docs and exports','Historical recovery source only.','OAuth scopes and file ids.','NOT VERIFIED',null),
('YouTube/TikTok/Instagram/Facebook','distribution and performance','No Prime integration.','Platform auth, publish scopes, explicit approval.','NOT VERIFIED',null),
('Stripe/commerce','store, licenses, subscriptions','No Prime integration.','Products, prices, checkout, payout rules.','NOT VERIFIED',null),
('THELMA deployment automation','release diagnostics handoff','Audit directive supported in frontend repair layer.','Real service-to-service THELMA callback, signed response, release gate enforcement.','PARTIAL','Automation cannot self-approve deployment.')
on conflict (provider) do update set scope=excluded.scope, observed=excluded.observed, prerequisites=excluded.prerequisites, prime_status=excluded.prime_status, probe_note=excluded.probe_note;

insert into public.release_gates (id,gate,status,evidence_uri) values
(1,'Manifest build passes','REQUIRED',null),
(2,'Vercel deployment READY','REQUIRED',null),
(3,'Mobile visual board check','REQUIRED',null),
(4,'Desktop visual board check','REQUIRED',null),
(5,'Workspace setup creates organization, membership and starter records','REQUIRED',null),
(6,'Supabase two-user RLS isolation test','REQUIRED',null),
(7,'Baseline migrations saved in repo','REQUIRED',null),
(8,'Provider adapters probed and marked verified/partial/not verified','REQUIRED',null),
(9,'THELMA diagnostic returns evidence id','REQUIRED',null),
(10,'No provider spending without explicit approval','REQUIRED',null),
(11,'Publishing requires explicit APPROVED','REQUIRED',null),
(12,'Rollback path documented','REQUIRED',null),
(13,'Owner acceptance recorded','REQUIRED',null)
on conflict (id) do update set gate=excluded.gate, status=excluded.status, evidence_uri=excluded.evidence_uri, updated_at=now();
