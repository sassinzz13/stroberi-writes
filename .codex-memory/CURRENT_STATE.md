# Current State

Last updated: 2026-11-12 (Asia/Manila).
Initialization complete: source-backed memory plus mapwrite wiki and layered code indexes; no application source/configuration changes.

## Git and workspace baseline
- Repository: https://github.com/sassinzz13/stroberi-writes.git; root branch `v2` now covers frontend, backend, deployment, wiki and memory.
- Version split: preserve remote main `86eb71ab05efbbbb1469f898a5d7fdbec1d9fb7e` as `v1` and `v1.0.0`; develop rewrite on `v2`, keeping `main` and `java-version` unchanged.
- Original standalone frontend Git metadata and working diff backed up outside workspace in sibling `stroberi-git-migration-xic1z6ce/`; application files preserved.
- Dependencies, generated output, environment files, local skills/reference collections and unreviewed design assets excluded from initial import. Original repository LICENSE retained.
- Publication/check outcome: see latest task history entry; no v2 release or deployment implied.

## Current implementation
- Next.js 16.4.6 / React 19.3.0 frontend; current source renders a welcome heading and paragraph. Local Docker production on port 3000 was observed serving an older empty page on 2026-11-12; source edits require rebuilding that image or using development mode.
- Go 1.27.3 / Gin 1.12.0 backend; GET `/api/v1/health` is the only business-defined endpoint (liveness only).
- No writing features, authentication, frontend API calls, database, schema, or relationships implemented.
- Docker development and production configurations exist for both processes; no deployment was performed.

## Latest diagnostic
Heading edit verified via temporary development server on port 3001 (HTTP 200, heading and paragraph present); server stopped afterward. Port 3000 serves a stale Docker production build. No application edits or container changes made; browser appearance remains unverified. See TASK_HISTORY.md.

## Last completed documentation task
User requested mapwrite initialization: searchable persistent wiki, layered React/Go indexes, targeted verification before future implementation, and documentation updates after significant changes. Created 14 wiki documents; updated root AGENTS.md and memory navigation/state/decisions/history. Architecture and code maps now have canonical wiki owners, with compatibility links in memory.

## Wiki verification on 2026-11-12
Passed: 90 local Markdown links across 21 wiki/memory documents, 10 inline indexed paths, 14 key symbols, a targeted wiki search, and SHA-256 preservation of 18 application source/deployment files. No application checks were rerun for this documentation-only task.
Historical limitation resolved by the later root Git migration; no wiki initialization work remains.

## Earlier memory-initialization verification on 2026-11-12
- Frontend `npm run lint`: passed.
- Frontend `npm run typecheck`: passed; generated Next route types then ran TypeScript.
- Frontend `npm run build`: passed; `/` and `/_not-found` reported as static routes.
- Backend `go test ./...`: passed using cached route result; explicitly repeated with `go test -count=1 ./...`: passed uncached.
- Backend `go vet ./...`: passed.
- Both production/development `docker compose ... config --quiet`: passed.
- SHA-256 baseline comparison of 34 scoped existing source/config/project-doc files: unchanged after checks and memory edits.
- Check commands generated ignored build/type artifacts; those were excluded from analysis and preservation comparison.
- No browser checks, container builds/startup, external deployment, vulnerability audit, or secret inspection performed.

## Next steps / outstanding work
- No initialization work remains; no active application implementation task.
- For future requests, read INDEX + this state, consult wiki/index.md and wiki/code-index/index.md, check current Git/source, and inspect only relevant dependencies unless broader investigation is necessary.
- Update affected memory after significant work: request, actual changes, why, test results, and unfinished work.
- Known gaps and a stale README favicon reference are recorded in KNOWN_ISSUES.md, not fixed.
- Continue development on `v2`; release/promotion to `main` is future work.
