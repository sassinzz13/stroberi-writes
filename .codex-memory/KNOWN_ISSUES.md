# Known Issues and Gaps

Verified from repository source on 2026-11-12. No application fixes are part of memory initialization.

## ISSUE-001 — Frontend README lists a missing favicon
- Status: verified documentation mismatch; open.
- Evidence: frontend/README.md structure lists `src/app/favicon.ico`; scoped source inventory has no such file, and frontend Git status shows original `app/favicon.ico` deleted.
- Reproduce: compare the README tree to files under frontend/src/app.
- Next action: decide whether to add a favicon or correct the README during an authorized application/documentation task.

## GAP-001 — Home route has no visible content
- Status: resolved in current source by user's welcome heading and paragraph.
- Verification: temporary development HTTP response included both texts. Existing local Docker production on port 3000 still serves an older build; rebuild it or use development mode to see current edits.

## GAP-002 — Business functionality and persistence are not implemented
- Status: verified scope gap, not a failing implementation.
- Evidence: only health is registered; no API client, database setup, schemas, migrations, authentication, or writing/post feature code exists in application directories.
- Next action: establish requirements before choosing storage, schema, or integration behavior. Do not infer features from README examples or third-party SQL skills.

## GAP-003 — Limited automated behavioral coverage
- Status: verified coverage gap.
- Evidence: only backend/internal/app/server_test.go exists; it covers health/404/405. Frontend package scripts contain no test runner. No config validation, shutdown, browser, or deployed-container tests found.
- Next action: add relevant tests alongside future behavior changes. Passing static checks does not prove end-to-end behavior.

## OPS-001 — Most workspace content is outside Git
- Status: resolved by root repository setup for the authorized version split.
- Root `v2` tracks frontend/backend/deployment/wiki/memory together; original frontend Git metadata was backed up outside the workspace. See root README for branch/tag roles.

## Verification limits
- Docker Compose configuration validation does not prove images build or containers run.
- No browser interaction, deployed HTTP smoke test, external hosting, or dependency vulnerability audit was performed.
- Secrets and environment-file contents were not inspected.
