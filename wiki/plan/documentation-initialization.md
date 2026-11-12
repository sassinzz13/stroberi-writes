# Persistent documentation initialization

Date: 2026-11-12. Scope: documentation and project agent workflow only.

Sequence:
1. Read existing memory/instructions; verify mapped application source and Git boundary.
2. Establish wiki/specs/runbooks and layered frontend/backend/deployment/test navigation.
3. Replace duplicate memory maps/architecture with compatibility links; update AGENTS.md.
4. Validate links, indexed paths/symbols, search and source preservation; record results.

Decisions: plain Markdown plus `rg` provides searchable, editor-readable documentation without a new dependency or generated index. Narrow maps reduce repeated discovery; separate specs prevent maps becoming large behavior documents. Memory retains task chronology so architecture has one detailed owner. Existing application architecture is documented, not redesigned.

Acceptance criteria: wiki and subsystem entrypoints are reachable; current features and gaps match source; old memory entrypoints still work; agent instructions require targeted verification and ongoing updates; checks and limitations are recorded. Completion evidence is in [log](../log.md).

Out of scope: product features, repository initialization, hosting, new application tests and global Codex configuration. Root documentation remains locally persistent but outside frontend Git history.
