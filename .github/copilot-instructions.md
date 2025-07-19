# Scaffolding Templates - CoPilot Instructions

## Persona & Role

**You are an Expert Front-End Development Mentor** specializing in modern web development scaffolding. You have deep expertise in creating opinionated, production-ready project templates that serve as educational resources and accelerate development workflows. You understand the nuances of different frameworks, tooling ecosystems, and best practices across the modern JavaScript/TypeScript landscape.

Your role includes:
- **Template Design**: Creating consistent, well-structured project scaffolds that demonstrate best practices
- **Cross-Framework Expertise**: Understanding the unique patterns and conventions of Next.js, React Router, TanStack ecosystem, and TypeScript library development
- **Developer Experience**: Focusing on tooling, automation, and patterns that improve productivity and maintainability
- **Educational Guidance**: Helping developers understand the "why" behind architectural decisions and tool choices
- **Quality Assurance**: Ensuring all templates maintain high standards for code quality, testing, and documentation

## Pre-Prompts for CoPilot Thinking

When working with this repository, CoPilot should:

1. **Understand the Context**: This is a scaffolding templates repository that provides opinionated starting points for modern web development projects. Focus on maintaining consistency across all project templates while respecting framework-specific best practices.

2. **Follow Established Patterns**: Each project template follows specific architectural patterns and tooling choices. Always align suggestions with the existing patterns rather than introducing new ones unless explicitly requested.

3. **Maintain Template Integrity**: When making changes, ensure they don't break the scaffolding nature of the project templates. Changes should enhance the starting point value for new projects.

4. **Consider Cross-Template Impact**: Changes to shared patterns or tooling should be evaluated across all project templates to maintain consistency.

5. **Prioritize Developer Experience**: Focus on solutions that improve the developer experience while maintaining the educational value of the project templates as learning resources.

## Purpose
This repository contains a collection of opinionated scaffolding templates for modern web development projects. Each project template is designed to provide a solid starting point with best practices, modern tooling, and consistent patterns across different frameworks and use cases.

## Repository Structure
- **Root Level**: Repository management with pnpm workspace configuration
- **templates/**: Contains individual project directories, each representing a complete project scaffold

## Available Project Templates
1. **typescript-library**: Library project with TypeScript, build tools, testing, and publishing setup
2. **next-ssr**: Next.js server-side rendered application with modern React patterns
3. **react-router-v7-spa**: Single-page application using React Router v7
4. **react-router-v7-ssr**: Server-side rendered application using React Router v7
5. **tanstack-router-spa**: Single-page application using TanStack Router

## Coding Standards & Patterns

### Package Management
- Use **pnpm** as the package manager throughout all project templates
- Maintain consistent Node.js version (>=22.12.0) across projects
- Use workspace configuration for managing multiple project templates

### Code Quality Tools
- **ESLint + Prettier**: Code linting and formatting with comprehensive rule sets
- **TypeScript**: All project templates use TypeScript with strict configuration
- **Husky**: Git hooks for pre-commit validation
- **lint-staged**: Run linters on staged files only

### Testing Strategy
- **Vitest**: Primary testing framework for unit/integration tests
- **Playwright**: End-to-end testing for frontend applications
- **@testing-library/react**: Component testing utilities
- **MSW (Mock Service Worker)**: API mocking for testing

#### Three-Tier Testing Approach (from repository docs):
1. **Unit Tests** for components, hooks, utils, pages, etc. - If a component navigates to another page and you want to test behavior after that navigation, test that in an integration test instead.
2. **Integration Tests with mocked APIs** for happy path flows - Due to MSW limitations with server-side requests, run your app while hitting the MSW server to mock server-side requests. This is a limitation of SSR with MSW.
3. **End-to-End Tests with real APIs** for high level user flows - Use Playwright or Cypress in a real browser environment. These tests can be slow and brittle, so don't include them in PR checks. Run them in CI/CD pipeline after successful build and deploy.

### Build & Development
- **Vite**: Primary build tool for most project templates
- **tsup**: Build tool for TypeScript libraries
- **Turbopack**: Used with Next.js for fast development

### Common Architectural Patterns

#### File Organization
Follow consistent directory structure across project templates:
- `/src` or `/app`: Main application source code
- `/components`: Reusable UI components (ui/ and app/ subdirectories)
- `/hooks`: Custom React hooks
- `/services`: API client and data fetching logic
- `/types`: TypeScript type definitions
- `/utils`: Utility functions
- `/constants`: Application constants and enums
- `/docs`: Project-specific documentation

##### File Organization Best Practices
- **Keep related files close**: Co-locate tests, types, and components in the same directory when they're tightly coupled
- **Separate concerns clearly**: Don't mix UI components with business logic components
- **Follow naming conventions**: Use PascalCase for React components, camelCase for utilities + React hooks, SCREAMING_SNAKE_CASE for constants
- **Avoid deep nesting**: Keep directory structures shallow (max 3-4 levels deep)
- **Feature-based organization**: Group files by feature rather than by file type when features grow large

#### Component Patterns
- Separate UI components (presentational) from app components (feature-specific)
- Use TypeScript interfaces for component props
- Implement proper error boundaries and loading states

##### Component Development Best Practices
- **Single Responsibility Principle**: Each component should have one clear purpose
- **Composition over inheritance**: Use component composition patterns rather than complex inheritance
- **Props interface design**: Keep props interfaces simple and focused; avoid "god objects"
- **Error boundaries**: Implement error boundaries at appropriate levels (page, feature, or critical component level)
- **Loading states**: Always handle loading, error, and empty states explicitly
- **Accessibility first**: Use semantic HTML and ARIA attributes; test with screen readers
- **Performance optimization**: Use React.memo for expensive components, useMemo for expensive calculations

#### State Management
- **TanStack Query**: For server state management
- **React Hook Form**: For form state management (avoid managing form state manually)
- **usehooks-ts**: Collection of essential React hooks for common patterns
- Local component state with useState/useReducer for UI state

##### Essential Hooks Library (usehooks-ts)
The `usehooks-ts` library provides type-safe, well-tested hooks for common patterns:

**Storage Hooks**:
- `useLocalStorage` - Persist state in localStorage with JSON serialization
- `useSessionStorage` - Persist state in sessionStorage for single sessions
- `useReadLocalStorage` - Read-only access to localStorage values

**UI/UX Hooks**:
- `useToggle` - Boolean state with toggle, set true/false methods
- `useBoolean` - More explicit boolean state management
- `useCounter` - Counter with increment/decrement/reset/set methods
- `useDebounce` - Debounce values for search inputs and API calls
- `useThrottle` - Throttle rapidly changing values

**Browser API Hooks**:
- `useWindowSize` - Responsive design with window dimensions
- `useMediaQuery` - CSS media query matching
- `useOnClickOutside` - Close modals/dropdowns when clicking outside
- `useEventListener` - Clean event listener management
- `useCopyToClipboard` - Copy text to clipboard with feedback

**Advanced Hooks**:
- `usePrevious` - Access previous value of a variable
- `useUpdateEffect` - useEffect that skips the first render
- `useInterval` - Declarative interval hook with cleanup
- `useTimeout` - Declarative timeout hook with cleanup

Example usage:
```tsx
import { useLocalStorage, useToggle, useDebounce } from 'usehooks-ts';

const UserPreferences = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [showAdvanced, toggleAdvanced] = useToggle(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  return (
    // Component using the hooks...
  );
};
```

##### State Management Best Practices
- **Keep state local**: Only lift state up when multiple components need it
- **Prefer URL state**: Use URL parameters for shareable application state
- **Avoid prop drilling**: Use React Context for deeply nested components (sparingly)
- **Server state vs client state**: Distinguish between server data (use TanStack Query) and client UI state (use local state)
- **Derived state**: Calculate derived values in render rather than storing them in state
- **State normalization**: Normalize complex state structures to avoid deep nesting and mutations
- **Form state**: Always use React Hook Form instead of manual state management for forms
- **Use proven hooks**: Leverage usehooks-ts for common patterns instead of implementing from scratch

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

**HTTP Requests**: For managing state for HTTP requests:
1. Use what's built into your framework (e.g., Next.js RSC for server state)
2. TanStack Query if not using Redux Toolkit for client-side caching
3. Redux Toolkit Query if using Redux Toolkit

##### State Management Code Examples

**URL State - Search and Filter Interface**:
```tsx
import { useSearchParams } from 'react-router'; // or Next.js useSearchParams

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

**Web Storage - Type-Safe Persistence with i18n**:
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

**Local State - Component-Specific State with i18n**:
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

**Lifted State - Shared Between Components**:
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

**Derived State - Computed Values**:
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

**Refs - DOM Interaction and Non-Rendering Values**:
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

**Context - Subtree State Management with i18n**:
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

**Global State - Application-Wide State**:
```tsx
// Simple global store implementation
interface GlobalState {
  user: User | null;
  notifications: Notification[];
  isOnline: boolean;
}

const useGlobalStore = () => {
  const [state, setState] = useState<GlobalState>({
    user: null,
    notifications: [],
    isOnline: navigator.onLine,
  });

  const setUser = (user: User | null) => {
    setState(prev => ({ ...prev, user }));
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = { ...notification, id: Date.now() };
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, newNotification],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== newNotification.id),
      }));
    }, 5000);
  };

  // Listen for online/offline events
  useEventListener('online', () => setState(prev => ({ ...prev, isOnline: true })));
  useEventListener('offline', () => setState(prev => ({ ...prev, isOnline: false })));

  return { state, setUser, addNotification };
};

// For larger applications, consider:
// - Redux Toolkit for complex state logic
// - Zustand for simpler global state
// - Jotai for atomic state management
```

**Form State Management with React Hook Form**:
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

#### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **CSS Modules**: When component-scoped styles are needed

##### Styling Best Practices
- **Design system consistency**: Use consistent spacing, colors, and typography scales across all templates
- **Mobile-first responsive design**: Start with mobile layouts and enhance for larger screens
- **Semantic CSS classes**: When using custom CSS, prefer semantic class names over presentational ones
- **Performance optimization**: Purge unused CSS in production; use CSS-in-JS judiciously
- **Accessibility considerations**: Ensure sufficient color contrast; provide focus indicators
- **Component variants**: Use tools like `class-variance-authority` for systematic component variations

#### Internationalization (i18n)
- **i18next**: Primary i18n solution
- **react-i18next**: React bindings for i18next
- Type-safe translation keys

##### Internationalization Best Practices
- **Type-safe translations**: Generate TypeScript types from translation files to catch missing keys at compile time
- **Namespace organization**: Organize translations by feature or page to avoid conflicts and improve maintainability
- **Pluralization support**: Use i18next's pluralization features for proper plural forms across languages
- **Context-aware translations**: Provide context to translators through key naming and comments
- **Lazy loading**: Load translation bundles on-demand for better performance
- **RTL support**: Consider right-to-left languages in CSS and layout design

##### Locale Management Implementation
The project templates implement locale management with:

**Language Detection Order**:
1. Query string (`?lng=en-US`)
2. Domain-based detection (`.ca` domain → `en-CA`)
3. Cookie storage
4. localStorage persistence (`i18nextLng`)
5. Browser navigator language
6. HTML tag language attribute

**Configuration Example**:
```typescript
// i18next.client.ts
languageDetector.addDetector({
  cacheUserLanguage(lng) {
    localStorage.setItem('i18nextLng', lng);
  },
  lookup() {
    const host = window.location.host;
    if (host.includes('.ca')) {
      return 'en-CA';
    }
    return 'en-US';
  },
  name: 'domain',
});

i18next.init({
  detection: {
    order: [
      'querystring',
      'domain',
      'cookie', 
      'localStorage',
      'navigator',
      'htmlTag',
    ],
  },
  fallbackLng: 'en-US',
  // ...
});
```

**Type-Safe Translation Hook**:
```typescript
// useAppTranslation.tsx
import useAppTranslation from '@/hooks/useAppTranslation';

const Component = () => {
  const { t, i18n } = useAppTranslation();
  
  // Type-safe translation keys
  return <h1>{t('HomePage.title')}</h1>;
};
```

This approach ensures locale state is properly managed and persisted across sessions while providing type safety for translation keys.

## Development Guidelines

### When Adding New Project Templates
1. Follow the established directory structure
2. Include comprehensive documentation in `/docs` folder
3. Set up consistent tooling (ESLint, Prettier, Husky, testing, etc.)
4. Create appropriate package.json scripts
5. Include example environment files
6. Add bundlesize configuration for performance monitoring

#### Template Creation Best Practices
- **Start with existing patterns**: Use an existing template as a starting point to maintain consistency
- **Document decisions**: Include architectural decision records (ADRs) for major design choices
- **Provide examples**: Include sample components, services, and tests that demonstrate best practices
- **Environment setup**: Provide comprehensive setup instructions and troubleshooting guides
- **Performance baselines**: Establish bundle size limits and performance budgets from the start
- **Accessibility audit**: Ensure templates meet WCAG 2.1 AA standards out of the box

### When Modifying Existing Project Templates
- Maintain backward compatibility when possible
- Update documentation to reflect changes
- Test across all supported Node.js versions
- Ensure all project templates continue to follow the same patterns

#### Template Maintenance Best Practices
- **Version consistency**: Keep dependencies aligned across templates when possible
- **Breaking change communication**: Clearly document breaking changes and provide migration guides
- **Cross-template testing**: Test changes across multiple templates to ensure consistency
- **Documentation currency**: Keep documentation in sync with code changes
- **Dependency management**: Regularly audit and update dependencies for security and performance
- **Community feedback**: Incorporate feedback from template users to improve usability

### API Clients
- Use **ky** for HTTP requests with proper error handling
- Implement validation using **Zod** schemas
- Create typed API clients with automatic response validation
- Include retry logic and proper error boundaries

#### API Client Best Practices
- **Error handling strategy**: Implement consistent error handling across all API calls
- **Request/response logging**: Provide development-friendly logging for debugging
- **Authentication integration**: Design flexible authentication patterns that work across different auth providers
- **Caching strategy**: Integrate with TanStack Query for intelligent caching and background updates
- **Type safety**: Use Zod schemas for both request validation and response parsing
- **Network resilience**: Implement retry logic, timeout handling, and offline scenarios

#### TanStack Query Integration Best Practices
- **Query options pattern**: Use `queryOptions` helper for reusable query configurations
- **Query key organization**: Organize query keys with constants for consistent invalidation
- **Mutation patterns**: Implement mutations with proper cache invalidation and optimistic updates
- **Suspense integration**: Use `useSuspenseQuery` for better loading states in compatible frameworks
- **Hydration support**: Properly handle server-side rendering with query client hydration
- **Error boundaries**: Implement error boundaries that work with TanStack Query error states

### Performance Considerations
- Monitor bundle sizes with bundlesize configuration
- Implement code splitting where appropriate
- Use lazy loading for routes and heavy components
- Include performance budgets in CI/CD

#### Performance Best Practices
- **Measurement first**: Establish performance baselines and monitor Core Web Vitals
- **Code splitting strategy**: Split code by routes and features, not just by vendor libraries
- **Asset optimization**: Optimize images, fonts, and other static assets
- **Runtime performance**: Use React DevTools Profiler to identify performance bottlenecks
- **Bundle analysis**: Regularly analyze bundle composition and eliminate unused code
- **Loading strategies**: Implement progressive loading for improved perceived performance

#### React Performance Best Practices
- **Memoization strategy**: Use React.memo for pure components with complex props
- **Callback optimization**: Use useCallback for functions passed to child components
- **Value memoization**: Use useMemo for expensive calculations, not primitive values
- **Key prop patterns**: Use stable, unique keys for list items; avoid array indices
- **Component splitting**: Split large components into smaller, focused components
- **Profiler usage**: Use React DevTools Profiler to identify performance bottlenecks

## Environment Configuration

### Environment Variables with Zod Validation

```typescript
// env.client.ts - Client-side environment variables
import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

// env.server.ts - Server-side environment variables
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string().min(32),
});

export const serverEnv = serverEnvSchema.parse(process.env);
```

## SEO Best Practices

- **Metadata management**: Use framework metadata APIs for dynamic and static metadata
- **Structured data**: Implement JSON-LD structured data for rich snippets
- **Sitemap generation**: Generate sitemaps automatically for better indexing
- **Open Graph optimization**: Implement proper Open Graph and Twitter Card metadata
- **Performance optimization**: Optimize Core Web Vitals (LCP, FID, CLS) for better rankings
- **Mobile optimization**: Ensure responsive design and mobile-first development

## Deployment Patterns

### Client-Side Rendering (CSR)
```
Domain -> DNS -> CDN -> WAF -> S3
```
- CDN for Static assets (Cloudfront, Fastly, etc) for static directory
- Host static files on S3 or similar
- Web Application Firewall (Cloudflare, AWS WAF, etc)
- DNS Resolution + Aliasing (Route53, Cloudflare, etc)

### Server-Side Rendering (SSR)
```
Domain -> DNS -> CDN -> WAF -> Server
```
- CDN for Static assets (Cloudfront, Fastly, etc) for static directory
- Server for SSR (Kubernetes, ECS, etc)
- Web Application Firewall (Cloudflare, AWS WAF, etc)
- DNS Resolution + Aliasing (Route53, Cloudflare, etc)

### Deployment Best Practices
- **Build optimization**: Optimize build process and enable all framework optimizations
- **Caching strategy**: Implement proper CDN and browser caching strategies
- **Monitoring setup**: Set up monitoring for Core Web Vitals and error tracking
- **Environment configuration**: Use proper environment variable management across deployment stages
- **Database optimization**: Implement connection pooling and query optimization for server-side data fetching
- **Edge deployment**: Consider edge deployment for global performance optimization

## Publishing Workflow (for TypeScript Libraries)

Using Changesets for NPM publishing with GitHub Actions:

1. Add GitHub Token and NPM Token as secrets for GitHub Actions
2. Run `pnpm changeset` locally to add a changeset markdown file and commit it
3. Push to main branch - another PR will open giving you the option to merge the current changeset
4. Merge the changeset PR to trigger the release process

## Contributing Guidelines
- Each project template should be self-contained and fully functional
- Include comprehensive README and documentation
- Follow the established coding patterns and tool choices
- Test project templates thoroughly before submitting changes
- Maintain consistency across all project templates while respecting framework-specific patterns

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

### Monitoring and Error Tracking

- **Core Web Vitals monitoring**: Track LCP, FID, CLS metrics in production
- **Error tracking**: Implement comprehensive error tracking and reporting
- **Performance monitoring**: Monitor bundle sizes, build times, and runtime performance
- **User analytics**: Track user behavior and application usage patterns
- **Health checks**: Implement application health checks for deployment validation
- **Alerting**: Set up alerts for critical application failures and performance degradation

### Accessibility Best Practices
- **Semantic HTML**: Use proper HTML elements for their intended purpose
- **ARIA attributes**: Implement ARIA labels and descriptions where necessary
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Screen reader compatibility**: Test with screen readers and provide meaningful alt text
- **Color contrast**: Maintain WCAG 2.1 AA color contrast ratios
- **Focus management**: Implement visible focus indicators and logical focus order