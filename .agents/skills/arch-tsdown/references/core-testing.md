---
name: core-testing
description: Vitest setup, vitest-package-exports, and export snapshot pattern
---

# Testing

## Layout

- **test/** — Vitest tests (e.g. `index.test.ts`, `exports.test.ts`).
- Vitest is configured in **vitest.config.ts** with `vitest-package-exports` inlined for package-export resolution.

## Unit tests

Plain Vitest describe/it; import from source or from package exports depending on what you want to test:

```ts
// test/index.test.ts
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('exported', () => {
    expect(1).toEqual(1)
  })
})
```

## Export snapshot (package exports)

The starter can include an **exports snapshot** test that checks package exports (via **vitest-package-exports** and **tinyexec**). Pattern:

```ts
// test/exports.test.ts
import { x } from 'tinyexec'
import { describe, expect, it } from 'vitest'
import { getPackageExportsManifest } from 'vitest-package-exports'
import yaml from 'yaml'

const IS_READY = false

describe.runIf(IS_READY)('exports-snapshot', async () => {
  const packages = JSON.parse(
    await x('pnpm', ['ls', '--only-projects', '-r', '--json']).then(r => r.stdout),
  )

  for (const pkg of packages) {
    if (pkg.private) continue
    it(`${pkg.name}`, async () => {
      const manifest = await getPackageExportsManifest({
        importMode: 'src',
        cwd: pkg.path,
      })
      await expect(yaml.stringify(manifest.exports))
        .toMatchFileSnapshot(`./exports/${pkg.name}.yaml`)
    })
  }
})
```

- **describe.runIf(IS_READY)** — Toggle to `true` when you want to enable export snapshots (e.g. before first release).
- **getPackageExportsManifest** — Builds manifest of package exports; snapshot under `test/exports/<pkg.name>.yaml`.
- **importMode: 'src'** — Resolve from source; use another mode if you want to assert on built output.

## Running tests

- **nr test** — Run once.
- **nr test --watch** — Watch mode (if supported by Vitest).
- CI runs **nr build** then **nr test** so tests that depend on built output see `dist/`.

<!--
Source references:
- https://github.com/antfu/starter-ts
-->
