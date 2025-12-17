# ADR-009: Form Handling with React Hook Form

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #forms #validation #developer-experience

---

## Context

Forms are a critical part of web applications, and form state management is notoriously complex. We need a solution that:

- Provides excellent developer experience
- Integrates well with TypeScript and Zod
- Handles validation efficiently
- Minimizes re-renders for performance
- Works with controlled and uncontrolled inputs
- Supports complex form scenarios (arrays, nested objects)

Poor form handling leads to bugs, performance issues, and developer frustration.

## Decision

We will use **React Hook Form** as the **mandatory** solution for all form state management, integrated with **Zod** for schema validation via **@hookform/resolvers**.

## Rationale

React Hook Form provides:

1. **Performance**: Minimizes re-renders by using uncontrolled components by default
2. **Developer Experience**: Simple API with excellent TypeScript support
3. **Validation**: Seamless Zod integration for type-safe validation
4. **Bundle Size**: Small footprint (~24KB) compared to alternatives
5. **Flexibility**: Handles simple and complex forms equally well
6. **Accessibility**: Built-in ARIA attributes and error handling
7. **Proven**: Industry standard with large ecosystem

Making it mandatory prevents inconsistent form handling patterns across the application.

## Consequences

### Positive Consequences
- Consistent form handling across the entire application
- Excellent performance even with large forms
- Type-safe forms with Zod schema validation
- Reduced boilerplate compared to manual state management
- Built-in error handling and validation
- Good accessibility out of the box
- Less form-related bugs

### Negative Consequences / Trade-offs
- All developers must learn React Hook Form
- Uncontrolled components may be unfamiliar to some developers
- Integration with some UI libraries may require adapters
- Complex forms still require understanding of library features

### Risks and Mitigations
- **Risk**: Developers may fall back to useState for forms
  - **Mitigation**: Code review enforcement, clear documentation showing RHF is easier
- **Risk**: Uncontrolled components may confuse developers used to controlled inputs
  - **Mitigation**: Provide examples and documentation
- **Risk**: Complex nested forms may be difficult to implement
  - **Mitigation**: Document patterns for arrays and nested objects

## Alternatives Considered

### Alternative 1: Formik
- **Description**: Popular form library for React
- **Pros**: 
  - Mature and well-documented
  - Large community
  - Familiar to many developers
- **Cons**: 
  - More re-renders than React Hook Form
  - Larger bundle size
  - Less performant for large forms
  - More verbose API
- **Reason for rejection**: React Hook Form has better performance and DX

### Alternative 2: Manual State Management (useState)
- **Description**: Manage form state manually with React state
- **Pros**: 
  - No dependencies
  - Full control
  - Simple for basic forms
- **Cons**: 
  - Lots of boilerplate
  - Performance issues with re-renders
  - Need to manually handle validation
  - Error-prone for complex forms
  - Inconsistent implementations
- **Reason for rejection**: Too much boilerplate, poor performance, easy to make mistakes

### Alternative 3: Form Action + Server Actions
- **Description**: Use Next.js Form Actions for all forms
- **Pros**: 
  - Progressive enhancement
  - Works without JavaScript
  - Server-side validation
- **Cons**: 
  - Limited client-side validation
  - No immediate feedback without JS
  - More complex to implement
  - Still needs client-side library for better UX
- **Reason for rejection**: Can be used alongside RHF, but RHF provides better client UX

### Alternative 4: TanStack Form
- **Description**: New form library from TanStack team
- **Pros**: 
  - Framework agnostic
  - Modern API
  - From trusted team
- **Cons**: 
  - Very new, less battle-tested
  - Smaller ecosystem
  - Less documentation and examples
- **Reason for rejection**: Too new, React Hook Form is more proven

## Implementation Notes

### Basic Form Pattern
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};
```

### Complex Forms with Arrays
```tsx
const { control, register, handleSubmit } = useForm();
const { fields, append, remove } = useFieldArray({
  control,
  name: 'items',
});

// Map over fields for dynamic form arrays
```

### Integration with shadcn/ui
```tsx
// Use Controller for custom components
import { Controller } from 'react-hook-form';

<Controller
  name="date"
  control={control}
  render={({ field }) => (
    <DatePicker {...field} />
  )}
/>
```

## Related Decisions

- [ADR-008: API Client with ky and Zod](./ADR-008-api-client.md)
- [ADR-006: State Management Approach](./ADR-006-state-management.md)

## References

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Resolver Documentation](https://github.com/react-hook-form/resolvers#zod)
- [React Hook Form Performance](https://react-hook-form.com/advanced-usage#Performance)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
