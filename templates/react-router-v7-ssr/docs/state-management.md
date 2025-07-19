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
- **React Router V7**: Built-in loaders, actions, and URL management for server and client state

## Best Practices

- **Keep state local**: Only lift state up when multiple components need it
- **Prefer URL state**: Use React Router V7's searchParams for shareable application state  
- **Use React Hook Form for forms**: Never manage form state manually
- **Leverage usehooks-ts**: Use proven hooks instead of implementing common patterns from scratch
- **SSR-safe state**: Be careful with browser-only state during server-side rendering
- **Server state vs client state**: Use TanStack Query for server data, local state for UI state

## React Router V7 URL State

React Router V7 provides excellent URL state management with SSR support:

```tsx
import { useSearchParams } from 'react-router';

const Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) newParams.delete(key);
      else newParams.set(key, value);
    });

    setSearchParams(newParams);
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
Use usehooks-ts for common patterns (SSR-safe):

```tsx
import { useLocalStorage, useToggle, useDebounce } from 'usehooks-ts';

const Component = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [isVisible, toggleVisible] = useToggle(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  // Component logic...
};
```

### SSR-Safe State Management
Handle browser-only state carefully:

```tsx
import { useEffect, useState } from 'react';

const ClientOnlyComponent = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Browser-only code here
  return <div>{/* client-only content */}</div>;
};
```

## HTTP Requests

For managing state for HTTP requests, I recommend the following:

1. Whatever is built into your framework - React Router has loaders, actions, clientLoaders and clientActions for this but if you want to utilize a client cache, you'll need one of the tools below in addition.
2. TanStack Query if not using Redux Toolkit
3. Redux Toolkit Query if using Redux Toolkit
