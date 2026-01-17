# Custom Agents

This directory contains custom agents compatible with GitHub Copilot, Claude, Cursor, and other AI assistants. This template includes all SDLC phase agents plus the React Router v7 SPA specialist for complete self-contained functionality.

## Available Agents

### SDLC Phase Agents (6)

General-purpose agents covering the complete software development lifecycle:

1. **Requirements Analysis Agent** (`requirements-analyst.agent.md`)
   - Translates user requirements into technical specifications
   - Creates user stories, acceptance criteria, and technical requirements
   - Identifies constraints, dependencies, and risks

2. **Design & Architecture Agent** (`design-architect.agent.md`)
   - Creates architectural designs and technical specifications
   - Writes Architecture Decision Records (ADRs)
   - Designs scalable, maintainable system architectures

3. **Implementation Engineer Agent** (`implementation-engineer.agent.md`)
   - Writes production-ready code following established patterns
   - Implements features with proper error handling and validation
   - Follows template-specific conventions and best practices

4. **Testing Specialist Agent** (`testing-specialist.agent.md`)
   - Creates comprehensive test suites (unit, integration, e2e)
   - Implements three-tier testing approach
   - Ensures test quality and coverage

5. **Deployment Engineer Agent** (`deployment-engineer.agent.md`)
   - Handles CI/CD pipeline configuration
   - Manages infrastructure and deployment concerns
   - Implements monitoring and observability

6. **Maintenance Engineer Agent** (`maintenance-engineer.agent.md`)
   - Handles bug fixes and debugging
   - Manages dependency updates
   - Performs refactoring and code improvements

### Template Specialist Agent (1)

Framework-specific expert for this template:

1. **React Router v7 SPA Specialist** (`react-router-spa-specialist.agent.md`)
   - Client-side routing patterns
   - TanStack Query integration for data fetching
   - Progressive enhancement strategies
   - Route-based code splitting
   - SPA navigation patterns

## Using These Agents

### In Your IDE or AI Tool
1. Open this template in your IDE or AI tool (GitHub Copilot, Claude, Cursor, etc.)
2. Reference the appropriate agent by name
3. Ask questions or request help for your specific task

### On GitHub.com
1. Navigate to https://github.com/copilot/agents
2. Select this repository
3. Choose the appropriate agent
4. Provide your requirements

## Choosing the Right Agent

**For project lifecycle tasks:**
- Use SDLC phase agents (requirements, design, implementation, testing, deployment, maintenance)

**For framework-specific questions:**
- Use the React Router v7 SPA specialist agent for this template

## Agent Capabilities

Each agent:
- References repository and template-specific `AGENTS.md` documentation
- Provides patterns, examples, and quality checklists
- Has appropriate tool access (read/search/edit/create/bash)
- Maintains consistency while respecting framework-specific conventions

## Self-Contained Template

This template includes all necessary agents to ensure that when you clone it:
- You have access to all 6 SDLC phase agents
- You have the React Router v7 SPA specialist agent
- The template is fully self-contained and functional

## Template Documentation

For template-specific patterns and guidelines, refer to:
- Template `AGENTS.md` - Template-specific patterns and conventions
- Template `README.md` - Setup, usage, and project structure
- Root `/AGENTS.md` - Repository-wide guidelines (if available)
