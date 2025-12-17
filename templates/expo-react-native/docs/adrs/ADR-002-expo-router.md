# ADR-002: Use Expo Router for Navigation

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #navigation #routing #expo-router #file-based

---

## Context

React Native applications need a navigation solution. We need:

- Intuitive navigation between screens
- Type-safe routing
- Deep linking support
- Tab and stack navigation
- Good developer experience
- Modern patterns

## Decision

We will use **Expo Router** for navigation and routing.

## Rationale

Expo Router provides:

1. **File-Based**: Intuitive file-based routing like Next.js
2. **Type Safety**: TypeScript support with type-safe navigation
3. **Deep Linking**: Built-in deep linking support
4. **Layouts**: Shared layouts for consistent UI
5. **Modern**: Built on React Navigation v6
6. **Web Support**: Works on web as well as native

## Consequences

### Positive Consequences
- Intuitive file-based routing
- Less boilerplate than React Navigation
- Built-in deep linking
- Good TypeScript support
- Universal routing (native + web)

### Negative Consequences / Trade-offs
- Less mature than React Navigation
- Some React Navigation features may not be available
- Newer paradigm to learn

## Implementation Notes

File structure defines routes:
```
app/
  _layout.tsx       # Root layout
  index.tsx         # Home screen (/)
  (tabs)/           # Tab group
    _layout.tsx     # Tab layout
    home.tsx        # /home tab
    profile.tsx     # /profile tab
```

## Related Decisions

- [ADR-001: Use Expo for React Native Development](./ADR-001-expo-framework.md)

## References

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
