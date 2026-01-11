# TypeScript Library Skills

This document defines the specialized skills and capabilities available in this TypeScript library template for GitHub Copilot agents.

## Core Skills

### Library Development
**Skill:** `typescript-library-development`
- Building reusable TypeScript libraries with dual ESM/CJS output
- Configuring tsup for efficient bundling
- Managing exports for optimal tree-shaking
- Writing type-safe, well-documented public APIs

### Package Publishing
**Skill:** `npm-package-publishing`
- Using Changesets for version management and changelog generation
- Configuring package.json for dual module support (ESM/CJS)
- Publishing to npm with proper semantic versioning
- Validating package exports with @arethetypeswrong/cli

### Testing & Quality
**Skill:** `library-testing`
- Writing comprehensive unit tests with Vitest
- Achieving high test coverage (>90%)
- Testing both TypeScript and JavaScript consumers
- Mocking external dependencies appropriately

**Skill:** `code-quality-checks`
- Linting TypeScript code with ESLint
- Formatting code with Prettier
- Checking for circular dependencies with dpdm
- Validating tree-shaking compatibility with agadoo
- Monitoring bundle size with bundlesize

### Build & Tooling
**Skill:** `typescript-build-tooling`
- Configuring TypeScript with strict mode
- Building dual ESM/CJS modules with tsup
- Generating accurate type definitions
- Optimizing build output for consumers

## Workflow Skills

### Pre-commit Automation
**Skill:** `git-hooks`
- Using Husky for Git hooks
- Running lint-staged for pre-commit checks
- Ensuring code quality before commits

### Continuous Integration
**Skill:** `ci-cd-library`
- Setting up GitHub Actions for library projects
- Automating builds, tests, and quality checks
- Implementing automated npm publishing

## Development Patterns

### API Design
**Skill:** `library-api-design`
- Creating intuitive, well-typed public APIs
- Following semantic versioning principles
- Maintaining backward compatibility
- Documenting APIs with JSDoc comments

### Performance Optimization
**Skill:** `library-performance`
- Minimizing bundle size
- Ensuring tree-shaking compatibility
- Avoiding unnecessary dependencies
- Using dynamic imports for optional features

## Tools & Technologies

- **TypeScript 5.8+**: Primary language with strict configuration
- **tsup**: Fast bundler built on esbuild
- **Vitest**: Testing framework with coverage support
- **ESLint & Prettier**: Code quality and formatting
- **Changesets**: Version management and changelogs
- **Husky & lint-staged**: Git hooks and pre-commit checks
- **agadoo**: Tree-shaking validation
- **bundlesize**: Bundle size monitoring
- **dpdm**: Circular dependency detection

## Best Practices

1. **Keep public API minimal**: Export only what's necessary
2. **Maintain backward compatibility**: Use deprecation warnings before breaking changes
3. **Write comprehensive tests**: Focus on public APIs and edge cases
4. **Monitor bundle size**: Keep library lightweight for consumers
5. **Document thoroughly**: Provide clear JSDoc comments and README
6. **Validate exports**: Use @arethetypeswrong/cli before publishing
7. **Follow semver strictly**: Use Changesets for version management

## Quick Start Commands

- `pnpm build`: Build the library for production
- `pnpm test`: Run test suite
- `pnpm lint`: Check code quality
- `pnpm changeset`: Add a changeset for versioning
- `pnpm release`: Build and publish to npm
- `pnpm check-types`: Validate TypeScript types and package exports
- `pnpm check-treeshaking`: Validate tree-shaking compatibility
- `pnpm bundlesize`: Check bundle size limits
