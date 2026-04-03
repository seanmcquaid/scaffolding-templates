---
name: core-tooling
description: ESLint, TypeScript, and Vitest config in arch-tsdown
---

# Tooling Configuration

## ESLint

Uses **@antfu/eslint-config** with library and pnpm presets:

```js
// eslint.config.js
// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
  },
)
```

- **type: 'lib'** — rules tuned for library code (not an app).
- **pnpm: true** — pnpm-aware resolution and workspace support.

## TypeScript (tsconfig.json)

The starter uses **noEmit**; tsdown handles build output. tsconfig is for type-checking and editor support:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "strict": true,
    "strictNullChecks": true,
    "noEmit": true,
    "esModuleInterop": true,
    "verbatimModuleSyntax": true,
    "skipDefaultLibCheck": true,
    "skipLibCheck": true
  }
}
```

| Option | Purpose |
|--------|--------|
| `noEmit` | No JS output from tsc; tsdown emits. |
| `moduleResolution: "Bundler"` | Matches tsdown/bundler resolution. |
| `verbatimModuleSyntax` | Enforces explicit `type` imports. |

Run typecheck with `nr typecheck` (runs `tsc`).

## Vitest

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: ['vitest-package-exports'],
      },
    },
  },
})
```

- **vitest-package-exports** is inlined so tests can resolve package exports (e.g. importing from the built `dist/` or from source). Use when testing the published API surface.

Run tests with `nr test`.

<!--
Source references:
- https://github.com/antfu/starter-ts
-->
