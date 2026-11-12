# Code index

Verified: 2026-11-12. Paths in shards are relative to the workspace root unless linked otherwise.

| Task | Read next |
|---|---|
| Home page, route, document shell, styling | [Frontend](frontend.md) → [Home and routing](frontend/home.md) |
| Frontend dependencies, imports, type checking | [Frontend](frontend.md) |
| Startup, environment validation, shutdown | [Backend](backend.md) |
| Health endpoint, middleware, JSON errors | [HTTP and health](backend/http.md) |
| Docker builds, ports, watchers | [Deployment](deployment.md) |
| Tests, lint, build checks | [Testing](tests.md) |

Read [architecture](../spec/architecture.md) for behavior and rationale; maps only locate owners. No database, authentication, writing feature, API client or migrations exist yet. `skills/` and `third-party/` are tooling/reference material, not application subsystems.

Before edits: inspect applicable AGENTS.md, check Git in the owning repository, verify listed files/symbols with targeted `rg`, then read direct dependencies. The workspace root is the Git repository on branch `v2`; frontend/backend/deployment/wiki/memory share its history. See the [root README](../../README.md) for version refs. Verify working-tree changes before editing.
