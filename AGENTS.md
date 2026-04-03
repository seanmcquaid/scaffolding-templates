# Scaffolding Templates

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
```

## Project Notes

- **Package Manager**: Always use `pnpm` — not `npm` or `yarn`. The project uses pnpm workspaces; mixing package managers will break the lockfile and workspace resolution.
- **Node.js Version**: Requires Node.js >=22.12.0. Check `.nvmrc` and use `nvm use` to switch to the correct version.
- **Template Commands**: `pnpm test` and `pnpm lint` run across all templates via Turborepo. To target a specific template, `cd` into its directory or use `pnpm -F <template-name>` from the root.
- **Agents & Skills**: Sub-agents live in `.agents/`, skills in `.agents/skills/`. Do not create a top-level `agents/` or `skills/` directory.
