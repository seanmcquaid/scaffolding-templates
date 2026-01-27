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
| `pnpm typecheck`         | Check TypeScript types                        |
| `pnpm check-types`       | Validate TypeScript types and package exports |
| `pnpm check-treeshaking` | Verify the bundle is tree-shakeable           |
| `pnpm bundlesize`        | Check bundle size against limits              |

### Publishing

| Script          | Description                                    |
| --------------- | ---------------------------------------------- |
| `pnpm changeset`| Create a changeset for version management      |
| `pnpm release`  | Build and publish package to npm               |

### AI Workflows (Ralph)

| Script               | Description                                  |
| -------------------- | -------------------------------------------- |
| `pnpm ralph:plan`    | Create a plan for a task                     |
| `pnpm ralph:execute` | Execute a plan step by step                  |
| `pnpm ralph:review`  | Review progress and suggest iterations       |
| `pnpm ralph:iterate` | Update plan based on review                  |
| `pnpm ralph:status`  | Show all active plans                        |
| `pnpm ralph:show`    | Show plan details                            |
| `pnpm ralph:share`   | Move local plan to shared location           |

> See [AI Workflows Documentation](./docs/ai-workflows.md) for more information on Ralph.

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
