# ADR-004: Publishing with Changesets

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #publishing #versioning #npm #automation

---

## Context

Libraries need a reliable way to manage versions and publish to npm. We need:

- Semantic versioning
- Automatic changelog generation
- GitHub Actions integration for automated publishing
- Clear release process
- Version bump coordination with changes

## Decision

We will use **Changesets** for version management and publishing automation via GitHub Actions.

## Rationale

Changesets provides:

1. **Developer-Friendly**: Simple CLI for adding changelogs with commits
2. **Automation**: GitHub Actions integration for automatic releases
3. **Flexibility**: Works with monorepos and single packages
4. **Changelog**: Auto-generates CHANGELOG.md
5. **SemVer**: Enforces semantic versioning
6. **Git Integration**: Integrates with Git workflow naturally

## Consequences

### Positive Consequences
- Automated releases via GitHub Actions
- Clear changelog for every change
- Semantic versioning enforced
- Simple developer workflow
- Professional release process

### Negative Consequences / Trade-offs
- Need to remember to add changesets for changes
- Requires GitHub Actions secrets configuration
- Extra step in development workflow

## Implementation Notes

### Workflow
1. Make changes to code
2. Run `pnpm changeset` to document change
3. Commit changeset file
4. Push to main branch
5. GitHub Action creates release PR
6. Merge release PR to publish

### GitHub Secrets Required
- `GITHUB_TOKEN` - For creating release PRs
- `NPM_TOKEN` - For publishing to npm

## Related Decisions

- [ADR-001: Use tsdown for Library Builds](./ADR-001-tsdown-build-tool.md)

## References

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Publishing to npm Guide](../publishing-to-npm.md)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
