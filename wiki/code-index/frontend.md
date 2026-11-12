# Frontend navigation

Purpose: Next.js routing, React presentation and frontend tooling. Verified: 2026-11-12.

Read first: [frontend instructions](../../frontend/AGENTS.md), [manifest](../../frontend/package.json), then [Home and routing](frontend/home.md).

| Owner | Entrypoint / responsibility |
|---|---|
| `frontend/src/app/layout.tsx` | `RootLayout`, `metadata`; document shell |
| `frontend/src/app/page.tsx` | `Page`; `/` composition |
| `frontend/src/features/home/index.ts` | Public `HomePage` export |
| `frontend/src/shared/README.md` | Shared-code conventions; proposed folders are not implemented |
| `frontend/eslint.config.mjs` | Import-direction restrictions and Next lint rules |
| `frontend/tsconfig.json` | Strict checking; `@/*` maps to `src/*` |
| `frontend/next.config.ts` | Standalone output and configured Next options |
| `frontend/postcss.config.mjs` | Tailwind CSS integration |
| `frontend/package.json`, `frontend/package-lock.json` | Commands, declared and resolved dependencies |

Boundary: app composes features; features may use shared code; shared code must not depend on app/features. Read installed matching Next guides before frontend code changes, as required by frontend AGENTS.md. No client state, API client or frontend behavioral tests currently exist.

Related: [architecture](../spec/architecture.md), [checks](tests.md), [documentation plan](../plan/documentation-initialization.md).
