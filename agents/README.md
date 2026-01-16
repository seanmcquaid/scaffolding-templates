# Custom Agents for Scaffolding Templates

This directory contains the **base set of custom agents** that follow the Software Development Life Cycle (SDLC). These agents provide general development lifecycle expertise that applies across all templates and are compatible with GitHub Copilot, Claude, Cursor, and other AI assistants.

## Repository Structure

The custom agents are organized into two locations:

### 1. Root Agents (This Directory)
**Location**: `/agents/`

Base SDLC agents that work across all templates:
- Requirements Analysis
- Design & Architecture  
- Implementation
- Testing
- Deployment
- Maintenance

### 2. Template-Specific Agents
**Location**: `/templates/[template-name]/agents/`

Each template has its own specialized agent:
- `typescript-library` - TypeScript library development specialist
- `next-ssr` - Next.js SSR specialist
- `react-router-v7-spa` - React Router v7 SPA specialist
- `react-router-v7-ssr` - React Router v7 SSR specialist
- `tanstack-router-spa` - TanStack Router specialist
- `expo-react-native` - Expo React Native specialist

## Overview

Custom agents are specialized AI assistants with tailored expertise for specific development tasks. They have access to the repository's AGENTS.md documentation and are designed to maintain consistency across all templates while respecting framework-specific best practices.

**Cross-Tool Compatibility**: These agents are stored in the `/agents/` directory (not `.github/agents/`) to ensure they can be referenced by multiple AI tools including GitHub Copilot, Claude, Cursor, and others.

## SDLC Phase Agents

These agents cover the complete software development lifecycle:

### 1. Requirements Analysis Agent
**File**: `requirements-analyst.agent.md`

Translates user requirements into clear, actionable technical specifications that align with repository patterns.

**Use for:**
- Analyzing feature requests
- Breaking down user stories
- Creating technical specifications
- Defining acceptance criteria
- Identifying dependencies and risks

### 2. Design & Architecture Agent
**File**: `design-architect.agent.md`

Creates scalable, maintainable architectures following modern best practices.

**Use for:**
- Architectural design decisions
- Creating ADRs (Architectural Decision Records)
- Component hierarchy design
- API design and contracts
- Technology selection

### 3. Implementation Engineer Agent
**File**: `implementation-engineer.agent.md`

Writes production-ready code following established patterns and best practices.

**Use for:**
- Feature implementation
- Following template-specific patterns
- Writing clean, maintainable code
- Ensuring TypeScript type safety
- Implementing i18n requirements

### 4. Testing Specialist Agent
**File**: `testing-specialist.agent.md`

Creates comprehensive tests following the three-tier testing strategy.

**Use for:**
- Unit test creation
- Integration tests with MSW
- E2E tests with Playwright
- Test coverage improvement
- Testing strategy implementation

### 5. Deployment Engineer Agent
**File**: `deployment-engineer.agent.md`

Handles deployment, infrastructure, and DevOps concerns.

**Use for:**
- CI/CD pipeline setup
- Build optimization
- Deployment configuration
- Environment variable management
- Performance monitoring

### 6. Maintenance Engineer Agent
**File**: `maintenance-engineer.agent.md`

Handles ongoing maintenance, bug fixes, and improvements.

**Use for:**
- Bug investigation and fixing
- Dependency updates
- Code refactoring
- Technical debt management
- Security updates

## Template-Specific Agents

Each template has its own specialized agent located in `/templates/[template-name]/.github/agents/`. These agents provide deep expertise for their specific framework and are available when working within that template.

### Available Template Agents

1. **TypeScript Library Specialist** (`/templates/typescript-library/.github/agents/`)
   - Library API design, dual ESM/CJS exports, NPM publishing

2. **Next.js SSR Specialist** (`/templates/next-ssr/.github/agents/`)
   - App Router, Server Components, Server Actions, SEO

3. **React Router v7 SPA Specialist** (`/templates/react-router-v7-spa/.github/agents/`)
   - Client-side routing, TanStack Query, URL state management

4. **React Router v7 SSR Specialist** (`/templates/react-router-v7-ssr/.github/agents/`)
   - SSR loaders, server actions, hydration strategies

5. **TanStack Router SPA Specialist** (`/templates/tanstack-router-spa/.github/agents/`)
   - Type-safe routing, search parameter validation

6. **Expo React Native Specialist** (`/templates/expo-react-native/.github/agents/`)
   - Cross-platform mobile, Expo SDK, native modules

To use a template-specific agent, navigate to the template directory or select it when the agent dropdown shows available agents for your workspace.
- TanStack Query integration
- URL state management
- Code splitting strategies
- Progressive enhancement

### React Router v7 SSR Specialist
**File**: `react-router-ssr-specialist.agent.md`

Expert in React Router v7 with server-side rendering.

**Use for:**
- Server-side rendering
- Data loaders and server actions
- Hydration strategies
- Progressive enhancement
- SEO optimization

### TanStack Router SPA Specialist
**File**: `tanstack-router-spa-specialist.agent.md`

Expert in TanStack Router with type-safe routing.

**Use for:**
- Type-safe routing
- Search parameter management
- Route code generation
- TanStack Query integration
- Type-safe navigation

### Expo React Native Specialist
**File**: `expo-react-native-specialist.agent.md`

Expert in Expo and React Native for cross-platform mobile development.

**Use for:**
- Expo Router navigation
- Native module integration
- Platform-specific code
- Mobile performance optimization
- EAS Build and deployment

## How to Use Custom Agents

### On GitHub.com

1. Navigate to the [Agents tab](https://github.com/copilot/agents)
2. Select your repository from the dropdown
3. Choose the appropriate agent for your task:
   - **Base SDLC agents** for general development tasks
   - **Template-specific agents** when working within a specific template
4. Provide your requirements or task description
5. The agent will work with the repository following its specialized expertise

### In Your IDE (VS Code, JetBrains, etc.)

1. Open GitHub Copilot Chat
2. Click the agents dropdown
3. Select the custom agent you need:
   - Open the root directory to see **base SDLC agents**
   - Open a template directory to see **template-specific agents**
4. Start a conversation with the agent about your task

### When to Use Which Agent

**Starting a New Feature in a Template:**
1. Start with **Requirements Analysis Agent** (base) to document requirements
2. Use **Design & Architecture Agent** (base) to create the design
3. Switch to the **Template-Specific Agent** for implementation guidance
4. Use **Implementation Engineer Agent** (base) or template agent to write code
5. Use **Testing Specialist Agent** (base) to create tests
6. Employ **Deployment Engineer Agent** (base) for deployment setup

**Working on Template-Specific Code:**
- Use the corresponding **template specialist agent** for framework-specific guidance
- Example: Use `nextjs-ssr-specialist` when working in `/templates/next-ssr/`

**General Development Tasks:**
- Use **base SDLC agents** for cross-template concerns

**Fixing Bugs:**
- Use **Maintenance Engineer Agent** for investigation and fixes

**Improving Test Coverage:**
- Use **Testing Specialist Agent** specifically

**Optimizing Performance:**
- Use **Deployment Engineer Agent** for infrastructure and build optimization
- Use template specialists for code-level optimizations

## Best Practices

1. **Combine Agents**: Use base SDLC agents in sequence, then template agents for specifics
2. **Context Matters**: Provide clear context about which template you're working with
3. **Location-Based Selection**: 
   - Work from root for base agents
   - Work from template directory for template-specific agents
4. **Reference Documentation**: Agents automatically reference AGENTS.md files
5. **Iterative Approach**: requirements → design → template-specific implementation → testing → deployment

## Agent Capabilities

All agents have access to:
- Repository-wide `/AGENTS.md` guidelines
- Template-specific `/templates/[name]/AGENTS.md` patterns
- Template documentation in `/templates/[name]/docs/`
- Existing ADRs and architectural decisions

They can:
- Read and search code
- Create and edit files
- Execute bash commands
- Search across the repository
- Reference best practices and patterns

## Maintenance

These agents are version-controlled in the repository. When updating:
- Keep agents in sync with AGENTS.md documentation
- Update template specialists when template patterns change
- Maintain consistency in agent structure and format
- Test agents after significant changes

## Feedback and Improvements

If you encounter issues or have suggestions for improving these agents:
1. Open an issue describing the problem or suggestion
2. Reference the specific agent(s) involved
3. Provide examples of what worked well or didn't work
4. Suggest improvements to agent prompts or capabilities

## Additional Resources

- [GitHub Copilot Custom Agents Documentation](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- Repository `/AGENTS.md` - Overall repository guidelines
- Template-specific `AGENTS.md` files - Framework-specific patterns
- Template documentation in `/docs` directories
