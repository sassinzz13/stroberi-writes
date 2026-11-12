# Home and routing

Purpose: render the root page and document shell. Verified: 2026-11-12.

Read in order:
1. [page.tsx](../../../frontend/src/app/page.tsx): `Page` imports the feature facade.
2. [index.ts](../../../frontend/src/features/home/index.ts): exports `HomePage`.
3. [home-page.tsx](../../../frontend/src/features/home/components/home-page.tsx): `HomePage` renders a centered welcome heading and introductory paragraph.
4. [layout.tsx](../../../frontend/src/app/layout.tsx): `RootLayout` wraps children; `metadata` supplies the title.
5. [globals.css](../../../frontend/src/app/globals.css): Tailwind import and body styles.

Flow: `/` → `Page` → feature public export → `HomePage`, inside `RootLayout`.
Boundary: route wiring belongs in app; home-specific UI belongs in the feature. Shared styles live in the app stylesheet. No hooks, event handlers or fetch calls are implemented here.

Related tests: none for UI behavior; [static/build checks](../tests.md) do not establish browser behavior. See [architecture](../../spec/architecture.md) and [initialization scope](../../plan/documentation-initialization.md).
