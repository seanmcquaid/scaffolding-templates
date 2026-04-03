# React Router v7 SSR Template

## Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
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

- **Loaders vs TanStack Query** — use loaders (`useLoaderData`) for initial server-rendered page data; use TanStack Query for client-side mutations and re-fetching after initial load; don't use both for the same data
- **MSW limitation** — MSW cannot intercept server-side loader requests; integration tests that exercise SSR loaders need the MSW server running alongside the app
- **Route type generation** — after adding or renaming routes, run `pnpm build` to regenerate route types; skipping causes TypeScript errors
- **Environment variables** — validated with Zod in `app/env.server.ts`; update both `.env.example` and the schema when adding new vars
- **i18n** — all user-facing text must use `useAppTranslation()`; translation files are in `app/i18n/locales/`
- **Import paths** — use the `@/` alias (maps to `app/`), not `../../` relative paths
- **Package manager** — use `pnpm` only
