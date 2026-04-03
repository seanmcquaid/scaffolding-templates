---
name: core-pnpm-workspace
description: pnpm workspace, catalogs, and version management in arch-tsdown
---

# pnpm Workspace and Catalogs

The starter uses **pnpm** with workspace and **catalogs** for centralized version management.

## pnpm-workspace.yaml

```yaml
catalogMode: prefer
ignoreWorkspaceRootCheck: true
shellEmulator: true
trustPolicy: no-downgrade

packages:
  - playground
  - docs
  - packages/*
  - examples/*

catalogs:
  cli:
    '@antfu/eslint-config': ^6.6.1
    '@antfu/ni': ^28.0.0
    bumpp: ^10.3.2
    eslint: ^9.39.2
    lint-staged: ^16.2.7
    publint: ^0.3.16
    simple-git-hooks: ^2.13.1
    tsdown: ^0.17.3
    tsx: ^4.21.0
    typescript: ^5.9.3
    vite: ^7.2.7
  inlined:
    '@antfu/utils': ^9.3.0
  testing:
    tinyexec: ^1.0.2
    vitest: ^4.0.15
    vitest-package-exports: ^0.1.1
    yaml: ^2.8.2
  types:
    '@types/node': ^25.0.1

onlyBuiltDependencies:
  - esbuild
  - simple-git-hooks
```

## Catalogs

Catalogs group dependencies by purpose. Use `catalog:<name>` in `package.json` to reference them:

```json
{
  "devDependencies": {
    "@antfu/eslint-config": "catalog:cli",
    "@antfu/ni": "catalog:cli",
    "bumpp": "catalog:cli",
    "tsdown": "catalog:cli",
    "vitest": "catalog:testing",
    "vitest-package-exports": "catalog:testing",
    "@types/node": "catalog:types"
  }
}
```

| Catalog | Purpose |
|---------|---------|
| `cli` | CLI/build tooling (eslint, tsdown, bumpp, etc.) |
| `inlined` | Inlined deps (e.g. @antfu/utils) |
| `testing` | Test deps (vitest, tinyexec, yaml) |
| `types` | Type definitions (@types/node) |

## Options

| Option | Purpose |
|--------|---------|
| `catalogMode: prefer` | Use catalog versions when available. |
| `ignoreWorkspaceRootCheck: true` | Allow scripts in workspace root. |
| `shellEmulator: true` | Cross-platform shell emulation for scripts. |
| `trustPolicy: no-downgrade` | Don’t downgrade dependencies on install. |
| `onlyBuiltDependencies` | Limit build to esbuild and simple-git-hooks. |

## Workspace Packages

The `packages` array lists workspace roots. For a **single-package** starter, `playground`, `docs`, `packages/*`, `examples/*` may be placeholders. Remove or add roots as needed when converting to a monorepo.

## Usage for Agents

When scaffolding or adding dependencies:

1. Prefer catalog references: `"package": "catalog:cli"` instead of version strings.
2. Add new deps to the appropriate catalog in `pnpm-workspace.yaml`, then reference with `catalog:<name>`.
3. Run `pnpm install` to sync lockfile after catalog changes.

<!--
Source references:
- https://github.com/antfu/starter-ts
- pnpm-workspace.yaml
- https://pnpm.io/catalogs
-->
