# ADR-007: Use Tailwind CSS with shadcn/ui

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #styling #ui #design-system #tailwind #shadcn

---

## Context

We need a styling solution that provides:
- Fast development velocity
- Consistent design system
- Good performance (minimal CSS bundle)
- Excellent TypeScript support
- Accessible components out of the box
- Easy customization and theming

The styling approach fundamentally impacts development speed and application maintainability.

## Decision

We will use **Tailwind CSS 4** for styling with **shadcn/ui** as the component library, built on **Radix UI** primitives.

Additional utilities:
- `clsx` and `tailwind-merge` for conditional classes
- `class-variance-authority` (CVA) for component variants

## Rationale

This approach provides:

1. **Rapid Development**: Utility-first CSS enables fast prototyping
2. **Consistency**: Tailwind's design system ensures consistent spacing, colors, typography
3. **Performance**: Purges unused CSS, resulting in small production bundles
4. **Accessibility**: shadcn/ui components built on Radix UI with a11y built-in
5. **Customization**: Easy to customize and extend the design system
6. **Type Safety**: CVA provides type-safe component variants
7. **Developer Experience**: Excellent VS Code IntelliSense support
8. **Copy-Paste Components**: shadcn/ui philosophy gives full control over components

## Consequences

### Positive Consequences
- Very fast UI development with utility classes
- Small CSS bundle size in production
- No CSS naming conflicts or specificity issues
- Accessible components out of the box
- Full control over component code (not a dependency)
- Easy to customize and extend
- Great developer experience with IntelliSense

### Negative Consequences / Trade-offs
- HTML can become verbose with many utility classes
- Learning curve for developers unfamiliar with utility-first CSS
- Component files can look cluttered with long className strings
- Need to maintain component code (not black-box library)
- Potential for inconsistent implementations if not following patterns

### Risks and Mitigations
- **Risk**: Developers may create inconsistent components
  - **Mitigation**: Provide component examples and design system documentation
- **Risk**: Long className strings hurt readability
  - **Mitigation**: Extract complex components, use CVA for variants
- **Risk**: Over-reliance on inline styles
  - **Mitigation**: Create reusable components for common patterns

## Alternatives Considered

### Alternative 1: CSS Modules
- **Description**: Component-scoped CSS with CSS Modules
- **Pros**: 
  - Traditional CSS approach
  - Clear separation of styles and logic
  - No learning curve for CSS developers
- **Cons**: 
  - More boilerplate (separate CSS files)
  - Need to manage class names
  - Larger CSS bundles
  - No design system by default
- **Reason for rejection**: Slower development, no built-in design system

### Alternative 2: Styled Components / Emotion
- **Description**: CSS-in-JS solution
- **Pros**: 
  - Dynamic styling with JavaScript
  - Component-scoped styles
  - TypeScript integration
- **Cons**: 
  - Runtime performance overhead
  - Larger JavaScript bundle
  - Server Components compatibility issues
  - More complex setup with Next.js
- **Reason for rejection**: Performance concerns and SSR complexity

### Alternative 3: Material-UI or Chakra UI
- **Description**: Complete component library with built-in styling
- **Pros**: 
  - Ready-made components
  - Consistent design system
  - Accessibility built-in
- **Cons**: 
  - Heavy bundle size
  - Less flexibility for custom designs
  - More difficult to customize deeply
  - Components are dependencies (less control)
- **Reason for rejection**: Less flexible, larger bundle size, less control

### Alternative 4: Vanilla CSS with Design Tokens
- **Description**: Plain CSS with CSS variables for theming
- **Pros**: 
  - No build step for CSS
  - Full control
  - Standards-based
- **Cons**: 
  - More manual work
  - Need to build design system from scratch
  - No built-in utilities
  - Slower development
- **Reason for rejection**: Too much manual work, slower development

## Implementation Notes

### Tailwind Configuration
- Use Tailwind CSS 4 with new CSS-first configuration
- Configure design tokens (colors, spacing, typography)
- Enable JIT mode for development
- Configure content paths for optimal purging

### shadcn/ui Setup
- Install and configure shadcn/ui CLI
- Add components as needed (not all at once)
- Customize component styles to match design system
- Store components in `src/components/ui/`

### Component Patterns
```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        outline: 'border border-primary',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Utility Functions
```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Related Decisions

- [ADR-001: Use Next.js 15 with App Router](./ADR-001-nextjs-15-app-router.md)

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Class Variance Authority](https://cva.style/docs)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
