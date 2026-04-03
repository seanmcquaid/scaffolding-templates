---
name: core-scripts
description: npm scripts and release workflow — build, dev, release, npm Trusted Publisher
---

# Scripts and Release Workflow

## Scripts (package.json)

| Script          | Command        | Purpose |
|-----------------|----------------|---------|
| `build`         | `tsdown`       | One-off build to `dist/`. |
| `dev`           | `tsdown --watch` | Watch mode; rebuild on file changes. |
| `start`         | `tsx src/index.ts` | Run source directly without building (via tsx). |
| `typecheck`     | `tsc`          | Type-check only (tsconfig has `noEmit: true`). |
| `test`          | `vitest`       | Run tests (can use vitest-package-exports for dist tests). |
| `lint`          | `eslint`       | Lint with @antfu/eslint-config. |
| `release`       | `bumpp`        | Bump version and (typically) create tag for CI release. |
| `prepublishOnly`| `nr build`     | Build before `pnpm publish`. |

## npm Trusted Publisher (Recommended)

The starter recommends **npm Trusted Publisher** so publishing is done in CI, not from local `pnpm publish`.

1. **First time only:** Run `pnpm publish` manually once to create the package on npm.
2. In npm: open `https://www.npmjs.com/package/<your-package-name>/access` and connect the package to your GitHub repo (Trusted Publisher).
3. **Later releases:** Run `pnpm run release` locally. Bumpp bumps version and creates a tag (e.g. `v*`); the **Release** GitHub Action runs on tag push and publishes to npm.

## Release Workflow Summary

1. Developer runs `pnpm run release` → version bump + git tag.
2. Push tag → GitHub Actions runs `sxzz/workflows` release workflow with `publish: true`.
3. CI publishes to npm; no need to run `pnpm publish` on your machine again.

See [core-release](core-release.md) for the Release workflow details.

## Hooks

- **prepare** — Runs after `pnpm install`; installs git hooks via simple-git-hooks.
- **simple-git-hooks** runs `pre-commit`: install + `lint-staged` (e.g. `eslint --fix` on staged files).

<!--
Source references:
- https://github.com/antfu/starter-ts
- https://github.com/e18e/ecosystem-issues/issues/201
-->
