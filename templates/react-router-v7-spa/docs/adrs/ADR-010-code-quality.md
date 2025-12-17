# ADR-010: Code Quality Tooling

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #code-quality #linting #formatting #git-hooks #ci-cd

---

## Context

Maintaining code quality and consistency across a project requires automated tooling for:

- Code linting to catch bugs and enforce patterns
- Code formatting for consistent style
- Pre-commit validation to prevent bad code from being committed
- Dependency analysis to catch circular dependencies
- Bundle size monitoring to prevent bloat
- Type checking to ensure type safety

Manual code review alone is insufficient and leads to inconsistency.

## Decision

We will use a comprehensive code quality tooling stack:

1. **ESLint 9** with flat config for linting
2. **Prettier** for code formatting
3. **Husky** for git hooks
4. **lint-staged** for pre-commit checks
5. **TypeScript** in strict mode for type safety
6. **dpdm** for circular dependency detection
7. **bundlesize** for bundle size monitoring

All rules configured with `--max-warnings=0` to enforce zero tolerance for warnings.

## Rationale

This comprehensive approach provides:

1. **Consistency**: Automated formatting ensures uniform code style
2. **Quality**: ESLint catches bugs and anti-patterns
3. **Prevention**: Git hooks prevent bad code from being committed
4. **Performance**: Bundle size monitoring prevents bloat
5. **Maintainability**: Circular dependency detection prevents architecture issues
6. **Type Safety**: Strict TypeScript prevents type-related bugs
7. **Developer Experience**: Fast feedback loop with editor integration

## Consequences

### Positive Consequences
- Consistent code style across the entire codebase
- Catches common bugs before runtime
- Prevents commits of poorly formatted code
- Bundle size stays under control
- Type safety prevents entire categories of bugs
- Better code review focus on logic rather than style
- New developers can't deviate from standards

### Negative Consequences / Trade-offs
- Initial setup complexity
- Slightly slower commit process due to pre-commit hooks
- May be frustrating for developers used to looser standards
- False positives from linting rules may require configuration
- ESLint 9 flat config is newer and has less documentation

### Risks and Mitigations
- **Risk**: Pre-commit hooks may be too slow
  - **Mitigation**: Only lint staged files, not entire codebase
- **Risk**: Strict rules may frustrate developers
  - **Mitigation**: Rules are configurable, can adjust based on team feedback
- **Risk**: CI/CD failures from linting may block deployments
  - **Mitigation**: Run checks early and often, fix issues promptly

## ESLint Configuration

### Plugins Used
- **@typescript-eslint**: TypeScript-specific linting rules
- **eslint-plugin-react**: React best practices
- **eslint-plugin-react-hooks**: React Hooks rules
- **eslint-plugin-react-compiler**: React Compiler optimization rules
- **eslint-plugin-jsx-a11y**: Accessibility rules
- **eslint-plugin-import**: Import/export validation
- **eslint-plugin-prettier**: Prettier integration
- **eslint-plugin-i18next**: Enforce translation usage
- **eslint-plugin-no-relative-import-paths**: Enforce absolute imports
- **@tanstack/eslint-plugin-query**: TanStack Query best practices
- **@vitest/eslint-plugin**: Vitest test rules
- **eslint-plugin-playwright**: Playwright test rules

### Key Rules
- `no-console`: Error (except console.error)
- `i18next/no-literal-string`: Error (enforce translations)
- `react-hooks/rules-of-hooks`: Error
- `@typescript-eslint/no-explicit-any`: Warn
- `@typescript-eslint/no-unused-vars`: Error
- `jsx-a11y/*`: Error for accessibility violations

## Alternatives Considered

### Alternative 1: Standard.js
- **Description**: Pre-configured ESLint with opinionated rules
- **Pros**: 
  - Zero configuration
  - Consistent ruleset
  - Simple to set up
- **Cons**: 
  - Less flexible
  - Can't customize rules
  - No Prettier integration
  - Less control over rules
- **Reason for rejection**: Too opinionated, need more control

### Alternative 2: Biome
- **Description**: New all-in-one linter and formatter written in Rust
- **Pros**: 
  - Very fast (written in Rust)
  - Single tool for linting and formatting
  - Good TypeScript support
- **Cons**: 
  - Newer, less mature
  - Smaller ecosystem of plugins
  - Less configurable than ESLint
  - Some plugins not available
- **Reason for rejection**: Too new, ESLint ecosystem is more mature

### Alternative 3: No Linting (TypeScript Only)
- **Description**: Rely solely on TypeScript for code quality
- **Pros**: 
  - Simpler setup
  - Faster builds
  - One less tool to configure
- **Cons**: 
  - No style consistency
  - TypeScript doesn't catch all issues
  - No accessibility checking
  - No best practice enforcement
- **Reason for rejection**: TypeScript alone is insufficient for code quality

### Alternative 4: No Pre-commit Hooks
- **Description**: Run checks only in CI/CD
- **Pros**: 
  - Faster local development
  - No commit delays
- **Cons**: 
  - Issues found later in cycle
  - Wastes CI/CD resources
  - Broken commits in git history
  - Slower feedback loop
- **Reason for rejection**: Early feedback is critical

## Implementation Notes

### Git Hooks Setup
```json
{
  "scripts": {
    "prepare": "is-ci || husky"
  }
}
```

### lint-staged Configuration
```json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix --max-warnings=0",
    "prettier --write"
  ],
  "*.{json,md,mdx,css,yaml,yml}": [
    "prettier --write"
  ]
}
```

### Bundle Size Monitoring
```json
{
  "bundlesize": [
    {
      "path": ".next/static/chunks/*.js",
      "maxSize": "150 kB"
    }
  ]
}
```

### TypeScript Configuration
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `noImplicitReturns: true`
- `forceConsistentCasingInFileNames: true`

## Related Decisions

- [ADR-004: Type-Safe Internationalization with i18next](./ADR-004-i18n-strategy.md)
- [ADR-005: Testing Strategy with Vitest and Playwright](./ADR-005-testing-strategy.md)

## References

- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
