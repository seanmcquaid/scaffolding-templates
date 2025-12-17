# ADR-003: Use Turbopack for Development

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #build-tool #performance #dx

---

## Context

The development build tool significantly impacts developer experience through build speed, hot module replacement (HMR) speed, and startup time. For a modern Next.js application, we need to choose between:

- Turbopack (Next.js's new Rust-based bundler)
- Webpack (traditional Next.js bundler)

Fast iteration cycles are critical for developer productivity, especially as the application grows.

## Decision

We will use **Turbopack** for development builds in this template.

## Rationale

Turbopack provides:

1. **Speed**: Up to 700x faster updates than Webpack for large applications
2. **Fast Cold Starts**: Much faster initial startup compared to Webpack
3. **Optimized HMR**: Near-instant hot module replacement
4. **Future-Proof**: Next.js's official bundler going forward
5. **Rust Performance**: Built with Rust for maximum performance
6. **Native Integration**: Deep integration with Next.js features

Development speed directly impacts developer productivity and satisfaction, making this a high-value optimization.

## Consequences

### Positive Consequences
- Significantly faster development server startup
- Near-instant hot module replacement (HMR)
- Better performance as the application grows
- Improved developer experience and productivity
- Aligned with Next.js's future direction

### Negative Consequences / Trade-offs
- Turbopack is newer and less battle-tested than Webpack
- Some Webpack plugins may not have Turbopack equivalents yet
- May encounter edge cases or bugs
- Less community resources for troubleshooting

### Risks and Mitigations
- **Risk**: Turbopack may have compatibility issues with some dependencies
  - **Mitigation**: Fall back to Webpack if critical issues arise, report bugs to Next.js team
- **Risk**: Missing features compared to mature Webpack ecosystem
  - **Mitigation**: Evaluate plugin needs early, most common use cases are covered

## Alternatives Considered

### Alternative 1: Webpack
- **Description**: Continue using Webpack as the development bundler
- **Pros**: 
  - Mature and battle-tested
  - Extensive plugin ecosystem
  - Well-documented
  - Known issues and solutions
- **Cons**: 
  - Slower build times, especially for large applications
  - Slower HMR
  - Configuration complexity
- **Reason for rejection**: Development speed is critical for DX, and Turbopack provides significant improvements

### Alternative 2: Vite
- **Description**: Use Vite instead of Next.js bundling
- **Pros**: 
  - Very fast development server
  - Good DX
  - Growing ecosystem
- **Cons**: 
  - Not integrated with Next.js
  - Would require significant custom configuration
  - Lose Next.js optimizations
- **Reason for rejection**: Next.js + Turbopack provides better integrated experience

## Implementation Notes

Enable Turbopack in development scripts:

```json
{
  "scripts": {
    "dev": "next dev --turbopack --turbo"
  }
}
```

Note: Production builds still use Webpack until Turbopack is production-ready, which provides the best balance of speed and stability.

## Related Decisions

- [ADR-001: Use Next.js 15 with App Router](./ADR-001-nextjs-15-app-router.md)
- [ADR-002: Use React 19 with React Compiler](./ADR-002-react-19-compiler.md)

## References

- [Turbopack Documentation](https://turbo.build/pack/docs)
- [Next.js Turbopack Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/turbo)
- [Turbopack vs Webpack Benchmark](https://turbo.build/pack/docs/benchmarks)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
