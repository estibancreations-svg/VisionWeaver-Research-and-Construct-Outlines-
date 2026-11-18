-- Standalone CRM — continued (see 20261012000001_core_tables.sql)
-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.agencies enable row level security;
alter table public.agency_members enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.companies enable row level security;
alter table public.contacts enable row level security;
alter table public.pipelines enable row level security;
alter table public.pipeline_stages enable row level security;
alter table public.deals enable row level security;
alter table public.tasks enable row level security;
alter table public.notes enable row level security;
alter table public.activities enable row level security;

-- profiles
create policy "profiles: visible to self and teammates" on public.profiles
  for select to authenticated using (private.can_see_profile(id));
create policy "profiles: self update" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- agencies (created only through public.bootstrap_agency)
create policy "agencies: members read" on public.agencies
  for select to authenticated using (private.is_agency_admin(id));
create policy "agencies: members rename" on public.agencies
  for update to authenticated using (private.is_agency_admin(id)) with check (private.is_agency_admin(id));

-- agency_members (managed by service tooling only)
create policy "agency_members: members read" on public.agency_members
  for select to authenticated using (private.is_agency_admin(agency_id));

-- workspaces (created/deleted through RPCs; archive/rename via update)
create policy "workspaces: read" on public.workspaces
  for select to authenticated using (private.can_read_ws(id));
create policy "workspaces: admins update" on public.workspaces
  for update to authenticated using (private.can_admin_ws(id)) with check (private.can_admin_ws(id));

-- workspace_members
create policy "workspace_members: read" on public.workspace_members
  for select to authenticated using (private.can_read_ws(workspace_id));
create policy "workspace_members: admins change role" on public.workspace_members
  for update to authenticated using (private.can_admin_ws(workspace_id)) with check (private.can_admin_ws(workspace_id));
create policy "workspace_members: admins remove" on public.workspace_members
  for delete to authenticated using (private.can_admin_ws(workspace_id) and user_id <> (select auth.uid()));

-- CRM record tables
do $$
declare t text;
begin
  foreach t in array array['companies','contacts','pipelines','pipeline_stages','deals','tasks','notes'] loop
    execute format('create policy "%1$s: read" on public.%1$I for select to authenticated using (private.can_read_ws(workspace_id))', t);
    execute format('create policy "%1$s: insert" on public.%1$I for insert to authenticated with check (private.can_write_ws(workspace_id))', t);
    execute format('create policy "%1$s: update" on public.%1$I for update to authenticated using (private.can_write_ws(workspace_id)) with check (private.can_write_ws(workspace_id))', t);
    execute format('create policy "%1$s: delete" on public.%1$I for delete to authenticated using (private.can_admin_ws(workspace_id))', t);
  end loop;
end $$;

-- activities: read-only for users; append-only through triggers
create policy "activities: read" on public.activities
  for select to authenticated using (private.can_read_ws(workspace_id));

-- ---------------------------------------------------------------------------
-- Grants (least privilege; anon gets nothing)
-- ---------------------------------------------------------------------------
revoke all on all tables in schema public from anon;
revoke all on all tables in schema public from authenticated;
grant select, update on public.profiles to authenticated;
grant select, update on public.agencies to authenticated;
grant select on public.agency_members to authenticated;
grant select, update on public.workspaces to authenticated;
grant select, update, delete on public.workspace_members to authenticated;
grant select, insert, update, delete on public.companies, public.contacts, public.pipelines,
  public.pipeline_stages, public.deals, public.tasks, public.notes to authenticated;
grant select on public.activities to authenticated;
-- Column-level guard: users may only change their own display name.
revoke update on public.profiles from authenticated;
grant update (full_name) on public.profiles to authenticated;
revoke update on public.agencies from authenticated;
grant update (name) on public.agencies to authenticated;
revoke update on public.workspaces from authenticated;
grant update (name, industry, timezone, accent, archived_at) on public.workspaces to authenticated;
revoke update on public.workspace_members from authenticated;
grant update (role) on public.workspace_members to authenticated;

alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon;

