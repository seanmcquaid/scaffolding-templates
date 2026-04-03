# TypeScript Library Template

## Commands

```bash
# Install dependencies
pnpm install

# Build the library (generates dist/)
pnpm build

# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run linting
pnpm lint

# Fix lint errors
pnpm lint:fix

# Check bundle size
pnpm bundlesize

# Check tree-shaking
pnpm check-treeshaking

# Check package exports and types
pnpm check-types
```

## Project Notes

- **No React, no browser APIs** — this is a framework-agnostic TypeScript library; keep dependencies minimal
- **`dist/` is generated** — never edit or commit it; it is in `.gitignore`
- **Dual ESM/CJS exports** — when adding entry points, update the `exports` field in `package.json` for both formats; run `pnpm check-types` and `pnpm check-treeshaking` to verify
- **Versioning via Changesets** — never manually edit the `version` field in `package.json`; run `pnpm changeset` and let CI handle the version bump and publish
- **Package manager** — use `pnpm` only
