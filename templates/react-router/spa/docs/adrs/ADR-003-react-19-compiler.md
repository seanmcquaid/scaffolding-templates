# ADR-002: Use React 19 with React Compiler

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #react #performance #optimization #compiler

---

## Context

React 19 introduces significant new features and the React Compiler (formerly React Forget) which automatically optimizes React code by handling memoization. We need to decide whether to adopt React 19 and the compiler for this template.

Key considerations:
- Performance improvements through automatic memoization
- Developer experience improvements by reducing manual optimization
- Compatibility with Next.js 15
- Learning curve for new features
- Production readiness of React 19

## Decision

We will use **React 19** with the **React Compiler** enabled for automatic optimizations.

## Rationale

React 19 and the React Compiler provide:

1. **Automatic Optimizations**: Compiler automatically handles memoization, reducing need for `useMemo`, `useCallback`, and `React.memo`
2. **Better Performance**: Optimizations that would be tedious to implement manually
3. **Improved Developer Experience**: Focus on building features rather than performance optimization
4. **Modern Features**: Actions, `use` hook, improved error handling
5. **Future-Proof**: Aligns with React's future direction
6. **Next.js Integration**: Native support in Next.js 15 with Turbopack

The compiler eliminates much of the boilerplate around performance optimization while maintaining or improving performance.

## Consequences

### Positive Consequences
- Automatic memoization reduces bundle size by eliminating manual optimization code
- Better performance without developer effort
- Cleaner, more readable code without excessive memoization hooks
- Improved developer experience - less to think about during development
- Faster development cycle without manual optimization pass

### Negative Consequences / Trade-offs
- Bleeding edge technology - may have undiscovered issues
- Compiler may not optimize all cases perfectly
- Requires Babel integration in the build pipeline
- Some developers may need to learn new React 19 patterns
- May encounter compatibility issues with older libraries

### Risks and Mitigations
- **Risk**: React Compiler is relatively new and may have bugs
  - **Mitigation**: Monitor React releases, have escape hatch to disable compiler if needed
- **Risk**: Third-party libraries may not be compatible
  - **Mitigation**: Test thoroughly, maintain list of known compatibility issues
- **Risk**: Developers may over-rely on compiler and miss optimization opportunities
  - **Mitigation**: Document when manual optimization is still beneficial

## Alternatives Considered

### Alternative 1: Use React 18 Stable
- **Description**: Stick with React 18 for maximum stability
- **Pros**: 
  - More stable, battle-tested
  - Wider library compatibility
  - Well-understood patterns
- **Cons**: 
  - Miss out on React 19 features and improvements
  - No automatic optimization from compiler
  - Will need to upgrade eventually anyway
- **Reason for rejection**: React 19 is production-ready and provides significant benefits

### Alternative 2: React 19 Without Compiler
- **Description**: Use React 19 but don't enable the compiler
- **Pros**: 
  - Get React 19 features without compiler risk
  - More control over optimization
- **Cons**: 
  - Lose automatic optimization benefits
  - More manual memoization code needed
  - Miss out on key benefit of React 19
- **Reason for rejection**: Compiler is a major benefit of React 19, and it's stable enough for production

### Alternative 3: Preact
- **Description**: Use Preact as a lighter React alternative
- **Pros**: 
  - Smaller bundle size
  - Faster by default
  - React compatibility layer available
- **Cons**: 
  - Not all React features supported
  - Smaller ecosystem
  - May have compatibility issues with libraries
  - No Server Components support
- **Reason for rejection**: React 19 with compiler provides better ecosystem and features

## Implementation Notes

- Enable React Compiler in `next.config.js`:
  ```javascript
  experimental: {
    reactCompiler: true
  }
  ```
- Configure Babel plugin for React Compiler
- Monitor build output for compiler warnings
- Test thoroughly to ensure compiler optimizations work correctly
- Document cases where manual optimization is still beneficial

## Related Decisions

- [ADR-001: Use Next.js 15 with App Router](./ADR-001-nextjs-15-app-router.md)
- [ADR-003: Use Turbopack for Development](./ADR-003-turbopack.md)

## References

- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [Next.js React Compiler Integration](https://nextjs.org/docs/app/api-reference/next-config-js/reactCompiler)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
