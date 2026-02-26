# TanStack Router SPA Template - Agent Instructions

The role of this file is to describe common mistakes and confusion points that agents might encounter as they work in this project. If you ever encounter something like this in the project, please alert the developer working with you and indicate this is the case in the AGENTS.md file to help prevent future agents from having the same issue.

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

# Type checking
pnpm typecheck

# Run Playwright E2E tests
pnpm playwright:run-e2e

# Run Playwright integration tests
pnpm playwright:run-integration
```

## Guiding Principles

### 1. Type-Safe Routing Throughout
TanStack Router's type system covers route parameters, search params, loader data, and navigation. Always leverage this — never use untyped route access or string-based navigation without proper type inference.

### 2. Tests Are Mandatory
All new code must have tests. Use the three-tier approach:
- **Unit tests (Vitest)** for components, hooks, and utilities in isolation
- **Integration tests (Playwright + MSW)** for happy path flows with mocked APIs
- **End-to-end tests (Playwright)** for critical user journeys with real APIs — run post-deploy, not in PRs

### 3. Client-Side Only — No SSR
This template is a pure SPA. All data fetching is client-side via loaders and TanStack Query. Do not introduce server-only code or Node.js APIs.

### 4. Right Level of Abstraction
- Separate UI components (`src/components/ui/` — pure presentational) from app components (`src/components/app/` — business logic).
- Keep components small and composable. Single Responsibility Principle applies.
- Only extract shared logic once you've seen the pattern repeated at least twice.

### 5. Type Safety End-to-End
Validate all API responses with **Zod** at the boundary. Use TypeScript strict mode throughout. No `any` types.

### 6. Internationalization is Not Optional
All user-facing text must use the `useAppTranslation()` hook. ESLint enforces this — literal strings in JSX fail the build.

### 7. State Management Hierarchy
1. **URL state / search params** — use `Route.useSearch()` with Zod schema for shareable, type-safe state
2. **Loader data** (`Route.useLoaderData()`) for data fetched at route entry
3. **Local component state** for UI-only concerns
4. **TanStack Query** for client-side mutations and re-fetching
5. **React Hook Form** for all form state

## Common Mistakes and Confusion Points

### 1. Route Code Generation
- TanStack Router uses **file-based routing with code generation**. Routes are auto-generated from the file structure in `src/routes/`. After adding, renaming, or deleting route files, the `routeTree.gen.ts` file is regenerated automatically during `pnpm dev` or `pnpm build`. Do not manually edit `routeTree.gen.ts`.

### 2. SPA Only — No SSR
- This template is a **client-side SPA** using Vite. There is no server-side rendering. Do not add server-only code or Node.js APIs.

### 3. Type-Safe Search Parameters
- TanStack Router provides type-safe search params via `Route.useSearch()`. Always define search parameter schemas using Zod in the route file. Accessing `useSearchParams` from React Router or browser APIs directly bypasses type safety.

### 4. Hardcoded Strings / Missing Translations
- All user-facing text **must** use the `useAppTranslation()` hook with i18n keys. ESLint enforces this with `i18next/no-literal-string`. Adding any string literal in JSX will fail linting.
- Translation files are in `src/i18n/locales/`. Always add new keys there when adding new text.

### 5. Import Paths
- Use the `@/` alias (maps to `src/`) — not relative paths like `../../components`. Relative paths beyond the same directory break the established conventions.

### 6. Package Manager
- Use **`pnpm`** only. Do not use `npm install` or `yarn add`.
