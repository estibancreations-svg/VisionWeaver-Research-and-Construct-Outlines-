-- Standalone CRM v3.1 — owner hand-off, backup admin, required two-step for the agency team,
-- team-wide default look, paid sign-in switches, and the encrypted connections vault.
-- Safe to apply on top of migrations 01–06. No CRM records are changed.

-- ---------------------------------------------------------------------------
-- 1. Backup admin (the installer who handed the CRM over). Same powers as an
--    agency admin, always visible on the Team page, removable by the Owner.
-- ---------------------------------------------------------------------------
alter table public.agency_members drop constraint if exists agency_members_role_check;
alter table public.agency_members
  add constraint agency_members_role_check check (role in ('owner', 'admin', 'assistant', 'backup'));

-- ---------------------------------------------------------------------------
-- 2. Two-step sign-in is enforced by the database once a person has turned it on:
--    a session that has not passed the 6-digit code (aal1) loses every permission
--    until the code is entered (aal2). The app requires the Owner, admins and the
--    backup admin to turn it on.
-- ---------------------------------------------------------------------------
create or replace function private.mfa_ok()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((select auth.jwt() ->> 'aal'), 'aal1') = 'aal2'
      or not exists (
        select 1 from auth.mfa_factors f
        where f.user_id = (select auth.uid()) and f.status::text = 'verified');
$$;

create or replace function private.is_agency_admin(target_agency uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.mfa_ok() and exists (
    select 1 from public.agency_members am
    where am.agency_id = target_agency and am.user_id = (select auth.uid())
      and am.role in ('owner', 'admin', 'backup')
  );
$$;

create or replace function private.is_agency_member(target_agency uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.mfa_ok() and exists (
    select 1 from public.agency_members am
    where am.agency_id = target_agency and am.user_id = (select auth.uid())
  );
$$;

create or replace function private.workspace_role(target_workspace uuid)
returns text language sql stable security definer set search_path = '' as $$
  select case when private.mfa_ok() then coalesce(
    (select 'agency' from public.workspaces w
       join public.agency_members am on am.agency_id = w.agency_id
      where w.id = target_workspace and am.user_id = (select auth.uid())
        and am.role in ('owner', 'admin', 'backup')
      limit 1),
    (select wm.role from public.workspace_members wm
      where wm.workspace_id = target_workspace and wm.user_id = (select auth.uid())),
    (select 'member' from public.workspaces w
       join public.agency_members am on am.agency_id = w.agency_id
      where w.id = target_workspace and am.user_id = (select auth.uid()) and am.role = 'assistant'
      limit 1)
  ) end;
$$;

revoke all on function private.mfa_ok() from public, anon;
grant execute on function private.mfa_ok() to authenticated;

-- ---------------------------------------------------------------------------
-- 3. Looks: the Owner picks the team's default; each person can follow it
--    ('agency') or choose their own.
-- ---------------------------------------------------------------------------
alter table public.profiles drop constraint if exists profiles_theme_check;
alter table public.profiles
  add constraint profiles_theme_check check (theme in ('agency', 'auto', 'paper', 'marble', 'stealth'));
alter table public.profiles alter column theme set default 'agency';
update public.profiles set theme = 'agency' where theme = 'auto';

alter table public.agencies
  add column if not exists default_theme text not null default 'paper'
    check (default_theme in ('auto', 'paper', 'marble', 'stealth')),
  add column if not exists handoff_state text not null default 'done'
    check (handoff_state in ('ask', 'done')),
  add column if not exists signin_options jsonb not null
    default '{"apple": false, "phone": false, "vercel": false}'::jsonb;
revoke update on public.agencies from authenticated;
grant update (name, default_theme) on public.agencies to authenticated;

-- The look a person gets when they choose "Use my team's look".
create or replace function public.my_default_theme()
returns text language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select a.default_theme from public.agency_members am
       join public.agencies a on a.id = am.agency_id
      where am.user_id = (select auth.uid()) limit 1),
    (select a.default_theme from public.workspace_members wm
       join public.workspaces w on w.id = wm.workspace_id
       join public.agencies a on a.id = w.agency_id
      where wm.user_id = (select auth.uid()) limit 1),
    'paper');
$$;

-- ---------------------------------------------------------------------------
-- 4. Ownership hand-off: the installer (or current Owner) names a new Owner email.
--    The new person proves they own the mailbox by opening the sign-in link, then
--    accepts. The old Owner becomes the visible backup admin.
-- ---------------------------------------------------------------------------
create table if not exists public.agency_handoffs (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  from_user uuid not null references auth.users(id) on delete cascade,
  to_user uuid not null references auth.users(id) on delete cascade,
  to_email text not null check (length(to_email) <= 254),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'cancelled')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '7 days',
  completed_at timestamptz,
  check (from_user <> to_user)
);
create unique index if not exists agency_handoffs_one_pending on public.agency_handoffs (agency_id) where status = 'pending';
create index if not exists agency_handoffs_to_user_idx on public.agency_handoffs (to_user) where status = 'pending';
alter table public.agency_handoffs enable row level security;
create policy "agency_handoffs: team admins and the new owner read" on public.agency_handoffs
  for select to authenticated
  using (private.is_agency_admin(agency_id) or to_user = (select auth.uid()));
grant select on public.agency_handoffs to authenticated;

-- Called only by the `handoff` Edge Function (service role) after it has verified the new Owner.
create or replace function public.complete_handoff(p_handoff uuid, p_user uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare h record;
begin
  select * into h from public.agency_handoffs where id = p_handoff for update;
  if h is null or h.status <> 'pending' then raise exception 'This hand-off is no longer open' using errcode = 'P0001'; end if;
  if h.expires_at < now() then raise exception 'This hand-off link has expired' using errcode = 'P0001'; end if;
  if h.to_user <> p_user then raise exception 'This hand-off is for someone else' using errcode = '42501'; end if;
  if exists (select 1 from public.agency_members where user_id = p_user and agency_id <> h.agency_id) then
    raise exception 'That login already belongs to another agency' using errcode = 'P0001';
  end if;
  -- The current Owner steps back to backup admin, then the new person becomes Owner.
  update public.agency_members set role = 'backup' where agency_id = h.agency_id and role = 'owner';
  insert into public.agency_members (agency_id, user_id, role) values (h.agency_id, p_user, 'owner')
    on conflict (agency_id, user_id) do update set role = 'owner';
  update public.agency_handoffs set status = 'accepted', completed_at = now() where id = p_handoff;
  update public.agencies set handoff_state = 'done' where id = h.agency_id;
  return h.agency_id;
end $$;

-- ---------------------------------------------------------------------------
-- 5. Paid sign-in switches (Apple, phone) are turned on by an administrator.
--    The login page reads these public on/off flags only — never any keys.
-- ---------------------------------------------------------------------------
create or replace function public.signin_options()
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'apple',  coalesce(bool_or(coalesce((a.signin_options ->> 'apple')::boolean, false)), false),
    'phone',  coalesce(bool_or(coalesce((a.signin_options ->> 'phone')::boolean, false)), false),
    'vercel', coalesce(bool_or(coalesce((a.signin_options ->> 'vercel')::boolean, false)), false))
  from public.agencies a;
$$;

create or replace function public.set_paid_signin(p_agency uuid, p_provider text, p_on boolean)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_agency_admin(p_agency) then
    raise exception 'Only the Owner or an agency admin can switch sign-in options' using errcode = '42501';
  end if;
  if p_provider not in ('apple', 'phone') then
    raise exception 'Unknown paid sign-in option' using errcode = '22023';
  end if;
  update public.agencies
     set signin_options = signin_options || jsonb_build_object(p_provider, coalesce(p_on, false))
   where id = p_agency;
end $$;

-- Service role only: record that "Sign in with Vercel" was created in Supabase Auth.
create or replace function public.set_signin_flag(p_agency uuid, p_key text, p_on boolean)
returns void language sql security definer set search_path = '' as $$
  update public.agencies
     set signin_options = signin_options || jsonb_build_object(p_key, coalesce(p_on, false))
   where id = p_agency and p_key in ('vercel');
$$;

-- ---------------------------------------------------------------------------
-- 6. Connections vault: sign-in keys and other tools' API / MCP keys.
--    Secrets live encrypted in Supabase Vault. Users can see the name, website,
--    type and the last 4 characters — never the key. Only the service role (inside
--    the `connections` Edge Function) can read a key, to switch on sign-in options.
-- ---------------------------------------------------------------------------
create table if not exists public.agency_connections (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 80),
  kind text not null check (kind in ('oauth', 'api_key', 'mcp', 'smtp', 'sms', 'platform')),
  provider text not null check (provider ~ '^[a-z0-9_:-]{1,40}$'),
  site text check (site is null or length(site) <= 300),
  client_id text check (client_id is null or length(client_id) <= 400),
  settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object' and length(settings::text) <= 4000),
  secret_hints jsonb not null default '{}'::jsonb,
  status text not null default 'saved' check (status in ('saved', 'applied', 'error', 'stored')),
  status_note text check (status_note is null or length(status_note) <= 300),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  applied_at timestamptz,
  removed_at timestamptz,
  unique (agency_id, name)
);
create index if not exists agency_connections_agency_idx on public.agency_connections (agency_id);
alter table public.agency_connections enable row level security;
create policy "agency_connections: team admins read" on public.agency_connections
  for select to authenticated using (removed_at is null and private.is_agency_admin(agency_id));
grant select on public.agency_connections to authenticated;
create trigger agency_connections_touch before update on public.agency_connections
  for each row execute function private.touch_updated_at();

create table if not exists private.connection_secrets (
  connection_id uuid not null references public.agency_connections(id) on delete cascade,
  field text not null check (field ~ '^[a-z0-9_]{1,40}$'),
  secret_id uuid not null,
  wiped boolean not null default false,
  primary key (connection_id, field)
);
revoke all on private.connection_secrets from public, anon, authenticated;

-- Destroy a connection's keys: each encrypted value in Vault is overwritten, then marked wiped.
create or replace function private.wipe_connection_secrets(p_connection uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  for r in select s.secret_id from private.connection_secrets s where s.connection_id = p_connection and not s.wiped loop
    perform vault.update_secret(r.secret_id, 'wiped:' || gen_random_uuid()::text);
  end loop;
  update private.connection_secrets set wiped = true where connection_id = p_connection;
end $$;
revoke all on function private.wipe_connection_secrets(uuid) from public, anon, authenticated;

/*
  Save (or replace, by name) up to 50 connections at once. Each item:
  { "name": "...", "kind": "oauth|api_key|mcp|smtp|sms|platform", "provider": "google|...",
    "site": "https://...", "client_id": "...", "settings": { ... },
    "secrets": { "client_secret": "...", "api_key": "..." } }
  Replacing a connection destroys its earlier keys first.
*/
create or replace function public.save_connections(p_agency uuid, p_items jsonb)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  it jsonb; v_id uuid; v_name text; k text; v text; v_secret uuid; hints jsonb; saved integer := 0;
begin
  if not private.is_agency_admin(p_agency) then
    raise exception 'Only the Owner or an agency admin can add connections' using errcode = '42501';
  end if;
  if jsonb_typeof(p_items) is distinct from 'array' or jsonb_array_length(p_items) not between 1 and 50 then
    raise exception 'Upload 1 to 50 connections at a time' using errcode = '22023';
  end if;
  for it in select * from jsonb_array_elements(p_items) loop
    v_name := left(trim(coalesce(it ->> 'name', '')), 80);
    if v_name = '' then raise exception 'Every connection needs a name' using errcode = '22023'; end if;
    if jsonb_typeof(coalesce(it -> 'secrets', '{}'::jsonb)) <> 'object' then
      raise exception 'Connection "%" has unreadable keys', v_name using errcode = '22023';
    end if;
    insert into public.agency_connections (agency_id, name, kind, provider, site, client_id, settings, status)
    values (p_agency, v_name, it ->> 'kind', lower(it ->> 'provider'), nullif(it ->> 'site', ''),
            nullif(it ->> 'client_id', ''), coalesce(it -> 'settings', '{}'::jsonb),
            case when (it ->> 'kind') in ('api_key', 'mcp') then 'stored' else 'saved' end)
    on conflict (agency_id, name) do update
      set kind = excluded.kind, provider = excluded.provider, site = excluded.site, client_id = excluded.client_id,
          settings = excluded.settings, status = excluded.status, status_note = null, applied_at = null,
          removed_at = null, created_by = (select auth.uid())
    returning id into v_id;
    perform private.wipe_connection_secrets(v_id);
    hints := '{}'::jsonb;
    for k, v in select key, value from jsonb_each_text(coalesce(it -> 'secrets', '{}'::jsonb)) loop
      if k !~ '^[a-z0-9_]{1,40}$' or v is null or v = '' then continue; end if;
      if length(v) > 8000 then raise exception 'A key in "%" is too long', v_name using errcode = '22023'; end if;
      v_secret := vault.create_secret(v, 'crm:' || v_id::text || ':' || k || ':' || gen_random_uuid()::text,
                                      'Standalone CRM connection key');
      insert into private.connection_secrets (connection_id, field, secret_id, wiped) values (v_id, k, v_secret, false)
        on conflict (connection_id, field) do update set secret_id = excluded.secret_id, wiped = false;
      hints := hints || jsonb_build_object(k, '••••' || case when length(v) >= 12 then right(v, 4) else '' end);
    end loop;
    update public.agency_connections set secret_hints = hints where id = v_id;
    saved := saved + 1;
  end loop;
  return saved;
end $$;

-- Remove a connection: its keys are destroyed and it disappears from the list.
create or replace function public.remove_connection(p_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare v_agency uuid;
begin
  select agency_id into v_agency from public.agency_connections where id = p_id and removed_at is null;
  if v_agency is null or not private.is_agency_admin(v_agency) then
    raise exception 'Only the Owner or an agency admin can remove connections' using errcode = '42501';
  end if;
  perform private.wipe_connection_secrets(p_id);
  update public.agency_connections
     set removed_at = now(), secret_hints = '{}'::jsonb, status = 'saved', status_note = 'Removed'
   where id = p_id;
end $$;

-- Service role only: the decrypted keys for one agency (used to switch on sign-in options).
create or replace function public.connections_for_apply(p_agency uuid)
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', c.id, 'name', c.name, 'kind', c.kind, 'provider', c.provider, 'site', c.site,
    'client_id', c.client_id, 'settings', c.settings,
    'secrets', coalesce((select jsonb_object_agg(s.field, d.decrypted_secret)
                           from private.connection_secrets s
                           join vault.decrypted_secrets d on d.id = s.secret_id
                          where s.connection_id = c.id and not s.wiped), '{}'::jsonb))), '[]'::jsonb)
  from public.agency_connections c
  where c.agency_id = p_agency and c.removed_at is null;
$$;

-- Service role only: record what happened when keys were applied.
create or replace function public.record_connection_status(p_id uuid, p_status text, p_note text)
returns void language sql security definer set search_path = '' as $$
  update public.agency_connections
     set status = p_status, status_note = left(p_note, 300),
         applied_at = case when p_status = 'applied' then now() else applied_at end
   where id = p_id and p_status in ('saved', 'applied', 'error', 'stored');
$$;

-- ---------------------------------------------------------------------------
-- 7. Function permissions
-- ---------------------------------------------------------------------------
revoke all on function public.my_default_theme(), public.signin_options(),
  public.set_paid_signin(uuid, text, boolean), public.save_connections(uuid, jsonb),
  public.remove_connection(uuid) from public, anon;
grant execute on function public.my_default_theme(), public.set_paid_signin(uuid, text, boolean),
  public.save_connections(uuid, jsonb), public.remove_connection(uuid) to authenticated;
-- The login page asks which buttons to show before anyone is signed in.
grant execute on function public.signin_options() to anon, authenticated;

revoke all on function public.complete_handoff(uuid, uuid), public.set_signin_flag(uuid, text, boolean),
  public.connections_for_apply(uuid), public.record_connection_status(uuid, text, text)
  from public, anon, authenticated;
grant execute on function public.complete_handoff(uuid, uuid), public.set_signin_flag(uuid, text, boolean),
  public.connections_for_apply(uuid), public.record_connection_status(uuid, text, text) to service_role;

-- ---------------------------------------------------------------------------
-- 8. T.H.E.L.M.A. AI Fail Safe
--    The backup admin (the installer) can only be removed — or have their role changed —
--    with a one-time release code that the backup admin creates from their own signed-in
--    account. Only a SHA-256 fingerprint of the code is stored. The Owner sees the lock on
--    the Team page and types the code they were given. Handled only by the `manage-logins`
--    Edge Function (service role); signed-in users have no access to this table.
-- ---------------------------------------------------------------------------
create table if not exists public.backup_release_codes (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  backup_user uuid not null references auth.users(id) on delete cascade,
  code_hash text not null check (code_hash ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default now(),
  used_at timestamptz,
  revoked_at timestamptz
);
create index if not exists backup_release_codes_lookup
  on public.backup_release_codes (agency_id, backup_user) where used_at is null and revoked_at is null;
alter table public.backup_release_codes enable row level security;
revoke all on public.backup_release_codes from public, anon, authenticated;
