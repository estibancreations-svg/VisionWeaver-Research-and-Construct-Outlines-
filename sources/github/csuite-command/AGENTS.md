<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Keep core entity state and pure transitions in src/lib/platform-model.ts with a React adapter in src/components/platform/PlatformProvider.tsx; persistence can be replaced without rewriting views.
Until an approved shared database connection is implemented, persist staged workspace data in browser storage and never treat local approvals as production authorization or execute external actions.
Use shared entity workbenches for platform concepts and a shared creation editor for Story Core and Parcel Core; domain-specific seed content keeps each workspace distinct.
