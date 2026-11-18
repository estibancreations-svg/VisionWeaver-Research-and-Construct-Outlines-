-- Creates (or reuses) the agency OWNER login and an empty agency. No mock data.
-- Used by scripts/provision-client.sh for production (Model B) projects.
-- Set before running (never commit real values):
--   select set_config('seed.owner_email',    'owner@example.com', false);
--   select set_config('seed.owner_name',     'Owner Name',        false);
--   select set_config('seed.owner_password', '<temporary password>', false);
--   select set_config('seed.agency_name',    'Client Agency',     false);
do $$
declare
  v_email  text := lower(trim(current_setting('seed.owner_email')));
  v_name   text := coalesce(nullif(current_setting('seed.owner_name', true), ''), 'Agency Owner');
  v_pass   text := current_setting('seed.owner_password');
  v_agency_name text := coalesce(nullif(current_setting('seed.agency_name', true), ''), 'My Agency');
  v_owner uuid;
  v_agency uuid;
begin
  if length(v_pass) < 10 or v_pass !~ '[A-Za-z]' or v_pass !~ '[0-9]' then
    raise exception 'Owner password must be 10+ characters with a letter and a number';
  end if;

  select id into v_owner from auth.users where lower(email) = v_email;
  if v_owner is null then
    v_owner := gen_random_uuid();
    insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token)
    values ('00000000-0000-0000-0000-000000000000', v_owner, 'authenticated', 'authenticated', v_email,
      extensions.crypt(v_pass, extensions.gen_salt('bf')), now(),
      '{"provider":"email","providers":["email"],"must_change_password":true}', jsonb_build_object('full_name', v_name),
      now(), now(), '', '', '', '');
    insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (v_owner::text, v_owner,
      jsonb_build_object('sub', v_owner::text, 'email', v_email, 'email_verified', true),
      'email', now(), now(), now());
    raise notice 'Created owner login %', v_email;
  else
    raise notice 'Owner login % already exists; password left unchanged', v_email;
  end if;

  select agency_id into v_agency from public.agency_members where user_id = v_owner limit 1;
  if v_agency is null then
    insert into public.agencies (name, created_by) values (v_agency_name, v_owner) returning id into v_agency;
    insert into public.agency_members (agency_id, user_id, role) values (v_agency, v_owner, 'owner');
    raise notice 'Created agency "%"', v_agency_name;
  else
    raise notice 'Owner already has an agency; nothing changed';
  end if;
end $$;
