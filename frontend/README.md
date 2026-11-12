# Stroberi Writes frontend

Next.js App Router with TypeScript, React, Tailwind CSS, and feature-based organization.
Run commands from `frontend/`.

## Development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Configuration and `.env.local` belong in `frontend/`;
static assets stay in `public/`.

## Structure

```text
src/
  app/                         # Next.js routing, layouts, metadata, global styles
    page.tsx                   # Composes the home feature
    layout.tsx
    globals.css
    favicon.ico
  features/
    home/
      components/home-page.tsx # Home feature UI
      index.ts                 # Public feature exports
  shared/                      # Code reused across features
public/                        # Static assets
```

Dependencies flow from `app` to `features` to `shared`. ESLint rejects feature
imports from `app` and shared imports from either `app` or `features`.
The `@/` import alias points to `src/`.

Keep route files focused on routing concerns and feature composition. Each feature
owns its UI, domain logic, API calls, hooks, and types. Add folders only as needed:

```text
features/posts/
  components/       # Post list, editor, and other post-specific UI
  api/              # Calls to the Gin backend for posts
  hooks/            # Feature-specific client hooks
  types.ts          # Post-specific types
  index.ts          # Public, environment-safe exports
```

Import public feature exports from routes, for example
`import { HomePage } from "@/features/home"`. Inside a feature, use relative imports
and avoid importing its own `index.ts`. Compose independent features in `app`
instead of coupling their internals. Colocate future tests with the code they cover.

Components are Server Components by default. Add `"use client"` only to components
that need client state, events, or browser APIs. Keep server-only API access in
separate modules marked with `import "server-only"`; do not re-export those modules
through an index imported by Client Components. Keep backend credentials on the
server. No backend requests or global state library are configured yet.

Use `shared/` for domain-independent code used across features; its README describes
the intended directories. Global CSS and application-wide providers belong in
`app/`, with providers added when required.

## Checks and production

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Type checking generates Next.js route types before running TypeScript.
