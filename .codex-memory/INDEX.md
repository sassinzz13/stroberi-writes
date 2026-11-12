# Memory Index

Initialized: 2026-11-12 (Asia/Manila). Source-backed workspace snapshot; see CURRENT_STATE.md for verification limits.

## Start here
1. Read project `AGENTS.md` and this index, then [CURRENT_STATE.md](CURRENT_STATE.md).
2. Read [wiki index](../wiki/index.md) and [layered code index](../wiki/code-index/index.md); select only relevant shards, specs, memory, source and direct dependencies. CODEBASE_MAP.md remains a compatibility link.
3. Check Git state at the workspace root; `v2` tracks frontend, backend, deployment and documentation together. Read any applicable nested AGENTS.md.
4. Treat memory as navigation, not proof. Broaden inspection only when missing, stale, or contradictory evidence requires it.
5. After significant work, update affected memory and task history with the request, changes, rationale, actual checks, and unfinished work. Never record secrets or claim untested work is verified.

| File | Purpose |
|---|---|
| [CURRENT_STATE.md](CURRENT_STATE.md) | Latest outcome, working-tree baseline, verification, next steps |
| [CODEBASE_MAP.md](CODEBASE_MAP.md) | Compatibility link to canonical layered wiki code index |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Compatibility link to canonical wiki architecture spec |
| [DECISIONS.md](DECISIONS.md) | Explicit workflow decisions and source-observed design conventions |
| [TASK_HISTORY.md](TASK_HISTORY.md) | Requests, outcomes, reasons, tests, outstanding work |
| [KNOWN_ISSUES.md](KNOWN_ISSUES.md) | Verified mismatches and clearly labeled implementation gaps |

Scope: application source, manifests/lockfile version metadata, project instructions, README files, deployment configuration. Excluded from content analysis: dependencies, generated/build outputs, secrets/environment files, Git internals, third-party skill collections, and binary design assets. `skills/` and `third-party/` are tooling/reference material, not application features.
