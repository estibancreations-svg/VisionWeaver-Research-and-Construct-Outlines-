-- Standalone CRM v3 — themes, agency team roles, client branding, industry templates,
-- owner metrics, cross-client due list, CSV import.
-- Safe to apply on top of migrations 01–05. No data is removed.

-- ---------------------------------------------------------------------------
-- 1. Per-person look: auto (Paper by day / Stealth at night), paper, marble, stealth
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists theme text not null default 'auto'
  check (theme in ('auto', 'paper', 'marble', 'stealth'));
revoke update on public.profiles from authenticated;
grant update (full_name, theme) on public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- 2. Agency team: owner (Admin 1), admin, assistant
--    owner/admin  -> full access to every sub-account ("agency" role)
--    assistant    -> works inside every sub-account as a member; cannot manage
--                    sub-accounts, logins or the team
-- ---------------------------------------------------------------------------
alter table public.agency_members drop constraint if exists agency_members_role_check;
alter table public.agency_members
  add constraint agency_members_role_check check (role in ('owner', 'admin', 'assistant'));
-- Only one Owner (Admin 1) per agency: any extra owners become agency admins.
update public.agency_members am set role = 'admin'
  where am.role = 'owner'
    and am.user_id <> (select a.created_by from public.agencies a where a.id = am.agency_id)
    and exists (select 1 from public.agency_members o where o.agency_id = am.agency_id and o.role = 'owner' and o.user_id <> am.user_id);
create unique index if not exists agency_members_one_owner on public.agency_members (agency_id) where role = 'owner';

create or replace function private.is_agency_admin(target_agency uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.agency_members am
    where am.agency_id = target_agency and am.user_id = (select auth.uid()) and am.role in ('owner', 'admin')
  );
$$;

create or replace function private.is_agency_member(target_agency uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.agency_members am
    where am.agency_id = target_agency and am.user_id = (select auth.uid())
  );
$$;

create or replace function private.workspace_role(target_workspace uuid)
returns text language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select 'agency' from public.workspaces w
       join public.agency_members am on am.agency_id = w.agency_id
      where w.id = target_workspace and am.user_id = (select auth.uid()) and am.role in ('owner', 'admin')
      limit 1),
    (select wm.role from public.workspace_members wm
      where wm.workspace_id = target_workspace and wm.user_id = (select auth.uid())),
    (select 'member' from public.workspaces w
       join public.agency_members am on am.agency_id = w.agency_id
      where w.id = target_workspace and am.user_id = (select auth.uid()) and am.role = 'assistant'
      limit 1)
  );
$$;

create or replace function private.can_see_profile(target_user uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select target_user = (select auth.uid())
    or exists (
      select 1 from public.workspace_members wm
      where wm.user_id = target_user and private.can_read_ws(wm.workspace_id))
    or exists (
      select 1 from public.agency_members am
      where am.user_id = target_user and private.is_agency_member(am.agency_id));
$$;

create or replace function private.try_uuid(t text)
returns uuid language sql immutable set search_path = '' as $$
  select case when t ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then t::uuid end;
$$;

revoke all on function private.is_agency_member(uuid), private.try_uuid(text) from public, anon;
grant execute on function private.is_agency_member(uuid), private.try_uuid(text) to authenticated;

alter policy "agencies: members read" on public.agencies using (private.is_agency_member(id));
alter policy "agency_members: members read" on public.agency_members using (private.is_agency_member(agency_id));

-- ---------------------------------------------------------------------------
-- 3. Client branding + industry starter setups
-- ---------------------------------------------------------------------------
alter table public.workspaces
  add column if not exists logo_path text,
  add column if not exists brand_color text,
  add column if not exists template text not null default 'general',
  add column if not exists suggested_tags text[] not null default '{}';
alter table public.workspaces
  add constraint workspaces_logo_path_check
    check (logo_path is null or (length(logo_path) <= 200 and logo_path like (id::text || '/%'))),
  add constraint workspaces_brand_color_check
    check (brand_color is null or brand_color ~ '^#[0-9a-fA-F]{6}$'),
  add constraint workspaces_template_check
    check (template in ('general', 'restaurant', 'clinic', 'home_services', 'real_estate',
                        'professional', 'retail', 'fitness', 'beauty', 'education')),
  add constraint workspaces_suggested_tags_check
    check (cardinality(suggested_tags) <= 30);
revoke update on public.workspaces from authenticated;
grant update (name, industry, timezone, accent, archived_at, logo_path, brand_color, suggested_tags)
  on public.workspaces to authenticated;

-- Starter pipeline (always 5 steps) and tags for each industry.
create or replace function private.template_stages(t text)
returns text[] language sql immutable set search_path = '' as $$
  select case t
    when 'restaurant'    then array['Inquiry', 'Tasting or visit', 'Quote sent', 'Booked', 'Event done']
    when 'clinic'        then array['New inquiry', 'Consult booked', 'Treatment plan', 'Scheduled', 'Completed']
    when 'home_services' then array['New request', 'Estimate visit', 'Estimate sent', 'Job booked', 'Job complete']
    when 'real_estate'   then array['New lead', 'Showing', 'Offer', 'Under contract', 'Closed']
    when 'professional'  then array['Discovery', 'Proposal', 'Contract', 'Kickoff', 'Delivered']
    when 'retail'        then array['New lead', 'Interested', 'Quote', 'Order placed', 'Fulfilled']
    when 'fitness'       then array['Trial booked', 'Trial done', 'Offer', 'Signed up', 'Active member']
    when 'beauty'        then array['Inquiry', 'Consult', 'Booked', 'Visit done', 'Rebooked']
    when 'education'     then array['Inquiry', 'Info session', 'Application', 'Enrolled', 'Completed']
    else array['New lead', 'Contacted', 'Proposal', 'Negotiation', 'Closed']
  end;
$$;

create or replace function private.template_tags(t text)
returns text[] language sql immutable set search_path = '' as $$
  select case t
    when 'restaurant'    then array['catering', 'private event', 'regular', 'vip', 'allergy note']
    when 'clinic'        then array['new patient', 'returning', 'referral', 'follow-up', 'insurance']
    when 'home_services' then array['repair', 'install', 'maintenance plan', 'emergency', 'warranty']
    when 'real_estate'   then array['buyer', 'seller', 'first-time', 'investor', 'pre-approved']
    when 'professional'  then array['retainer', 'project', 'referral', 'decision maker', 'renewal']
    when 'retail'        then array['wholesale', 'repeat buyer', 'vip', 'online', 'in-store']
    when 'fitness'       then array['trial', 'personal training', 'class pack', 'member', 'lapsed']
    when 'beauty'        then array['new client', 'regular', 'color', 'bridal', 'product buyer']
    when 'education'     then array['parent', 'student', 'scholarship', 'alumni', 'follow-up']
    else array['vip', 'follow-up', 'referral', 'partner']
  end;
$$;
revoke all on function private.template_stages(text), private.template_tags(text) from public, anon;
grant execute on function private.template_stages(text), private.template_tags(text) to authenticated;

-- Retire the old 4-argument version out of the public API (renamed, not reachable by users).
alter function public.create_workspace(uuid, text, text, text) rename to create_workspace_v1_retired;
alter function public.create_workspace_v1_retired(uuid, text, text, text) set schema private;
revoke all on function private.create_workspace_v1_retired(uuid, text, text, text) from public, anon, authenticated;
create or replace function public.create_workspace(
  p_agency uuid, p_name text, p_industry text default null, p_timezone text default 'America/Chicago',
  p_template text default 'general')
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := (select auth.uid());
  ws uuid; pl uuid; base_slug text; final_slug text; n int := 1;
  tpl text := coalesce(nullif(p_template, ''), 'general');
  stages text[];
  probs int[] := array[10, 25, 50, 75, 100];
  i int;
begin
  if not private.is_agency_admin(p_agency) then
    raise exception 'Only agency owners/admins can create sub-accounts' using errcode = '42501';
  end if;
  if p_name is null or length(trim(p_name)) not between 1 and 120 then
    raise exception 'Sub-account name must be 1-120 characters' using errcode = '22023';
  end if;
  if tpl not in ('general', 'restaurant', 'clinic', 'home_services', 'real_estate',
                 'professional', 'retail', 'fitness', 'beauty', 'education') then
    raise exception 'Unknown starter setup' using errcode = '22023';
  end if;
  base_slug := trim(both '-' from regexp_replace(lower(trim(p_name)), '[^a-z0-9]+', '-', 'g'));
  base_slug := left(coalesce(nullif(base_slug, ''), 'client'), 50);
  final_slug := base_slug;
  while exists (select 1 from public.workspaces where agency_id = p_agency and slug = final_slug) loop
    n := n + 1; final_slug := base_slug || '-' || n;
  end loop;

  insert into public.workspaces (agency_id, name, slug, industry, timezone, created_by, template, suggested_tags)
  values (p_agency, trim(p_name), final_slug, nullif(trim(coalesce(p_industry, '')), ''),
          coalesce(nullif(p_timezone, ''), 'America/Chicago'), uid, tpl, private.template_tags(tpl))
  returning id into ws;

  stages := private.template_stages(tpl);
  insert into public.pipelines (workspace_id, name, is_default) values (ws, 'Sales', true) returning id into pl;
  for i in 1..5 loop
    insert into public.pipeline_stages (workspace_id, pipeline_id, name, position, probability)
    values (ws, pl, stages[i], i - 1, probs[i]);
  end loop;

  insert into public.activities (workspace_id, entity_type, entity_id, actor_id, event_type, summary)
  values (ws, 'workspace', ws, uid, 'created', 'Sub-account created: ' || trim(p_name));
  return ws;
end $$;
revoke all on function public.create_workspace(uuid, text, text, text, text) from public, anon;
grant execute on function public.create_workspace(uuid, text, text, text, text) to authenticated;

-- ---------------------------------------------------------------------------
-- 4. Deals remember when they were won or lost (for "won this month")
-- ---------------------------------------------------------------------------
alter table public.deals add column if not exists closed_at timestamptz;
alter table public.deals disable trigger deals_audit;
alter table public.deals disable trigger deals_touch;
update public.deals set closed_at = updated_at where status in ('won', 'lost') and closed_at is null;
alter table public.deals enable trigger deals_touch;
alter table public.deals enable trigger deals_audit;

create or replace function private.set_deal_closed_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.status in ('won', 'lost') then
    if tg_op = 'INSERT' or old.status is distinct from new.status then new.closed_at := now(); end if;
  else
    new.closed_at := null;
  end if;
  return new;
end $$;
create or replace trigger deals_closed_at before insert or update of status on public.deals
  for each row execute function private.set_deal_closed_at();
create index if not exists deals_ws_closed_idx on public.deals (workspace_id, closed_at) where status = 'won';

-- ---------------------------------------------------------------------------
-- 5. Owner dashboard numbers and the cross-client "due now" list (RLS applies)
-- ---------------------------------------------------------------------------
alter function public.agency_overview(uuid) rename to agency_overview_v1_retired;
alter function public.agency_overview_v1_retired(uuid) set schema private;
revoke all on function private.agency_overview_v1_retired(uuid) from public, anon, authenticated;
create function public.agency_overview(p_agency uuid)
returns table (
  workspace_id uuid, name text, slug text, industry text, accent text, archived_at timestamptz,
  logo_path text, brand_color text,
  contacts bigint, open_deals bigint, pipeline_value numeric, open_tasks bigint, logins bigint,
  won_month numeric, new_contacts_week bigint, due_today bigint, overdue bigint)
language sql stable security invoker set search_path = '' as $$
  select w.id, w.name, w.slug, w.industry, w.accent, w.archived_at, w.logo_path, w.brand_color,
    (select count(*) from public.contacts c where c.workspace_id = w.id and c.archived_at is null),
    (select count(*) from public.deals d where d.workspace_id = w.id and d.status = 'open' and d.archived_at is null),
    (select coalesce(sum(d.amount), 0) from public.deals d where d.workspace_id = w.id and d.status = 'open' and d.archived_at is null),
    (select count(*) from public.tasks t where t.workspace_id = w.id and t.status in ('open', 'in_progress') and t.archived_at is null),
    (select count(*) from public.workspace_members m where m.workspace_id = w.id),
    (select coalesce(sum(d.amount), 0) from public.deals d
      where d.workspace_id = w.id and d.status = 'won' and d.archived_at is null
        and d.closed_at >= (date_trunc('month', now() at time zone w.timezone) at time zone w.timezone)),
    (select count(*) from public.contacts c
      where c.workspace_id = w.id and c.archived_at is null and c.created_at >= now() - interval '7 days'),
    (select count(*) from public.tasks t
      where t.workspace_id = w.id and t.status in ('open', 'in_progress') and t.archived_at is null
        and (t.due_at at time zone w.timezone)::date = (now() at time zone w.timezone)::date),
    (select count(*) from public.tasks t
      where t.workspace_id = w.id and t.status in ('open', 'in_progress') and t.archived_at is null
        and t.due_at < (date_trunc('day', now() at time zone w.timezone) at time zone w.timezone))
  from public.workspaces w
  where w.agency_id = p_agency
  order by w.archived_at nulls first, w.name;
$$;

create or replace function public.agency_due_tasks(p_agency uuid, p_limit integer default 40)
returns table (
  task_id uuid, workspace_id uuid, workspace_name text, title text, due_at timestamptz,
  priority text, status text, overdue boolean)
language sql stable security invoker set search_path = '' as $$
  select t.id, w.id, w.name, t.title, t.due_at, t.priority, t.status,
         t.due_at < (date_trunc('day', now() at time zone w.timezone) at time zone w.timezone)
  from public.tasks t
  join public.workspaces w on w.id = t.workspace_id
  where w.agency_id = p_agency and w.archived_at is null
    and t.archived_at is null and t.status in ('open', 'in_progress')
    and t.due_at < (date_trunc('day', now() at time zone w.timezone) at time zone w.timezone) + interval '1 day'
  order by t.due_at
  limit least(greatest(coalesce(p_limit, 40), 1), 200);
$$;

-- ---------------------------------------------------------------------------
-- 6. CSV import (runs as the caller, so RLS decides; skips duplicate emails)
-- ---------------------------------------------------------------------------
create or replace function public.import_contacts(p_workspace uuid, p_rows jsonb)
returns table (inserted integer, skipped integer)
language plpgsql security invoker set search_path = '' as $$
declare v_total integer; v_ins integer;
begin
  if not private.can_write_ws(p_workspace) then
    raise exception 'You can''t add contacts to this sub-account' using errcode = '42501';
  end if;
  if jsonb_typeof(p_rows) is distinct from 'array' or jsonb_array_length(p_rows) not between 1 and 2000 then
    raise exception 'Import 1 to 2,000 rows at a time' using errcode = '22023';
  end if;
  v_total := jsonb_array_length(p_rows);

  with src as (
    select distinct on (coalesce(lower(nullif(trim(x.email), '')), gen_random_uuid()::text)) x.*
    from jsonb_to_recordset(p_rows) as x(
      first_name text, last_name text, email text, phone text, title text, source text, status text, tags text[])
  ), ins as (
    insert into public.contacts (workspace_id, first_name, last_name, email, phone, title, source, status, tags)
    select p_workspace, left(trim(s.first_name), 80), left(coalesce(trim(s.last_name), ''), 80),
           nullif(lower(trim(s.email)), ''), left(nullif(trim(s.phone), ''), 40), left(nullif(trim(s.title), ''), 120),
           left(coalesce(nullif(trim(s.source), ''), 'CSV import'), 80),
           case when s.status in ('lead', 'qualified', 'customer', 'inactive') then s.status else 'lead' end,
           coalesce(s.tags, '{}')
    from src s
    where nullif(trim(s.first_name), '') is not null
      and (nullif(trim(s.email), '') is null or not exists (
        select 1 from public.contacts c where c.workspace_id = p_workspace and lower(c.email) = lower(trim(s.email))))
    returning 1
  )
  select count(*)::integer into v_ins from ins;
  return query select v_ins, v_total - v_ins;
end $$;

revoke all on function public.agency_overview(uuid), public.agency_due_tasks(uuid, integer),
  public.import_contacts(uuid, jsonb) from public, anon;
grant execute on function public.agency_overview(uuid), public.agency_due_tasks(uuid, integer),
  public.import_contacts(uuid, jsonb) to authenticated;

-- ---------------------------------------------------------------------------
-- 7. Client logo storage: private bucket, folder = sub-account id (Supabase only)
-- ---------------------------------------------------------------------------
do $$
begin
  if to_regclass('storage.buckets') is not null
     and not exists (select 1 from pg_policies where schemaname = 'storage' and policyname = 'workspace-logos: read') then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values ('workspace-logos', 'workspace-logos', false, 1048576, array['image/png', 'image/jpeg', 'image/webp'])
    on conflict (id) do nothing;

    execute $p$create policy "workspace-logos: read" on storage.objects for select to authenticated
      using (bucket_id = 'workspace-logos' and private.can_read_ws(private.try_uuid((storage.foldername(name))[1])))$p$;
    execute $p$create policy "workspace-logos: admins add" on storage.objects for insert to authenticated
      with check (bucket_id = 'workspace-logos' and private.can_admin_ws(private.try_uuid((storage.foldername(name))[1])))$p$;
    execute $p$create policy "workspace-logos: admins change" on storage.objects for update to authenticated
      using (bucket_id = 'workspace-logos' and private.can_admin_ws(private.try_uuid((storage.foldername(name))[1])))
      with check (bucket_id = 'workspace-logos' and private.can_admin_ws(private.try_uuid((storage.foldername(name))[1])))$p$;
    execute $p$create policy "workspace-logos: admins remove" on storage.objects for delete to authenticated
      using (bucket_id = 'workspace-logos' and private.can_admin_ws(private.try_uuid((storage.foldername(name))[1])))$p$;
  end if;
end $$;
