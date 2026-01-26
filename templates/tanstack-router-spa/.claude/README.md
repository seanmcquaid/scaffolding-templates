# Claude Configuration for TanStack Router SPA Template

This directory contains Claude configuration for the TanStack Router SPA scaffolding template with custom sub-agents.

## Quick Start

Claude understands the sub-agent pattern through explicit file references and context management.

### In Claude Desktop/Projects

1. **Add Agent Files to Project Knowledge:**
   - Add `/agents/*.agent.md` to project knowledge
   - Add `/README.md` for template context
   - Add `../../AGENTS.md` for repository patterns

2. **Reference Agents in Conversations:**
   ```
   Please act as the TanStack Router SPA Specialist agent defined in 
   /agents/tanstack-router-spa-specialist.agent.md
   
   Task: Implement type-safe search params with Zod validation for this product catalog route
   ```

### In Cursor with Claude

Use `@` references to include agent context:

```
@agents/tanstack-router-spa-specialist.agent.md

How should I implement route loaders with TanStack Query integration?
```

## Available Agents

### Template Agents (9 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `requirements-analyst` - Feature requests, user stories, SPA requirements
- `software-architect` - SPA architecture, route structure, caching strategy
- `implementation-engineer` - React/TypeScript coding, component development
- `ui-ux-designer` - Web UI design, responsive design, accessibility
- `quality-analyst` - Unit tests, integration tests, E2E tests (Playwright)
- `deployment-engineer` - Static site deployment, CDN configuration, CI/CD
- `maintenance-engineer` - Bug fixes, performance optimization, refactoring
- `production-support-engineer` - Error tracking, monitoring, production debugging

**TanStack Router Specialist (1):**
- `tanstack-router-spa-specialist` - Type-safe routing, search params, loaders, file-based routing, route generation, TanStack Query integration

## Usage Patterns

### Pattern 1: Type-Safe Route Implementation

**Direct reference with TanStack Router context:**
```
Based on the TanStack Router SPA Specialist agent defined in 
agents/tanstack-router-spa-specialist.agent.md, implement a 
product listing route with the following requirements:

Context:
- Framework: TanStack Router with file-based routing
- Data Loading: Route loader with TanStack Query
- Search Params: filter, sort, page (Zod validated)
- Performance: Lazy loaded route, < 1s initial load
- Type Safety: Full type inference for params and search
- Caching: 5-minute stale time, background refetch

Implementation Requirements:
1. Create route file: src/routes/products/index.tsx
2. Define Zod schema for search params
3. Implement loader with queryClient.ensureQueryData
4. Create lazy component file
5. Type-safe navigation and links
6. Run route tree generation
7. Add tests for search param validation
```

### Pattern 2: Route Tree Generation Workflow

**Multi-stage route development:**

```
Stage 1: File Structure
-------------------------
Act as the TanStack Router SPA Specialist (agents/tanstack-router-spa-specialist.agent.md).
Design file structure for user management routes:
- User list with filters (/users)
- User details (/users/$userId)
- User edit form (/users/$userId/edit)
- User creation (/users/new)

Include:
- File naming conventions
- Lazy vs non-lazy routes
- Search param schemas
- Route nesting strategy
- Layout route patterns

[Wait for and review structure]

Stage 2: Implementation
-------------------------
Continue as TanStack Router SPA Specialist.
Implement the route files:
1. Create route definition files (*.tsx)
2. Create lazy component files (*.lazy.tsx)
3. Define search param schemas with Zod
4. Implement route loaders with TanStack Query
5. Set up type-safe navigation
6. Run route generation: pnpm generate:routes
7. Verify routeTree.gen.ts updates

[Wait for and review implementation]

Stage 3: Testing
-------------------------
Now act as the Quality Analyst (agents/quality-analyst.agent.md).
Create test suite:
- Unit tests for search param validation
- Loader tests with mocked queryClient
- Navigation flow tests
- Type safety verification tests
- E2E tests for user flows
```

### Pattern 3: Search Params Validation

**Type-safe search params workflow:**

```
Context Setup:
-------------------
I'm implementing advanced filtering in this TanStack Router SPA. Please reference:
- agents/tanstack-router-spa-specialist.agent.md
- ../../AGENTS.md (Zod validation patterns)

Now act as the TanStack Router SPA Specialist.

Task 1: Design search param schema
Dashboard needs:
- status: enum ['active', 'inactive', 'pending', 'all']
- dateRange: { from: Date, to: Date } (optional)
- categories: string[] (multiple selection)
- search: string (optional, min 2 chars)
- page: positive integer (default 1)
- pageSize: enum [10, 25, 50, 100] (default 25)

Task 2: Implement validation
- Create Zod schema with transforms
- Define fallbackSearch for defaults
- Handle invalid search params
- URL serialization for complex types
- Type inference for useSearch hook

Task 3: Integrate with loader
- Use loaderDeps for search dependency
- Pass validated search to TanStack Query
- Type-safe query key generation
- Cache by search params
- Background refetching on param changes

Task 4: Test validation
- Test valid search params
- Test invalid params (fallback behavior)
- Test URL encoding/decoding
- Test type safety in components
```

## Claude Projects Setup

### Project Configuration

Create a Claude Project specifically for TanStack Router SPA development:

**Project Name:** TanStack Router SPA Development

**Project Instructions:**
```
This is a TanStack Router single-page application template with custom 
sub-agents for specialized SPA development tasks. When I reference an 
agent file, adopt that agent's persona completely.

TanStack Router SPA Context:
- Framework: TanStack Router with file-based routing
- Router: Type-safe routing with route tree generation
- React: React 19 with concurrent features
- Data Loading: Route loaders + TanStack Query integration
- State Management: TanStack Query, React Hook Form, URL state
- Validation: Zod schemas for search params and forms
- Build Tool: Vite with optimized code splitting
- Styling: Tailwind CSS, shadcn/ui
- i18n: i18next with type-safe translations
- Testing: Vitest, Testing Library, Playwright
- Deployment: Static hosting (Vercel, Netlify, S3+CloudFront)

Key TanStack Router Concepts:
- File-based routing with route tree generation
- Type-safe route parameters and search params
- Route loaders with TanStack Query integration
- Lazy loading with createLazyFileRoute
- Search param validation with Zod
- Route context for shared state
- Type-safe navigation and links

Key Documents:
- ../../AGENTS.md - Repository patterns
- ./README.md - TanStack Router SPA specifics
- /agents/*.agent.md - Agent definitions
- src/routeTree.gen.ts - Auto-generated (never edit manually)

When acting as an agent:
1. Focus on type safety across routing layer
2. Leverage TanStack Router's file conventions
3. Use search params for URL state
4. Integrate loaders with TanStack Query
5. Follow route tree generation workflow
6. Optimize bundle size with lazy routes
```

**Project Knowledge (Add these files):**

**Always Include:**
- `../../AGENTS.md` - Repository patterns
- `./README.md` - TanStack Router SPA overview
- `./agents/tanstack-router-spa-specialist.agent.md`
- `./AGENTS.md` - Project-specific instructions

**SDLC Agents (add based on need):**
- `./agents/requirements-analyst.agent.md`
- `./agents/software-architect.agent.md`
- `./agents/implementation-engineer.agent.md`
- `./agents/quality-analyst.agent.md`
- `./agents/deployment-engineer.agent.md`

**TanStack Router Specific Docs:**
- `./src/routes/__root.tsx` - Root route example
- `./vite.config.ts` - Build configuration
- `./docs/**/*.md` - SPA-specific documentation

## Best Practices

### 1. Type-Safe Routing Context

✅ **Good - Type-safe TanStack Router context:**
```
Act as the TanStack Router SPA Specialist (agents/tanstack-router-spa-specialist.agent.md).

Context:
- Feature: E-commerce product catalog with advanced filtering
- Framework: TanStack Router with file-based routing
- Routes: /products with type-safe search params
- Search Params: category, priceRange, inStock, sort, page
- Validation: Zod schemas for all params
- Data: REST API with 10k products
- Performance Target: < 1s initial load, < 100ms navigation
- Caching: TanStack Query with 5-min stale time
- Type Safety: Full type inference for params, search, and loader data

Implementation needs:
1. Zod schema for complex search params
2. Route loader with ensureQueryData
3. Type-safe useSearch hook
4. Lazy loaded route component
5. Type-safe navigation links
6. Route tree generation workflow

How should I implement this optimally?
```

❌ **Bad - Vague request:**
```
How do I make a product catalog with filters?
```

### 2. Route Tree Generation

✅ **Good - Explicit workflow:**
```
As the TanStack Router SPA Specialist, guide me through adding new routes:

New Routes to Add:
- src/routes/analytics/index.lazy.tsx (dashboard)
- src/routes/analytics/reports.lazy.tsx (reports list)
- src/routes/analytics/reports.$reportId.lazy.tsx (report details)

Current State:
- routeTree.gen.ts exists
- Other routes working correctly
- Vite dev server running

Walk me through:
1. Correct file naming conventions
2. Route definition vs lazy component separation
3. CLI command to regenerate route tree
4. Verify type generation
5. Test type-safe navigation to new routes
6. Update tests for new routes
7. Git workflow (should routeTree.gen.ts be committed?)
```

### 3. Search Params Validation

✅ **Good - Schema-focused:**
```
Act as the TanStack Router SPA Specialist.

Implementing search params for analytics dashboard:

Search Params Needed:
- timeRange: enum ['24h', '7d', '30d', '90d', 'custom'] (default: '7d')
- customRange: { from: Date, to: Date } (required if timeRange === 'custom')
- metrics: string[] (multi-select from predefined list)
- groupBy: enum ['day', 'week', 'month'] (default: 'day')
- compare: boolean (default: false)

Challenges:
- Conditional validation (customRange only if timeRange === 'custom')
- Date serialization in URL
- Array params in URL
- Invalid param handling (fallback to defaults)
- Type inference for useSearch()

Design Zod schema and route implementation with:
1. Schema with conditional validation
2. Transform/coerce for dates
3. fallbackSearch configuration
4. Type-safe search access in component
5. URL state synchronization
6. Invalid param error handling
```

## TanStack Router SPA Workflows

### Workflow 1: New Route Implementation

```markdown
# Stage 1: UI Design
Act as UI/UX Designer (agents/ui-ux-designer.agent.md).
Design a responsive product details page:
- Hero section with product images
- Product information and pricing
- Customer reviews section
- Related products carousel
- Add to cart with quantity selector
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA)

[Wait, review design]

# Stage 2: Route Structure
Act as TanStack Router SPA Specialist (agents/tanstack-router-spa-specialist.agent.md).
Design route structure:
- File: src/routes/products/$productId/index.tsx
- Lazy: src/routes/products/$productId/index.lazy.tsx
- Search params: tab (reviews, specs, shipping)
- Route params: productId (validated as number)
- Loader: fetch product data with TanStack Query
- Error handling: 404 for invalid productId
- Type safety: full type inference

[Wait, review structure]

# Stage 3: Implementation
Continue as TanStack Router SPA Specialist.
Implement the product details route:
1. Create route definition file (index.tsx):
   - Zod schema for productId param
   - Zod schema for tab search param
   - loaderDeps with params and search
   - loader with queryClient.ensureQueryData
2. Create lazy component file (index.lazy.tsx):
   - Use Route.useParams() for productId
   - Use Route.useSearch() for tab
   - Use Route.useLoaderData() for product data
   - Implement tab switching
   - Type-safe navigation
3. Create query options (services/queries/products.ts)
4. Run route generation: pnpm generate:routes
5. Verify types in routeTree.gen.ts

[Wait, review implementation]

# Stage 4: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Create test suite:
- Unit tests for route params validation
- Unit tests for search params validation
- Loader tests with mocked queryClient
- Component tests with mocked route hooks
- Navigation tests with valid/invalid params
- E2E tests for full product detail flow
- Accessibility tests (axe-core)
```

### Workflow 2: Search Params Optimization

```markdown
# Feature
Implement advanced search params with validation

# Stage 1: Schema Design
Act as Software Architect (agents/software-architect.agent.md).
Design search param architecture:

Requirements:
- Product listing with multiple filters
- Price range (min, max)
- Categories (multiple selection)
- Brands (multiple selection)
- In stock filter (boolean)
- Sort options (price, rating, newest)
- Pagination (page, pageSize)

Design:
- Zod schema structure
- URL serialization strategy
- Default values approach
- Invalid param handling
- Type inference strategy
- Cache key generation from params

[Wait for architecture]

# Stage 2: Implementation
Act as TanStack Router SPA Specialist (agents/tanstack-router-spa-specialist.agent.md).
Implement search params:

Route Definition (src/routes/products/index.tsx):
1. Create Zod schema with:
   - Enum validation for sort, pageSize
   - Number validation for price range
   - Array validation for categories, brands
   - Boolean coercion for inStock
   - Transform functions for complex types
2. Define validateSearch with schema
3. Define fallbackSearch for defaults
4. Implement loaderDeps to depend on search
5. Create loader with validated search params

Component (src/routes/products/index.lazy.tsx):
1. Access search with Route.useSearch()
2. Type-safe search param updates
3. Reset filters functionality
4. Share filter URL functionality
5. URL state synchronization

Query Options (services/queries/products.ts):
1. Generate query key from search params
2. Implement queryFn with search params
3. Configure staleTime, cacheTime
4. Handle empty results

[Wait for implementation]

# Stage 3: Validation Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Test search param validation:
- Valid search params (happy path)
- Invalid enum values (fallback to default)
- Invalid number ranges (clamp or fallback)
- Empty arrays (default behavior)
- Missing params (use defaults)
- Malformed URL params (error handling)
- Type safety in component (TypeScript checks)
- URL encoding/decoding for special characters
```

### Workflow 3: Route Loader with TanStack Query

```markdown
# Feature
Implement efficient route loader with TanStack Query integration

# Stage 1: Query Strategy
Act as Software Architect (agents/software-architect.agent.md).
Design query strategy for route loaders:

Data Requirements:
- User profile (user-specific, real-time)
- User posts (paginated, cached for 5 min)
- User followers (cached for 10 min)
- User stats (real-time)

Loader Strategy:
- Which data to prefetch in loader
- Which data to fetch in component
- Cache key structure
- Stale time configuration
- Background refetching rules
- Loader vs component fetching trade-offs

[Wait for strategy]

# Stage 2: Implementation
Act as TanStack Router SPA Specialist (agents/tanstack-router-spa-specialist.agent.md).
Implement loader with TanStack Query:

Route Definition (src/routes/users/$userId/index.tsx):
1. Validate userId param with Zod (UUID)
2. Define router context with queryClient
3. Implement loader:
   - Access context.queryClient
   - Use queryClient.ensureQueryData for critical data
   - Return loader data with proper types
4. Configure loaderDeps if needed
5. Export typed Route

Query Options (services/queries/users.ts):
1. Create getUserQueryOptions(userId):
   - Query key: ['users', userId]
   - Query function with error handling
   - staleTime: 5 minutes
   - Type-safe return data
2. Create getUserPostsQueryOptions(userId):
   - Query key: ['users', userId, 'posts']
   - Pagination support
   - staleTime: 5 minutes
3. Create getUserStatsQueryOptions(userId):
   - Query key: ['users', userId, 'stats']
   - staleTime: 0 (always fresh)
   - Background refetch

Component (src/routes/users/$userId/index.lazy.tsx):
1. Access loader data with Route.useLoaderData()
2. Use useSuspenseQuery for additional data
3. Type-safe data access
4. Error boundary for failed loads
5. Loading states with suspense

[Wait for implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Test loader implementation:
- Unit test loader function
  - Mock queryClient.ensureQueryData
  - Verify correct query options used
  - Test error scenarios
- Component test with loader data
  - Mock Route.useLoaderData()
  - Verify data rendering
  - Test loading states
- Integration test
  - Test loader + component together
  - Verify cache usage
  - Test navigation with cached data
- E2E test
  - Test full user flow
  - Verify network requests
  - Test navigation performance
```

### Workflow 4: Route Tree Generation

```markdown
# Feature
Properly manage route tree generation workflow

# Stage 1: Initial Setup
Act as TanStack Router SPA Specialist (agents/tanstack-router-spa-specialist.agent.md).
Explain route tree generation:

Concepts:
- What is routeTree.gen.ts
- Why it's auto-generated
- When to regenerate
- CLI commands involved
- Git workflow (commit or ignore?)
- Integration with dev server
- Integration with build process

[Wait for explanation]

# Stage 2: Adding New Routes
Continue as TanStack Router SPA Specialist.
Walk through adding new routes:

Scenario: Adding blog routes
- /blog (blog list)
- /blog/$slug (blog post)
- /blog/$slug/edit (edit form, auth required)

Step by step:
1. Create file: src/routes/blog/index.tsx
   - Route definition
   - Search params schema
   - Loader implementation
2. Create file: src/routes/blog/index.lazy.tsx
   - Lazy component
   - Use route hooks
3. Create file: src/routes/blog/$slug/index.tsx
   - Validate slug param
   - Loader with TanStack Query
4. Create file: src/routes/blog/$slug/index.lazy.tsx
   - Blog post component
5. Create file: src/routes/blog/$slug/edit.tsx
   - Auth check in loader
   - Edit form route
6. Run: pnpm generate:routes
7. Verify routeTree.gen.ts updates
8. Test type-safe navigation
9. Test route params type inference
10. Commit all files including routeTree.gen.ts

[Wait for implementation]

# Stage 3: Troubleshooting
Continue as TanStack Router SPA Specialist.
Common issues and solutions:

Issue 1: Route tree not updating
- Solution: Manual regeneration, restart dev server

Issue 2: Type errors after adding routes
- Solution: Regenerate route tree, check exports

Issue 3: Routes not rendering
- Solution: Verify file naming, check route exports

Issue 4: Params/search not type-safe
- Solution: Regenerate route tree, verify schema exports

[Provide troubleshooting guide]
```

## Troubleshooting

### Issue: Route Tree Not Regenerating

**Symptoms:** routeTree.gen.ts not updating after adding new routes

**Solutions:**
1. Always specify "TanStack Router SPA" in context
2. Mention file-based routing explicitly
3. Run `pnpm generate:routes` manually
4. Restart Vite dev server
5. Delete routeTree.gen.ts and regenerate

**Example Fix:**
```
I'm working with TanStack Router's file-based routing system.
I need to regenerate the route tree after adding new routes.

[Paste relevant tanstack-router-spa-specialist.agent.md sections]

New routes added:
- src/routes/settings/index.tsx
- src/routes/settings/profile.lazy.tsx
- src/routes/settings/security.lazy.tsx

Walk me through:
1. Verify file naming is correct
2. Run CLI command to regenerate
3. Verify routeTree.gen.ts updates
4. Check type generation
5. Test navigation to new routes
```

### Issue: Search Params Not Type-Safe

**Symptoms:** TypeScript errors when accessing search params

**Solutions:**
1. Verify Zod schema is properly exported
2. Check validateSearch is defined correctly
3. Use Route.useSearch() (not generic useSearch)
4. Regenerate route tree for type updates
5. Verify schema matches expected types

**Example Fix:**
```
Review search param validation for type safety issues:

Route Definition:
[Paste route code]

Issues:
- useSearch() shows 'any' types
- TypeScript not catching invalid search access
- No autocomplete for search params

As the TanStack Router SPA Specialist, fix the type safety:
1. Verify Zod schema exports types correctly
2. Check validateSearch integration
3. Ensure proper Route.useSearch() usage
4. Regenerate route tree if needed
5. Add type tests to verify inference
```

### Issue: Loader Data Not Available

**Symptoms:** Route component can't access loader data

**Solutions:**
1. Use Route.useLoaderData() (not generic hook)
2. Verify loader returns data correctly
3. Check queryClient in route context
4. Review ensureQueryData implementation
5. Test loader in isolation

**Example Fix:**
```
Loader data not accessible in component:

Route Loader:
[Paste loader code]

Component:
[Paste component code]

Error:
- Route.useLoaderData() returns undefined
- Component crashes on render

As the TanStack Router SPA Specialist, debug:
1. Verify loader returns data
2. Check context.queryClient configuration
3. Verify ensureQueryData usage
4. Test loader independently
5. Check suspense boundary setup
```

### Issue: Route Generation Fails

**Symptoms:** CLI errors when generating routes

**Solutions:**
1. Check for TypeScript errors in route files
2. Verify all routes have proper exports
3. Check file naming conventions
4. Review import paths
5. Clear TypeScript cache

**Example Fix:**
```
Route generation failing with CLI errors:

Error Output:
[Paste error]

Route Files:
- src/routes/products/index.tsx (Route definition)
- src/routes/products/index.lazy.tsx (Lazy component)
- src/routes/products/$productId/index.tsx

As the TanStack Router SPA Specialist, diagnose:
1. Verify proper exports in each file
2. Check file naming conventions
3. Review TypeScript errors
4. Verify schema definitions
5. Test routes individually
```

## Resources

- **Template README:** `./README.md` - TanStack Router SPA setup
- **Repository Patterns:** `../../AGENTS.md` - Cross-template guidelines
- **Agent Definitions:** `./agents/*.agent.md` - Agent capabilities
- **Example Config:** `.claude/project.example.json` - Project configuration
- **TanStack Router Docs:** https://tanstack.com/router
- **TanStack Query Docs:** https://tanstack.com/query

## TanStack Router Advanced Patterns

### Type-Safe Route Parameters

```
Act as TanStack Router SPA Specialist.

Implement type-safe route params:
- Define params in file path ($userId, $postId)
- Validate params with Zod (UUID, number, etc.)
- Type inference for useParams hook
- Handle invalid params (404 vs error)
- Type-safe navigation with params
- Nested route params
```

### Search Params with Complex Validation

```
Act as TanStack Router SPA Specialist.

Implement complex search param validation:
- Nested object params
- Conditional validation (one field depends on another)
- Array params with validation
- Date range params
- Custom transforms and coercion
- Error messages for invalid params
- Type-safe URL state access
```

### Route Loaders with Dependencies

```
Act as TanStack Router SPA Specialist.

Implement loader dependencies:
- Use loaderDeps for params/search dependency
- Loader only re-runs when deps change
- Type-safe dependency tracking
- Multiple dependency sources
- Conditional loader execution
- Loader composition patterns
```

### Route Context

```
Act as TanStack Router SPA Specialist.

Set up route context:
- Define RouterContext interface
- Pass queryClient in context
- Auth state in context
- Type-safe context access in loaders
- Context in nested routes
- Context dependency injection
```

### Lazy Loading Strategy

```
Act as TanStack Router SPA Specialist.

Design lazy loading strategy:
- Which routes should be lazy
- Component vs route lazy loading
- Code splitting boundaries
- Lazy loading with loaders
- Error boundaries for chunk failures
- Loading states during chunk load
- Prefetching lazy routes
```

### Type-Safe Navigation

```
Act as TanStack Router SPA Specialist.

Implement type-safe navigation:
- Link component with typed props
- navigate function with type inference
- Params and search type checking
- Relative vs absolute navigation
- Navigation with state
- Programmatic redirects
- Navigation guards
```

---

**Happy TanStack Router SPA development with Claude agents! 🚀**

For more information, see the [root custom agents guide](../../docs/custom-agents-guide.md).
