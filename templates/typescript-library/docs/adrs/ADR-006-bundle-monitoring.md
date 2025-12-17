# ADR-006: Bundle Size Monitoring

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #performance #bundle-size #monitoring

---

## Context

Library bundle size directly impacts every consumer's application. We need:

- Automated bundle size monitoring
- Alerts when bundle grows too large
- Tree-shaking validation
- Prevention of bundle bloat

## Decision

We will use **bundlesize** for automated bundle size monitoring with limits defined in package.json.

## Rationale

Automated monitoring prevents accidental bundle bloat and ensures the library stays performant for all consumers.

## Consequences

### Positive Consequences
- Prevents bundle bloat
- Clear limits for bundle size
- CI/CD integration prevents bad releases
- Raises awareness of size impact

### Negative Consequences / Trade-offs
- Need to adjust limits as features are added
- May restrict some dependencies

## Implementation Notes

```json
{
  "bundlesize": [
    {
      "path": "./dist/*.{mjs,cjs}",
      "maxSize": "10 kB"
    }
  ]
}
```

## Related Decisions

- [ADR-002: Dual Package Support](./ADR-002-dual-package-support.md)

## References

- [bundlesize Documentation](https://github.com/siddharthkp/bundlesize)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
