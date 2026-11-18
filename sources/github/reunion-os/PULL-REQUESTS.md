# Pull requests — estibancreations-svg/reunion-os

Source: list_pull_requests state=all, retrieved 2026-11-18 (read-only). Total: 2.

## PR #1: Restore Reunion OS runtime compatibility and replace task/assignment API stubs with Prisma-backed handlers

- State: closed; merged
- Author: Copilot
- Head: copilot/finish-deployment-to-vercel → Base: main
- Created: 2026-09-07T19:31:30Z | Updated: 2026-09-08T01:46:42Z | Closed: 2026-09-08T01:46:42Z | Merged: 2026-09-08T01:46:42Z
- Body:

The app had drifted into a partially simplified state: page/components/types/store contracts no longer matched, and key APIs still returned placeholders. This PR restores contract alignment so the app runs in demo mode again while moving core server routes (tasks, assignments) to real Prisma reads/writes.

- **Type contract restoration (shared + web)**
  - Reintroduced missing domain types used across UI and context (`SessionUser`, `RoleTier`, `BadgeId`, `AuditEvent`, richer assignment/task/notification/gamification shapes).
  - Switched web type entrypoint to full re-export of shared package types to avoid split definitions.

- **Store compatibility layer + demo resilience**
  - Reworked `lib/store.ts` to support both simplified seed data and richer UI expectations via normalization.
  - Added/restored named helper exports used by pages (`getAssignments`, `saveAssignment`, `getCategories`, `getAllTasks`, `getAssignmentForUser`, `getConvergedPunchList`, `getGamification`, `updateTaskStatus`, `completeTaskWithRewards`, `getLeaderboard`, `getSystemHealth`, etc.).
  - Enabled automatic demo seed hydration from `lib/seed` when local state is empty.

- **Gamification surface completion**
  - Added missing exports consumed by HUD/achievements (`BADGE_META`, `defaultGamification`, `pointsToNextLevel` aliasing).
  - Aligned profile point/streak/badge semantics with existing UI expectations.

- **Component/page integration fixes**
  - Updated `AssignmentSpreadsheet` and `PersonalPunchList` to match actual call sites (prop signatures + default exports).
  - Added null-safe handling for optional assignment/category/profile fields across admin/user/login surfaces.
  - Aligned toast bus typing (`ToastItem`, `durationMs`, unsubscribe signature) with `ToastHost`.

- **Server API implementation (Prisma)**
  - Added shared Prisma singleton helper (`lib/prisma.ts`).
  - Replaced stubbed `/api/tasks` and `/api/assignments` routes with live Prisma handlers:
    - `GET`: query and map DB records to client shape.
    - `PATCH`: validate IDs and persist updates.
    - Graceful `503` response when DB env is not configured.

```ts
// apps/web/src/app/api/tasks/route.ts (shape)
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const taskId = String(body.taskId ?? body.id ?? '');
  if (!taskId) return NextResponse.json({ ok: false, message: 'taskId is required' }, { status: 400 });

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: { status: body.status, assigneeId: body.assigneeId, dueDate: body.dueDate ? new Date(body.dueDate) : undefined },
    include: { category: true, assignee: true },
  });

  return NextResponse.json({ ok: true, data: updated });
}
```

---

## PR #2: Add admin-only OSIRIS intelligence surface and logistics-aware intake signals

- State: open (draft)
- Author: Copilot
- Head: copilot/osiris-integration-recommendation → Base: main
- Created: 2026-09-17T13:18:09Z | Updated: 2026-09-17T13:18:09Z | Closed: None | Merged: None
- Body:

This introduces OSIRIS as a separate, read-only situational-awareness integration instead of coupling it into the Reunion OS runtime. It also extends intake so logistics-related monitoring needs can be captured early and translated into operational follow-up.

- **Admin intelligence surface**
  - Adds `/admin/intelligence` as a protected, admin-only entry point for external intelligence review
  - Frames OSIRIS as a separate service with read-only usage and clear escalation paths into existing Reunion OS workflows
  - Supports embed-first behavior with a direct-launch fallback when framing is blocked by OSIRIS headers or CSP

- **Navigation and discoverability**
  - Adds an “Operations Intelligence” entry to admin navigation
  - Adds a matching admin dashboard card
  - Keeps the surface hidden from non-admin operators

- **Configuration boundary**
  - Introduces `NEXT_PUBLIC_OSIRIS_URL` as the single integration point for the external OSIRIS host/subdomain
  - Documents the deployment model so OSIRIS remains independently hosted and operationally isolated

- **Workflow integration via intake**
  - Extends intake questions to capture:
    - airport pickup / arrival tracking
    - travel disruption monitoring
    - port / ferry / cruise coordination
    - weather / outdoor operations monitoring
  - Keeps intelligence tied to operational planning rather than as a standalone view

- **Task generation updates**
  - Expands intake-driven task suggestions to create logistics follow-ups for the new monitoring signals
  - Preserves the current API-first flow and existing task-generation pattern

```tsx
const osirisUrl = process.env.NEXT_PUBLIC_OSIRIS_URL?.trim() || '';

{osirisUrl ? (
  <iframe title="OSIRIS intelligence dashboard" src={osirisUrl} />
) : (
  <p>Set NEXT_PUBLIC_OSIRIS_URL to enable the admin intelligence surface.</p>
)}
```

---

