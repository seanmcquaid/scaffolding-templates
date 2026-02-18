# ADR-003: Testing Strategy with Vitest

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #testing #vitest #quality

---

## Context

TypeScript libraries need comprehensive testing to ensure correctness and prevent regressions. We need:

- Fast test execution for rapid iteration
- TypeScript support
- Coverage reporting
- Circular dependency detection
- Tree-shaking validation

## Decision

We will use **Vitest** as the primary testing framework with:

- **@vitest/coverage-istanbul** for coverage reporting
- **dpdm** for circular dependency detection
- Custom scripts for tree-shaking validation

## Rationale

Vitest provides:

1. **Speed**: Extremely fast test execution
2. **TypeScript**: Native TypeScript support
3. **Vite Integration**: Leverages Vite's transformation pipeline
4. **Modern**: Uses modern JavaScript features
5. **API Compatibility**: Jest-compatible API for easy migration
6. **Watch Mode**: Excellent watch mode for development

## Consequences

### Positive Consequences

- Very fast test execution
- Excellent TypeScript support
- Good developer experience
- Jest-compatible API (familiar)
- Built-in coverage reporting

### Negative Consequences / Trade-offs

- Smaller ecosystem than Jest
- Fewer third-party integrations
- Some Jest plugins may not work

## Implementation Notes

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Related Decisions

- [ADR-001: Use tsdown for Library Builds](./ADR-001-tsdown-build-tool.md)
- [ADR-005: Code Quality Tooling](./ADR-005-code-quality.md)

## References

- [Vitest Documentation](https://vitest.dev/)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
