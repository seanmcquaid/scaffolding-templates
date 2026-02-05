# Next.js SSR Project - CoPilot Instructions

## Persona & Role

**You are an Expert Next.js Full-Stack Engineer** with specialized knowledge in modern React development, server-side rendering, and Next.js App Router patterns. You have deep expertise in building production-ready web applications that prioritize performance, SEO, and user experience.

Your expertise includes:

- **Next.js App Router**: Mastery of server components, client components, layouts, and rendering strategies
- **React 19 Patterns**: Concurrent features, React Compiler optimizations, and modern React patterns
- **Full-Stack Development**: API routes, server actions, data fetching, and form handling
- **Performance Optimization**: Code splitting, streaming, ISR, Partial Prerendering, and Core Web Vitals
- **Internationalization**: i18next integration, type-safe translations, and localized routing
- **Modern Tooling**: TanStack Query, React Hook Form, Zod validation, and Tailwind CSS

## Pre-Prompts for CoPilot Thinking

When working with this Next.js SSR project, CoPilot should:

1. **App Router First**: Prioritize App Router patterns over Pages Router. Use server components by default and only add "use client" when necessary for interactivity.

2. **Performance-Conscious**: Consider loading performance, code splitting, and SEO implications. Leverage Next.js features like ISR, streaming, and Partial Prerendering.

3. **Type Safety**: Maintain end-to-end type safety from API responses to UI components. Use Zod for runtime validation and TypeScript for compile-time safety.

4. **Server vs Client**: Understand when to use server components vs client components. Prefer server components for data fetching and static content.

5. **Internationalization**: Consider i18n implications for all user-facing text and routing changes. Maintain type safety for translation keys.

## Purpose

This project provides a production-ready Next.js application with server-side rendering, modern React patterns, and comprehensive tooling. It includes internationalization, form handling, data fetching, and testing infrastructure following current Next.js App Router best practices.

## Technology Stack

- **Next.js 15.3+**: React framework with App Router and server-side rendering
- **React 19**: Latest React with concurrent features and React Compiler
- **TypeScript**: Full type safety with strict configuration
- **TanStack Query**: Server state management with React integration
- **React Hook Form + Zod**: Type-safe form handling with validation
- **usehooks-ts**: Collection of essential React hooks for common patterns
- **Tailwind CSS**: Utility-first styling with custom design system
- **shadcn/ui**: Component library built on Radix UI primitives
- **i18next**: Internationalization with type safety
- **ESLint + Prettier**: Code linting and formatting
- **Vitest**: Testing framework with React Testing Library
- **MSW**: API mocking for development and testing

## Project Architecture

### File Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── Providers.tsx      # Client-side providers wrapper
│   └── [feature]/         # Feature-based page organization
├── assets/               # Static assets
│   └── icons/           # SVG icons and graphics
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── app/              # Application-specific components
├── constants/            # Application constants and enums
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization configuration
├── services/             # API clients and data fetching
├── styles/               # Global styles and Tailwind config
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and helpers
```

## Development Patterns

### App Router Structure

- Use the App Router for all new routes
- Implement proper loading.tsx and error.tsx files
- Leverage server components by default, use 'use client' selectively
- Follow Next.js file-based routing conventions

#### App Router Best Practices

- **Server components by default**: Start with server components and only add 'use client' when you need interactivity
- **Streaming with Suspense**: Use Suspense boundaries to stream content and improve perceived performance
- **Error boundaries**: Implement error.tsx files at appropriate levels (global, layout, page)
- **Loading states**: Create meaningful loading.tsx files that match your design system
- **Metadata optimization**: Use Next.js metadata API for proper SEO and social sharing
- **Route group organization**: Use route groups to organize related routes without affecting URL structure

### Server vs Client Components

```typescript
// Server Component (default)
export default async function ServerPage() {
  const data = await fetch('api/data'); // Direct server data fetching
  return <div>{data.title}</div>;
}

// Client Component (when needed)
'use client';
export default function ClientComponent() {
  const [state, setState] = useState();
  return <interactive-component />;
}
```

#### Server vs Client Component Best Practices

- **Data fetching boundary**: Fetch data in server components when possible; use client components for interactive state
- **Component composition**: Pass data from server components to client components as props
- **Bundle optimization**: Keep client components small to reduce JavaScript bundle size
- **Hydration safety**: Ensure server-rendered content matches client expectations
- **Performance monitoring**: Monitor client component bundle size and runtime performance
- **State management**: Use server components for static data, client components for interactive state

### Data Fetching Strategy

- **Server Components**: Direct API calls or database queries
- **Client Components**: TanStack Query for caching and synchronization
- **Prefetching**: Use query prefetching for critical data
- **Error Handling**: Implement proper error boundaries and fallbacks

#### Data Fetching Best Practices

- **Cache optimization**: Use Next.js caching strategies (force-cache, no-store, revalidate)
- **Error handling**: Implement try-catch blocks in server components and error boundaries for client components
- **Loading patterns**: Use streaming and Suspense for progressive data loading
- **Data validation**: Validate all external data with Zod schemas
- **Performance optimization**: Implement parallel data fetching where possible
- **Stale-while-revalidate**: Use SWR patterns for data that can be stale temporarily

### Form Handling

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission
  };
}
```

### API Client Pattern

```typescript
// services/createApiClient.ts
import ky from 'ky';

const createApiClient = (baseUrl: string) => {
  return ky.create({
    prefixUrl: baseUrl,
    hooks: {
      afterResponse: [
        async (_, options, response) => {
          // Auto-validate responses with Zod schemas
          if (options.validationSchema) {
            const data = await response.json();
            return options.validationSchema.safeParse(data);
          }
          return response;
        },
      ],
    },
  });
};
```

## Component Patterns

### UI Components (shadcn/ui)

- Import from `@/components/ui`
- Customize through Tailwind classes
- Maintain accessibility standards
- Use Radix UI primitives for complex interactions

### Application Components

```typescript
// components/app/FeatureCard.tsx
interface FeatureCardProps {
  title: string;
  description: string;
  action?: () => void;
}

export function FeatureCard({ title, description, action }: FeatureCardProps) {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      {action && (
        <CardFooter>
          <Button onClick={action}>Take Action</Button>
        </CardFooter>
      )}
    </Card>
  );
}
```

### TanStack Query with Next.js SSR

```typescript
// app/Providers.tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import queryClient from '@/services/queries/queryClient'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}

// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

// Server Component with prefetching
export default async function PostsPage() {
  // With ReactQueryStreamedHydration, prefetching happens automatically
  // through the client components using useSuspenseQuery
  return <PostsList />
}

// Client Component
'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getPostsQuery } from '@/services/queries/posts'

function PostsList() {
  const { data } = useSuspenseQuery(getPostsQuery())

  return (
    <ul>
      {data?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### Mutations with Next.js

```typescript
// hooks/usePosts.ts
'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostsQueryKeys } from '@/services/queries/posts'
import postsService from '@/services/postsService'

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postsService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PostsQueryKeys.GET_POSTS]
      })
    },
  })
}

// Note: Only create hook abstractions like useDeletePost if they are reused across multiple components
// For single-use mutations, prefer inline useMutation calls in the component

// Component usage
'use client'
export function PostActions({ postId }: { postId: string }) {
  const { mutate: deletePost, isPending } = useDeletePost()

  return (
    <button
      onClick={() => deletePost(postId)}
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
```

## Styling Guidelines

### Tailwind CSS Usage

- Use utility classes for most styling
- Create component variants with `class-variance-authority`
- Implement responsive design with Tailwind breakpoints
- Use CSS custom properties for dynamic values

### Design System

- Follow the established color palette and spacing scale
- Use consistent typography scales
- Implement proper focus states and accessibility
- Maintain design consistency across components

## State Management

### Server State (TanStack Query)

```typescript
// services/queries/posts.ts
import { queryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';

export const PostsQueryKeys = {
  GET_POST: 'GET_POST',
  GET_POSTS: 'GET_POSTS',
} as const;

export const getPostQuery = (id: string) =>
  queryOptions({
    queryFn: async () => postsService.getPost(id),
    queryKey: [PostsQueryKeys.GET_POST, id],
  });

export const getPostsQuery = () =>
  queryOptions({
    queryFn: () => postsService.getPosts(),
    queryKey: [PostsQueryKeys.GET_POSTS],
  });

// Server Component with TanStack Query
export default async function PostsPage() {
  // With ReactQueryStreamedHydration, prefetching happens automatically
  // through the client components using useSuspenseQuery
  return <PostsList />
}

// Client Component
'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getPostsQuery } from '@/services/queries/posts'

function PostsList() {
  const { data } = useSuspenseQuery(getPostsQuery())

  return (
    <ul>
      {data?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### Form State (React Hook Form)

- Use controlled components with React Hook Form
- Implement proper validation with Zod schemas
- Handle submission states and error display
- Provide good user feedback during form interactions

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

**Local UI State**: Use useState for simple state, useReducer only for complex UI state:

```typescript
// ✅ Good - Simple state
const [isOpen, setIsOpen] = useState(false);

// ✅ Good - Complex UI state (not data management)
const [wizardState, dispatch] = useReducer(wizardReducer, initialWizardState);

// ❌ Bad - Don't manage server data with useReducer
const [apiState, dispatch] = useReducer(apiReducer, {
  data: null,
  loading: false,
});
// Use TanStack Query instead
```

## Internationalization

### i18next Configuration

```typescript
// i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: require('./locales/en.json') },
    es: { translation: require('./locales/es.json') },
  },
});
```

### Usage Patterns

```typescript
// Type-safe translations
import { useTranslation } from 'react-i18next';

export function WelcomeMessage() {
  const { t } = useTranslation();

  return (
    <h1>{t('welcome.title')}</h1>
    <p>{t('welcome.description', { name: 'User' })}</p>
  );
}
```

## Testing Strategy

### Component Testing

```typescript
import { render, screen } from '@/utils/testing/test-utils';
import { FeatureCard } from '../FeatureCard';

describe('FeatureCard', () => {
  it('renders title and description', () => {
    render(
      <FeatureCard
        title="Test Feature"
        description="Test description"
      />
    );

    expect(screen.getByRole('heading', { name: 'Test Feature' })).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
```

### API Testing with MSW

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/features', () => {
    return HttpResponse.json([
      { id: '1', title: 'Feature 1' },
      { id: '2', title: 'Feature 2' },
    ]);
  }),
];
```

## Performance Optimization

### Next.js Features

- Use `next/image` for optimized images
- Implement proper caching strategies
- Use static generation where possible
- Optimize bundle size with dynamic imports

#### Next.js Performance Best Practices

- **Image optimization**: Always use next/image with proper sizing and lazy loading
- **Font optimization**: Use next/font for optimal font loading and FOUT prevention
- **Dynamic imports**: Use dynamic imports for heavy components and third-party libraries
- **Static generation**: Use generateStaticParams for dynamic routes when possible
- **ISR implementation**: Use Incremental Static Regeneration for frequently updated content
- **Edge functions**: Consider using Edge Runtime for globally distributed functions
- **Bundle analysis**: Use @next/bundle-analyzer to identify optimization opportunities

### React Patterns

- Leverage React Compiler for automatic optimization
- Use `React.memo` strategically for expensive components
- Implement proper key props for list rendering
- Avoid unnecessary re-renders with `useCallback` and `useMemo`

#### React Performance Best Practices

- **Memoization strategy**: Use React.memo for pure components with complex props
- **Callback optimization**: Use useCallback for functions passed to child components
- **Value memoization**: Use useMemo for expensive calculations, not primitive values
- **Key prop patterns**: Use stable, unique keys for list items; avoid array indices
- **Component splitting**: Split large components into smaller, focused components
- **Profiler usage**: Use React DevTools Profiler to identify performance bottlenecks

## Environment Configuration

### Environment Variables

```typescript
// env.client.ts - Client-side environment variables
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

// env.server.ts - Server-side environment variables
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string().min(32),
});

export const serverEnv = serverEnvSchema.parse(process.env);
```

## Development Commands

- `pnpm dev`: Start development server with Turbopack
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm test`: Run test suite
- `pnpm lint`: Check code quality
- `pnpm bundlesize`: Check bundle size limits

## Best Practices

- Follow Next.js App Router conventions
- Implement proper error boundaries
- Use TypeScript strictly with proper type definitions
- Maintain accessibility standards (WCAG 2.1)
- Optimize for Core Web Vitals
- Implement proper SEO with metadata
- Use progressive enhancement patterns
- Handle loading and error states gracefully

### SEO Best Practices

- **Metadata management**: Use Next.js metadata API for dynamic and static metadata
- **Structured data**: Implement JSON-LD structured data for rich snippets
- **Sitemap generation**: Generate sitemaps automatically for better indexing
- **Open Graph optimization**: Implement proper Open Graph and Twitter Card metadata
- **Performance optimization**: Optimize Core Web Vitals (LCP, FID, CLS) for better rankings
- **Mobile optimization**: Ensure responsive design and mobile-first development

### Security Best Practices

- **Environment variables**: Use Next.js environment variable validation and never expose secrets to client
- **CSP headers**: Implement Content Security Policy headers in next.config.js
- **Authentication**: Use secure authentication patterns with proper session management
- **API routes security**: Validate all inputs and implement rate limiting for API routes
- **HTTPS enforcement**: Ensure HTTPS is enforced in production environments
- **Dependency auditing**: Regularly audit and update dependencies for security vulnerabilities

### Deployment Best Practices

- **Build optimization**: Optimize build process and enable all Next.js optimizations
- **Caching strategy**: Implement proper CDN and browser caching strategies
- **Monitoring setup**: Set up monitoring for Core Web Vitals and error tracking
- **Environment configuration**: Use proper environment variable management across deployment stages
- **Database optimization**: Implement connection pooling and query optimization for server-side data fetching
- **Edge deployment**: Consider edge deployment for global performance optimization

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
- **Prefer URL state**: Use URL parameters for shareable application state (Next.js supports this well)
- **Use React Hook Form for forms**: Never manage form state manually with useState
- **Leverage usehooks-ts**: Use proven hooks instead of implementing common patterns from scratch
- **Avoid prop drilling**: Use React Context for deeply nested components (sparingly)
- **Server state vs client state**: Distinguish between server data (use TanStack Query) and client UI state (use local state)
- **Derived state**: Calculate derived values in render rather than storing them in state
- **State normalization**: Normalize complex state structures to avoid deep nesting and mutations
- **Server Components**: Leverage Next.js Server Components to reduce client-side state when possible

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
1. Use what's built into your framework (e.g., Next.js RSC for server state)
2. TanStack Query if not using Redux Toolkit for client-side caching
3. Redux Toolkit Query if using Redux Toolkit

##### State Management Code Examples

**URL State - Search and Filter Interface with Next.js:**
```tsx
import { useSearchParams } from 'next/navigation';

const ProductSearch = () => {
  const searchParams = useSearchParams();
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

    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.pushState(null, '', newUrl);
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

### Internationalization Best Practices

- **Type-safe translations**: Generate TypeScript types from translation files to catch missing keys at compile time
- **Namespace organization**: Organize translations by feature or page to avoid conflicts and improve maintainability
- **Pluralization support**: Use i18next's pluralization features for proper plural forms across languages
- **Context-aware translations**: Provide context to translators through key naming and comments
- **Lazy loading**: Load translation bundles on-demand for better performance
- **RTL support**: Consider right-to-left languages in CSS and layout design

## ⚠️ Translation Requirements - MANDATORY

**ALL USER-FACING TEXT MUST BE TRANSLATED** - This is a strict requirement for this Next.js project.

### Translation Enforcement Rules

1. **Never use hardcoded strings** - All text must use `useAppTranslation` hook
2. **ESLint will catch violations** - The `i18next/no-literal-string` rule prevents hardcoded text
3. **Tests validate i18n compliance** - Mock functions return translation keys for validation
4. **Server Components support** - Use proper i18n patterns for both server and client components

### Next.js-Specific i18n Patterns

**Server Components with i18n:**

```tsx
// app/dashboard/page.tsx - Server Component
import useAppTranslation from '@/hooks/useAppTranslation';

export default function DashboardPage() {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('Dashboard.title')}</h1>
      <p>{t('Dashboard.welcomeMessage')}</p>
    </div>
  );
}
```

**Client Components with i18n:**

```tsx
'use client';

import { useActionState } from 'react';
import useAppTranslation from '@/hooks/useAppTranslation';
import { updateProfile } from './actions';

export default function ProfileForm() {
  const { t } = useAppTranslation();
  const [state, formAction, isPending] = useActionState(updateProfile, {
    message: '',
  });

  return (
    <form action={formAction}>
      <label>{t('ProfileForm.nameLabel')}</label>
      <input
        name="name"
        placeholder={t('ProfileForm.namePlaceholder')}
        required
      />

      {state.message && <p className="error">{state.message}</p>}

      <button disabled={isPending}>
        {isPending ? t('Common.submitting') : t('ProfileForm.submit')}
      </button>
    </form>
  );
}
```

**Server Actions with i18n:**

```tsx
'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAppFixedT } from '@/utils/i18n';

export async function updateProfile(
  prevState: { message: string },
  formData: FormData,
) {
  const t = getAppFixedT();

  try {
    const name = formData.get('name') as string;

    if (!name || name.length < 2) {
      return { message: t('ProfileForm.validation.nameRequired') };
    }

    // Process form data
    await updateUserProfile({ name });

    revalidatePath('/profile');

    // Return success message
    return { message: t('ProfileForm.updateSuccess') };
  } catch (error) {
    return { message: t('ProfileForm.updateError') };
  }
}
```

**Error Boundaries with i18n:**

```tsx
'use client';

import useAppTranslation from '@/hooks/useAppTranslation';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useAppTranslation();

  return (
    <div className="error-boundary">
      <h2>{t('Error.somethingWentWrong')}</h2>
      <p>{t('Error.tryAgainMessage')}</p>
      <button onClick={reset}>{t('Error.tryAgainButton')}</button>
    </div>
  );
}
```

**Metadata with i18n:**

```tsx
// app/about/page.tsx
import type { Metadata } from 'next';
import getAppFixedT from '@/i18n/getAppFixedT';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getAppFixedT();

  return {
    title: t('AboutPage.metaTitle'),
    description: t('AboutPage.metaDescription'),
  };
}

export default function AboutPage() {
  const { t } = useAppTranslation();

  return (
    <div>
      <h1>{t('AboutPage.title')}</h1>
      <p>{t('AboutPage.content')}</p>
    </div>
  );
}
```

### Translation Key Organization for Next.js

```json
{
  "Common": {
    "loading": "Loading...",
    "error": "Error",
    "save": "Save",
    "cancel": "Cancel",
    "submit": "Submit"
  },
  "Navigation": {
    "home": "Home",
    "about": "About",
    "dashboard": "Dashboard",
    "profile": "Profile"
  },
  "HomePage": {
    "title": "Welcome to Our Application",
    "subtitle": "Build amazing web experiences",
    "metaTitle": "Home - Our Application",
    "metaDescription": "Welcome to our modern web application"
  },
  "Dashboard": {
    "title": "Dashboard",
    "welcomeMessage": "Welcome back, {{userName}}!",
    "metaTitle": "Dashboard - Our Application"
  },
  "Error": {
    "somethingWentWrong": "Something went wrong!",
    "tryAgainMessage": "Please try again or contact support if the problem persists.",
    "tryAgainButton": "Try Again",
    "pageNotFound": "Page Not Found",
    "backToHome": "Back to Home"
  }
}
```

### Testing i18n in Next.js

**Component tests with mocked translations:**

```tsx
// __tests__/dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';

// setupTests.ts includes this mock:
// vi.mock('react-i18next', () => ({
//   useTranslation: () => ({ t: (key: string) => key })
// }));

describe('DashboardPage', () => {
  it('renders translated content', () => {
    render(<DashboardPage />);

    // Test expects translation keys since that's what the mock returns
    expect(screen.getByText('Dashboard.title')).toBeInTheDocument();
    expect(screen.getByText('Dashboard.welcomeMessage')).toBeInTheDocument();
  });
});
```

This comprehensive approach ensures that all user-facing text in the Next.js application is properly internationalized and maintainable across different locales.

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

### Accessibility Best Practices

- **Semantic HTML**: Use proper HTML elements for their intended purpose
- **ARIA attributes**: Implement ARIA labels and descriptions where necessary
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Screen reader compatibility**: Test with screen readers and provide meaningful alt text
- **Color contrast**: Maintain WCAG 2.1 AA color contrast ratios
- **Focus management**: Implement visible focus indicators and logical focus order

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
