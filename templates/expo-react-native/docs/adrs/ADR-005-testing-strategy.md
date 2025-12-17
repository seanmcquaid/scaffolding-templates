# ADR-005: Testing Strategy with Jest

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #testing #jest #quality

---

## Context

React Native applications need comprehensive testing. We need:

- Unit testing for components and logic
- Testing Library for component testing
- Good TypeScript support
- Fast test execution

## Decision

We will use **Jest** with **@testing-library/react-native** for testing.

## Rationale

Jest is the standard testing framework for React Native with:

1. **Expo Integration**: Built-in support via jest-expo
2. **React Native**: Designed for React Native testing
3. **Mocking**: Good mocking capabilities for native modules
4. **Snapshot Testing**: Built-in snapshot testing
5. **Coverage**: Built-in coverage reporting

## Consequences

### Positive Consequences
- Standard React Native testing approach
- Good Expo integration
- Comprehensive testing capabilities
- Large community and resources

### Negative Consequences / Trade-offs
- Slower than Vitest
- Setup can be complex for native modules
- Snapshot tests can be brittle

## Implementation Notes

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Related Decisions

- [ADR-001: Use Expo for React Native Development](./ADR-001-expo-framework.md)

## References

- [Jest Documentation](https://jestjs.io/)
- [Testing Library React Native](https://testing-library.com/docs/react-native-testing-library/intro/)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
