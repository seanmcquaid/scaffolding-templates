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

The template includes TanStack Query examples in the [React Query](/react-query) page, demonstrating server state management with caching, mutations, and optimistic updates.
