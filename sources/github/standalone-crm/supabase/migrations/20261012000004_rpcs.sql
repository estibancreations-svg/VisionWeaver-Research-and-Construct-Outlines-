-- Standalone CRM — continued (see 20261012000001_core_tables.sql)
-- ---------------------------------------------------------------------------
-- RPCs (security definer, explicit checks)
-- ---------------------------------------------------------------------------

-- First run: the signed-in user creates their agency (only if they have none).
create or replace function public.bootstrap_agency(p_name text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); new_id uuid;
begin
  if uid is null then raise exception 'Not signed in' using errcode = '42501'; end if;
  if exists (select 1 from public.agency_members where user_id = uid) then
    raise exception 'You already have an agency' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.workspace_members where user_id = uid) then
    raise exception 'Sub-account logins cannot create an agency' using errcode = '42501';
  end if;
  if p_name is null or length(trim(p_name)) not between 1 and 120 then
    raise exception 'Agency name must be 1-120 characters' using errcode = '22023';
  end if;
  insert into public.agencies (name, created_by) values (trim(p_name), uid) returning id into new_id;
  insert into public.agency_members (agency_id, user_id, role) values (new_id, uid, 'owner');
  return new_id;
end $$;

-- Create a client sub-account with a default sales pipeline.
create or replace function public.create_workspace(
  p_agency uuid, p_name text, p_industry text default null, p_timezone text default 'America/Chicago')
returns uuid language plpgsql security definer set search_path = '' as $$
declare uid uuid := (select auth.uid()); ws uuid; pl uuid; base_slug text; final_slug text; n int := 1;
begin
  if not private.is_agency_admin(p_agency) then
    raise exception 'Only agency owners/admins can create sub-accounts' using errcode = '42501';
  end if;
  if p_name is null or length(trim(p_name)) not between 1 and 120 then
    raise exception 'Sub-account name must be 1-120 characters' using errcode = '22023';
  end if;
  base_slug := trim(both '-' from regexp_replace(lower(trim(p_name)), '[^a-z0-9]+', '-', 'g'));
  base_slug := left(coalesce(nullif(base_slug, ''), 'client'), 50);
  final_slug := base_slug;
  while exists (select 1 from public.workspaces where agency_id = p_agency and slug = final_slug) loop
    n := n + 1; final_slug := base_slug || '-' || n;
  end loop;

  insert into public.workspaces (agency_id, name, slug, industry, timezone, created_by)
  values (p_agency, trim(p_name), final_slug, nullif(trim(coalesce(p_industry, '')), ''),
          coalesce(nullif(p_timezone, ''), 'America/Chicago'), uid)
  returning id into ws;

  insert into public.pipelines (workspace_id, name, is_default) values (ws, 'Sales', true) returning id into pl;
  insert into public.pipeline_stages (workspace_id, pipeline_id, name, position, probability) values
    (ws, pl, 'New lead', 0, 10), (ws, pl, 'Contacted', 1, 25), (ws, pl, 'Proposal', 2, 50),
    (ws, pl, 'Negotiation', 3, 75), (ws, pl, 'Closed', 4, 100);

  insert into public.activities (workspace_id, entity_type, entity_id, actor_id, event_type, summary)
  values (ws, 'workspace', ws, uid, 'created', 'Sub-account created: ' || trim(p_name));
  return ws;
end $$;

-- Caller's own role in a sub-account (used by the Edge Function and the UI).
create or replace function public.my_workspace_role(p_workspace uuid)
returns text language sql stable security definer set search_path = '' as $$
  select private.workspace_role(p_workspace);
$$;

-- Agency dashboard: one row per sub-account with headline numbers (RLS-respecting).
create or replace function public.agency_overview(p_agency uuid)
returns table (
  workspace_id uuid, name text, slug text, industry text, accent text, archived_at timestamptz,
  contacts bigint, open_deals bigint, pipeline_value numeric, open_tasks bigint, logins bigint)
language sql stable security invoker set search_path = '' as $$
  select w.id, w.name, w.slug, w.industry, w.accent, w.archived_at,
    (select count(*) from public.contacts c where c.workspace_id = w.id and c.archived_at is null),
    (select count(*) from public.deals d where d.workspace_id = w.id and d.status = 'open' and d.archived_at is null),
    (select coalesce(sum(d.amount), 0) from public.deals d where d.workspace_id = w.id and d.status = 'open' and d.archived_at is null),
    (select count(*) from public.tasks t where t.workspace_id = w.id and t.status in ('open','in_progress') and t.archived_at is null),
    (select count(*) from public.workspace_members m where m.workspace_id = w.id)
  from public.workspaces w
  where w.agency_id = p_agency
  order by w.archived_at nulls first, w.name;
$$;

revoke all on function public.bootstrap_agency(text) from public, anon;
revoke all on function public.create_workspace(uuid, text, text, text) from public, anon;
revoke all on function public.my_workspace_role(uuid) from public, anon;
revoke all on function public.agency_overview(uuid) from public, anon;
grant execute on function public.bootstrap_agency(text) to authenticated;
grant execute on function public.create_workspace(uuid, text, text, text) to authenticated;
grant execute on function public.my_workspace_role(uuid) to authenticated;
grant execute on function public.agency_overview(uuid) to authenticated;
