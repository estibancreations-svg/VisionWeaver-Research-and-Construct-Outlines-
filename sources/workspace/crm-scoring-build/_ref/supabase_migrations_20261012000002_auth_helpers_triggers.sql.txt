-- Standalone CRM — continued (see 20261012000001_core_tables.sql)
-- ---------------------------------------------------------------------------
-- Authorization helpers (security definer, fixed search_path, no dynamic SQL)
-- ---------------------------------------------------------------------------

create or replace function private.is_agency_admin(target_agency uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.agency_members am
    where am.agency_id = target_agency and am.user_id = (select auth.uid())
  );
$$;

-- Effective role of the current user inside a sub-account:
-- 'agency' (agency owner/admin), 'admin', 'member', 'viewer', or null.
create or replace function private.workspace_role(target_workspace uuid)
returns text language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select 'agency' from public.workspaces w
       join public.agency_members am on am.agency_id = w.agency_id
      where w.id = target_workspace and am.user_id = (select auth.uid())
      limit 1),
    (select wm.role from public.workspace_members wm
      where wm.workspace_id = target_workspace and wm.user_id = (select auth.uid()))
  );
$$;

create or replace function private.can_read_ws(target_workspace uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.workspace_role(target_workspace) is not null;
$$;

create or replace function private.can_write_ws(target_workspace uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(private.workspace_role(target_workspace) in ('agency','admin','member'), false);
$$;

create or replace function private.can_admin_ws(target_workspace uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(private.workspace_role(target_workspace) in ('agency','admin'), false);
$$;

-- Can the current user see this person's profile? (self, or shares an agency/sub-account)
create or replace function private.can_see_profile(target_user uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select target_user = (select auth.uid())
    or exists (
      select 1 from public.workspace_members wm
      where wm.user_id = target_user and private.can_read_ws(wm.workspace_id))
    or exists (
      select 1 from public.agency_members am
      where am.user_id = target_user and private.is_agency_admin(am.agency_id));
$$;

revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;

-- ---------------------------------------------------------------------------
-- Triggers: updated_at, immutable workspace_id, profile creation, 75 cap, audit
-- ---------------------------------------------------------------------------

create or replace function private.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

create or replace function private.lock_workspace_id()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.workspace_id is distinct from old.workspace_id then
    raise exception 'workspace_id cannot be changed' using errcode = '42501';
  end if;
  return new;
end $$;

create or replace function private.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, coalesce(new.email, ''), coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create or replace function private.enforce_workspace_cap()
returns trigger language plpgsql security definer set search_path = '' as $$
declare cap integer; used integer;
begin
  select a.max_workspaces into cap from public.agencies a where a.id = new.agency_id for update;
  select count(*) into used from public.workspaces w
   where w.agency_id = new.agency_id and w.archived_at is null;
  if used >= cap then
    raise exception 'Sub-account limit reached (% of %)', used, cap using errcode = 'P0001';
  end if;
  return new;
end $$;

create trigger workspaces_cap before insert on public.workspaces
  for each row execute function private.enforce_workspace_cap();

create or replace function private.log_activity()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  ent text := tg_argv[0];
  r jsonb;
  o jsonb := '{}'::jsonb;
  label text;
  evt text;
begin
  if tg_op = 'DELETE' then r := to_jsonb(old); else r := to_jsonb(new); end if;
  if tg_op = 'UPDATE' then o := to_jsonb(old); end if;

  label := case ent
    when 'contact' then trim(coalesce(r->>'first_name', '') || ' ' || coalesce(r->>'last_name', ''))
    when 'company' then r->>'name'
    when 'note' then left(r->>'body', 60)
    else r->>'title'
  end;

  evt := case
    when tg_op = 'INSERT' then 'created'
    when tg_op = 'DELETE' then 'deleted'
    when (o->>'archived_at') is null and (r->>'archived_at') is not null then 'archived'
    when (o->>'archived_at') is not null and (r->>'archived_at') is null then 'restored'
    when ent = 'deal' and (o->>'stage_id') is distinct from (r->>'stage_id') then 'stage_changed'
    when ent in ('deal','task') and (o->>'status') is distinct from (r->>'status') then 'status_' || (r->>'status')
    else 'updated'
  end;

  -- Skip the audit row when the parent sub-account itself is being deleted (cascade).
  if tg_op = 'DELETE' and not exists (select 1 from public.workspaces w where w.id = (r->>'workspace_id')::uuid) then
    return null;
  end if;

  insert into public.activities (workspace_id, entity_type, entity_id, actor_id, event_type, summary)
  values ((r->>'workspace_id')::uuid, ent,
          case when tg_op = 'DELETE' then null else (r->>'id')::uuid end,
          (select auth.uid()), evt,
          initcap(ent) || ' ' || replace(evt, '_', ' ') || ': ' || coalesce(label, ''));
  return null;
end $$;

do $$
declare t text;
begin
  foreach t in array array['profiles','agencies','workspaces','companies','contacts','deals','tasks','notes'] loop
    execute format('create trigger %1$s_touch before update on public.%1$I for each row execute function private.touch_updated_at()', t);
  end loop;
  foreach t in array array['companies','contacts','pipelines','pipeline_stages','deals','tasks','notes','workspace_members'] loop
    execute format('create trigger %1$s_lock_ws before update on public.%1$I for each row execute function private.lock_workspace_id()', t);
  end loop;
end $$;

create trigger contacts_audit after insert or update or delete on public.contacts for each row execute function private.log_activity('contact');
create trigger companies_audit after insert or update or delete on public.companies for each row execute function private.log_activity('company');
create trigger deals_audit after insert or update or delete on public.deals for each row execute function private.log_activity('deal');
create trigger tasks_audit after insert or update or delete on public.tasks for each row execute function private.log_activity('task');
create trigger notes_audit after insert or delete on public.notes for each row execute function private.log_activity('note');

