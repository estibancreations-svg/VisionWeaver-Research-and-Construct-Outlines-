-- Minimal stand-in for the Supabase platform pieces the migrations rely on.
-- Used ONLY for local/CI testing against plain Postgres (never on Supabase).
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin bypassrls; end if;
end $$;
create schema if not exists extensions;
create schema if not exists auth;
create table if not exists auth.users (
  id uuid primary key,
  email text,
  raw_user_meta_data jsonb default '{}'::jsonb
);
create or replace function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::uuid
$$;
grant usage on schema auth to anon, authenticated;
grant execute on function auth.uid() to anon, authenticated;
grant usage on schema public to anon, authenticated;
create extension if not exists pgcrypto with schema extensions;
alter table auth.users add column if not exists instance_id uuid, add column if not exists aud text,
  add column if not exists role text, add column if not exists encrypted_password text,
  add column if not exists email_confirmed_at timestamptz, add column if not exists raw_app_meta_data jsonb,
  add column if not exists created_at timestamptz, add column if not exists updated_at timestamptz,
  add column if not exists confirmation_token text, add column if not exists email_change text,
  add column if not exists email_change_token_new text, add column if not exists recovery_token text;
create table if not exists auth.identities (
  id uuid primary key default gen_random_uuid(), provider_id text, user_id uuid references auth.users(id) on delete cascade,
  identity_data jsonb, provider text, last_sign_in_at timestamptz, created_at timestamptz, updated_at timestamptz);
-- v3.1: two-step factors, JWT helper and a stand-in for Supabase Vault (local testing only).
create or replace function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
$$;
grant execute on function auth.jwt() to anon, authenticated;
create table if not exists auth.mfa_factors (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade,
  friendly_name text, factor_type text default 'totp', status text default 'unverified', created_at timestamptz default now(),
  updated_at timestamptz default now());
create schema if not exists vault;
create table if not exists vault.secrets (
  id uuid primary key default gen_random_uuid(), name text unique, description text, secret text, created_at timestamptz default now());
create or replace function vault.create_secret(new_secret text, new_name text default null, new_description text default '')
returns uuid language sql as $$ insert into vault.secrets (secret, name, description) values (new_secret, new_name, new_description) returning id $$;
create or replace view vault.decrypted_secrets as select id, name, description, secret, secret as decrypted_secret, created_at from vault.secrets;
revoke all on schema vault from public, anon, authenticated;
create or replace function vault.update_secret(secret_id uuid, new_secret text default null, new_name text default null, new_description text default null)
returns void language sql as $$ update vault.secrets set secret = [secret value withheld], secret) where id = secret_id $$;
