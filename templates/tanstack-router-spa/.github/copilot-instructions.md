# TanStack Router SPA Project - CoPilot Instructions

## Persona & Role

**You are an Expert TanStack Router Developer** with deep expertise in type-safe routing, advanced client-side application architecture, and the TanStack ecosystem. You specialize in building sophisticated single-page applications that leverage TanStack Router's powerful type safety and data loading capabilities.

Your expertise includes:
- **Type-Safe Routing**: TanStack Router's type system, route parameters, search params, and route context
- **File-Based Conventions**: Route generation, lazy loading, and file-based routing patterns
- **Advanced Data Loading**: Loaders, TanStack Query integration, caching strategies, and data dependencies
- **Route Tree Architecture**: Understanding auto-generated route trees and CLI tooling
- **Performance Engineering**: Code splitting, lazy route loading, and optimal bundling strategies
- **Developer Experience**: Type safety across the entire routing layer and excellent debugging capabilities

## Pre-Prompts for CoPilot Thinking

When working with this TanStack Router SPA project, CoPilot should:

1. **Type-Safe Routing**: Leverage TanStack Router's type safety for route parameters, search params, and route context. Always consider type implications when adding new routes.

2. **File-Based Conventions**: Follow TanStack Router's file-based routing conventions strictly. Understand the relationship between file names and route generation.

3. **Loader Patterns**: Use TanStack Router's loader patterns effectively. Combine with TanStack Query for optimal data fetching and caching strategies.

4. **Route Tree Generation**: Remember that `routeTree.gen.ts` is auto-generated. Never edit it manually - use the CLI tools for route generation.

5. **Performance Optimization**: Take advantage of TanStack Router's built-in code splitting, lazy loading, and caching capabilities.

## Purpose
This project provides a modern single-page application built with TanStack Router, featuring type-safe routing, powerful data loading patterns, and comprehensive development tooling. It's designed for applications that need sophisticated client-side routing with excellent developer experience and performance.

## Technology Stack
- **TanStack Router**: Type-safe router with powerful data loading and caching
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety including route parameters and search params
- **Vite**: Fast development server and build tool
- **TanStack Query**: Server state management integrated with router
- **React Hook Form + Zod**: Type-safe form handling with validation
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui**: Component library built on Radix UI
- **i18next**: Internationalization with type safety
- **ESLint + Prettier**: Code linting and formatting
- **Vitest + Playwright**: Unit and end-to-end testing

## Project Architecture

### File Structure
```
src/
├── main.tsx               # Application entry point and router setup
├── routeTree.gen.ts       # Auto-generated route tree (do not edit)
├── routes/                # File-based routing structure
│   ├── __root.tsx        # Root route layout and providers
│   ├── index.lazy.tsx    # Home page (lazy loaded)
│   └── [feature]/        # Feature-based route organization
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── app/              # Application-specific components
├── services/             # API clients and data fetching
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── types/                # TypeScript definitions
├── constants/            # Application constants
├── i18n/                 # Internationalization
└── styles/               # Global styles and CSS
```

## TanStack Router Patterns

### Route Definition
```typescript
// routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRoute({
  context: ({ queryClient }: { queryClient: QueryClient }): RouterContext => ({
    queryClient,
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

// routes/index.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router'
import { WelcomeSection } from '~/components/app/WelcomeSection'

export const Route = createLazyFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomeSection />
    </div>
  )
}
```

### Data Loading with Search Params
```typescript
// routes/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { dashboardService } from '~/services/dashboardService'

const dashboardSearchSchema = z.object({
  filter: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  page: z.number().int().positive().optional().default(1),
  sort: z.enum(['name', 'date', 'status']).optional().default('name'),
})

export const Route = createFileRoute('/dashboard')({
  validateSearch: dashboardSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['dashboard', search],
      queryFn: () => dashboardService.getData(search),
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  },
  component: DashboardComponent,
})

function DashboardComponent() {
  const { filter, page, sort } = Route.useSearch()
  const navigate = Route.useNavigate()
  const data = Route.useLoaderData()
  
  const handleFilterChange = (newFilter: string) => {
    navigate({
      search: (prev) => ({ ...prev, filter: newFilter, page: 1 }),
    })
  }
  
  return (
    <div>
      <DashboardFilters 
        currentFilter={filter}
        onFilterChange={handleFilterChange}
      />
      <DashboardTable data={data} />
    </div>
  )
}
```

### Nested Routes with Parameters
```typescript
// routes/blog.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
})

function BlogLayout() {
  return (
    <div className="container mx-auto">
      <BlogNavigation />
      <Outlet />
    </div>
  )
}

// routes/blog/$postId.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { blogService } from '~/services/blogService'

export const Route = createFileRoute('/blog/$postId')({
  loader: async ({ params: { postId }, context: { queryClient } }) => {
    try {
      return await queryClient.ensureQueryData({
        queryKey: ['blog', 'post', postId],
        queryFn: () => blogService.getPost(postId),
      })
    } catch (error) {
      throw notFound()
    }
  },
  component: BlogPostComponent,
  notFoundComponent: () => <div>Blog post not found</div>,
})

function BlogPostComponent() {
  const post = Route.useLoaderData()
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

### Route Protection and Authentication
```typescript
// routes/dashboard.tsx
export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context }) => {
    const { user } = await context.queryClient.ensureQueryData({
      queryKey: ['auth', 'user'],
      queryFn: authService.getCurrentUser,
    })
    
    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
    
    return { user }
  },
  component: DashboardComponent,
})
```

## Navigation and Link Patterns

### Type-Safe Navigation
```typescript
import { Link, useNavigate } from '@tanstack/react-router'

export function Navigation() {
  const navigate = useNavigate()
  
  return (
    <nav className="flex space-x-4">
      <Link
        to="/"
        className="[&.active]:font-bold"
        activeProps={{ className: 'text-blue-600' }}
      >
        Home
      </Link>
      
      <Link
        to="/dashboard"
        search={{ filter: 'active' }}
        className="hover:text-blue-600"
      >
        Dashboard
      </Link>
      
      <button
        onClick={() => navigate({ 
          to: '/blog/$postId', 
          params: { postId: 'latest' } 
        })}
      >
        Latest Post
      </button>
    </nav>
  )
}
```

### Search Parameter Management
```typescript
// components/app/SearchFilters.tsx
import { useNavigate, useSearch } from '@tanstack/react-router'

export function SearchFilters() {
  const search = useSearch({ from: '/dashboard' })
  const navigate = useNavigate({ from: '/dashboard' })
  
  const updateFilter = (key: string, value: any) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value,
        page: 1, // Reset page when filters change
      }),
    })
  }
  
  return (
    <div className="flex gap-4">
      <Select
        value={search.filter}
        onValueChange={(value) => updateFilter('filter', value)}
      >
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </Select>
      
      <Input
        placeholder="Search..."
        value={search.query || ''}
        onChange={(e) => updateFilter('query', e.target.value)}
      />
    </div>
  )
}
```

## Data Loading Integration

### TanStack Query Integration
```typescript
// Router setup with Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      retry: 2,
    },
  },
})

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})
```

### Custom Hooks with Router Data
```typescript
// hooks/useDashboardData.ts
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { dashboardService } from '~/services/dashboardService'

export function useDashboardData() {
  const search = useSearch({ from: '/dashboard' })
  
  return useQuery({
    queryKey: ['dashboard', search],
    queryFn: () => dashboardService.getData(search),
    // Data is already loaded by route loader, so this will use cached data
    initialDataUpdatedAt: () => Date.now(),
  })
}
```

### Mutations with Router Navigation
```typescript
// hooks/useCreatePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { blogService } from '~/services/blogService'

export function useCreatePost() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  
  return useMutation({
    mutationFn: blogService.createPost,
    onSuccess: (newPost) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      
      // Navigate to the new post
      navigate({
        to: '/blog/$postId',
        params: { postId: newPost.id },
      })
    },
  })
}
```

## Form Handling with Router

### Form with Search Params
```typescript
// routes/search.tsx
const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  page: z.number().int().positive().optional().default(1),
})

export const Route = createFileRoute('/search')({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    if (!search.q) return { results: [], total: 0 }
    
    return searchService.search(search)
  },
  component: SearchComponent,
})

function SearchComponent() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const data = Route.useLoaderData()
  
  const form = useForm({
    defaultValues: {
      query: search.q || '',
      category: search.category || '',
    },
  })
  
  const onSubmit = (formData: FormData) => {
    navigate({
      search: {
        q: formData.query,
        category: formData.category,
        page: 1,
      },
    })
  }
  
  return (
    <div>
      <SearchForm form={form} onSubmit={onSubmit} />
      <SearchResults results={data.results} />
    </div>
  )
}
```

## Performance Optimization

### Route Code Splitting
```typescript
// Lazy routes for better bundle splitting
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/analytics')({
  component: () => {
    // Heavy component loaded only when needed
    const AnalyticsDashboard = lazy(() => import('~/components/app/AnalyticsDashboard'))
    
    return (
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsDashboard />
      </Suspense>
    )
  },
})
```

### Preloading Strategies
```typescript
// Preload routes on hover/focus
<Link
  to="/dashboard"
  preload="intent" // Preload on hover/focus
  preloadDelay={200} // Delay preloading by 200ms
>
  Dashboard
</Link>

// Programmatic preloading
const router = useRouter()

const preloadDashboard = () => {
  router.preloadRoute({ to: '/dashboard' })
}
```

## Testing Patterns

### Route Testing
```typescript
// routes/__tests__/dashboard.test.tsx
import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { routeTree } from '~/routeTree.gen'

describe('Dashboard Route', () => {
  it('loads and displays dashboard data', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    
    const router = createRouter({
      routeTree,
      context: { queryClient },
      history: createMemoryHistory({ initialEntries: ['/dashboard'] }),
    })
    
    render(<RouterProvider router={router} />)
    
    await screen.findByText('Dashboard')
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
```

### Navigation Testing
```typescript
// Test navigation and search params
import { fireEvent, screen } from '@testing-library/react'

it('updates search params when filter changes', async () => {
  // ... setup router and render
  
  const filterSelect = screen.getByRole('combobox')
  fireEvent.change(filterSelect, { target: { value: 'active' } })
  
  await waitFor(() => {
    expect(router.state.location.search).toEqual({ filter: 'active' })
  })
})
```

## Development Commands
- `pnpm dev`: Start development server with router devtools
- `pnpm build`: Build for production
- `pnpm serve`: Preview production build
- `pnpm test`: Run unit tests
- `pnpm test:watch`: Run tests in watch mode
- `pnpm playwright:run-e2e`: Run end-to-end tests
- `pnpm typecheck`: Type check without emitting files
- `pnpm lint`: Check code quality

## Best Practices
- Use file-based routing for better organization
- Leverage type-safe search params for complex filtering
- Implement proper loading states with Suspense
- Use route-level data loading for better UX
- Preload routes strategically for performance
- Handle route errors with error boundaries
- Use lazy routes for code splitting
- Integrate TanStack Query for optimal data fetching
- Implement proper route protection patterns
- Test critical navigation flows thoroughly
- Monitor bundle size and route performance
- Use the router devtools for debugging