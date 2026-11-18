# T.H.E.L.M.A. CRM Complete connections

Fill in what you have and delete the rest. Each `##` heading is one connection.
Upload under **Connections** (or in the first-sign-in walk-through).
Keys are stored encrypted and never shown again. **Do not put website passwords here.**

## Google sign-in
- type: oauth
- provider: google
- site: https://console.cloud.google.com/apis/credentials
- client_id: PASTE-CLIENT-ID.apps.googleusercontent.com
- client_secret: PASTE-CLIENT-SECRET

## Microsoft sign-in
- type: oauth
- provider: microsoft
- site: https://entra.microsoft.com
- client_id: PASTE-APPLICATION-CLIENT-ID
- client_secret: PASTE-CLIENT-SECRET-VALUE
- tenant: common

## GitHub sign-in
- type: oauth
- provider: github
- site: https://github.com/settings/developers
- client_id: PASTE-CLIENT-ID
- client_secret: PASTE-CLIENT-SECRET

## Vercel sign-in
- type: oauth
- provider: vercel
- site: https://vercel.com/account
- client_id: PASTE-CLIENT-ID
- client_secret: PASTE-CLIENT-SECRET

## Email sender
- type: smtp
- host: smtp.resend.com
- port: 587
- user: resend
- password: PASTE-SMTP-PASSWORD-OR-API-KEY
- sender_email: crm@yourdomain.com
- sender_name: Your Business CRM

## Supabase access token
- type: platform
- provider: supabase
- site: https://supabase.com/dashboard/account/tokens
- access_token: sbp_PASTE-TOKEN
- notes: Used to switch the sign-in options on. Delete it afterwards and revoke the token in Supabase.

## Example tool API
- type: api_key
- site: https://api.example.com
- api_key: PASTE-API-KEY

## Example MCP server
- type: mcp
- mcp_url: https://mcp.example.com/sse
- token: PASTE-TOKEN-IF-NEEDED
