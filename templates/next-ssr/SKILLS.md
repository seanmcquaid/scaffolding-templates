# Next.js SSR Skills

This document defines the specialized skills and capabilities available in this Next.js Server-Side Rendering template for GitHub Copilot agents.

## Core Skills

### Next.js App Router Development
**Skill:** `nextjs-app-router`
- Building applications with Next.js 15+ App Router
- Implementing file-based routing with app directory
- Using server components by default
- Adding "use client" directive when needed
- Managing layouts and nested routing
- Implementing parallel and intercepting routes

### Server-Side Rendering
**Skill:** `nextjs-ssr-patterns`
- Rendering React Server Components (RSC)
- Using client components for interactivity
- Implementing streaming with Suspense
- Using Partial Prerendering (PPR)
- Managing server and client boundaries
- Preventing hydration mismatches

### Modern React Development
**Skill:** `react-19-nextjs`
- Using React 19 with Next.js
- Leveraging React Compiler optimizations
- Implementing concurrent features
- Using Server Actions for mutations
- Managing async components

## Data Loading Skills

### Server-Side Data Fetching
**Skill:** `nextjs-data-fetching`
- Fetching data in Server Components
- Using async/await in components
- Implementing parallel data fetching
- Using fetch with Next.js caching
- Configuring revalidation strategies (ISR)
- Implementing on-demand revalidation

**Skill:** `tanstack-query-nextjs`
- Using TanStack Query with Next.js
- Hydrating queries from server data
- Implementing client-side caching
- Managing cache with React Server Components
- Using prefetchQuery for server-side data

### Server Actions
**Skill:** `nextjs-server-actions`
- Creating server actions with "use server"
- Handling form submissions with Server Actions
- Implementing progressive enhancement
- Validating form data with Zod
- Managing server action errors and redirects
- Using useFormStatus and useFormState

## Route Handling Skills

### API Routes
**Skill:** `nextjs-api-routes`
- Creating API routes in app/api
- Implementing Route Handlers
- Handling different HTTP methods
- Validating request/response with Zod
- Managing CORS and middleware
- Implementing authentication in API routes

### Dynamic Routes
**Skill:** `nextjs-dynamic-routing`
- Creating dynamic route segments
- Using generateStaticParams for static generation
- Implementing catch-all routes
- Managing route groups
- Using parallel routes for advanced layouts

## UI Development Skills

### Server & Client Components
**Skill:** `nextjs-component-patterns`
- Deciding when to use server vs client components
- Passing server data to client components
- Using context providers with Server Components
- Implementing composition patterns
- Managing component boundaries

**Skill:** `tailwind-shadcn-nextjs`
- Using Tailwind CSS in Next.js
- Building accessible components with shadcn/ui
- Implementing responsive designs
- Managing CSS modules when needed
- Optimizing styles with Turbopack

### Internationalization
**Skill:** `i18next-nextjs-ssr`
- Implementing i18next with Next.js SSR
- Using type-safe translation keys
- Implementing locale routing
- Managing translations in Server Components
- Handling locale detection
- Implementing language switching

## State Management Skills

### Next.js State Management
**Skill:** `nextjs-state-patterns`
- Managing server state with Server Components
- Using TanStack Query for client state
- Implementing URL state with searchParams
- Using React Hook Form for forms
- Managing global client state when needed

**Skill:** `form-handling-nextjs`
- Building forms with Server Actions
- Using React Hook Form with Server Actions
- Validating forms with Zod
- Implementing optimistic UI updates
- Handling form errors and validation

## Build & Development Skills

### Next.js Configuration
**Skill:** `nextjs-config`
- Configuring next.config.js
- Setting up environment variables
- Configuring images and fonts
- Managing build output
- Implementing custom webpack configuration
- Using Turbopack for development

**Skill:** `nextjs-middleware`
- Creating middleware for request handling
- Implementing authentication middleware
- Managing redirects and rewrites
- Handling internationalization routing
- Setting security headers

## Performance Skills

### Next.js Optimization
**Skill:** `nextjs-performance`
- Implementing code splitting
- Using dynamic imports with next/dynamic
- Optimizing images with next/image
- Implementing font optimization
- Using metadata for preloading
- Monitoring Core Web Vitals

**Skill:** `nextjs-caching`
- Using Next.js data cache
- Implementing ISR (Incremental Static Regeneration)
- Using on-demand revalidation
- Managing cache tags
- Implementing stale-while-revalidate
- Configuring CDN caching

## SEO & Meta Skills

### SEO Optimization
**Skill:** `nextjs-seo`
- Using Metadata API for static metadata
- Implementing generateMetadata for dynamic meta tags
- Adding Open Graph and Twitter Card meta
- Creating sitemaps and robots.txt
- Implementing structured data (JSON-LD)
- Managing canonical URLs

**Skill:** `nextjs-accessibility`
- Building accessible applications
- Using semantic HTML in Server Components
- Implementing keyboard navigation
- Testing with screen readers
- Ensuring WCAG 2.1 compliance

## Testing Skills

### Next.js Testing
**Skill:** `nextjs-testing`
- Testing Server Components
- Testing Client Components with Testing Library
- Mocking Server Actions
- Testing API routes
- Using MSW for API mocking
- E2E testing with Playwright

## Deployment Skills

### Next.js Deployment
**Skill:** `nextjs-deployment`
- Deploying to Vercel
- Self-hosting Next.js applications
- Configuring for Docker containers
- Setting up CDN and edge caching
- Managing environment variables in production
- Implementing CI/CD pipelines

## Tools & Technologies

- **Next.js 15.3+**: React framework with App Router
- **React 19**: UI library with Server Components
- **TypeScript**: Type-safe development
- **Turbopack**: Fast development bundler
- **TanStack Query**: Client-side state management
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

1. **Server Components by default**: Use client components only when needed
2. **Streaming with Suspense**: Implement incremental page loading
3. **Server Actions for mutations**: Use Server Actions for form handling
4. **Type-safe everything**: Use TypeScript strict mode and Zod validation
5. **Image optimization**: Always use next/image for images
6. **Font optimization**: Use next/font for web fonts
7. **Metadata API**: Use built-in metadata for SEO
8. **ISR when possible**: Use Incremental Static Regeneration
9. **Test server and client**: Write tests for both component types
10. **Monitor performance**: Track Core Web Vitals in production

## Next.js-Specific Considerations

### Server Components vs Client Components
- Server Components: Default, for data fetching and static content
- Client Components: For interactivity, browser APIs, React hooks (useState, useEffect)
- Rule: Keep components as Server Components unless they need client features

### Data Fetching Patterns
- Server Components: Use async/await directly in components
- Client Components: Use TanStack Query or useEffect
- Both: Validate data with Zod schemas

### Caching Strategy
- Data Cache: Automatic caching of fetch requests
- Full Route Cache: Static rendering cached by default
- Router Cache: Client-side caching of visited routes
- Use cache tags for fine-grained revalidation

### Environment Variables
- NEXT_PUBLIC_ prefix for client-side variables
- Server-only variables without prefix
- Validate all environment variables with Zod
- Never expose secrets to client

## Quick Start Commands

- `pnpm dev`: Start development server with Turbopack
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Check code quality
- `pnpm test`: Run unit tests
- `pnpm playwright:run-e2e`: Run E2E tests
- `pnpm lint:fix`: Auto-fix linting issues
- `pnpm check-types`: Validate TypeScript types
