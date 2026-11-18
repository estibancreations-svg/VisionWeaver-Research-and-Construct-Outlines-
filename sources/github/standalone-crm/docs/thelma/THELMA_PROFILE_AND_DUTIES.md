# T.H.E.L.M.A. — profile, duties and limits

> In this CRM the letters stand for **T**rusted **H**ub for **E**ngagement, **L**eads, **M**arketing &
> **A**utomation. In Sire's wider platform, T.H.E.L.M.A. (system ID `SYS-THELMA-001`) is the
> enterprise operations and orchestration backbone. Sire refers to her as **HER** / **SHE** (written in
> capitals to avoid confusion).

Think of HER like the head of operations in a secure building. SHE knows every department, sends
work to the right desk and keeps the logbook — but SHE doesn't sign checks. The Owner does.

## 1. Who SHE is

- Sire's core AI, built into **every** system he creates.
- Works under **zero-trust** rules with an **air gap**: nothing crosses without a guarded door and a log.
- Runs her own **agents** (assistant bots, chat bots, outside agents) and can, by design goal, consult
  other AI models (Claude, Gemini, DeepSeek and others) like a model picker.
- Talks **directly with Sire**. Sire approves moves; the system then carries them out.

## 2. Her duties in T.H.E.L.M.A. CRM Complete (Version 2.0)

| Duty | How it works today | Status |
|---|---|---|
| Receive work requests from her helpers | Helpers send signed requests to the `thelma-gateway` Edge Function | **Built** |
| Hold every request for the Owner | Requests wait in **Owner tools → T.H.E.L.M.A.** as *pending* | **Built** |
| Owner-only decisions | `decide_thelma_request` — Owner role + two-step sign-in required; admins can only read | **Built** |
| Keep a permanent record | Requests are never deleted; decisions record who, when and a note | **Built** |
| Expire stale asks | Requests expire after 7 days if undecided | **Built** |
| Carry out approved moves | Executor that performs the approved action and marks it *executed* | **Next (v2.1)** |
| Protect the installer (Fail Safe) | Backup admin release code `THELMA-XXXX-…`; only a fingerprint is stored | **Built (v3.1)** |
| Watch usage and progress | Owner **Usage** page: people, last activity, setup progress | **Built** |
| Draft-only helpers first | Email helper drafts; humans send (R&D Phase 1) | Policy |
| Model picker (multi-LLM) | Providers/keys in the Vault; calls through one gated Edge Function | **Planned** |
| "White blood cell" monitoring | Track cost, credits, failures, blocked queues and drift; report actions, not just numbers | **Planned** |

## 3. Her limits (the air gap)

1. **No helper, bot or outside agent reads or writes CRM tables.** They can only *ask* through the gateway.
2. Every ask is **signed** (HMAC-SHA256 with `THELMA_GATEWAY_SECRET`) and **time-stamped** (within 5
   minutes) so it can't be faked or replayed.
3. Only the **Owner** decides. Agency admins and the backup admin can see the queue, not decide it.
4. **Two modes were proposed** (Oct 14 chat, awaiting Sire's choice):
   - **Sealed** — no outside AI at all; only a model running on Sire's own equipment.
   - **Gated** — outside models through one guarded Edge Function; client records leave only if a rule
     allows it; every call logged; each client keeps an allow-list of trusted AI providers.
5. Advanced AI may **propose**, never bypass policy (carried over from the THELMA directives: "HENRY AI
   proposes; policy approves").

## 4. Gateway request format (for anyone building a helper)

```
POST https://<project-ref>.supabase.co/functions/v1/thelma-gateway
x-thelma-timestamp: <unix seconds>
x-thelma-signature: <hex HMAC-SHA256 of "<timestamp>.<raw body>">
{ "agency_id": "<uuid>", "workspace_id": "<uuid or omit>",
  "source": "thelma | assistant_bot | chat_bot | agent | external_agent",
  "source_name": "Review watcher", "action": "reviews.reply",
  "summary": "Reply to a new Google review", "details": { }, "risk": "low | medium | high" }
→ 202 { "id": "...", "status": "pending" }
Poll: { "check": "<id>", "agency_id": "<uuid>" } → { "id", "status", "decided_at" }
```

## 5. How this maps to THELMA's wider architecture

| THELMA directive concept | In this CRM |
|---|---|
| **SMTL** — the only integration/security gateway | `thelma-gateway` + Edge Functions; RLS on every table |
| **IAIL** — append-only audit ledger | `activities` (append-only trail) + `thelma_requests` (never deleted) |
| **HR Modular Training** — walkthroughs + completion gating | First-sign-in walk-through + **Learn** (10 lessons, per-person progress). Feature gating by training is *not* enforced yet |
| **LILY (Tier 1)** — help and drafting only | Draft-only helpers (policy) |
| **HENRY AI (Tier 2)** — propose-only | Gateway requests are proposals; Owner approves |
| **THELMA-G** — separate government runtime | Model B (one database per client) is the closest pattern |

## 6. Sources

See `THELMA_SOURCES.md` for every file and repository this profile was built from.
