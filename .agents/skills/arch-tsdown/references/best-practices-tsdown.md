---
name: best-practices-tsdown
description: Recommended tsdown and package practices for arch-tsdown libraries
---

# Best Practices for arch-tsdown

When building or modifying a library based on this starter, follow these practices.

## Build and Package

1. **Prefer pure ESM**  
   Build ESM-only; avoid CJS unless you have a concrete need. The starter’s default is ESM.

2. **Always enable `dts`**  
   Set `dts: true` in `tsdown.config.ts` so consumers get TypeScript types from `.d.mts` (or `.d.ts`) files.

3. **Use tsdown’s `exports` option**  
   Set `exports: true` so tsdown can generate or validate `package.json` exports and keep them in sync with build output.

4. **Set `sideEffects: false`**  
   In `package.json`, add `sideEffects: false` when your library has no side effects. This enables tree-shaking for consumers.

## Tooling Alignment

- **ESLint:** Use `type: 'lib'` and `pnpm: true` in eslint.config.js so rules match a library + pnpm workspace.
- **TypeScript:** Keep `noEmit: true` in tsconfig; tsdown handles emit. Use strict options (e.g. `strict`, `strictNullChecks`, `verbatimModuleSyntax`) for library code.
- **Tests:** Use Vitest; for testing the built package, use `vitest-package-exports` (or similar) so imports resolve to `dist/`.

## Release

- Prefer **npm Trusted Publisher** and CI-based publish so you don’t run `pnpm publish` from your machine after the first setup.
- Run `publint` (via tsdown’s `publint: true`) and fix export/type issues before releasing.

<!--
Source references:
- instructions/tsdown.md
- https://github.com/antfu/starter-ts
-->
