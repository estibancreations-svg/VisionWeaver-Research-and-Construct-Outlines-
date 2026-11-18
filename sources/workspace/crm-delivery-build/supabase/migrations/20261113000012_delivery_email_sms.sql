-- v4.1 delivery: the Inbox can finally send. Queued email goes out through Resend and
-- queued texts through Twilio, both driven by the `delivery` Edge Function. Nothing here
-- sends on its own: delivery stays OFF until the Owner turns it on (delivery_settings),
-- and always OFF in the Owner copy. Keys stay in the Connections vault; the worker reads
-- them only through the delivery_keys RPC, which the service role alone can call.
--
-- No trigger changes: prepare_message already leaves service-role inserts alone, so the
-- worker can record inbound messages and delivery results, while signed-in people can
-- only queue outbound messages. Opt-outs are honored before every send, never after.
--
-- Vault contract (upload in Connections; never paste keys anywhere else):
--   Resend: provider "resend", secret { api_key }.
--   Twilio: provider "twilio", client_id = Account SID, secret { auth_token },
--           settings { message_service_sid } and/or { from_number }.

-- ---------------------------------------------------------------------------
-- 1. Opt-outs on the contact. A STOP text, a START text, or a spam complaint
--    flips these; the worker checks them before every send.
-- ---------------------------------------------------------------------------
alter table public.contacts
  add column if not exists email_opted_out boolean not null default false,
  add column if not exists email_opted_out_at timestamptz,
  add column if not exists sms_opted_out boolean not null default false,
  add column if not exists sms_opted_out_at timestamptz;

-- ---------------------------------------------------------------------------
-- 2. Delivery results on the message. Only the delivery service (service role)
--    writes these; the Inbox shows the status pill from them.
-- ---------------------------------------------------------------------------
alter table public.messages
  add column if not exists provider text check (provider is null or provider in ('resend', 'twilio')),
  add column if not exists provider_message_id text check (provider_message_id is null or length(provider_message_id) <= 128),
  add column if not exists provider_error text check (provider_error is null or length(provider_error) <= 500),
  add column if not exists attempts integer not null default 0 check (attempts >= 0),
  add column if not exists delivered_at timestamptz;
create index if not exists messages_provider_id_idx on public.messages (provider_message_id)
  where provider_message_id is not null;

-- ---------------------------------------------------------------------------
-- 3. The Owner's switch. Mirrors payment_settings: OFF by default, Owner-only,
--    and the Owner copy stays OFF. 'test' and 'live' both send; the difference is
--    which keys the Owner uploaded in the vault (test keys vs live keys).
-- ---------------------------------------------------------------------------
create table public.delivery_settings (
  agency_id uuid primary key references public.agencies(id) on delete cascade,
  mode text not null default 'off' check (mode in ('off', 'test', 'live')),
  email_enabled boolean not null default true,
  sms_enabled boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);
alter table public.delivery_settings enable row level security;
create policy "delivery_settings: team reads" on public.delivery_settings for select to authenticated
  using (private.is_agency_admin(agency_id));
grant select on public.delivery_settings to authenticated;

-- Only the Owner changes delivery settings, and the Owner copy stays OFF.
create or replace function public.set_delivery_settings(p_agency uuid, p_mode text, p_email boolean, p_sms boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare pl text;
begin
  if not exists (select 1 from public.agency_members where agency_id = p_agency and user_id = (select auth.uid()) and role = 'owner')
     or not private.mfa_ok() then
    raise exception 'Only the Owner can change delivery settings' using errcode = '42501';
  end if;
  select plan into pl from public.agencies where id = p_agency;
  if pl = 'owner' and p_mode <> 'off' then
    raise exception 'Delivery stays off in the Owner copy' using errcode = '22023';
  end if;
  if p_mode not in ('off', 'test', 'live') then
    raise exception 'Some values aren''t valid' using errcode = '22023';
  end if;
  insert into public.delivery_settings (agency_id, mode, email_enabled, sms_enabled, updated_by, updated_at)
  values (p_agency, p_mode, coalesce(p_email, true), coalesce(p_sms, true), (select auth.uid()), now())
  on conflict (agency_id) do update set mode = excluded.mode, email_enabled = excluded.email_enabled,
    sms_enabled = excluded.sms_enabled, updated_by = excluded.updated_by, updated_at = now();
end $$;
revoke all on function public.set_delivery_settings(uuid, text, boolean, boolean) from public, anon;
grant execute on function public.set_delivery_settings(uuid, text, boolean, boolean) to authenticated;

-- ---------------------------------------------------------------------------
-- 4. Service role only: the decrypted delivery keys for one agency. Only Resend
--    and Twilio connections are returned; every other connection stays hidden.
--    Mirrors connections_for_apply, narrowed to delivery.
-- ---------------------------------------------------------------------------
create or replace function public.delivery_keys(p_agency uuid)
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'provider', c.provider, 'kind', c.kind, 'client_id', c.client_id, 'settings', c.settings,
    'secrets', coalesce((select jsonb_object_agg(s.field, d.decrypted_secret)
                           from private.connection_secrets s
                           join vault.decrypted_secrets d on d.id = s.secret_id
                          where s.connection_id = c.id and not s.wiped), '{}'::jsonb))), '[]'::jsonb)
  from public.agency_connections c
  where c.agency_id = p_agency and c.removed_at is null
    and c.provider in ('resend', 'twilio');
$$;
revoke all on function public.delivery_keys(uuid) from public, anon, authenticated;
grant execute on function public.delivery_keys(uuid) to service_role;

-- ---------------------------------------------------------------------------
-- 5. Delivery audit log. Append-only: nobody in the app can write it; only the
--    delivery service records sends, receipts, failures and opt-outs. Agency
--    admins can read their own agency's rows; nobody sees another agency's.
-- ---------------------------------------------------------------------------
create table public.delivery_usage_log (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  message_id uuid references public.messages(id) on delete set null,
  channel text not null check (channel in ('email', 'sms')),
  provider text not null check (provider in ('resend', 'twilio')),
  provider_message_id text check (provider_message_id is null or length(provider_message_id) <= 128),
  status text not null check (status in ('sent', 'delivered', 'failed', 'received', 'opt_out')),
  segments integer check (segments is null or segments >= 1),
  detail text check (detail is null or length(detail) <= 500),
  created_at timestamptz not null default now()
);
create index if not exists delivery_usage_log_agency_idx on public.delivery_usage_log (agency_id, created_at desc);
create index if not exists delivery_usage_log_message_idx on public.delivery_usage_log (message_id);
alter table public.delivery_usage_log enable row level security;
create policy "delivery_usage_log: team admins read" on public.delivery_usage_log for select to authenticated
  using (private.is_agency_admin(agency_id));
grant select on public.delivery_usage_log to authenticated;
