# Tests and verification map

Purpose: locate checks and understand their limits. Verified: 2026-11-12.

| Owner | Check / coverage |
|---|---|
| [server_test.go](../../backend/internal/app/server_test.go) | `TestRoutes` uses httptest; status/body/content type for health/404/405 |
| [package.json](../../frontend/package.json) | lint, typecheck, build; no behavioral test script |
| [Compose definitions](deployment.md) | Configuration validation; no runtime test suite |

No dedicated config/shutdown tests, frontend behavioral tests or scoped application CI workflows were found. `httptest` dispatches directly into the router without opening a network listener; it does not prove process startup or deployment.

Commands and limits: [development runbook](../runbooks/development.md). Expected HTTP responses: [contract](../spec/http-api.md). Documentation acceptance: [plan](../plan/documentation-initialization.md). Actual run outcomes belong in memory/current state and the wiki log, not implied by this command map.
