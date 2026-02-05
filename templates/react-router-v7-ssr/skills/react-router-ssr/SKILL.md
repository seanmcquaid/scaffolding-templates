---
name: react-router-ssr-development
description: Expert in React Router v7 with server-side rendering, loaders, actions, and full-stack React patterns. Specializes in SSR architecture.
---

# React Router v7 SSR Development

Build production-ready server-rendered applications with React Router v7, server loaders, and server actions.

## When to Use

Use this skill for React Router v7 SSR projects that need:
- Server-side rendering for SEO and performance
- Server loaders for initial data fetching
- Server actions for form submissions and mutations
- Progressive enhancement (works without JavaScript)
- Streaming and deferred data
- Meta tags for social media sharing

## SSR Architecture

### Entry Points

```typescript
// app/entry.server.tsx
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { routes } from './routes';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(request);
  
  if (context instanceof Response) {
    throw context;
  }
  
  const router = createStaticRouter(dataRoutes, context);
  const html = renderToString(
    <StaticRouterProvider router={router} context={context} />
  );
  
  return new Response(`<!DOCTYPE html>${html}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

// app/entry.client.tsx
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './routes';

const router = createBrowserRouter(routes);

hydrateRoot(
  document,
  <RouterProvider router={router} />
);
```

## Server Loaders

```tsx
// app/routes/dashboard/index.tsx
import type { Route } from './+types';
import { dashboardService } from '@/services/dashboardService';

// Server-side loader (runs on initial page load)
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter') || 'all';
  
  const data = await dashboardService.getData(filter);
  
  return {
    data,
    filter,
    meta: {
      title: 'Dashboard',
      description: 'View your dashboard analytics',
    },
  };
}

// Client loader (runs on client-side navigation)
export async function clientLoader({ 
  request, 
  serverLoader 
}: Route.ClientLoaderArgs) {
  // On initial load, use server data
  if (typeof document === 'undefined') {
    return serverLoader();
  }
  
  // On navigation, fetch fresh data client-side
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter') || 'all';
  const data = await dashboardService.getData(filter);
  
  return { data, filter };
}

// Hydrate fallback for deferred data
clientLoader.hydrate = true as const;

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

## Server Actions

```tsx
// app/routes/contact/index.tsx
import type { Route } from './+types';
import { redirect, Form } from 'react-router';
import { z } from 'zod';
import { useActionData, useNavigation } from 'react-router';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

// Server action (runs on server for form submissions)
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  
  const result = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      values: Object.fromEntries(formData),
    };
  }
  
  await contactService.submit(result.data);
  
  return redirect('/contact/success');
}

export default function ContactPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  
  return (
    <Form method="post">
      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          defaultValue={actionData?.values?.name}
        />
        {actionData?.errors?.name && (
          <span className="error">{actionData.errors.name[0]}</span>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </Form>
  );
}
```

## Meta Tags for SEO

```tsx
// app/routes/blog/$slug/index.tsx
import type { Route } from './+types';
import { blogService } from '@/services/blogService';

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
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

## Hydration Strategies

### Preventing Hydration Mismatches

```tsx
// ❌ Bad: Causes hydration mismatch
export function ClientOnly() {
  return <div>{new Date().toISOString()}</div>; // Different on server/client
}

// ✅ Good: Use hydration-safe patterns
import { useEffect, useState } from 'react';

export function ClientOnly() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading...</div>; // Same on server
  }
  
  return <div>{new Date().toISOString()}</div>; // Only on client
}
```

### TanStack Query Hydration

```tsx
// app/root.tsx
import { QueryClient, QueryClientProvider, dehydrate, hydrate } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export default function Root() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
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
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

// Loader with TanStack Query prefetching
export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = new QueryClient();
  
  // Prefetch data on server
  await queryClient.prefetchQuery(getPostsQuery());
  
  return {
    dehydratedState: dehydrate(queryClient),
  };
}
```

## Streaming with Deferred Data

```tsx
import { defer, Await } from 'react-router';
import { Suspense } from 'react';

export async function loader() {
  // Fast data - await immediately
  const user = await getUserData();
  
  // Slow data - defer for streaming
  const slowData = getSlowData(); // Don't await
  
  return defer({
    user,
    slowData,
  });
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <UserProfile user={loaderData.user} />
      
      <Suspense fallback={<SlowDataSkeleton />}>
        <Await resolve={loaderData.slowData}>
          {(data) => <SlowDataComponent data={data} />}
        </Await>
      </Suspense>
    </div>
  );
}
```

## Progressive Enhancement

### Forms Without JavaScript

```tsx
// Form works without JavaScript using traditional form submission
export function ContactForm() {
  const { t } = useAppTranslation();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  
  return (
    <Form method="post" action="/contact">
      <input name="name" defaultValue={actionData?.values?.name} />
      {actionData?.errors?.name && <span>{actionData.errors.name[0]}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('Common.submitting') : t('Common.submit')}
      </button>
    </Form>
  );
}
```

### Client-Side Enhancement

```tsx
import { Form, useSubmit } from 'react-router';

export function EnhancedSearchForm() {
  const submit = useSubmit();
  
  return (
    <Form
      method="get"
      action="/search"
      onChange={(e) => {
        // Progressive enhancement: submit on change if JS enabled
        submit(e.currentTarget);
      }}
    >
      <input name="q" placeholder="Search..." />
      <button type="submit">Search</button>
    </Form>
  );
}
```

## Environment Variables

### Server-Side Environment

```typescript
// app/env.server.ts
import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  API_SECRET: z.string().min(32),
  REDIS_URL: z.string().url().optional(),
});

export const serverEnv = serverEnvSchema.parse(process.env);

// Only import in server code!
```

### Client-Side Environment

```typescript
// app/env.client.ts
const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_NAME: z.string(),
});

export const env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
});

// Safe to import in client code
```

## Error Handling

```tsx
// app/routes/dashboard/error.tsx
import { isRouteErrorResponse, useRouteError } from 'react-router';
import useAppTranslation from '@/hooks/useAppTranslation';

export function DashboardError() {
  const { t } = useAppTranslation();
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>{t('Error.somethingWentWrong')}</h1>
      <p>{error instanceof Error ? error.message : t('Error.unknownError')}</p>
    </div>
  );
}
```

## Testing SSR Applications

### Server Loader Testing

```typescript
import { createRequest } from '@react-router/dev/testing';
import { loader } from '../dashboard';

describe('Dashboard loader', () => {
  it('loads dashboard data', async () => {
    const request = createRequest('GET', '/dashboard');
    const response = await loader({ request, params: {}, context: {} });
    
    expect(response.data).toBeDefined();
    expect(response.filter).toBe('all');
  });
});
```

### Hydration Testing

```typescript
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';

describe('Hydration', () => {
  it('hydrates without errors', () => {
    const serverHtml = renderToString(<App />);
    
    const container = document.createElement('div');
    container.innerHTML = serverHtml;
    
    const consoleError = vi.spyOn(console, 'error');
    hydrateRoot(container, <App />);
    
    expect(consoleError).not.toHaveBeenCalled();
  });
});
```

## Key Principles

1. **Server-First**: Use server loaders for initial data fetching
2. **Progressive Enhancement**: Forms work without JavaScript
3. **Meta Tags**: Optimize for SEO and social sharing
4. **Hydration Safety**: Prevent server/client mismatches
5. **Streaming**: Use deferred data for better TTFB
6. **Environment Segregation**: Separate server and client environments
7. **Type Safety**: Use TypeScript for all code
8. **Client Loaders**: Handle client-side navigation efficiently
