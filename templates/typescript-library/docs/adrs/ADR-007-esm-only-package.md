# ADR-007: ESM-Only Package Output

**Status**: Accepted

**Date**: 2026-09-25

**Decision Makers**: Template Author

**Tags**: #esm #package #typescript

---

## Context

The TypeScript library template currently builds JavaScript modules with tsdown's default ESM output. Its package metadata points to that output, but its README and earlier ADRs claim that it also produces CommonJS. Maintaining that mismatch gives template users an inaccurate picture of the published package and can lead them to depend on an entry point that does not exist.

## Decision

The template publishes ESM output only. The package export map exposes the ESM entry point and its declaration file. CommonJS consumers are not supported by this template.

## Rationale

- The configured build already produces ESM and does not emit a CommonJS entry point.
- ESM-only output keeps the build and package contract aligned without introducing a second module format and its additional output checks.
- Consumers using CommonJS can choose a different library template or add a CommonJS build as an explicit project requirement.

## Consequences

### Positive Consequences

- Documentation, package metadata, and build output describe the same contract.
- The package has one JavaScript output format to maintain.
- The export map allows ESM and TypeScript-aware tooling to resolve the package explicitly.

### Negative Consequences / Trade-offs

- CommonJS-only consumers cannot load the package through `require()`.
- The package validation command ignores the `cjs-resolves-to-esm` warning because the package intentionally provides ESM only.

## Implementation Notes

The package uses `"type": "module"` and exports `./dist/index.js` for the `import` condition, plus `./dist/index.d.ts` for types. `pnpm check-types` runs `@arethetypeswrong/cli` on the packed package and ignores the CommonJS-to-ESM resolution warning that is expected for this contract.

## Related Decisions

- [ADR-001: Use tsdown for Library Builds](./ADR-001-tsdown-build-tool.md)
- [ADR-002: Dual Package Support (ESM + CJS)](./ADR-002-dual-package-support.md) (superseded)
- [ADR-006: Bundle Size Monitoring](./ADR-006-bundle-monitoring.md)
