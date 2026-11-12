# Documentation maintenance and search

## Before implementation
1. Read root AGENTS.md and `.codex-memory/INDEX.md` + `CURRENT_STATE.md`.
2. Open [wiki index](../index.md) and [code index](../code-index/index.md); choose only relevant shards/specs.
3. Read nested instructions, inspect owning Git status/recent history, then verify indexed paths and symbols with `rg` and targeted source reads.
4. If evidence contradicts the index, inspect the smallest affected subsystem and repair its map. Broaden to a repository inventory only if narrower discovery cannot resolve missing/stale structure.
5. Explain the proposed changes and file responsibilities before substantial implementation.

From the workspace root, for example:

```sh
rg -n -i 'health|shutdown' wiki/code-index wiki/spec
rg -n 'NewRouter|RegisterRoutes|getHealth' backend/internal
rg --files frontend/src/features/home
git status --short
git log -3 --oneline
```

First search finds a small map; second verifies actual symbols. A matching filename alone does not verify behavior. Git history on `v2` covers the whole workspace application and documentation. The earlier standalone frontend Git metadata was backed up outside the workspace during migration.

## After significant changes

| Change | Update |
|---|---|
| Files, public exports, entrypoints, boundaries or tests move/change | Affected code-index shard |
| Behavior or architecture changes | Relevant `wiki/spec/` document |
| Wiki document/shard is added, moved or removed | Parent index; wiki index for entrypoints/specs/plans/runbooks |
| Implementation sequence/acceptance changes | Relevant `wiki/plan/` document |
| Any code/wiki changes | Append a concise entry to `wiki/log.md` |
| Meaningful task outcome | Relevant memory/current state/history, including checks and unfinished work |

Split a shard when unrelated concerns make navigation difficult. Keep maps about where to read, specs about behavior, plans about intended work, and memory about task state. Link instead of duplicating detailed facts. Record dates, evidence and uncertainty; never label planned behavior as implemented.

For documentation-only work, check local Markdown links, indexed path/symbol existence, navigation completeness and source preservation. For code/configuration changes, run applicable [checks](development.md). Record failures or unavailable gates, and distinguish previous results from checks run now.

Do not scan secrets, environment files, sessions, caches, build output, Git internals, third-party collections or historical logs by default. Read only the recent tail of `wiki/log.md`. Optional generated helpers belong in `.agent-index/`, excluding these artifacts and generated mega-indexes; they never replace source verification. No generated index is needed for this small scaffold.
