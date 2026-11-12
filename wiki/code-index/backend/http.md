# HTTP and health navigation

Purpose: versioned API routing and liveness. Verified: 2026-11-12.

| Read-first file | Symbols / responsibility |
|---|---|
| [server.go](../../../backend/internal/app/server.go) | `NewRouter`: logger/recovery, proxy policy, 404/405, `/api/v1` group |
| [routes.go](../../../backend/internal/features/health/routes.go) | `RegisterRoutes`: GET `/health` within supplied group |
| [handler.go](../../../backend/internal/features/health/handler.go) | `getHealth`: literal JSON status |
| [server_test.go](../../../backend/internal/app/server_test.go) | `TestRoutes`: health, missing route, unsupported method and content type |

Boundary: app owns shared HTTP errors and middleware; health owns its route and response. Gin dispatches requests; standard `net/http` owns listening and timeouts. No data store is consulted.

Contract: [HTTP API](../../spec/http-api.md). Related: [architecture](../../spec/architecture.md), [checks](../tests.md), [documentation plan](../../plan/documentation-initialization.md).
