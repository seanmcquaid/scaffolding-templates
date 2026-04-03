# TanStack Router SPA Template

## Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
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
- **Route code generation** — do not manually edit `routeTree.gen.ts`; it is auto-generated during `pnpm dev` or `pnpm build`
- **Type-safe search params** — always use `Route.useSearch()` with a Zod schema; never access search params directly via browser APIs
- **i18n** — all user-facing text must use `useAppTranslation()`; translation files are in `src/i18n/locales/`
- **Import paths** — use the `@/` alias (maps to `src/`), not `../../` relative paths
- **Package manager** — use `pnpm` only
