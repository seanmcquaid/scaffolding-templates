# ADR-001: Use TanStack Router for SPA

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #framework #tanstack-router #spa #routing #type-safety

---

## Context

We need a type-first routing solution for building a single-page application (SPA) with React that provides:

- Extreme type safety for routes, params, and search params
- Client-side routing for fast navigation
- Modern React features support
- Excellent developer experience
- Advanced features like route masking and view transitions
- Good performance

For applications where type safety is paramount and we want cutting-edge routing features, we need a router that pushes the boundaries of what's possible with TypeScript.

## Decision

We will use **TanStack Router** as the routing framework for this single-page application template.

## Rationale

TanStack Router provides:

1. **Type Safety**: Industry-leading type safety for routes, params, search params, and loaders
2. **Modern Features**: Advanced capabilities like route masking, parallel routes, and view transitions
3. **Search Params**: First-class, type-safe search params handling with validation
4. **Developer Experience**: Excellent DX with route generation and auto-completion
5. **Performance**: Optimized bundle splitting and preloading
6. **TanStack Ecosystem**: Seamless integration with TanStack Query
7. **Innovation**: Cutting-edge features not available in other routers
8. **File-based Routing**: Intuitive file-based routing with code generation

## Consequences

### Positive Consequences
- Best-in-class TypeScript support with full type safety
- Advanced routing features like route masking
- Powerful search params handling with validation
- Excellent integration with TanStack Query
- Auto-generated route tree for type safety
- Fast client-side navigation
- Future-proof with modern web standards

### Negative Consequences / Trade-offs
- Smaller community compared to React Router
- Less third-party ecosystem and integrations
- Steeper learning curve for advanced features
- Newer library with less production usage
- More opinionated than React Router
- Client-side only - no SSR (use Next.js or React Router SSR for SSR)

### Risks and Mitigations
- **Risk**: Smaller community may mean fewer resources
  - **Mitigation**: Excellent official documentation, TanStack Discord community
- **Risk**: Library is relatively new
  - **Mitigation**: Backed by TanStack team with proven track record (TanStack Query)
- **Risk**: Breaking changes in early versions
  - **Mitigation**: Lock to specific version, follow migration guides

## Alternatives Considered

### Alternative 1: React Router v7
- **Description**: Industry standard React router
- **Pros**: 
  - Larger community and ecosystem
  - More mature and battle-tested
  - Better documentation and examples
  - Easier to find developers with experience
- **Cons**: 
  - Less type-safe than TanStack Router
  - Fewer advanced features
  - Search params handling is more manual
- **Reason for rejection**: TanStack Router provides superior type safety for type-first projects

### Alternative 2: Next.js App Router
- **Description**: Use Next.js as an SPA framework
- **Pros**: 
  - Can be exported as static SPA
  - Rich feature set
  - Large ecosystem
- **Cons**: 
  - Designed for SSR, overkill for pure SPA
  - More opinionated
  - Framework lock-in
- **Reason for rejection**: Use dedicated Next.js template for SSR needs

### Alternative 3: Wouter
- **Description**: Minimal routing library
- **Pros**: 
  - Very small bundle size
  - Simple API
  - Fast
- **Cons**: 
  - Limited features
  - No type safety
  - Too minimal for complex applications
- **Reason for rejection**: Need advanced features and type safety

## Implementation Notes

### Route Tree Generation
```bash
# Generate route tree for type safety
pnpm exec tsx ./src/route-tree.gen.ts
```

### File Structure
```
src/
  routes/
    __root.tsx          # Root route
    index.tsx           # Home page (/)
    about.tsx           # About page (/about)
    users.$id.tsx       # Dynamic route (/users/:id)
    users.index.tsx     # Users list (/users)
```

### Type-Safe Navigation
```tsx
import { useNavigate } from '@tanstack/react-router';

const Component = () => {
  const navigate = useNavigate();
  
  // Type-safe navigation with params
  navigate({
    to: '/users/$id',
    params: { id: '123' },
    search: { tab: 'profile' }, // Type-safe search params
  });
};
```

### Search Params Validation
```tsx
import { z } from 'zod';

const searchSchema = z.object({
  page: z.number().default(1),
  search: z.string().optional(),
});

export const Route = createFileRoute('/users')({
  validateSearch: searchSchema,
});
```

## Related Decisions

- [ADR-002: Use Vite as Build Tool](./ADR-002-vite-build-tool.md)
- [ADR-003: Use React 19 with React Compiler](./ADR-003-react-19-compiler.md)
- [ADR-006: State Management Approach](./ADR-006-state-management.md) - TanStack Query integration

## References

- [TanStack Router Documentation](https://tanstack.com/router/)
- [TanStack Router GitHub](https://github.com/TanStack/router)
- [TanStack Router Discord](https://discord.gg/tanstack)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
