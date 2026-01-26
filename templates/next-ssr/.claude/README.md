# Claude Configuration for Next.js SSR Template

This directory contains Claude configuration for the Next.js SSR scaffolding template with custom sub-agents.

## Quick Start

Claude understands the sub-agent pattern through explicit file references and context management.

### In Claude Desktop/Projects

1. **Add Agent Files to Project Knowledge:**
   - Add `/agents/*.agent.md` to project knowledge
   - Add `/README.md` for template context
   - Add `../../AGENTS.md` for repository patterns

2. **Reference Agents in Conversations:**
   ```
   Please act as the Next.js SSR Specialist agent defined in 
   /agents/nextjs-ssr-specialist.agent.md
   
   Task: Implement server-side data fetching with streaming for this product page
   ```

### In Cursor with Claude

Use `@` references to include agent context:

```
@agents/nextjs-ssr-specialist.agent.md

How should I implement Server Actions for this user profile form?
```

## Available Agents

### Template Agents (9 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `requirements-analyst` - Feature requests, user stories, web app requirements
- `software-architect` - SSR architecture, caching strategy, component patterns
- `implementation-engineer` - React/Next.js coding, TypeScript development
- `ui-ux-designer` - Web UI design, responsive design, accessibility
- `quality-analyst` - Unit tests, integration tests, E2E tests (Playwright)
- `deployment-engineer` - Vercel/Docker deployment, CI/CD pipelines
- `maintenance-engineer` - Bug fixes, performance optimization, refactoring
- `production-support-engineer` - Error tracking, monitoring, production debugging

**Next.js Specialist (1):**
- `nextjs-ssr-specialist` - App Router, Server Components, Server Actions, caching, SSR/SSG/ISR

## Usage Patterns

### Pattern 1: Server-Side Feature Implementation

**Direct reference with SSR context:**
```
Based on the Next.js SSR Specialist agent defined in 
agents/nextjs-ssr-specialist.agent.md, implement a 
product catalog with the following requirements:

Context:
- Framework: Next.js 15 with App Router
- Rendering: ISR with 60-second revalidation
- Data: REST API with 10k products
- Performance: LCP < 2.5s, FCP < 1.8s
- SEO: Fully crawlable, structured data

Implementation Requirements:
1. Server Component for product grid
2. Streaming for product details
3. Client Component for filters
4. URL-based filter state
5. Optimized images with next/image
6. Metadata API for SEO
```

### Pattern 2: Server Actions Workflow

**Multi-stage implementation:**

```
Stage 1: Architecture
-------------------------
Act as the Software Architect (agents/software-architect.agent.md).
Design the architecture for a form submission system using
Server Actions with validation and error handling.

[Wait for and review architecture]

Stage 2: Implementation
-------------------------
Now act as the Next.js SSR Specialist 
(agents/nextjs-ssr-specialist.agent.md).
Implement the form with Server Actions:
1. Create server action in app/actions/contact.ts
2. Form component with progressive enhancement
3. Client-side optimistic updates
4. Zod validation on server
5. Type-safe action invocation
6. Error handling and user feedback

[Wait for and review implementation]

Stage 3: Testing
-------------------------
Finally, act as the Quality Analyst (agents/quality-analyst.agent.md).
Create test strategy including:
- Unit tests for server action logic
- Integration tests with mocked fetch
- E2E tests with Playwright
- Error scenario handling
```

### Pattern 3: Performance Optimization

**SSR performance workflow:**

```
Context Setup:
-------------------
I'm optimizing the Next.js SSR app. Please reference:
- agents/nextjs-ssr-specialist.agent.md
- ../../AGENTS.md (Next.js performance patterns)

Now act as the Next.js SSR Specialist.

Task 1: Analyze current performance
[Provide Lighthouse scores, Core Web Vitals, bundle analysis]

Task 2: Identify bottlenecks
Focus on: Server response time, bundle size, image optimization

Task 3: Implement optimizations
Use: Static generation, streaming, code splitting, image optimization

Task 4: Verify improvements
Target: LCP < 2.5s, FID < 100ms, CLS < 0.1
```

## Claude Projects Setup

### Project Configuration

Create a Claude Project specifically for Next.js SSR development:

**Project Name:** Next.js SSR Development

**Project Instructions:**
```
This is a Next.js 15 SSR application template with custom sub-agents
for specialized web development tasks. When I reference an agent file,
adopt that agent's persona completely.

Next.js Context:
- Framework: Next.js 15 with App Router
- Rendering: SSR, SSG, ISR, Streaming
- State Management: TanStack Query, Server Actions, URL state
- Styling: Tailwind CSS, shadcn/ui
- Testing: Vitest, Testing Library, Playwright
- Deployment: Vercel (or Docker)

Key Documents:
- ../../AGENTS.md - Repository patterns
- ./README.md - Next.js template specifics
- /agents/*.agent.md - Agent definitions

When acting as an agent:
1. Consider server vs client component tradeoffs
2. Optimize for Core Web Vitals (LCP, FID, CLS)
3. Follow Next.js App Router best practices
4. Implement proper caching strategies
5. Ensure SEO optimization (metadata, structured data)
```

**Project Knowledge (Add these files):**

**Always Include:**
- `../../AGENTS.md` - Repository patterns
- `./README.md` - Next.js template overview
- `./agents/nextjs-ssr-specialist.agent.md`

**SDLC Agents (add based on need):**
- `./agents/requirements-analyst.agent.md`
- `./agents/software-architect.agent.md`
- `./agents/implementation-engineer.agent.md`
- `./agents/quality-analyst.agent.md`
- `./agents/deployment-engineer.agent.md`

**Next.js-Specific Docs:**
- `./next.config.mjs` - Next.js configuration
- `./src/app/layout.tsx` - Root layout
- `./docs/**/*.md` - SSR-specific documentation

## Best Practices

### 1. Server-First Context

✅ **Good - Server-side context:**
```
Act as the Next.js SSR Specialist (agents/nextjs-ssr-specialist.agent.md).

Context:
- Feature: User dashboard with real-time data
- Components: Mix of server and client components
- Data Source: PostgreSQL via Prisma
- Performance Target: LCP < 2.5s, TTI < 3.5s
- Caching: ISR with 30-second revalidation
- Auth: NextAuth.js with session middleware

How should I architect this for optimal performance and UX?
```

❌ **Bad - Vague request:**
```
How do I make a dashboard?
```

### 2. Rendering Strategy

✅ **Good - Rendering-aware:**
```
As the Next.js SSR Specialist, implement a blog:

Static Generation (SSG):
- Blog post list (generateStaticParams)
- Individual posts (ISR every 60s)
- About page (fully static)

Server-Side Rendering (SSR):
- User-specific dashboard
- Search results page

Client-Side Rendering (CSR):
- Comments section (after hydration)
- Like button interactions

Explain the rationale for each choice.
```

### 3. Performance Context

✅ **Good - Performance-focused:**
```
Act as the Next.js SSR Specialist.

Current Performance Issue:
- LCP: 4.2s (target < 2.5s)
- Large bundle: 350KB gzipped
- Slow server response: 1.8s
- No streaming, blocking data fetches

Lighthouse Report:
- Performance: 62/100
- Images not optimized
- No code splitting
- Render-blocking resources

Optimize for Core Web Vitals on mid-range devices.
```

## Next.js-Specific Workflows

### Workflow 1: New App Router Page

```markdown
# Stage 1: UI Design
Act as UI/UX Designer (agents/ui-ux-designer.agent.md).
Design a responsive product details page:
- Hero image (optimized for LCP)
- Product info (above the fold)
- Reviews section (below the fold, can stream)
- Related products (lazy loaded)
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA)

[Wait, review design]

# Stage 2: Implementation
Act as Next.js SSR Specialist (agents/nextjs-ssr-specialist.agent.md).
Implement the product details page:
- src/app/products/[id]/page.tsx (Server Component)
- src/app/products/[id]/loading.tsx (Skeleton)
- src/app/products/[id]/error.tsx (Error boundary)
- Streaming with Suspense boundaries
- Metadata API for dynamic SEO
- Structured data (JSON-LD)
- next/image optimization

[Wait, review implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Create test suite:
- Unit tests for data fetching
- Component tests (server components)
- E2E tests with Playwright
- Performance tests (Lighthouse CI)
- Accessibility tests (axe-core)
```

### Workflow 2: Server Actions Feature

```markdown
# Context
Implementing a contact form with Server Actions

# Stage 1: Architecture
Act as Software Architect (agents/software-architect.agent.md).
Design form submission architecture:

Server Actions:
- Validation strategy (Zod schemas)
- Error handling patterns
- Rate limiting approach
- Database transaction handling
- Email notification integration

Progressive Enhancement:
- Works without JavaScript
- Optimistic updates with JS
- Loading states and feedback

[Wait for architecture]

# Stage 2: Implementation
Act as Next.js SSR Specialist (agents/nextjs-ssr-specialist.agent.md).
Implement contact form:

Server Action (app/actions/contact.ts):
- Type-safe with TypeScript
- Zod validation
- Database insertion
- Error handling
- Revalidation strategy

Client Component (components/ContactForm.tsx):
- React Hook Form integration
- Progressive enhancement
- Optimistic updates
- Error display
- Success feedback

[Wait for implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Test Server Actions:
- Unit tests for action logic
- Validation error scenarios
- Network error handling
- E2E tests (with and without JS)
- Rate limiting verification
```

### Workflow 3: Production Deployment

```markdown
# Feature
Deploy Next.js app to Vercel with proper configuration

# Stage 1: Build Configuration
Act as Deployment Engineer (agents/deployment-engineer.agent.md).
Configure for production deployment:

Vercel Configuration:
- Environment variables (dev/preview/prod)
- Build settings and optimizations
- Serverless function configuration
- Edge middleware setup
- Custom domains and SSL

Performance:
- Bundle analysis and optimization
- Image optimization settings
- Caching headers
- Compression configuration

[Wait for build config]

# Stage 2: Monitoring Setup
Continue as Deployment Engineer.
Set up production monitoring:

Observability:
- Vercel Analytics (Core Web Vitals)
- Error tracking (Sentry)
- Application logs
- Performance monitoring
- Uptime monitoring

Alerts:
- Build failures
- Performance degradation
- Error rate spikes
- Core Web Vitals thresholds

[Wait for monitoring setup]

# Stage 3: CI/CD Pipeline
Set up GitHub Actions workflow:
- Preview deployments on PRs
- Production deployment on main
- Lighthouse CI checks
- E2E tests before deploy
- Automatic rollback on failure
```

### Workflow 4: Caching Strategy

```markdown
# Feature
Implement optimal caching strategy for e-commerce site

# Stage 1: Architecture
Act as Software Architect (agents/software-architect.agent.md).
Design caching architecture:

Data Requirements:
- Product catalog (10k products, updated hourly)
- User cart (real-time, user-specific)
- Product reviews (updated frequently)
- Category pages (relatively static)
- Search results (varies by query)

Caching Strategies:
- Static Generation (SSG)
- Incremental Static Regeneration (ISR)
- Server-Side Rendering (SSR)
- Client-side caching (SWR patterns)
- API route caching

[Wait for architecture]

# Stage 2: Implementation
Act as Next.js SSR Specialist (agents/nextjs-ssr-specialist.agent.md).
Implement caching strategy:

Static Pages:
- Home page (ISR, revalidate: 3600)
- Category pages (SSG with generateStaticParams)
- Product pages (ISR, revalidate: 60)

Dynamic Pages:
- User cart (SSR, no caching)
- Search results (SSR with short cache)
- User dashboard (SSR, user-specific)

Cache Configuration:
- Next.js fetch cache options
- revalidatePath/revalidateTag usage
- Cache-Control headers
- API route caching

[Wait for implementation]

# Stage 3: Validation
Act as Quality Analyst (agents/quality-analyst.agent.md).
Validate caching behavior:
- Test static generation
- Verify ISR revalidation
- Check cache headers
- Measure cache hit rates
- Performance impact analysis
```

## Troubleshooting

### Issue: Agent Suggests Client-Side Patterns

**Symptoms:** Agent suggests client patterns when server patterns should be used

**Solutions:**
1. Always specify "Server Component" or "Client Component" explicitly
2. Reference Next.js App Router conventions
3. Explicitly state rendering requirements (SSR/SSG/ISR)
4. Provide performance constraints (LCP, TTI)
5. Mention SEO requirements

**Example Fix:**
```
I need you to act as the Next.js SSR Specialist. This component
should be a SERVER COMPONENT for optimal performance and SEO.

[Paste relevant nextjs-ssr-specialist.agent.md sections]

Requirements:
- Must render on server (no useState/useEffect)
- Fetch data directly in component
- Optimize for LCP < 2.5s
- SEO: crawlable and indexable

Now implement this server-first feature...
```

### Issue: Missing Server/Client Boundary

**Symptoms:** "use client" directive missing or in wrong places

**Solutions:**
1. Ask for explicit Server vs Client Component breakdown
2. Request component tree with rendering strategy
3. Specify which interactions require client-side JS
4. Ask about data flow from server to client components
5. Request minimal client component boundaries

**Example Fix:**
```
As the Next.js SSR Specialist, analyze this component tree:

ProductPage (Server Component)
├─ ProductHeader (Server Component)
├─ ProductGallery (Client Component - image carousel)
├─ ProductInfo (Server Component)
│  └─ AddToCartButton (Client Component - onClick)
└─ Reviews (Server Component)
   └─ ReviewForm (Client Component - form state)

Implement with proper "use client" directives and
explain server/client data flow.
```

### Issue: Caching Not Optimized

**Symptoms:** Over-fetching, stale data, or poor cache hit rates

**Solutions:**
1. Provide data freshness requirements
2. Specify update frequency and patterns
3. Request Next.js-specific caching strategies
4. Ask about revalidation approaches
5. Include traffic patterns and scale requirements

**Example Fix:**
```
Review this caching implementation:

[Paste code]

Requirements:
- Product data updates every 5 minutes
- 10k requests/hour per product
- User sees fresh data within 5 minutes
- Optimize for CDN caching
- Minimize API calls

As the Next.js SSR Specialist, recommend optimal
caching strategy (SSG/ISR/SSR/CSR) and implementation.
```

## Resources

- **Template README:** `./README.md` - Next.js template setup
- **Repository Patterns:** `../../AGENTS.md` - Cross-template guidelines
- **Agent Definitions:** `./agents/*.agent.md` - Agent capabilities
- **Example Config:** `.claude/project.example.json` - Project configuration
- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev

## Next.js 15 Advanced Features

### React Server Components (RSC)

```
Act as Next.js SSR Specialist.

Explain RSC architecture for:
- When to use Server Components (default)
- When to use Client Components ("use client")
- Data fetching in Server Components
- Passing data to Client Components
- Composition patterns
```

### Server Actions

```
Act as Next.js SSR Specialist.

Server Actions best practices:
- Type safety with TypeScript
- Progressive enhancement patterns
- Optimistic updates with useOptimistic
- Error handling with try/catch
- Revalidation after mutations
- File uploads handling
```

### Streaming with Suspense

```
Act as Next.js SSR Specialist.

Implement streaming strategy:
- Fast: Hero section (cached data)
- Medium: Product list (API fetch)
- Slow: Recommendations (ML model)

Use Suspense boundaries for progressive loading.
Show: loading.tsx patterns and skeleton states.
```

### Partial Prerendering (PPR)

```
Act as Next.js SSR Specialist.

How can I use Partial Prerendering:
- Static shell (header, footer, sidebar)
- Dynamic content (user cart, personalization)
- Balance between static and dynamic
- Performance implications
```

### Metadata API

```
Act as Next.js SSR Specialist.

Implement SEO with Metadata API:
- Dynamic metadata per page
- Open Graph tags
- Twitter Cards
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt configuration
```

---

**Happy Next.js development with Claude agents! 🚀**

For more information, see the [root custom agents guide](../../docs/custom-agents-guide.md).
