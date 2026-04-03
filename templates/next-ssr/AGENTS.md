# Next.js SSR Template

## Commands

```bash
# Install dependencies
pnpm install

# Start development server (with Turbopack)
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

- **Server Components by default** — use `"use client"` only when the component needs interactivity (event handlers, `useState`, `useEffect`)
- **MSW limitation** — MSW cannot intercept server-side `fetch` calls; integration tests for SSR routes require the MSW server running alongside the app
- **Environment variables** — client-side vars must be prefixed with `NEXT_PUBLIC_`; server-side vars are validated with Zod in `src/env.server.ts`
- **i18n** — all user-facing text must use `useAppTranslation()`; ESLint enforces this via `i18next/no-literal-string`
- **Import paths** — use the `@/` alias (maps to `src/`), not `../../` relative paths
- **Package manager** — use `pnpm` only
