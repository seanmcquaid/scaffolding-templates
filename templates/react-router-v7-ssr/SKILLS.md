# React Router V7 SSR Skills

This document defines the specialized skills and capabilities available in this React Router V7 Server-Side Rendering template for GitHub Copilot agents.

## Core Skills

### React Router V7 SSR Development
**Skill:** `react-router-v7-ssr`
- Building full-stack applications with React Router V7
- Implementing server-side rendering with hydration
- Using loaders for server-side data fetching
- Implementing server actions for form handling
- Managing client and server entry points
- Preventing hydration mismatches

### Server-Side Rendering
**Skill:** `ssr-patterns`
- Server-side rendering React components
- Hydrating client-side React applications
- Managing server vs client code boundaries
- Implementing progressive enhancement
- Handling SSR-specific concerns (window, localStorage, etc.)
- Streaming SSR for better performance

### Modern React Development
**Skill:** `react-19-ssr-patterns`
- Using React 19 with SSR capabilities
- Implementing server and client components patterns
- Managing state across server and client
- Using Suspense for data fetching
- Optimizing concurrent rendering

## Data Loading Skills

### Server-Side Data Fetching
**Skill:** `ssr-data-loading`
- Using React Router loaders for server data fetching
- Implementing clientLoader for client-side navigation
- Fetching data on the server for SEO
- Passing server data to client components
- Handling loading states during navigation

**Skill:** `tanstack-query-ssr`
- Using TanStack Query with SSR hydration
- Prefetching queries on the server
- Dehydrating and rehydrating query cache
- Managing cache across server and client
- Implementing optimistic updates with mutations

### Server Actions
**Skill:** `react-router-server-actions`
- Implementing form submissions with server actions
- Validating form data on the server
- Using action and clientAction patterns
- Returning errors and redirects from actions
- Handling progressive enhancement for forms

## State Management Skills

### SSR-Safe State Management
**Skill:** `ssr-state-management`
- Managing server state vs client state
- Using URL parameters for shareable state (SSR-safe)
- Implementing storage hooks with SSR safety (usehooks-ts)
- Avoiding hydration mismatches with state
- Using context providers with SSR

**Skill:** `form-state-ssr`
- Building forms with React Hook Form in SSR
- Validating forms with Zod schemas
- Handling server-side validation errors
- Managing form state during client navigation
- Progressive form enhancement

## UI Development Skills

### SSR-Safe Components
**Skill:** `ssr-components`
- Writing universal components (server + client)
- Using conditional rendering for client-only features
- Implementing loading states for hydration
- Building components that work without JavaScript
- Testing components with SSR

**Skill:** `tailwind-shadcn-ssr`
- Using Tailwind CSS in SSR applications
- Building accessible components with shadcn/ui
- Ensuring styles work with SSR
- Implementing responsive designs
- Managing design tokens and themes

### Internationalization SSR
**Skill:** `i18next-ssr`
- Implementing i18next with server-side rendering
- Loading translations on the server
- Hydrating translations on the client
- Using type-safe translation keys
- Implementing locale detection and switching
- Managing translations across server/client boundary

## API Integration Skills

### Server-Side API Calls
**Skill:** `ssr-api-client`
- Building separate server and client API clients
- Using ky for HTTP requests
- Implementing authentication in server loaders
- Handling API errors on server and client
- Validating responses with Zod schemas

## Testing Skills

### SSR Testing
**Skill:** `ssr-testing`
- Testing server-side rendering
- Testing hydration behavior
- Writing loader and action tests
- Testing with createMemoryRouter
- Mocking server-side dependencies

**Skill:** `component-ssr-testing`
- Testing SSR components with Testing Library
- Testing client hydration
- Mocking translations for SSR tests
- Testing progressive enhancement
- E2E testing with Playwright

## Build & Development Skills

### Vite SSR Configuration
**Skill:** `vite-ssr-build`
- Configuring Vite for SSR
- Building server and client bundles
- Managing environment variables (server vs client)
- Optimizing SSR build output
- Implementing build-time optimizations

**Skill:** `ssr-deployment`
- Deploying SSR applications
- Configuring CDN for static assets
- Setting up server infrastructure
- Implementing caching strategies
- Monitoring server performance

## Performance Skills

### SSR Performance
**Skill:** `ssr-performance-optimization`
- Implementing streaming SSR
- Optimizing Time to First Byte (TTFB)
- Preloading critical resources
- Implementing resource hints
- Monitoring Core Web Vitals

**Skill:** `ssr-caching`
- Implementing server-side caching
- Using stale-while-revalidate patterns
- Caching static content on CDN
- Managing cache invalidation
- Optimizing database queries

## SEO & Accessibility Skills

### SEO Optimization
**Skill:** `ssr-seo`
- Implementing dynamic meta tags
- Using React Router meta functions
- Adding structured data (JSON-LD)
- Generating sitemaps
- Optimizing for search engines

**Skill:** `ssr-accessibility`
- Building accessible SSR applications
- Testing with screen readers
- Implementing semantic HTML
- Managing focus during navigation
- Ensuring keyboard accessibility

## Tools & Technologies

- **React Router V7**: Full-stack framework with SSR
- **React 19**: UI library with SSR capabilities
- **TypeScript**: Type-safe development
- **Vite**: Build tool with SSR support
- **TanStack Query**: Server state with hydration
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **usehooks-ts**: SSR-safe utility hooks
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Accessible components
- **i18next**: Internationalization with SSR
- **ky**: HTTP client
- **Vitest**: Testing framework
- **Playwright**: E2E testing
- **MSW**: API mocking

## Best Practices

1. **Server components by default**: Use server rendering when possible
2. **Progressive enhancement**: Build features that work without JavaScript
3. **Hydration safety**: Ensure server and client render the same content
4. **SEO optimization**: Leverage SSR for better search engine visibility
5. **Performance first**: Use streaming SSR and resource preloading
6. **Type-safe translations**: Always use i18next for user-facing text
7. **Server actions for forms**: Use React Router actions for form handling
8. **Separate server/client concerns**: Keep server-only code separate
9. **Test both server and client**: Write tests for SSR and hydration
10. **Monitor both sides**: Track server response times and client metrics

## SSR-Specific Considerations

### Avoiding Hydration Mismatches
- Match server and client rendered content exactly
- Use useEffect for client-only initialization
- Avoid browser APIs (window, localStorage) in initial render
- Use conditional rendering for client-only features

### Environment Variables
- Separate server and client environment variables
- Validate environment variables with Zod
- Never expose server secrets to client
- Use proper naming conventions (VITE_ prefix for client)

### Error Handling
- Implement error boundaries for both server and client
- Handle loader errors appropriately
- Provide meaningful error messages
- Log server errors for debugging

## Quick Start Commands

- `pnpm dev`: Start development server with SSR
- `pnpm build`: Build for production (server + client)
- `pnpm start`: Start production server
- `pnpm test`: Run unit tests
- `pnpm playwright:run-e2e`: Run E2E tests
- `pnpm lint`: Check code quality
- `pnpm lint:fix`: Auto-fix linting issues
- `pnpm check-types`: Validate TypeScript types
