# ADR-008: API Client with ky and Zod

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #api #http #validation #type-safety

---

## Context

We need a robust solution for making HTTP requests to APIs with:
- Type-safe request and response handling
- Automatic retry logic
- Request/response validation
- Error handling
- Integration with TanStack Query
- Good developer experience

The API client is a critical piece of infrastructure that affects reliability and developer productivity.

## Decision

We will use **ky** as the HTTP client and **Zod** for request/response validation, creating type-safe API service modules that integrate with TanStack Query.

## Rationale

This combination provides:

1. **Type Safety**: Zod schemas ensure runtime validation matches TypeScript types
2. **Small Bundle**: ky is lightweight (~12KB) compared to axios (~33KB)
3. **Modern API**: Promise-based with better defaults than fetch
4. **Automatic Retry**: Built-in retry logic with exponential backoff
5. **Developer Experience**: Excellent TypeScript support and error messages
6. **Validation**: Zod catches API contract violations at runtime
7. **Integration**: Works seamlessly with TanStack Query

## Consequences

### Positive Consequences
- Type-safe API calls with runtime validation
- Catches API contract violations early
- Small bundle size impact
- Automatic retry for transient failures
- Better error messages than native fetch
- Self-documenting API schemas with Zod
- Prevents invalid data from reaching components

### Negative Consequences / Trade-offs
- Need to write Zod schemas for all API responses
- Validation adds small runtime overhead
- Learning curve for Zod schema syntax
- More verbose than simple fetch calls
- Additional maintenance for schema definitions

### Risks and Mitigations
- **Risk**: Zod schemas may get out of sync with actual API
  - **Mitigation**: Generate schemas from OpenAPI spec if available, test API responses
- **Risk**: Validation overhead may impact performance
  - **Mitigation**: Validation is fast, benefits outweigh cost
- **Risk**: Developers may skip validation for "quick" implementations
  - **Mitigation**: Make validation easy with helper functions, enforce in code review

## Alternatives Considered

### Alternative 1: axios
- **Description**: Popular HTTP client library
- **Pros**: 
  - Widely used and well-documented
  - Rich feature set
  - Good error handling
  - Interceptor support
- **Cons**: 
  - Larger bundle size (~33KB vs ~12KB)
  - Less modern API than ky
  - Requires more configuration
- **Reason for rejection**: Larger bundle, ky has better defaults

### Alternative 2: Native fetch with tRPC
- **Description**: Use tRPC for end-to-end type safety
- **Pros**: 
  - Full type safety without runtime validation
  - Great DX for TypeScript projects
  - No need to write schemas
- **Cons**: 
  - Requires tRPC backend
  - More complex setup
  - Lock-in to tRPC ecosystem
  - Not suitable for external APIs
- **Reason for rejection**: Assumes control over backend, template should work with any API

### Alternative 3: Native fetch only
- **Description**: Use native fetch without abstraction
- **Pros**: 
  - No dependencies
  - Most lightweight option
  - Standard API
- **Cons**: 
  - Verbose error handling
  - No retry logic
  - No built-in timeout
  - More boilerplate code
- **Reason for rejection**: Poor DX, missing critical features like retry

### Alternative 4: SWR instead of TanStack Query
- **Description**: Use SWR for data fetching instead of TanStack Query
- **Pros**: 
  - Simpler API
  - Built by Vercel (Next.js team)
  - Good defaults for React
- **Cons**: 
  - Less flexible than TanStack Query
  - Fewer features (no mutations, infinite queries)
  - Smaller ecosystem
- **Reason for rejection**: TanStack Query is more feature-complete

## Implementation Notes

### API Service Pattern
```typescript
import ky from 'ky';
import { z } from 'zod';

// Define schema
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;

// API client with base configuration
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
});

// Typed API function
export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`users/${id}`).json();
  return userSchema.parse(response);
};
```

### TanStack Query Integration
```typescript
import { queryOptions } from '@tanstack/react-query';
import { getUser } from '@/services/userService';

export const userQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['users', id],
    queryFn: () => getUser(id),
  });

// Usage in component
const { data: user } = useQuery(userQueryOptions(userId));
```

### Error Handling
```typescript
import { HTTPError } from 'ky';

try {
  const user = await getUser(id);
} catch (error) {
  if (error instanceof HTTPError) {
    // Handle HTTP errors (4xx, 5xx)
    const status = error.response.status;
  } else if (error instanceof z.ZodError) {
    // Handle validation errors
    console.error('Invalid API response', error.issues);
  }
}
```

## Related Decisions

- [ADR-005: Testing Strategy with Vitest and Playwright](./ADR-005-testing-strategy.md)
- [ADR-006: State Management Approach](./ADR-006-state-management.md)

## References

- [ky Documentation](https://github.com/sindresorhus/ky)
- [Zod Documentation](https://zod.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
