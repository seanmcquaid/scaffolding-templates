# ADR-002: Dual Package Support (ESM + CJS)

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #esm #commonjs #package #compatibility

---

## Context

JavaScript libraries need to support multiple module systems to be usable across different environments:

- ESM (ECMAScript Modules) - Modern standard, tree-shakeable
- CommonJS (CJS) - Legacy format, still widely used in Node.js

We need to decide which formats to support and how to configure the package for maximum compatibility.

## Decision

We will provide **dual package support**, generating both ESM and CommonJS outputs with proper `package.json` exports configuration.

## Rationale

Dual package support provides:

1. **Maximum Compatibility**: Works in both modern and legacy environments
2. **Tree-Shaking**: ESM output enables tree-shaking for consumers
3. **Modern Standard**: ESM is the future of JavaScript modules
4. **Legacy Support**: CommonJS for older tools and environments
5. **Type Safety**: TypeScript declarations work with both formats
6. **Best Practices**: Follows modern package.json exports spec

## Consequences

### Positive Consequences
- Library works in all JavaScript environments
- Consumers get tree-shaking benefits with ESM
- Backward compatibility with CommonJS tools
- Future-proof with ESM as the standard
- Proper package resolution with exports field

### Negative Consequences / Trade-offs
- Larger npm package size (includes both formats)
- Need to test both module formats
- Slightly more complex build configuration
- Must avoid dual package hazards

### Risks and Mitigations
- **Risk**: Dual package hazards (same code imported differently)
  - **Mitigation**: Ensure stateless exports, test both formats
- **Risk**: Increased package size
  - **Mitigation**: Both outputs are small, benefits outweigh cost

## Alternatives Considered

### Alternative 1: ESM Only
- **Description**: Only provide ESM output
- **Pros**: 
  - Simpler build and package
  - Smaller package size
  - Modern and future-proof
  - Better tree-shaking by default
- **Cons**: 
  - Breaks compatibility with CommonJS-only tools
  - Some build tools still expect CommonJS
  - May require workarounds from consumers
- **Reason for rejection**: Breaks too many existing tools and workflows

### Alternative 2: CommonJS Only
- **Description**: Only provide CommonJS output
- **Pros**: 
  - Maximum compatibility
  - Simpler than dual package
  - Well-understood format
- **Cons**: 
  - No tree-shaking for consumers
  - Not future-proof
  - Larger bundle sizes for consumers
  - Against modern best practices
- **Reason for rejection**: Misses tree-shaking benefits, not future-proof

### Alternative 3: Transpile on Install
- **Description**: Ship TypeScript source, transpile during install
- **Pros**: 
  - No pre-built output needed
  - Consumers get exactly what they need
- **Cons**: 
  - Slow install times
  - Requires TypeScript in consumer project
  - Complex setup
  - Not standard practice
- **Reason for rejection**: Poor user experience, non-standard

## Implementation Notes

### Package.json Configuration
```json
{
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.cjs"
      }
    }
  },
  "files": [
    "dist"
  ]
}
```

### Build Output
```
dist/
  index.mjs        # ESM output
  index.cjs        # CommonJS output
  index.d.ts       # TypeScript declarations
```

### Testing Both Formats
Test imports work correctly:
```bash
# Test ESM
node --input-type=module -e "import pkg from './dist/index.mjs'"

# Test CJS
node -e "const pkg = require('./dist/index.cjs')"
```

## Related Decisions

- [ADR-001: Use tsdown for Library Builds](./ADR-001-tsdown-build-tool.md)
- [ADR-006: Bundle Size Monitoring](./ADR-006-bundle-monitoring.md)

## References

- [Node.js Package Exports](https://nodejs.org/api/packages.html#exports)
- [Dual Package Guide](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)
- [ESM/CJS Interoperability](https://nodejs.org/api/esm.html#interoperability-with-commonjs)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
