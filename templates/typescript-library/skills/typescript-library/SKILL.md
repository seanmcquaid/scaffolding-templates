---
name: typescript-library
description: Expert guidance for building, testing, and publishing TypeScript libraries using tsdown, Vitest, Changesets, and modern tooling. Activate when creating or maintaining a TypeScript library built from this template.
---

# TypeScript Library

Production-ready guidance for TypeScript library development with dual package support, comprehensive testing, and automated publishing.

## Technology Stack

- **TypeScript 5.8+**: Strict type-safe development
- **tsdown**: Fast bundler for ESM and CommonJS output with declaration files
- **Vitest**: Unit testing with coverage and circular dependency detection
- **ESLint + Prettier**: Linting and formatting via pre-commit hooks (Husky + lint-staged)
- **Changesets**: Semver versioning and changelog management
- **agadoo**: Tree-shaking validation
- **bundlesize**: Bundle size budget enforcement
- **@arethetypeswrong/cli**: Package export correctness validation

## Project Structure

```
src/
├── index.ts              # Public API — re-export only what consumers need
└── <feature>/
    ├── index.ts          # Feature exports
    └── <feature>.test.ts # Co-located unit tests
skills/
└── typescript-library/
    └── SKILL.md          # Agent skill shipped with the package
```

## Adding a New Export

1. Create `src/<feature>/index.ts` with your implementation and exported types.
2. Re-export from `src/index.ts`:
   ```typescript
   export * from './<feature>';
   ```
3. Co-locate tests in `src/<feature>/<feature>.test.ts`.

✅ Named exports only — no default exports.
✅ Export all public types alongside their implementations.
✅ Keep `"sideEffects": false` in `package.json` to enable tree-shaking.

## Testing

```bash
pnpm test           # Run all tests once
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Generate Istanbul coverage report
```

Tests must pass before any commit (enforced by lint-staged). Circular dependency detection runs automatically as part of the test suite.

## Code Quality

```bash
pnpm lint        # ESLint with zero warnings tolerance
pnpm lint:fix    # Auto-fix lint issues
```

## Build & Validation

```bash
pnpm build              # Compile ESM output with type declarations via tsdown
pnpm check-types        # Validate package exports with @arethetypeswrong/cli
pnpm check-treeshaking  # Verify the bundle is tree-shakeable with agadoo
pnpm bundlesize         # Check bundle size against the 10 kB budget
```

## Publishing

```bash
pnpm changeset    # Create a changeset describing your change (patch/minor/major)
pnpm release      # Build and publish to npm via Changesets
```

Always create a changeset before merging — automated GitHub Actions CI handles the actual publish step.

## Agent Skills (TanStack Intent)

This library ships skills alongside the package so AI agents always have up-to-date guidance.

```bash
pnpm intent:validate  # Validate all SKILL.md files in the skills/ directory
pnpm intent:stale     # Check for skills whose source docs have changed
```

To add a new skill for your library:
1. Create a new `SKILL.md` in the `skills/` directory.
2. Run `pnpm intent:validate` to confirm the file is valid.
3. Publish — skills travel with `npm update` automatically.

## Common Mistakes

- **Barrel re-exports (`export * from '...'`)** can prevent tree-shaking. Prefer explicit named re-exports.
- **Missing type exports** — always export types alongside their runtime counterparts.
- **Skipping `pnpm check-types`** before a release can introduce broken package exports for consumers.
- **No changeset** — the CI publish step requires at least one changeset entry to bump the version.
