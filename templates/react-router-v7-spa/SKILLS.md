# React Router V7 SPA Skills

This document defines the specialized skills and capabilities available in this React Router V7 Single-Page Application template for GitHub Copilot agents.

## Core Skills

### React Router V7 Development
**Skill:** `react-router-v7-spa`
- Building single-page applications with React Router V7
- Implementing file-based routing patterns
- Using loaders for data fetching
- Implementing client-side navigation
- Managing route-based code splitting

### Modern React Development
**Skill:** `react-19-patterns`
- Using React 19 with concurrent features
- Implementing functional components with hooks
- Managing client-side state with useState and useReducer
- Using custom hooks from usehooks-ts
- Optimizing components with React.memo and useMemo

### State Management
**Skill:** `spa-state-management`
- Managing server state with TanStack Query
- Handling form state with React Hook Form
- Using URL parameters for shareable state
- Implementing local storage persistence with usehooks-ts
- Managing global client state when needed

### Form Handling
**Skill:** `react-forms`
- Building forms with React Hook Form
- Validating forms with Zod schemas
- Type-safe form handling with TypeScript
- Implementing optimistic UI updates
- Handling form errors and validation messages

## UI Development Skills

### Styling & Components
**Skill:** `tailwind-shadcn-ui`
- Using Tailwind CSS utility classes
- Implementing responsive mobile-first designs
- Building accessible components with shadcn/ui
- Creating custom component variants
- Maintaining design system consistency

### Internationalization
**Skill:** `i18next-spa`
- Implementing i18next for client-side translations
- Using type-safe translation keys with TypeScript
- Managing multiple locales
- Implementing language switching
- Organizing translations by feature/page

## API Integration Skills

### Data Fetching
**Skill:** `tanstack-query-spa`
- Using TanStack Query for client-side data fetching
- Implementing query options for reusable configurations
- Managing cache invalidation and updates
- Implementing optimistic updates with mutations
- Handling loading and error states

**Skill:** `api-client-ky`
- Building type-safe API clients with ky
- Implementing request/response validation with Zod
- Handling errors consistently
- Implementing retry logic
- Managing authentication tokens

## Testing Skills

### Unit & Component Testing
**Skill:** `vitest-testing-library`
- Writing unit tests with Vitest
- Testing React components with Testing Library
- Testing custom hooks
- Mocking API calls with MSW
- Achieving high test coverage

### End-to-End Testing
**Skill:** `playwright-e2e`
- Writing E2E tests with Playwright
- Testing user workflows
- Implementing page object patterns
- Testing accessibility compliance
- Running tests in CI/CD

## Build & Development Skills

### Vite Development
**Skill:** `vite-spa-development`
- Using Vite for fast development
- Configuring build optimization
- Implementing code splitting
- Managing environment variables with Zod validation
- Optimizing production builds

### Code Quality
**Skill:** `react-code-quality`
- Linting React code with ESLint
- Formatting with Prettier
- Type-checking with TypeScript strict mode
- Using Husky for pre-commit hooks
- Running lint-staged checks

## Performance Skills

### Bundle Optimization
**Skill:** `spa-performance`
- Implementing lazy loading for routes
- Using React.lazy for component code splitting
- Monitoring bundle size with bundlesize
- Optimizing images and assets
- Implementing caching strategies

### Runtime Performance
**Skill:** `react-performance`
- Using React DevTools Profiler
- Implementing memoization strategies
- Optimizing re-renders
- Managing component keys properly
- Profiling and debugging performance issues

## Tools & Technologies

- **React Router V7**: Client-side routing
- **React 19**: UI library with concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Build tool and dev server
- **TanStack Query**: Server state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **usehooks-ts**: Utility hooks collection
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Accessible component library
- **i18next**: Internationalization
- **ky**: HTTP client
- **Vitest**: Testing framework
- **Playwright**: E2E testing
- **MSW**: API mocking

## Best Practices

1. **URL state for shareable data**: Use URL parameters for shareable application state
2. **Form state with React Hook Form**: Never manage form state manually
3. **Type-safe translations**: Always use i18next for user-facing text
4. **TanStack Query for server data**: Manage server state with proper caching
5. **Memoization strategy**: Use React.memo for expensive components only
6. **Code splitting**: Lazy load routes and heavy components
7. **Accessibility first**: Use semantic HTML and ARIA attributes
8. **Mobile-first responsive**: Start with mobile layouts
9. **Test coverage**: Aim for high test coverage on critical paths
10. **Bundle monitoring**: Track and optimize bundle size regularly

## Quick Start Commands

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm test`: Run unit tests
- `pnpm playwright:run-e2e`: Run E2E tests
- `pnpm lint`: Check code quality
- `pnpm lint:fix`: Auto-fix linting issues
- `pnpm check-types`: Validate TypeScript types
