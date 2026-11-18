-- prime_01_foundation_schema_rls
-- Reconstructed source-control baseline for the already-applied Prime foundation.
-- Purpose: make the dedicated VisionWeaver Prime Supabase backend reproducible from the repo.
-- Safe pattern: idempotent DDL; do not run destructive resets against production.

create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'active',
  version integer not null default 1,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  display_name text,
  email text,
  unique (organization_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  kind text not null,
  status text not null default 'draft',
  stage text,
  rights_state text not null default 'unreviewed',
  description text,
  source_asset_ids uuid[] not null default '{}',
  version integer not null default 1,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.initiatives (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  stage text not null default 'intake',
  status text not null default 'active',
  rights_state text not null default 'unreviewed',
  source_asset_ids uuid[] not null default '{}',
  version integer not null default 1,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  kind text not null,
  name text not null,
  status text not null default 'draft',
  note text,
  data jsonb not null default '{}',
  version integer not null default 1,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  event_id uuid primary key default gen_random_uuid(),
  event_type text not null,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  occurred_at timestamptz not null default now(),
  actor_id text not null,
  correlation_id text not null,
  idempotency_key text,
  payload jsonb not null default '{}',
  evidence_uri text,
  signature text
);

create table if not exists public.view_preferences (
  user_id uuid not null default auth.uid(),
  page_id text not null,
  view text not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, page_id)
);

alter table public.organizations enable row level security;
alter table public.memberships enable row level security;
alter table public.projects enable row level security;
alter table public.initiatives enable row level security;
alter table public.records enable row level security;
alter table public.audit_events enable row level security;
alter table public.view_preferences enable row level security;

create or replace function public.is_org_member(org uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.memberships m where m.organization_id = org and m.user_id = auth.uid())
$$;

create or replace function public.is_org_writer(org uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.memberships m where m.organization_id = org and m.user_id = auth.uid() and m.role in ('architect','director','editor'))
$$;

create or replace function public.is_org_architect(org uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.memberships m where m.organization_id = org and m.user_id = auth.uid() and m.role = 'architect')
$$;

-- RLS policies. Drop/recreate by name so the baseline can be replayed during disaster recovery.
drop policy if exists org_owner_insert on public.organizations;
create policy org_owner_insert on public.organizations for insert with check (created_by = auth.uid());
drop policy if exists org_member_select on public.organizations;
create policy org_member_select on public.organizations for select using (public.is_org_member(id) or created_by = auth.uid());
drop policy if exists org_architect_update on public.organizations;
create policy org_architect_update on public.organizations for update using (public.is_org_architect(id)) with check (public.is_org_architect(id));

drop policy if exists membership_bootstrap_insert on public.memberships;
create policy membership_bootstrap_insert on public.memberships for insert with check (
  user_id = auth.uid() and (
    exists (select 1 from public.organizations o where o.id = organization_id and o.created_by = auth.uid())
    or public.is_org_architect(organization_id)
  )
);
drop policy if exists membership_member_select on public.memberships;
create policy membership_member_select on public.memberships for select using (public.is_org_member(organization_id));
drop policy if exists membership_architect_update on public.memberships;
create policy membership_architect_update on public.memberships for update using (public.is_org_architect(organization_id)) with check (public.is_org_architect(organization_id));

-- Shared organization-scoped table policies.
drop policy if exists projects_member_select on public.projects;
create policy projects_member_select on public.projects for select using (public.is_org_member(organization_id));
drop policy if exists projects_writer_insert on public.projects;
create policy projects_writer_insert on public.projects for insert with check (public.is_org_writer(organization_id));
drop policy if exists projects_writer_update on public.projects;
create policy projects_writer_update on public.projects for update using (public.is_org_writer(organization_id)) with check (public.is_org_writer(organization_id));

drop policy if exists initiatives_member_select on public.initiatives;
create policy initiatives_member_select on public.initiatives for select using (public.is_org_member(organization_id));
drop policy if exists initiatives_writer_insert on public.initiatives;
create policy initiatives_writer_insert on public.initiatives for insert with check (public.is_org_writer(organization_id));
drop policy if exists initiatives_writer_update on public.initiatives;
create policy initiatives_writer_update on public.initiatives for update using (public.is_org_writer(organization_id)) with check (public.is_org_writer(organization_id));

drop policy if exists records_member_select on public.records;
create policy records_member_select on public.records for select using (public.is_org_member(organization_id));
drop policy if exists records_writer_insert on public.records;
create policy records_writer_insert on public.records for insert with check (public.is_org_writer(organization_id));
drop policy if exists records_writer_update on public.records;
create policy records_writer_update on public.records for update using (public.is_org_writer(organization_id)) with check (public.is_org_writer(organization_id));

drop policy if exists audit_member_select on public.audit_events;
create policy audit_member_select on public.audit_events for select using (public.is_org_member(organization_id));
drop policy if exists audit_writer_insert on public.audit_events;
create policy audit_writer_insert on public.audit_events for insert with check (public.is_org_member(organization_id) and actor_id = auth.uid()::text);

drop policy if exists view_preferences_owner_all on public.view_preferences;
create policy view_preferences_owner_all on public.view_preferences for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create index if not exists memberships_user_idx on public.memberships(user_id);
create index if not exists projects_org_idx on public.projects(organization_id, updated_at desc);
create index if not exists initiatives_org_stage_idx on public.initiatives(organization_id, stage);
create index if not exists records_org_kind_idx on public.records(organization_id, kind, updated_at desc);
create index if not exists audit_org_time_idx on public.audit_events(organization_id, occurred_at desc);
