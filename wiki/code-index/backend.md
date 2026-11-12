# Backend navigation

Purpose: configure and run the Go HTTP process. Verified: 2026-11-12.

| Read-first file | Symbols / responsibility |
|---|---|
| [main.go](../../backend/cmd/api/main.go) | `main`, `run`: configuration, listener, signals, graceful shutdown |
| [config.go](../../backend/internal/config/config.go) | `Config`, `Load`, `envOrDefault`: validate PORT and GIN_MODE |
| [server.go](../../backend/internal/app/server.go) | `NewServer`, `NewRouter`: HTTP infrastructure and feature registration |
| [go.mod](../../backend/go.mod) | Module, Go and Gin versions |

Flow: `main` → `run` → `config.Load` → `app.NewServer` → `app.NewRouter` → HTTP listener.
Boundary: cmd owns process lifetime; config owns environment parsing; app assembles HTTP infrastructure; features own endpoints. There are no service/repository/database layers yet.

Continue to [HTTP and health](backend/http.md). Related: [architecture](../spec/architecture.md), [tests](tests.md), [documentation plan](../plan/documentation-initialization.md). Config/shutdown have no dedicated tests yet.
