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

1. **Client-Side Focus**: Optimize for client-side performance and user experience. Consider code splitting, lazy loading, and efficient state management. Remember this is a SPA - no server-side rendering concerns.

2. **File-Based Routing**: Follow React Router V7 file-based routing conventions strictly. Understand the relationship between file structure and URL structure using `createLazyFileRoute` and `createFileRoute`.

3. **Client-Side Data Loading**: Use React Router's `clientLoader` and `clientAction` patterns. Combine with TanStack Query for optimal caching, background updates, and synchronization.

4. **SPA-Specific Patterns**: Focus on client-side navigation, browser history management, and client-side state persistence. Handle loading states during navigation transitions.

5. **Bundle Optimization**: Pay attention to bundle size and loading performance. Use dynamic imports, lazy routes, and code splitting strategically for optimal initial load and navigation performance.

## Purpose

This project provides a modern single-page application built with React Router V7, featuring client-side routing, modern React patterns, and comprehensive development tooling. It's designed for applications that prioritize client-side interactions and don't require server-side rendering.

## Technology Stack

- **React Router V7**: Modern client-side routing with file-based routing
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety with strict configuration
- **Vite**: Fast development server and build tool
- **TanStack Query**: Server state management and caching
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

### Data Loading (Client-Side Focus)

```typescript
// routes/dashboard.tsx - SPA-optimized client-side data loading
import type { Route } from "./+types/dashboard";
import { dashboardService } from "@/services/dashboardService";

// For SPAs, prefer clientLoader for all data loading
export async function clientLoader({}: Route.ClientLoaderArgs) {
  // Client-side data fetching with error handling
  try {
    const data = await dashboardService.getData();
    return { data };
  } catch (error) {
    // Handle errors gracefully in client-side context
    console.error('Dashboard data loading failed:', error);
    throw new Response('Failed to load dashboard data', { status: 500 });
  }
}

// SPA-specific component without SSR concerns
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

This project includes **usehooks-ts** for common state management patterns. Always prefer proven hooks over custom implementations:

```typescript
import {
  useLocalStorage,
  useToggle,
  useCounter,
  useDebounce,
} from 'usehooks-ts';
import { useForm } from 'react-hook-form';

// Storage hooks for persistence
const [theme, setTheme] = useLocalStorage('theme', 'light');
const [preferences, setPreferences] = useLocalStorage(
  'userPrefs',
  defaultPrefs,
);

// UI state hooks
const [isVisible, toggleVisible] = useToggle(false);
const { count, increment, decrement, reset } = useCounter(0);

// Performance hooks
const debouncedSearch = useDebounce(searchTerm, 300);

// Form state - ALWAYS use React Hook Form
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});
```

**Form State Management**: Never manage form state manually. Always use React Hook Form:

```typescript
// ✅ Good - Use React Hook Form
const ContactForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
};

// ❌ Bad - Manual form state management
const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  // Don't do this - use React Hook Form instead
};
```

**Complex UI State**: Use useReducer only for complex UI state, not data management:

```typescript
// ✅ Good - UI state like form wizards, modals with multiple steps
type WizardState = {
  step: number;
  data: Record<string, any>;
  isValid: boolean;
};

const wizardReducer = (state: WizardState, action: WizardAction) => {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: Math.max(0, state.step - 1) };
    default:
      return state;
  }
};

// ❌ Bad - Don't use useReducer for data that should be in TanStack Query
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload }; // Use TanStack Query instead
  }
};
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

## SPA-Specific Testing Patterns

### Component Testing with Client-Side Routing

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
  it('renders navigation links correctly for SPA', () => {
    renderWithRouter();

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('handles client-side navigation', async () => {
    const user = userEvent.setup();
    renderWithRouter(['/']);

    await user.click(screen.getByRole('link', { name: 'About' }));
    
    // Should navigate without page reload
    expect(window.location.pathname).toBe('/about');
  });
});
```

### Client-Side Data Loading Testing

```typescript
// routes/__tests__/dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardPage from '../dashboard';

describe('Dashboard Route - SPA Patterns', () => {
  it('loads and displays dashboard data via clientLoader', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const router = createMemoryRouter([
      { 
        path: '/dashboard', 
        element: <DashboardPage />,
        loader: async () => ({ data: [{ id: 1, name: 'Test Item' }] })
      },
    ], { initialEntries: ['/dashboard'] });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });
  });

  it('handles client-side navigation between dashboard filters', async () => {
    const user = userEvent.setup();
    // Test client-side filter changes without page reload
    renderWithRouter(['/dashboard?filter=all']);

    await user.selectOptions(screen.getByRole('combobox'), 'active');
    
    expect(window.location.search).toContain('filter=active');
  });
});
```

### SPA-Specific E2E Testing

```typescript
// e2e/spa-navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('SPA Navigation Patterns', () => {
  test('should handle client-side routing without page reloads', async ({ page }) => {
    await page.goto('/');
    
    // Monitor for navigation events
    let navigationOccurred = false;
    page.on('framenavigated', () => {
      navigationOccurred = true;
    });

    await page.click('a[href="/dashboard"]');
    await expect(page).toHaveURL('/dashboard');
    
    // Should be client-side navigation (no full page reload)
    expect(navigationOccurred).toBe(false);
  });

  test('should handle browser back/forward with SPA state', async ({ page }) => {
    await page.goto('/dashboard?filter=all');
    await page.click('a[href="/profile"]');
    
    await page.goBack();
    await expect(page).toHaveURL('/dashboard?filter=all');
    
    // State should be preserved
    await expect(page.locator('[data-testid="filter-select"]')).toHaveValue('all');
  });
});
```

## SPA Deployment Patterns

### Client-Side Rendering (CSR) Architecture

```
Domain -> DNS -> CDN -> WAF -> Static Hosting
```

- **CDN for Static Assets**: Cloudfront, Fastly, or Cloudflare for global distribution
- **Static File Hosting**: S3, Netlify, Vercel, or GitHub Pages for SPA files
- **Web Application Firewall**: Cloudflare, AWS WAF for security
- **DNS Resolution**: Route53, Cloudflare DNS for domain management

### Vite Build Optimization for SPAs

```typescript
// vite.config.ts - SPA-optimized build
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize for SPA deployment
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable in production
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Optimize chunk splitting for SPAs
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
  // Enable gzip compression
  server: {
    middlewareMode: false,
  },
});
```

### Static Site Configuration

```nginx
# nginx.conf for SPA deployment
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options nosniff;
    }

    # SPA fallback - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header Referrer-Policy strict-origin-when-cross-origin;
    }

    # Security headers
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:";
}
```

### Netlify Deployment Configuration

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
  PNPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}

[headers]
  for = "/assets/*"
    [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

  for = "*.js"
    [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

  for = "*.css"
    [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

  for = "/"
    [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### AWS S3 + CloudFront Deployment

```yaml
# aws-cloudformation-spa.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'SPA deployment with S3 and CloudFront'

Resources:
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '${AWS::StackName}-spa-bucket'
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true

  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt S3Bucket.RegionalDomainName
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: !Sub 'origin-access-identity/cloudfront/${OAI}'
        Enabled: true
        DefaultRootObject: index.html
        CustomErrorResponses:
          - ErrorCode: 404
            ResponseCode: 200
            ResponsePagePath: /index.html
          - ErrorCode: 403
            ResponseCode: 200
            ResponsePagePath: /index.html
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          Compress: true
          CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad # Managed-CachingOptimized
```

### SPA Performance Optimization

```javascript
// Performance monitoring for SPAs
// src/utils/performance.ts
export const initPerformanceMonitoring = () => {
  // Core Web Vitals monitoring
  if ('PerformanceObserver' in window) {
    // Monitor LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcpEntry = entries[entries.length - 1];
      console.log('LCP:', lcpEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor FID (First Input Delay)
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Monitor CLS (Cumulative Layout Shift)
    new PerformanceObserver((list) => {
      let clsValue = 0;
      list.getEntries().forEach((entry) => {
        clsValue += entry.value;
      });
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
};
```

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
- **Follow naming conventions**: Use PascalCase for React components and constants, camelCase for utilities + React hooks
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
- **Use React Hook Form for forms**: Never manage form state manually with useState
- **Leverage usehooks-ts**: Use proven hooks instead of implementing common patterns from scratch
- **Avoid prop drilling**: Use React Context for deeply nested components (sparingly)
- **Server state vs client state**: Distinguish between server data (use TanStack Query) and client UI state (use local state)
- **Derived state**: Calculate derived values in render rather than storing them in state
- **State normalization**: Normalize complex state structures to avoid deep nesting and mutations
- **UseReducer for UI only**: Only use useReducer for complex UI state, not data management

#### State Management Hierarchy (from repository docs):

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

**HTTP Requests**: For managing state for HTTP requests:
1. Use what's built into your framework (React Router V7 loaders for initial data)
2. TanStack Query for client-side caching and synchronization
3. Redux Toolkit Query if using Redux Toolkit

##### State Management Code Examples

**URL State - Search and Filter Interface with React Router:**
```tsx
import { useSearchParams } from 'react-router';

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tempSearch, setTempSearch] = useState(searchParams.get('search') || '');

  // Extract state from URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Helper to update URL params
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
    if (!('page' in updates) && Object.keys(updates).some(key => key !== 'page')) {
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: tempSearch });
  };

  // Filter and paginate data based on URL state
  const filteredResults = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'all' || item.category === category)
  );

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      
      <select
        value={category}
        onChange={(e) => updateParams({ category: e.target.value })}
      >
        <option value="all">All Categories</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </select>

      {/* Results and pagination */}
      <div className="results">
        {filteredResults.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};
```

**Web Storage - Type-Safe Persistence with i18n:**
```tsx
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import useAppTranslation from '@/hooks/useAppTranslation';

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'en-US' | 'en-CA'; // Align with actual locale detection
  notifications: boolean;
}

const UserSettings = () => {
  const { t, i18n } = useAppTranslation();
  
  // localStorage for persistent preferences
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'userPreferences',
    { theme: 'light', language: 'en-US', notifications: true }
  );

  // sessionStorage for temporary data
  const [sessionData, setSessionData] = useSessionStorage('sessionData', {
    tabId: Math.random().toString(36).substr(2, 9),
    startTime: new Date().toISOString(),
  });

  const updateTheme = (theme: UserPreferences['theme']) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  const updateLanguage = (language: UserPreferences['language']) => {
    setPreferences(prev => ({ ...prev, language }));
    i18n.changeLanguage(language); // Update i18next language
  };

  return (
    <div>
      <h3>{t('Settings.title')}</h3>
      <select
        value={preferences.theme}
        onChange={(e) => updateTheme(e.target.value as UserPreferences['theme'])}
      >
        <option value="light">{t('Settings.lightTheme')}</option>
        <option value="dark">{t('Settings.darkTheme')}</option>
        <option value="auto">{t('Settings.autoTheme')}</option>
      </select>

      <select
        value={preferences.language}
        onChange={(e) => updateLanguage(e.target.value as UserPreferences['language'])}
      >
        <option value="en-US">{t('Settings.englishUS')}</option>
        <option value="en-CA">{t('Settings.englishCA')}</option>
      </select>

      <h3>{t('Settings.sessionInfo')}</h3>
      <p>{t('Settings.tabId')}: {sessionData.tabId}</p>
      <p>{t('Settings.sessionStarted')}: {sessionData.startTime}</p>
    </div>
  );
};
```

**Local State - Component-Specific State with i18n:**
```tsx
import { useToggle, useCounter } from 'usehooks-ts';
import useAppTranslation from '@/hooks/useAppTranslation';

const LocalStateExample = () => {
  const { t } = useAppTranslation();
  
  // Simple boolean state
  const [isVisible, toggleVisible] = useToggle(false);
  
  // Counter with built-in operations
  const { count, increment, decrement, reset, setCount } = useCounter(0);

  return (
    <div>
      {/* Toggle example */}
      <button onClick={toggleVisible}>
        {isVisible ? t('Common.hide') : t('Common.show')} {t('Common.content')}
      </button>
      {isVisible && <p>{t('LocalState.toggledContent')}</p>}

      {/* Counter example */}
      <div>
        <span>{t('Common.count')}: {count}</span>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>{t('Common.reset')}</button>
        <button onClick={() => setCount(10)}>{t('LocalState.setToTen')}</button>
      </div>
    </div>
  );
};
```

**Lifted State - Shared Between Components:**
```tsx
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCartContext = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      <ProductCatalog onAddToCart={addToCart} />
      <CartSidebar items={cartItems} onRemove={removeFromCart} />
      <CartSummary items={cartItems} />
    </div>
  );
};
```

**Derived State - Computed Values:**
```tsx
import { useMemo } from 'react';

const ShoppingCartSummary = ({ items }: { items: CartItem[] }) => {
  // Compute derived values with useMemo
  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;
    const mostExpensive = items.reduce((max, item) => 
      item.price > max.price ? item : max, items[0]
    );

    return { totalItems, totalPrice, averagePrice, mostExpensive };
  }, [items]);

  return (
    <div>
      <p>Total Items: {summary.totalItems}</p>
      <p>Total Price: ${summary.totalPrice.toFixed(2)}</p>
      <p>Average Price: ${summary.averagePrice.toFixed(2)}</p>
      {summary.mostExpensive && (
        <p>Most Expensive: {summary.mostExpensive.name}</p>
      )}
    </div>
  );
};
```

**Refs - DOM Interaction and Non-Rendering Values:**
```tsx
import { useRef, useEffect } from 'react';
import { usePrevious, useInterval } from 'usehooks-ts';

const RefsExample = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  // Focus management
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Timer with cleanup
  useInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={focusInput}>Focus Input</button>
      
      <p>Current count: {count}</p>
      <p>Previous count: {previousCount}</p>
    </div>
  );
};
```

**Context - Subtree State Management with i18n:**
```tsx
import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useAppTranslation from '@/hooks/useAppTranslation';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Usage in components with proper i18n
const ThemeToggle = () => {
  const { t } = useAppTranslation();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? t('Theme.switchToDark') : t('Theme.switchToLight')}
    </button>
  );
};
```

**Global State - Application-Wide State with Zustand:**
```tsx
import { create } from 'zustand';

interface GlobalState {
  user: User | null;
  notifications: Notification[];
  isOnline: boolean;
  setUser: (user: User | null) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  notifications: [],
  isOnline: navigator.onLine,
  setUser: (user) => set(() => ({ user })),
  addNotification: (notification) => {
    const newNotification = { ...notification, id: Date.now() };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter(
          (n) => n.id !== newNotification.id
        ),
      }));
    }, 5000);
  },
}));

// Usage in components
const Notifications = () => {
  const { notifications, addNotification } = useGlobalStore();

  return (
    <div>
      <button
        onClick={() =>
          addNotification({ message: 'New notification!', type: 'info' })
        }
      >
        Add Notification
      </button>
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
};
```

**Form State Management with React Hook Form:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
});

type UserFormData = z.infer<typeof userSchema>;

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      await submitUser(data);
      reset();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name')}
        placeholder="Name"
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register('email')}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('age', { valueAsNumber: true })}
        type="number"
        placeholder="Age"
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

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

## ⚠️ Translation Requirements - MANDATORY

**ALL USER-FACING TEXT MUST BE TRANSLATED** - This is a strict requirement for this React Router V7 SPA project.

### Translation Enforcement Rules

1. **Never use hardcoded strings** - All text must use `useAppTranslation` hook
2. **ESLint will catch violations** - The `i18next/no-literal-string` rule prevents hardcoded text
3. **Tests validate i18n compliance** - Mock functions return translation keys for validation
4. **Client-side optimization** - Leverage React Router's code splitting with i18n bundles

### React Router V7 SPA i18n Patterns

**Route Components with i18n:**

```tsx
// app/routes/dashboard.index.tsx
import { useLoaderData } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';
import type { Route } from './+types';

export async function loader({ request }: Route.LoaderArgs) {
  // Loader logic here
  return { user: await getUser() };
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const { t } = useAppTranslation();
  const { user } = loaderData;

  return (
    <div>
      <h1>{t('Dashboard.title')}</h1>
      <p>{t('Dashboard.welcomeBack', { name: user.name })}</p>
    </div>
  );
}
```

**Client Actions with i18n:**

```tsx
// app/routes/contact.tsx
import { redirect } from 'react-router';
import { toast } from '@/hooks/useToast';
import useAppTranslation from '@/hooks/useAppTranslation';
import type { Route } from './+types';

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  try {
    await submitContactForm(formData);

    // Use translation key for success message
    toast({
      title: 'ContactForm.submitSuccess',
      type: 'success',
    });

    return redirect('/contact/success');
  } catch (error) {
    return {
      error: 'ContactForm.submitError',
    };
  }
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('ContactForm.title')}</h1>
      {actionData?.error && <div className="error">{t(actionData.error)}</div>}

      <form method="post">
        <input name="email" placeholder={t('ContactForm.emailPlaceholder')} />
        <button type="submit">{t('ContactForm.submit')}</button>
      </form>
    </div>
  );
}
```

**Navigation with i18n:**

```tsx
// app/components/Navigation.tsx
import { NavLink } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function Navigation() {
  const { t } = useAppTranslation();

  return (
    <nav>
      <NavLink to="/">{t('Navigation.home')}</NavLink>
      <NavLink to="/dashboard">{t('Navigation.dashboard')}</NavLink>
      <NavLink to="/profile">{t('Navigation.profile')}</NavLink>
    </nav>
  );
}
```

**Error Boundaries with i18n:**

```tsx
// app/components/ErrorBoundary.tsx
import { isRouteErrorResponse, useRouteError } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function ErrorBoundary() {
  const { t } = useAppTranslation();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page">
        <h1>{t('Error.pageNotFound')}</h1>
        <p>{t('Error.pageNotFoundMessage')}</p>
      </div>
    );
  }

  return (
    <div className="error-page">
      <h1>{t('Error.somethingWentWrong')}</h1>
      <p>{t('Error.unexpectedError')}</p>
    </div>
  );
}
```

### SPA-Specific i18n Optimizations

**Lazy Loading Translation Bundles:**

```tsx
// app/i18n/loadTranslations.ts
import { lazy } from 'react';

export const loadTranslations = async (locale: string) => {
  const translations = await import(`./locales/${locale}.json`);
  return translations.default;
};

// Use with React Router's lazy loading
export const LazyDashboard = lazy(() => import('../routes/dashboard.index'));
```

**Route-Based Translation Loading:**

```tsx
// app/routes/settings.tsx
import { useEffect } from 'react';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function SettingsPage() {
  const { t, i18n } = useAppTranslation();

  // Load settings-specific translations on demand
  useEffect(() => {
    i18n.loadNamespaces('settings');
  }, [i18n]);

  return (
    <div>
      <h1>{t('Settings.title')}</h1>
      <p>{t('Settings.description')}</p>
    </div>
  );
}
```

### Translation Key Organization for React Router SPA

```json
{
  "Common": {
    "loading": "Loading...",
    "error": "Error",
    "save": "Save",
    "cancel": "Cancel",
    "submit": "Submit",
    "back": "Back"
  },
  "Navigation": {
    "home": "Home",
    "dashboard": "Dashboard",
    "profile": "Profile",
    "settings": "Settings",
    "logout": "Logout"
  },
  "Dashboard": {
    "title": "Dashboard",
    "welcomeBack": "Welcome back, {{name}}!",
    "noData": "No data available",
    "loadMore": "Load More"
  },
  "ContactForm": {
    "title": "Contact Us",
    "emailPlaceholder": "Enter your email",
    "messagePlaceholder": "Enter your message",
    "submit": "Send Message",
    "submitSuccess": "Message sent successfully!",
    "submitError": "Failed to send message. Please try again."
  },
  "Error": {
    "somethingWentWrong": "Something went wrong!",
    "pageNotFound": "Page Not Found",
    "pageNotFoundMessage": "The page you're looking for doesn't exist.",
    "unexpectedError": "An unexpected error occurred",
    "goHome": "Go Home"
  }
}
```

### Testing i18n in React Router SPA

**Route testing with mocked translations:**

```tsx
// __tests__/dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import DashboardPage from '@/routes/dashboard.index';

// setupTests.ts includes this mock:
// vi.mock('react-i18next', () => ({
//   useTranslation: () => ({ t: (key: string) => key })
// }));

describe('DashboardPage', () => {
  it('renders translated content', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/dashboard',
        Component: DashboardPage,
        loader: () => ({ user: { name: 'John' } }),
      },
    ]);

    render(<RoutesStub initialEntries={['/dashboard']} />);

    // Test expects translation keys since that's what the mock returns
    expect(screen.getByText('Dashboard.title')).toBeInTheDocument();
  });
});
```

This ensures that all user-facing text in the React Router V7 SPA is properly internationalized and leverages client-side routing for optimal user experience.
