---
name: software-architecture
description: Creates scalable, maintainable architectures following modern best practices. Expert in design patterns, component hierarchies, and API design for scaffolding templates.
---

# Software Architecture

Design robust, scalable architectures that align with modern web development best practices and template patterns.

## When to Use

Use this skill when you need to:
- Design high-level architecture for new features
- Create component hierarchies and data flows
- Define API contracts and interfaces
- Document architectural decisions (ADRs)
- Evaluate technology choices
- Refactor existing architecture

## Architectural Principles

### SOLID Principles
- **Single Responsibility**: Each module has one clear purpose
- **Open/Closed**: Design for extension without modification
- **Liskov Substitution**: Components are interchangeable
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not implementations

### Design Patterns
- **Composition over Inheritance**: Favor component composition
- **Dependency Injection**: Loosely coupled components
- **Factory Pattern**: For creating complex objects
- **Observer Pattern**: For event handling (React patterns)
- **Strategy Pattern**: For interchangeable algorithms

## Architecture Process

### 1. Review Requirements
- Understand functional and non-functional requirements
- Identify constraints and dependencies
- Review performance and scalability needs

### 2. Study Existing Patterns
- Review `/AGENTS.md` for repository guidelines
- Examine template-specific patterns in `/templates/[name]/AGENTS.md`
- Study existing code architecture

### 3. Design Solution

#### Component Architecture
```
/src
  /components
    /ui          # Presentational components (buttons, cards, inputs)
    /app         # Business logic components (UserProfile, Dashboard)
  /hooks         # Custom React hooks
  /services      # API clients and data fetching
  /types         # TypeScript interfaces and types
  /utils         # Utility functions
  /constants     # Application constants
  /locales       # i18n translations
```

#### State Management Hierarchy
1. **URL State**: Shareable app location (search params, routes)
2. **Web Storage**: Persist between sessions (localStorage, sessionStorage)
3. **Local State**: Component-specific state (useState)
4. **Lifted State**: Shared between sibling components
5. **Derived State**: Calculated from existing state
6. **Refs**: DOM references, non-rendered state
7. **Context**: Subtree or small global state
8. **Global State**: Significant global state (Redux, Zustand)

#### Data Flow
```
User Action → Event Handler → State Update → Re-render
                ↓
            API Call (TanStack Query)
                ↓
            Server Response → Cache → State Update
```

### 4. Document Decisions

Create ADR (Architectural Decision Record):

```markdown
## ADR: [Decision Title]

### Status
Proposed | Accepted | Deprecated

### Context
Problem statement and background

### Decision Drivers
- Performance requirements
- Developer experience
- Maintainability
- Scalability needs

### Considered Options
1. Option A: Pros/Cons
2. Option B: Pros/Cons
3. Option C: Pros/Cons

### Decision
Chosen option and rationale

### Consequences
**Positive:**
- Benefit 1
- Benefit 2

**Negative:**
- Trade-off 1
- Mitigation strategy
```

## Template-Specific Patterns

### Next.js SSR
- **Server Components**: Default for data fetching
- **Client Components**: For interactivity ('use client')
- **Server Actions**: For mutations and form submissions
- **Metadata API**: For SEO and social sharing

### React Router v7
- **Loaders**: Server-side data fetching
- **Actions**: Form submissions and mutations
- **Layout Routes**: Nested layouts with Outlet
- **Error Boundaries**: Route-level error handling

### TanStack Router
- **Type-Safe Routes**: Generated route types
- **Search Params**: Validated with Zod schemas
- **Route Context**: Type-safe context passing
- **Code Splitting**: Automatic route-based splitting

## API Design

### RESTful Endpoints
```typescript
// /services/userApi.ts
import ky from 'ky';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;

export const userApi = {
  getUser: async (id: string): Promise<User> => {
    const response = await ky.get(`/api/users/${id}`).json();
    return UserSchema.parse(response);
  },
  
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await ky.patch(`/api/users/${id}`, { json: data }).json();
    return UserSchema.parse(response);
  },
};
```

### TanStack Query Integration
```typescript
// /hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/services/userApi';

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUser(id),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userApi.updateUser(id, data),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['user', user.id] });
    },
  });
};
```

## Component Design

### UI Components (Presentational)
```typescript
// /components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ variant, size = 'md', children, onClick }: ButtonProps) => {
  return (
    <button className={getButtonClasses(variant, size)} onClick={onClick}>
      {children}
    </button>
  );
};
```

### App Components (Business Logic)
```typescript
// /components/app/UserProfile.tsx
import { useUser, useUpdateUser } from '@/hooks/useUser';
import useAppTranslation from '@/hooks/useAppTranslation';

export const UserProfile = ({ userId }: { userId: string }) => {
  const { t } = useAppTranslation();
  const { data: user, isLoading } = useUser(userId);
  const updateUser = useUpdateUser();

  if (isLoading) return <div>{t('Common.loading')}</div>;
  
  return (
    <div>
      <h1>{t('UserProfile.title')}</h1>
      {/* Component logic */}
    </div>
  );
};
```

## Performance Considerations

### Bundle Size
- Code splitting by route
- Lazy loading for heavy components
- Tree-shaking unused code
- Monitor with bundlesize

### Runtime Performance
- React.memo for expensive components
- useMemo for expensive calculations
- useCallback for stable function references
- Avoid premature optimization

### Loading Strategies
- Suspense boundaries for code splitting
- Progressive enhancement
- Optimistic UI updates
- Background data refreshing

## Security Architecture

- Input validation with Zod schemas
- XSS prevention (React auto-escaping)
- CSRF protection for mutations
- Secure authentication flows
- Environment variable validation
- Content Security Policy headers

## Key Deliverables

1. **Architecture Diagram**: High-level system design
2. **Component Hierarchy**: Visual or text representation
3. **Data Flow**: How data moves through the system
4. **API Contracts**: Request/response schemas
5. **File Structure**: Proposed organization
6. **ADRs**: Document key decisions
7. **Implementation Guide**: Step-by-step approach

## Next Steps

After architecture design:
1. Review with Requirements Analyst for alignment
2. Hand off to Implementation Engineer or template specialist
3. Collaborate with UI/UX Designer for component design
4. Coordinate with Quality Analyst for testing strategy
