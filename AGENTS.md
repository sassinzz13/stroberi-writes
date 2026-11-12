# Project Agent Instructions

Follow the global engineering and teaching instructions. Always explain significant changes, why they are needed, how they work, and how to verify them.

## Memory-first workflow
1. Read `.codex-memory/INDEX.md` and `.codex-memory/CURRENT_STATE.md` at session start.
2. Read only the relevant linked memory files for the user's request.
3. Read `wiki/index.md` and `wiki/code-index/index.md`, then only relevant shards/specs. `.codex-memory/CODEBASE_MAP.md` is a compatibility entrypoint. Verify relevant files/symbols and current Git state before editing; never trust an index blindly.
4. Avoid full-repository rescans when a current map and targeted inspection suffice. If the map is missing, stale, or contradictory, inspect enough code to repair it.
5. Before changing code, summarize the plan and relevant files for substantial tasks. Ask clarification when necessary.
6. After meaningful changes, update the relevant memory files in the same task, including requested behavior, actual edits, decisions, tests, and outstanding work.
7. Do not record a request as completed until implemented and verified. Mark untested work explicitly.
8. Never store credentials, secrets, tokens, private keys, or sensitive user data in memory files.
9. Keep entries short, factual, and navigable. Prefer replacing stale summaries over endlessly appending duplicate text.
10. Do not run destructive commands or rewrite history without explicit approval.

## Memory freshness
- Check `git status --short` and relevant recent history where appropriate.
- Use file paths, symbol names, and links to commits as navigation hints, not proof that code still matches.
- If a file is moved or removed, repair its map entry.
- If another contributor changed the code, reconcile memory with current source before acting.

## Teaching
Always explain WHAT changed, WHY it matters, HOW it works internally, and HOW to test it. Keep language beginner-friendly and technically accurate. For small tasks, be concise.

## Persistent wiki protocol (mapwrite)
- Follow `wiki/runbooks/documentation.md` for targeted discovery and freshness checks. Read applicable nested AGENTS.md before editing.
- `wiki/index.md` maps knowledge documents; `wiki/code-index/index.md` and nested shards locate code; `wiki/spec/` owns behavior/architecture; `wiki/plan/` owns intended sequences and acceptance criteria. Memory owns task outcomes and outstanding work. Link across these instead of duplicating details.
- After significant changes, update affected shards/specs/plans and their parent indexes, append `wiki/log.md`, and update relevant memory in the same task. Read only recent log entries unless history is needed.
- Run applicable checks from `wiki/runbooks/development.md` for source/configuration changes. Documentation-only changes require local link/path/symbol verification and source-preservation checks. Record actual results and unavailable checks; do not imply historical checks ran again.
- Never scan the full repository by default. Expand only when targeted inspection cannot resolve missing, stale or contradictory maps. Exclude secrets/environment files, sessions, dependencies, caches, generated outputs and third-party reference collections from routine indexing.
- One repository at the workspace root tracks frontend, backend, deployment, wiki and memory on `v2`. Check root Git status and preserve user changes. `v1` and `v1.0.0` preserve the previous application; `main` remains unchanged. Do not rewrite history implicitly.
