# React Router v7 SSR Template - Agent Instructions

The role of this file is to describe common mistakes and confusion points that agents might encounter as they work in this project. If you ever encounter something like this in the project, please alert the developer working with you and indicate this is the case in the AGENTS.md file to help prevent future agents from having the same issue.

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

# Type checking
pnpm typecheck

# Run Playwright E2E tests
pnpm playwright:run-e2e

# Run Playwright integration tests
pnpm playwright:run-integration
```

## Common Mistakes and Confusion Points

### 1. Route Type Generation
- This project uses `react-router typegen` to generate type-safe route parameters. After adding or renaming routes, run `pnpm build` (which runs `react-router typegen` first) to regenerate types. Skipping this causes TypeScript errors about missing or incorrect route param types.

### 2. MSW and Server-Side Requests
- MSW (Mock Service Worker) cannot intercept server-side fetch calls (inside loaders/actions). For integration tests that exercise SSR loaders, the MSW server must be running separately. This is a known limitation — alert the developer if tests relying on mocked server-side data are unexpectedly failing.

### 3. Loaders vs Client Data Fetching
- Data fetching in this template uses React Router **loaders** (server-side) for initial page data. Do not use TanStack Query for data that should be server-rendered — use `useLoaderData()` instead. TanStack Query is for client-side mutations and re-fetching after the initial load.

### 4. Hardcoded Strings / Missing Translations
- All user-facing text **must** use the `useAppTranslation()` hook with i18n keys. ESLint enforces this with `i18next/no-literal-string`. Adding any string literal in JSX will fail linting.
- Translation files are in `app/i18n/locales/`. Always add new keys there when adding new text.

### 5. Import Paths
- Use the `@/` alias (maps to `app/`) — not relative paths like `../../components`. Relative paths beyond the same directory break the established conventions.

### 6. Package Manager
- Use **`pnpm`** only. Do not use `npm install` or `yarn add`.

### 7. Environment Variables
- Environment variables are validated with Zod in `app/env.server.ts`. If adding new env vars, update both the `.env.example` file and the Zod schema.
