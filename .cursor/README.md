# Cursor IDE Configuration for Custom Agents

This directory contains configuration for using custom sub-agents in Cursor IDE with the scaffolding-templates repository.

## Quick Start

Cursor automatically discovers agent files in `/agents/` directories. No additional configuration needed!

### Using Agents in Chat (`Cmd/Ctrl+L`)

```
@requirements-analyst analyze this feature request
@nextjs-ssr-specialist how should I implement this Server Component?
@quality-analyst create tests for src/components/UserProfile.tsx
```

### Using Agents in Composer (`Cmd/Ctrl+K`)

1. Open Composer mode
2. Select agent from dropdown
3. Describe your task - agent guides multi-file implementation

## Available Agents

### Root-Level Agents (14 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `@requirements-analyst` - Feature requests, user stories, acceptance criteria
- `@software-architect` - System design, ADRs, component architecture
- `@implementation-engineer` - Feature coding, TypeScript development
- `@ui-ux-designer` - Interface design, accessibility, design systems
- `@quality-analyst` - Unit tests, integration tests, E2E tests
- `@deployment-engineer` - CI/CD pipelines, build optimization
- `@maintenance-engineer` - Bug fixes, refactoring, dependency updates
- `@production-support-engineer` - Incident response, monitoring, debugging

**Framework Specialists (6):**
- `@typescript-library-specialist` - Library APIs, NPM publishing
- `@nextjs-ssr-specialist` - Next.js App Router, Server Components
- `@react-router-spa-specialist` - React Router v7 client-side routing
- `@react-router-ssr-specialist` - React Router v7 SSR patterns
- `@tanstack-router-spa-specialist` - TanStack Router type-safe routing
- `@expo-react-native-specialist` - Expo Router, native modules

### Template-Specific Agents (9 Per Template)

Located in `/templates/[template-name]/agents/`:

Each template includes:
- All 8 SDLC phase agents (requirements → production support)
- 1 framework-specific specialist agent

**Why duplicate?** Templates are designed to be cloned independently. Each template is self-contained with all necessary agents.

## Usage Patterns

### Pattern 1: Single Agent Task

```
@quality-analyst

Create comprehensive tests for the UserProfile component
including unit tests for rendering, integration tests for
form submission, and E2E tests for the complete flow.
```

### Pattern 2: Sequential Agent Workflow

```
Step 1: @requirements-analyst
Create technical specification for user authentication feature
with OAuth2 support and JWT token management.

[Wait for output]

Step 2: @software-architect
Design architecture based on the previous specification.
Include component breakdown and data flow diagrams.

[Wait for output]

Step 3: @nextjs-ssr-specialist
Implement the authentication feature using Next.js Server
Components and Server Actions as designed.

[Wait for output]

Step 4: @quality-analyst
Create test suite for the authentication implementation.
```

### Pattern 3: Context-Aware Reference

```
Given the specification in docs/features/user-auth.md,
@software-architect design the architecture following
repository patterns defined in AGENTS.md.
```

### Pattern 4: Multi-File Implementation

```
@implementation-engineer

Implement the notification system across:
- components/notifications/NotificationBell.tsx
- components/notifications/NotificationList.tsx
- services/notificationService.ts
- hooks/useNotifications.ts

Follow repository patterns and ensure proper TypeScript types.
```

## Agent Discovery

### How Cursor Finds Agents

Cursor discovers agents by:
1. Scanning for `*.agent.md` files in `/agents/` directories
2. Reading YAML frontmatter for agent metadata
3. Prioritizing based on current working directory

### Directory-Based Priority

```
scaffolding-templates/
├── agents/                    # Available everywhere
│   └── *.agent.md
├── templates/
│   ├── next-ssr/
│   │   ├── agents/           # Available in next-ssr template
│   │   │   └── *.agent.md
│   │   └── src/              # Template specialist prioritized here
│   │
│   └── react-router-v7-spa/
│       ├── agents/           # Available in react-router template
│       │   └── *.agent.md
│       └── src/              # Different specialist prioritized here
```

**Current Directory Rules:**
- In `/`: All 14 root agents available
- In `/templates/next-ssr/`: Root agents + next-ssr agents (9 total)
- In `/templates/*/`: Root agents + template-specific agents

## Best Practices

### 1. Choose the Right Agent

| Task | Agent | Why |
|------|-------|-----|
| Understanding requirements | `@requirements-analyst` | Clarifies needs into specs |
| Designing architecture | `@software-architect` | Creates ADRs and designs |
| Generic implementation | `@implementation-engineer` | Cross-framework patterns |
| Framework-specific code | `@[framework]-specialist` | Framework best practices |
| Creating UI | `@ui-ux-designer` | Accessibility, design systems |
| Writing tests | `@quality-analyst` | Comprehensive test coverage |
| Fixing bugs | `@maintenance-engineer` | Code improvements, refactoring |
| Production issues | `@production-support-engineer` | Incident response, monitoring |
| CI/CD setup | `@deployment-engineer` | Pipeline optimization |

### 2. Provide Clear Context

✅ **Good:**
```
@nextjs-ssr-specialist

Context: Building a blog post page with MDX content
Requirements: Server-side rendering, metadata generation, reading time
Current Setup: Using App Router with /app/posts/[slug]/page.tsx

How should I implement this with proper caching and revalidation?
```

❌ **Bad:**
```
@nextjs-ssr-specialist how do I make a page?
```

### 3. Use Composer for Multi-File Changes

**In Composer mode:**
- Agents can edit multiple files simultaneously
- Better for feature implementation across components
- Provides unified diff view before applying

**In Chat mode:**
- Better for questions and guidance
- Single-file edits
- Interactive discussions

### 4. Chain Agents Explicitly

For complex features, reference previous agent outputs:

```
@requirements-analyst create spec for search feature
[Review spec output]

@software-architect design architecture for the search
feature based on the specification above
[Review architecture]

@implementation-engineer implement the search feature
following the architecture design above
```

### 5. Reference Documentation

Agents automatically reference:
- Repository `/AGENTS.md`
- Template-specific documentation
- Existing ADRs

You can explicitly reference too:

```
@software-architect

Based on the patterns in docs/architecture/state-management.md,
design the state management for this feature.
```

## Configuration

### Agent Settings (Optional)

Create `.cursor/config.json` to customize agent behavior:

```json
{
  "agents": {
    "autoDiscover": true,
    "directories": [
      "./agents",
      "./templates/*/agents"
    ],
    "priorityByDirectory": {
      "templates/next-ssr": ["nextjs-ssr-specialist"],
      "templates/react-router-v7-spa": ["react-router-spa-specialist"],
      "templates/react-router-v7-ssr": ["react-router-ssr-specialist"],
      "templates/tanstack-router-spa": ["tanstack-router-spa-specialist"],
      "templates/typescript-library": ["typescript-library-specialist"],
      "templates/expo-react-native": ["expo-react-native-specialist"]
    }
  },
  "composer": {
    "defaultAgent": null,
    "showAgentSelector": true
  },
  "chat": {
    "suggestAgents": true
  }
}
```

See `config.example.json` for full configuration options.

## Troubleshooting

### Issue: Agent Not Appearing

**Symptoms:** Agent doesn't show in dropdown or `@agent-name` doesn't work

**Solutions:**
1. Check file naming: Must be `*.agent.md`
2. Verify YAML frontmatter is valid
3. Ensure file is in `/agents/` directory
4. Reload Cursor window: `Cmd/Ctrl+Shift+P` → "Reload Window"
5. Check Cursor logs: `Help` → `Show Logs` → search for "agent"

### Issue: Agent Gives Generic Advice

**Symptoms:** Agent doesn't follow repository patterns

**Solutions:**
1. Provide more specific context in your prompt
2. Explicitly reference relevant documentation
3. Ensure agent has access to `AGENTS.md` (it should automatically)
4. Use template specialist for framework-specific questions
5. Include file paths and current implementation details

### Issue: Wrong Agent Selected

**Symptoms:** Cursor suggests the wrong agent for your task

**Solutions:**
1. Manually select agent from dropdown
2. Use explicit `@agent-name` reference
3. Navigate to correct directory (template-specific agents prioritized in their directories)
4. Update `config.json` with `priorityByDirectory` settings

### Issue: Agents Give Conflicting Advice

**Symptoms:** Different agents recommend different approaches

**Solutions:**
1. Prefer template specialist for framework-specific questions
2. Prefer SDLC agent for general best practices
3. Check if `AGENTS.md` has been recently updated
4. When in doubt, use this hierarchy:
   - Template specialist > SDLC engineer > Generic advice
5. Cross-reference with repository documentation

### Issue: Agent Can't Access Files

**Symptoms:** Agent says it can't read or edit files

**Solutions:**
1. Ensure Cursor has file access permissions
2. Check if file exists at specified path
3. Use relative paths from repository root
4. Verify workspace trust settings: `Cmd/Ctrl+Shift+P` → "Workspaces: Manage Workspace Trust"

## Advanced Patterns

### Pattern: Feature Development Pipeline

Complete feature from requirements to deployment:

```
# Day 1: Requirements & Design
@requirements-analyst create spec for user dashboard with widgets
@ui-ux-designer design interface for dashboard with drag-and-drop
@software-architect design architecture for dashboard system

# Day 2: Implementation
@nextjs-ssr-specialist implement server components for dashboard
@implementation-engineer implement drag-and-drop widget system
@ui-ux-designer review implementation for accessibility

# Day 3: Testing & Deployment
@quality-analyst create comprehensive test suite
@deployment-engineer optimize build and add monitoring
@production-support-engineer set up alerts and dashboards
```

### Pattern: Bug Investigation and Fix

```
# Investigation
@production-support-engineer
Analyze the bug report in issues/123. Check logs in
monitoring dashboard and identify root cause.

# Fix Implementation
@maintenance-engineer
Based on the investigation above, implement a fix for
the identified issue. Include defensive code and validation.

# Testing
@quality-analyst
Create regression tests to prevent this bug from
happening again. Include edge cases identified in investigation.

# Deployment
@deployment-engineer
Deploy the fix with proper rollback plan and monitoring.
```

### Pattern: Cross-Template Learning

When working on one template, reference patterns from others:

```
@nextjs-ssr-specialist

I'm implementing authentication in Next.js. How does the
react-router-ssr template handle authentication? Are there
patterns I should adopt or avoid?
```

### Pattern: Progressive Enhancement

Implement features in stages with different agents:

```
# Stage 1: Basic Implementation
@implementation-engineer implement basic search functionality

# Stage 2: Performance Optimization
@deployment-engineer optimize search with debouncing and caching

# Stage 3: Advanced Features
@[template]-specialist add server-side search with streaming

# Stage 4: Testing
@quality-analyst add comprehensive tests for all search scenarios
```

## Integration with Cursor Features

### With Cursor Tab (Auto-complete)

Agents enhance Tab auto-complete:
- Agent context influences suggestions
- Framework-specific patterns prioritized

### With Cursor CMD+K (Quick Edit)

Use agents in quick edits:
```
Cmd+K → Select code → @quality-analyst add tests for this function
```

### With Cursor Settings

Configure agent preferences in Cursor settings:
- `Settings` → `Cursor` → `Agents`
- Enable/disable agent suggestions
- Set default agents per file type

### With Terminal Integration

Agents can suggest commands:
```
@deployment-engineer what commands should I run to deploy this?
@maintenance-engineer suggest pnpm scripts to audit dependencies
```

## Resources

- **Main Guide:** `/docs/custom-agents-guide.md` - Comprehensive agent usage guide
- **Repository Patterns:** `/AGENTS.md` - Repository-wide development guidelines
- **Template Docs:** `/templates/[name]/README.md` - Template-specific instructions
- **Agent Definitions:** `/agents/*.agent.md` - Individual agent capabilities
- **Example Config:** `.cursor/config.example.json` - Full configuration options

## Example Workflows

### Workflow 1: Add a New Component

```
# In Chat (Cmd+L)
@ui-ux-designer design a DateRangePicker component with
keyboard navigation and accessibility

[Review design]

# In Composer (Cmd+K)
@implementation-engineer implement the DateRangePicker
following the design above. Create:
- components/ui/DateRangePicker.tsx
- components/ui/DateRangePicker.test.tsx
- Update components/ui/index.ts
```

### Workflow 2: Performance Optimization

```
@deployment-engineer

Analyze bundle size for the app. Identify opportunities
for code splitting and lazy loading. Provide specific
recommendations with bundle analysis.

[Review recommendations]

@implementation-engineer

Implement the code splitting recommendations:
1. Lazy load the dashboard components
2. Split vendor bundles
3. Add route-based splitting
```

### Workflow 3: Feature Review

```
@software-architect

Review the implementation in src/features/notifications/
against repository patterns. Identify:
- Pattern violations
- Improvement opportunities
- Architecture concerns

[Review feedback]

@maintenance-engineer

Refactor the notifications feature based on the
architecture review above. Maintain backward compatibility.
```

## Tips for Success

1. **Start Specific:** Provide clear context and requirements
2. **Use Appropriate Agent:** Match agent expertise to task
3. **Chain Sequentially:** Complete one phase before starting next
4. **Review Output:** Agents provide guidance, but you decide
5. **Iterate:** Refine prompts based on agent responses
6. **Reference Docs:** Point agents to relevant documentation
7. **Stay Consistent:** Follow patterns agents recommend
8. **Test Changes:** Agents suggest code, you verify it works
9. **Learn Patterns:** Understand why agents recommend approaches
10. **Combine Tools:** Use agents with Cursor's other AI features

---

**Happy coding with Cursor agents! 🚀**

For more information, see the [comprehensive custom agents guide](/docs/custom-agents-guide.md).
