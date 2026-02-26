# React Router v7 SPA Template - Agent Instructions

The role of this file is to describe common mistakes and confusion points that agents might encounter as they work in this project. If you ever encounter something like this in the project, please alert the developer working with you and indicate this is the case in the AGENTS.md file to help prevent future agents from having the same issue.

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

# Type checking
pnpm typecheck

# Run Playwright E2E tests
pnpm playwright:run-e2e

# Run Playwright integration tests
pnpm playwright:run-integration
```

## Guiding Principles

### 1. Client-Side Only — No SSR
This template is a pure SPA. All data fetching is client-side. Do not introduce server-only code, Node.js APIs, or server actions.

### 2. Tests Are Mandatory
All new code must have tests. Use the three-tier approach:
- **Unit tests (Vitest)** for components, hooks, and utilities in isolation
- **Integration tests (Playwright + MSW)** for happy path data flows with mocked APIs
- **End-to-end tests (Playwright)** for critical user journeys with real APIs — run post-deploy, not in PRs

### 3. Right Level of Abstraction
- Separate UI components (`components/ui/` — pure presentational) from app components (`components/app/` — business logic).
- Keep components small and composable. Single Responsibility Principle applies.
- Only extract shared logic once you've seen the pattern repeated at least twice.

### 4. Type Safety End-to-End
Validate all API responses with **Zod** at the boundary. Use TypeScript strict mode throughout. No `any` types. After adding or renaming routes, run `pnpm build` to regenerate route types.

### 5. Internationalization is Not Optional
All user-facing text must use the `useAppTranslation()` hook. ESLint enforces this — literal strings in JSX fail the build.

### 6. State Management Hierarchy
1. **URL state** (search params) for shareable, bookmarkable state — filters, pagination, selected items
2. **Local component state** for UI-only concerns owned by one component
3. **TanStack Query** for all server/async state (fetching, caching, mutations)
4. **React Hook Form** for all form state — never manage form fields manually

## Common Mistakes and Confusion Points

### 1. Route Type Generation
- This project uses `react-router typegen` to generate type-safe route parameters. After adding or renaming routes, run `pnpm build` (which runs `react-router typegen` first) to regenerate types. Skipping this causes TypeScript errors about missing or incorrect route param types.

### 2. SPA vs SSR
- This template is a **client-side SPA** — there is no server-side rendering. All data fetching happens on the client. Do not add server-only code (Node.js APIs, server actions, etc.).

### 3. Hardcoded Strings / Missing Translations
- All user-facing text **must** use the `useAppTranslation()` hook with i18n keys. ESLint enforces this with `i18next/no-literal-string`. Adding any string literal in JSX will fail linting.
- Translation files are in `app/i18n/locales/`. Always add new keys there when adding new text.

### 4. Import Paths
- Use the `@/` alias (maps to `app/`) — not relative paths like `../../components`. Relative paths beyond the same directory break the established conventions.

### 5. Package Manager
- Use **`pnpm`** only. Do not use `npm install` or `yarn add`.

### 6. Production Start Command
- `pnpm start` uses `http-server` to serve the static build output from `build/client/`. The production build must exist (`pnpm build`) before running `pnpm start`.
