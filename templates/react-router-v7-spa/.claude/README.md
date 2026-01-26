# Claude Configuration for React Router V7 SPA Template

This directory contains Claude configuration for the React Router V7 SPA scaffolding template with custom sub-agents.

## Quick Start

Claude understands the sub-agent pattern through explicit file references and context management.

### In Claude Desktop/Projects

1. **Add Agent Files to Project Knowledge:**
   - Add `/agents/*.agent.md` to project knowledge
   - Add `/README.md` for template context
   - Add `../../AGENTS.md` for repository patterns

2. **Reference Agents in Conversations:**
   ```
   Please act as the React Router SPA Specialist agent defined in 
   /agents/react-router-spa-specialist.agent.md
   
   Task: Implement lazy route loading with TanStack Query integration for this product catalog
   ```

### In Cursor with Claude

Use `@` references to include agent context:

```
@agents/react-router-spa-specialist.agent.md

How should I implement client loaders with prefetching for this route?
```

## Available Agents

### Template Agents (9 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `requirements-analyst` - Feature requests, user stories, SPA requirements
- `software-architect` - SPA architecture, code splitting, caching strategy
- `implementation-engineer` - React/TypeScript coding, component development
- `ui-ux-designer` - Web UI design, responsive design, accessibility
- `quality-analyst` - Unit tests, integration tests, E2E tests (Playwright)
- `deployment-engineer` - Static site deployment, CDN configuration, CI/CD
- `maintenance-engineer` - Bug fixes, performance optimization, refactoring
- `production-support-engineer` - Error tracking, monitoring, production debugging

**React Router V7 Specialist (1):**
- `react-router-spa-specialist` - Client loaders, lazy routes, code splitting, prefetching, TanStack Query

## Usage Patterns

### Pattern 1: Client-Side Route Implementation

**Direct reference with SPA context:**
```
Based on the React Router SPA Specialist agent defined in 
agents/react-router-spa-specialist.agent.md, implement a 
product listing route with the following requirements:

Context:
- Framework: React Router V7 in SPA mode
- Data Loading: Client loader with TanStack Query
- Performance: Lazy loaded route, < 1s initial load
- Caching: 5-minute stale time, background refetch
- Navigation: Prefetch on hover for instant navigation

Implementation Requirements:
1. Lazy route in routes.ts configuration
2. Client loader with TanStack Query integration
3. Loading skeleton during data fetch
4. Error boundary for failed loads
5. Prefetching strategy (hover, viewport)
6. Type-safe loader data
```

### Pattern 2: Code Splitting Strategy

**Multi-stage optimization:**

```
Stage 1: Architecture
-------------------------
Act as the Software Architect (agents/software-architect.agent.md).
Design code splitting strategy for an e-commerce SPA:
- Routes that should be in initial bundle
- Routes that should be lazy loaded
- Component-level code splitting
- Shared chunk strategy
- Bundle size targets

[Wait for and review architecture]

Stage 2: Implementation
-------------------------
Now act as the React Router SPA Specialist 
(agents/react-router-spa-specialist.agent.md).
Implement the code splitting strategy:
1. Configure routes.ts with lazy imports
2. Set up dynamic imports for heavy components
3. Implement route prefetching
4. Configure Vite build for optimal chunks
5. Add bundle size monitoring
6. Verify chunk loading in DevTools

[Wait for and review implementation]

Stage 3: Validation
-------------------------
Finally, act as the Quality Analyst (agents/quality-analyst.agent.md).
Validate code splitting:
- Initial bundle size < 200KB
- Route chunks < 100KB each
- Lazy load timing < 500ms
- No duplicate dependencies
- Prefetching works correctly
```

### Pattern 3: Data Loading Optimization

**Client-side caching workflow:**

```
Context Setup:
-------------------
I'm optimizing data loading in this React Router V7 SPA. Please reference:
- agents/react-router-spa-specialist.agent.md
- ../../AGENTS.md (TanStack Query patterns)

Now act as the React Router SPA Specialist.

Task 1: Analyze current data loading
[Provide network waterfall, cache hit rates, stale data issues]

Task 2: Design caching strategy
- TanStack Query configuration (staleTime, cacheTime)
- Query key structure for cache invalidation
- Prefetching strategy (hover, mount, viewport)
- Background refetching rules

Task 3: Implement optimizations
- Client loader with TanStack Query
- Query invalidation on mutations
- Optimistic updates for instant UX
- Error handling and retry logic

Task 4: Verify improvements
Target: < 3 total requests per page, < 100ms navigation
```

## Claude Projects Setup

### Project Configuration

Create a Claude Project specifically for React Router V7 SPA development:

**Project Name:** React Router V7 SPA Development

**Project Instructions:**
```
This is a React Router V7 single-page application template with custom 
sub-agents for specialized SPA development tasks. When I reference an 
agent file, adopt that agent's persona completely.

React Router V7 SPA Context:
- Framework: React Router V7 in SPA mode (client-side only)
- React: React 19 with concurrent features
- Data Loading: Client loaders + TanStack Query
- State Management: TanStack Query, React Hook Form, URL state
- Build Tool: Vite with optimized code splitting
- Styling: Tailwind CSS, shadcn/ui
- Testing: Vitest, Testing Library, Playwright
- Deployment: Static hosting (Vercel, Netlify, S3+CloudFront)

Key Documents:
- ../../AGENTS.md - Repository patterns
- ./README.md - React Router V7 SPA specifics
- /agents/*.agent.md - Agent definitions

When acting as an agent:
1. Focus on client-side patterns (no SSR)
2. Optimize bundle size and code splitting
3. Leverage TanStack Query for caching
4. Implement efficient prefetching
5. Prioritize navigation performance
```

**Project Knowledge (Add these files):**

**Always Include:**
- `../../AGENTS.md` - Repository patterns
- `./README.md` - React Router V7 SPA overview
- `./agents/react-router-spa-specialist.agent.md`

**SDLC Agents (add based on need):**
- `./agents/requirements-analyst.agent.md`
- `./agents/software-architect.agent.md`
- `./agents/implementation-engineer.agent.md`
- `./agents/quality-analyst.agent.md`
- `./agents/deployment-engineer.agent.md`

**SPA-Specific Docs:**
- `./app/routes.ts` - Route configuration
- `./vite.config.ts` - Build configuration
- `./docs/**/*.md` - SPA-specific documentation

## Best Practices

### 1. Client-Side Context

✅ **Good - SPA-specific context:**
```
Act as the React Router SPA Specialist (agents/react-router-spa-specialist.agent.md).

Context:
- Feature: Product catalog with filters and search
- Framework: React Router V7 SPA (no SSR)
- Data: REST API with 10k products
- Performance Target: < 1s initial load, < 100ms navigation
- Caching: TanStack Query with 5-min stale time
- Code Splitting: Lazy load route, < 100KB chunk
- Prefetching: On hover and viewport

How should I implement this optimally?
```

❌ **Bad - Vague request:**
```
How do I make a product catalog?
```

### 2. Bundle Optimization

✅ **Good - Performance-focused:**
```
As the React Router SPA Specialist, optimize this route:

Current Performance:
- Initial bundle: 450KB (target < 200KB)
- Route chunk: 180KB (target < 100KB)
- Navigation: 800ms (target < 100ms)
- Duplicate dependencies in chunks

Bundle Analysis:
- Three chunks loading react-query
- Heavy chart library in main bundle
- Images not lazy loaded
- No route prefetching

Optimize for fast initial load and instant navigation.
```

### 3. Caching Strategy

✅ **Good - Cache-aware:**
```
Act as the React Router SPA Specialist.

Data Loading Issues:
- Products refetch on every navigation
- Stale data shown for 2 seconds
- 20+ requests per page
- No prefetching of linked pages

Requirements:
- Show cached data immediately
- Background refetch if stale (> 5min)
- Prefetch on hover for instant navigation
- Optimistic updates on mutations
- Max 3 requests per page load

Design TanStack Query strategy for this SPA.
```

## React Router V7 SPA Workflows

### Workflow 1: New Route Implementation

```markdown
# Stage 1: UI Design
Act as UI/UX Designer (agents/ui-ux-designer.agent.md).
Design a responsive product details page:
- Hero image (optimized, lazy loaded below fold)
- Product info (immediate render)
- Reviews section (lazy loaded component)
- Related products (prefetched on scroll)
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA)

[Wait, review design]

# Stage 2: Implementation
Act as React Router SPA Specialist (agents/react-router-spa-specialist.agent.md).
Implement the product details route:
- app/routes/products.$id.tsx (lazy loaded)
- Client loader with TanStack Query
- Loading skeleton during data fetch
- Error boundary for 404/errors
- Prefetch on link hover
- Type-safe route params
- Lazy load heavy components
- Image optimization

[Wait, review implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Create test suite:
- Unit tests for client loader
- Component tests with mocked data
- Navigation flow tests
- Error scenario tests
- Performance tests (bundle size, load time)
- Accessibility tests (axe-core)
```

### Workflow 2: Code Splitting Optimization

```markdown
# Context
Large SPA with performance issues due to bundle size

# Stage 1: Analysis
Act as Software Architect (agents/software-architect.agent.md).
Analyze current bundle structure:

Current State:
- Main bundle: 650KB (too large)
- 15 routes, all in main bundle
- No code splitting
- Heavy libraries (charts, PDF viewer) always loaded

Design Strategy:
- Which routes in initial bundle
- Which routes lazy loaded
- Component-level splitting
- Shared chunk strategy
- Library splitting (charts, PDF)

[Wait for architecture]

# Stage 2: Implementation
Act as React Router SPA Specialist (agents/react-router-spa-specialist.agent.md).
Implement code splitting:

routes.ts Configuration:
- Essential routes (home, login) in main bundle
- Feature routes (dashboard, reports) lazy loaded
- Heavy components (charts) dynamically imported
- Configure Vite rollupOptions for chunks

Route Prefetching:
- Hover prefetch for navigation links
- Viewport prefetch for visible links
- Intent-based prefetching

[Wait for implementation]

# Stage 3: Validation
Act as Deployment Engineer (agents/deployment-engineer.agent.md).
Validate bundle optimization:
- Run build and analyze output
- Verify chunk sizes (main < 200KB, routes < 100KB)
- Test lazy loading in production mode
- Measure navigation performance
- Set up bundle size monitoring in CI
```

### Workflow 3: TanStack Query Integration

```markdown
# Feature
Implement efficient data loading with TanStack Query

# Stage 1: Architecture
Act as Software Architect (agents/software-architect.agent.md).
Design data loading architecture:

Data Requirements:
- Product catalog (10k products, updated hourly)
- User data (real-time, user-specific)
- Shopping cart (optimistic updates)
- Search results (debounced, cached)

Caching Strategy:
- Query key structure (hierarchical)
- staleTime and cacheTime per query type
- Background refetching rules
- Cache invalidation on mutations
- Prefetching strategy

[Wait for architecture]

# Stage 2: Implementation
Act as React Router SPA Specialist (agents/react-router-spa-specialist.agent.md).
Implement TanStack Query setup:

Query Client Configuration:
- Default staleTime, cacheTime, retry
- Query keys constants
- Custom query hooks

Client Loaders:
- Integrate loaders with TanStack Query
- Prefetch in loader for instant render
- Error handling and retry logic
- Loading states with suspense

Mutations:
- Optimistic updates for instant UX
- Cache invalidation patterns
- Error rollback handling

[Wait for implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Test data loading:
- Unit tests for query hooks
- Cache behavior tests
- Prefetching tests
- Optimistic update tests
- Error and retry scenarios
- Network condition testing (slow, offline)
```

### Workflow 4: Production Deployment

```markdown
# Feature
Deploy React Router V7 SPA to production

# Stage 1: Build Configuration
Act as Deployment Engineer (agents/deployment-engineer.agent.md).
Configure production build:

Vite Configuration:
- Optimize build output
- Configure code splitting
- Set up environment variables
- Source maps for debugging
- Asset optimization (images, fonts)

Static Hosting:
- Choose platform (Vercel/Netlify/S3+CloudFront)
- Configure routes (SPA fallback to index.html)
- Set up custom domain and SSL
- Configure caching headers
- CDN optimization

[Wait for build config]

# Stage 2: CI/CD Pipeline
Continue as Deployment Engineer.
Set up GitHub Actions workflow:

Build Pipeline:
- Automated builds on push
- Run linting and tests
- Bundle size checks
- Playwright E2E tests
- Deploy previews for PRs
- Production deploy on main

Performance Monitoring:
- Lighthouse CI for Core Web Vitals
- Bundle size tracking
- Error tracking (Sentry)
- Analytics integration

[Wait for pipeline setup]

# Stage 3: Monitoring
Set up production monitoring:
- Real User Monitoring (RUM)
- Error tracking and alerting
- Performance metrics (LCP, FID, CLS)
- Bundle size monitoring
- Uptime monitoring
```

## Troubleshooting

### Issue: Agent Suggests SSR Patterns

**Symptoms:** Agent suggests server-side patterns instead of client-side SPA patterns

**Solutions:**
1. Always specify "SPA" and "client-side only" in context
2. Reference React Router V7 SPA mode (not SSR mode)
3. Explicitly state no server-side rendering
4. Mention client loaders (not server loaders)
5. Provide SPA-specific constraints

**Example Fix:**
```
I need you to act as the React Router SPA Specialist. This is a 
SINGLE-PAGE APPLICATION (SPA) with NO server-side rendering.

[Paste relevant react-router-spa-specialist.agent.md sections]

Requirements:
- Client-side only (no SSR)
- Client loaders (not server loaders)
- Static hosting (Vercel/Netlify/S3)
- All rendering in browser
- TanStack Query for data fetching

Now implement this client-side feature...
```

### Issue: Bundle Size Too Large

**Symptoms:** Build output shows large bundle sizes

**Solutions:**
1. Review code splitting strategy with specialist
2. Analyze bundle with `pnpm build && pnpm preview`
3. Use dynamic imports for heavy components
4. Check for duplicate dependencies
5. Review lazy route configuration in routes.ts

**Example Fix:**
```
Review this bundle output for optimization:

[Paste build output]

Issues:
- Main bundle: 650KB (target < 200KB)
- Chart library in main bundle (should be lazy)
- Multiple chunks loading react-query
- Images not optimized

As the React Router SPA Specialist, recommend code splitting
strategy and implement optimizations.
```

### Issue: Data Loading Not Optimized

**Symptoms:** Too many requests, stale data, slow navigation

**Solutions:**
1. Review TanStack Query configuration
2. Implement proper query key structure
3. Configure staleTime and cacheTime
4. Add prefetching for navigation
5. Review cache invalidation strategy

**Example Fix:**
```
Analyze this data loading implementation:

[Paste code]

Performance Issues:
- 20+ requests per page
- Data refetches on every navigation
- No prefetching on hover
- Stale data shown for 2+ seconds

Requirements:
- Max 3 requests per page
- Instant navigation (use cache)
- Prefetch on hover
- Background refetch if stale

As the React Router SPA Specialist, optimize TanStack Query
configuration for this SPA.
```

## Resources

- **Template README:** `./README.md` - React Router V7 SPA setup
- **Repository Patterns:** `../../AGENTS.md` - Cross-template guidelines
- **Agent Definitions:** `./agents/*.agent.md` - Agent capabilities
- **Example Config:** `.claude/project.example.json` - Project configuration
- **React Router Docs:** https://reactrouter.com
- **TanStack Query Docs:** https://tanstack.com/query

## React Router V7 SPA Advanced Patterns

### Client Loaders with TanStack Query

```
Act as React Router SPA Specialist.

Implement client loader with TanStack Query:
- Loader function that uses queryClient
- Prefetch data in loader for instant render
- Suspense boundary for loading state
- Error boundary for failed loads
- Type-safe loader data
- Cache invalidation strategy
```

### Lazy Routes with Prefetching

```
Act as React Router SPA Specialist.

Configure lazy routes with optimal loading:
- Dynamic imports in routes.ts
- Loading components during chunk load
- Error boundaries for chunk failures
- Prefetch on hover for instant navigation
- Prefetch on viewport for likely navigation
- Network-aware prefetching (respect save-data)
```

### Code Splitting Strategy

```
Act as React Router SPA Specialist.

Design code splitting boundaries:
- Routes in initial bundle (< 200KB total)
- Routes that should lazy load
- Component-level splitting (charts, modals)
- Library splitting (vendor chunks)
- Shared component chunks
- Optimization for HTTP/2 multiplexing
```

### Optimistic Updates

```
Act as React Router SPA Specialist.

Implement optimistic updates with TanStack Query:
- Mutation with optimistic update
- Update cache before server response
- Rollback on error
- Revalidate on success
- Loading states and feedback
- Error handling and retry
```

### URL State Management

```
Act as React Router SPA Specialist.

Implement URL-based state for filters:
- Search params for filter state
- Type-safe URL state parsing
- Sync URL with component state
- Handle invalid/missing params
- Browser back/forward support
- Shareable URLs
```

---

**Happy React Router V7 SPA development with Claude agents! ⚡**

For more information, see the [root custom agents guide](../../docs/custom-agents-guide.md).
