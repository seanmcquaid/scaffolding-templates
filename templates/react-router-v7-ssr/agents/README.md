# Custom Agents

This directory contains custom agents compatible with GitHub Copilot, Claude, Cursor, and other AI assistants. This template includes all SDLC phase agents plus the React Router v7 SSR specialist for complete self-contained functionality.

## Available Agents

### SDLC Phase Agents (8)

General-purpose agents covering the complete software development lifecycle:

1. **Requirements Analysis Agent** (`requirements-analyst.agent.md`)
   - Translates user requirements into technical specifications
   - Creates user stories, acceptance criteria, and technical requirements
   - Identifies constraints, dependencies, and risks

2. **Software Architect** (`software-architect.agent.md`)
   - Creates architectural designs and technical specifications
   - Writes Architecture Decision Records (ADRs)
   - Designs scalable, maintainable system architectures

3. **Implementation Engineer Agent** (`implementation-engineer.agent.md`)
   - Writes production-ready code following established patterns
   - Implements features with proper error handling and validation
   - Follows template-specific conventions and best practices

4. **Quality Analyst** (`quality-analyst.agent.md`)
   - Creates comprehensive test suites (unit, integration, e2e)
   - Implements three-tier testing approach
   - Ensures test quality and coverage

5. **Deployment Engineer Agent** (`deployment-engineer.agent.md`)
   - Handles CI/CD pipeline configuration
   - Manages infrastructure and deployment concerns
   - Implements monitoring and observability

6. **Maintenance Engineer Agent** (`maintenance-engineer.agent.md`)

7. **UI/UX Designer** (`ui-ux-designer.agent.md`)
   - Designs intuitive user interfaces and experiences
   - Creates wireframes, prototypes, and design specifications
   - Ensures accessibility (WCAG 2.1 AA) and usability

8. **Production Support Engineer** (`production-support-engineer.agent.md`)
   - Handles production issues and incident response
   - Implements monitoring and alerting systems
   - Optimizes system reliability and performance
   - Handles bug fixes and debugging
   - Manages dependency updates
   - Performs refactoring and code improvements

### Template Specialist Agent (1)

Framework-specific expert for this template:

1. **React Router v7 SSR Specialist** (`react-router-ssr-specialist.agent.md`)
   - Server-side rendering with loaders and actions
   - Hydration strategies and patterns
   - Full-stack React patterns
   - Data mutations with server actions
   - Progressive enhancement

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
- Use the React Router v7 SSR specialist agent for this template

## Agent Capabilities

Each agent:
- References repository and template-specific `AGENTS.md` documentation
- Provides patterns, examples, and quality checklists
- Has appropriate tool access (read/search/edit/create/bash)
- Maintains consistency while respecting framework-specific conventions

## Self-Contained Template

This template includes all necessary agents to ensure that when you clone it:
- You have access to all 8 SDLC phase agents
- You have the React Router v7 SSR specialist agent
- The template is fully self-contained and functional

## Template Documentation

For template-specific patterns and guidelines, refer to:
- Template `AGENTS.md` - Template-specific patterns and conventions
- Template `README.md` - Setup, usage, and project structure
- Root `/AGENTS.md` - Repository-wide guidelines (if available)
