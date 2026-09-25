# Architectural Decision Records (ADRs)

This directory contains Architectural Decision Records (ADRs) for this project template. ADRs document important architectural decisions made during the development of this template, including the context, considered alternatives, and rationale behind each decision.

## What is an ADR?

An Architectural Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences. It helps maintain a historical record of why certain technical choices were made, which is valuable for:

- Understanding the reasoning behind current architecture
- Onboarding new team members
- Reviewing past decisions as the project evolves
- Avoiding revisiting already-decided questions

## ADR Format

Each ADR follows a consistent structure:

1. **Title**: A short, descriptive title (e.g., "ADR-001: Use tsdown for builds")
2. **Status**: Current status (Proposed, Accepted, Deprecated, Superseded)
3. **Context**: The circumstances and factors that led to this decision
4. **Decision**: The specific choice that was made
5. **Consequences**: The positive and negative outcomes of this decision
6. **Alternatives Considered**: Other options that were evaluated

## Creating a New ADR

1. Copy `ADR-000-template.md` to create a new ADR
2. Name it with the next sequential number: `ADR-XXX-short-title.md`
3. Fill in all sections with relevant information
4. Update the status as the decision evolves
5. Commit the ADR along with related code changes

## ADR Index

- [ADR-000: Template](./ADR-000-template.md) - Template for new ADRs
- [ADR-001: Use tsdown for Library Builds](./ADR-001-tsdown-build-tool.md)
- [ADR-002: Dual Package Support (ESM + CJS)](./ADR-002-dual-package-support.md)
- [ADR-003: Testing Strategy with Vitest](./ADR-003-testing-strategy.md)
- [ADR-004: Publishing with Changesets](./ADR-004-changesets-publishing.md)
- [ADR-005: Code Quality Tooling](./ADR-005-code-quality.md)
- [ADR-006: Bundle Size Monitoring](./ADR-006-bundle-monitoring.md)

## Resources

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
