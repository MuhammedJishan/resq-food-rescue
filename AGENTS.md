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

## Architecture

- All app state lives in `src/lib/store.tsx` (AppProvider context with in-memory mock data) — swap its internals for Supabase-backed services later; screens must keep consuming `useApp()`, never mock data directly. Why: one seam for the future backend.
- Premium entitlement goes through `src/lib/premium.ts` (MockPremiumService, RevenueCat-ready interface). Why: no scattered hard-coded premium checks.
- Vendor mode is the same app and the same store (`VENDOR_MODE_VENDOR_ID`), not a separate surface. Why: spec requires consumer/vendor mode switching with shared state.
