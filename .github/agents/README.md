# Custom Agents for Scaffolding Templates

This directory contains custom GitHub Copilot agents that follow the Software Development Life Cycle (SDLC) and provide specialized expertise for each template in the repository.

## Overview

Custom agents are specialized AI assistants with tailored expertise for specific development tasks. They have access to the repository's AGENTS.md documentation and are designed to maintain consistency across all templates while respecting framework-specific best practices.

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

These agents provide specialized knowledge for each template:

### TypeScript Library Specialist
**File**: `typescript-library-specialist.agent.md`

Expert in TypeScript library development with dual ESM/CJS exports.

**Use for:**
- Library API design
- Package configuration
- Tree-shaking optimization
- NPM publishing workflow
- Type definition management

### Next.js SSR Specialist
**File**: `nextjs-ssr-specialist.agent.md`

Expert in Next.js App Router with Server Components and Server Actions.

**Use for:**
- Server Component architecture
- Server Actions for mutations
- Metadata management for SEO
- Caching strategies
- Streaming with Suspense

### React Router v7 SPA Specialist
**File**: `react-router-spa-specialist.agent.md`

Expert in React Router v7 single-page applications.

**Use for:**
- Client-side routing
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
3. Choose the appropriate agent for your task
4. Provide your requirements or task description
5. The agent will work with the repository following its specialized expertise

### In Your IDE (VS Code, JetBrains, etc.)

1. Open GitHub Copilot Chat
2. Click the agents dropdown
3. Select the custom agent you need
4. Start a conversation with the agent about your task

### When to Use Which Agent

**Starting a New Feature:**
1. Start with **Requirements Analysis Agent** to understand and document requirements
2. Use **Design & Architecture Agent** to create the design
3. Have **Implementation Engineer Agent** write the code
4. Use **Testing Specialist Agent** to create tests
5. Employ **Deployment Engineer Agent** for deployment setup

**Working on Template-Specific Code:**
- Use the corresponding template specialist agent (e.g., **Next.js SSR Specialist** for Next.js work)

**Fixing Bugs:**
- Use **Maintenance Engineer Agent** for investigation and fixes

**Improving Test Coverage:**
- Use **Testing Specialist Agent** specifically

**Optimizing Performance:**
- Use **Deployment Engineer Agent** for infrastructure and build optimization
- Use template specialists for code-level optimizations

## Best Practices

1. **Combine Agents**: Use SDLC agents in sequence for complete features
2. **Context Matters**: Provide clear context about what you're working on
3. **Template Awareness**: Always mention which template you're working with
4. **Reference Documentation**: Agents will automatically reference AGENTS.md files
5. **Iterative Approach**: Use agents iteratively - requirements → design → implementation → testing → deployment

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
