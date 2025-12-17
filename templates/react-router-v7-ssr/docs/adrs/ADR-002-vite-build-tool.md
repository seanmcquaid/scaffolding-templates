# ADR-002: Use Vite as Build Tool

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #build-tool #vite #performance #dx

---

## Context

The build tool is critical for developer experience and application performance. We need a build tool that provides:

- Fast development server with instant HMR
- Efficient production builds
- Good plugin ecosystem
- Modern JavaScript/TypeScript support
- Integration with React Router v7
- Excellent developer experience

## Decision

We will use **Vite 7** as the build tool for this React Router v7 SPA template.

## Rationale

Vite provides:

1. **Speed**: Lightning-fast dev server startup using native ES modules
2. **HMR**: Instant hot module replacement regardless of app size
3. **Modern**: Built for modern web development with ES modules
4. **Performance**: Optimized production builds with Rollup
5. **DX**: Excellent developer experience out of the box
6. **Ecosystem**: Rich plugin ecosystem for various needs
7. **React Router Integration**: Official support from React Router team

## Consequences

### Positive Consequences
- Near-instant dev server startup
- Fast hot module replacement (HMR)
- Optimized production bundles
- Simple configuration
- Excellent TypeScript support
- Good plugin ecosystem
- Modern development experience

### Negative Consequences / Trade-offs
- Different behavior between dev (esbuild) and prod (Rollup)
- Some legacy packages may have compatibility issues
- Less mature than Webpack for complex edge cases

### Risks and Mitigations
- **Risk**: Dev/prod parity issues due to different bundlers
  - **Mitigation**: Test production builds regularly, use similar configs
- **Risk**: Plugin compatibility issues
  - **Mitigation**: Stick to well-maintained plugins, test thoroughly

## Alternatives Considered

### Alternative 1: Webpack
- **Description**: Traditional bundler with extensive ecosystem
- **Pros**: 
  - Very mature and battle-tested
  - Huge plugin ecosystem
  - Well-documented edge cases
- **Cons**: 
  - Slower development server
  - More complex configuration
  - Slower HMR
- **Reason for rejection**: Vite provides significantly better DX

### Alternative 2: Parcel
- **Description**: Zero-config bundler
- **Pros**: 
  - Zero configuration
  - Good performance
  - Simple to use
- **Cons**: 
  - Less flexible than Vite
  - Smaller ecosystem
  - Less control over build process
- **Reason for rejection**: Vite offers better balance of simplicity and control

### Alternative 3: esbuild
- **Description**: Extremely fast bundler written in Go
- **Pros**: 
  - Fastest bundler available
  - Simple API
  - Good for development
- **Cons**: 
  - Limited plugin ecosystem
  - Less suitable for complex production builds
  - Missing some features needed for production
- **Reason for rejection**: Vite uses esbuild under the hood and adds missing features

## Implementation Notes

Configure Vite with React Router plugin:

```typescript
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
});
```

Enable code splitting and optimizations in production builds.

## Related Decisions

- [ADR-001: Use React Router v7 for SPA](./ADR-001-react-router-v7-spa.md)
- [ADR-003: Use React 19 with React Compiler](./ADR-003-react-19-compiler.md)

## References

- [Vite Documentation](https://vitejs.dev/)
- [React Router Vite Plugin](https://reactrouter.com/start/framework/installation)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
