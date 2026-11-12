# Development and verification

Source: current manifests, source tests and Compose files, verified 2026-11-12. Commands below are instructions, not evidence they ran in this task.

| Working directory | Command | What it verifies / does |
|---|---|---|
| `frontend/` | `npm run dev` | Starts local Next development server |
| `backend/` | `go run ./cmd/api` | Starts API, default port 8080 |
| `frontend/` | `npm run lint` | Checks configured lint/import rules |
| `frontend/` | `npm run typecheck` | Generates Next route types, then checks TypeScript without emitting JS |
| `frontend/` | `npm run build` | Produces production build; not a browser test |
| `backend/` | `go test -count=1 ./...` | Runs Go tests without cached results |
| `backend/` | `go vet ./...` | Go static diagnostics |
| Workspace root | `docker compose -f deployment/docker-compose.yml config --quiet` | Validates production Compose configuration |
| Workspace root | `docker compose -f deployment/docker-compose.dev.yml config --quiet` | Validates development Compose configuration |

Dependencies/toolchains must be available; frontend dependency setup uses its committed-format lockfile with `npm ci`, and Go resolves modules from go.mod/go.sum. See the [frontend map](../code-index/frontend.md) and [backend map](../code-index/backend.md) for repository versions. Do not infer upstream compatibility from this document.

If the API is already running, `curl -i http://127.0.0.1:8080/api/v1/health` should return the [health contract](../spec/http-api.md). This is a manual smoke check, not evidence of database readiness. Stop local servers when done. Container build/start commands and operational details live in [deployment README](../../deployment/README.md); no deployment is part of documentation initialization.

Static checks can pass while browser behavior or container startup fails. No browser/container checks are claimed. Historical application check results are retained in [current state](../../.codex-memory/CURRENT_STATE.md); current documentation checks are recorded in [log](../log.md).
