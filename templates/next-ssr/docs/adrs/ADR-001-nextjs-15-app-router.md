# ADR-001: Use Next.js 15 with App Router

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #framework #nextjs #ssr #routing

---

## Context

We need a robust framework for building server-side rendered React applications that provides excellent developer experience, performance, and modern features. The application needs to support:

- Server-side rendering (SSR) for improved initial page load and SEO
- Server Components for reduced client-side JavaScript
- File-based routing for intuitive navigation structure
- API routes for backend functionality
- Excellent TypeScript support
- Production-ready deployment capabilities

The framework choice is fundamental to the entire template architecture and will affect all other technical decisions.

## Decision

We will use **Next.js 15** with the **App Router** as the foundation for this server-side rendered template.

## Rationale

Next.js 15 with App Router provides:

1. **Modern React Features**: Full support for React 19, Server Components, and Suspense boundaries
2. **Performance**: Automatic code splitting, optimized builds, and server-side rendering
3. **Developer Experience**: File-based routing, TypeScript support, Fast Refresh, and Turbopack
4. **SEO Benefits**: Server-side rendering and static generation for better search engine indexing
5. **Flexibility**: Support for multiple rendering strategies (SSR, SSG, ISR) in the same application
6. **Production Ready**: Battle-tested by thousands of companies with excellent deployment options
7. **Ecosystem**: Large community, extensive documentation, and rich plugin ecosystem

## Consequences

### Positive Consequences
- Built-in SSR without complex configuration
- Excellent performance out of the box with automatic optimizations
- Strong TypeScript support with type-safe routing
- Server Components reduce client-side JavaScript bundle
- Seamless integration with Vercel for deployment
- Built-in image optimization and font loading
- Comprehensive documentation and community support

### Negative Consequences / Trade-offs
- Learning curve for developers unfamiliar with App Router paradigm
- Server Components model requires understanding of client/server boundaries
- Framework lock-in - migration to other frameworks would be significant effort
- Some third-party libraries may not be compatible with Server Components
- Requires Node.js runtime for deployment (not suitable for static-only hosting)

### Risks and Mitigations
- **Risk**: App Router is relatively new and best practices are still evolving
  - **Mitigation**: Follow official Next.js documentation and stay updated with releases
- **Risk**: Over-reliance on framework-specific features may limit portability
  - **Mitigation**: Keep business logic separate from framework code where possible

## Alternatives Considered

### Alternative 1: Remix
- **Description**: Full-stack React framework with focus on web fundamentals
- **Pros**: 
  - Excellent data loading patterns with loaders
  - Strong focus on progressive enhancement
  - Built-in form handling
- **Cons**: 
  - Smaller ecosystem compared to Next.js
  - Less mature tooling and deployment options
  - No Server Components support at the time
- **Reason for rejection**: Next.js has larger ecosystem, better deployment options, and Server Components support

### Alternative 2: Create React App with Custom SSR
- **Description**: Build custom SSR solution on top of CRA
- **Pros**: 
  - Complete control over architecture
  - No framework lock-in
- **Cons**: 
  - Significant development effort required
  - Need to implement routing, SSR, optimization manually
  - Maintenance burden for custom infrastructure
- **Reason for rejection**: Reinventing the wheel when Next.js provides battle-tested solution

### Alternative 3: Vite with vite-plugin-ssr
- **Description**: Use Vite with SSR plugin for server-side rendering
- **Pros**: 
  - Faster dev server than Next.js (without Turbopack)
  - More flexible and un-opinionated
- **Cons**: 
  - Less integrated solution requiring more setup
  - Smaller community and ecosystem
  - More manual configuration required
- **Reason for rejection**: Next.js provides more complete, integrated solution with better DX

## Implementation Notes

- Use App Router (`/app` directory) instead of Pages Router
- Leverage Server Components as default for better performance
- Use `'use client'` directive only when necessary for client-side interactivity
- Follow Next.js conventions for file organization (page.tsx, layout.tsx, etc.)
- Utilize built-in optimizations (Image, Font, Script components)

## Related Decisions

- [ADR-002: Use React 19 with React Compiler](./ADR-002-react-19-compiler.md)
- [ADR-003: Use Turbopack for Development](./ADR-003-turbopack.md)

## References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Server Components Documentation](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
