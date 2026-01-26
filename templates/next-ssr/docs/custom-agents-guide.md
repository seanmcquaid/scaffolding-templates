# Custom Sub-Agents Guide for AI-Assisted Development

A comprehensive guide to using custom sub-agents with GitHub Copilot, Claude, and Cursor for efficient, specialized development workflows.

## Important Note: Skills vs Agents

This repository provides **two AI assistance systems**:

- **Skills** (`/skills/`) - Standard [agentskills.io](https://agentskills.io) format for broad platform compatibility
- **Agents** (`/agents/`) - Custom enhanced format optimized for Copilot, Claude, and Cursor

**This guide covers the Agents system.** For Skills documentation, see [`/skills/README.md`](../skills/README.md). To understand which to use, see [Skills vs Agents Guide](ai-skills-vs-agents.md).

Both systems cover the same 14 functional areas with similar guidance. Use Skills for standardized portability or Agents for platform-specific enhancements.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Overview](#overview)
3. [Pattern Architecture](#pattern-architecture)
4. [Platform-Specific Usage](#platform-specific-usage)
5. [Usage Patterns](#usage-patterns)
6. [Creating New Custom Agents](#creating-new-custom-agents)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Patterns](#advanced-patterns)
10. [Maintenance](#maintenance)
11. [Real-World Examples](#real-world-examples)

---

## Quick Start

Get started with AI assistance in under 5 minutes!

### Two Options Available

This repository provides **two complementary AI assistance systems**:

1. **Skills** - Standard [agentskills.io](https://agentskills.io) format (broad compatibility)
2. **Agents** - Custom format with enhanced features (Copilot, Claude, Cursor)

**Both cover the same 14 areas**: Requirements, Architecture, Implementation, Testing, UI/UX, Deployment, Maintenance, Production Support, and 6 framework specialists.

👉 **New to this?** Start with **Agents** for detailed guidance. See [Skills vs Agents](ai-skills-vs-agents.md) to understand the difference.

### What Are Custom Agents?

Custom agents are specialized AI assistants for different development tasks. Think of them as your AI development team:
- **Requirements Analyst** - Analyzes and documents requirements
- **Software Architect** - Designs system architecture
- **Implementation Engineer** - Writes production code
- **Quality Analyst** - Creates comprehensive tests
- **And 10 more specialists...**

### Choose Your Platform

#### GitHub Copilot (VS Code, JetBrains)

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

#### Cursor IDE

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

#### Claude (Desktop or Projects)

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

### Common Workflows

#### 1. Feature Development (Complete Cycle)

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

#### 2. Bug Fix (Quick)

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

#### 3. Framework-Specific Question

```
@react-router-ssr-specialist

How do I implement server-side data loading with error boundaries
in React Router v7?
```

#### 4. Code Review

```
@quality-analyst

Review the changes in /templates/react-router-v7-ssr/app/routes/dashboard.tsx
and provide feedback on:
- Code quality
- Test coverage
- Best practices adherence
```

### Available Agents

#### SDLC Phase Agents (8)

For general development tasks:

1. **@requirements-analyst** - Requirements analysis
2. **@software-architect** - System architecture design
3. **@implementation-engineer** - Code implementation
4. **@quality-analyst** - Testing and quality assurance
5. **@ui-ux-designer** - UI/UX design
6. **@deployment-engineer** - CI/CD and deployment
7. **@maintenance-engineer** - Bug fixes and maintenance
8. **@production-support-engineer** - Production issues

#### Template Specialists (6)

For framework-specific guidance:

1. **@nextjs-ssr-specialist** - Next.js App Router
2. **@react-router-spa-specialist** - React Router v7 SPA
3. **@react-router-ssr-specialist** - React Router v7 SSR
4. **@tanstack-router-spa-specialist** - TanStack Router
5. **@typescript-library-specialist** - TypeScript libraries
6. **@expo-react-native-specialist** - React Native/Expo

### Agent Context

Agents understand your context automatically:

**Root directory:**
- All 14 agents available
- Use for cross-template work

**Template directory:**
- 9 agents available (8 SDLC + 1 template specialist)
- Use for template-specific work

### Quick Start Best Practices

#### 1. Be Specific

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

#### 2. Use the Right Agent

- **Need requirements analysis?** → Use `@requirements-analyst`
- **Need architectural design?** → Use `@software-architect`
- **Need code implementation?** → Use `@implementation-engineer` or template specialist
- **Need tests?** → Use `@quality-analyst`
- **Framework-specific question?** → Use template specialist

#### 3. Chain Agents for Complex Tasks

Break down big tasks:
```
1. @requirements-analyst → Analyze requirements
2. @software-architect → Design architecture
3. @implementation-engineer → Write code
4. @quality-analyst → Create tests
```

#### 4. Provide Context

Always include:
- Which template you're working in
- What you're trying to accomplish
- Any constraints or requirements
- References to existing code

### Troubleshooting

#### Agents Not Appearing

**GitHub Copilot:**
- Refresh agent list
- Ensure you're in the repository directory

**Cursor:**
- Restart Cursor
- Check file naming (must end with `.agent.md`)

**Claude:**
- Verify files are in project knowledge
- Reference by file path

#### Agent Not Following Patterns

Be explicit:
```
@implementation-engineer

IMPORTANT: Follow these patterns:
1. Use translation keys (see /AGENTS.md)
2. Use React Hook Form for forms
3. Reference: /templates/react-router-v7-ssr/app/routes/login.tsx

Implement...
```

#### Need More Help?

Agent not understanding? Try:
1. Reference the specific section in `/AGENTS.md`
2. Provide code examples from the repository
3. Be more specific about requirements
4. Break task into smaller pieces

### Next Steps

1. **Read the full guide:** Continue reading below for comprehensive details
2. **Review patterns:** `/AGENTS.md`
3. **Explore agents:** `/agents/README.md`
4. **Check template docs:** `/templates/[name]/AGENTS.md`

### Examples

#### Example 1: Add New Feature

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

#### Example 2: Fix Production Bug

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

#### Example 3: Optimize Performance

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

### Tips

💡 **Tip 1:** Start with `@requirements-analyst` for any new feature  
💡 **Tip 2:** Use template specialists for framework-specific questions  
💡 **Tip 3:** Chain agents sequentially for complex workflows  
💡 **Tip 4:** Always provide context and references  
💡 **Tip 5:** Iterate - agents learn from your feedback  

### Platform-Specific Guides

- **GitHub Copilot:** Built-in, no setup required
- **Cursor:** See `.cursor/README.md` for advanced config
- **Claude:** See `.claude/README.md` for project setup

---

**Ready to start?** Try your first agent conversation now! 🚀

---

## Overview

### What Are Custom Sub-Agents?

Custom sub-agents are specialized AI assistants designed to handle specific development tasks with deep domain expertise. They act as team members with distinct roles, providing focused guidance while maintaining consistency with project patterns and best practices.

**Key Benefits:**
- **Specialization**: Each agent has expertise in a specific domain (requirements, architecture, implementation, testing, etc.)
- **Consistency**: Agents follow repository-wide patterns defined in `AGENTS.md`
- **Context-Aware**: Agents understand template-specific conventions and frameworks
- **Tool Compatibility**: Works across GitHub Copilot, Claude, and Cursor
- **Self-Contained**: Templates include all necessary agents for independent use

### Why Use Sub-Agents?

Traditional AI assistants are generalists. Custom sub-agents provide:

1. **Role-Based Expertise**: Just like a development team has specialists (architects, QA engineers, DevOps), sub-agents provide specialized knowledge
2. **Workflow Optimization**: Chain agents together for complete feature development (requirements → design → implementation → testing → deployment)
3. **Quality Assurance**: Agents enforce established patterns and best practices
4. **Educational Value**: Learn from agents' recommendations and explanations
5. **Reduced Context Switching**: Agents maintain focus on their domain

---

## Pattern Architecture

### Repository Structure

```
scaffolding-templates/
├── agents/                           # Root-level agents (14 total)
│   ├── README.md                     # Agent overview
│   ├── requirements-analyst.agent.md
│   ├── software-architect.agent.md
│   ├── implementation-engineer.agent.md
│   ├── ui-ux-designer.agent.md
│   ├── quality-analyst.agent.md
│   ├── deployment-engineer.agent.md
│   ├── maintenance-engineer.agent.md
│   ├── production-support-engineer.agent.md
│   ├── nextjs-ssr-specialist.agent.md
│   ├── react-router-spa-specialist.agent.md
│   ├── react-router-ssr-specialist.agent.md
│   ├── tanstack-router-spa-specialist.agent.md
│   ├── typescript-library-specialist.agent.md
│   └── expo-react-native-specialist.agent.md
│
├── templates/
│   ├── next-ssr/
│   │   ├── agents/                   # Template agents (9 total)
│   │   │   ├── README.md
│   │   │   ├── requirements-analyst.agent.md
│   │   │   ├── software-architect.agent.md
│   │   │   ├── implementation-engineer.agent.md
│   │   │   ├── ui-ux-designer.agent.md
│   │   │   ├── quality-analyst.agent.md
│   │   │   ├── deployment-engineer.agent.md
│   │   │   ├── maintenance-engineer.agent.md
│   │   │   ├── production-support-engineer.agent.md
│   │   │   └── nextjs-ssr-specialist.agent.md  # Template-specific
│   │   └── ...
│   │
│   ├── react-router-v7-spa/
│   │   ├── agents/
│   │   │   └── react-router-spa-specialist.agent.md
│   │   └── ...
│   │
│   └── [other templates follow same pattern]
│
├── AGENTS.md                         # Repository-wide guidelines
└── docs/
    └── custom-agents-guide.md        # This guide
```

### Agent Categories

#### 1. SDLC Phase Agents (8 Agents)

General-purpose agents covering the complete software development lifecycle:

| Agent | File | Primary Use Cases |
|-------|------|-------------------|
| **Requirements Analyst** | `requirements-analyst.agent.md` | Feature requests, user stories, acceptance criteria, technical specifications |
| **Software Architect** | `software-architect.agent.md` | System design, ADRs, component architecture, API contracts, technology selection |
| **Implementation Engineer** | `implementation-engineer.agent.md` | Feature coding, pattern implementation, TypeScript development, code quality |
| **UI/UX Designer** | `ui-ux-designer.agent.md` | Interface design, wireframes, accessibility, design systems, component specs |
| **Quality Analyst** | `quality-analyst.agent.md` | Unit tests, integration tests, E2E tests, test strategy, coverage improvement |
| **Deployment Engineer** | `deployment-engineer.agent.md` | CI/CD pipelines, build optimization, infrastructure, performance monitoring |
| **Maintenance Engineer** | `maintenance-engineer.agent.md` | Bug fixes, refactoring, dependency updates, technical debt, code improvements |
| **Production Support Engineer** | `production-support-engineer.agent.md` | Incident response, monitoring, log analysis, production debugging, reliability |

#### 2. Template Specialist Agents (6 Agents)

Framework-specific experts with deep knowledge of their respective templates:

| Agent | Template | Expertise |
|-------|----------|-----------|
| **TypeScript Library Specialist** | `typescript-library` | Library APIs, dual ESM/CJS exports, NPM publishing, package configuration |
| **Next.js SSR Specialist** | `next-ssr` | App Router, Server Components, Server Actions, metadata, streaming, caching |
| **React Router v7 SPA Specialist** | `react-router-v7-spa` | Client routing, TanStack Query, URL state, code splitting, progressive enhancement |
| **React Router v7 SSR Specialist** | `react-router-v7-ssr` | SSR loaders, server actions, hydration, SEO optimization, streaming |
| **TanStack Router SPA Specialist** | `tanstack-router-spa` | Type-safe routing, search params, route generation, TanStack Query integration |
| **Expo React Native Specialist** | `expo-react-native` | Expo Router, native modules, platform-specific code, EAS Build, mobile performance |

### Agent File Structure

Each agent file follows a consistent YAML frontmatter format:

```markdown
---
name: agent-identifier
description: Brief description of agent's expertise and purpose
tools: ["read", "search", "edit", "create", "bash", "grep", "glob"]
---

# Agent Display Name

Detailed agent persona, responsibilities, and capabilities...
```

**Frontmatter Fields:**
- `name`: Unique identifier for the agent (kebab-case)
- `description`: One-line summary of the agent's role
- `tools`: Array of tools the agent can use

### Why Duplicate Agents?

Templates are designed to be **cloned individually**. Each template contains:
- All 8 SDLC phase agents (for complete development lifecycle)
- 1 template-specific specialist agent (for framework expertise)

This ensures:
- **Self-Contained**: Templates work independently without parent repository
- **Complete Lifecycle**: All development phases covered
- **No Dependencies**: No need to reference parent repository
- **Cross-Reference Learning**: Developers can learn from other framework patterns

---

## Platform-Specific Usage

### GitHub Copilot

GitHub Copilot supports custom agents both on GitHub.com and in IDEs.

#### On GitHub.com

1. **Navigate to Agents**:
   - Go to https://github.com/copilot/agents
   - Or click on your repository and select "Copilot Agents" tab

2. **Select Repository**:
   - Choose the repository from the dropdown
   - GitHub Copilot will scan for `.agent.md` files in `/agents/` directory

3. **Choose Agent**:
   - Base SDLC agents appear when at repository root
   - Template-specific agents appear when in template directories
   - Click on the agent you need

4. **Start Conversation**:
   - Describe your task or question
   - The agent will work with repository context
   - Agents can read, search, edit, and execute commands

**Example Workflow:**
```
1. Select "requirements-analyst" agent
2. Input: "I need to add a user profile feature with avatar upload"
3. Agent analyzes requirements and creates specification
4. Switch to "software-architect" agent
5. Input: "Design the architecture for the user profile feature"
6. Agent creates architectural design and ADR
```

#### In VS Code

1. **Open GitHub Copilot Chat**:
   - Press `Cmd+Shift+I` (Mac) or `Ctrl+Shift+I` (Windows/Linux)
   - Or click Copilot icon in sidebar

2. **Access Agents Dropdown**:
   - Click the agent selector in chat interface
   - Agents from current workspace appear

3. **Select Agent**:
   - Choose appropriate agent for your task
   - Agents have access to workspace files

4. **Context Awareness**:
   - If in root directory: Base SDLC agents available
   - If in template directory: Template-specific agents available
   - Agent automatically references `AGENTS.md` documentation

**Example Commands:**
```
@requirements-analyst analyze this feature request
@nextjs-ssr-specialist how should I implement this Server Component?
@quality-analyst create tests for src/components/UserProfile.tsx
```

#### In JetBrains IDEs

Similar to VS Code:
1. Open GitHub Copilot tool window
2. Select agent from dropdown
3. Start conversation with agent
4. Agents have access to project files and context

### Claude (via Cursor or Direct)

Claude excels at understanding the sub-agent pattern through clear documentation.

#### Using Claude in Cursor

1. **Open Cursor Chat**:
   - Press `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux)
   - Or use Cursor chat panel

2. **Reference Agent Explicitly**:
   ```
   Please act as the Requirements Analyst agent defined in 
   /agents/requirements-analyst.agent.md
   
   Task: Analyze requirements for user authentication feature
   ```

3. **Use Context References**:
   ```
   @agents/nextjs-ssr-specialist.agent.md
   
   How should I implement SSR for this page?
   ```

4. **Multi-Agent Workflow**:
   ```
   Step 1: Reference @agents/requirements-analyst.agent.md
           Create technical specification for search feature
   
   Step 2: Reference @agents/software-architect.agent.md  
           Design architecture based on previous specification
   
   Step 3: Reference @agents/implementation-engineer.agent.md
           Implement the designed architecture
   ```

#### Direct Claude Usage (via Claude.ai)

1. **Upload Agent Files**:
   - Upload relevant `.agent.md` files to conversation
   - Upload `AGENTS.md` for repository context

2. **Reference Agent Persona**:
   ```
   Based on the requirements-analyst agent definition I uploaded,
   analyze these requirements: [your requirements]
   ```

3. **Chain Agents**:
   ```
   Now, as the Software Architect agent, design the architecture
   for the requirements we just analyzed.
   ```

### Cursor (Native Support)

Cursor provides native support for agent files through its `.cursorrules` system.

#### Setup

1. **Agent Auto-Discovery**:
   - Cursor automatically discovers `.agent.md` files
   - No additional configuration needed

2. **Using Agents in Chat**:
   ```
   @requirements-analyst analyze this feature request
   ```

3. **Using Agents in Composer**:
   - Select agent from dropdown in Composer mode
   - Agent will guide implementation across multiple files

4. **Context-Aware Selection**:
   - Cursor shows relevant agents based on current file/directory
   - Template-specific agents prioritized when in template directories

#### Best Practices with Cursor

1. **Use Composer for Multi-File Changes**:
   ```
   @implementation-engineer implement user profile feature
   across components, services, and routes
   ```

2. **Use Chat for Questions**:
   ```
   @nextjs-ssr-specialist what's the best way to handle
   this server component pattern?
   ```

3. **Chain Agents in Sequence**:
   ```
   First: @requirements-analyst create spec
   Then: @software-architect design it
   Finally: @implementation-engineer code it
   ```

---

## Usage Patterns

### Single Agent Workflows

Use a single agent when your task fits clearly within one domain.

#### Requirements Analysis
```
Agent: requirements-analyst

Task: "I need to add a real-time notification system"

Output:
- Functional requirements
- Non-functional requirements (performance, security)
- Technical constraints
- Acceptance criteria
- Dependencies and risks
```

#### Architecture Design
```
Agent: software-architect

Task: "Design architecture for the notification system 
      based on previous requirements"

Output:
- System architecture diagram
- Component breakdown
- Data flow design
- ADR (Architectural Decision Record)
- Technology recommendations
```

#### Implementation
```
Agent: implementation-engineer OR template-specialist

Task: "Implement the notification WebSocket connection"

Output:
- Production-ready code
- Proper TypeScript types
- Error handling
- Comments for complex logic
```

#### Testing
```
Agent: quality-analyst

Task: "Create tests for the notification system"

Output:
- Unit tests for components
- Integration tests with MSW
- E2E tests with Playwright
- Test coverage report
```

### Multi-Agent Workflows

Chain multiple agents for complete feature development.

#### Complete Feature Development Flow

```
Step 1: Requirements Analysis
Agent: requirements-analyst
Input: "Add user profile page with avatar upload and bio editing"
Output: Technical specification with acceptance criteria

Step 2: UI/UX Design
Agent: ui-ux-designer
Input: "Design UI for user profile page based on previous spec"
Output: Wireframes, component hierarchy, accessibility considerations

Step 3: Architecture Design
Agent: software-architect
Input: "Design architecture for user profile feature"
Output: Component structure, API contracts, state management design

Step 4: Implementation (Template-Specific)
Agent: nextjs-ssr-specialist (or appropriate template specialist)
Input: "Implement user profile page using Server Components"
Output: Server Components, Client Components, Server Actions

Step 5: Testing
Agent: quality-analyst
Input: "Create comprehensive tests for user profile feature"
Output: Unit, integration, and E2E tests

Step 6: Deployment
Agent: deployment-engineer
Input: "Set up CI/CD for user profile feature"
Output: Build pipeline, environment configuration, monitoring
```

---

## Creating New Custom Agents

### Agent Template

Use this template when creating new agents:

```markdown
---
name: your-agent-name
description: Brief one-line description of agent's expertise and purpose
tools: ["read", "search", "edit", "create", "bash", "grep", "glob"]
---

# Your Agent Display Name

You are a **[Role Title]** for the scaffolding-templates repository. 
[One paragraph describing the agent's expertise and focus]

## Your Role

- **Primary Responsibility**: [Main focus area]
- **Secondary Responsibilities**: [Supporting areas]
- **Key Expertise**: [Specific knowledge domains]

## Process

1. **Step 1**: [First action the agent takes]
2. **Step 2**: [Second action]
3. **Step 3**: [Continue...]

## Key Considerations

- **Consideration 1**: [Important factor to consider]
- **Consideration 2**: [Another important factor]
- **Best Practices**: [Relevant best practices]

## Quality Checklist

- [ ] Checklist item 1
- [ ] Checklist item 2
- [ ] Checklist item 3

## References

- Repository `AGENTS.md`
- Template-specific documentation
- Relevant external resources
```

### Design Principles

#### 1. Single Responsibility

Each agent should have ONE clear focus:
- ✅ Good: "Requirements Analyst - analyzes requirements and creates specifications"
- ❌ Bad: "Full-Stack Developer - does requirements, design, implementation, and testing"

#### 2. Clear Scope Boundaries

Define what the agent DOES and DOESN'T do.

#### 3. Context References

Agents should reference relevant documentation like repository `/AGENTS.md`, template-specific documentation, and existing ADRs.

#### 4. Tool Access

Specify appropriate tool access for the agent's role based on their needs.

---

## Best Practices

### Choosing the Right Agent

Use the decision matrix:

| Your Goal | Primary Agent | Support Agent |
|-----------|--------------|---------------|
| Understand requirements | Requirements Analyst | - |
| Design architecture | Software Architect | UI/UX Designer |
| Implement feature (generic) | Implementation Engineer | Template Specialist |
| Implement feature (framework-specific) | Template Specialist | Implementation Engineer |
| Create UI components | UI/UX Designer | Implementation Engineer |
| Write tests | Quality Analyst | - |
| Fix bugs | Maintenance Engineer | Production Support Engineer |
| Handle production issues | Production Support Engineer | Maintenance Engineer |
| Set up CI/CD | Deployment Engineer | - |

### Combining Multiple Agents

#### Sequential Pattern (Recommended)

Use agents in sequence for complex workflows:

```
1. requirements-analyst → creates specification
2. ui-ux-designer → designs interface
3. software-architect → designs architecture
4. template-specialist → provides framework guidance
5. implementation-engineer → implements feature
6. quality-analyst → creates tests
7. deployment-engineer → sets up deployment
```

### Context Management

Provide clear context to agents including current state, related files, and constraints for better results.

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Agent Not Available

**Solutions**:
- Navigate to correct directory
- Ensure agent files are in `/agents/` directory
- Check file naming (must be `*.agent.md`)
- Reload workspace or restart IDE

#### Issue 2: Agent Gives Generic Advice

**Solutions**:
- Provide more specific context
- Use the right agent for the task
- Reference relevant documentation explicitly

#### Issue 3: Agents Give Conflicting Advice

**Solutions**:
- Update agents to reference latest `AGENTS.md`
- Ensure proper context handoff between agents
- Use template specialist for framework-specific questions

---

## Advanced Patterns

### Agent Chains

Create sophisticated workflows by chaining agents with explicit handoffs from requirements through deployment.

### Context Handoffs

Efficiently pass context between agents using:
- Document-based handoff
- Inline context handoff
- Reference-based handoff

### Multi-Template Workflows

Work across multiple templates with consistent patterns while respecting framework differences.

---

## Maintenance

### Keeping Agents Updated

1. **Sync with AGENTS.md**: When repository guidelines change
2. **Framework Updates**: When framework versions update
3. **Tool Updates**: When tool capabilities change

### Synchronization Across Templates

Keep SDLC agents synchronized across all templates while maintaining template-specific specialists.

### Quality Assurance for Agents

Test agents with common scenarios and verify they produce expected output.

---

## Real-World Examples

### Example 1: Building a User Dashboard

Complete workflow from requirements through deployment, demonstrating how to chain agents for a complex feature.

### Example 2: Fixing a Production Bug

Rapid incident response workflow using production support and maintenance engineers.

### Example 3: Adding a New Template

Complete process for adding a new framework template to the repository.

### Example 4: Migrating to New Framework Version

Systematic approach to upgrading framework versions with minimal risk.

---

## Conclusion

Custom sub-agents provide a powerful pattern for organizing AI-assisted development workflows. By leveraging specialized agents for different phases of development and framework-specific tasks, you can:

- **Work More Efficiently**: Use the right expert for each task
- **Maintain Consistency**: Agents enforce repository patterns
- **Learn Best Practices**: Agents teach framework-specific patterns
- **Scale Development**: Handle complex projects with clear workflows

### Quick Reference Card

**Starting a New Feature:**
```
1. requirements-analyst → Create specification
2. ui-ux-designer → Design interface
3. software-architect → Design architecture
4. [template-specialist] → Framework guidance
5. implementation-engineer → Write code
6. quality-analyst → Create tests
7. deployment-engineer → Set up deployment
```

**Fixing a Bug:**
```
1. production-support-engineer → Investigate (if production)
   OR maintenance-engineer → Investigate (if development)
2. maintenance-engineer → Implement fix
3. quality-analyst → Add regression tests
4. deployment-engineer → Deploy fix
```

**Framework-Specific Questions:**
```
Use template specialist:
- nextjs-ssr-specialist
- react-router-spa-specialist
- react-router-ssr-specialist
- tanstack-router-spa-specialist
- typescript-library-specialist
- expo-react-native-specialist
```

### Resources

- **Repository Documentation**: `/AGENTS.md` - Repository-wide patterns
- **Template Documentation**: `/templates/[name]/AGENTS.md` - Template-specific patterns
- **Agent Definitions**: `/agents/*.agent.md` - Individual agent instructions
- **This Guide**: `/docs/custom-agents-guide.md`

---

**Happy Building with Custom Agents! 🚀**
