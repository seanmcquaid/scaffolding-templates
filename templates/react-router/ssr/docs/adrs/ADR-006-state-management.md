# ADR-006: State Management Approach

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #state-management #architecture #performance

---

## Context

State management is a critical architectural decision that affects application scalability, performance, and maintainability. We need to establish patterns for:

- Server state (data from APIs)
- Client state (UI state, user preferences)
- Form state
- URL state (routing and query parameters)
- Shared state across components

The goal is to avoid over-engineering while providing clear patterns for common scenarios.

## Decision

We will use a **hierarchical state management approach** that chooses the right tool for each type of state:

1. **TanStack Query**: For server state management with caching
2. **React Hook Form**: For all form state (mandatory)
3. **usehooks-ts**: For common client-side patterns
4. **URL/Search Params**: For shareable application state
5. **Next.js Server Components**: To reduce client state where possible
6. **Local Component State**: Default for isolated component state
7. **React Context**: Only for subtree state (used sparingly)

**No global state library** (Redux, Zustand, etc.) - use only when genuinely needed.

## Rationale

This approach provides:

1. **Right Tool for the Job**: Each state type has an optimal solution
2. **Simplicity**: Avoid unnecessary complexity from global state libraries
3. **Performance**: TanStack Query caching and Server Components reduce network requests
4. **Developer Experience**: Clear patterns for each scenario
5. **Maintainability**: Well-understood, focused libraries
6. **Type Safety**: All solutions have excellent TypeScript support
7. **Modern Patterns**: Aligns with React and Next.js best practices

## Consequences

### Positive Consequences
- Clear decision tree for where to put state
- Reduced prop drilling without global state complexity
- Automatic caching and synchronization for server data
- Simpler form handling without manual state management
- Better performance through Server Components
- Less boilerplate compared to Redux-like solutions

### Negative Consequences / Trade-offs
- Multiple libraries to learn instead of one global solution
- May need global state library if app grows very complex
- Developers must understand when to use each approach
- No single source of truth for all application state

### Risks and Mitigations
- **Risk**: Developers may misuse Context leading to performance issues
  - **Mitigation**: Document when Context is appropriate, provide examples
- **Risk**: Without global state, some patterns may be harder to implement
  - **Mitigation**: Can add Zustand or Redux if genuinely needed
- **Risk**: Inconsistent state management patterns across the app
  - **Mitigation**: Clear documentation and code review practices

## State Management Hierarchy

| State Type | Solution | Use Case |
|------------|----------|----------|
| URL | Next.js searchParams | Shareable app location, filters |
| Web Storage | usehooks-ts (useLocalStorage) | Persist between sessions |
| Local State | useState/useReducer | Component-specific state |
| Lifted State | Props | Multiple related components |
| Derived State | useMemo | Computed from existing state |
| Refs | useRef | DOM refs, non-rendered values |
| Context | React Context | Subtree state (theme, etc.) |
| Server State | TanStack Query | API data with caching |
| Form State | React Hook Form | All form inputs |

## Alternatives Considered

### Alternative 1: Redux Toolkit
- **Description**: Use Redux for all global state
- **Pros**: 
  - Single source of truth
  - Excellent DevTools
  - Well-established patterns
  - Good for complex state interactions
- **Cons**: 
  - Significant boilerplate
  - Overkill for most applications
  - Learning curve
  - Performance overhead for simple state
- **Reason for rejection**: Too heavy for most use cases, can add later if needed

### Alternative 2: Zustand
- **Description**: Lightweight global state library
- **Pros**: 
  - Minimal boilerplate
  - Simple API
  - Good performance
- **Cons**: 
  - Still adds global state when not needed
  - Another library to learn
  - Can encourage overuse of global state
- **Reason for rejection**: Start simple, add if needed

### Alternative 3: Jotai or Recoil
- **Description**: Atomic state management libraries
- **Pros**: 
  - Fine-grained reactivity
  - Good performance
  - Modern approach
- **Cons**: 
  - Different mental model
  - Learning curve
  - Less mature ecosystem
- **Reason for rejection**: More complex than needed for most scenarios

## Implementation Notes

### Server State Pattern
```tsx
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
```

### Form State Pattern
```tsx
import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit } = useForm();
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
};
```

### Client State Pattern
```tsx
import { useLocalStorage, useToggle } from 'usehooks-ts';

const Component = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [isOpen, toggle] = useToggle(false);
};
```

### URL State Pattern
```tsx
import { useSearchParams } from 'next/navigation';

const Component = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
};
```

## Related Decisions

- [ADR-001: Use Next.js 15 with App Router](./ADR-001-nextjs-15-app-router.md)
- [ADR-009: Form Handling with React Hook Form](./ADR-009-form-handling.md)

## References

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [usehooks-ts Documentation](https://usehooks-ts.com/)
- [Cory House Tweet on State Management](https://twitter.com/housecor/status/1437765673439088644)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
