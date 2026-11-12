# Shared code

Place code used across features here. Add directories when there is code to share:

- `ui/`: domain-independent components, such as buttons and dialogs.
- `lib/`: common utilities and HTTP transport helpers.
- `hooks/`: reusable React hooks.
- `types/`: types shared across domains.
- `config/`: common configuration.

Shared code must not import from `features/` or `app/`. Keep domain-specific
components, API calls, hooks, and types inside their owning feature. Avoid moving
code here solely because it might be reusable later.
