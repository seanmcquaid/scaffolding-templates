# TypeScript Library Template

A comprehensive, production-ready template for building and publishing TypeScript libraries with modern tooling and best practices.

## ✨ Features

- **📦 Dual Package Support** - ESM and CommonJS builds with proper `package.json` exports
- **🔍 Type Safety** - Strict TypeScript configuration with comprehensive type checking
- **🧪 Testing Suite** - Vitest with coverage reporting and circular dependency detection
- **📋 Code Quality** - ESLint + Prettier with pre-commit hooks via Husky
- **📈 Bundle Analysis** - Bundle size monitoring and tree-shaking validation
- **🚀 Publishing** - Automated releases with Changesets and GitHub Actions
- **⚡ Modern Tooling** - Built with tsdown for fast, optimized builds
- **🤖 Agent Skills** - TanStack Intent integration for shipping versioned AI agent guidance with your package

## 🚀 Quick Start

### Automated Setup (Recommended)

Run the setup script to automatically configure everything:

```bash
# Make the setup script executable and run it
chmod +x setup.sh && ./setup.sh
```

This script will:

- Install pnpm if not already available
- Install all dependencies
- Verify everything is working correctly

> **ℹ️ Note:** The `setup.sh` script will automatically install **git**, **nvm**, and **pnpm** if they are not already available on your system (macOS and Linux supported). You may still install them manually if you prefer.

### Prerequisites (for Manual Setup)

- **git** (version control)
- **nvm** (Node Version Manager)
- **Node.js** >=22.12.0
- **pnpm** (recommended package manager)

### Manual Installation

```bash
# Install dependencies
pnpm install

# Start development
pnpm test:watch
```

## 📂 Project Structure

```
├── src/                    # Source code
│   ├── index.ts           # Main entry point
│   └── __tests__/         # Test files
├── skills/               # Agent skills shipped with the package
│   └── typescript-library/
│       └── SKILL.md      # TanStack Intent skill for AI coding agents
├── .changeset/           # Changesets for version management
└── docs/                 # Documentation files
```

## 🛠️ Available Scripts

### Development

| Script       | Description                      |
| ------------ | -------------------------------- |
| `pnpm build` | Build the library for production |

### Testing & Quality

| Script                   | Description                                   |
| ------------------------ | --------------------------------------------- |
| `pnpm test`              | Run all tests                                 |
| `pnpm test:watch`        | Run tests in watch mode                       |
| `pnpm test:coverage`     | Run tests with coverage reporting             |
| `pnpm lint`              | Lint source code                              |
| `pnpm lint:fix`          | Lint and auto-fix issues                      |
| `pnpm check-types`       | Validate TypeScript types and package exports |
| `pnpm check-treeshaking` | Verify the bundle is tree-shakeable           |
| `pnpm bundlesize`        | Check bundle size against limits              |

### Publishing

| Script           | Description                               |
| ---------------- | ----------------------------------------- |
| `pnpm changeset` | Create a changeset for version management |
| `pnpm release`   | Build and publish package to npm          |

### Agent Skills

| Script                | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `pnpm intent:validate` | Validate SKILL.md files in the `skills/` directory   |
| `pnpm intent:stale`   | Check for skills that are behind their source docs    |

## 🔧 Development Workflow

### Writing Code

1. Add your library code in the `src/` directory
2. Export public APIs through `src/index.ts`
3. Write tests alongside your code using the `.test.ts` suffix

### Testing

The template uses **Vitest** for testing with:

- Unit test support with jsdom environment
- Coverage reporting with Istanbul
- Circular dependency detection
- Pre-commit test validation

```bash
# Run tests once
pnpm test

# Watch mode for development
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Quality Assurance

Before publishing, the template validates:

- **Type Safety**: `pnpm check-types` - Validates exports with @arethetypeswrong/cli
- **Tree Shaking**: `pnpm check-treeshaking` - Ensures bundle is tree-shakeable
- **Bundle Size**: `pnpm bundlesize` - Monitors package size
- **Circular Dependencies**: Detected automatically in tests
- **Code Quality**: ESLint + Prettier enforcement

## 📦 Publishing

### Using Changesets (Recommended)

1. **Create a changeset** for your changes:

   ```bash
   pnpm changeset
   ```

2. **Commit the changeset**:

   ```bash
   git add . && git commit -m "feat: add new feature"
   ```

3. **Release** (automated via GitHub Actions or manual):
   ```bash
   pnpm release
   ```

### GitHub Actions Setup

For automated publishing, add these secrets to your GitHub repository:

- `NPM_TOKEN` - Your npm publish token
- `GITHUB_TOKEN` - Automatically available in GitHub Actions

The template includes a complete CI/CD workflow for automated testing and publishing.

## 🤖 Agent Skills (TanStack Intent)

This template uses [TanStack Intent](https://tanstack.com/intent) to ship versioned AI agent guidance alongside your npm package. Skills live in the `skills/` directory and are published with your package so AI coding agents always have up-to-date, correct guidance when working with your library.

### How It Works

Skills are short, versioned Markdown documents that tell AI agents how to use your library — correct patterns, common mistakes, and when to apply them. They travel with your package via `npm update`, not the model's training cutoff.

### Managing Skills

```bash
# Validate all SKILL.md files
pnpm intent:validate

# Check for skills that have drifted from their source docs
pnpm intent:stale
```

### Adding a New Skill

1. Create a new `SKILL.md` in the `skills/` directory following the [Agent Skills spec](https://agentskills.io/specification)
2. Run `pnpm intent:validate` to confirm the file is valid
3. Publish — skills are included in the package automatically via the `files` field in `package.json`

### For Consumers of Your Library

After installing your package, consumers can set up skill discovery in their agent config files:

```bash
npx @tanstack/intent@latest install
```
