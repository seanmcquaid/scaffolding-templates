---
name: core-release
description: Release workflow — bumpp, tag push, sxzz/workflows, npm Trusted Publisher
---

# Release Workflow

The starter uses a separate **Release** workflow (`.github/workflows/release.yml`) that runs on tag push. It delegates to [sxzz/workflows](https://github.com/sxzz/workflows) for npm publish.

## Workflow Definition

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    uses: sxzz/workflows/.github/workflows/release.yml@v1
    with:
      publish: true
    permissions:
      contents: write
      id-token: write
```

## Flow

1. **Local:** Run `pnpm run release` → [bumpp](https://github.com/antfu/bumpp) bumps version in `package.json` and prompts for tag.
2. **Tag:** Bumpp creates a git tag (e.g. `v1.2.3`) and pushes it.
3. **CI:** Push of tag matching `v*` triggers the Release workflow.
4. **Publish:** sxzz/workflows handles npm publish using OIDC (npm Trusted Publisher); requires `id-token: write` and `contents: write`.

## Permissions

| Permission | Purpose |
|------------|---------|
| `contents: write` | Create GitHub Release notes (if configured). |
| `id-token: write` | OIDC token for npm Trusted Publisher auth. |

## npm Trusted Publisher Setup

Before the first CI-based release:

1. Run `pnpm publish` manually **once** to create the package on npm.
2. In npm: open `https://www.npmjs.com/package/<package-name>/access`.
3. Connect the package to your GitHub repo (Trusted Publisher).

After that, all future releases go through CI; you never run `pnpm publish` locally again.

## Relation to CI

The **CI** workflow (lint, typecheck, test) runs on push/PR. The **Release** workflow runs only on tag push. See [core-scripts](core-scripts.md) for the full release flow and [core-ci](core-ci.md) for CI.

<!--
Source references:
- https://github.com/antfu/starter-ts
- https://github.com/sxzz/workflows
- .github/workflows/release.yml
-->
