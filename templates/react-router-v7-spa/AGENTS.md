# React Router v7 SPA Template

## Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Serve production build
pnpm start

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

# Run Playwright E2E tests
pnpm playwright:run-e2e

# Run Playwright integration tests
pnpm playwright:run-integration
```

## Project Notes

- **Client-only SPA** — no server-side rendering; do not add server-only code or Node.js APIs
- **Route type generation** — after adding or renaming routes, run `pnpm build` to regenerate type-safe route params; skipping causes TypeScript errors
- **Production start** — `pnpm start` serves the static build from `build/client/`; run `pnpm build` first
- **i18n** — all user-facing text must use `useAppTranslation()`; translation files are in `app/i18n/locales/`
- **Import paths** — use the `@/` alias (maps to `app/`), not `../../` relative paths
- **Package manager** — use `pnpm` only
