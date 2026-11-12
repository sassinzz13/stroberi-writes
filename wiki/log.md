# Wiki change log

Append entries; read only recent entries unless historical investigation is needed.

## 2026-11-12 — Initialize mapwrite documentation
- Request: persistent searchable wiki, layered code navigation, targeted source verification and ongoing updates.
- Added wiki entrypoint, subsystem maps, architecture/HTTP specs, development/documentation runbooks and initialization plan. Updated root AGENTS.md; retained memory navigation through compatibility links.
- Validation: Passed: 90 local Markdown links across 21 wiki/memory documents, 10 inline indexed paths, 14 key symbols, a targeted wiki search, and SHA-256 preservation of 18 application source/deployment files. No application checks were rerun for this documentation-only task.
- Limits: documentation only; no app/runtime/deployment changes. Root documentation is outside frontend Git history.

## 2026-11-12 — Diagnose blank home page after user heading edit
- User added heading/paragraph correctly in `frontend/src/features/home/components/home-page.tsx`; no application source changes made by agent.
- Cause verified: localhost:3000 belongs to `stroberi-writes-prod-frontend-1` and HTTP response still contains empty `<main></main>`. Production Dockerfile copies compiled output; production Compose has no source mount.
- Verification: temporary local `npm run dev -- --hostname 127.0.0.1 --port 3001` returned HTTP 200 with the actual h1 and paragraph text. Stopped temporary server after check; existing containers unchanged. No browser visual check performed.
- Guidance: run local development on port 3001 while production occupies 3000; production image needs rebuilding to include edits. Corrected stale source descriptions in home map and architecture.
