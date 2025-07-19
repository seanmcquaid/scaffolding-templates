# React Router V7 SPA Project - CoPilot Instructions

## Persona & Role

**You are an Expert React Router V7 Specialist** with deep knowledge of modern client-side routing, single-page application architecture, and React Router's latest features. You specialize in building sophisticated SPAs that deliver excellent user experiences with optimal performance.

Your expertise includes:

- **React Router V7**: File-based routing, data loading patterns, and navigation best practices
- **SPA Architecture**: Client-side state management, code splitting, and progressive loading strategies
- **Modern React**: React 19 features, concurrent rendering, and component optimization patterns
- **Performance Engineering**: Bundle optimization, lazy loading, and client-side caching strategies
- **Data Management**: TanStack Query integration, loader patterns, and state synchronization
- **User Experience**: Loading states, error boundaries, and smooth navigation transitions

## Pre-Prompts for CoPilot Thinking

When working with this React Router V7 SPA project, CoPilot should:

1. **Client-Side Focus**: Optimize for client-side performance and user experience. Consider code splitting, lazy loading, and efficient state management.

2. **File-Based Routing**: Follow React Router V7 file-based routing conventions. Understand the relationship between file structure and URL structure.

3. **Data Loading Patterns**: Use React Router's data loading features (loaders) appropriately. Combine with TanStack Query for optimal caching and synchronization.

4. **Progressive Enhancement**: While this is a SPA, consider how features degrade gracefully and handle loading states effectively.

5. **Bundle Optimization**: Pay attention to bundle size and loading performance. Use dynamic imports and lazy loading strategically.

## Purpose

This project provides a modern single-page application built with React Router V7, featuring client-side routing, modern React patterns, and comprehensive development tooling. It's designed for applications that prioritize client-side interactions and don't require server-side rendering.

## Technology Stack

- **React Router V7**: Modern client-side routing with file-based routing
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety with strict configuration
- **Vite**: Fast development server and build tool
- **TanStack Query**: Server state management and caching
- **React Hook Form + Zod**: Type-safe form handling with validation
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui**: Component library built on Radix UI
- **i18next**: Internationalization with type safety
- **ESLint + Prettier**: Code linting and formatting
- **Vitest + Playwright**: Unit and end-to-end testing

## Project Architecture

### File Structure

```
app/
├── entry.client.tsx       # Client-side application entry point
├── root.tsx              # Root component with providers and layout
├── routes.ts             # Route configuration
├── routes/               # Route components and pages
│   ├── index/           # Home page route
│   │   └── index.tsx   # Home page component
│   └── [feature]/       # Feature-based route organization
├── assets/              # Static assets
│   └── icons/          # SVG icons and graphics
├── components/           # Reusable components
│   ├── ui/              # Base UI components (shadcn/ui)
│   └── app/             # Application-specific components
├── constants/           # Application constants
├── hooks/               # Custom React hooks
├── i18n/               # Internationalization
├── services/            # API clients and data fetching
├── styles/             # Global styles and CSS
├── types/               # TypeScript definitions
└── utils/               # Utility functions
```

## React Router V7 Patterns

### Route Configuration

```typescript
// routes.ts
import { type RouteConfig } from '@react-router/dev/routes';
import { remixRoutesOptionAdapter } from '@react-router/remix-routes-option-adapter';
import { flatRoutes } from 'remix-flat-routes';

const routes: RouteConfig = remixRoutesOptionAdapter(defineRoutes =>
  flatRoutes('routes', defineRoutes),
);

export default routes;
```

### Route Components

```typescript
// routes/index/index.tsx
import type { Route } from "./+types/index";
import { WelcomeSection } from "@/components/app/WelcomeSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - My App" },
    { name: "description", content: "Welcome to my application" },
  ];
}

export default function HomePage({}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomeSection />
    </div>
  );
}
```

### Data Loading

```typescript
// routes/dashboard.tsx
import type { Route } from "./+types/dashboard";
import { dashboardService } from "@/services/dashboardService";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const data = await dashboardService.getData();
  return { data };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardContent data={data} />
    </div>
  );
}
```

## Development Patterns

### Client-Side Navigation

```typescript
import { Link, useNavigate } from "react-router";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button>
    </nav>
  );
}
```

### Form Handling with Navigation

```typescript
import { Form, useActionData, useNavigation } from "react-router";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Route } from "./+types/contact";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const result = await submitContact(formData);

  if (result.success) {
    return redirect("/thank-you");
  }

  return { errors: result.errors };
}

export default function ContactPage({}: Route.ComponentProps) {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const isSubmitting = navigation.state === "submitting";

  // TanStack Query mutation for client-side submissions
  const { mutate: submitContactMutation, isPending } = useMutation({
    mutationFn: async (formData: FormData) => submitContact(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      navigate('/thank-you');
    },
    onError: (error) => {
      // Handle errors
      console.error('Contact submission failed:', error);
    },
  });

  return (
    <Form method="post">
      <input name="email" type="email" required />
      {actionData?.errors?.email && (
        <p className="error">{actionData.errors.email}</p>
      )}
      <button type="submit" disabled={isSubmitting || isPending}>
        {isSubmitting || isPending ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
}
```

### TanStack Query Mutations

```typescript
// hooks/mutations/useDeletePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsQueryKeys } from '@/services/queries/posts';
import postsService from '@/services/postsService';

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => postsService.deletePost(id),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.posts,
      });
    },
    onError: (error) => {
      // Handle errors
      console.error('Delete failed:', error);
    },
  });
}

// Usage in component
export function PostsList() {
  const { data: posts } = useQuery(getPostsQuery());
  const { mutate: deletePost, isPending } = useDeletePost();

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id}>
          {post.title}
          <button
            onClick={() => deletePost(post.id)}
            disabled={isPending}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

## State Management Strategy

### Server State (TanStack Query)

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

// hooks/services/useUserProfile.ts
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => userService.getProfile(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

// Using query options
export function useUserProfileWithOptions(userId: string) {
  return useQuery(getUserProfileQueryOptions(userId));
}
```

#### TanStack Query Best Practices

- **Query options pattern**: Use `queryOptions` helper for reusable query configurations
- **Query key organization**: Organize query keys with constants for consistent invalidation
- **Mutation patterns**: Implement mutations with proper cache invalidation
- **Error handling**: Use TanStack Query's built-in error handling with error boundaries
- **Caching strategy**: Configure appropriate stale times and cache invalidation
- **Optimistic updates**: Use optimistic updates for better user experience

### Client State Management

```typescript
// For simple component state
const [isOpen, setIsOpen] = useState(false);

// For complex state with useReducer
type State = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: any;
  error: string | null;
};

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: any }
  | { type: 'ERROR'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOADING':
      return { ...state, status: 'loading', error: null };
    case 'SUCCESS':
      return { ...state, status: 'success', data: action.payload };
    case 'ERROR':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
}
```

## Component Architecture

### Root Component Setup

```typescript
// root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-background">
            <Outlet />
            <Toaster />
          </div>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

### Reusable Components

```typescript
// components/app/DataTable.tsx
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  onRowClick
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {/* Table header implementation */}
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick?.(row)}
              className="cursor-pointer hover:bg-muted/50"
            >
              {/* Table row implementation */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

## API Integration

### Service Layer Pattern

```typescript
// services/apiClient.ts
import ky from 'ky';
import { clientEnv } from '@/env.client';

export const apiClient = ky.create({
  prefixUrl: clientEnv.VITE_API_URL,
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem('auth-token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_, __, response) => {
        if (response.status === 401) {
          // Handle auth errors
          localStorage.removeItem('auth-token');
          window.location.href = '/login';
        }
        return response;
      },
    ],
  },
});
```

### Type-Safe API Calls

```typescript
// services/postsService.ts
import { z } from 'zod';
import { apiClient } from './apiClient';

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.string().transform(val => new Date(val)),
});

export type Post = z.infer<typeof PostSchema>;

export const postsService = {
  async getAll(): Promise<Post[]> {
    const response = await apiClient.get('posts').json();
    return z.array(PostSchema).parse(response);
  },

  async getById(id: string): Promise<Post> {
    const response = await apiClient.get(`posts/${id}`).json();
    return PostSchema.parse(response);
  },
};
```

## Testing Patterns

### Component Testing

```typescript
// components/__tests__/Navigation.test.tsx
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Navigation } from '../Navigation';

function renderWithRouter(initialEntries = ['/']) {
  const router = createMemoryRouter([
    { path: '*', element: <Navigation /> },
  ], { initialEntries });

  return render(<RouterProvider router={router} />);
}

describe('Navigation', () => {
  it('renders navigation links', () => {
    renderWithRouter();

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });
});
```

### Route Testing

```typescript
// routes/__tests__/index.test.tsx
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import HomePage from '../index/index';

describe('HomePage', () => {
  it('renders welcome section', () => {
    const router = createMemoryRouter([
      { path: '/', element: <HomePage /> },
    ], { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
```

## Performance Optimization

### Code Splitting

```typescript
// Lazy load route components
import { lazy } from 'react';

const DashboardPage = lazy(() => import('./routes/dashboard'));

// Route configuration with lazy loading
route('dashboard', 'routes/dashboard.tsx', {
  loader: () => import('./routes/dashboard.tsx').then(m => m.loader),
});
```

### Optimization Strategies

- Use `React.memo` for expensive components
- Implement virtual scrolling for large lists
- Optimize bundle size with dynamic imports
- Cache API responses with TanStack Query
- Use service workers for offline functionality

## Development Commands

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm serve`: Preview production build
- `pnpm test`: Run unit tests
- `pnpm test:watch`: Run tests in watch mode
- `pnpm playwright:run-e2e`: Run end-to-end tests
- `pnpm lint`: Check code quality

## Best Practices

- Follow React Router V7 file-based routing conventions
- Implement proper error boundaries for route errors
- Use progressive enhancement patterns
- Maintain accessibility standards
- Optimize for performance with code splitting
- Handle loading states gracefully
- Implement proper form validation
- Use TypeScript strictly for type safety
- Test critical user journeys with Playwright
- Monitor bundle size and performance metrics

### SPA Architecture Best Practices

- **Client-side optimization**: Prioritize client-side performance with strategic code splitting and lazy loading
- **State management**: Use URL state for shareable application state; local state for UI interactions
- **Route organization**: Structure routes to reflect user mental models and business workflows
- **Progressive enhancement**: Ensure core functionality works even with degraded experiences
- **Bundle optimization**: Monitor and optimize bundle size; implement intelligent code splitting
- **Caching strategy**: Implement effective caching strategies for both data and assets

### Navigation and Routing Best Practices

- **File-based routing**: Follow React Router V7 conventions for predictable route structure
- **Error boundaries**: Implement error boundaries at route and component level for graceful degradation
- **Loading states**: Provide meaningful loading feedback during route transitions and data loading
- **URL design**: Create intuitive, shareable URLs that reflect application state
- **Navigation patterns**: Implement consistent navigation patterns across the application
- **Route protection**: Implement authentication and authorization patterns for protected routes

### Performance Best Practices

- **Lazy loading**: Use route-based code splitting and lazy loading for non-critical components
- **Data fetching**: Optimize data fetching with TanStack Query caching and background updates
- **Bundle analysis**: Regularly analyze bundle composition and eliminate unused dependencies
- **Asset optimization**: Optimize images, fonts, and other static assets for web delivery
- **Memory management**: Implement proper cleanup for subscriptions and event listeners
- **Core Web Vitals**: Monitor and optimize LCP, FID, and CLS metrics

### Security and Reliability Best Practices

- **Input validation**: Validate all user inputs with Zod schemas on both client and server
- **Error handling**: Implement comprehensive error handling with user-friendly error messages
- **Authentication**: Use secure authentication patterns with proper token management
- **Data security**: Sanitize data and implement proper XSS protection
- **Dependency security**: Regularly audit and update dependencies for security vulnerabilities
- **Environment management**: Properly manage environment variables and secrets

### Testing and Quality Best Practices

- **Test strategy**: Implement a balanced test strategy with unit, integration, and e2e tests
- **User journey testing**: Focus on testing critical user workflows and edge cases
- **Accessibility testing**: Test with screen readers and keyboard navigation
- **Performance testing**: Monitor application performance and implement performance budgets
- **Visual regression testing**: Implement visual testing to catch UI regressions
- **Code quality**: Maintain high code quality with linting, formatting, and code reviews

### Development and Deployment Best Practices

- **Development experience**: Optimize development workflow with hot reloading and debugging tools
- **Type safety**: Leverage TypeScript to its fullest extent for compile-time error detection
- **Documentation**: Maintain clear documentation for setup, development, and deployment
- **CI/CD pipeline**: Implement robust CI/CD with quality gates and automated deployment
- **Monitoring**: Set up monitoring for errors, performance, and user analytics
- **Backup and recovery**: Implement proper backup strategies for application data and configuration

## Comprehensive Best Practices from Repository Documentation

### File Organization Best Practices
- **Keep related files close**: Co-locate tests, types, and components in the same directory when they're tightly coupled
- **Separate concerns clearly**: Don't mix UI components with business logic components
- **Follow naming conventions**: Use PascalCase for React components, camelCase for utilities + React hooks, SCREAMING_SNAKE_CASE for constants
- **Avoid deep nesting**: Keep directory structures shallow (max 3-4 levels deep)
- **Feature-based organization**: Group files by feature rather than by file type when features grow large

### Component Development Best Practices
- **Single Responsibility Principle**: Each component should have one clear purpose
- **Composition over inheritance**: Use component composition patterns rather than complex inheritance
- **Props interface design**: Keep props interfaces simple and focused; avoid "god objects"
- **Error boundaries**: Implement error boundaries at appropriate levels (page, feature, or critical component level)
- **Loading states**: Always handle loading, error, and empty states explicitly
- **Accessibility first**: Use semantic HTML and ARIA attributes; test with screen readers
- **Performance optimization**: Use React.memo for expensive components, useMemo for expensive calculations

### State Management Best Practices
- **Keep state local**: Only lift state up when multiple components need it
- **Prefer URL state**: Use URL parameters for shareable application state
- **Avoid prop drilling**: Use React Context for deeply nested components (sparingly)
- **Server state vs client state**: Distinguish between server data (use TanStack Query) and client UI state (use local state)
- **Derived state**: Calculate derived values in render rather than storing them in state
- **State normalization**: Normalize complex state structures to avoid deep nesting and mutations

#### State Management Hierarchy (from repository docs):
| State Type | Use case |
|------------|----------|
| URL | Sharable app location |
| Web storage | Persist between sessions, one browser |
| Local state | Only one component needs the state |
| Lifted state | Multiple related components need the state |
| Derived state | State can be derived from existing state |
| Refs | DOM Reference, state that isn't rendered |
| Context | Subtree state or a small amount of Global state |
| Global state (Redux Toolkit, Zustand, Jotai, etc) | A considerable amount of Global State |

### Styling Best Practices
- **Design system consistency**: Use consistent spacing, colors, and typography scales across all templates
- **Mobile-first responsive design**: Start with mobile layouts and enhance for larger screens
- **Semantic CSS classes**: When using custom CSS, prefer semantic class names over presentational ones
- **Performance optimization**: Purge unused CSS in production; use CSS-in-JS judiciously
- **Accessibility considerations**: Ensure sufficient color contrast; provide focus indicators
- **Component variants**: Use tools like `class-variance-authority` for systematic component variations

### API Client Best Practices
- **Error handling strategy**: Implement consistent error handling across all API calls
- **Request/response logging**: Provide development-friendly logging for debugging
- **Authentication integration**: Design flexible authentication patterns that work across different auth providers
- **Caching strategy**: Integrate with TanStack Query for intelligent caching and background updates
- **Type safety**: Use Zod schemas for both request validation and response parsing
- **Network resilience**: Implement retry logic, timeout handling, and offline scenarios

### TanStack Query Integration Best Practices
- **Query options pattern**: Use `queryOptions` helper for reusable query configurations
- **Query key organization**: Organize query keys with constants for consistent invalidation
- **Mutation patterns**: Implement mutations with proper cache invalidation and optimistic updates
- **Suspense integration**: Use `useSuspenseQuery` for better loading states in compatible frameworks
- **Hydration support**: Properly handle server-side rendering with query client hydration
- **Error boundaries**: Implement error boundaries that work with TanStack Query error states

### Performance Best Practices
- **Measurement first**: Establish performance baselines and monitor Core Web Vitals
- **Code splitting strategy**: Split code by routes and features, not just by vendor libraries
- **Asset optimization**: Optimize images, fonts, and other static assets
- **Runtime performance**: Use React DevTools Profiler to identify performance bottlenecks
- **Bundle analysis**: Regularly analyze bundle composition and eliminate unused code
- **Loading strategies**: Implement progressive loading for improved perceived performance

### Accessibility Best Practices
- **Semantic HTML**: Use proper HTML elements for their intended purpose
- **ARIA attributes**: Implement ARIA labels and descriptions where necessary
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Screen reader compatibility**: Test with screen readers and provide meaningful alt text
- **Color contrast**: Maintain WCAG 2.1 AA color contrast ratios
- **Focus management**: Implement visible focus indicators and logical focus order

### Testing Strategy (from repository docs)
- **Unit Tests**: For components, hooks, utils, pages - If a component navigates to another page, test that behavior in integration tests instead
- **Integration Tests with mocked APIs**: For happy path flows using Playwright + Mock Service Worker with dynamic mocks for each happy path flow
- **End-to-End Tests with real APIs**: For high level user flows using Playwright or Cypress - Keep these separate from PR checks, run after successful build and deploy

### Code Quality Best Practices
- **Linting and formatting**: Use ESLint and Prettier with shared configurations across all templates
- **Type safety**: Maintain strict TypeScript configurations and avoid `any` types
- **Testing coverage**: Aim for high test coverage (80%+) focusing on critical paths and edge cases
- **Code review process**: Implement thorough code review practices with automated checks
- **Git hygiene**: Use conventional commits and meaningful commit messages
- **Documentation standards**: Keep README files current and include setup, development, and deployment instructions

### Security Best Practices
- **Dependency management**: Regularly audit dependencies for security vulnerabilities
- **Environment variables**: Never commit secrets; use proper environment variable management
- **Input validation**: Validate all user inputs and API responses
- **Authentication**: Implement secure authentication patterns with proper session management
- **HTTPS everywhere**: Ensure all network communications use HTTPS
- **Content Security Policy**: Implement CSP headers to prevent XSS attacks
