# Stroberi Writes — Version 2

Version 2 is an in-progress rewrite using Next.js/React and Go/Gin. The current
scaffold renders a welcome page and provides a health endpoint; writing features,
authentication and database persistence are not implemented yet.

## Versions

| Ref | Purpose |
| --- | --- |
| `main` | Existing application, unchanged by the version split |
| `v1` | Branch preserving the existing application; available for future v1 fixes |
| `v1.0.0` | Fixed snapshot of existing `main` at `86eb71ab05efbbbb1469f898a5d7fdbec1d9fb7e` |
| `v2` | Active development of this rewrite |
| `java-version` | Existing historical branch, unchanged |

The v1 marker records the existing code, not a new verification or deployment.
There is no `v2.0.0` release yet. The v2 branch continues repository history from
the v1 snapshot, replacing its working tree with this scaffold.

## Workspace

- `frontend/`: Next.js routes, React features, styling and frontend tooling.
- `backend/`: Go/Gin HTTP API.
- `deployment/`: development and production Docker definitions.
- `wiki/`: architecture, code navigation and runbooks.
- `.codex-memory/`: task history and continuity notes.

One Git repository at the workspace root tracks these directories together.
Local environment files, generated output, dependencies, tooling/reference
collections and unreviewed design assets are excluded from this initial import.

## Develop locally

```sh
cd frontend
npm ci
npm run dev -- --port 3001
```

Open <http://localhost:3001>. Port 3001 avoids the existing local production
container on port 3000. Development mode watches saved source changes; a
production Docker image must be rebuilt to incorporate them.

See [frontend instructions](frontend/README.md), [backend instructions](backend/README.md),
[Docker instructions](deployment/README.md), [project wiki](wiki/index.md), and
[verification commands](wiki/runbooks/development.md).

Before committing, run `git status` at the root and confirm the branch is `v2`.
Do not merge the rewrite into `main` until it is ready for the intended release.
