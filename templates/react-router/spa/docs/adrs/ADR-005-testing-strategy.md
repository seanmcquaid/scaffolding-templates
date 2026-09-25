# ADR-005: Testing Strategy with Vitest and Playwright

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #testing #quality #vitest #playwright #msw

---

## Context

A comprehensive testing strategy is essential for maintaining code quality and preventing regressions. We need to decide on:

- Unit testing framework and tools
- Integration testing approach
- End-to-end (E2E) testing framework
- API mocking strategy
- Accessibility testing approach
- Performance testing tools

The testing strategy must balance coverage, speed, reliability, and developer experience.

## Decision

We will implement a **three-tier testing strategy**:

1. **Unit Tests**: Vitest + Testing Library for components, hooks, and utilities
2. **Integration Tests**: Playwright + MSW for mocked API integration tests
3. **E2E Tests**: Playwright with real APIs for critical user flows

Additional testing includes:
- MSW (Mock Service Worker) for API mocking
- @axe-core/playwright for accessibility testing
- playwright-lighthouse for performance testing

## Rationale

This three-tier approach provides:

1. **Fast Feedback**: Unit tests run in milliseconds for quick iteration
2. **Confidence**: Integration tests verify component interactions
3. **Real-World Validation**: E2E tests validate complete user flows
4. **Balanced Coverage**: Right level of testing for each scenario
5. **Developer Experience**: Fast test execution for most tests
6. **Type Safety**: Both Vitest and Playwright work well with TypeScript
7. **Modern Tooling**: Vite-powered test runner and modern E2E framework

## Consequences

### Positive Consequences
- Fast unit test execution with Vitest
- Type-safe tests with excellent TypeScript support
- Realistic API mocking with MSW works in both tests and development
- Reliable E2E tests with Playwright's auto-wait and retry mechanisms
- Comprehensive coverage across all testing levels
- Built-in accessibility testing prevents a11y regressions
- Performance monitoring catches performance degradations

### Negative Consequences / Trade-offs
- Learning curve for multiple testing tools
- Test maintenance overhead across three testing levels
- E2E tests are slower and more brittle than unit tests
- MSW setup requires understanding of service worker concepts
- Lighthouse tests may be flaky in CI environments

### Risks and Mitigations
- **Risk**: Over-testing leads to slow test suites
  - **Mitigation**: Focus E2E tests on critical paths only, use integration tests for most scenarios
- **Risk**: Flaky E2E tests reduce confidence
  - **Mitigation**: Use Playwright's built-in retry mechanisms, keep E2E tests focused
- **Risk**: MSW limitations with SSR
  - **Mitigation**: Document SSR testing approach, use Playwright for SSR integration tests

## Alternatives Considered

### Alternative 1: Jest + React Testing Library + Cypress
- **Description**: Traditional testing stack
- **Pros**: 
  - Well-established and mature
  - Large community and resources
  - Known patterns and solutions
- **Cons**: 
  - Jest is slower than Vitest
  - Cypress has limitations compared to Playwright
  - More configuration needed
- **Reason for rejection**: Vitest and Playwright provide better performance and DX

### Alternative 2: Vitest Only (No E2E)
- **Description**: Only use Vitest for all testing
- **Pros**: 
  - Simpler setup
  - Faster test execution
  - Single tool to learn
- **Cons**: 
  - Cannot test real browser behavior
  - Missing cross-browser testing
  - No real user interaction validation
- **Reason for rejection**: E2E tests are valuable for critical flows

### Alternative 3: Playwright for All Tests
- **Description**: Use Playwright for unit, integration, and E2E tests
- **Pros**: 
  - Single tool for all testing
  - Tests run in real browser
- **Cons**: 
  - Slower test execution even for simple tests
  - Overkill for unit testing
  - Higher resource usage
- **Reason for rejection**: Too slow for unit tests, poor developer experience

## Implementation Notes

### Test Organization
```
src/
  components/
    __tests__/
      Component.test.tsx
playwright/
  integration/  # Playwright + MSW tests
  e2e/          # Playwright + real API tests
```

### Testing Guidelines

**Unit Tests** - Use for:
- Individual components
- Custom hooks
- Utility functions
- Pure business logic

**Integration Tests** - Use for:
- Multi-component interactions
- Page-level behavior with mocked APIs
- Accessibility testing
- Performance testing

**E2E Tests** - Use for:
- Critical user flows (auth, checkout, etc.)
- Cross-page navigation
- Real API interactions
- Final validation before deployment

### Key Testing Principles
1. Test behavior, not implementation
2. Prefer integration tests over unit tests for components
3. Keep E2E tests focused on critical paths
4. Use MSW for consistent API mocking
5. Include accessibility tests for all user-facing components

## Related Decisions

- [ADR-008: API Client with ky and Zod](./ADR-008-api-client.md)
- [ADR-010: Code Quality Tooling](./ADR-010-code-quality.md)

## References

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
