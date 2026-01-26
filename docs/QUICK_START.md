# Quick Start Guide for Custom Agents

Get started with custom AI agents in under 5 minutes!

## What Are Custom Agents?

Custom agents are specialized AI assistants for different development tasks. Think of them as your AI development team:
- **Requirements Analyst** - Analyzes and documents requirements
- **Software Architect** - Designs system architecture
- **Implementation Engineer** - Writes production code
- **Quality Analyst** - Creates comprehensive tests
- **And 10 more specialists...**

## Choose Your Platform

### GitHub Copilot (VS Code, JetBrains)

**Setup:** None needed! Agents are automatically discovered.

**Usage:**
1. Open Copilot Chat (Ctrl/Cmd + Shift + I)
2. Click the `@` dropdown
3. Select an agent (e.g., `@implementation-engineer`)
4. Start your conversation

**Example:**
```
@implementation-engineer

Add a login form to /templates/react-router-v7-ssr/app/routes/login.tsx
following the template patterns.
```

### Cursor IDE

**Setup:** None needed! Agents are automatically discovered.

**Usage:**
1. Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
2. Type `@` to see agents
3. Select an agent
4. Start your conversation

**Example:**
```
@software-architect

Design a user dashboard with:
- Profile management
- Activity feed
- Settings panel
```

**Advanced:** See `.cursor/README.md` for configuration options.

### Claude (Desktop or Projects)

**Setup:** Add agent files to your project knowledge.

**Option 1: Claude Desktop Projects**
1. Create a new project
2. Add this repository folder
3. Add `/agents/README.md` to project knowledge
4. Reference agents by file path

**Option 2: Claude in Cursor**
1. Open repository in Cursor
2. Use Claude Code extension
3. Reference agent files directly

**Example:**
```
I need help implementing authentication. 
Please reference /agents/implementation-engineer.agent.md
and follow the patterns in /AGENTS.md.
```

**Advanced:** See `.claude/README.md` for project configuration.

## Common Workflows

### 1. Feature Development (Complete Cycle)

**Step 1: Analyze Requirements**
```
@requirements-analyst

User Story: As a user, I want to customize my dashboard layout
```

**Step 2: Design Architecture**
```
@software-architect

Based on the requirements above, design:
- Component structure
- State management
- API design
```

**Step 3: Implement**
```
@implementation-engineer

Implement the dashboard customization following the architecture.
Template: React Router v7 SSR
```

**Step 4: Test**
```
@quality-analyst

Create tests for the dashboard customization:
- Unit tests for components
- Integration tests with mocked APIs
```

**Step 5: Deploy**
```
@deployment-engineer

Set up CI/CD for the new dashboard feature
```

### 2. Bug Fix (Quick)

```
@maintenance-engineer

Bug: Login form not showing validation errors
Steps to reproduce:
1. Go to /login
2. Submit empty form
3. Expected: Error messages
4. Actual: No errors

Please investigate and fix.
```

### 3. Framework-Specific Question

```
@react-router-ssr-specialist

How do I implement server-side data loading with error boundaries
in React Router v7?
```

### 4. Code Review

```
@quality-analyst

Review the changes in /templates/react-router-v7-ssr/app/routes/dashboard.tsx
and provide feedback on:
- Code quality
- Test coverage
- Best practices adherence
```

## Available Agents

### SDLC Phase Agents (8)

For general development tasks:

1. **@requirements-analyst** - Requirements analysis
2. **@software-architect** - System architecture design
3. **@implementation-engineer** - Code implementation
4. **@quality-analyst** - Testing and quality assurance
5. **@ui-ux-designer** - UI/UX design
6. **@deployment-engineer** - CI/CD and deployment
7. **@maintenance-engineer** - Bug fixes and maintenance
8. **@production-support-engineer** - Production issues

### Template Specialists (6)

For framework-specific guidance:

1. **@nextjs-ssr-specialist** - Next.js App Router
2. **@react-router-spa-specialist** - React Router v7 SPA
3. **@react-router-ssr-specialist** - React Router v7 SSR
4. **@tanstack-router-spa-specialist** - TanStack Router
5. **@typescript-library-specialist** - TypeScript libraries
6. **@expo-react-native-specialist** - React Native/Expo

## Agent Context

Agents understand your context automatically:

**Root directory:**
- All 14 agents available
- Use for cross-template work

**Template directory:**
- 9 agents available (8 SDLC + 1 template specialist)
- Use for template-specific work

## Best Practices

### 1. Be Specific

❌ Bad:
```
@implementation-engineer
Add authentication
```

✅ Good:
```
@implementation-engineer

Task: Add JWT authentication to React Router v7 SSR template
Requirements:
- HTTP-only cookies
- Login and signup pages
- Protected routes
- Zod validation
Reference: /templates/next-ssr/app/middleware.ts for pattern
```

### 2. Use the Right Agent

- **Need requirements analysis?** → Use `@requirements-analyst`
- **Need architectural design?** → Use `@software-architect`
- **Need code implementation?** → Use `@implementation-engineer` or template specialist
- **Need tests?** → Use `@quality-analyst`
- **Framework-specific question?** → Use template specialist

### 3. Chain Agents for Complex Tasks

Break down big tasks:
```
1. @requirements-analyst → Analyze requirements
2. @software-architect → Design architecture
3. @implementation-engineer → Write code
4. @quality-analyst → Create tests
```

### 4. Provide Context

Always include:
- Which template you're working in
- What you're trying to accomplish
- Any constraints or requirements
- References to existing code

## Troubleshooting

### Agents Not Appearing

**GitHub Copilot:**
- Refresh agent list
- Ensure you're in the repository directory

**Cursor:**
- Restart Cursor
- Check file naming (must end with `.agent.md`)

**Claude:**
- Verify files are in project knowledge
- Reference by file path

### Agent Not Following Patterns

Be explicit:
```
@implementation-engineer

IMPORTANT: Follow these patterns:
1. Use translation keys (see /AGENTS.md)
2. Use React Hook Form for forms
3. Reference: /templates/react-router-v7-ssr/app/routes/login.tsx

Implement...
```

### Need More Help?

Agent not understanding? Try:
1. Reference the specific section in `/AGENTS.md`
2. Provide code examples from the repository
3. Be more specific about requirements
4. Break task into smaller pieces

## Next Steps

1. **Read the full guide:** `/docs/custom-agents-guide.md`
2. **Review patterns:** `/AGENTS.md`
3. **Explore agents:** `/agents/README.md`
4. **Check template docs:** `/templates/[name]/AGENTS.md`

## Examples

### Example 1: Add New Feature

```
@requirements-analyst
Analyze: User needs to export their data to CSV

@software-architect
Design the export feature based on requirements above

@implementation-engineer
Implement CSV export in React Router v7 SSR template:
- Export button in user dashboard
- Backend API endpoint
- Type-safe with Zod validation

@quality-analyst
Create tests for CSV export feature
```

### Example 2: Fix Production Bug

```
@production-support-engineer

Production Issue: Users reporting 500 errors on /api/users endpoint

Details:
- Started 2 hours ago
- Affects ~10% of requests
- Error: "Cannot read property 'id' of undefined"

Please investigate and provide:
1. Root cause analysis
2. Immediate fix
3. Long-term solution
```

### Example 3: Optimize Performance

```
@deployment-engineer

Task: Reduce bundle size
Current: 500KB
Target: <300KB

Analyze bundle composition and implement:
- Code splitting
- Tree shaking
- Import optimization
```

## Tips

💡 **Tip 1:** Start with `@requirements-analyst` for any new feature  
💡 **Tip 2:** Use template specialists for framework-specific questions  
💡 **Tip 3:** Chain agents sequentially for complex workflows  
💡 **Tip 4:** Always provide context and references  
💡 **Tip 5:** Iterate - agents learn from your feedback  

## Platform-Specific Guides

- **GitHub Copilot:** Built-in, no setup required
- **Cursor:** See `.cursor/README.md` for advanced config
- **Claude:** See `.claude/README.md` for project setup

---

**Ready to start?** Try your first agent conversation now! 🚀

Need help? Open an issue in the repository.
