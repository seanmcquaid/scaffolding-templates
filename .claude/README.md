# Claude Configuration for Custom Agents

This directory contains configuration for using custom sub-agents with Claude (via Claude Desktop, Claude Projects, or Cursor with Claude).

## Quick Start

Claude understands the sub-agent pattern through explicit file references and context management.

### In Claude Desktop/Projects

1. **Add Agent Files to Project Knowledge:**
   - Open project settings
   - Add `/agents/*.agent.md` to project knowledge
   - Add `/AGENTS.md` for repository context
   - Add template-specific docs when working on a template

2. **Reference Agents in Conversations:**
   ```
   Please act as the Requirements Analyst agent defined in 
   /agents/requirements-analyst.agent.md
   
   Task: Analyze requirements for user authentication feature
   ```

### In Cursor with Claude

Use `@` references to include agent context:

```
@agents/nextjs-ssr-specialist.agent.md

How should I implement SSR for this blog post page?
```

## Available Agents

### Root-Level Agents (14 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `requirements-analyst` - Feature requests, user stories, technical specifications
- `software-architect` - System design, ADRs, component architecture, API contracts
- `implementation-engineer` - Feature coding, TypeScript development, code quality
- `ui-ux-designer` - Interface design, wireframes, accessibility, design systems
- `quality-analyst` - Unit tests, integration tests, E2E tests, test strategy
- `deployment-engineer` - CI/CD pipelines, build optimization, infrastructure
- `maintenance-engineer` - Bug fixes, refactoring, dependency updates, technical debt
- `production-support-engineer` - Incident response, monitoring, production debugging

**Framework Specialists (6):**
- `typescript-library-specialist` - Library APIs, dual ESM/CJS exports, NPM publishing
- `nextjs-ssr-specialist` - App Router, Server Components, Server Actions, metadata
- `react-router-spa-specialist` - Client routing, TanStack Query, code splitting
- `react-router-ssr-specialist` - SSR loaders, server actions, hydration, SEO
- `tanstack-router-spa-specialist` - Type-safe routing, search params, route generation
- `expo-react-native-specialist` - Expo Router, native modules, EAS Build, mobile perf

### Template-Specific Agents (9 Per Template)

Located in `/templates/[template-name]/agents/`:

Each template includes all 8 SDLC agents + 1 framework specialist for complete self-contained development lifecycle.

## Usage Patterns

### Pattern 1: Single Agent Consultation

**Direct reference with explicit role:**
```
Based on the Requirements Analyst agent defined in 
agents/requirements-analyst.agent.md, analyze the following
feature request:

"Users should be able to upload profile pictures with
automatic resizing and format conversion"

Provide:
1. Functional requirements
2. Non-functional requirements
3. Technical constraints
4. Acceptance criteria
5. Risks and dependencies
```

**Expected Output:**
- Structured requirements document
- Security considerations (file upload)
- Performance requirements (image processing)
- Acceptance criteria (size limits, formats)

### Pattern 2: Sequential Agent Chain

**Multi-stage feature development:**

```
Stage 1: Requirements Analysis
-------------------------
Act as the Requirements Analyst (agents/requirements-analyst.agent.md).
Create a detailed specification for a real-time notification system.

[Wait for and review requirements]

Stage 2: Architecture Design
-------------------------
Now act as the Software Architect (agents/software-architect.agent.md).
Design the architecture for the notification system based on the
requirements above. Include:
- Component breakdown
- Data flow diagram
- Technology recommendations
- ADR (Architectural Decision Record)

[Wait for and review architecture]

Stage 3: Implementation
-------------------------
Now act as the Next.js SSR Specialist 
(agents/nextjs-ssr-specialist.agent.md).
Implement the notification system using:
- Server Components for initial load
- Client Components for real-time updates
- Server Actions for user interactions
Follow the architecture design above.

[Wait for and review implementation]

Stage 4: Testing
-------------------------
Finally, act as the Quality Analyst (agents/quality-analyst.agent.md).
Create a comprehensive test suite for the notification system including:
- Unit tests for components
- Integration tests with MSW
- E2E tests with Playwright
```

### Pattern 3: Context Accumulation

**Build context across conversation:**

```
Conversation Setup:
-------------------
I'm working on the next-ssr template. Please reference:
- agents/nextjs-ssr-specialist.agent.md
- templates/next-ssr/README.md
- AGENTS.md

Now act as the Next.js SSR Specialist.

Task 1: Review my current implementation
[Provide code snippet]

Task 2: Suggest improvements based on repository patterns

Task 3: Implement the improvements
```

### Pattern 4: Multi-Agent Collaboration

**Consult multiple agents in one conversation:**

```
I need to implement a search feature. Let me consult different agents:

@Requirements Analyst: What requirements should I consider for search?
[Requirements Agent persona gives requirements]

@Software Architect: How should I architect this based on requirements?
[Architect Agent persona gives architecture]

@Next.js SSR Specialist: How do I implement this in Next.js?
[Specialist Agent persona gives implementation]

@Quality Analyst: What tests do I need?
[QA Agent persona gives test strategy]
```

## Claude Projects Setup

### Project Configuration

Create a Claude Project for this repository with the following structure:

**Project Name:** Scaffolding Templates Development

**Project Instructions:**
```
This is a scaffolding templates repository with custom sub-agents
for specialized development tasks. When I reference an agent file,
adopt that agent's persona completely.

Key Documents:
- /AGENTS.md - Repository-wide patterns
- /agents/*.agent.md - Individual agent definitions
- /docs/custom-agents-guide.md - Comprehensive agent guide

When acting as an agent:
1. Adopt the agent's role completely
2. Follow processes defined in the agent file
3. Reference repository patterns from AGENTS.md
4. Maintain consistency with template conventions
5. Provide actionable, specific guidance
```

**Project Knowledge (Add these files):**

**Always Include:**
- `AGENTS.md` - Repository patterns
- `README.md` - Repository overview
- `docs/custom-agents-guide.md` - Agent usage guide

**Core Agents (add selectively based on need):**
- `agents/requirements-analyst.agent.md`
- `agents/software-architect.agent.md`
- `agents/implementation-engineer.agent.md`
- `agents/quality-analyst.agent.md`

**Template-Specific (when working on a template):**
- `templates/[name]/README.md`
- `templates/[name]/agents/*.agent.md`
- `templates/[name]/docs/**/*.md`

**Note:** Claude Projects have a knowledge limit. Prioritize agents you use most frequently.

### Example Project Structure

```
Claude Project: "Next.js SSR Development"
├── Knowledge Base:
│   ├── AGENTS.md
│   ├── agents/requirements-analyst.agent.md
│   ├── agents/software-architect.agent.md
│   ├── agents/implementation-engineer.agent.md
│   ├── agents/quality-analyst.agent.md
│   ├── agents/nextjs-ssr-specialist.agent.md
│   ├── templates/next-ssr/README.md
│   └── docs/custom-agents-guide.md
│
└── Instructions:
    "When I reference an agent, adopt that persona completely.
     Follow Next.js App Router best practices and repository patterns."
```

## Best Practices

### 1. Explicit Agent Reference

✅ **Good - Clear agent reference:**
```
Act as the Requirements Analyst (agents/requirements-analyst.agent.md).

Analyze this feature request: [description]
```

❌ **Bad - Vague reference:**
```
Can you help me with requirements?
```

### 2. Provide Context

✅ **Good - Complete context:**
```
Context:
- Template: next-ssr
- Current file: app/dashboard/page.tsx
- Goal: Add real-time data updates
- Constraints: Must work with Server Components

As the Next.js SSR Specialist, how should I implement this?
```

❌ **Bad - Insufficient context:**
```
How do I add real-time updates?
```

### 3. Chain Agents Explicitly

✅ **Good - Clear handoff:**
```
Step 1: Requirements Analyst - Create specification
[Wait for completion, review output]

Step 2: Software Architect - Design based on above specification
[Reference previous output explicitly]

Step 3: Implementation Engineer - Implement based on above design
```

❌ **Bad - Unclear handoff:**
```
Can you do requirements, design, and implementation?
```

### 4. Maintain Agent Context

✅ **Good - Maintain persona:**
```
You are currently acting as the Quality Analyst.

Based on the implementation in the previous message,
create a comprehensive test suite.
```

❌ **Bad - Context switch:**
```
[After QA discussion] Now write some deployment code.
```

### 5. Reference Documentation

✅ **Good - Explicit references:**
```
As the Software Architect, design this feature following:
- Patterns in AGENTS.md
- State management hierarchy from docs/
- Next.js conventions from templates/next-ssr/
```

❌ **Bad - Assume knowledge:**
```
Design this feature using best practices.
```

## Configuration Files

### project.example.json

See `project.example.json` for a complete Claude Project configuration template you can import.

### Custom Instructions

Add these to your Claude project custom instructions:

```markdown
# Agent Adoption Protocol

When I reference an agent file (e.g., "act as the Requirements Analyst"), you should:

1. **Adopt Full Persona**: Embody the agent's role completely
2. **Follow Process**: Use the agent's defined workflow
3. **Apply Expertise**: Leverage the agent's specialized knowledge
4. **Reference Patterns**: Follow repository patterns from AGENTS.md
5. **Maintain Consistency**: Align with template conventions
6. **Provide Quality**: Meet the agent's quality checklist

## Agent Files

All agent files are in `/agents/` directory with `.agent.md` extension.

## Repository Context

- **SDLC Coverage**: 8 phase agents (requirements → production)
- **Framework Specialists**: 6 template-specific experts
- **Template Structure**: Each template is self-contained
- **Testing Strategy**: 3-tier testing (unit, integration, E2E)
- **Package Manager**: pnpm throughout
- **Type Safety**: TypeScript with strict configuration
```

## Troubleshooting

### Issue: Agent Context Not Working

**Symptoms:** Claude doesn't follow agent patterns or gives generic advice

**Solutions:**
1. **Explicitly upload agent file:** Add to project knowledge or upload in conversation
2. **Reference by full path:** Use exact path like `agents/requirements-analyst.agent.md`
3. **Restate agent role:** Remind Claude which agent it's acting as
4. **Provide AGENTS.md context:** Ensure repository patterns are available
5. **Quote agent instructions:** Copy key sections from agent file into prompt

**Example Fix:**
```
I need you to act as the Requirements Analyst. Here's the role definition:

[Paste key sections from requirements-analyst.agent.md]

Now, with this context, analyze the following feature...
```

### Issue: Agent Switches Personas

**Symptoms:** Claude loses agent context mid-conversation

**Solutions:**
1. **Reaffirm persona:** "Remember, you are the Quality Analyst..."
2. **Reference previous context:** "As the QA agent recommended earlier..."
3. **Use conversation branches:** Start fresh conversation for different agents
4. **Project per template:** Create separate Claude Projects for each template
5. **Explicit state management:** Keep agent role in conversation notes

**Example Fix:**
```
Continuing as the Quality Analyst agent 
(agents/quality-analyst.agent.md), review the test coverage...
```

### Issue: Can't Access Agent Files

**Symptoms:** Claude can't read agent definitions

**Solutions:**
1. **Upload files directly:** Drag and drop `.agent.md` files into conversation
2. **Add to project knowledge:** Configure Claude Project with agent files
3. **Copy content inline:** Paste agent definition directly in prompt
4. **Use Claude Projects:** Set up dedicated project with all agents
5. **Share via artifacts:** Create artifact with agent definitions

**Example Fix:**
```
Here's the agent definition:

[Paste entire requirements-analyst.agent.md content]

Now act as this agent and analyze...
```

### Issue: Generic Responses

**Symptoms:** Responses don't match repository patterns

**Solutions:**
1. **Include AGENTS.md:** Upload repository pattern documentation
2. **Provide examples:** Show existing code that follows patterns
3. **Reference specific patterns:** Point to exact sections in documentation
4. **Template context:** Include template README and docs
5. **Iterate with feedback:** Correct deviations and ask agent to revise

**Example Fix:**
```
The response should follow the patterns defined in AGENTS.md,
specifically the state management hierarchy. Here's the relevant section:

[Paste state management section]

Please revise the implementation to follow these patterns.
```

### Issue: Agent Overwhelm

**Symptoms:** Using too many agents causes confusion

**Solutions:**
1. **One agent at a time:** Complete one agent's work before switching
2. **Clear handoffs:** Explicitly transition between agents
3. **Separate conversations:** Use different chat threads for different agents
4. **Document transitions:** Keep notes on what each agent produced
5. **Sequential workflow:** Follow the SDLC sequence

**Example Fix:**
```
Stage 1 Complete: Requirements [Link to output]
---
Now starting Stage 2 with new agent

Act as the Software Architect...
[Fresh context for new agent]
```

## Advanced Patterns

### Pattern: Agent as Code Reviewer

```
I've implemented a feature. Act as the Software Architect
(agents/software-architect.agent.md) and review my code
against repository patterns.

Code to review:
[Paste code]

Check for:
1. Pattern adherence (AGENTS.md)
2. Architecture violations
3. Improvement opportunities
4. Technical debt risks
```

### Pattern: Agent Consultation Panel

```
I need multiple perspectives on this decision:

Question: Should I use Context API or Zustand for global state?

Perspective 1 - Software Architect:
[Architect agent evaluates architectural implications]

Perspective 2 - Next.js Specialist:
[Specialist evaluates framework-specific considerations]

Perspective 3 - Implementation Engineer:
[Engineer evaluates practical implementation concerns]

Now synthesize the recommendations.
```

### Pattern: Agent-Guided Refactoring

```
Stage 1: Assessment
Act as the Maintenance Engineer. Analyze this codebase section
for refactoring opportunities.

Stage 2: Architecture Review
Now as the Software Architect, design the refactored architecture.

Stage 3: Implementation Plan
As the Implementation Engineer, create step-by-step refactoring plan.

Stage 4: Test Strategy
As the Quality Analyst, define tests to ensure no regression.
```

### Pattern: Learning from Other Templates

```
I'm working on the Next.js template but want to learn patterns
from the React Router template.

As the Software Architect:
1. Review authentication pattern in templates/react-router-v7-ssr/
2. Identify patterns applicable to Next.js
3. Adapt patterns to Next.js App Router
4. Highlight framework-specific differences
```

## Integration with Claude Desktop

### Keyboard Shortcuts

When using Claude Desktop with agent files:

- **`Cmd/Ctrl+K`** - Reference files (use to quickly reference agent files)
- **`Cmd/Ctrl+Shift+O`** - Open project files
- **`Cmd/Ctrl+/`** - Toggle markdown formatting

### File References

Reference agent files inline:

```
@agents/requirements-analyst.agent.md create specification for this feature
```

Claude Desktop will load and use the file content as context.

### Project Switching

Create multiple projects for different templates:

- **Project: "Next.js Development"** - Next.js agents and docs
- **Project: "React Router Development"** - React Router agents and docs
- **Project: "TypeScript Library"** - Library development agents and docs

Switch between projects based on current work.

## Resources

- **Main Guide:** `/docs/custom-agents-guide.md` - Comprehensive agent usage guide
- **Repository Patterns:** `/AGENTS.md` - Repository-wide development guidelines
- **Agent Definitions:** `/agents/*.agent.md` - Individual agent capabilities
- **Template Docs:** `/templates/[name]/README.md` - Template-specific instructions
- **Example Config:** `.claude/project.example.json` - Claude Project configuration

## Example Workflows

### Workflow 1: New Feature Development

```markdown
# Conversation Setup
I'm developing a user dashboard feature for the next-ssr template.

Context files needed:
- agents/requirements-analyst.agent.md
- agents/software-architect.agent.md
- agents/nextjs-ssr-specialist.agent.md
- agents/quality-analyst.agent.md
- AGENTS.md

# Stage 1: Requirements
Act as Requirements Analyst. Create specification for user dashboard
with widgets, customization, and real-time data.

[Wait, review requirements doc]

# Stage 2: Architecture
Act as Software Architect. Design architecture based on above requirements.
Include component hierarchy and state management.

[Wait, review architecture]

# Stage 3: Implementation
Act as Next.js SSR Specialist. Implement dashboard using:
- Server Components for initial layout
- Client Components for interactive widgets
- Server Actions for customization persistence

[Wait, review implementation]

# Stage 4: Testing
Act as Quality Analyst. Create test suite covering all functionality.

[Complete]
```

### Workflow 2: Bug Investigation

```markdown
# Issue
Production bug: Users report dashboard not loading on mobile devices

# Investigation
Act as Production Support Engineer (agents/production-support-engineer.agent.md)

Analyze:
1. Error logs: [paste logs]
2. User agent: Mobile Safari
3. Network conditions: 3G connection
4. Error message: "Chunk load failed"

[Wait for analysis]

# Fix Implementation
Act as Maintenance Engineer (agents/maintenance-engineer.agent.md)

Based on the analysis, implement fix with:
1. Proper error boundaries
2. Lazy loading fallbacks
3. Network resilience

[Wait for fix]

# Testing
Act as Quality Analyst (agents/quality-analyst.agent.md)

Create regression tests for mobile scenarios.
```

### Workflow 3: Architecture Review

```markdown
# Context
Reviewing authentication implementation in next-ssr template

# Review Request
Act as Software Architect (agents/software-architect.agent.md)

Review the following implementation:

File: app/auth/login/page.tsx
[paste code]

File: services/authService.ts
[paste code]

Evaluate:
1. Alignment with AGENTS.md patterns
2. Next.js best practices
3. Security considerations
4. State management approach
5. Error handling strategy

Provide:
1. Issues identified (with severity)
2. Recommended changes
3. Updated ADR if needed
```

## Tips for Success

1. **Upload Agent Files:** Always include relevant agent files in project knowledge or conversation
2. **Be Explicit:** Clearly state which agent you want Claude to act as
3. **Provide Context:** Include repository patterns, template docs, and existing code
4. **Sequential Work:** Complete one agent's work before moving to the next
5. **Reference Output:** When chaining agents, explicitly reference previous agent's output
6. **Maintain Persona:** Remind Claude of agent role if context slips
7. **Use Projects:** Set up dedicated Claude Projects for templates you work on frequently
8. **Document Handoffs:** Keep notes on what each agent produced
9. **Iterate:** Refine agent responses by providing feedback
10. **Learn Patterns:** Understand why agents recommend certain approaches

---

**Happy building with Claude agents! 🤖**

For more information, see the [comprehensive custom agents guide](/docs/custom-agents-guide.md).
