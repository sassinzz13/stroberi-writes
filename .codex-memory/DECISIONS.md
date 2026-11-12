# Decisions

## ADR-001 — Persistent, source-backed navigation
- Date: 2026-11-12.
- Status: accepted; explicitly requested by user and project AGENTS.md.
- Decision: initialize only `.codex-memory/` documentation; use INDEX and CURRENT_STATE first, then relevant map/source. Update memory after significant work with request, changes, rationale, checks, and unfinished work.
- Why: a compact map avoids repeated full scans while source checks prevent stale notes from becoming assumptions.
- Tradeoff: memory requires maintenance; it is not an automatic source-of-truth or runtime dependency.
- Scope: no application changes, no new dependencies, no global configuration changes, no Git initialization.

## Observed conventions — existing, not newly chosen
These describe current source and READMEs; historical alternatives and author rationale are not available.

- Frontend uses app → features → shared direction, with ESLint restrictions and feature public exports. This keeps route composition separate from feature code. Evidence: frontend README, eslint.config.mjs, src/app/page.tsx, features/home/index.ts.
- Backend groups code by feature and wires routes in internal/app. README defers services/repositories until needed; health has only a route and handler. This avoids empty architectural layers.
- Production uses a Go binary and Next standalone output in separate non-root containers. Development uses source mounts and watchers. Evidence: deployment/Dockerfile and Compose files.
- API health means process liveness only. It must not be described as database readiness. Evidence: health/handler.go and backend README.
- Loopback host bindings and disabled trusted proxies are current defaults. Future hosting/integration work must inspect actual topology before changing them.

## ADR-002 — Wiki owns architecture and layered navigation
- Date: 2026-11-12; accepted by explicit mapwrite request. Supersedes ADR-001's memory-only documentation location.
- Decision: wiki/spec owns architecture/contracts; wiki/code-index owns nested subsystem maps; memory owns task outcomes/decisions/issues. Old memory map and architecture files are compatibility links.
- Why: one detailed owner per topic avoids stale duplicates; plain Markdown and rg need no additional dependencies. No generated symbol database for this small scaffold.
- Workflow: memory → index → targeted source verification → implementation → checks → explanation → memory/wiki updates. User reinforced automatic continuity and maintenance in updated instructions.
- Tradeoff: freshness requires updating affected documents; root files persist locally but remain outside Git. Application architecture and global configuration were not changed.

## ADR-003 — Preserve v1 and develop v2 in one root repository
- Date: 2026-11-12; user requested the existing GitHub repository for versions 1 and 2.
- Decision: `v1` plus annotated `v1.0.0` preserve existing main; `v2` continues from that commit with the new full-stack workspace. Keep `main`/`java-version` unchanged and retain the original LICENSE.
- Why: one repository preserves old history while frontend/backend/deployment/documentation can change together. Branches support ongoing development; the tag records a fixed baseline, not a newly tested release.
- Migration: preserve the standalone frontend Git metadata outside the workspace; no force pushes or discarded application edits. Supersedes the historical outside-Git limitation in ADR-002.
