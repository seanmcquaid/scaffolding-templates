# ADR-001: Use tsdown for Library Builds

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #build-tool #typescript #library #bundling

---

## Context

TypeScript libraries need a build tool that can:

- Generate both ESM and CommonJS outputs
- Produce TypeScript declaration files (.d.ts)
- Handle modern TypeScript features
- Be fast and reliable
- Support proper package.json exports
- Tree-shakeable output

The build tool choice affects the library's usability, bundle size for consumers, and developer experience.

## Decision

We will use **tsdown** (based on esbuild) for building this TypeScript library.

## Rationale

tsdown provides:

1. **Speed**: Extremely fast builds powered by esbuild
2. **Dual Output**: Easy ESM + CJS generation with proper configuration
3. **Type Generation**: Built-in TypeScript declaration file generation
4. **Modern**: Supports latest TypeScript and JavaScript features
5. **Simple Config**: Minimal configuration required
6. **Bundle Analysis**: Can analyze output bundle composition
7. **Tree-Shaking**: Produces tree-shakeable ESM output

## Consequences

### Positive Consequences
- Very fast build times
- Clean, optimized output for both ESM and CJS
- Automatic declaration file generation
- Small configuration surface
- Good DX with watch mode
- Produces tree-shakeable code

### Negative Consequences / Trade-offs
- Less mature than older tools like Rollup or tsc
- Smaller community and ecosystem
- Fewer plugins available
- Some advanced bundling scenarios may be harder

### Risks and Mitigations
- **Risk**: tsdown is relatively new
  - **Mitigation**: Based on battle-tested esbuild, can fall back to tsc if needed
- **Risk**: Missing features compared to Rollup
  - **Mitigation**: Most library use cases are covered, evaluate needs

## Alternatives Considered

### Alternative 1: tsc (TypeScript Compiler)
- **Description**: Use TypeScript's own compiler
- **Pros**: 
  - Official TypeScript tool
  - Most compatible
  - Well-documented
  - No third-party dependencies
- **Cons**: 
  - Slower than esbuild-based tools
  - No bundling (just transpilation)
  - Need separate tool for dual package
  - More configuration needed
- **Reason for rejection**: Too slow, need separate tools for dual package

### Alternative 2: tsup
- **Description**: Another esbuild-based bundler for TypeScript
- **Pros**: 
  - Fast (esbuild-based)
  - Popular in community
  - Good documentation
  - Active maintenance
- **Cons**: 
  - More opinionated
  - Slightly larger API surface
- **Reason for rejection**: tsdown is cleaner and more focused

### Alternative 3: Rollup
- **Description**: Traditional JavaScript bundler
- **Pros**: 
  - Very mature and stable
  - Excellent plugin ecosystem
  - Great for libraries
  - Highly configurable
- **Cons**: 
  - Slower than esbuild-based tools
  - More complex configuration
  - Need additional plugins for TypeScript
- **Reason for rejection**: Slower, more complex configuration

### Alternative 4: Vite Library Mode
- **Description**: Use Vite's library mode
- **Pros**: 
  - Fast (uses esbuild and Rollup)
  - Good DX
  - Part of Vite ecosystem
- **Cons**: 
  - Designed more for apps than libraries
  - Heavier than needed for simple library
- **Reason for rejection**: Overkill for library bundling

## Implementation Notes

### Build Configuration
```typescript
// package.json
{
  "scripts": {
    "build": "tsdown src/index.ts --dts --format esm,cjs"
  }
}
```

### Package Exports
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

## Related Decisions

- [ADR-002: Dual Package Support (ESM + CJS)](./ADR-002-dual-package-support.md)
- [ADR-003: Testing Strategy with Vitest](./ADR-003-testing-strategy.md)

## References

- [tsdown Documentation](https://tsdown.vercel.app/)
- [esbuild Documentation](https://esbuild.github.io/)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
