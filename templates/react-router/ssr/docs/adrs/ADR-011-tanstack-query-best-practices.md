# ADR-011: TanStack Query v5 Best Practices

**Status**: Accepted  
**Date**: 2026-02-04

**Decision Makers**: Template Author

**Tags**: #state-management #tanstack-query #server-state #performance

---

## Context

TanStack Query (formerly React Query) v5 introduced several breaking changes and new best practices that improve type safety, performance, and developer experience. As our templates already use TanStack Query v5.90.20, we need to document the patterns and best practices to ensure consistency and help developers use the library effectively.

Key considerations:
- All templates use TanStack Query for server state management
- v5 deprecated `onSuccess`, `onError`, `onSettled` callbacks in queries
- v5 requires single-object syntax for all hooks
- Better TypeScript support with enhanced type inference
- New features like `isPending`, `gcTime`, and improved infinite queries

## Decision Drivers

- **Type Safety**: Leveraging TypeScript to catch errors at compile time
- **Performance**: Optimal caching and background synchronization strategies
- **Developer Experience**: Clear, consistent patterns across all templates
- **Maintainability**: Future-proof patterns aligned with framework direction
- **Standards Compliance**: Following official TanStack Query v5 recommendations

## Decision

**We will adopt and document TanStack Query v5 best practices across all templates** with the following patterns:

### 1. Query Key Management
Use centralized, hierarchical query key factories with `as const`:

```typescript
export const postsQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...postsQueryKeys.lists(), { filters }] as const,
  details: () => [...postsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...postsQueryKeys.details(), id] as const,
} as const;
```

### 2. Query Options Factory Pattern
Use `queryOptions` helper for type-safe, reusable query definitions:

```typescript
import { queryOptions } from '@tanstack/react-query';

export const getPostQuery = (id: string) =>
  queryOptions({
    queryKey: postsQueryKeys.detail(id),
    queryFn: async () => postsService.getPost(id),
    staleTime: 60000, // Override default if needed
  });
```

### 3. Side Effects in Components (Not Queries)
Replace deprecated callbacks with `useEffect` and query state:

```typescript
// ❌ Don't use deprecated callbacks
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  onSuccess: (data) => {
    toast({ title: 'Users loaded' });
  },
});

// ✅ Use useEffect with state flags
const { data, isSuccess } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

useEffect(() => {
  if (isSuccess) {
    toast({ title: 'Users loaded' });
  }
}, [isSuccess]);
```

### 4. Mutation Pattern with Proper Invalidation
Keep mutations in components with clear cache invalidation:

```typescript
const { mutate, isPending } = useMutation({
  mutationFn: (id: string) => postsService.deletePost(id),
  onSuccess: () => {
    // Invalidate to refetch
    queryClient.invalidateQueries({
      queryKey: postsQueryKeys.lists(),
    });
    // Or optimistically update
    queryClient.setQueryData(postsQueryKeys.lists(), (old) => {
      // Update cache directly
    });
  },
});
```

### 5. Global Configuration
Use minimal global defaults, override per-query when needed:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute default
      gcTime: 300000, // 5 minutes (was cacheTime)
      retry: 1, // Retry once on failure
      refetchOnWindowFocus: false, // Disable for SPAs
    },
  },
});
```

### 6. Conditional Queries with `enabled`
Use `enabled` option for dependent or conditional queries:

```typescript
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // Only fetch when userId exists
});

const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchUserPosts(user!.id),
  enabled: !!user, // Wait for user to load
});
```

### 7. TypeScript Best Practices
- Use `as const` for query keys to preserve literal types
- Let TanStack Query infer return types from `queryFn`
- Use `queryOptions` helper for better type inference
- Avoid manual type assertions

### 8. Suspense Integration
Use `useSuspenseQuery` for better loading states:

```typescript
// Requires Error Boundary and Suspense
const { data } = useSuspenseQuery(getPostsQuery());
// data is guaranteed to be defined, no isLoading needed
```

## Rationale

This approach provides:

1. **Type Safety**: Query keys as const preserve types, enabling better autocomplete and type checking
2. **Consistency**: Query options factories centralize query configuration
3. **Maintainability**: Side effects in useEffect align with React patterns
4. **Performance**: Proper cache invalidation and stale time configuration
5. **v5 Compliance**: Follows all v5 breaking changes and recommendations
6. **Developer Experience**: Clear patterns reduce decision fatigue

## Consequences

### Positive Consequences
- ✅ All templates follow consistent TanStack Query patterns
- ✅ Better TypeScript support with proper type inference
- ✅ Easier to maintain and update queries across codebase
- ✅ Clear separation of concerns (queries, mutations, side effects)
- ✅ Proper cache management and invalidation strategies
- ✅ Future-proof against v5 deprecation warnings

### Negative Consequences / Trade-offs
- ⚠️ More boilerplate for query key factories
- ⚠️ Side effects in useEffect add extra code vs old callbacks
- ⚠️ Learning curve for developers unfamiliar with v5 changes

### Risks and Mitigations
- **Risk**: Developers may still use deprecated callback patterns
  - **Mitigation**: Clear documentation and code examples in templates
- **Risk**: Inconsistent query key patterns across files
  - **Mitigation**: Centralized query key factories with strict types
- **Risk**: Over-fetching or under-caching due to misconfigured staleTime
  - **Mitigation**: Document staleTime guidelines for different data types

## Patterns to Avoid

### ❌ Inline Query Keys
```typescript
// Don't do this - loses type safety and makes invalidation harder
useQuery({ queryKey: ['posts', id], queryFn: fetchPost });
```

### ❌ Deprecated Callbacks in Queries
```typescript
// Don't use - deprecated in v5
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  onSuccess: (data) => console.log(data), // Deprecated!
});
```

### ❌ Manual Type Assertions
```typescript
// Avoid - let TanStack Query infer types
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
}) as UseQueryResult<Post[]>; // Unnecessary!
```

## Implementation Examples

### Complete Query Setup

```typescript
// services/queries/posts.ts
import { queryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';

/**
 * Query keys for post-related queries.
 * Use hierarchical structure for easy invalidation.
 */
export const postsQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (filters?: PostFilters) => [...postsQueryKeys.lists(), { filters }] as const,
  details: () => [...postsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...postsQueryKeys.details(), id] as const,
} as const;

/**
 * Query options for fetching all posts.
 * Can be used with useQuery, useSuspenseQuery, or queryClient.prefetchQuery.
 */
export const getPostsQuery = (filters?: PostFilters) =>
  queryOptions({
    queryKey: postsQueryKeys.list(filters),
    queryFn: () => postsService.getPosts(filters),
    staleTime: 60000, // 1 minute
  });

/**
 * Query options for fetching a single post by ID.
 */
export const getPostQuery = (id: string) =>
  queryOptions({
    queryKey: postsQueryKeys.detail(id),
    queryFn: () => postsService.getPost(id),
    staleTime: 300000, // 5 minutes - individual posts change less
  });
```

### Component Usage with Suspense

```typescript
// components/PostsList.tsx
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPostsQuery, postsQueryKeys } from '@/services/queries/posts';

export const PostsList = () => {
  const { data: posts } = useSuspenseQuery(getPostsQuery());
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: (id: string) => postsService.deletePost(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.lists(),
      });
    },
  });

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button
            onClick={() => deletePost(post.id)}
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
```

### Prefetching Pattern

```typescript
// Prefetch on hover for better UX
const prefetchPost = (id: string) => {
  queryClient.prefetchQuery(getPostQuery(id));
};

<Link
  to={`/posts/${post.id}`}
  onMouseEnter={() => prefetchPost(post.id)}
>
  {post.title}
</Link>
```

## Related Decisions

- [ADR-006: State Management Approach](./ADR-006-state-management.md)
- [ADR-008: API Client Architecture](./ADR-008-api-client.md)

## References

- [TanStack Query v5 Documentation](https://tanstack.com/query/v5/docs/framework/react/overview)
- [TanStack Query v5 Migration Guide](https://tanstack.com/query/v5/docs/framework/react/guides/migrating-to-v5)
- [Query Keys Guide](https://tkdodo.eu/blog/effective-react-query-keys)
- [React Query Best Practices (2024)](https://tkdodo.eu/blog/react-query-render-optimizations)

## Review and Update History

- 2026-02-04: Initial decision documenting TanStack Query v5 best practices (Status: Accepted)
