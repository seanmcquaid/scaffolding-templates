# Cursor IDE Configuration for React Router V7 SSR Template

This directory contains Cursor IDE configuration for the React Router V7 SSR scaffolding template with custom sub-agents.

## Quick Start

Cursor automatically discovers agent files in the `/agents/` directory. No additional configuration needed!

### Using Agents in Chat (`Cmd/Ctrl+L`)

```
@react-router-ssr-specialist how should I implement server loaders for this route?
@requirements-analyst analyze this real-time dashboard feature request
@quality-analyst create tests for SSR components with server data
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
- `@software-architect` - SSR architecture, data flow design, component patterns
- `@implementation-engineer` - Feature coding, TypeScript development
- `@ui-ux-designer` - Interface design, accessibility, design systems
- `@quality-analyst` - Unit tests, integration tests, E2E tests
- `@deployment-engineer` - Node.js deployment, Docker, CI/CD pipelines
- `@maintenance-engineer` - Bug fixes, refactoring, dependency updates
- `@production-support-engineer` - Incident response, monitoring, debugging

**React Router V7 SSR Specialist (1):**
- `@react-router-ssr-specialist` - Server loaders, server actions, SSR, hydration, streaming, SEO optimization

## Usage Patterns

### Pattern 1: Server-Side Route Implementation

```
@react-router-ssr-specialist

Context: Building a product catalog with server-side data fetching
Requirements: SSR with loaders, meta tags for SEO, streaming
Current Setup: React Router V7 SSR with routes.ts configuration
Performance: LCP < 2.5s, proper hydration, crawlable content

How should I implement this following React Router V7 SSR best practices?
```

### Pattern 2: Server Actions Integration

```
@react-router-ssr-specialist

I need to implement a form with server-side processing using server actions.
Guide me through:
1. Server action implementation with type safety
2. Progressive enhancement (works without JS)
3. Optimistic updates on client
4. Server-side validation with Zod
5. Error handling and user feedback
6. Testing server actions with SSR
```

### Pattern 3: Feature Development Workflow

```
# Stage 1: Requirements
@requirements-analyst create spec for user authentication
with email/password and session management

[Review spec output]

# Stage 2: Architecture
@software-architect design authentication architecture
with server-side session, protected routes, and middleware

[Review architecture]

# Stage 3: Implementation
@react-router-ssr-specialist implement authentication
following the architecture with server loaders and actions

[Review implementation]

# Stage 4: Testing
@quality-analyst create tests for authentication flows
including SSR hydration, session handling, and edge cases
```

## Best Practices

### 1. Prioritize React Router SSR Specialist

For React Router V7 SSR-specific questions, always start with `@react-router-ssr-specialist`:

| Task | Agent | Why |
|------|-------|-----|
| Server loaders | `@react-router-ssr-specialist` | Data fetching patterns |
| Server actions | `@react-router-ssr-specialist` | Mutation expertise |
| SSR hydration | `@react-router-ssr-specialist` | Hydration strategies |
| Meta/SEO | `@react-router-ssr-specialist` | SEO optimization |
| Streaming | `@react-router-ssr-specialist` | Progressive rendering |
| Defer pattern | `@react-router-ssr-specialist` | Async data patterns |
| Generic implementation | `@implementation-engineer` | Cross-platform patterns |
| UI components | `@ui-ux-designer` | Design systems |
| Testing | `@quality-analyst` | Test coverage |

### 2. Provide SSR Context

✅ **Good:**
```
@react-router-ssr-specialist

Context: Building a blog post page with comments
Framework: React Router V7 SSR mode
Requirements: 
- Server loader for post data (fast)
- Defer pattern for comments (slower API)
- Meta tags for SEO (title, description, OG tags)
- Streaming for progressive rendering
- TanStack Query hydration on client
Current Setup: app/routes/posts.$.tsx route file
Performance: LCP < 2.5s, crawlable by search engines

How should I implement this?
```

❌ **Bad:**
```
@react-router-ssr-specialist how do I make a blog page?
```

### 3. Server vs Client Boundaries

Always specify where logic should run:

```
@react-router-ssr-specialist

Implementing a shopping cart. Which parts should be:
- Server-rendered (for SEO, performance?)
- Client-rendered (for interactivity?)
- Server loaders (for data fetching?)
- Server actions (for mutations?)

Consider: Data fetching, hydration, SEO, and UX.
```

### 4. Hydration Strategy

For SSR apps, hydration is critical:

```
@react-router-ssr-specialist

Review this implementation for hydration issues.
Current problems:
- Hydration mismatches in console
- Flash of incorrect content
- Interactive elements not working after hydration

Requirements:
- Smooth hydration without flicker
- TanStack Query state preserved
- No hydration warnings
- Interactive immediately after hydration

[Include code]
```

## React Router V7 SSR Workflows

### Workflow 1: New SSR Route Development

```
# In Chat (Cmd+L)
@ui-ux-designer design a product details page
with hero image, specs, reviews section, and related products

[Review design]

# In Composer (Cmd+K)
@react-router-ssr-specialist implement the product page
following the design above. Create:
- app/routes/products.$.tsx (route file)
- Server loader for product data
- Meta function for SEO tags
- Defer pattern for reviews (slower)
- Client components for interactive parts
- Optimize for LCP < 2.5s and SEO
```

### Workflow 2: Server Actions Implementation

```
@react-router-ssr-specialist

Implement contact form with server action:
1. Create server action in app/routes/contact.tsx
2. Form with progressive enhancement
3. Server-side validation with Zod
4. Error handling and user feedback
5. Success state with redirect
6. Client-side optimistic updates
7. Type-safe action invocation
8. Test with and without JavaScript
```

### Workflow 3: Production Deployment

```
@deployment-engineer

Set up React Router V7 SSR deployment pipeline:
1. Configure for Node.js deployment (or Docker)
2. Set up environment variables (dev/staging/prod)
3. Configure react-router.config.ts for production
4. Set up GitHub Actions for automated builds
5. Configure server caching strategies
6. Set up monitoring (error tracking, performance)
7. Health checks and graceful shutdown
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
      ".": ["react-router-ssr-specialist"]
    }
  },
  "composer": {
    "defaultAgent": "react-router-ssr-specialist",
    "showAgentSelector": true
  }
}
```

See `config.example.json` for full configuration options.

## Troubleshooting

### Issue: Agent Suggests Client-Side Patterns for SSR

**Symptoms:** Agent suggests useState/useEffect when server loaders should be used

**Solutions:**
1. Explicitly mention "SSR" and "server-side rendering" in your prompt
2. Reference React Router V7 SSR mode (not SPA mode)
3. Ask about server vs client rendering tradeoffs
4. Use `@react-router-ssr-specialist` instead of generic agents
5. Provide SSR context (loaders, actions, hydration)

### Issue: Hydration Mismatches

**Symptoms:** Console warnings about hydration, content flicker

**Solutions:**
1. Review server and client rendering consistency
2. Check for random data or timestamps in SSR
3. Ensure TanStack Query hydration is correct
4. Use suppressHydrationWarning sparingly
5. Ask specialist about hydration patterns

### Issue: Server Loader Not Working

**Symptoms:** Data not available in component, loader errors

**Solutions:**
1. Verify loader function is exported from route file
2. Check loader return value matches expected type
3. Review route configuration in routes.ts
4. Ensure proper error handling in loader
5. Check server-side network requests

## React Router V7 SSR Tips

### 1. File-Based Routing Conventions

```
@react-router-ssr-specialist

How should I structure routes for this SSR app?
- app/routes/index.tsx (Home)
- app/routes/$.tsx (Catch-all 404)
- app/routes/products.tsx (Product list layout)
- app/routes/products.$.tsx (Product details)
- app/routes/products._index.tsx (Product list index)
- app/routes/api.webhooks.tsx (API route)

Include:
- Server loaders for data
- Meta functions for SEO
- Error boundaries
- Loading states
- Server actions for forms
```

### 2. Server Loader Patterns

```
@react-router-ssr-specialist

Best practices for server loaders:
- Type-safe loader data
- Error handling in loaders
- Parallel data fetching
- Deferred data for slow requests
- TanStack Query integration
- Cache strategies
- Request headers and cookies
```

### 3. Server Actions Strategy

```
@react-router-ssr-specialist

Implement server actions for this app:
- Form submissions with validation
- Database mutations
- External API calls
- File uploads
- Error handling and feedback
- Redirect after success
- Type safety with TypeScript
- Progressive enhancement
```

### 4. Streaming and Defer

```
@react-router-ssr-specialist

Implement streaming for optimal UX:
- Fast: Product info (immediate SSR)
- Medium: Similar products (defer)
- Slow: Reviews from API (defer)

Use defer() for slow data and Suspense boundaries.
Show loading states for deferred data.
```

### 5. Testing Strategy

```
@quality-analyst

Create testing strategy for React Router V7 SSR app:
1. Unit tests (Vitest + Testing Library)
   - Server loaders with mocked data
   - Server actions with validation
   - Component rendering
2. Integration tests with MSW
   - SSR rendering with data
   - Hydration without mismatches
   - Form submissions with actions
3. E2E tests (Playwright)
   - Full page SSR load
   - SEO and meta tags
   - Progressive enhancement
   - Performance testing
```

## Resources

- **Template README:** `/README.md` - React Router V7 SSR setup
- **Repository Patterns:** `../../AGENTS.md` - Repository-wide guidelines  
- **Agent Definitions:** `/agents/*.agent.md` - Individual agent capabilities
- **Example Config:** `.cursor/config.example.json` - Full configuration options
- **React Router Docs:** https://reactrouter.com
- **SSR Guide:** https://reactrouter.com/how-to/server-rendering

## Integration with Cursor Features

### With Cursor Tab (Auto-complete)

The React Router SSR specialist agent context influences auto-complete suggestions for SSR patterns.

### With Cursor CMD+K (Quick Edit)

```
Cmd+K → Select code → @quality-analyst add tests for this server loader
```

### Terminal Integration

```
@deployment-engineer what commands should I run to build for production?
@maintenance-engineer suggest commands to diagnose SSR issues
```

## React Router V7 SSR Specific Features

### Server Loaders

```
@react-router-ssr-specialist

Implement efficient server loader:
- Type-safe loader function
- Parallel data fetching
- Error handling and retry
- Response headers (caching)
- Request context (cookies, headers)
- Database queries optimization
```

### Server Actions

```
@react-router-ssr-specialist

Best practices for server actions:
- Type safety with TypeScript
- Zod validation on server
- Progressive enhancement
- Optimistic updates with useOptimistic
- Error handling and display
- Redirect after success
- File upload handling
```

### Meta Functions for SEO

```
@react-router-ssr-specialist

Implement SEO optimization:
- Dynamic meta tags per route
- Open Graph tags
- Twitter Cards
- Canonical URLs
- Structured data (JSON-LD)
- Sitemap generation
```

### Defer for Progressive Loading

```
@react-router-ssr-specialist

Use defer() for optimal UX:
- Render shell immediately
- Stream slow data progressively
- Suspense boundaries for loading states
- Error boundaries for failed streams
- SEO considerations (crawlable content)
```

### Hydration with TanStack Query

```
@react-router-ssr-specialist

Implement smooth hydration:
- Dehydrate query state on server
- Hydrate query client on client
- Preserve fetched data across boundary
- No hydration mismatches
- Immediate interactivity after hydration
```

### Entry Points

```
@react-router-ssr-specialist

Configure SSR entry points:
- entry.server.tsx (server rendering logic)
- entry.client.tsx (client hydration logic)
- Handle streaming and errors
- Add performance monitoring
- Configure logging
```

---

**Happy React Router V7 SSR development with Cursor agents! 🚀**

For more information about the agent system, see the [root custom agents guide](../../docs/custom-agents-guide.md).
