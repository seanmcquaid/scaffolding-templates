# Scaffolding Templates - Agent Instructions

The role of this file is to describe common mistakes and confusion points that agents might encounter as they work in this project. If you ever encounter something like this in the project, please alert the developer working with you and indicate this is the case in the AGENTS.md file to help prevent future agents from having the same issue.

## Commands

```bash
# Install dependencies
pnpm install

# Run all tests across all templates
pnpm test

# Run linting across all templates
pnpm lint

# Build all templates
pnpm build

# Run typecheck across all templates
pnpm typecheck
```

## Guiding Principles

These are the core principles that all work in this repository should adhere to. When making changes, always evaluate them against these principles.

### 1. Tests Are Mandatory
Every non-trivial change requires tests. Follow the three-tier testing strategy:
- **Unit tests** — for components, hooks, and utilities in isolation
- **Integration tests with MSW** — for happy path flows where data is mocked at the network layer
- **End-to-end tests with Playwright** — for high-level user flows against real APIs (run post-deploy, not in PRs)

### 2. Right Level of Abstraction
- Apply the **Single Responsibility Principle** — each component, hook, or module does one thing well
- Prefer **composition over inheritance** — build complex UI from small, focused pieces
- Avoid **premature abstraction** — only extract shared code once you've seen the pattern repeated at least twice
- Keep **directory depth shallow** — max 3-4 levels; deeply nested structures signal over-engineering

### 3. Consistency Across Templates
- All templates share the same foundational tooling, coding standards, and patterns. When establishing or changing a pattern in one template, evaluate whether it should apply to all of them.
- Follow the `@/` import alias convention throughout all templates — no `../../..` relative paths

### 4. Type Safety Throughout
- TypeScript strict mode is non-negotiable. No `any` types; use `unknown` when the type is genuinely unknown.
- All API responses must be validated with **Zod** schemas at the boundary before use.

### 5. Internationalization is Not Optional
- Every user-facing string **must** go through the i18n system. ESLint will fail the build on literal strings in JSX.
- Use `useAppTranslation()` and follow the `Namespace.key` naming convention.

### 6. State Management Hierarchy
Choose the simplest state mechanism that solves the problem:
1. **URL state** — for shareable, bookmarkable state (filters, pagination, selected items)
2. **Local component state** — for UI-only state owned by one component
3. **Lifted state** — when multiple related components share state
4. **TanStack Query** — for all server/async state (fetching, caching, mutations)
5. **React Hook Form** — for all form state (never manage form fields manually)
6. **Context / global store** — only as a last resort for truly global state

### 7. Accessibility Is a Requirement
- Use semantic HTML elements and ARIA attributes correctly.
- All interactive elements must be keyboard accessible.
- Target WCAG 2.1 AA compliance.

## Common Mistakes and Confusion Points

### 1. Package Manager
- **Always use `pnpm`** — not `npm` or `yarn`. The project uses pnpm workspaces and mixing package managers will break the lockfile and workspace resolution.

### 2. Template-Specific vs Root-Level Commands
- Commands like `pnpm test` and `pnpm lint` run across all templates via Turborepo. To run commands for a specific template, `cd` into the template directory first.
- The root `package.json` uses Turborepo (`turbo`) to orchestrate tasks — don't try to run individual template scripts from the root except via `pnpm -F <template>` filter syntax.

### 3. Node.js Version
- The project requires **Node.js >=22.12.0**. Using older Node versions will cause unexpected failures. Check `.nvmrc` and use `nvm use` to switch to the correct version.

### 4. Hardcoded Strings / Missing Translations
- All user-facing text **must** use the `useAppTranslation()` hook with i18n keys. ESLint enforces this via the `i18next/no-literal-string` rule. Hardcoded strings will cause lint failures.

### 5. Agents and Skills Directory
- Agent files live in `.agents/` (note the leading dot). Skills live in `.agents/skills/`. Do not create a top-level `agents/` or `skills/` directory — those were renamed to `.agents/` intentionally.

### 6. TypeScript Strict Mode
- All templates use TypeScript with strict mode enabled. Avoid `any` types and ensure all functions have proper type annotations.

### 7. Import Paths
- Use the `@/` path alias (e.g., `@/components/MyComponent`) instead of relative paths that go up multiple directories. Using `../../..` style imports will break the established conventions.
