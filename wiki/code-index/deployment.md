# Deployment navigation

Purpose: development and production container definitions. Verified: 2026-11-12.

| Read-first file | Ownership |
|---|---|
| [Dockerfile](../../deployment/Dockerfile) | backend/frontend dev, build and production stages |
| [docker-compose.dev.yml](../../deployment/docker-compose.dev.yml) | Source mounts, dependency/cache volumes, loopback ports |
| [docker-compose.yml](../../deployment/docker-compose.yml) | Production targets, health checks, restart policies |
| [air.toml](../../deployment/air.toml) | Go build watcher, polling, shutdown |
| [Dockerfile.dockerignore](../../deployment/Dockerfile.dockerignore) | Build-context allowlist/exclusions |
| [README.md](../../deployment/README.md) | Existing operator instructions |

Boundary: separate app processes; no database, reverse proxy, TLS or external hosting configuration. Development volumes hold dependencies/caches. Environment-file contents are outside documentation inspection. Default host ports overlap between dev and prod.

Related: [architecture](../spec/architecture.md), [development runbook](../runbooks/development.md), [checks](tests.md), [documentation plan](../plan/documentation-initialization.md). Compose validation is available; container startup/build behavior was not verified for wiki initialization.
