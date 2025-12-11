# ADR-001: Use React Router v7 for SSR

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #framework #react-router #ssr #routing

---

## Context

We need a robust routing and rendering solution for building server-side rendered React applications that provides:

- Server-side rendering for improved SEO and initial page load
- Client-side navigation for fast subsequent page loads
- Type-safe route definitions
- Data loading patterns that work on both server and client
- Modern React features support
- Good performance

The framework choice is fundamental to the application architecture and affects how data is loaded, components are rendered, and the overall user experience.

## Decision

We will use **React Router v7** with server-side rendering capabilities as the foundation for this SSR template.

## Rationale

React Router v7 with SSR provides:

1. **SSR Support**: Built-in server-side rendering without complex setup
2. **Type Safety**: Excellent TypeScript support with type-safe route definitions
3. **Data Loading**: Unified data loading patterns work on both server and client
4. **Performance**: Initial SSR with hydration, then fast client-side navigation
5. **Developer Experience**: File-based routing with remix-flat-routes
6. **Flexibility**: Less opinionated than Next.js, more control over architecture
7. **Modern Standards**: Built on Web Fetch API and modern web standards
8. **SEO Benefits**: Server-side rendering improves search engine indexing

## Consequences

### Positive Consequences
- Server-side rendering for better SEO and initial page load
- Fast client-side navigation after initial load
- Type-safe routing prevents navigation errors
- Unified data loading patterns reduce code duplication
- Less framework lock-in than Next.js
- Can deploy to various Node.js environments
- Good balance of features and flexibility

### Negative Consequences / Trade-offs
- More complex deployment than pure SPA (requires Node.js server)
- Need to understand server/client boundary
- More complex than SPA architecture
- Server costs for SSR
- Need to handle server-side state properly

### Risks and Mitigations
- **Risk**: SSR adds complexity to application architecture
  - **Mitigation**: Provide clear documentation and examples of SSR patterns
- **Risk**: React Router v7 SSR is relatively new
  - **Mitigation**: Backed by Remix team (now part of Shopify), strong support
- **Risk**: Developer confusion about server/client boundaries
  - **Mitigation**: Clear code organization and documentation

## Alternatives Considered

### Alternative 1: Next.js
- **Description**: Use Next.js App Router for SSR
- **Pros**: 
  - More mature SSR solution
  - Excellent documentation
  - Large ecosystem
  - Built-in optimizations
- **Cons**: 
  - More opinionated and restrictive
  - Framework lock-in
  - Vercel-centric deployment story
  - Server Components model is different
- **Reason for rejection**: React Router provides more flexibility while still offering SSR

### Alternative 2: Remix
- **Description**: Use Remix framework (React Router's predecessor)
- **Pros**: 
  - Excellent SSR support
  - Great data loading patterns
  - Good developer experience
- **Cons**: 
  - React Router v7 is the evolution of Remix
  - Remix is being merged into React Router
- **Reason for rejection**: React Router v7 is the future of Remix

### Alternative 3: Vite SSR
- **Description**: Build custom SSR solution with Vite
- **Pros**: 
  - Full control over architecture
  - Minimal abstraction
- **Cons**: 
  - Significant development effort
  - Need to solve routing, data loading, etc. manually
  - Maintenance burden
- **Reason for rejection**: React Router provides battle-tested solution

### Alternative 4: Pure SPA
- **Description**: Use SPA-only approach (see react-router-v7-spa template)
- **Pros**: 
  - Simpler architecture
  - Can deploy to static hosting
  - No server costs
- **Cons**: 
  - SEO challenges
  - Slower initial page load
  - No SSR benefits
- **Reason for rejection**: Use SPA template if SSR is not needed

## Implementation Notes

- Use file-based routing with `remix-flat-routes` for intuitive structure
- Implement proper data loading with loaders for SSR
- Configure server entry point for Node.js deployment
- Use proper hydration patterns for client-side
- Implement error boundaries for both server and client errors

### Server Entry Structure
```typescript
// server.ts
import { createRequestHandler } from '@react-router/node';
import express from 'express';

const app = express();
app.all('*', createRequestHandler({ build: () => import('./build/server') }));
```

## Related Decisions

- [ADR-002: Use Vite as Build Tool](./ADR-002-vite-build-tool.md)
- [ADR-003: Use React 19 with React Compiler](./ADR-003-react-19-compiler.md)

## References

- [React Router v7 Documentation](https://reactrouter.com/)
- [React Router SSR Guide](https://reactrouter.com/start/framework/rendering)
- [remix-flat-routes Documentation](https://github.com/kiliman/remix-flat-routes)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
