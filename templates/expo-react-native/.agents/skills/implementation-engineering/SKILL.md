---
name: implementation-engineering
description: Writes production-ready code following established patterns and best practices. Expert in TypeScript, React, and modern web development across all scaffolding templates.
---

# Implementation Engineering

Write clean, maintainable, production-ready code that follows scaffolding template patterns and best practices.

## When to Use

Use this skill when you need to:
- Implement features following technical specifications
- Write type-safe TypeScript code
- Build React components with proper patterns
- Integrate APIs with validation
- Implement internationalization (i18n)
- Follow framework-specific conventions

## Implementation Standards

### TypeScript
- Use strict mode (`strict: true`)
- Avoid `any` types; use `unknown` when needed
- Define interfaces for props and data structures
- Use type inference when obvious
- Export types alongside implementations

### React Components
- **Functional Components**: Use function syntax, not arrow functions for exports
- **Props Interface**: Define clear, focused interfaces
- **Single Responsibility**: Each component has one purpose
- **Composition**: Prefer composition over complex components

### Code Organization
```typescript
// ✅ Good: Clear imports and organization
import { useState } from 'react';
import useAppTranslation from '@/hooks/useAppTranslation';
import { Button } from '@/components/ui/Button';
import { userApi } from '@/services/userApi';
import type { User } from '@/types/user';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  const { t } = useAppTranslation();
  // Component logic
}
```

## Mandatory Requirements

### Internationalization (i18n)
**ALL user-facing text MUST use translation keys**

```typescript
// ❌ BAD - Never hardcode strings
<h1>Welcome to the app</h1>
<button>Click me</button>

// ✅ GOOD - Always use translations
const { t } = useAppTranslation();
<h1>{t('HomePage.welcome')}</h1>
<button>{t('Common.clickMe')}</button>
```

### Translation Key Naming
- Use PascalCase for namespaces: `HomePage`, `UserProfile`
- Use camelCase for keys: `title`, `submitButton`
- Group related keys: `Form.validation.required`

### Form Handling
**ALWAYS use React Hook Form with Zod validation**

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(t('Form.validation.invalidEmail')),
  name: z.string().min(2, t('Form.validation.nameMinLength')),
});

type FormData = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

### State Management
Follow the state management hierarchy:
1. **URL State**: Use search params for shareable state
2. **Local State**: Use `useState` for component-only state
3. **Server State**: Use TanStack Query for API data
4. **Form State**: Use React Hook Form
5. **Storage**: Use `useLocalStorage`/`useSessionStorage` from usehooks-ts

### API Integration
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
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/services/userApi';

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUser(id),
  });
}

// components/app/UserProfile.tsx
export function UserProfile({ userId }: { userId: string }) {
  const { t } = useAppTranslation();
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>{t('Common.loading')}</div>;
  if (error) return <div>{t('Common.error')}</div>;
  
  return <div>{user.name}</div>;
}
```

## Component Patterns

### UI Components (Presentational)
Located in `/components/ui/`

```typescript
// components/ui/Card.tsx
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
```

### App Components (Business Logic)
Located in `/components/app/`

```typescript
// components/app/UserDashboard.tsx
import { useUser } from '@/hooks/useUser';
import useAppTranslation from '@/hooks/useAppTranslation';
import { Card } from '@/components/ui/Card';

interface UserDashboardProps {
  userId: string;
}

export function UserDashboard({ userId }: UserDashboardProps) {
  const { t } = useAppTranslation();
  const { data: user } = useUser(userId);

  return (
    <Card title={t('Dashboard.title')}>
      <p>{t('Dashboard.welcome', { name: user?.name })}</p>
    </Card>
  );
}
```

## Testing Implementation

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('displays user name', () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
    render(<UserCard user={user} onEdit={vi.fn()} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

### Integration Tests with MSW
```typescript
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';

describe('UserProfile Integration', () => {
  it('fetches and displays user data', async () => {
    server.use(
      http.get('/api/users/:id', () => {
        return HttpResponse.json({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        });
      })
    );

    render(<UserProfile userId="1" />);
    
    await screen.findByText('John Doe');
  });
});
```

## Framework-Specific Implementation

### Next.js SSR
```typescript
// app/users/[id]/page.tsx
import { userApi } from '@/services/userApi';

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await userApi.getUser(params.id);
  
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}

// Client component for interactivity
'use client';
export function UserEditor({ initialUser }: { initialUser: User }) {
  const [user, setUser] = useState(initialUser);
  // Interactive logic
}
```

### React Router v7
```typescript
// routes/users.$id.tsx
import { useLoaderData } from 'react-router';
import { userApi } from '@/services/userApi';

export async function loader({ params }: LoaderFunctionArgs) {
  const user = await userApi.getUser(params.id);
  return { user };
}

export default function UserPage() {
  const { user } = useLoaderData<typeof loader>();
  return <div>{user.name}</div>;
}
```

### TanStack Router
```typescript
// routes/users.$id.tsx
import { createFileRoute } from '@tanstack/react-router';
import { userApi } from '@/services/userApi';

export const Route = createFileRoute('/users/$id')({
  loader: async ({ params }) => {
    const user = await userApi.getUser(params.id);
    return { user };
  },
  component: UserPage,
});

function UserPage() {
  const { user } = Route.useLoaderData();
  return <div>{user.name}</div>;
}
```

## Error Handling

### Component Error Boundaries
```typescript
// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

### Async Error Handling
```typescript
try {
  const user = await userApi.getUser(id);
  return user;
} catch (error) {
  if (error instanceof ZodError) {
    console.error('Validation error:', error.errors);
  } else if (error instanceof HTTPError) {
    console.error('API error:', error.response.status);
  }
  throw error;
}
```

## Performance Optimization

### Memoization
```typescript
// Only memoize expensive components
const ExpensiveList = React.memo(({ items }: { items: Item[] }) => {
  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
});

// Use useMemo for expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Use useCallback for stable function references
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

### Code Splitting
```typescript
// Lazy load heavy components
const HeavyChart = lazy(() => import('@/components/HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}
```

## Code Quality Checklist

Before committing:
- [ ] All user-facing text uses translation keys
- [ ] TypeScript has no `any` types
- [ ] Components have single responsibility
- [ ] Props interfaces are well-defined
- [ ] Forms use React Hook Form + Zod
- [ ] API responses are validated with Zod
- [ ] Error states are handled
- [ ] Loading states are shown
- [ ] Unit tests are written
- [ ] Code passes ESLint and Prettier
- [ ] No console.log statements in production code

## Next Steps

After implementation:
1. Write unit tests for components and utilities
2. Collaborate with Quality Analyst for integration tests
3. Manual testing in development environment
4. Code review for patterns and best practices
5. Deployment with CI/CD pipeline
