# Cursor IDE Configuration for React Router V7 SPA Template

This directory contains Cursor IDE configuration for the React Router V7 SPA scaffolding template with custom sub-agents.

## Quick Start

Cursor automatically discovers agent files in the `/agents/` directory. No additional configuration needed!

### Using Agents in Chat (`Cmd/Ctrl+L`)

```
@react-router-spa-specialist how should I implement lazy route loading?
@requirements-analyst analyze this dashboard feature request
@quality-analyst create tests for the ProductCard component
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

**React Router V7 Specialist (1):**
- `@react-router-spa-specialist` - Client loaders, lazy routes, code splitting, prefetching, TanStack Query integration

## Usage Patterns

### Pattern 1: Client-Side Route Implementation

```
@react-router-spa-specialist

Context: Building a product catalog with client-side filtering
Requirements: Lazy loaded route, TanStack Query for data, URL state
Current Setup: React Router V7 SPA with routes.ts configuration
Performance: Route should code-split and prefetch on hover

How should I implement this following React Router V7 best practices?
```

### Pattern 2: Data Loading with Client Loaders

```
@react-router-spa-specialist

I need to implement a route with client-side data loading.
Guide me through:
1. Client loader implementation with type safety
2. TanStack Query integration for caching
3. Loading states and error boundaries
4. Prefetching strategy (on hover, on mount)
5. Testing client loaders
```

### Pattern 3: Feature Development Workflow

```
# Stage 1: Requirements
@requirements-analyst create spec for user dashboard
with real-time data and client-side caching

[Review spec output]

# Stage 2: Architecture
@software-architect design dashboard architecture
with code splitting, lazy routes, and TanStack Query

[Review architecture]

# Stage 3: Implementation
@react-router-spa-specialist implement dashboard
following the architecture with lazy routes and client loaders

[Review implementation]

# Stage 4: Testing
@quality-analyst create tests for dashboard components
including data loading states and error scenarios
```

## Best Practices

### 1. Prioritize React Router SPA Specialist

For React Router V7 and SPA-specific questions, always start with `@react-router-spa-specialist`:

| Task | Agent | Why |
|------|-------|-----|
| Client loaders | `@react-router-spa-specialist` | Data loading patterns |
| Lazy routes | `@react-router-spa-specialist` | Code splitting expertise |
| Route prefetching | `@react-router-spa-specialist` | Performance optimization |
| TanStack Query integration | `@react-router-spa-specialist` | Caching strategies |
| URL state management | `@react-router-spa-specialist` | Client-side routing |
| Generic implementation | `@implementation-engineer` | Cross-platform patterns |
| UI components | `@ui-ux-designer` | Design systems |
| Testing | `@quality-analyst` | Test coverage |

### 2. Provide SPA Context

✅ **Good:**
```
@react-router-spa-specialist

Context: Building a user profile page with editable form
Framework: React Router V7 SPA mode
Requirements: 
- Lazy loaded route with code splitting
- Client loader for user data
- TanStack Query for caching (5-minute stale time)
- Optimistic updates on form submission
- Prefetch on navigation hover
Current Setup: routes.ts with file-based routing
Performance: First load < 1s, navigation < 100ms

How should I implement this?
```

❌ **Bad:**
```
@react-router-spa-specialist how do I make a profile page?
```

### 3. Code Splitting Strategy

Always consider bundle optimization:

```
@react-router-spa-specialist

Implementing a large feature with multiple components.
How should I structure lazy loading?

Components:
- Dashboard (main route)
- AnalyticsChart (heavy, only shown conditionally)
- DataTable (heavy, below fold)
- SettingsPanel (modal, rarely accessed)

What should be in the main bundle vs lazy loaded?
```

### 4. Client-Side Caching

For SPAs, caching is critical:

```
@react-router-spa-specialist

Review this TanStack Query setup for caching issues.
Data updates: Every 30 seconds from WebSocket
User navigation: Frequent back/forward
Requirement: Fresh data but minimal re-fetches

Should I use:
- staleTime and cacheTime configuration
- Query invalidation on WebSocket updates
- Background refetching
- Optimistic updates

[Include code]
```

## React Router V7 SPA Workflows

### Workflow 1: New Route Development

```
# In Chat (Cmd+L)
@ui-ux-designer design a product listing page
with client-side filters and infinite scroll

[Review design]

# In Composer (Cmd+K)
@react-router-spa-specialist implement the product listing
route following the design above. Create:
- app/routes/products.tsx (lazy loaded)
- app/components/app/ProductGrid.tsx
- app/components/app/ProductFilters.tsx
- app/hooks/useProducts.ts (TanStack Query)
- Configure route in routes.ts with prefetching
```

### Workflow 2: Client Loader Implementation

```
@react-router-spa-specialist

Implement user profile route with client loader:
1. Create app/routes/profile.tsx with lazy export
2. Implement client loader with TanStack Query
3. Type-safe loader data with TypeScript
4. Loading skeleton during data fetch
5. Error boundary for failed loads
6. Prefetch strategy (on link hover)
7. Cache strategy (5-minute stale time)
```

### Workflow 3: Production Deployment

```
@deployment-engineer

Set up React Router V7 SPA deployment pipeline:
1. Configure build for static hosting (Vercel/Netlify/S3+CloudFront)
2. Set up environment variables
3. Configure routes.ts for optimal code splitting
4. Set up GitHub Actions for automated builds
5. Configure caching headers for static assets
6. Set up bundle size monitoring
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
      ".": ["react-router-spa-specialist"]
    }
  },
  "composer": {
    "defaultAgent": "react-router-spa-specialist",
    "showAgentSelector": true
  }
}
```

See `config.example.json` for full configuration options.

## Troubleshooting

### Issue: Agent Suggests SSR Patterns for SPA

**Symptoms:** Agent suggests server-side patterns instead of client-side SPA patterns

**Solutions:**
1. Explicitly mention "SPA" and "client-side only" in your prompt
2. Reference React Router V7 SPA mode (not SSR)
3. Specify no server-side rendering requirements
4. Use `@react-router-spa-specialist` instead of generic agents
5. Mention client loaders (not server loaders)

### Issue: Bundle Size Growing Too Large

**Symptoms:** Build output shows large bundle sizes

**Solutions:**
1. Review code splitting strategy with specialist
2. Use dynamic imports for heavy components
3. Analyze bundle with `pnpm build && pnpm analyze`
4. Check for duplicate dependencies
5. Review lazy route configuration in routes.ts

### Issue: Data Fetching Not Optimized

**Symptoms:** Too many network requests or stale data

**Solutions:**
1. Review TanStack Query configuration (staleTime, cacheTime)
2. Implement proper query key structure
3. Use prefetching strategically (hover, mount)
4. Consider query deduplication
5. Review cache invalidation strategy

## React Router V7 SPA Tips

### 1. File-Based Routing Patterns

```
@react-router-spa-specialist

How should I structure routes for this SPA?
routes.ts configuration:
- / (Home)
- /products (Product list with filters)
- /products/:id (Product details)
- /dashboard (Lazy loaded, auth required)
- /settings/* (Nested settings routes)

Include:
- Lazy loading configuration
- Client loader patterns
- Prefetching strategies
- Code splitting boundaries
```

### 2. Client Loader Patterns

```
@react-router-spa-specialist

Best practices for client loaders with TanStack Query:
- How to integrate loaders with React Query
- Type safety for loader data
- Error handling in loaders
- Loading states and suspense
- Prefetching on navigation
- Cache invalidation strategies
```

### 3. Code Splitting Strategy

```
@software-architect

Design code splitting strategy for this SPA:
- Initial bundle (essential routes)
- Lazy loaded routes (feature-based)
- Component-level splitting (heavy components)
- Shared chunks (common dependencies)
- Vendor splitting (third-party libraries)

Optimize for:
- Fast initial load (< 1s)
- Smooth navigation (< 100ms)
- Minimal duplicate code
```

### 4. Prefetching Strategy

```
@react-router-spa-specialist

Implement prefetching for better navigation UX:
- Hover prefetching (preload route on link hover)
- Viewport prefetching (preload visible links)
- Eager prefetching (preload likely next routes)
- Data prefetching (preload route data)

Consider:
- Network conditions (don't prefetch on slow connections)
- Battery level (respect save-data preference)
- Cache strategy (don't prefetch cached routes)
```

### 5. Testing Strategy

```
@quality-analyst

Create testing strategy for React Router V7 SPA:
1. Unit tests (Vitest + React Testing Library)
   - Client loaders with mocked TanStack Query
   - Component interactions
   - Hooks and utilities
2. Integration tests with MSW
   - Route navigation flows
   - Data loading and caching
   - Error scenarios
3. E2E tests (Playwright)
   - User journey testing
   - Performance testing
   - Cross-browser validation
```

## Resources

- **Template README:** `/README.md` - React Router V7 SPA setup
- **Repository Patterns:** `../../AGENTS.md` - Repository-wide guidelines  
- **Agent Definitions:** `/agents/*.agent.md` - Individual agent capabilities
- **Example Config:** `.cursor/config.example.json` - Full configuration options
- **React Router Docs:** https://reactrouter.com
- **TanStack Query Docs:** https://tanstack.com/query

## Integration with Cursor Features

### With Cursor Tab (Auto-complete)

The React Router specialist agent context influences auto-complete suggestions for SPA patterns.

### With Cursor CMD+K (Quick Edit)

```
Cmd+K → Select code → @quality-analyst add tests for this client loader
```

### Terminal Integration

```
@deployment-engineer what commands should I run to optimize the build?
@maintenance-engineer suggest commands to analyze bundle size issues
```

## React Router V7 SPA Specific Features

### Client Loaders

```
@react-router-spa-specialist

Implement efficient client loader:
- Integrate with TanStack Query for caching
- Type-safe data return
- Error handling and retry logic
- Loading states with suspense
- Prefetch on route hover
```

### Lazy Routes

```
@react-router-spa-specialist

Configure lazy routes in routes.ts:
- Dynamic imports for code splitting
- Loading components during chunk load
- Error boundaries for failed loads
- Route prefetching configuration
- Bundle optimization strategy
```

### Link Prefetching

```
@react-router-spa-specialist

Optimize navigation with prefetching:
- Hover prefetch for instant navigation
- Viewport prefetch for visible links
- Intent-based prefetching
- Network-aware prefetching
- Cache-aware prefetching
```

### TanStack Query Integration

```
@react-router-spa-specialist

Best practices for TanStack Query in SPA:
- Query keys structure (hierarchical)
- Client loader integration pattern
- Prefetching with queryClient
- Optimistic updates for mutations
- Cache invalidation strategies
- Background refetching configuration
```

---

**Happy React Router V7 SPA development with Cursor agents! ⚡**

For more information about the agent system, see the [root custom agents guide](../../docs/custom-agents-guide.md).
