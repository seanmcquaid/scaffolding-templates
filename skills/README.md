# Shared Skills for Scaffolding Templates

This directory contains standardized agent skills following the [Agent Skills specification](https://agentskills.io). These skills work with GitHub Copilot and 20+ other AI coding agents that support the skills format.

## Repository Structure

All skills are available in two locations for maximum flexibility:

### 1. Root Skills (This Directory)
**Location**: `/skills/`

All 14 skills (8 SDLC + 6 template specialists) available for repository-wide access.

### 2. Template Skills (Self-Contained)
**Location**: `/templates/[template-name]/skills/`

Each template contains **9 skills** (8 SDLC + 1 template specialist) to ensure templates are self-contained when cloned individually.

## Why Duplicate Skills?

Templates are designed to be cloned individually. By including all skills in each template:
- **Self-contained**: Each template has everything needed to work independently
- **Cross-reference**: Developers can learn from other framework patterns
- **Complete lifecycle**: All SDLC phase skills available in every template
- **No dependencies**: No need to reference parent repository

## What are Agent Skills?

Agent skills are reusable instruction sets that extend your coding agent's capabilities. They're defined in `SKILL.md` files with YAML frontmatter containing a `name` and `description`.

Skills let agents perform specialized tasks like:
- Analyzing requirements and creating technical specifications
- Designing architecture following best practices
- Implementing features with framework-specific patterns
- Creating comprehensive test suites
- Managing deployments and production operations

## Available Skills

### SDLC Phase Skills (8 skills)

Complete software development lifecycle coverage:

1. **[requirements-analysis](./requirements-analysis/SKILL.md)** - Translate user needs into technical specifications
2. **[software-architecture](./software-architecture/SKILL.md)** - Design scalable, maintainable architectures
3. **[implementation-engineering](./implementation-engineering/SKILL.md)** - Write production-ready code
4. **[ui-ux-design](./ui-ux-design/SKILL.md)** - Design accessible, intuitive interfaces
5. **[quality-analysis](./quality-analysis/SKILL.md)** - Create comprehensive tests (unit, integration, E2E)
6. **[deployment-engineering](./deployment-engineering/SKILL.md)** - Manage CI/CD and infrastructure
7. **[maintenance-engineering](./maintenance-engineering/SKILL.md)** - Handle bugs, updates, and refactoring
8. **[production-support](./production-support/SKILL.md)** - Monitor and respond to production issues

### Template-Specific Skills (6 skills)

Framework and template expertise:

1. **[typescript-library](./typescript-library/SKILL.md)** - TypeScript library development with dual ESM/CJS exports
2. **[nextjs-ssr](./nextjs-ssr/SKILL.md)** - Next.js App Router with Server Components and Server Actions
3. **[react-router-spa](./react-router-spa/SKILL.md)** - React Router v7 client-side SPA development
4. **[react-router-ssr](./react-router-ssr/SKILL.md)** - React Router v7 server-side rendering
5. **[tanstack-router-spa](./tanstack-router-spa/SKILL.md)** - TanStack Router with type-safe routing
6. **[expo-react-native](./expo-react-native/SKILL.md)** - Expo and React Native mobile development

## Installation

### Using the `skills` CLI

The fastest way to install these skills is using the [skills CLI](https://github.com/vercel-labs/add-skill):

```bash
# Install all skills to GitHub Copilot
npx skills add seanmcquaid/scaffolding-templates --all -a github-copilot

# List available skills
npx skills add seanmcquaid/scaffolding-templates --list

# Install specific skills
npx skills add seanmcquaid/scaffolding-templates --skill requirements-analysis --skill software-architecture

# Install to specific agents
npx skills add seanmcquaid/scaffolding-templates -a github-copilot -a cursor -a claude-code

# Install globally (available across all projects)
npx skills add seanmcquaid/scaffolding-templates --all -g
```

### Manual Installation

You can also copy skills manually:

```bash
# Project-level (committed with your project)
cp -r skills/* /path/to/your/project/skills/

# For GitHub Copilot specifically
cp -r skills/* /path/to/your/project/.github/skills/

# Global (available across all projects, varies by agent)
# GitHub Copilot
cp -r skills/* ~/.copilot/skills/

# Claude Code
cp -r skills/* ~/.claude/skills/

# Cursor
cp -r skills/* ~/.cursor/skills/
```

**Note**: Skills are stored in `/skills/` (not `.github/skills/`) for cross-tool compatibility. Most agents support discovering skills from the root `skills/` directory. Only GitHub Copilot specifically requires `.github/skills/`, so you may need to create a symlink or copy for that agent.

## Usage

### With GitHub Copilot

1. **In VS Code**: Open Copilot Chat and type `@workspace` followed by your request
2. **On GitHub.com**: Navigate to the [Agents tab](https://github.com/copilot/agents) and select the skill
3. **In Terminal**: Use `gh copilot` CLI with skill context

Example prompts:
```
@workspace Use requirements-analysis to create specs for a user authentication feature

@workspace Use implementation-engineering to implement the login form with React Hook Form

@workspace Use quality-analysis to create tests for the authentication flow

@workspace Use nextjs-ssr to optimize this page's server-side rendering
```

### With Other Agents

These skills work with any agent supporting the [Agent Skills specification](https://agentskills.io):

- **Claude Code** - `.claude/skills/`
- **Cursor** - `.cursor/skills/`
- **Cline** - `.cline/skills/`
- **OpenCode** - `.opencode/skills/`
- And 20+ more agents

## Workflow Examples

### Starting a New Feature

1. **requirements-analysis** - Document requirements and acceptance criteria
2. **software-architecture** - Design component hierarchy and data flow
3. **ui-ux-design** - Create interface specifications
4. **implementation-engineering** - Write the code
5. **quality-analysis** - Create comprehensive tests
6. **deployment-engineering** - Set up CI/CD
7. **production-support** - Configure monitoring

### Working with Templates

Choose the template-specific skill for your project:

```bash
# Next.js project
@workspace Use nextjs-ssr to implement server components for the dashboard

# React Router SPA project
@workspace Use react-router-spa to add URL state management

# TypeScript library project
@workspace Use typescript-library to set up dual package exports

# Expo project
@workspace Use expo-react-native to implement native camera integration
```

### Fixing Production Issues

```bash
# Investigate issue
@workspace Use production-support to analyze these error logs

# Fix the bug
@workspace Use maintenance-engineering to fix this memory leak

# Add tests to prevent recurrence
@workspace Use quality-analysis to add regression tests
```

## Skill Updates

To update skills to the latest version:

```bash
# Check for updates
npx skills check

# Update all skills
npx skills update
```

## Creating Custom Skills

To create your own skills:

```bash
# Initialize a new skill
npx skills init my-custom-skill

# This creates a SKILL.md template:
---
name: my-custom-skill
description: What this skill does and when to use it
---

# My Custom Skill

Instructions for the agent...
```

## Compatibility

These skills are compatible with:

✅ GitHub Copilot
✅ Claude Code  
✅ Cursor
✅ Cline
✅ OpenCode
✅ Windsurf
✅ Continue
✅ And 20+ more agents

## Telemetry

The `skills` CLI collects anonymous usage data to improve the tool. No personal information is collected.

To disable telemetry:
```bash
DISABLE_TELEMETRY=1 npx skills add ...
# or
DO_NOT_TRACK=1 npx skills add ...
```

## Contributing

Skills are version-controlled in this repository. To improve a skill:

1. Edit the `SKILL.md` file
2. Test with your agent
3. Submit a pull request
4. Update version in CHANGELOG

## Related Resources

- [Agent Skills Specification](https://agentskills.io)
- [Skills Directory](https://skills.sh)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Repository AGENTS.md](../AGENTS.md) - CoPilot instructions

## Support

For issues or suggestions:
1. Open an issue in the repository
2. Reference the specific skill involved
3. Provide examples and context
4. Suggest improvements

## License

These skills are part of the scaffolding-templates repository and follow the same license.
