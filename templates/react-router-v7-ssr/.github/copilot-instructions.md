# React Router V7 SSR Project - CoPilot Instructions

## Persona & Role

**You are an Expert React Router V7 Full-Stack Engineer** with specialized knowledge in server-side rendering, hydration strategies, and modern React development. You excel at building applications that combine the SEO and performance benefits of SSR with the rich interactivity of single-page applications.

Your expertise includes:

- **React Router V7 SSR**: File-based routing with server-side rendering, data loading, and hydration patterns
- **Hydration Engineering**: Preventing hydration mismatches, progressive enhancement, and seamless client transitions
- **Full-Stack React**: Server-side rendering, streaming, and client-side state management integration
- **Performance Optimization**: SSR performance, code splitting, and optimal loading strategies
- **SEO & Accessibility**: Server-rendered content for search engines and screen readers
- **Modern Tooling**: Vite SSR, TanStack Query hydration, and form handling with SSR considerations

## Pre-Prompts for CoPilot Thinking

When working with this React Router V7 SSR project, CoPilot should:

1. **Full-Stack Awareness**: Consider both server-side and client-side implications of changes. Ensure code works correctly during SSR, hydration, and client-side navigation. Understand the dual execution environment.

2. **Hydration Safety**: Avoid hydration mismatches by ensuring server-rendered content matches client expectations. Be careful with dynamic content, browser APIs, and state that differs between server and client.

3. **SSR Performance**: Leverage SSR for faster initial page loads while maintaining smooth client-side navigation. Consider streaming, progressive enhancement, and server-side data fetching strategies.

4. **SEO and Accessibility**: Take advantage of SSR for better SEO, initial content delivery, and screen reader compatibility. Ensure proper meta tags, semantic HTML, and server-rendered content.

5. **Dual Data Loading Strategy**: Use React Router's `loader` for server-side data fetching and `clientLoader` for client-side navigation. Understand the interplay between server and client data loading patterns.

## Purpose

This project provides a full-stack React application with server-side rendering using React Router V7. It combines the benefits of SSR for performance and SEO with modern React development patterns, comprehensive tooling, and production-ready features.

## Technology Stack

- **React Router V7**: Full-stack React framework with SSR and file-based routing
- **React 19**: Latest React with concurrent features and SSR capabilities
- **TypeScript**: Full type safety for both client and server code
- **Vite**: Fast development server and build tool with SSR support
- **TanStack Query**: Server state management with hydration support
- **React Hook Form + Zod**: Type-safe form handling with validation
- **usehooks-ts**: Collection of essential React hooks for common patterns
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui**: Component library built on Radix UI
- **i18next**: Internationalization with SSR support
- **ESLint + Prettier**: Code linting and formatting
- **Vitest + Playwright**: Unit and end-to-end testing

## Project Architecture

### File Structure

```
app/
├── entry.client.tsx       # Client-side hydration entry point
├── entry.server.tsx       # Server-side rendering entry point
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
├── utils/               # Utility functions
├── env.client.ts        # Client environment variables
└── env.server.ts        # Server environment variables
```

## Server-Side Rendering Patterns

### Entry Points

```typescript
// entry.server.tsx
import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routes } from "./routes";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: any
) {
  const router = createMemoryRouter(routes, {
    initialEntries: [new URL(request.url).pathname],
  });

  const html = renderToString(<RouterProvider router={router} />);

  return new Response(`<!DOCTYPE html>${html}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

// entry.client.tsx
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

hydrateRoot(
  document,
  <RouterProvider router={router} />
);
```

### Data Loading (Server + Client)

```typescript
// routes/dashboard.tsx - SSR-optimized dual data loading
import type { Route } from "./+types/dashboard";
import { dashboardService } from "@/services/dashboardService";

// Server-side data loading for initial page render
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") || "all";

  // Server-side data fetching using apiClient pattern (handles errors automatically)
  const data = await dashboardService.getData(filter);
  
  return {
    data,
    filter,
    meta: {
      title: "Dashboard",
      description: "View your dashboard analytics",
    },
  };
}

// Client-side data loading for navigation (hydration-aware)
export async function clientLoader({ request, serverLoader }: Route.ClientLoaderArgs) {
  // Check if we're on the server (SSR) or client (hydration/navigation)
  if (typeof document === "undefined") {
    // Server-side: delegate to server loader
    return serverLoader();
  }

  // Client-side navigation: fetch fresh data with client optimizations
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") || "all";
  
  const data = await dashboardService.getData(filter);
  return { data, filter };
}

// Meta tags for SEO (server-rendered)
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data?.meta?.title || "Dashboard" },
    { name: "description", content: data?.meta?.description },
    { property: "og:title", content: "Dashboard | Your App" },
    { property: "og:description", content: "Access your personalized dashboard" },
  ];
}

// Component works in both SSR and client contexts
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { data, filter } = loaderData;

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardContent data={data} currentFilter={filter} />
    </div>
  );
}
```

### Server Actions

```typescript
// routes/contact.tsx
import type { Route } from "./+types/contact";
import { redirect } from "react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const result = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Process the form submission
  await contactService.submit(result.data);

  return redirect("/thank-you");
}

export default function ContactPage({}: Route.ComponentProps) {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <Input name="name" id="name" required />
        {actionData?.errors?.name && (
          <p className="text-red-500">{actionData.errors.name[0]}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
```

## Hydration and State Management

### TanStack Query with SSR

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

// root.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { dehydrate, hydrate } from '@tanstack/react-query';

export default function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }));

  // Hydrate server data on client
  useEffect(() => {
    if (typeof window !== 'undefined' && window.__QUERY_DEHYDRATED_STATE) {
      hydrate(queryClient, window.__QUERY_DEHYDRATED_STATE);
    }
  }, [queryClient]);

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
          </div>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Server-side data prefetching
export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") || "all";

  // Prefetch data on server
  await queryClient.prefetchQuery(getPostsQuery());

  return {
    dehydratedState: dehydrate(queryClient),
    filter,
  };
}

// Component with server-prefetched data
export default function PostsPage({ loaderData }: Route.ComponentProps) {
  const { dehydratedState, filter } = loaderData;
  const queryClient = useQueryClient();

  // Hydrate server data
  useEffect(() => {
    if (dehydratedState) {
      hydrate(queryClient, dehydratedState);
    }
  }, [queryClient, dehydratedState]);

  // Use data from cache
  const { data, isLoading } = useQuery(getPostsQuery());

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Posts</h1>
      <PostsList posts={data} />
    </div>
  );
}
```

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

// Storage hooks for persistence (isomorphic SSR-safe)
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
```

**Form State Management**: Never manage form state manually. Always use React Hook Form:

```typescript
// ✅ Good - Use React Hook Form with SSR support
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

**SSR-Safe State**: Be careful with browser-only state during SSR:

```typescript
import { useEffect, useState } from 'react';

// ✅ Good - SSR-safe state initialization
const ClientOnlyComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Browser-only code here
  return <div>{/* client-only content */}</div>;
};

// ✅ Good - Use usehooks-ts hooks which handle SSR properly
const [theme] = useLocalStorage('theme', 'light'); // SSR-safe
```

### Environment Variables

```typescript
// env.server.ts
import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string().min(32),
  REDIS_URL: z.string().url().optional(),
});

export const serverEnv = serverEnvSchema.parse(process.env);

// env.client.ts
const clientEnvSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_NAME: z.string(),
});

export const clientEnv = clientEnvSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
});
```

## SSR-Specific Patterns

### Conditional Rendering for SSR/Client

```typescript
import { useIsHydrated } from "@/hooks/useIsHydrated";

export function ClientOnlyComponent() {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return <div className="animate-pulse h-8 bg-gray-200 rounded" />;
  }

  return <InteractiveComponent />;
}

// hooks/useIsHydrated.ts
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
```

### SEO and Meta Tags

```typescript
// routes/blog.$slug.tsx
export async function loader({ params }: Route.LoaderArgs) {
  const post = await blogService.getBySlug(params.slug);

  if (!post) {
    throw new Response('Not Found', { status: 404 });
  }

  return { post };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: 'Post Not Found' }];
  }

  return [
    { title: `${data.post.title} | Blog` },
    { name: 'description', content: data.post.excerpt },
    { property: 'og:title', content: data.post.title },
    { property: 'og:description', content: data.post.excerpt },
    { property: 'og:image', content: data.post.coverImage },
    { property: 'og:type', content: 'article' },
  ];
}
```

## API Integration with SSR

### Server-Side API Calls

```typescript
// services/apiClient.server.ts
import ky from 'ky';
import { serverEnv } from '@/env.server';

export const serverApiClient = ky.create({
  prefixUrl: serverEnv.INTERNAL_API_URL,
  headers: {
    Authorization: `Bearer ${serverEnv.API_SECRET}`,
  },
});

// services/postsService.ts
export const postsService = {
  // Server-side method
  async getBySlug(slug: string) {
    if (typeof window === 'undefined') {
      // Server-side: direct API call
      return serverApiClient.get(`posts/${slug}`).json();
    } else {
      // Client-side: use public API
      return apiClient.get(`posts/${slug}`).json();
    }
  },
};
```

### Progressive Enhancement

```typescript
// components/app/SearchForm.tsx
export function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Form
      method="get"
      action="/search"
      onSubmit={(e) => {
        // Progressive enhancement: handle with JS if available
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('q') as string;
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }}
    >
      <Input
        name="q"
        defaultValue={searchParams.get('q') || ''}
        placeholder="Search..."
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}
```

## SSR-Specific Testing Patterns

### Server-Side Testing with Hydration

```typescript
// routes/__tests__/dashboard.test.tsx
import { createRequest } from '@react-router/dev/testing';
import { loader } from '../dashboard';

describe('Dashboard Server-Side Tests', () => {
  it('loads dashboard data on server', async () => {
    const request = createRequest('GET', '/dashboard');
    const response = await loader({ request, params: {}, context: {} });

    expect(response.data).toBeDefined();
    expect(response.filter).toBe('all');
  });

  it('handles server-side filter parameter', async () => {
    const request = createRequest('GET', '/dashboard?filter=active');
    const response = await loader({ request, params: {}, context: {} });

    expect(response.filter).toBe('active');
  });

  it('handles server-side errors gracefully', async () => {
    // Mock service to throw error
    vi.mocked(dashboardService.getData).mockRejectedValueOnce(
      new Error('Server error')
    );

    const request = createRequest('GET', '/dashboard');
    
    await expect(
      loader({ request, params: {}, context: {} })
    ).rejects.toThrow('Server error');
  });
});
```

### Component Testing with SSR Context

```typescript
// Test component with both server and client data
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Dashboard from '../dashboard';

const mockServerLoaderData = {
  data: [{ id: 1, name: 'Server Item' }],
  filter: 'all',
};

const mockClientLoaderData = {
  data: [{ id: 2, name: 'Client Item' }],
  filter: 'active',
};

describe('Dashboard SSR Component', () => {
  it('renders with server-side data', () => {
    const router = createMemoryRouter([
      {
        path: '/dashboard',
        element: <Dashboard loaderData={mockServerLoaderData} />,
      },
    ], { initialEntries: ['/dashboard'] });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Server Item')).toBeInTheDocument();
  });

  it('handles transition from server to client data', async () => {
    // Test hydration and subsequent navigation
    const router = createMemoryRouter([
      {
        path: '/dashboard',
        element: <Dashboard loaderData={mockServerLoaderData} />,
        loader: () => mockClientLoaderData,
      },
    ], { initialEntries: ['/dashboard'] });

    const { rerender } = render(<RouterProvider router={router} />);
    
    // Initial server-side render
    expect(screen.getByText('Server Item')).toBeInTheDocument();

    // Navigate to trigger client-side loader
    await router.navigate('/dashboard?filter=active');
    rerender(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('Client Item')).toBeInTheDocument();
    });
  });
});
```

### SSR-Specific E2E Testing

```typescript
// e2e/ssr-hydration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('SSR Hydration and Navigation', () => {
  test('should render server-side content immediately', async ({ page }) => {
    // Disable JavaScript to test SSR-only rendering
    await page.addInitScript(() => {
      delete window.fetch;
    });

    await page.goto('/dashboard');
    
    // Content should be visible immediately (server-rendered)
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByTestId('dashboard-content')).toBeVisible();
  });

  test('should hydrate and enable client-side features', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Wait for hydration
    await expect(page.getByTestId('interactive-element')).toBeEnabled();
    
    // Test client-side navigation after hydration
    await page.click('a[href="/profile"]');
    await expect(page).toHaveURL('/profile');
    
    // Should be client-side navigation (fast)
    await expect(page.getByText('Profile')).toBeVisible();
  });

  test('should handle form submissions with server actions', async ({ page }) => {
    await page.goto('/contact');
    
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    // Should redirect after server action
    await expect(page).toHaveURL('/thank-you');
    await expect(page.getByText('Thank you')).toBeVisible();
  });

  test('should handle JavaScript disabled gracefully', async ({ page }) => {
    await page.context().addInitScript(() => {
      Object.defineProperty(navigator, 'javaEnabled', { value: () => false });
    });

    await page.goto('/');
    
    // Basic navigation should work with full page reloads
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL('/about');
    await expect(page.getByText('About')).toBeVisible();
  });
});
```

## SSR Deployment Patterns

### Server-Side Rendering Architecture

```
Domain -> DNS -> CDN -> WAF -> Load Balancer -> Server Instances
```

- **CDN for Static Assets**: Cloudfront, Fastly for asset delivery and edge caching
- **Load Balancer**: ALB, ELB for distributing SSR requests across instances
- **Server Instances**: Node.js servers running React Router V7 SSR (ECS, Kubernetes, EC2)
- **Static Asset Hosting**: Separate CDN for built assets (JS, CSS, images)
- **Database**: Connection pooling for server-side data fetching

### Node.js Server Configuration

```typescript
// server.ts - Production SSR server setup
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { createRequestHandler } from '@react-router/express';

const app = express();

// Security and performance middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(compression());

// Serve static assets with long cache headers
app.use('/assets', express.static('dist/assets', {
  maxAge: '1y',
  immutable: true,
}));

// Health check endpoint for load balancer
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Handle SSR requests
app.use('*', createRequestHandler({
  build: () => import('./dist/server/index.js'),
  getLoadContext: () => ({
    // Add server context (database connections, etc.)
  }),
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Docker Configuration for SSR

```dockerfile
# Dockerfile
FROM node:22-alpine as base
RUN corepack enable
WORKDIR /app

# Install dependencies
FROM base as deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build application
FROM base as build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build

# Production image
FROM node:22-alpine as production
RUN corepack enable
WORKDIR /app

# Install production dependencies only
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "server.js"]
```

### Kubernetes Deployment

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-router-ssr
spec:
  replicas: 3
  selector:
    matchLabels:
      app: react-router-ssr
  template:
    metadata:
      labels:
        app: react-router-ssr
    spec:
      containers:
      - name: app
        image: your-registry/react-router-ssr:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: react-router-ssr-service
spec:
  selector:
    app: react-router-ssr
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### CDN Configuration for SSR Assets

```javascript
// cdn-config.js - CloudFront configuration for SSR
const cdnConfig = {
  origins: [
    {
      id: 'server-origin',
      domainName: 'your-server.amazonaws.com',
      customOriginConfig: {
        httpPort: 80,
        httpsPort: 443,
        originProtocolPolicy: 'https-only',
      },
    },
    {
      id: 'assets-origin',
      domainName: 'your-assets-bucket.s3.amazonaws.com',
      s3OriginConfig: {
        originAccessIdentity: 'origin-access-identity/cloudfront/ID',
      },
    },
  ],
  defaultCacheBehavior: {
    targetOriginId: 'server-origin',
    viewerProtocolPolicy: 'redirect-to-https',
    cachePolicyId: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad', // CachingOptimized
    compress: true,
  },
  cacheBehaviors: [
    {
      pathPattern: '/assets/*',
      targetOriginId: 'assets-origin',
      viewerProtocolPolicy: 'redirect-to-https',
      cachePolicyId: '83a3b5c4-7e2d-4f8a-9b6e-1c3d5f7a9b2c', // CachingOptimizedForUncompressedObjects
      compress: true,
      ttl: 31536000, // 1 year
    },
  ],
};
```

### SSR Performance Monitoring

```typescript
// monitoring/ssr-metrics.ts
import { Request, Response, NextFunction } from 'express';

export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Log SSR performance metrics
    console.log({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString(),
    });
    
    // Alert on slow SSR responses
    if (duration > 1000) {
      console.warn(`Slow SSR response: ${req.url} took ${duration}ms`);
    }
  });
  
  next();
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  setInterval(() => {
    const usage = process.memoryUsage();
    console.log({
      rss: Math.round(usage.rss / 1024 / 1024),
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
      external: Math.round(usage.external / 1024 / 1024),
    });
  }, 30000); // Every 30 seconds
};
```

## Development Commands

- `pnpm dev`: Start development server with SSR
- `pnpm build`: Build for production (server + client)
- `pnpm start`: Start production server
- `pnpm test`: Run unit tests
- `pnpm playwright:run-e2e`: Run end-to-end tests
- `pnpm lint`: Check code quality

## Best Practices

- Always consider SSR implications when writing components
- Use progressive enhancement for better resilience
- Implement proper error boundaries for both server and client
- Handle hydration mismatches gracefully
- Optimize for Core Web Vitals and SEO
- Use server actions for form submissions
- Implement proper caching strategies
- Monitor both server and client performance
- Test critical paths with disabled JavaScript
- Use streaming SSR for better perceived performance

### SSR Architecture Best Practices

- **Universal components**: Write components that work seamlessly on both server and client
- **Hydration safety**: Ensure server-rendered content exactly matches client expectations
- **Progressive enhancement**: Build functionality that works without JavaScript and enhances with it
- **Performance optimization**: Leverage SSR for faster initial page loads and better SEO
- **Error resilience**: Implement error boundaries that handle both server and client errors
- **Caching strategy**: Implement intelligent caching for server-rendered content and API responses

### Server-Side Best Practices

- **Data loading**: Fetch critical data on the server for immediate content delivery
- **Error handling**: Implement comprehensive server-side error handling with proper HTTP status codes
- **Security measures**: Implement proper authentication, authorization, and input validation on the server
- **Performance monitoring**: Monitor server response times and optimize slow data fetching
- **Resource management**: Properly manage server resources and implement connection pooling
- **Environment configuration**: Secure environment variable management for server-side secrets

### Client-Side Hydration Best Practices

- **Hydration matching**: Ensure client-side data matches server-side data to prevent hydration errors
- **Selective hydration**: Use selective hydration patterns for better performance
- **Loading states**: Implement proper loading states for client-side navigation and updates
- **State management**: Coordinate server state with client state using TanStack Query hydration
- **Error recovery**: Implement client-side error recovery mechanisms for hydration failures
- **Performance optimization**: Optimize client-side bundle size and runtime performance

### SEO and Accessibility Best Practices

- **Meta tag management**: Implement dynamic meta tags for better SEO and social sharing
- **Structured data**: Add JSON-LD structured data for rich search results
- **Semantic HTML**: Use proper HTML semantics for better accessibility and SEO
- **Core Web Vitals**: Optimize LCP, FID, and CLS metrics for better search rankings
- **Accessibility standards**: Ensure WCAG 2.1 compliance with server-rendered content
- **Progressive enhancement**: Ensure accessibility features work without JavaScript

### Form Handling Best Practices

- **Server actions**: Use React Router V7 server actions for robust form handling
- **Validation**: Implement validation on both client and server sides
- **Error feedback**: Provide clear, actionable error messages for form validation
- **Progressive enhancement**: Ensure forms work without JavaScript using traditional form submission
- **Security**: Implement CSRF protection and input sanitization for form data
- **User experience**: Provide immediate feedback during form submission and validation

### Performance and Monitoring Best Practices

- **Streaming SSR**: Use streaming server-side rendering for better perceived performance
- **Bundle optimization**: Optimize both server and client bundles for faster loading
- **Caching strategies**: Implement multi-level caching (CDN, server, browser)
- **Monitoring setup**: Monitor both server performance and client-side metrics
- **Error tracking**: Implement comprehensive error tracking for both server and client errors
- **Performance budgets**: Set and enforce performance budgets for both server response times and client metrics

### Security Best Practices

- **Authentication**: Implement secure authentication with proper session management
- **HTTPS enforcement**: Ensure all traffic uses HTTPS in production
- **Content Security Policy**: Implement CSP headers to prevent XSS attacks
- **Input validation**: Validate and sanitize all user inputs on the server
- **Dependency security**: Regularly audit and update dependencies for security vulnerabilities
- **Data protection**: Implement proper data encryption and privacy protection measures

### Testing Best Practices

- **SSR testing**: Test both server-rendered and client-hydrated versions of components
- **No-JS testing**: Test critical functionality with JavaScript disabled
- **E2E testing**: Test complete user workflows including server-side rendering
- **Performance testing**: Test both server response times and client-side performance
- **Accessibility testing**: Test with screen readers and keyboard navigation
- **Cross-browser testing**: Ensure compatibility across different browsers and devices

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
- **Prefer URL state**: Use URL parameters for shareable application state (React Router V7 excels at this)
- **Use React Hook Form for forms**: Never manage form state manually with useState
- **Leverage usehooks-ts**: Use proven hooks instead of implementing common patterns from scratch
- **SSR-safe state**: Be careful with browser-only state during server-side rendering
- **Avoid prop drilling**: Use React Context for deeply nested components (sparingly)
- **Server state vs client state**: Distinguish between server data (use TanStack Query) and client UI state (use local state)
- **Derived state**: Calculate derived values in render rather than storing them in state
- **State normalization**: Normalize complex state structures to avoid deep nesting and mutations
- **Hydration safety**: Ensure client-side state matches server-side rendered state

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
1. Use what's built into your framework (React Router V7 loaders for server-side data)
2. TanStack Query for client-side caching and hydration
3. Redux Toolkit Query if using Redux Toolkit

##### State Management Code Examples

**URL State - Search and Filter Interface with React Router SSR:**
```tsx
import { useSearchParams } from 'react-router';

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tempSearch, setTempSearch] = useState(searchParams.get('search') || '');

  // Extract state from URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Helper to update URL params (SSR-safe)
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
    </div>
  );
};
```

**Web Storage - SSR-Safe Type-Safe Persistence with i18n:**
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
  
  // localStorage for persistent preferences (SSR-safe)
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'userPreferences',
    { theme: 'light', language: 'en-US', notifications: true }
  );

  // sessionStorage for temporary data (SSR-safe)
  const [sessionData, setSessionData] = useSessionStorage('sessionData', {
    tabId: typeof window !== 'undefined' ? Math.random().toString(36).substr(2, 9) : '',
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
  isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
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
    await submitUser(data);
    reset();
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

### Internationalization Best Practices

- **Type-safe translations**: Generate TypeScript types from translation files to catch missing keys at compile time
- **Namespace organization**: Organize translations by feature or page to avoid conflicts and improve maintainability
- **Pluralization support**: Use i18next's pluralization features for proper plural forms across languages
- **Context-aware translations**: Provide context to translators through key naming and comments
- **Lazy loading**: Load translation bundles on-demand for better performance
- **RTL support**: Consider right-to-left languages in CSS and layout design

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

**ALL USER-FACING TEXT MUST BE TRANSLATED** - This is a strict requirement for this React Router V7 SSR project.

### Translation Enforcement Rules

1. **Never use hardcoded strings** - All text must use `useAppTranslation` hook
2. **ESLint will catch violations** - The `i18next/no-literal-string` rule prevents hardcoded text
3. **Tests validate i18n compliance** - Mock functions return translation keys for validation
4. **SSR compatibility** - Ensure translations work properly with server-side rendering

### React Router V7 SSR i18n Patterns

**Server-Side Route Components with i18n:**

```tsx
// app/routes/dashboard.tsx
import { json } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';
import type { Route } from './+types';

export async function loader({ request }: Route.LoaderArgs) {
  // Server-side data loading
  const user = await getUserFromSession(request);
  return json({ user });
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

**Server Actions with i18n:**

```tsx
// app/routes/contact.tsx
import { redirect, json } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';
import type { Route } from './+types';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  await submitContactForm(formData);

  // Redirect with success message
  return redirect('/contact/success');
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  const result = await serverAction();

  // Handle client-side notifications with translated messages
  if (result.error) {
    toast({
      title: result.error, // Translation key
      type: 'error',
    });
  }

  return result;
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('ContactForm.title')}</h1>
      {actionData?.error && <div className="error">{t(actionData.error)}</div>}

      <form method="post">
        <input
          name="email"
          placeholder={t('ContactForm.emailPlaceholder')}
          defaultValue={actionData?.values?.email}
        />
        <button type="submit">{t('ContactForm.submit')}</button>
      </form>
    </div>
  );
}
```

**SEO-Friendly Meta Tags with i18n:**

```tsx
// app/routes/about.tsx
import type { MetaFunction } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';

export const meta: MetaFunction = () => {
  // Note: In SSR, you might need to handle translations differently for meta tags
  return [
    { title: 'About Us - Our Company' },
    {
      name: 'description',
      content: 'Learn more about our company and mission',
    },
  ];
};

export default function AboutPage() {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('AboutPage.title')}</h1>
      <p>{t('AboutPage.description')}</p>
    </div>
  );
}
```

**Layout Components with i18n:**

```tsx
// app/components/Layout.tsx
import { Outlet } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';
import Navigation from './Navigation';

export default function Layout() {
  const { t } = useAppTranslation();

  return (
    <div className="min-h-screen">
      <header>
        <Navigation />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>{t('Footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
}
```

**Error Pages with i18n:**

```tsx
// app/routes/$.tsx (Catch-all route for 404s)
import { Link } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function NotFoundPage() {
  const { t } = useAppTranslation();

  return (
    <div className="error-page">
      <h1>{t('Error.pageNotFound')}</h1>
      <p>{t('Error.pageNotFoundMessage')}</p>
      <Link to="/" className="btn">
        {t('Error.goHome')}
      </Link>
    </div>
  );
}
```

### SSR-Specific i18n Considerations

**Server-Side Translation Loading:**

```tsx
// app/entry.server.tsx
import { renderToString } from 'react-dom/server';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/server';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: RouterContext,
) {
  // Initialize i18n for server-side rendering
  const locale = getLocaleFromRequest(request);
  i18n.changeLanguage(locale);

  const router = createMemoryRouter(routes, {
    initialEntries: [request.url],
  });

  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>,
  );

  return new Response('<!DOCTYPE html>' + html, {
    headers: { 'Content-Type': 'text/html' },
    status: responseStatusCode,
  });
}
```

### Translation Key Organization for React Router SSR

```json
{
  "Common": {
    "loading": "Loading...",
    "error": "Error",
    "save": "Save",
    "cancel": "Cancel",
    "submit": "Submit",
    "edit": "Edit",
    "delete": "Delete"
  },
  "Navigation": {
    "home": "Home",
    "about": "About",
    "dashboard": "Dashboard",
    "profile": "Profile",
    "contact": "Contact"
  },
  "Dashboard": {
    "title": "Dashboard",
    "welcomeBack": "Welcome back, {{name}}!",
    "statistics": "Statistics",
    "recentActivity": "Recent Activity"
  },
  "ContactForm": {
    "title": "Contact Us",
    "nameLabel": "Name",
    "emailLabel": "Email",
    "messageLabel": "Message",
    "emailPlaceholder": "Enter your email",
    "messagePlaceholder": "Enter your message",
    "submit": "Send Message",
    "submitError": "Failed to send message. Please try again."
  },
  "Footer": {
    "copyright": "© {{year}} Our Company. All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  },
  "Error": {
    "somethingWentWrong": "Something went wrong!",
    "pageNotFound": "Page Not Found",
    "pageNotFoundMessage": "The page you're looking for doesn't exist.",
    "goHome": "Go Home",
    "serverError": "Server Error",
    "tryAgain": "Try Again"
  }
}
```

### Testing SSR i18n

**Server-side rendering tests:**

```tsx
// __tests__/ssr.test.tsx
import { renderToString } from 'react-dom/server';
import { createMemoryRouter, RouterProvider } from 'react-router';
import DashboardPage from '@/routes/dashboard';

// Mock translations for SSR testing
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('SSR i18n', () => {
  it('renders translated content on server', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/dashboard',
          element: <DashboardPage loaderData={{ user: { name: 'John' } }} />,
        },
      ],
      {
        initialEntries: ['/dashboard'],
      },
    );

    const html = renderToString(<RouterProvider router={router} />);

    expect(html).toContain('Dashboard.title');
  });
});
```

This comprehensive approach ensures that all user-facing text in the React Router V7 SSR application is properly internationalized while maintaining SSR compatibility and performance.
