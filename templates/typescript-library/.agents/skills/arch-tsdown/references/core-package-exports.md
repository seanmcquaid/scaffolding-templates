---
name: core-package-exports
description: package.json exports, dist output, and types in arch-tsdown
---

# Package Exports and Output

## Exports in package.json

With tsdown’s `exports: true`, the build writes ESM and types; the starter’s `package.json` typically looks like:

```json
{
  "sideEffects": false,
  "exports": {
    ".": "./dist/index.mjs",
    "./package.json": "./package.json"
  },
  "main": "./dist/index.mjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.mts",
  "files": ["dist"]
}
```

- **sideEffects: false** — Declares no side effects; enables tree-shaking for consumers.
- **Consumers** resolve the package root to `dist/index.mjs` (ESM) and types to `dist/index.d.mts`.
- **files** ensures only `dist/` is published.

## Output Layout

- Default output directory: **dist/**
- ESM: `dist/index.mjs` (or one file per entry).
- Declarations: `dist/index.d.mts` (or per-entry `.d.mts`).

## Adding More Entries

When you add entries in `tsdown.config.ts`, either:

- Rely on **exports: true** so tsdown suggests/validates exports, and keep `package.json` in sync, or
- Manually add conditional exports, e.g.:

```json
{
  "exports": {
    ".": "./dist/index.mjs",
    "./cli": "./dist/cli.mjs",
    "./package.json": "./package.json"
  }
}
```

Use **publint** (via tsdown’s `publint: true`) to catch export/type issues before publish.

<!--
Source references:
- https://github.com/antfu/starter-ts
- https://tsdown.dev
-->
