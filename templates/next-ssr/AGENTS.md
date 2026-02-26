# Next.js SSR Template - Agent Instructions

The role of this file is to describe common mistakes and confusion points that agents might encounter as they work in this project. If you ever encounter something like this in the project, please alert the developer working with you and indicate this is the case in the AGENTS.md file to help prevent future agents from having the same issue.

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

# Type checking
pnpm typecheck

# Run Playwright E2E tests
pnpm playwright:run-e2e

# Run Playwright integration tests
pnpm playwright:run-integration
```

## Common Mistakes and Confusion Points

### 1. Server Components vs Client Components
- Default to **server components**. Only add `"use client"` when the component needs interactivity (event handlers, browser APIs, hooks like `useState`/`useEffect`).
- Mixing server and client component concerns (e.g., trying to use `useState` in a server component) is a common error. The compiler error message can be confusing — check whether `"use client"` is needed.

### 2. Hardcoded Strings / Missing Translations
- All user-facing text **must** use the `useAppTranslation()` hook with i18n keys. ESLint enforces this with `i18next/no-literal-string`. Adding any string literal in JSX will fail linting.
- Translation files are in `src/i18n/locales/`. Always add new keys there when adding new text.

### 3. TanStack Query on the Server
- TanStack Query is set up for client-side caching. For initial server-side data fetching, use Next.js `fetch()` inside server components directly, not `useQuery`.
- MSW (Mock Service Worker) cannot intercept server-side `fetch` calls in tests — use mocked modules or test utilities for server-side data fetching logic.

### 4. Import Paths
- Use the `@/` alias (maps to `src/`) — not relative paths like `../../components`. Relative paths beyond the same directory break the established conventions.

### 5. Package Manager
- Use **`pnpm`** only. Do not use `npm install` or `yarn add`.

### 6. Environment Variables
- Client-side env vars must be prefixed with `NEXT_PUBLIC_`. Server-side vars are validated with Zod in `src/env.server.ts`. If adding new env vars, update both the `.env.example` file and the appropriate Zod schema.
