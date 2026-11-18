-- prime_03_live_workspace: widen project vocabulary, add hierarchy/phase fields, a generic records table, member display names.
-- Additive. No policies are dropped. Two CHECK constraints are replaced with wider lists.

alter table public.projects drop constraint projects_kind_check;
alter table public.projects add constraint projects_kind_check check (kind = any (array['book','commercial','film','image','series','clip','explainer','system','product','podcast','game']));

alter table public.projects
  add column if not exists slug text,
  add column if not exists summary text,
  add column if not exists parent_id uuid references public.projects(id) on delete set null,
  add column if not exists phase text,
  add column if not exists next_step text,
  add column if not exists meta jsonb not null default '{}'::jsonb;
alter table public.projects add constraint projects_summary_len check (summary is null or char_length(summary) <= 2000);

create index if not exists projects_org_idx on public.projects (organization_id);
create index if not exists projects_parent_idx on public.projects (parent_id);
create index if not exists initiatives_org_idx on public.initiatives (organization_id);
create index if not exists organizations_created_by_idx on public.organizations (created_by);

alter table public.memberships add column if not exists display_name text, add column if not exists email text;

alter table public.audit_events drop constraint audit_events_event_type_check;
alter table public.audit_events add constraint audit_events_event_type_check check (event_type = any (array['asset.approved','project.created','avatar.state_locked','shot.keyframe_approved','provider.job_requested','provider.job_completed','guild.decision','publish.approved','release.diagnostic_requested','release.diagnostic_acknowledged','release.blocked','release.approved','org.created','import.completed','project.updated','record.created','record.updated','initiative.moved','walkthrough.completed']));
create index if not exists audit_events_org_time_idx on public.audit_events (organization_id, occurred_at desc);

create table public.records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  kind text not null check (char_length(kind) between 1 and 40),
  name text not null check (char_length(name) between 1 and 160),
  status text not null default 'draft' check (status = any (array['draft','active','review','approved','blocked','archived'])),
  note text check (note is null or char_length(note) <= 2000),
  data jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index records_org_kind_idx on public.records (organization_id, kind);
create index records_project_idx on public.records (project_id);
create index records_created_by_idx on public.records (created_by);
create trigger records_touch before update on public.records for each row execute function private.touch_versioned();

alter table public.records enable row level security;
revoke all on public.records from anon, authenticated;
grant select, insert, update, delete on public.records to authenticated;
create policy rec_select on public.records for select to authenticated using (private.is_member(organization_id));
create policy rec_insert on public.records for insert to authenticated with check (private.has_role(organization_id, array['architect','director','editor']) and created_by = (select auth.uid()));
create policy rec_update on public.records for update to authenticated using (private.has_role(organization_id, array['architect','director','editor'])) with check (private.has_role(organization_id, array['architect','director','editor']));
create policy rec_delete on public.records for delete to authenticated using (private.has_role(organization_id, array['architect']));
