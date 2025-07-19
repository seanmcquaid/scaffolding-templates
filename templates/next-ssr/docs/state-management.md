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
- **Next.js**: Built-in features like Server Components, searchParams, and RSC for server state

## Best Practices

- **Keep state local**: Only lift state up when multiple components need it
- **Prefer URL state**: Use Next.js searchParams for shareable application state  
- **Use React Hook Form for forms**: Never manage form state manually
- **Leverage usehooks-ts**: Use proven hooks instead of implementing common patterns from scratch
- **Server Components first**: Use Next.js Server Components to reduce client-side state when possible
- **Server state vs client state**: Use TanStack Query for server data, local state for UI state

## Next.js URL State

Next.js provides excellent URL state management:

```tsx
import { useSearchParams, useRouter } from 'next/navigation';

const Component = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });

    router.push(`?${params.toString()}`);
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

### Server Components for Server State
Leverage Server Components to reduce client-side state:

```tsx
// Server Component - runs on server, reduces client JS
async function ProductList({ searchParams }: { searchParams: { category?: string } }) {
  const products = await getProducts(searchParams.category);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

For comprehensive code examples of each state management pattern, refer to the root [CoPilot Instructions](../../.github/copilot-instructions.md) which includes detailed examples for URL state, web storage, context, global state, and more.

## HTTP Requests

For managing state for HTTP requests, I recommend the following:

1. Whatever is built into your framework - Next has RSC for this but if you want to utilize a client cache, you'll need one of the tools below in addition.
2. TanStack Query if not using Redux Toolkit
3. Redux Toolkit Query if using Redux Toolkit
