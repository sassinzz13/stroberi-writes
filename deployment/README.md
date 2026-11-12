# Docker development and deployment

One Alpine-based `Dockerfile` builds both applications. Each Compose file starts
both services by selecting the appropriate build targets; no extra Compose files
or overrides are required. Docker Desktop or Docker Engine with Compose must be running.

## Development

From the repository root:

```sh
docker compose -f deployment/docker-compose.dev.yml up -d --build
```

Or from `deployment/`:

```sh
docker compose -f docker-compose.dev.yml up -d --build
```

Frontend: http://localhost:3000. API health: http://localhost:8080/api/v1/health.
Save source files normally: Next.js Fast Refresh updates the frontend, and Air
rebuilds and restarts Go automatically. Containers keep running after closing your
terminal and restart with Docker unless explicitly stopped.

Source folders are bind-mounted. Linux dependencies, Next.js output, and build
caches live in named volumes, separate from host dependencies. The first startup
installs dependencies. After changing `package.json` and `package-lock.json`, run:

```sh
docker compose -f deployment/docker-compose.dev.yml restart frontend
```

Go module changes trigger Air. Restart the relevant service after changing `.env`
files or `air.toml`. Next.js reads `frontend/.env.local`; Air reads `backend/.env`
if present. Keep internal ports at 3000 and 8080.

## Production

From the repository root:

```sh
docker compose -f deployment/docker-compose.yml up -d --build
```

Or from `deployment/`, where Compose discovers `docker-compose.yml` automatically:

```sh
docker compose up -d --build
```

This builds a Go binary and a Next.js standalone production server into runtime
images running as non-root users. No source mounts, development watchers, or
startup dependency installs are used. Rebuild to deploy source changes.

Development and production use distinct Compose project names, but share default
host ports. Stop development before starting production, or choose alternate ports:

```sh
docker compose -f deployment/docker-compose.dev.yml stop
# Alternatively, run production alongside development:
FRONTEND_PORT=3001 BACKEND_PORT=8081 docker compose -f deployment/docker-compose.yml up -d --build
```

Production ports bind to localhost by default for a host reverse proxy. Set
`BIND_ADDRESS=0.0.0.0` when you intentionally want direct network access. TLS,
domain configuration, persistence, and application secrets are deployment-specific
and are not provisioned here. Environment files are excluded from image builds;
configure production variables through Compose or your deployment environment.
`NEXT_PUBLIC_*` values used by client code must be supplied at build time when added.

## Operations

Use the same Compose file as the stack you started:

```sh
docker compose -f deployment/docker-compose.dev.yml logs -f
docker compose -f deployment/docker-compose.dev.yml ps
docker compose -f deployment/docker-compose.dev.yml stop
docker compose -f deployment/docker-compose.dev.yml down
```

Ctrl+C while following logs leaves containers running. `down` removes containers
and the network while retaining dependency caches. Replace the filename with
`docker-compose.yml` to manage production.

For future server-side frontend calls, the API address inside Docker is
`http://backend:8080`. Browsers use the published host port. This setup does not
add API calls, a reverse proxy, or cross-origin configuration.
