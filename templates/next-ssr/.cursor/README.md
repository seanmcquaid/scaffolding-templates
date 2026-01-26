# Cursor IDE Configuration for Next.js SSR Template

This directory contains Cursor IDE configuration for the Next.js SSR scaffolding template with custom sub-agents.

## Quick Start

Cursor automatically discovers agent files in the `/agents/` directory. No additional configuration needed!

### Using Agents in Chat (`Cmd/Ctrl+L`)

```
@nextjs-ssr-specialist how should I implement server actions for form submission?
@requirements-analyst analyze this e-commerce feature request
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
- `@software-architect` - System design, ADRs, component architecture
- `@implementation-engineer` - Feature coding, TypeScript development
- `@ui-ux-designer` - Interface design, accessibility, design systems
- `@quality-analyst` - Unit tests, integration tests, E2E tests
- `@deployment-engineer` - Vercel/Docker deployment, CI/CD pipelines
- `@maintenance-engineer` - Bug fixes, refactoring, dependency updates
- `@production-support-engineer` - Incident response, monitoring, debugging

**Next.js Specialist (1):**
- `@nextjs-ssr-specialist` - App Router, Server Components, Server Actions, RSC, SSR, ISR, caching

## Usage Patterns

### Pattern 1: Server-Side Implementation

```
@nextjs-ssr-specialist

Context: Building a product catalog with server-side filtering
Requirements: Server Components, URL-based filtering, streaming
Current Setup: Next.js 15 App Router with Turbopack
SEO: Must be crawlable and fast (LCP < 2.5s)

How should I implement this following Next.js best practices?
```

### Pattern 2: Server Actions Integration

```
@nextjs-ssr-specialist

I need to implement a form with server-side validation using Server Actions.
Guide me through:
1. Server Action implementation with type safety
2. Progressive enhancement (works without JS)
3. Client-side optimistic updates
4. Error handling and validation
5. Testing server actions
```

### Pattern 3: Feature Development Workflow

```
# Stage 1: Requirements
@requirements-analyst create spec for user authentication
with email/password and OAuth providers

[Review spec output]

# Stage 2: Architecture
@software-architect design authentication architecture
with NextAuth.js, session management, and protected routes

[Review architecture]

# Stage 3: Implementation
@nextjs-ssr-specialist implement authentication
following the architecture with Server Components and middleware

[Review implementation]

# Stage 4: Testing
@quality-analyst create tests for authentication flows
including edge cases and security scenarios
```

## Best Practices

### 1. Prioritize Next.js Specialist

For Next.js-specific questions, always start with `@nextjs-ssr-specialist`:

| Task | Agent | Why |
|------|-------|-----|
| Server Components | `@nextjs-ssr-specialist` | RSC patterns |
| Server Actions | `@nextjs-ssr-specialist` | Form handling expertise |
| Data fetching | `@nextjs-ssr-specialist` | Caching strategies |
| Streaming | `@nextjs-ssr-specialist` | Suspense boundaries |
| Middleware | `@nextjs-ssr-specialist` | Request handling |
| Generic implementation | `@implementation-engineer` | Cross-platform patterns |
| UI components | `@ui-ux-designer` | Design systems |
| Testing | `@quality-analyst` | Test coverage |

### 2. Provide Next.js Context

✅ **Good:**
```
@nextjs-ssr-specialist

Context: Building a blog with dynamic routes
Framework: Next.js 15 App Router
Requirements: 
- SSG for blog posts (ISR every 60s)
- Streaming for comments section
- SEO optimized (metadata, structured data)
- Image optimization with next/image
Current Setup: src/app/blog/[slug]/page.tsx

How should I implement this?
```

❌ **Bad:**
```
@nextjs-ssr-specialist how do I make a blog page?
```

### 3. Server vs Client Components

Always specify component type requirements:

```
@nextjs-ssr-specialist

Implementing a shopping cart. Which parts should be:
- Server Components (for what reasons?)
- Client Components (for what interactions?)

Consider: Data fetching, interactivity, SEO, and performance.
```

### 4. Caching Strategy

For Next.js apps, always consider caching:

```
@nextjs-ssr-specialist

Review this data fetching implementation for caching issues.
Should I use:
- Static rendering (generateStaticParams)
- Dynamic rendering (no-store)
- Incremental Static Regeneration (revalidate)
- On-demand revalidation (revalidatePath)

Data changes: Every 5 minutes
Traffic: 10k requests/hour
[Include code]
```

## Next.js-Specific Workflows

### Workflow 1: New Route Development

```
# In Chat (Cmd+L)
@ui-ux-designer design a product listing page
with server-side filters and client-side interactions

[Review design]

# In Composer (Cmd+K)
@nextjs-ssr-specialist implement the product listing
following the design above. Create:
- src/app/products/page.tsx (Server Component)
- src/app/products/loading.tsx (Loading UI)
- src/components/ProductGrid.tsx (Server Component)
- src/components/ProductFilters.tsx (Client Component)
- Optimize for Core Web Vitals (LCP < 2.5s)
```

### Workflow 2: Server Actions Implementation

```
@nextjs-ssr-specialist

Implement user profile update with Server Actions:
1. Create updateProfile server action in actions/user.ts
2. Form with react-hook-form in components/ProfileForm.tsx
3. Client-side optimistic updates
4. Server-side validation with Zod
5. Error handling and toast notifications
6. Type-safe action invocation
```

### Workflow 3: Production Deployment

```
@deployment-engineer

Set up Next.js deployment pipeline:
1. Configure for Vercel deployment (or Docker)
2. Set up environment variables (dev/preview/prod)
3. Configure next.config.mjs for production
4. Set up GitHub Actions for preview deployments
5. Configure caching and revalidation strategy
6. Set up monitoring (Vercel Analytics, Sentry)
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
      ".": ["nextjs-ssr-specialist"]
    }
  },
  "composer": {
    "defaultAgent": "nextjs-ssr-specialist",
    "showAgentSelector": true
  }
}
```

See `config.example.json` for full configuration options.

## Troubleshooting

### Issue: Agent Suggests Client-Side Patterns for Server Components

**Symptoms:** Agent suggests useState/useEffect when Server Components should be used

**Solutions:**
1. Explicitly mention "Server Component" in your prompt
2. Reference Next.js App Router documentation
3. Ask about server vs client component tradeoffs
4. Use `@nextjs-ssr-specialist` instead of generic agents
5. Provide rendering context (SSR, SSG, ISR requirements)

### Issue: Caching Recommendations Not Next.js-Specific

**Symptoms:** Agent suggests generic caching instead of Next.js patterns

**Solutions:**
1. Mention Next.js caching primitives (fetch cache, revalidate)
2. Specify cache requirements (static, dynamic, ISR)
3. Ask about Next.js-specific caching strategies
4. Include current next.config.mjs configuration
5. Reference Data Cache, Full Route Cache, Router Cache

### Issue: Deployment Issues

**Symptoms:** Agent can't help with Vercel or Docker deployment issues

**Solutions:**
1. Use `@deployment-engineer` for deployment pipeline issues
2. Provide next.config.mjs and package.json
3. Include build logs and error messages
4. Specify deployment target (Vercel/Docker/Node.js)
5. Mention environment-specific requirements

## Next.js-Specific Tips

### 1. App Router File Conventions

```
@nextjs-ssr-specialist

How should I structure routes for this app?
- app/page.tsx (Home)
- app/layout.tsx (Root layout)
- app/products/page.tsx (Product list)
- app/products/[id]/page.tsx (Product details)
- app/products/[id]/loading.tsx (Loading UI)
- app/products/[id]/error.tsx (Error boundary)
- app/api/webhooks/route.ts (API route)

Include metadata, streaming, and error handling patterns.
```

### 2. Server Components Patterns

```
@nextjs-ssr-specialist

What's the best pattern for this component hierarchy?
- ProductList (fetches data)
  - ProductCard (needs hover state)
  - AddToCart (needs onClick)
  
Which should be Server vs Client Components?
How do I pass server data to client components?
```

### 3. Data Fetching Strategy

```
@software-architect

Design data fetching strategy for this e-commerce app:
- Product catalog (10k products, updated hourly)
- User cart (real-time, user-specific)
- Product reviews (updated frequently)
- Static content (rarely changes)

Which Next.js rendering mode for each?
- Static Generation (SSG)
- Incremental Static Regeneration (ISR)
- Server-Side Rendering (SSR)
- Client-Side Rendering (CSR)
```

### 4. Testing Strategy

```
@quality-analyst

Create testing strategy for Next.js app:
1. Unit tests (Vitest + Testing Library)
2. Component tests (Server and Client Components)
3. Integration tests (API routes, Server Actions)
4. E2E tests (Playwright with real browser)
5. Performance testing (Lighthouse CI)
```

## Resources

- **Template README:** `/README.md` - Next.js template-specific setup
- **Repository Patterns:** `../../AGENTS.md` - Repository-wide guidelines  
- **Agent Definitions:** `/agents/*.agent.md` - Individual agent capabilities
- **Example Config:** `.cursor/config.example.json` - Full configuration options
- **Next.js Documentation:** https://nextjs.org/docs

## Integration with Cursor Features

### With Cursor Tab (Auto-complete)

The Next.js specialist agent context influences auto-complete suggestions for App Router patterns.

### With Cursor CMD+K (Quick Edit)

```
Cmd+K → Select code → @quality-analyst add tests for this Server Action
```

### Terminal Integration

```
@deployment-engineer what commands should I run to build for production?
@maintenance-engineer suggest Next.js commands to diagnose why my build fails
```

## Next.js 15 Specific Features

### React Server Components (RSC)

```
@nextjs-ssr-specialist

Explain when to use Server vs Client Components for:
- Data fetching components
- Interactive forms
- Navigation menus
- Product cards with add-to-cart
```

### Server Actions

```
@nextjs-ssr-specialist

Best practices for Server Actions:
- Type safety with TypeScript
- Progressive enhancement
- Optimistic updates
- Error handling
- Revalidation after mutations
```

### Streaming with Suspense

```
@nextjs-ssr-specialist

Implement streaming for this page:
- Hero section (fast)
- Product grid (medium)
- Recommendations (slow)

Use Suspense boundaries for optimal UX.
```

### Partial Prerendering (PPR)

```
@nextjs-ssr-specialist

How can I use Partial Prerendering for:
- Static product details
- Dynamic user-specific cart
- Static reviews with dynamic "helpful" votes
```

---

**Happy Next.js development with Cursor agents! 🚀**

For more information about the agent system, see the [root custom agents guide](../../docs/custom-agents-guide.md).
