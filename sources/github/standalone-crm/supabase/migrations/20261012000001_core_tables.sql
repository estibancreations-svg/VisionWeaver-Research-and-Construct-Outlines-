-- Standalone CRM — core schema (agency -> sub-accounts -> CRM records)
-- Apply ONLY to the CRM's dedicated Supabase project.
-- Security model:
--   * An AGENCY is the top-level account (the operator, e.g. EstibanCreations).
--   * A WORKSPACE is one client SUB-ACCOUNT. Each agency can hold up to
--     agencies.max_workspaces sub-accounts (default 75).
--   * Agency owners/admins can open every sub-account in their agency.
--   * Sub-account logins (workspace_members) only see their own sub-account(s).
--   * Row Level Security is the security boundary. The UI never decides access.

create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 120),
  max_workspaces integer not null default 75 check (max_workspaces between 1 and 1000),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.agency_members (
  agency_id uuid not null references public.agencies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin')),
  created_at timestamptz not null default now(),
  primary key (agency_id, user_id)
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 120),
  slug text not null check (slug ~ '^[a-z0-9][a-z0-9-]{0,62}$'),
  industry text check (industry is null or length(industry) <= 80),
  timezone text not null default 'America/Chicago' check (length(timezone) <= 64),
  accent text not null default 'mustard' check (accent in ('mustard','walnut','slate','sage','clay')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (agency_id, slug)
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','member','viewer')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 160),
  domain text check (domain is null or length(domain) <= 160),
  industry text check (industry is null or length(industry) <= 80),
  phone text check (phone is null or length(phone) <= 40),
  city text check (city is null or length(city) <= 80),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (workspace_id, id)
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  company_id uuid,
  first_name text not null check (length(trim(first_name)) between 1 and 80),
  last_name text not null default '' check (length(last_name) <= 80),
  email text check (email is null or (length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  phone text check (phone is null or length(phone) <= 40),
  title text check (title is null or length(title) <= 120),
  source text check (source is null or length(source) <= 80),
  status text not null default 'lead' check (status in ('lead','qualified','customer','inactive')),
  tags text[] not null default '{}',
  owner_id uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (workspace_id, id),
  foreign key (workspace_id, company_id) references public.companies(workspace_id, id) on delete set null (company_id)
);

create table public.pipelines (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 80),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  unique (workspace_id, name),
  unique (workspace_id, id)
);

create table public.pipeline_stages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null,
  pipeline_id uuid not null,
  name text not null check (length(trim(name)) between 1 and 60),
  position integer not null check (position >= 0),
  probability integer not null default 0 check (probability between 0 and 100),
  unique (pipeline_id, position),
  unique (pipeline_id, name),
  unique (workspace_id, id),
  foreign key (workspace_id, pipeline_id) references public.pipelines(workspace_id, id) on delete cascade
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  pipeline_id uuid not null,
  stage_id uuid not null,
  contact_id uuid,
  company_id uuid,
  title text not null check (length(trim(title)) between 1 and 160),
  amount numeric(12,2) not null default 0 check (amount >= 0 and amount < 10000000000),
  expected_close_date date,
  status text not null default 'open' check (status in ('open','won','lost')),
  next_action text check (next_action is null or length(next_action) <= 200),
  owner_id uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (workspace_id, id),
  foreign key (workspace_id, pipeline_id) references public.pipelines(workspace_id, id) on delete restrict,
  foreign key (workspace_id, stage_id) references public.pipeline_stages(workspace_id, id) on delete restrict,
  foreign key (workspace_id, contact_id) references public.contacts(workspace_id, id) on delete set null (contact_id),
  foreign key (workspace_id, company_id) references public.companies(workspace_id, id) on delete set null (company_id)
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid,
  company_id uuid,
  deal_id uuid,
  title text not null check (length(trim(title)) between 1 and 160),
  description text check (description is null or length(description) <= 2000),
  due_at timestamptz,
  status text not null default 'open' check (status in ('open','in_progress','done','cancelled')),
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  assigned_to uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (workspace_id, id),
  foreign key (workspace_id, contact_id) references public.contacts(workspace_id, id) on delete set null (contact_id),
  foreign key (workspace_id, company_id) references public.companies(workspace_id, id) on delete set null (company_id),
  foreign key (workspace_id, deal_id) references public.deals(workspace_id, id) on delete set null (deal_id)
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid,
  company_id uuid,
  deal_id uuid,
  body text not null check (length(trim(body)) between 1 and 5000),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, id),
  check (num_nonnulls(contact_id, company_id, deal_id) >= 1),
  foreign key (workspace_id, contact_id) references public.contacts(workspace_id, id) on delete cascade,
  foreign key (workspace_id, company_id) references public.companies(workspace_id, id) on delete cascade,
  foreign key (workspace_id, deal_id) references public.deals(workspace_id, id) on delete cascade
);

-- Append-only audit trail. Written only by triggers (security definer).
create table public.activities (
  id bigint generated always as identity primary key,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  entity_type text not null check (entity_type in ('workspace','company','contact','deal','task','note','member')),
  entity_id uuid,
  actor_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index agency_members_user_idx on public.agency_members(user_id);
create index workspace_members_user_idx on public.workspace_members(user_id);
create index workspaces_agency_idx on public.workspaces(agency_id) where archived_at is null;
create index companies_ws_name_idx on public.companies(workspace_id, name) where archived_at is null;
create index contacts_ws_created_idx on public.contacts(workspace_id, created_at desc) where archived_at is null;
create index contacts_ws_company_idx on public.contacts(workspace_id, company_id);
create index deals_ws_status_idx on public.deals(workspace_id, status) where archived_at is null;
create index deals_ws_stage_idx on public.deals(workspace_id, stage_id);
create index deals_ws_contact_idx on public.deals(workspace_id, contact_id);
create index deals_ws_company_idx on public.deals(workspace_id, company_id);
create index tasks_ws_due_idx on public.tasks(workspace_id, due_at) where archived_at is null;
create index tasks_ws_contact_idx on public.tasks(workspace_id, contact_id);
create index tasks_ws_deal_idx on public.tasks(workspace_id, deal_id);
create index tasks_ws_company_idx on public.tasks(workspace_id, company_id);
create index notes_ws_contact_idx on public.notes(workspace_id, contact_id);
create index notes_ws_deal_idx on public.notes(workspace_id, deal_id);
create index notes_ws_company_idx on public.notes(workspace_id, company_id);
create index activities_ws_created_idx on public.activities(workspace_id, created_at desc);
create index stages_ws_pipeline_idx on public.pipeline_stages(workspace_id, pipeline_id);

