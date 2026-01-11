# TanStack Router SPA Skills

This document defines the specialized skills and capabilities available in this TanStack Router Single-Page Application template for GitHub Copilot agents.

## Core Skills

### TanStack Router Development
**Skill:** `tanstack-router-spa`
- Building single-page applications with TanStack Router
- Implementing type-safe routing
- Using file-based routing patterns
- Implementing route loaders for data fetching
- Managing search params with type safety
- Implementing nested routing and layouts

### Modern React Development
**Skill:** `react-19-tanstack`
- Using React 19 with concurrent features
- Implementing functional components with hooks
- Managing client-side state effectively
- Using custom hooks from usehooks-ts
- Optimizing components with React.memo and useMemo

### Type-Safe Routing
**Skill:** `type-safe-routing`
- Using TanStack Router's type-safe route definitions
- Implementing type-safe navigation
- Managing type-safe search params
- Using type-safe route context
- Implementing type-safe loaders and actions

## Data Loading Skills

### Route-Based Data Fetching
**Skill:** `tanstack-router-loaders`
- Using route loaders for data fetching
- Implementing loader dependencies
- Managing pending states during navigation
- Handling loader errors gracefully
- Prefetching data for upcoming routes

**Skill:** `tanstack-query-integration`
- Integrating TanStack Query with TanStack Router
- Using route loaders with TanStack Query
- Implementing query options for reusable configs
- Managing cache invalidation
- Implementing optimistic updates with mutations

## State Management Skills

### Search Params State
**Skill:** `search-params-state`
- Using search params for URL state
- Implementing type-safe search param schemas
- Managing search param validation
- Creating shareable application state
- Implementing filters and pagination with search params

**Skill:** `client-state-management`
- Managing server state with TanStack Query
- Handling form state with React Hook Form
- Using URL parameters for shareable state
- Implementing local storage with usehooks-ts
- Managing global client state when needed

### Form Handling
**Skill:** `tanstack-forms`
- Building forms with React Hook Form
- Integrating forms with TanStack Router
- Validating forms with Zod schemas
- Type-safe form handling
- Implementing form actions and redirects

## UI Development Skills

### Styling & Components
**Skill:** `tailwind-shadcn-tanstack`
- Using Tailwind CSS utility classes
- Implementing responsive mobile-first designs
- Building accessible components with shadcn/ui
- Creating custom component variants
- Maintaining design system consistency

### Internationalization
**Skill:** `i18next-tanstack`
- Implementing i18next for translations
- Using type-safe translation keys
- Managing multiple locales
- Implementing language switching
- Organizing translations by feature

## Navigation Skills

### Route Navigation
**Skill:** `tanstack-navigation`
- Using useNavigate for programmatic navigation
- Implementing Link components with type safety
- Managing navigation state
- Handling navigation guards
- Implementing route transitions

**Skill:** `tanstack-route-context`
- Using route context for shared data
- Implementing context providers in routes
- Managing authenticated routes
- Implementing permission-based routing

## API Integration Skills

### Data Fetching
**Skill:** `ky-api-client`
- Building type-safe API clients with ky
- Implementing request/response validation with Zod
- Handling errors consistently
- Implementing retry logic
- Managing authentication tokens

## Testing Skills

### Unit & Component Testing
**Skill:** `vitest-testing-library-tanstack`
- Writing unit tests with Vitest
- Testing React components with Testing Library
- Testing route components
- Mocking TanStack Router
- Mocking API calls with MSW

### E2E Testing
**Skill:** `playwright-tanstack`
- Writing E2E tests with Playwright
- Testing navigation flows
- Implementing page object patterns
- Testing search param state
- Running tests in CI/CD

## Build & Development Skills

### Vite Development
**Skill:** `vite-tanstack-development`
- Using Vite for fast development
- Configuring TanStack Router with Vite
- Implementing code splitting
- Managing environment variables with Zod
- Optimizing production builds

**Skill:** `tanstack-router-devtools`
- Using TanStack Router Devtools
- Debugging route state
- Inspecting search params
- Monitoring loader execution
- Debugging navigation issues

### Code Quality
**Skill:** `tanstack-code-quality`
- Linting React code with ESLint
- Formatting with Prettier
- Type-checking with TypeScript strict mode
- Using Husky for pre-commit hooks
- Running lint-staged checks

## Performance Skills

### Route Optimization
**Skill:** `tanstack-performance`
- Implementing lazy loading for routes
- Using route-based code splitting
- Preloading routes on hover/focus
- Monitoring bundle size
- Optimizing images and assets

**Skill:** `tanstack-caching`
- Implementing TanStack Query caching strategies
- Using stale-while-revalidate patterns
- Managing cache lifetime
- Implementing cache invalidation
- Optimizing cache size

### Runtime Performance
**Skill:** `react-performance-tanstack`
- Using React DevTools Profiler
- Implementing memoization strategies
- Optimizing re-renders
- Managing component keys
- Profiling navigation performance

## Advanced Skills

### Route Masking
**Skill:** `tanstack-route-masking`
- Implementing route masking for cleaner URLs
- Using route aliases
- Managing masked route state
- Implementing modal routes with masking

### Parallel Routes
**Skill:** `tanstack-parallel-routes`
- Implementing parallel route loading
- Managing multiple route segments
- Coordinating parallel loaders
- Handling parallel route errors

## Tools & Technologies

- **TanStack Router**: Type-safe routing library
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

1. **Type-safe everything**: Leverage TanStack Router's type safety
2. **Search params for state**: Use search params for shareable state
3. **Route loaders for data**: Fetch data in route loaders
4. **TanStack Query integration**: Use Query with Router for caching
5. **Form state with React Hook Form**: Never manage form state manually
6. **Type-safe translations**: Always use i18next for user-facing text
7. **Lazy load routes**: Implement route-based code splitting
8. **Preload on interaction**: Preload routes on hover/focus
9. **Monitor bundle size**: Track and optimize bundle size
10. **Test navigation**: Write tests for routing behavior

## TanStack Router-Specific Considerations

### Type Safety
- Define route trees with proper TypeScript types
- Use route type generation for maximum safety
- Validate search params with Zod schemas
- Use type-safe navigation helpers

### Search Params
- Use search params for filters, pagination, and sorting
- Implement type-safe search param validation
- Keep search param schemas close to routes
- Use search param defaults appropriately

### Route Loading
- Implement loaders for data dependencies
- Use loader context for shared data
- Handle loader errors with error boundaries
- Show pending states during navigation

### Code Splitting
- Use lazy route definitions
- Split routes by feature
- Preload critical routes
- Monitor bundle sizes per route

## Quick Start Commands

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm test`: Run unit tests
- `pnpm playwright:run-e2e`: Run E2E tests
- `pnpm lint`: Check code quality
- `pnpm lint:fix`: Auto-fix linting issues
- `pnpm check-types`: Validate TypeScript types
- `pnpm routes`: Generate route types (if configured)
