---
name: core-overview
description: arch-tsdown (starter-ts) project purpose, structure, and when to use it
---

# arch-tsdown Overview

arch-tsdown is a TypeScript library starter template (based on [antfu/starter-ts](https://github.com/antfu/starter-ts)) that uses **tsdown** for building. Use this skill when scaffolding or maintaining a pure TypeScript/ESM library with minimal config.

## What It Is

- A **starter** for publishing TypeScript libraries to npm
- Build pipeline: **tsdown** (Rolldown-based) for bundling and `.d.ts` generation
- Tooling: ESLint (@antfu/eslint-config), Vitest, TypeScript (noEmit), pnpm

## Project Structure

```
.
├── src/
│   └── index.ts          # Library entry
├── dist/                 # Build output (gitignored)
├── test/                 # Vitest tests
├── tsdown.config.ts      # tsdown build config
├── tsconfig.json         # TypeScript (noEmit, for typecheck only)
├── vitest.config.ts      # Vitest config (e.g. package-exports testing)
├── eslint.config.js      # ESLint (type: 'lib', pnpm: true)
├── pnpm-workspace.yaml   # Workspace + catalogs for version management
├── package.json          # Exports point to dist/
└── .github/workflows/    # CI + Release workflows
```

## When to Use

- Starting a new **library** (not an app) that will be published to npm
- You want **ESM-only** output, `.d.ts` generation, and tsdown’s defaults
- You prefer **pnpm**, **Vitest**, and **@antfu/eslint-config**

## Key Conventions

- **Entry:** `src/index.ts` (or multiple entries in `tsdown.config.ts`)
- **Output:** `dist/` (e.g. `dist/index.mjs`, `dist/index.d.mts`)
- **Exports:** Use tsdown’s `exports: true` so it can generate `package.json` exports from config

<!--
Source references:
- https://github.com/antfu/starter-ts
-->
