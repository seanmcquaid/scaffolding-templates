# Claude Configuration for React Router V7 SSR Template

This directory contains Claude configuration for the React Router V7 SSR scaffolding template with custom sub-agents.

## Quick Start

Claude understands the sub-agent pattern through explicit file references and context management.

### In Claude Desktop/Projects

1. **Add Agent Files to Project Knowledge:**
   - Add `/agents/*.agent.md` to project knowledge
   - Add `/README.md` for template context
   - Add `../../AGENTS.md` for repository patterns

2. **Reference Agents in Conversations:**
   ```
   Please act as the React Router SSR Specialist agent defined in 
   /agents/react-router-ssr-specialist.agent.md
   
   Task: Implement server-side data fetching with streaming for this product page
   ```

### In Cursor with Claude

Use `@` references to include agent context:

```
@agents/react-router-ssr-specialist.agent.md

How should I implement server actions for this form submission?
```

## Available Agents

### Template Agents (9 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `requirements-analyst` - Feature requests, user stories, SSR requirements
- `software-architect` - SSR architecture, data flow, component patterns
- `implementation-engineer` - React/TypeScript coding, SSR development
- `ui-ux-designer` - Web UI design, responsive design, accessibility
- `quality-analyst` - Unit tests, integration tests, E2E tests with SSR
- `deployment-engineer` - Node.js/Docker deployment, CI/CD pipelines
- `maintenance-engineer` - Bug fixes, performance optimization, refactoring
- `production-support-engineer` - Error tracking, monitoring, production debugging

**React Router V7 SSR Specialist (1):**
- `react-router-ssr-specialist` - Server loaders, server actions, SSR, hydration, streaming, SEO

## Usage Patterns

### Pattern 1: Server-Side Route Implementation

**Direct reference with SSR context:**
```
Based on the React Router SSR Specialist agent defined in 
agents/react-router-ssr-specialist.agent.md, implement a 
product catalog with the following requirements:

Context:
- Framework: React Router V7 with SSR
- Rendering: Server-side with streaming
- Data: PostgreSQL via Prisma
- Performance: LCP < 2.5s, TTI < 3.5s
- SEO: Fully crawlable, structured data
- Hydration: TanStack Query state preservation

Implementation Requirements:
1. Server loader for product data
2. Meta function for SEO tags
3. Defer pattern for slow data (reviews)
4. Client components for filters
5. Server action for search
6. Streaming with Suspense boundaries
7. Optimized hydration strategy
```

### Pattern 2: Server Actions Workflow

**Multi-stage implementation:**

```
Stage 1: Architecture
-------------------------
Act as the Software Architect (agents/software-architect.agent.md).
Design the architecture for a user profile update system using
server actions with validation and database transactions.

Requirements:
- Server-side form processing
- Zod validation
- Database updates
- File uploads (avatar)
- Optimistic updates on client
- Error handling

[Wait for and review architecture]

Stage 2: Implementation
-------------------------
Now act as the React Router SSR Specialist 
(agents/react-router-ssr-specialist.agent.md).
Implement the profile update feature:
1. Create route file app/routes/profile.tsx
2. Server loader for current user data
3. Server action for profile updates
4. Progressive enhancement (works without JS)
5. Client-side optimistic updates
6. Zod validation on server
7. Error handling and user feedback
8. Redirect after success

[Wait for and review implementation]

Stage 3: Testing
-------------------------
Finally, act as the Quality Analyst (agents/quality-analyst.agent.md).
Create test strategy including:
- Unit tests for server action logic
- Integration tests with mocked database
- SSR hydration tests
- E2E tests with and without JavaScript
- Error scenario handling
```

### Pattern 3: Performance Optimization

**SSR performance workflow:**

```
Context Setup:
-------------------
I'm optimizing the React Router V7 SSR app. Please reference:
- agents/react-router-ssr-specialist.agent.md
- ../../AGENTS.md (SSR performance patterns)

Now act as the React Router SSR Specialist.

Task 1: Analyze current performance
[Provide server response times, TTFB, LCP, hydration time]

Task 2: Identify bottlenecks
Focus on: Server rendering time, data fetching, hydration, streaming

Task 3: Implement optimizations
Use: Defer for slow data, streaming, parallel fetching, caching

Task 4: Verify improvements
Target: TTFB < 600ms, LCP < 2.5s, smooth hydration
```

## Claude Projects Setup

### Project Configuration

Create a Claude Project specifically for React Router V7 SSR development:

**Project Name:** React Router V7 SSR Development

**Project Instructions:**
```
This is a React Router V7 SSR application template with custom sub-agents
for specialized web development tasks. When I reference an agent file,
adopt that agent's persona completely.

React Router V7 SSR Context:
- Framework: React Router V7 with server-side rendering
- React: React 19 with concurrent features
- Rendering: SSR with streaming and hydration
- Data Loading: Server loaders + TanStack Query
- Mutations: Server actions with progressive enhancement
- State Management: TanStack Query, React Hook Form, URL state
- Build Tool: Vite with SSR support
- Styling: Tailwind CSS, shadcn/ui
- Testing: Vitest, Testing Library, Playwright with SSR
- Deployment: Node.js server (or Docker)

Key Documents:
- ../../AGENTS.md - Repository patterns
- ./README.md - React Router V7 SSR specifics
- /agents/*.agent.md - Agent definitions

When acting as an agent:
1. Consider server vs client rendering boundaries
2. Optimize for Core Web Vitals and TTFB
3. Implement proper hydration strategies
4. Ensure SEO optimization (meta tags, structured data)
5. Handle streaming and progressive rendering
```

**Project Knowledge (Add these files):**

**Always Include:**
- `../../AGENTS.md` - Repository patterns
- `./README.md` - React Router V7 SSR overview
- `./agents/react-router-ssr-specialist.agent.md`

**SDLC Agents (add based on need):**
- `./agents/requirements-analyst.agent.md`
- `./agents/software-architect.agent.md`
- `./agents/implementation-engineer.agent.md`
- `./agents/quality-analyst.agent.md`
- `./agents/deployment-engineer.agent.md`

**SSR-Specific Docs:**
- `./react-router.config.ts` - React Router configuration
- `./app/entry.server.tsx` - Server entry point
- `./app/entry.client.tsx` - Client entry point
- `./app/root.tsx` - Root component
- `./docs/**/*.md` - SSR-specific documentation

## Best Practices

### 1. Server-First Context

✅ **Good - Server-side context:**
```
Act as the React Router SSR Specialist (agents/react-router-ssr-specialist.agent.md).

Context:
- Feature: User dashboard with real-time data
- Components: Mix of server and client components
- Data Source: PostgreSQL via Prisma
- Performance Target: TTFB < 600ms, LCP < 2.5s, TTI < 3.5s
- SEO: Meta tags, Open Graph, JSON-LD
- Streaming: Fast shell, deferred slow data
- Hydration: TanStack Query state preservation

How should I architect this for optimal performance and SEO?
```

❌ **Bad - Vague request:**
```
How do I make a dashboard?
```

### 2. Server vs Client Boundaries

✅ **Good - Boundary-aware:**
```
As the React Router SSR Specialist, implement a blog:

Server-Side Rendering:
- Blog post list (server loader)
- Individual posts (server loader with defer for comments)
- Author pages (server loader)
- Meta tags for all pages

Server Actions:
- Comment submission
- Post creation/editing
- User authentication

Client-Side Rendering:
- Comment form (interactive)
- Like button (optimistic updates)
- Search filters (URL state)

Explain the rationale for each boundary decision.
```

### 3. Performance Context

✅ **Good - Performance-focused:**
```
Act as the React Router SSR Specialist.

Current Performance Issue:
- TTFB: 1.8s (target < 600ms)
- LCP: 4.2s (target < 2.5s)
- Hydration: 2.1s (target < 1s)
- Server rendering: 800ms (target < 300ms)

Current Implementation:
- Blocking data fetches in loader
- No streaming or defer
- Large HTML payload
- Slow database queries

Optimize for server-side performance and streaming.
```

## React Router V7 SSR Workflows

### Workflow 1: New SSR Route

```markdown
# Stage 1: UI Design
Act as UI/UX Designer (agents/ui-ux-designer.agent.md).
Design a responsive product details page:
- Hero section (product image, title, price)
- Product description (above fold)
- Specifications (tabbed interface)
- Reviews section (can be deferred)
- Related products (below fold, can defer)
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA)

[Wait, review design]

# Stage 2: Implementation
Act as React Router SSR Specialist (agents/react-router-ssr-specialist.agent.md).
Implement the product details route:
- app/routes/products.$.tsx (route file)
- Server loader for product data
- Defer pattern for reviews (slower API)
- Meta function for dynamic SEO
- Structured data (JSON-LD for products)
- Streaming with Suspense boundaries
- Client components for interactive parts
- Optimize for TTFB < 600ms, LCP < 2.5s

[Wait, review implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Create test suite:
- Unit tests for server loader
- SSR rendering tests
- Hydration tests (no mismatches)
- Server action tests (if applicable)
- E2E tests with Playwright
- Performance tests (TTFB, LCP, TTI)
- SEO validation (meta tags, structured data)
```

### Workflow 2: Server Actions Feature

```markdown
# Context
Implementing a contact form with server action and validation

# Stage 1: Architecture
Act as Software Architect (agents/software-architect.agent.md).
Design form submission architecture:

Server Action:
- Validation strategy (Zod schemas)
- Error handling patterns
- Database insertion
- Email notification
- Rate limiting
- CSRF protection

Progressive Enhancement:
- Works without JavaScript
- Optimistic updates with JS
- Loading states and feedback
- Error display

[Wait for architecture]

# Stage 2: Implementation
Act as React Router SSR Specialist (agents/react-router-ssr-specialist.agent.md).
Implement contact form:

Route File (app/routes/contact.tsx):
- Server loader for initial form state
- Server action for form submission
- Meta function for SEO
- Type-safe action with TypeScript
- Zod validation
- Error handling
- Redirect on success

Client Component (components/ContactForm.tsx):
- Progressive enhancement (form works without JS)
- React Hook Form integration
- Optimistic updates with JS enabled
- Error display
- Success feedback

[Wait for implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Test server action:
- Unit tests for action logic
- Validation error scenarios
- Database integration tests
- E2E tests (with and without JS)
- Progressive enhancement verification
- Rate limiting tests
- CSRF protection tests
```

### Workflow 3: Streaming Implementation

```markdown
# Feature
Implement streaming for progressive page rendering

# Stage 1: Architecture
Act as Software Architect (agents/software-architect.agent.md).
Design streaming architecture:

Data Tiers:
- Fast: Product info from cache (< 100ms)
- Medium: Inventory from database (< 500ms)
- Slow: Reviews from external API (< 2s)
- Very Slow: Recommendations from ML service (< 5s)

Streaming Strategy:
- Render shell immediately (< 300ms TTFB)
- Stream medium data with defer
- Stream slow data with defer
- Suspense boundaries for loading states
- Error boundaries for failed streams

[Wait for architecture]

# Stage 2: Implementation
Act as React Router SSR Specialist (agents/react-router-ssr-specialist.agent.md).
Implement streaming:

Server Loader:
- Return immediate data (product info)
- Use defer() for slow data (reviews, recommendations)
- Proper error handling in deferred promises
- Cache headers for optimization

Route Component:
- Suspense boundaries for deferred data
- Loading skeletons for deferred content
- Error boundaries for failed streams
- SEO-critical content in initial HTML

[Wait for implementation]

# Stage 3: Validation
Act as Quality Analyst (agents/quality-analyst.agent.md).
Validate streaming behavior:
- Test TTFB (should be fast, < 600ms)
- Test progressive rendering
- Test error scenarios (failed streams)
- Verify SEO content in initial HTML
- Test with slow network conditions
- Measure LCP, TTI improvements
```

### Workflow 4: Production Deployment

```markdown
# Feature
Deploy React Router V7 SSR app to production

# Stage 1: Server Configuration
Act as Deployment Engineer (agents/deployment-engineer.agent.md).
Configure for production deployment:

Node.js Server:
- Environment variables (dev/staging/prod)
- Server configuration (port, host, timeout)
- Process management (PM2, systemd)
- Health check endpoint
- Graceful shutdown
- Logging configuration

Docker (Optional):
- Multi-stage Dockerfile
- Container optimization
- Environment configuration
- Volume mounts
- Health checks

[Wait for server config]

# Stage 2: Build Optimization
Continue as Deployment Engineer.
Optimize production build:

Build Configuration:
- Vite SSR build settings
- Code splitting strategy
- Asset optimization (images, fonts)
- Source maps for debugging
- Bundle analysis

Performance:
- Response compression (gzip/brotli)
- Caching headers
- CDN configuration for static assets
- Database connection pooling
- Response caching strategy

[Wait for build optimization]

# Stage 3: CI/CD Pipeline
Set up GitHub Actions workflow:
- Build and test on push
- Run linting and type checking
- Run unit and integration tests
- Run E2E tests with Playwright
- Build Docker image (if using)
- Deploy to staging on PR
- Deploy to production on main merge
- Automatic rollback on failure
- Lighthouse CI for performance

[Wait for pipeline setup]

# Stage 4: Monitoring
Set up production monitoring:
- Error tracking (Sentry)
- Application logs (Winston, Pino)
- Performance monitoring (TTFB, LCP, TTI)
- Server metrics (CPU, memory, requests)
- Database query performance
- Uptime monitoring
- Alerts for critical issues
```

## Troubleshooting

### Issue: Agent Suggests Client-Side Patterns

**Symptoms:** Agent suggests client patterns when server patterns should be used

**Solutions:**
1. Always specify "SSR" and "server-side rendering" explicitly
2. Reference React Router V7 SSR mode (not SPA mode)
3. Explicitly state server loader or server action requirement
4. Mention SEO and crawlability requirements
5. Provide performance constraints (TTFB, LCP)

**Example Fix:**
```
I need you to act as the React Router SSR Specialist. This feature
requires SERVER-SIDE RENDERING for SEO and performance.

[Paste relevant react-router-ssr-specialist.agent.md sections]

Requirements:
- Server loader for data fetching (not client-side)
- Meta function for SEO tags
- Streaming with defer for slow data
- Crawlable by search engines
- TTFB < 600ms, LCP < 2.5s

Now implement this server-first feature...
```

### Issue: Hydration Mismatches

**Symptoms:** Console warnings about hydration, content flicker

**Solutions:**
1. Ask for server and client rendering consistency check
2. Review use of random data or timestamps in SSR
3. Check TanStack Query hydration configuration
4. Verify date/time formatting across boundaries
5. Request minimal use of suppressHydrationWarning

**Example Fix:**
```
As the React Router SSR Specialist, diagnose hydration issues:

Console Warnings:
[Paste hydration warnings]

Component Code:
[Paste component code]

Issues to check:
- Server and client rendering consistency
- Random data or IDs in SSR
- Date/time formatting differences
- TanStack Query hydration
- localStorage access during SSR
- Browser-only APIs in shared code

Provide fix with proper SSR/client boundaries.
```

### Issue: Server Loader Performance

**Symptoms:** Slow TTFB, slow page loads, timeouts

**Solutions:**
1. Provide current loader implementation and timing
2. Ask about parallel data fetching opportunities
3. Request defer strategy for slow data
4. Review database query optimization
5. Consider caching strategies

**Example Fix:**
```
Review this server loader for performance:

[Paste loader code]

Performance Issues:
- TTFB: 1.8s (target < 600ms)
- Serial data fetching (3 sequential API calls)
- No caching
- Slow database queries
- Blocking on slow external API

Requirements:
- Parallel data fetching where possible
- Defer slow data (use streaming)
- Implement response caching
- Optimize database queries
- Fast shell rendering (< 300ms TTFB)

As the React Router SSR Specialist, optimize this loader.
```

## Resources

- **Template README:** `./README.md` - React Router V7 SSR setup
- **Repository Patterns:** `../../AGENTS.md` - Cross-template guidelines
- **Agent Definitions:** `./agents/*.agent.md` - Agent capabilities
- **Example Config:** `.claude/project.example.json` - Project configuration
- **React Router Docs:** https://reactrouter.com
- **SSR Guide:** https://reactrouter.com/how-to/server-rendering

## React Router V7 SSR Advanced Features

### Server Loaders

```
Act as React Router SSR Specialist.

Implement efficient server loader:
- Type-safe loader function
- Parallel data fetching with Promise.all
- Error handling and fallbacks
- Response headers for caching
- Request context (cookies, headers)
- Database query optimization
- Defer pattern for slow data
```

### Server Actions

```
Act as React Router SSR Specialist.

Server Actions best practices:
- Type safety with TypeScript
- Zod validation on server
- Progressive enhancement patterns
- Optimistic updates with useOptimistic
- Error handling and user feedback
- Redirect after successful mutation
- File upload handling
- CSRF protection
```

### Streaming with Defer

```
Act as React Router SSR Specialist.

Implement streaming strategy:
- Fast: Hero section (immediate SSR)
- Medium: Product list (defer, 500ms)
- Slow: Reviews (defer, 2s)
- Very Slow: Recommendations (defer, 5s)

Use defer() for slow data and Suspense boundaries.
Ensure SEO content in initial HTML.
```

### Meta Functions for SEO

```
Act as React Router SSR Specialist.

Implement SEO with meta function:
- Dynamic title and description per route
- Open Graph tags (title, description, image)
- Twitter Cards
- Canonical URLs
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt configuration
```

### Hydration Strategy

```
Act as React Router SSR Specialist.

Implement smooth hydration:
- Dehydrate TanStack Query state on server
- Hydrate query client on client
- Preserve server-fetched data
- No hydration mismatches
- Immediate interactivity after hydration
- Handle client-only state carefully
```

### Entry Points Configuration

```
Act as React Router SSR Specialist.

Configure SSR entry points:
- entry.server.tsx (rendering logic, streaming)
- entry.client.tsx (hydration logic, query client)
- Handle errors gracefully
- Add performance monitoring
- Configure logging and diagnostics
- Optimize bundle size
```

---

**Happy React Router V7 SSR development with Claude agents! 🚀**

For more information, see the [root custom agents guide](../../docs/custom-agents-guide.md).
