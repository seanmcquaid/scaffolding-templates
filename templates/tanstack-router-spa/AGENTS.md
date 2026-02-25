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
- **usehooks-ts**: Collection of essential React hooks for common patterns
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
├── assets/               # Static assets
│   └── icons/           # SVG icons and graphics
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── app/              # Application-specific components
├── constants/            # Application constants
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization
├── services/             # API clients and data fetching
├── styles/               # Global styles and CSS
├── types/                # TypeScript definitions
└── utils/                # Utility functions
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
import { WelcomeSection } from '@/components/app/WelcomeSection'

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
import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { dashboardService } from '@/services/dashboardService'
import { getDashboardQueryOptions } from '@/services/queries/dashboard'

const dashboardSearchSchema = z.object({
  filter: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  page: z.number().int().positive().optional().default(1),
  sort: z.enum(['name', 'date', 'status']).optional().default('name'),
})

export const Route = createFileRoute('/dashboard')({
  validateSearch: dashboardSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(getDashboardQueryOptions(search))
  },
  component: DashboardComponent,
})

function DashboardComponent() {
  const { filter, page, sort } = Route.useSearch()
  const navigate = Route.useNavigate()

  // Use suspense query for seamless loading
  const { data } = useSuspenseQuery(getDashboardQueryOptions({ filter, page, sort }))

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
import { blogService } from '@/services/blogService'

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
    });

    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }

    return { user };
  },
  component: DashboardComponent,
});
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
// services/queries/posts.ts
import { queryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';

export const postsQueryKeys = {
  post: ['post'],
  postById: (id: string) => [...postsQueryKeys.post, id],
  posts: ['posts'],
} as const;

export const getPostQuery = (id: string) =>
  queryOptions({
    queryFn: async () => postsService.getPost(id),
    queryKey: postsQueryKeys.postById(id),
  });

export const getPostsQuery = () =>
  queryOptions({
    queryFn: () => postsService.getPosts(),
    queryKey: postsQueryKeys.posts,
  });

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

// Using useSuspenseQuery with TanStack Router
export function PostsList() {
  const { data } = useSuspenseQuery(getPostsQuery());

  return (
    <ul>
      {data?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Custom Hooks with Router Data

```typescript
// hooks/useDashboardData.ts
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { dashboardService } from '@/services/dashboardService';

export function useDashboardData() {
  const search = useSearch({ from: '/dashboard' });

  return useQuery({
    queryKey: ['dashboard', search],
    queryFn: () => dashboardService.getData(search),
    // Data is already loaded by route loader, so this will use cached data
    initialDataUpdatedAt: () => Date.now(),
  });
}
```

### Mutations with Router Navigation

```typescript
// hooks/useCreatePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { blogService } from '@/services/blogService'
import { postsQueryKeys } from '@/services/queries/posts'

export function useCreatePost() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: blogService.createPost,
    onSuccess: (newPost) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.posts })

      // Navigate to the new post
      navigate({
        to: '/blog/$postId',
        params: { postId: newPost.id },
      })
    },
    onError: (error) => {
      // Handle error
      console.error('Failed to create post:', error)
    },
  })
}

// Usage in component
export function CreatePostForm() {
  const { mutate: createPost, isPending, error } = useCreatePost()

  const handleSubmit = (formData: FormData) => {
    const postData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    }
    createPost(postData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Post content" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
      {error && <p className="error">{error.message}</p>}
    </form>
  )
}
```

### Optimistic Updates

```typescript
// hooks/useTogglePostLike.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsQueryKeys } from '@/services/queries/posts';
import { postsService } from '@/services/postsService';

export function useTogglePostLike(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (liked: boolean) =>
      postsService.toggleLike(postId, liked),

    // Optimistic update
    onMutate: async (liked: boolean) => {
      await queryClient.cancelQueries({
        queryKey: postsQueryKeys.postById(postId),
      });

      const previousPost = queryClient.getQueryData(
        postsQueryKeys.postById(postId),
      );

      queryClient.setQueryData(postsQueryKeys.postById(postId), (old: any) => ({
        ...old,
        liked,
        likeCount: liked ? old.likeCount + 1 : old.likeCount - 1,
      }));

      return { previousPost };
    },

    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(
        postsQueryKeys.postById(postId),
        context?.previousPost,
      );
    },

    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.postById(postId),
      });
    },
  });
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
    const AnalyticsDashboard = lazy(() => import('@/components/app/AnalyticsDashboard'))

    return (
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsDashboard />
      </Suspense>
    )
  },
})
```

#### Performance Best Practices

- **Strategic lazy loading**: Use lazy routes for heavy pages and non-critical functionality
- **Bundle analysis**: Regularly analyze bundle size and split large dependencies
- **Preloading strategy**: Use intent-based preloading for better perceived performance
- **Data caching**: Leverage TanStack Query's caching with router loaders for optimal data loading
- **Route hierarchy optimization**: Structure routes to minimize unnecessary re-renders
- **Component memoization**: Use React.memo for expensive route components

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

#### Preloading Best Practices

- **Intent-based preloading**: Preload routes when users show intent (hover, focus)
- **Critical path preloading**: Preload essential routes during application initialization
- **Data preloading**: Combine route preloading with data prefetching for seamless navigation
- **Bandwidth consideration**: Implement smart preloading based on connection quality
- **Cache management**: Ensure preloaded data doesn't exceed memory limits
- **Preload timing**: Use appropriate delays to avoid unnecessary preloading

## Testing Patterns

### Route Testing

```typescript
// routes/__tests__/dashboard.test.tsx
import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { routeTree } from '@/routeTree.gen'

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
import { fireEvent, screen } from '@testing-library/react';

it('updates search params when filter changes', async () => {
  // ... setup router and render

  const filterSelect = screen.getByRole('combobox');
  fireEvent.change(filterSelect, { target: { value: 'active' } });

  await waitFor(() => {
    expect(router.state.location.search).toEqual({ filter: 'active' });
  });
});
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

### Routing Architecture Best Practices

- **File-based organization**: Use clear, descriptive file names that match your URL structure
- **Route grouping**: Group related routes in directories; use route groups for shared layouts
- **Parameter design**: Design URL parameters to be user-friendly and shareable
- **Search param schemas**: Always validate search parameters with Zod for type safety and error handling
- **Route hierarchy**: Structure routes to reflect your application's logical hierarchy
- **Layout composition**: Use nested layouts effectively to avoid code duplication

### Data Loading Best Practices

- **Loader efficiency**: Use loaderDeps to optimize when loaders run and avoid unnecessary executions
- **Error handling**: Implement comprehensive error handling in loaders with proper user feedback
- **Cache integration**: Combine router loaders with TanStack Query for optimal caching strategies
- **Loading states**: Provide meaningful loading indicators during data fetching
- **Parallel loading**: Load independent data in parallel for better performance
- **Data freshness**: Implement appropriate stale-time and cache invalidation strategies

### Navigation and UX Best Practices

- **Navigation feedback**: Provide immediate feedback during navigation transitions
- **Error boundaries**: Implement error boundaries at route level for graceful error handling
- **404 handling**: Create meaningful 404 pages and implement proper not-found routing
- **Accessibility**: Ensure all navigation is keyboard accessible and screen reader friendly
- **Progressive enhancement**: Ensure core functionality works without JavaScript
- **Deep linking**: Design URLs to be shareable and bookmarkable

### Performance and Security Best Practices

- **Route-level code splitting**: Split code at route boundaries for optimal loading
- **Authentication integration**: Implement secure authentication patterns with route guards
- **Data validation**: Validate all route parameters and search params for security
- **Bundle monitoring**: Regularly audit bundle sizes and optimize heavy routes
- **SEO optimization**: Implement proper meta tags and structured data for SPA SEO
- **Security headers**: Implement appropriate security headers for production deployment

### Testing Best Practices

- **Route testing**: Test critical user flows including navigation and data loading
- **Search param testing**: Test search parameter validation and edge cases
- **Navigation testing**: Test programmatic navigation and URL state management
- **Error scenario testing**: Test error boundaries and network failure scenarios
- **Accessibility testing**: Test keyboard navigation and screen reader compatibility
- **Performance testing**: Monitor route loading times and bundle size impact

## ⚠️ Translation Requirements - MANDATORY

**ALL USER-FACING TEXT MUST BE TRANSLATED** - This is a strict requirement for this TanStack Router SPA project.

### Translation Enforcement Rules

1. **Never use hardcoded strings** - All text must use `useAppTranslation` hook
2. **ESLint will catch violations** - The `i18next/no-literal-string` rule prevents hardcoded text
3. **Tests validate i18n compliance** - Mock functions return translation keys for validation
4. **Type-safe routing** - Leverage TanStack Router's type safety with i18n patterns

### TanStack Router SPA i18n Patterns

**File-Based Route Components with i18n:**

```tsx
// src/routes/dashboard/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import useAppTranslation from '@/hooks/useAppTranslation';
import { getDashboardDataQuery } from '@/services/queries/dashboard';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(getDashboardDataQuery()),
});

function DashboardPage() {
  const { t } = useAppTranslation();
  const { data } = useSuspenseQuery(getDashboardDataQuery());

  return (
    <div>
      <h1>{t('Dashboard.title')}</h1>
      <p>{t('Dashboard.welcomeMessage', { name: data.user.name })}</p>
    </div>
  );
}
```

**Route Search Params with i18n:**

```tsx
// src/routes/products/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import useAppTranslation from '@/hooks/useAppTranslation';

const searchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  page: z.number().optional().default(1),
});

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
  validateSearch: searchSchema,
});

function ProductsPage() {
  const { t } = useAppTranslation();
  const { search, category, page } = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateSearch = (newSearch: string) => {
    navigate({
      search: prev => ({ ...prev, search: newSearch, page: 1 }),
    });
  };

  return (
    <div>
      <h1>{t('ProductsPage.title')}</h1>

      <input
        placeholder={t('ProductsPage.searchPlaceholder')}
        value={search || ''}
        onChange={e => updateSearch(e.target.value)}
      />

      {!search && <p>{t('ProductsPage.browseProducts')}</p>}

      {search && <p>{t('ProductsPage.searchResults', { query: search })}</p>}
    </div>
  );
}
```

**Navigation with Type-Safe i18n:**

```tsx
// src/components/Navigation.tsx
import { Link } from '@tanstack/react-router';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function Navigation() {
  const { t } = useAppTranslation();

  return (
    <nav className="main-nav">
      <Link to="/" className="nav-link">
        {t('Navigation.home')}
      </Link>
      <Link to="/dashboard" className="nav-link">
        {t('Navigation.dashboard')}
      </Link>
      <Link to="/products" search={{ category: 'all' }} className="nav-link">
        {t('Navigation.products')}
      </Link>
      <Link to="/profile" className="nav-link">
        {t('Navigation.profile')}
      </Link>
    </nav>
  );
}
```

**Error Components with i18n:**

```tsx
// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import useAppTranslation from '@/hooks/useAppTranslation';

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
});

function ErrorComponent({ error }: { error: Error }) {
  const { t } = useAppTranslation();

  return (
    <div className="error-page">
      <h1>{t('Error.somethingWentWrong')}</h1>
      <p>{t('Error.errorMessage')}</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function NotFoundComponent() {
  const { t } = useAppTranslation();

  return (
    <div className="not-found-page">
      <h1>{t('Error.pageNotFound')}</h1>
      <p>{t('Error.pageNotFoundMessage')}</p>
      <Link to="/">{t('Error.goHome')}</Link>
    </div>
  );
}

function RootComponent() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}
```

**Loading States with i18n:**

```tsx
// src/routes/dashboard/settings.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import useAppTranslation from '@/hooks/useAppTranslation';

export const Route = createFileRoute('/dashboard/settings')({
  component: SettingsPage,
});

function LoadingSpinner() {
  const { t } = useAppTranslation();

  return (
    <div className="loading-spinner">
      <span>{t('Common.loading')}</span>
    </div>
  );
}

function SettingsPage() {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('SettingsPage.title')}</h1>

      <Suspense fallback={<LoadingSpinner />}>
        <SettingsForm />
      </Suspense>
    </div>
  );
}
```

**Search Validation with i18n Error Messages:**

```tsx
// src/routes/search/index.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import useAppTranslation from '@/hooks/useAppTranslation';

const searchSchema = z.object({
  q: z.string().min(1, 'SearchPage.validation.queryRequired'),
  type: z.enum(['all', 'posts', 'users']).default('all'),
});

export const Route = createFileRoute('/search/')({
  component: SearchPage,
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    // Redirect if search query is invalid
    if (!search.q) {
      throw redirect({ to: '/' });
    }
  },
});

function SearchPage() {
  const { t } = useAppTranslation();
  const { q, type } = Route.useSearch();

  return (
    <div>
      <h1>{t('SearchPage.title')}</h1>
      <p>{t('SearchPage.searchingFor', { query: q, type })}</p>
    </div>
  );
}
```

### TanStack Router Specific i18n Optimizations

**Route-Based Code Splitting with i18n:**

```tsx
// src/routes/admin/index.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

// Lazy load both component and its translations
const AdminDashboard = lazy(async () => {
  const [mod, translations] = await Promise.all([
    import('../components/AdminDashboard'),
    import('../i18n/locales/admin/en-US.json'),
  ]);

  // Register admin-specific translations
  i18n.addResourceBundle('en-US', 'admin', translations.default);

  return mod;
});

export const Route = createLazyFileRoute('/admin/')({
  component: AdminDashboard,
});
```

### Translation Key Organization for TanStack Router

```json
{
  "Common": {
    "loading": "Loading...",
    "error": "Error",
    "save": "Save",
    "cancel": "Cancel",
    "submit": "Submit",
    "search": "Search",
    "filter": "Filter"
  },
  "Navigation": {
    "home": "Home",
    "dashboard": "Dashboard",
    "products": "Products",
    "profile": "Profile",
    "admin": "Admin"
  },
  "Dashboard": {
    "title": "Dashboard",
    "welcomeMessage": "Welcome back, {{name}}!",
    "recentActivity": "Recent Activity",
    "quickActions": "Quick Actions"
  },
  "ProductsPage": {
    "title": "Products",
    "searchPlaceholder": "Search products...",
    "browseProducts": "Browse our products",
    "searchResults": "Results for \"{{query}}\"",
    "noResults": "No products found",
    "loadMore": "Load More Products"
  },
  "SearchPage": {
    "title": "Search Results",
    "searchingFor": "Searching {{type}} for \"{{query}}\"",
    "validation": {
      "queryRequired": "Search query is required"
    }
  },
  "Error": {
    "somethingWentWrong": "Something went wrong!",
    "pageNotFound": "Page Not Found",
    "pageNotFoundMessage": "The page you're looking for doesn't exist.",
    "errorMessage": "An unexpected error occurred",
    "goHome": "Go Home"
  }
}
```

### Testing TanStack Router i18n

**Route component testing:**

```tsx
// __tests__/dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from '@tanstack/react-router';
import { createRoutesStub } from '@/utils/testing/createRoutesStub';
import DashboardPage from '@/routes/dashboard/index';

// setupTests.ts includes this mock:
// vi.mock('react-i18next', () => ({
//   useTranslation: () => ({ t: (key: string) => key })
// }));

describe('DashboardPage', () => {
  it('renders translated content', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/dashboard',
        component: DashboardPage,
      },
    ]);

    render(<RoutesStub />);

    // Test expects translation keys since that's what the mock returns
    expect(screen.getByText('Dashboard.title')).toBeInTheDocument();
  });
});
```

**Navigation testing with type safety:**

```tsx
// __tests__/navigation.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '@/components/Navigation';
import { createRoutesStub } from '@/utils/testing/createRoutesStub';

describe('Navigation', () => {
  it('navigates to products with correct search params', async () => {
    const user = userEvent.setup();

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        component: () => <Navigation />,
      },
      {
        path: '/products',
        component: () => <div>Products Page</div>,
      },
    ]);

    render(<RoutesStub />);

    await user.click(screen.getByText('Navigation.products'));

    expect(screen.getByText('Products Page')).toBeInTheDocument();
  });
});
```

This ensures that all user-facing text in the TanStack Router SPA is properly internationalized while leveraging TanStack Router's powerful type-safe routing and search parameter features.
