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
