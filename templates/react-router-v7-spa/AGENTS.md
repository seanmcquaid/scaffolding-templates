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
