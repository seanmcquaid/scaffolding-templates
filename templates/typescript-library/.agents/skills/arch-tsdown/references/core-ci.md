---
name: core-ci
description: GitHub Actions CI — lint, typecheck, test matrix
---

# CI Workflow

The starter uses a single **CI** workflow (`.github/workflows/ci.yml`) on push/PR to `main`.

## Jobs

### 1. lint

- **Trigger:** push / pull_request to `main`
- **Steps:**
  - Checkout, pnpm setup (no install), Node LTS
  - `pnpm i -g @antfu/ni` then **nci** (install deps)
  - **nr lint** — ESLint
  - **nr typecheck** — TypeScript (`tsc`)

### 2. test

- **Trigger:** same as lint
- **Matrix:** `node: [lts/*]`, `os: [ubuntu-latest, windows-latest, macos-latest]`, `fail-fast: false`
- **Steps:**
  - Checkout, pnpm, Node from matrix
  - **nci** — install
  - **nr build** — tsdown build (required before testing built output)
  - **nr test** — Vitest

## Commands Used

| Command | Purpose |
|--------|--------|
| **nci** | Install dependencies (via @antfu/ni; respects lockfile). |
| **nr** | Run package scripts (e.g. `nr lint`, `nr build`). |

## Release (separate workflow)

Release is **not** in the CI workflow. It runs on **tag push** (e.g. `v*`) via `.github/workflows/release.yml` and uses `sxzz/workflows` with `publish: true` to publish to npm. See [core-scripts](core-scripts.md) and [core-release](core-release.md) for the release flow.

## Template

A ready-to-use workflow is in **assets/ci.yml**. Copy it to `.github/workflows/ci.yml` in your repo.

<!--
Source references:
- https://github.com/antfu/starter-ts
-->
