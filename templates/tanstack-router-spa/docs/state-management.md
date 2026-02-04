# State Management

State management is incredibly difficult to get right and most teams tend to overuse certain techniques or libraries. Cory House has a [tweet](https://twitter.com/housecor/status/1437765673439088644/photo/1) explaining state management patterns that I think are a good starting place but they basically boil for me down to the following:

| State Type                                        | Use case                                        |
| ------------------------------------------------- | ----------------------------------------------- |
| URL                                               | Sharable app location                           |
| Web storage                                       | Persist between sessions, one browser           |
| Local state                                       | Only one component needs the state              |
| Lifted state                                      | Multiple related components need the state      |
| Derived state                                     | State can be derived from existing state        |
| Refs                                              | DOM Reference, state that isn't rendered        |
| Context                                           | Subtree state or a small amount of Global state |
| Global state (Redux Toolkit, Zustand, Jotai, etc) | A considerable amount of Global State           |

I generally recommend keeping state as local as you can and using Global state only when you need to.

# State Management

State management is incredibly difficult to get right and most teams tend to overuse certain techniques or libraries. Cory House has a [tweet](https://twitter.com/housecor/status/1437765673439088644/photo/1) explaining state management patterns that I think are a good starting place but they basically boil for me down to the following:

| State Type                                        | Use case                                        |
| ------------------------------------------------- | ----------------------------------------------- |
| URL                                               | Sharable app location                           |
| Web storage                                       | Persist between sessions, one browser           |
| Local state                                       | Only one component needs the state              |
| Lifted state                                      | Multiple related components need the state      |
| Derived state                                     | State can be derived from existing state        |
| Refs                                              | DOM Reference, state that isn't rendered        |
| Context                                           | Subtree state or a small amount of Global state |
| Global state (Redux Toolkit, Zustand, Jotai, etc) | A considerable amount of Global State           |

I generally recommend keeping state as local as you can and using Global state only when you need to.

## Essential Hooks and Libraries

This template includes several libraries to help with common state management patterns:

- **React Hook Form**: For all form state management (avoid manual state management for forms)
- **usehooks-ts**: Collection of essential React hooks for common patterns like storage, toggles, counters, and browser APIs
- **TanStack Query**: For server state management with caching and synchronization
- **TanStack Router**: Built-in search params and loaders for URL-based state

## Best Practices

- **Keep state local**: Only lift state up when multiple components need it
- **Prefer URL state**: Use TanStack Router's powerful search params for shareable application state  
- **Use React Hook Form for forms**: Never manage form state manually
- **Leverage usehooks-ts**: Use proven hooks instead of implementing common patterns from scratch
- **Server state vs client state**: Use TanStack Query for server data, local state for UI state

## TanStack Router URL State

TanStack Router provides the best URL state management in React:

```tsx
import { createSearchSchema } from '@tanstack/react-router';

const searchSchema = createSearchSchema({
  search: z.string().optional(),
  category: z.string().optional(),
  page: z.number().int().positive().optional(),
});

// Type-safe search params with validation
const Component = () => {
  const navigate = useNavigate();
  const { search, category, page } = useSearch({ strict: false });
  
  const updateSearch = (updates: Partial<typeof searchSchema>) => {
    navigate({
      search: (prev) => ({ ...prev, ...updates }),
    });
  };
  
  // Component logic...
};
```

## Common Patterns

### Form State Management
Always use React Hook Form with Zod validation:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
    </form>
  );
};
```

### Storage and Common UI Patterns
Use usehooks-ts for common patterns:

```tsx
import { useLocalStorage, useToggle, useDebounce } from 'usehooks-ts';

const Component = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [isVisible, toggleVisible] = useToggle(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  // Component logic...
};
```

## HTTP Requests

For managing state for HTTP requests, I recommend the following:

1. Whatever is built into your framework - TanStack Router has built-in loaders for server state management
2. TanStack Query if not using Redux Toolkit
3. Redux Toolkit Query if using Redux Toolkit

## TanStack Query Patterns

TanStack Query v5 is used for server state management in this template. See [ADR-011](./adrs/ADR-011-tanstack-query-best-practices.md) for comprehensive documentation.

### Query Key Pattern

Always use centralized query key factories:

```typescript
// services/queries/posts.ts
export const postsQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (filters?: string) => [...postsQueryKeys.lists(), { filters }] as const,
  details: () => [...postsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...postsQueryKeys.details(), id] as const,
} as const;
```

### Query Options Factory

Use `queryOptions` helper for reusable, type-safe queries:

```typescript
import { queryOptions } from '@tanstack/react-query';

export const getPostsQuery = () =>
  queryOptions({
    queryKey: postsQueryKeys.lists(),
    queryFn: () => postsService.getPosts(),
    staleTime: 60000, // 1 minute
  });
```

### Component Usage

```typescript
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';

const PostsList = () => {
  const { data: posts } = useSuspenseQuery(getPostsQuery());
  const queryClient = useQueryClient();
  
  const { mutate: deletePost } = useMutation({
    mutationFn: (id: string) => postsService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.lists(),
      });
    },
  });
  
  return <div>{/* Render posts */}</div>;
};
```

### Side Effects

⚠️ **Important**: In TanStack Query v5, `onSuccess`, `onError`, and `onSettled` callbacks are deprecated for queries. Use `useEffect` instead:

```typescript
// ❌ Don't use deprecated callbacks
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  onSuccess: (data) => toast({ title: 'Users loaded' }),
});

// ✅ Use useEffect with query state
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

### Conditional Queries

Use the `enabled` option for dependent queries:

```typescript
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // Only run when userId exists
});

const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchUserPosts(user!.id),
  enabled: !!user, // Wait for user data
});
```

### Prefetching

Improve perceived performance with prefetching:

```typescript
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

For more patterns and best practices, see:
- [ADR-011: TanStack Query Best Practices](./adrs/ADR-011-tanstack-query-best-practices.md)
- [TanStack Query v5 Documentation](https://tanstack.com/query/v5)

The template includes TanStack Query examples in the [React Query](/react-query) page, demonstrating server state management with caching, mutations, and optimistic updates.
