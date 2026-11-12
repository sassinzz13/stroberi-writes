# Stroberi Writes API

Go API using Gin and a feature-based package structure.

```text
cmd/api/main.go              # Process startup and graceful shutdown
internal/
  app/                      # HTTP server, middleware, and feature wiring
  config/                   # Environment configuration
  features/
    health/                 # Health routes and HTTP handler
```

## Run

Use the Go version declared in `go.mod`. From `backend/`:

```sh
go mod download
go run ./cmd/api
```

The server defaults to port `8080`. Check it with:

```sh
curl http://localhost:8080/api/v1/health
# {"status":"ok"}
```

Configuration comes from environment variables: `PORT` (default `8080`) and
`GIN_MODE` (`debug`, `release`, or `test`; default `debug`). `.env` files are not
loaded automatically. To use the supplied example in a POSIX shell:

```sh
cp .env.example .env
set -a
. ./.env
set +a
go run ./cmd/api
```

## Adding a feature

Create `internal/features/<feature>/` with its own `routes.go` and `handler.go`.
Add `service.go` for business logic, `repository.go` for persistence contracts
and implementations, and `model.go` for domain types when the feature needs them.
Keep code together by feature instead of creating global handler/service/repository
directories. The health feature stays small because it needs no persistence or
business logic layer.

Construct dependencies explicitly in `internal/app` and inject them through
constructors. Register each feature's routes on the `/api/v1` group in
`internal/app/server.go`. Keep HTTP parsing and responses in handlers, business
rules in services, and database access in repositories. Add shared infrastructure
under `internal/` only when needed; no database connection is configured yet.

Gin request logging and panic recovery are enabled. Unknown routes and unsupported
methods return JSON errors. Forwarded client IP headers are not trusted by default;
configure trusted proxy addresses in `internal/app/server.go` for your deployment.
`GET /api/v1/health` reports process liveness, not dependency readiness.

## Validate and build

```sh
go test ./...
go vet ./...
go build -o bin/api ./cmd/api
```
