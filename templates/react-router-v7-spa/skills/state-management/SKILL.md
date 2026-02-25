---
name: state-management
description: Implements state management patterns for React applications. Expert in state hierarchy selection, TanStack Query for server state, React Hook Form for forms, usehooks-ts hooks, and global state with Zustand.
---

# State Management

Choose the right state management solution and implement it correctly across all scaffolding templates.

## When to Use

Use this skill when you need to:
- Decide where to put state (URL, local, server, form, context, global)
- Implement URL search parameters for shareable state
- Use TanStack Query for server-side data
- Manage form state with React Hook Form + Zod
- Persist state with localStorage/sessionStorage
- Share state between components with Context or Zustand

## State Management Hierarchy

Always choose the simplest solution that meets the need:

| State Type | Use Case | Tool |
|------------|----------|------|
| URL | Sharable app location, filters, pagination | `useSearchParams` |
| Web storage | Persist between sessions, one browser | `useLocalStorage` / `useSessionStorage` from usehooks-ts |
| Local state | Only one component needs the state | `useState` / `useReducer` |
| Lifted state | Multiple related components need the state | `useState` in parent |
| Derived state | State can be derived from existing state | `useMemo` |
| Refs | DOM reference, state that isn't rendered | `useRef` |
| Server state | Data from APIs with caching | TanStack Query |
| Form state | Form inputs and validation | React Hook Form + Zod |
| Context | Subtree state or a small amount of global state | React Context |
| Global state | A considerable amount of global state | Zustand / Jotai / Redux Toolkit |

### HTTP Requests
For managing state for HTTP requests:
1. Use what's built into your framework (e.g., Next.js RSC for server state)
2. TanStack Query if not using Redux Toolkit for client-side caching
3. Redux Toolkit Query if using Redux Toolkit

## Essential Hooks Library (usehooks-ts)

The `usehooks-ts` library provides type-safe, well-tested hooks for common patterns.

### Storage Hooks
- `useLocalStorage` - Persist state in localStorage with JSON serialization
- `useSessionStorage` - Persist state in sessionStorage for single sessions
- `useReadLocalStorage` - Read-only access to localStorage values

### UI/UX Hooks
- `useToggle` - Boolean state with toggle, set true/false methods
- `useBoolean` - More explicit boolean state management
- `useCounter` - Counter with increment/decrement/reset/set methods
- `useDebounce` - Debounce values for search inputs and API calls
- `useThrottle` - Throttle rapidly changing values

### Browser API Hooks
- `useWindowSize` - Responsive design with window dimensions
- `useMediaQuery` - CSS media query matching
- `useOnClickOutside` - Close modals/dropdowns when clicking outside
- `useEventListener` - Clean event listener management
- `useCopyToClipboard` - Copy text to clipboard with feedback

### Advanced Hooks
- `usePrevious` - Access previous value of a variable
- `useUpdateEffect` - useEffect that skips the first render
- `useInterval` - Declarative interval hook with cleanup
- `useTimeout` - Declarative timeout hook with cleanup

## Implementation Patterns

### URL State - Search and Filter Interface

Use URL state for shareable, bookmarkable application state.

```tsx
import { useSearchParams } from 'react-router'; // or Next.js useSearchParams
import { useState } from 'react';

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

### Web Storage - Type-Safe Persistence

```tsx
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import useAppTranslation from '@/hooks/useAppTranslation';

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'en-US' | 'en-CA';
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
  const [sessionData] = useSessionStorage('sessionData', {
    tabId: Math.random().toString(36).substr(2, 9),
    startTime: new Date().toISOString(),
  });

  const updateTheme = (theme: UserPreferences['theme']) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  const updateLanguage = (language: UserPreferences['language']) => {
    setPreferences(prev => ({ ...prev, language }));
    i18n.changeLanguage(language);
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
    </div>
  );
};
```

### Local State - Component-Specific State

```tsx
import { useToggle, useCounter } from 'usehooks-ts';
import useAppTranslation from '@/hooks/useAppTranslation';

const LocalStateExample = () => {
  const { t } = useAppTranslation();

  // Simple boolean state
  const [isVisible, toggleVisible] = useToggle(false);

  // Counter with built-in operations
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <button onClick={toggleVisible}>
        {isVisible ? t('Common.hide') : t('Common.show')} {t('Common.content')}
      </button>
      {isVisible && <p>{t('LocalState.toggledContent')}</p>}

      <div>
        <span>{t('Common.count')}: {count}</span>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>{t('Common.reset')}</button>
      </div>
    </div>
  );
};
```

### Lifted State - Shared Between Components

```tsx
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCart = () => {
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

### Derived State - Computed Values

```tsx
import { useMemo } from 'react';

const ShoppingCartSummary = ({ items }: { items: CartItem[] }) => {
  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

    return { totalItems, totalPrice, averagePrice };
  }, [items]);

  return (
    <div>
      <p>Total Items: {summary.totalItems}</p>
      <p>Total Price: ${summary.totalPrice.toFixed(2)}</p>
      <p>Average Price: ${summary.averagePrice.toFixed(2)}</p>
    </div>
  );
};
```

### Refs - DOM Interaction and Non-Rendering Values

```tsx
import { useRef } from 'react';
import { usePrevious, useInterval } from 'usehooks-ts';
import { useState } from 'react';

const RefsExample = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  useInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={() => inputRef.current?.focus()}>Focus Input</button>

      <p>Current count: {count}</p>
      <p>Previous count: {previousCount}</p>
    </div>
  );
};
```

### Context - Subtree State Management

```tsx
import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from 'usehooks-ts';

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
```

### Global State - Application-Wide State with Zustand

```tsx
import { create } from 'zustand';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface GlobalState {
  user: User | null;
  notifications: Notification[];
  setUser: (user: User | null) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  notifications: [],
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
```

### Form State - React Hook Form + Zod

**ALWAYS use React Hook Form instead of manual form state management.**

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAppTranslation from '@/hooks/useAppTranslation';

const UserForm = () => {
  const { t } = useAppTranslation();

  const schema = z.object({
    name: z.string().min(2, t('Form.validation.nameMinLength')),
    email: z.string().email(t('Form.validation.invalidEmail')),
    age: z.number().min(18, t('Form.validation.ageMinimum')),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', age: 18 },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitUser(data);
      reset();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder={t('Form.namePlaceholder')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} type="email" placeholder={t('Form.emailPlaceholder')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('age', { valueAsNumber: true })} type="number" />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('Common.submitting') : t('Common.submit')}
      </button>
    </form>
  );
};
```

### Server State - TanStack Query

```typescript
// services/userApi.ts
import ky from 'ky';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;

export const userApi = {
  async getUser(id: string): Promise<User> {
    const response = await ky.get(`/api/users/${id}`).json();
    return UserSchema.parse(response);
  },
};

// hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
};

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUser(id),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userApi.updateUser(id, data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
    },
  });
}
```

## Best Practices

- **Keep state local**: Only lift state up when multiple components need it
- **Prefer URL state**: Use URL parameters for shareable, bookmarkable state
- **Avoid prop drilling**: Use React Context for deeply nested components (sparingly)
- **Distinguish server vs client state**: Use TanStack Query for API data, local state for UI
- **Derived state**: Calculate derived values in render rather than storing in state
- **State normalization**: Normalize complex state structures to avoid deep nesting
- **Form state**: Always use React Hook Form instead of manual state management
- **Use proven hooks**: Leverage usehooks-ts for common patterns
- **Memoization**: Use `useMemo` for expensive calculations, `useCallback` for stable function references

## Next Steps

- Use `implementation-engineering` skill to implement specific features
- Use `quality-analysis` skill to write tests for state logic
- Reference `i18n` skill when state involves translated content
