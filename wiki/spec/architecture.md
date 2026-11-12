# Application architecture

Source verified: 2026-11-12. This is an early application scaffold with separate frontend and backend processes.

## Stack and versions
Versions below are repository evidence, not claims about the latest upstream release.

| Technology | Declared / resolved evidence |
|---|---|
| Next.js | 16.4.6, frontend manifest and lockfile |
| React / React DOM | 19.3.0, manifest and lockfile |
| TypeScript | manifest ^5; lockfile 5.9.3 |
| Tailwind CSS / Tailwind PostCSS plugin | manifest ^4.3.5; lockfile 4.3.5 |
| PostCSS | manifest ^8.5.32; lockfile 8.5.32 |
| ESLint / eslint-config-next | manifest ^9 / 16.4.6; lockfile 9.39.5 / 16.4.6 |
| Type packages | lockfile @types/node 20.19.43; @types/react and @types/react-dom 19.3.0 |
| Go / Gin | go.mod: go 1.27.3; github.com/gin-gonic/gin v1.12.0 |
| Container bases | Dockerfile: golang:1.27.3-alpine, node:26-alpine, alpine:3.24 |
| Air dev watcher | Dockerfile installs v1.67.4 |

Observed local tools: Node v26.13.0, npm 11.20.0, Go go1.27.3 darwin/arm64, Docker Compose v5.6.1. These are local observations, not all pinned requirements.

## Frontend boundary and flow
`Browser GET / → src/app/layout.tsx + src/app/page.tsx → features/home/index.ts → HomePage → centered welcome heading and introductory paragraph`

The app layer owns routing and the document shell. Features own domain UI; shared code is reserved for domain-independent reuse. ESLint prohibits feature/shared imports from app, and shared imports from features. TypeScript maps `@/` to `src/`. Current components contain no client directive, hooks, state, event handlers, or fetch calls. No API communication is wired. Tailwind is loaded through PostCSS and global CSS. Next config enables standalone output and the recorded cache/prefetch options; their runtime effects were not separately tested.

## Backend boundary and flow
`main → run → config.Load → app.NewServer → app.NewRouter → net/http listener`
`GET /api/v1/health → Gin logger/recovery → /api/v1 group → health.getHealth → JSON 200`

Go's standard HTTP server owns listening, timeouts, and graceful shutdown; Gin supplies routing, middleware, and JSON responses. Config validation fails startup for invalid PORT/GIN_MODE. Router setup errors propagate to main, which logs and exits. Panic recovery is configured; unknown paths/methods have explicit JSON responses. No trusted forwarding proxies are configured.

Server timeouts: read headers 5s, read/write 15s, idle 60s. On interrupt/SIGTERM, shutdown gets 10s to drain requests; failure forces close. Compose allows 15s before stopping the container. No service/repository layer exists because the current handler performs no business logic or persistence.

## Data and database
No database connection, ORM, SQL, schema, migrations, entities, relationships, or persistent application storage is implemented. Health returns a literal status object. The indirect MongoDB driver in go.mod is not imported by application code. Development Docker volumes store dependencies/caches, not user data.

## Deployment and integration
One multi-stage Dockerfile builds both apps. Development uses bind mounts, Next dev, Air polling and named dependency/build-cache volumes. Production copies a compiled Go binary and Next standalone server into non-root runtime stages. Both production services have HTTP health checks; development has a backend health check. Services restart unless stopped.

Frontend port is 3000; backend port is 8080. Published ports default to loopback; production permits BIND_ADDRESS override. Dev/prod have distinct project names but default to the same host ports. No reverse proxy, TLS, domain setup, database, or CI pipeline is provided. No CORS middleware or frontend API rewrite is present. A future container-side API call could use `http://backend:8080`, but that integration is not implemented.

Go directly reads process environment; it does not load dotenv files. Air is configured to load an optional .env in development. Environment-file contents were deliberately not inspected. Docker build context excludes environment files. No deployment was started during initialization.

## Testing boundaries
Backend route test covers health success, unknown path, unsupported method, and content type using httptest (no network listener). No dedicated config/shutdown tests or frontend behavioral tests exist. Lint/typecheck/build and Compose validation are distinct from browser interaction or deployed-container tests. See CURRENT_STATE.md for verification outcomes.

## Evidence and navigation

Rechecked against application source, manifests and deployment definitions during wiki initialization on 2026-11-12. Tool-version observations and application test results above originate from the earlier memory initialization; they were not rerun for this documentation-only task. Existing architecture is observed rather than newly chosen.

Read the [code index](../code-index/index.md), [HTTP contract](http-api.md), [check runbook](../runbooks/development.md) and [known issues](../../.codex-memory/KNOWN_ISSUES.md) for focused follow-up.
