---
name: core-tsdown-config
description: tsdown config in arch-tsdown — entry, dts, exports, publint
---

# tsdown Config in arch-tsdown

The starter uses a single `tsdown.config.ts` with options tuned for a modern TypeScript library.

## Example Config

```ts
// tsdown.config.ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  dts: true,
  exports: true,
  publint: true,
})
```

## Options Used

| Option   | Purpose |
|----------|--------|
| `entry`  | Source entry file(s). Use array for multiple entries. |
| `dts`    | Generate `.d.ts` declaration files. **Always enable** for libraries. |
| `exports`| Let tsdown generate/validate `package.json` `exports` from build output. |
| `publint`| Run [publint](https://publint.dev/) to validate package exports and types. |

## Multiple Entries

```ts
export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli.ts',
  ],
  dts: true,
  exports: true,
  publint: true,
})
```

## Config File Location

tsdown resolves `tsdown.config.ts` (or `.mts`/`.js`/`.mjs`/`.json`) from the project root. No extra CLI flags needed for default path.

For full tsdown options (format, platform, plugins, etc.), refer to the **tsdown** skill or [tsdown docs](https://tsdown.dev).

<!--
Source references:
- https://github.com/antfu/starter-ts
- https://tsdown.dev
-->
