# ADR-001: Use React Router v7 for SPA

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #framework #react-router #spa #routing

---

## Context

We need a robust routing solution for building a single-page application (SPA) with React that provides:

- Client-side routing for fast navigation
- Type-safe route definitions
- Excellent developer experience
- Data loading patterns
- Modern React features support
- Good performance

The routing solution is fundamental to the application architecture and affects how data is loaded, components are organized, and the overall user experience.

## Decision

We will use **React Router v7** as the routing framework for this single-page application template.

## Rationale

React Router v7 provides:

1. **Modern Architecture**: Built on Web Fetch API and modern web standards
2. **Type Safety**: Excellent TypeScript support with type-safe route definitions
3. **Data Loading**: Built-in data loading patterns with loaders
4. **Performance**: Optimized bundle splitting and lazy loading
5. **Developer Experience**: File-based routing with remix-flat-routes
6. **Maturity**: Battle-tested with millions of users
7. **Framework Agnostic**: Can be used with any React setup
8. **SPA Optimized**: Designed for client-side rendering applications

## Consequences

### Positive Consequences
- Fast client-side navigation without page reloads
- Type-safe routing prevents navigation errors
- Built-in data loading patterns reduce boilerplate
- Excellent performance with code splitting
- Large community and ecosystem
- Comprehensive documentation
- Framework flexibility (not locked to a specific meta-framework)

### Negative Consequences / Trade-offs
- Client-side only - no SSR benefits (SEO, initial load)
- Initial JavaScript bundle required before app is interactive
- Complex applications may have larger initial bundle
- Learning curve for developers unfamiliar with React Router v7
- Data loading happens client-side, increasing perceived latency

### Risks and Mitigations
- **Risk**: Large initial bundle size impacts performance
  - **Mitigation**: Implement code splitting, lazy loading, and route-based chunking
- **Risk**: SEO challenges with client-side rendering
  - **Mitigation**: Consider SSR template if SEO is critical, use pre-rendering for static content
- **Risk**: React Router v7 is relatively new
  - **Mitigation**: Backed by Remix team with strong commitment, migration path from v6 is smooth

## Alternatives Considered

### Alternative 1: TanStack Router
- **Description**: Type-first router with comprehensive features
- **Pros**: 
  - Excellent TypeScript support
  - Powerful search params handling
  - Modern features like route masking
- **Cons**: 
  - Smaller community and ecosystem
  - Less mature than React Router
  - Fewer third-party integrations
- **Reason for rejection**: React Router has larger ecosystem and proven track record

### Alternative 2: Wouter
- **Description**: Lightweight routing library
- **Pros**: 
  - Very small bundle size (~1.5KB)
  - Simple API
  - Fast
- **Cons**: 
  - Limited features
  - No built-in data loading
  - Less suitable for complex applications
  - Smaller ecosystem
- **Reason for rejection**: Too minimal for a comprehensive template

### Alternative 3: React Location
- **Description**: TanStack Router's predecessor
- **Pros**: 
  - Good TypeScript support
  - Flexible API
- **Cons**: 
  - Deprecated in favor of TanStack Router
  - No longer maintained
- **Reason for rejection**: Deprecated and replaced by TanStack Router

### Alternative 4: Next.js (App Router)
- **Description**: Use Next.js as an SPA framework
- **Pros**: 
  - Can be exported as static SPA
  - Rich feature set
  - Good developer experience
- **Cons**: 
  - Designed for SSR, overkill for pure SPA
  - Framework lock-in
  - Larger bundle and complexity
- **Reason for rejection**: Use dedicated Next.js template for SSR needs

## Implementation Notes

- Use file-based routing with `remix-flat-routes` for intuitive structure
- Implement route-based code splitting for optimal performance
- Use loaders for data fetching to keep components clean
- Leverage React Router v7's type generation for type-safe routing
- Configure proper route preloading for better UX

### File Structure
```
app/
  routes/
    _index.tsx          # Home page (/)
    about.tsx           # About page (/about)
    users.$id.tsx       # Dynamic route (/users/:id)
    users._index.tsx    # Users list (/users)
```

## Related Decisions

- [ADR-002: Use Vite as Build Tool](./ADR-002-vite-build-tool.md)
- [ADR-003: Use React 19 with React Compiler](./ADR-003-react-19-compiler.md)

## References

- [React Router v7 Documentation](https://reactrouter.com/)
- [React Router v7 Release Notes](https://remix.run/blog/react-router-v7)
- [remix-flat-routes Documentation](https://github.com/kiliman/remix-flat-routes)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
