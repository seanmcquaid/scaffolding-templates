# Cursor IDE Configuration for TanStack Router SPA Template

This directory contains Cursor IDE configuration for the TanStack Router SPA scaffolding template with custom sub-agents.

## Quick Start

Cursor automatically discovers agent files in the `/agents/` directory. No additional configuration needed!

### Using Agents in Chat (`Cmd/Ctrl+L`)

```
@tanstack-router-spa-specialist how should I implement type-safe search params?
@requirements-analyst analyze this product catalog feature request
@quality-analyst create tests for route loaders with TanStack Query
```

### Using Agents in Composer (`Cmd/Ctrl+K`)

1. Open Composer mode
2. Select agent from dropdown
3. Describe your task - agent guides multi-file implementation

## Available Agents

### Template Agents (9 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `@requirements-analyst` - Feature requests, user stories, acceptance criteria
- `@software-architect` - System design, ADRs, SPA architecture
- `@implementation-engineer` - Feature coding, TypeScript development
- `@ui-ux-designer` - Interface design, accessibility, design systems
- `@quality-analyst` - Unit tests, integration tests, E2E tests
- `@deployment-engineer` - Static site deployment, CI/CD pipelines
- `@maintenance-engineer` - Bug fixes, refactoring, dependency updates
- `@production-support-engineer` - Incident response, monitoring, debugging

**TanStack Router Specialist (1):**
- `@tanstack-router-spa-specialist` - Type-safe routing, search params validation, route generation, file-based routing, loaders, TanStack Query integration

## Usage Patterns

### Pattern 1: Type-Safe Route Implementation

```
@tanstack-router-spa-specialist

Context: Building a product catalog with filters and pagination
Requirements: Type-safe search params with Zod validation
Current Setup: TanStack Router with file-based routing
Features Needed:
- Search params: filter, sort, page (all validated)
- Route loader with TanStack Query
- Lazy loaded route for code splitting
- Type-safe route params and search params

How should I implement this following TanStack Router best practices?
```

### Pattern 2: Route Tree Generation and File Structure

```
@tanstack-router-spa-specialist

I need to add new routes to my TanStack Router app.
Guide me through:
1. File naming conventions for routes
2. Route tree generation workflow (CLI commands)
3. Lazy vs non-lazy route files
4. Route nesting and layouts
5. Type safety across route definitions
6. Testing route configurations
```

### Pattern 3: Feature Development Workflow

```
# Stage 1: Requirements
@requirements-analyst create spec for user dashboard
with real-time data and URL-based filtering

[Review spec output]

# Stage 2: Architecture
@software-architect design dashboard architecture
with type-safe routes, search params, and TanStack Query

[Review architecture]

# Stage 3: Implementation
@tanstack-router-spa-specialist implement dashboard
following the architecture with type-safe routing and loaders

[Review implementation]

# Stage 4: Testing
@quality-analyst create tests for dashboard routes
including search param validation and loader data
```

## Best Practices

### 1. Prioritize TanStack Router Specialist

For TanStack Router and type-safe routing questions, always start with `@tanstack-router-spa-specialist`:

| Task | Agent | Why |
|------|-------|-----|
| Type-safe routes | `@tanstack-router-spa-specialist` | Route type system expertise |
| Search params validation | `@tanstack-router-spa-specialist` | Zod + router integration |
| Route loaders | `@tanstack-router-spa-specialist` | Data loading patterns |
| Route generation | `@tanstack-router-spa-specialist` | CLI and file conventions |
| File-based routing | `@tanstack-router-spa-specialist` | Route tree structure |
| TanStack Query integration | `@tanstack-router-spa-specialist` | Loader + Query patterns |
| Generic implementation | `@implementation-engineer` | Cross-platform patterns |
| UI components | `@ui-ux-designer` | Design systems |
| Testing | `@quality-analyst` | Test coverage |

### 2. Provide TanStack Router Context

✅ **Good:**
```
@tanstack-router-spa-specialist

Context: Building a user profile page with editable form
Framework: TanStack Router SPA with file-based routing
Requirements: 
- Route: /users/$userId
- Type-safe userId param (validated as UUID)
- Search params for tab selection (profile, settings, activity)
- Route loader for user data
- TanStack Query for caching (5-minute stale time)
- Lazy loaded route with code splitting
- Optimistic updates on form submission
Current Setup: routeTree.gen.ts generated, main.tsx configured
Performance: First load < 1s, navigation < 100ms

How should I implement this?
```

❌ **Bad:**
```
@tanstack-router-spa-specialist how do I make a profile page?
```

### 3. Route Generation Workflow

Always follow proper route generation:

```
@tanstack-router-spa-specialist

Creating new routes for product management.
What's the correct workflow?

Planned Routes:
- /products (list with search params)
- /products/$productId (details)
- /products/$productId/edit (edit form)
- /products/new (create form)

Include:
- File naming conventions (*.tsx vs *.lazy.tsx)
- CLI commands for route generation
- Route tree regeneration process
- Type-safe route links and navigation
- Search params schema validation
```

### 4. Type-Safe Search Params

For routes with URL state, emphasize type safety:

```
@tanstack-router-spa-specialist

Implement type-safe search params for dashboard filters.
Search params needed:
- status: enum ['active', 'inactive', 'all']
- dateRange: { from: Date, to: Date }
- search: string (optional)
- page: positive integer (default: 1)

Should I use:
- Zod schema for validation
- fallbackSearch for defaults
- Search param type inference
- URL state synchronization
- Invalid param handling

[Include current route definition]
```

## TanStack Router SPA Workflows

### Workflow 1: New Route Development

```
# In Chat (Cmd+L)
@ui-ux-designer design a product listing page
with client-side filters and type-safe search params

[Review design]

# In Composer (Cmd+K)
@tanstack-router-spa-specialist implement the product listing
route following the design above. Create:
- src/routes/products/index.tsx (route definition with loader)
- src/routes/products/index.lazy.tsx (lazy loaded component)
- src/services/queries/products.ts (TanStack Query options)
- Zod schema for search params (filter, sort, page)
- Run route generation CLI
- Type-safe navigation examples
```

### Workflow 2: Search Params Implementation

```
@tanstack-router-spa-specialist

Implement advanced search params for analytics dashboard:
1. Create Zod schema for complex search params
2. Define route with validateSearch
3. Implement loaderDeps to depend on search params
4. Create route loader with TanStack Query
5. Use Route.useSearch() for type-safe access
6. Implement URL state management
7. Handle invalid search params gracefully
8. Test search param validation
```

### Workflow 3: Route Tree Generation

```
@tanstack-router-spa-specialist

I've added new route files. Walk me through regeneration:
New files:
- src/routes/settings/index.lazy.tsx
- src/routes/settings/profile.lazy.tsx
- src/routes/settings/security.lazy.tsx

Steps needed:
1. Verify file naming conventions
2. Run TanStack Router CLI
3. Verify routeTree.gen.ts updates
4. Check type generation
5. Test route navigation
6. Update tests for new routes
```

### Workflow 4: Production Deployment

```
@deployment-engineer

Set up TanStack Router SPA deployment pipeline:
1. Configure build for static hosting (Vercel/Netlify/S3+CloudFront)
2. Set up environment variables
3. Optimize route code splitting
4. Configure route tree generation in CI
5. Set up GitHub Actions for automated builds
6. Configure caching headers for static assets
7. Set up bundle size monitoring
```

## Configuration

### Agent Settings (Optional)

Create `.cursor/config.json` to customize agent behavior:

```json
{
  "agents": {
    "autoDiscover": true,
    "directories": [
      "./agents"
    ],
    "priorityByDirectory": {
      ".": ["tanstack-router-spa-specialist"]
    }
  },
  "composer": {
    "defaultAgent": "tanstack-router-spa-specialist",
    "showAgentSelector": true
  }
}
```

See `config.example.json` for full configuration options.

## Troubleshooting

### Issue: Route Tree Not Regenerating

**Symptoms:** routeTree.gen.ts not updating after adding new routes

**Solutions:**
1. Run `pnpm generate:routes` manually
2. Verify file naming matches conventions (*.tsx, *.lazy.tsx)
3. Check for TypeScript errors in route files
4. Restart Vite dev server
5. Delete routeTree.gen.ts and regenerate

### Issue: Search Params Type Errors

**Symptoms:** TypeScript errors when accessing search params

**Solutions:**
1. Verify Zod schema matches validateSearch
2. Check search param defaults in schema
3. Use Route.useSearch() (not useSearch from hook)
4. Ensure route is properly exported
5. Regenerate route tree for type updates

### Issue: Loader Data Not Available

**Symptoms:** Route component can't access loader data

**Solutions:**
1. Use Route.useLoaderData() (not generic hook)
2. Verify loader returns data correctly
3. Check TanStack Query integration (ensureQueryData)
4. Review context.queryClient configuration
5. Test loader in isolation

### Issue: Type-Safe Navigation Not Working

**Symptoms:** Navigation links don't show type errors for invalid params

**Solutions:**
1. Import route definitions: `import { Route } from './routes/$routeId'`
2. Use typed navigation: `navigate({ to: Route.to, params: { ... } })`
3. Regenerate route tree for latest types
4. Check tsconfig.json includes route files
5. Verify no `any` types in route definitions

## TanStack Router SPA Tips

### 1. File-Based Routing Patterns

```
@tanstack-router-spa-specialist

How should I structure routes for this SPA?
Route structure:
- / (Home)
- /products (Product list with filters)
- /products/$productId (Product details)
- /products/$productId/edit (Edit form)
- /dashboard/* (Nested dashboard routes)

Include:
- File naming conventions
- Lazy loading strategy
- Route nesting patterns
- Layout routes
- 404 and error routes
- Type-safe navigation
```

### 2. Loader Patterns with TanStack Query

```
@tanstack-router-spa-specialist

Best practices for route loaders with TanStack Query:
- How to use queryClient.ensureQueryData
- When to use loaderDeps
- Type safety for loader return data
- Error handling in loaders
- Suspense integration
- Prefetching strategies
- Cache invalidation on navigation
```

### 3. Search Params Validation

```
@tanstack-router-spa-specialist

Implement robust search param validation:
- Zod schemas for complex params
- Nested object params
- Array params (multiple filters)
- Date params (serialization)
- Enum params with fallbacks
- Optional vs required params
- Invalid param handling
- URL state synchronization
```

### 4. Route Context and Type Safety

```
@tanstack-router-spa-specialist

Set up route context properly:
- Define RouterContext interface
- Pass queryClient in context
- Type-safe context access in loaders
- Context in nested routes
- Authentication state in context
- Dependency injection patterns
```

### 5. Testing Strategy

```
@quality-analyst

Create testing strategy for TanStack Router SPA:
1. Unit tests (Vitest + React Testing Library)
   - Search param validation (Zod schemas)
   - Route loaders with mocked TanStack Query
   - Component with route hooks
   - Utility functions
2. Integration tests with MSW
   - Route navigation flows
   - Loader data loading
   - Search param updates
   - Error scenarios
3. E2E tests (Playwright)
   - Full user journeys
   - Navigation testing
   - URL state persistence
   - Cross-browser validation
```

### 6. Code Splitting Strategy

```
@software-architect

Design code splitting strategy for TanStack Router:
- Which routes should be lazy loaded
- Component-level splitting (heavy components)
- Shared chunks (common dependencies)
- Vendor splitting (TanStack libraries)
- Route prefetching strategy

Optimize for:
- Fast initial load (< 1s)
- Smooth navigation (< 100ms)
- Type safety maintained across splits
```

## Resources

- **Template README:** `/README.md` - TanStack Router SPA setup
- **Repository Patterns:** `../../AGENTS.md` - Repository-wide guidelines  
- **Agent Definitions:** `/agents/*.agent.md` - Individual agent capabilities
- **Example Config:** `.cursor/config.example.json` - Full configuration options
- **TanStack Router Docs:** https://tanstack.com/router
- **TanStack Query Docs:** https://tanstack.com/query

## Integration with Cursor Features

### With Cursor Tab (Auto-complete)

The TanStack Router specialist agent context influences auto-complete suggestions for routing patterns.

### With Cursor CMD+K (Quick Edit)

```
Cmd+K → Select code → @quality-analyst add tests for this route loader
```

### Terminal Integration

```
@deployment-engineer what commands should I run to optimize the route build?
@maintenance-engineer suggest commands to analyze route bundle sizes
```

## TanStack Router Specific Features

### Type-Safe Route Parameters

```
@tanstack-router-spa-specialist

Implement type-safe route params:
- Define params in route path
- Validate params with Zod
- Type inference for params
- Access params with Route.useParams()
- Type-safe navigation with params
- Handle invalid params
```

### Search Params with Zod

```
@tanstack-router-spa-specialist

Advanced search param patterns:
- Complex nested object validation
- Transform/coerce param types
- Custom validation rules
- Fallback values and defaults
- URL encoding/decoding
- Shareable filtered URLs
```

### Route Loaders

```
@tanstack-router-spa-specialist

Implement efficient route loaders:
- Integrate with queryClient.ensureQueryData
- Type-safe loader data return
- Loader dependencies (params, search)
- Error handling and retry logic
- Loading states with suspense
- Loader composition patterns
```

### Route Tree Generation

```
@tanstack-router-spa-specialist

Workflow for route generation:
- File naming conventions to follow
- CLI commands: pnpm generate:routes
- When to regenerate route tree
- Verify type generation
- Integration with build process
- Git workflow with routeTree.gen.ts
```

### TanStack Query Integration

```
@tanstack-router-spa-specialist

Best practices for TanStack Query in loaders:
- queryOptions pattern for reusable queries
- ensureQueryData vs fetchQuery
- Query keys structure (hierarchical)
- Prefetching in loaders
- Cache invalidation strategies
- Optimistic updates with router
- Background refetching configuration
```

### Type-Safe Navigation

```
@tanstack-router-spa-specialist

Implement type-safe navigation:
- Use Link component with typed props
- navigate function with type safety
- Route.to for type-safe paths
- Params and search type inference
- Programmatic navigation patterns
- Navigation guards and redirects
```

---

**Happy TanStack Router SPA development with Cursor agents! 🚀**

For more information about the agent system, see the [root custom agents guide](../../docs/custom-agents-guide.md).
