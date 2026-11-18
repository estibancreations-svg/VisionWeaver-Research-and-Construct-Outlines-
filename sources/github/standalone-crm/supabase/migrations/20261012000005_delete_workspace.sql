-- OPTIONAL — permanent sub-account deletion (agency owners/admins only).
-- The caller must type the sub-account's exact name to confirm.
-- This migration contains a DELETE statement, so hosted tooling may ask for an
-- extra confirmation before applying it. Until it is applied, the app offers
-- "Archive" (reversible) instead of "Delete permanently".
create or replace function public.delete_workspace(p_workspace uuid, p_confirm_name text)
returns void language plpgsql security definer set search_path = '' as $$
declare ws record;
begin
  select * into ws from public.workspaces where id = p_workspace;
  if ws is null or not private.is_agency_admin(ws.agency_id) then
    raise exception 'Only agency owners/admins can delete sub-accounts' using errcode = '42501';
  end if;
  if p_confirm_name is distinct from ws.name then
    raise exception 'Confirmation name does not match' using errcode = '22023';
  end if;
  delete from public.workspaces where id = p_workspace;
end $$;

revoke all on function public.delete_workspace(uuid, text) from public, anon;
grant execute on function public.delete_workspace(uuid, text) to authenticated;
