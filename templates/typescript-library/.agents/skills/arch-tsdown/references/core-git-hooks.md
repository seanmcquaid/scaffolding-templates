---
name: core-git-hooks
description: simple-git-hooks and lint-staged in arch-tsdown
---

# Git Hooks

The starter uses **simple-git-hooks** and **lint-staged** for pre-commit checks.

## package.json

```json
{
  "scripts": {
    "prepare": "simple-git-hooks"
  },
  "simple-git-hooks": {
    "pre-commit": "pnpm i --frozen-lockfile --ignore-scripts --offline && npx lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

## Behavior

1. **prepare** — Runs after `pnpm install`; installs git hooks via simple-git-hooks.
2. **pre-commit** — On commit:
   - Runs `pnpm i --frozen-lockfile --ignore-scripts --offline` to ensure lockfile is in sync (optional guard).
   - Runs **lint-staged**: on all staged files (`*`), runs `eslint --fix`.

## Customizing lint-staged

Restrict to specific file types or add more commands:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": "eslint --fix",
    "*.{ts,tsx,js,jsx,mjs,cjs}": "nr typecheck"
  }
}
```

Avoid running full `nr typecheck` on every commit if it is slow; prefer CI for that.

## Disabling

To bypass hooks once: `git commit --no-verify`. Do not make this the default.

<!--
Source references:
- https://github.com/antfu/starter-ts
-->
