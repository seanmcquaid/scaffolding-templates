---
name: react-router-spa-development
description: Expert in React Router v7 single-page applications with client-side routing, TanStack Query, and modern React patterns. Specializes in SPA architecture.
---

# React Router v7 SPA Development

Build production-ready single-page applications with React Router v7, client-side routing, and optimal performance.

## When to Use

Use this skill for React Router v7 SPA projects that need:
- Client-side only rendering (no SSR)
- File-based routing with React Router v7
- TanStack Query for server state management
- URL state management for shareable application state
- Code splitting and lazy loading
- Progressive web app capabilities

## File-Based Routing Structure

```
app/
├── root.tsx              # Root layout
├── routes.ts             # Route configuration
└── routes/
    ├── index/
    │   └── index.tsx     # Home page (/)
    ├── about/
    │   └── index.tsx     # About page (/about)
    ├── dashboard/
    │   ├── index.tsx     # Dashboard home (/dashboard)
    │   └── $id/
    │       └── index.tsx # Dynamic route (/dashboard/:id)
    └── _layout.tsx       # Optional layout component
```

## Route Configuration

```typescript
// app/routes.ts
import type { RouteConfig } from '@react-router/dev/routes';

export const routes: RouteConfig = [
  {
    path: '/',
    file: 'routes/index/index.tsx',
  },
  {
    path: '/dashboard',
    children: [
      {
        index: true,
        file: 'routes/dashboard/index.tsx',
      },
      {
        path: ':id',
        file: 'routes/dashboard/$id/index.tsx',
      },
    ],
  },
];
```

## Client Loaders

```tsx
// app/routes/dashboard/index.tsx
import { useLoaderData } from 'react-router';
import type { Route } from './+types';
import { dashboardService } from '@/services/dashboardService';

// Client loader - fetches data on navigation
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter') || 'all';
  
  const data = await dashboardService.getData(filter);
  
  return { data, filter };
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const { data, filter } = loaderData;
  
  return (
    <div>
      <h1>Dashboard</h1>
      <FilterSelect currentFilter={filter} />
      <DashboardContent data={data} />
    </div>
  );
}
```

## TanStack Query Integration

### Query Options Pattern

```typescript
// services/queries/users.ts
import { queryOptions } from '@tanstack/react-query';
import { usersService } from '../usersService';

export const usersQueryKeys = {
  users: ['users'] as const,
  user: (id: string) => [...usersQueryKeys.users, id] as const,
};

export const getUsersQuery = () =>
  queryOptions({
    queryKey: usersQueryKeys.users,
    queryFn: () => usersService.getUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

export const getUserQuery = (id: string) =>
  queryOptions({
    queryKey: usersQueryKeys.user(id),
    queryFn: () => usersService.getUser(id),
  });
```

### Using Queries in Components

```tsx
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getUsersQuery } from '@/services/queries/users';

// Standard query with loading/error states
export function UsersList() {
  const { data, isLoading, error } = useQuery(getUsersQuery());
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <UsersTable users={data} />;
}

// Suspense query (use with Suspense boundary)
export function UsersListSuspense() {
  const { data } = useSuspenseQuery(getUsersQuery());
  
  return <UsersTable users={data} />;
}
```

### Optimistic Updates

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersQueryKeys } from '@/services/queries/users';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (user: User) => usersService.updateUser(user),
    onMutate: async (updatedUser) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: usersQueryKeys.user(updatedUser.id) 
      });
      
      // Snapshot previous value
      const previousUser = queryClient.getQueryData(
        usersQueryKeys.user(updatedUser.id)
      );
      
      // Optimistically update
      queryClient.setQueryData(
        usersQueryKeys.user(updatedUser.id), 
        updatedUser
      );
      
      return { previousUser };
    },
    onError: (err, updatedUser, context) => {
      // Rollback on error
      queryClient.setQueryData(
        usersQueryKeys.user(updatedUser.id),
        context?.previousUser
      );
    },
    onSettled: (data, error, updatedUser) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ 
        queryKey: usersQueryKeys.user(updatedUser.id) 
      });
    },
  });
}
```

## URL State Management

```tsx
import { useSearchParams } from 'react-router';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    
    // Reset to page 1 when filters change
    if (!('page' in updates)) {
      newParams.delete('page');
    }
    
    setSearchParams(newParams);
  };
  
  return (
    <div>
      <SearchInput 
        value={search} 
        onChange={(val) => updateParams({ search: val })} 
      />
      <CategoryFilter 
        value={category}
        onChange={(cat) => updateParams({ category: cat })}
      />
      <ProductsList search={search} category={category} page={page} />
    </div>
  );
}
```

## Navigation

### Programmatic Navigation

```tsx
import { useNavigate } from 'react-router';

export function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials: Credentials) => {
    await authService.login(credentials);
    navigate('/dashboard', { replace: true });
  };
  
  return <form onSubmit={handleSubmit(handleLogin)}>{/* ... */}</form>;
}
```

### NavLink with Active State

```tsx
import { NavLink } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';

export function Navigation() {
  const { t } = useAppTranslation();
  
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        {t('Navigation.home')}
      </NavLink>
      
      <NavLink to="/dashboard">
        {({ isActive }) => (
          <span className={isActive ? 'active' : ''}>
            {t('Navigation.dashboard')}
          </span>
        )}
      </NavLink>
    </nav>
  );
}
```

## Code Splitting

### Route-Based Code Splitting

```tsx
// app/routes.ts
import { lazy } from 'react';

export const routes = [
  {
    path: '/',
    Component: lazy(() => import('./routes/index/index')),
  },
  {
    path: '/dashboard',
    Component: lazy(() => import('./routes/dashboard/index')),
  },
];
```

### Component-Based Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('@/components/app/HeavyChart'));

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
```

## Form Handling with React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAppTranslation from '@/hooks/useAppTranslation';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const { t } = useAppTranslation();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });
  
  const onSubmit = async (data: ContactFormData) => {
    await contactService.submit(data);
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>{t('ContactForm.name')}</label>
        <input {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('Common.submitting') : t('Common.submit')}
      </button>
    </form>
  );
}
```

## Error Handling

### Error Boundaries

```tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

## Performance Optimization

### Virtual Lists

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function LargeList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  return (
    <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
      <div style={{ 
        height: `${virtualizer.getTotalSize()}px`, 
        position: 'relative' 
      }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <ListItem item={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Key Principles

1. **Client-Side Only**: All rendering happens in the browser
2. **URL State**: Use URL parameters for shareable application state
3. **TanStack Query**: Manage server state with TanStack Query
4. **Code Splitting**: Split code by routes and heavy components
5. **React Hook Form**: Never manage form state manually
6. **Optimistic Updates**: Improve perceived performance
7. **Error Boundaries**: Handle errors at appropriate levels
8. **Type Safety**: Use TypeScript for all code
