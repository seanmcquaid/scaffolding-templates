---
name: tanstack-router-spa-development
description: Expert in TanStack Router for type-safe single-page applications with file-based routing and search parameter validation. Specializes in type-safe routing.
---

# TanStack Router SPA Development

Build production-ready single-page applications with TanStack Router's type-safe routing and search parameter validation.

## When to Use

Use this skill for TanStack Router SPA projects that need:
- Type-safe routing with full TypeScript inference
- Type-safe search parameters with Zod validation
- File-based routing with code generation
- TanStack Query integration
- Automatic route type generation
- Type-safe navigation and links

## File-Based Routing Structure

```
src/
└── routes/
    ├── __root.tsx          # Root route
    ├── index.tsx           # Home page (/)
    ├── about.tsx           # About page (/about)
    ├── dashboard/
    │   ├── index.tsx       # Dashboard home (/dashboard)
    │   └── $id.tsx         # Dynamic route (/dashboard/:id)
    └── _layout.tsx         # Layout route
```

## Route Configuration

### Root Route

```tsx
// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
});
```

### Basic Routes

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return <h1>Home</h1>;
}

// src/routes/dashboard/$id.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/$id')({
  component: DashboardDetail,
  loader: async ({ params }) => {
    const data = await dashboardService.getById(params.id);
    return { data };
  },
});

function DashboardDetail() {
  const { data } = Route.useLoaderData();
  return <DashboardView data={data} />;
}
```

## Type-Safe Search Parameters

### Search Schema with Zod

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

// Define search parameter schema
const searchSchema = z.object({
  search: z.string().optional().default(''),
  category: z.enum(['all', 'frontend', 'backend']).optional().default('all'),
  page: z.number().optional().default(1),
  sort: z.enum(['name', 'date', 'popularity']).optional().default('name'),
});

export const Route = createFileRoute('/products')({
  validateSearch: searchSchema,
  component: ProductsPage,
  loader: async ({ search }) => {
    // search is fully typed!
    const products = await productsService.search({
      query: search.search,
      category: search.category,
      page: search.page,
      sort: search.sort,
    });
    return { products };
  },
});

function ProductsPage() {
  const { products } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const search = Route.useSearch(); // Fully typed!
  
  const updateSearch = (newSearch: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: newSearch,
        page: 1, // Reset to page 1
      }),
    });
  };
  
  return (
    <div>
      <SearchInput value={search.search} onChange={updateSearch} />
      <CategoryFilter
        value={search.category}
        onChange={(category) => {
          navigate({
            search: (prev) => ({ ...prev, category, page: 1 }),
          });
        }}
      />
      <ProductsList products={products} />
      <Pagination
        currentPage={search.page}
        onPageChange={(page) => {
          navigate({
            search: (prev) => ({ ...prev, page }),
          });
        }}
      />
    </div>
  );
}
```

## Data Loading with TanStack Query

### Route Loaders with Query Integration

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

// Define query options
const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['users', id],
    queryFn: () => usersService.getUser(id),
  });

export const Route = createFileRoute('/users/$id')({
  loader: async ({ context, params }) => {
    // Prefetch query in loader
    await context.queryClient.ensureQueryData(userQueryOptions(params.id));
  },
  component: UserPage,
});

function UserPage() {
  const { id } = Route.useParams();
  const { data: user } = useSuspenseQuery(userQueryOptions(id));
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Parallel Data Loading

```tsx
export const Route = createFileRoute('/dashboard')({
  loader: async ({ context }) => {
    // Load multiple queries in parallel
    await Promise.all([
      context.queryClient.ensureQueryData(getUserQuery()),
      context.queryClient.ensureQueryData(getStatsQuery()),
      context.queryClient.ensureQueryData(getActivityQuery()),
    ]);
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { data: user } = useSuspenseQuery(getUserQuery());
  const { data: stats } = useSuspenseQuery(getStatsQuery());
  const { data: activity } = useSuspenseQuery(getActivityQuery());
  
  return (
    <div>
      <UserProfile user={user} />
      <Statistics stats={stats} />
      <ActivityFeed activity={activity} />
    </div>
  );
}
```

## Type-Safe Navigation

### Programmatic Navigation

```tsx
import { Link, useNavigate } from '@tanstack/react-router';

export function Navigation() {
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    await authService.login();
    
    // Type-safe navigation
    navigate({
      to: '/dashboard',
      search: { filter: 'all' },
      replace: true,
    });
  };
  
  return (
    <nav>
      {/* Type-safe Link */}
      <Link
        to="/dashboard/$id"
        params={{ id: '123' }}
        search={{ filter: 'all' }}
        activeProps={{ className: 'active' }}
      >
        Dashboard
      </Link>
      
      <button onClick={handleLogin}>Login</button>
    </nav>
  );
}
```

### Active Link Styling

```tsx
import { Link } from '@tanstack/react-router';

export function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'nav-link active',
      }}
      inactiveProps={{
        className: 'nav-link',
      }}
    >
      {children}
    </Link>
  );
}
```

## Route Context

### Providing Context to Routes

```tsx
// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient, // Available in all route loaders
    auth: undefined!, // Will be set after auth check
  },
});

// Type safety for router context
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuth(); // Get auth state
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient, auth }} />
    </QueryClientProvider>
  );
}
```

### Using Context in Routes

```tsx
export const Route = createFileRoute('/protected')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  loader: async ({ context }) => {
    // Use queryClient from context
    return await context.queryClient.ensureQueryData(protectedDataQuery());
  },
});
```

## Nested Routes and Layouts

```tsx
// src/routes/_layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div className="layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// src/routes/_layout/settings.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/settings')({
  component: SettingsPage,
});
```

## Error Handling

### Route-Level Error Boundaries

```tsx
import { createFileRoute, ErrorComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
  errorComponent: DashboardError,
  loader: async () => {
    const data = await fetchDashboardData();
    if (!data) {
      throw new Error('Failed to load dashboard');
    }
    return { data };
  },
});

function DashboardError({ error }: { error: Error }) {
  return (
    <div className="error">
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
}
```

### Not Found Handling

```tsx
// src/routes/__root.tsx
export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function NotFound() {
  const { t } = useAppTranslation();
  
  return (
    <div className="not-found">
      <h1>{t('Error.pageNotFound')}</h1>
      <Link to="/">{t('Navigation.home')}</Link>
    </div>
  );
}
```

## Code Splitting

### Route-Based Code Splitting

```tsx
// Routes are automatically code-split by TanStack Router
// Each route file becomes its own chunk
export const Route = createFileRoute('/settings')({
  component: SettingsPage, // This is automatically lazy-loaded
});
```

### Component-Based Lazy Loading

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

// Lazy load heavy components
const HeavyDashboard = lazy(() => import('@/components/app/HeavyDashboard'));

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <Suspense fallback={<DashboardSkeleton />}>
      <HeavyDashboard />
    </Suspense>
  ),
});
```

## Performance Optimization

### Preload on Hover

```tsx
import { Link } from '@tanstack/react-router';

export function DashboardLink() {
  return (
    <Link
      to="/dashboard"
      preload="intent" // Preload on hover
    >
      Dashboard
    </Link>
  );
}
```

### Prefetching Data

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export function ProductCard({ product }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const prefetchProduct = () => {
    // Prefetch product details
    queryClient.prefetchQuery(getProductQuery(product.id));
    
    // Prefetch route
    router.preloadRoute({ 
      to: '/products/$id', 
      params: { id: product.id } 
    });
  };
  
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      onMouseEnter={prefetchProduct}
    >
      {product.name}
    </Link>
  );
}
```

## Route Generation

### Generating Route Types

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "route:generate": "tsr generate"
  }
}
```

The generated route tree provides full type safety across your entire routing system.

## Testing TanStack Router

```tsx
import { createMemoryHistory, createRootRoute, createRouter } from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';

describe('Dashboard Route', () => {
  it('renders dashboard data', async () => {
    const rootRoute = createRootRoute();
    const dashboardRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/dashboard',
      component: () => <div>Dashboard</div>,
    });
    
    const router = createRouter({
      routeTree: rootRoute.addChildren([dashboardRoute]),
      history: createMemoryHistory({ initialEntries: ['/dashboard'] }),
    });
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
```

## Key Principles

1. **Type-Safe Routing**: Leverage TypeScript inference for all routing
2. **Search Validation**: Use Zod schemas for search parameters
3. **Generated Types**: Use route type generation for type safety
4. **TanStack Query**: Integrate with TanStack Query for data loading
5. **Route Context**: Provide typed context to all routes
6. **Preloading**: Prefetch data and routes for better UX
7. **Error Boundaries**: Handle errors at appropriate route levels
8. **Code Splitting**: Automatic route-based code splitting
