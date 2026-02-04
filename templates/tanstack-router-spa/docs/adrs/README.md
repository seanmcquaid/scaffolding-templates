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

1. **Title**: A short, descriptive title (e.g., "ADR-001: Use TanStack Router")
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
- [ADR-001: Use TanStack Router for SPA](./ADR-001-tanstack-router-spa.md)
- [ADR-002: Use Vite as Build Tool](./ADR-002-vite-build-tool.md)
- [ADR-003: Use React 19 with React Compiler](./ADR-003-react-19-compiler.md)
- [ADR-004: Type-Safe Internationalization with i18next](./ADR-004-i18n-strategy.md)
- [ADR-005: Testing Strategy with Vitest and Playwright](./ADR-005-testing-strategy.md)
- [ADR-006: State Management Approach](./ADR-006-state-management.md)
- [ADR-007: Use Tailwind CSS with shadcn/ui](./ADR-007-styling-approach.md)
- [ADR-008: API Client with ky and Zod](./ADR-008-api-client.md)
- [ADR-009: Form Handling with React Hook Form](./ADR-009-form-handling.md)
- [ADR-010: Code Quality Tooling](./ADR-010-code-quality.md)
- [ADR-011: TanStack Query v5 Best Practices](./ADR-011-tanstack-query-best-practices.md)

## Resources

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
