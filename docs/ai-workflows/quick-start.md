# AI Workflow Quick Start Guide

Get started with AI-driven development workflows in 5 minutes.

## Overview

This repository uses automated AI workflows to maintain code quality, discover new concepts, and ensure comprehensive test coverage. This guide will help you start using these workflows immediately.

## For Contributors

### 1. Understanding AI Code Reviews

When you open a pull request, an AI agent will automatically:
- Analyze your changes
- Tag relevant specialist agents
- Post initial review comments
- Add appropriate labels

**What you should do**:
1. Read the AI-generated review carefully
2. Address legitimate concerns in your code
3. Reply to comments if you disagree
4. Tag specific agents for specialized feedback

**Example**:
```
@quality-analyst Can you review the test coverage for this component?
@react-router-spa-specialist Does this follow the template's patterns?
```

### 2. Working with AI-Generated Issues

Every week, AI agents scan the codebase and create issues for:
- New concepts and technologies to explore
- Test coverage gaps that need attention

**Look for issues with labels**:
- `ai-generated` - Created by AI workflows
- `concept-proposal` - New feature or technology suggestions
- `coverage-gap` - Test coverage improvements needed

**How to respond**:
1. Review the issue description
2. Validate if the suggestion is valuable
3. Tag appropriate agents for help
4. Create implementation plan using "plan mode"
5. Implement and test changes

### 3. Using Plan Mode

**Always start with planning before implementing**. This is the "Ralph is a loop" approach.

**Step 1: Analyze** (Use @requirements-analyst)
```
@requirements-analyst Analyze this requirement and break it down into
actionable tasks...
```

**Step 2: Design** (Use @software-architect)
```
@software-architect Design the architecture for this feature...
```

**Step 3: Implement** (Use template specialist)
```
@react-router-spa-specialist Implement this feature following the design...
```

**Step 4: Test** (Use @quality-analyst)
```
@quality-analyst Create comprehensive tests for this implementation...
```

## For Maintainers

### Setting Up Workflows

The workflows are already configured in `.github/workflows/`:

1. **ai-code-review.yml** - Runs on every PR
2. **ai-concept-discovery.yml** - Runs weekly (Monday 9 AM UTC)
3. **ai-test-coverage.yml** - Runs weekly (Monday 10 AM UTC)

### Configuring Workflows

Edit workflow files to customize:

```yaml
env:
  MIN_COVERAGE_THRESHOLD: 80  # Adjust coverage threshold
  AGENT_AUTO_TAG: true        # Enable/disable auto-tagging
```

Adjust schedule:
```yaml
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
```

### Monitoring Workflows

**View workflow runs**:
1. Go to Actions tab in GitHub
2. Select the workflow you want to view
3. Review logs and outputs

**Check AI-generated issues**:
1. Go to Issues tab
2. Filter by label: `ai-generated`
3. Review and prioritize issues

### Managing Agent Behavior

All agents follow guidelines in `/AGENTS.md`. To modify agent behavior:

1. Update `/AGENTS.md` for repository-wide patterns
2. Update `/agents/[agent-name].agent.md` for specific agent instructions
3. Update template-specific `AGENTS.md` for template patterns

## Common Workflows

### Scenario 1: Fixing a Bug

```
@maintenance-engineer Please analyze this bug and suggest a fix.

Bug description: [describe the bug]
Steps to reproduce: [list steps]
Expected behavior: [describe expected]
Actual behavior: [describe actual]
```

### Scenario 2: Adding a Feature

```
@requirements-analyst Analyze this feature request:
[describe feature]

Questions:
1. What are the technical requirements?
2. Which templates are affected?
3. What are the dependencies?
4. What are the acceptance criteria?
```

Then follow with:
```
@software-architect Based on the requirements analysis, design the
architecture for this feature.
```

### Scenario 3: Improving Tests

```
@quality-analyst Review test coverage for [template-name] and identify
gaps in the following areas:
1. Unit test coverage
2. Integration test scenarios
3. Edge cases and error handling

Please provide specific test cases to add.
```

### Scenario 4: Updating Dependencies

```
@deployment-engineer Plan the upgrade of [dependency] from v1 to v2
across all templates.

Considerations:
1. Breaking changes
2. Migration effort per template
3. Testing strategy
4. Rollback plan
```

## Quick Reference

### Available Agents

**SDLC Phase Agents**:
- `@requirements-analyst` - Analyze and document requirements
- `@software-architect` - Design architecture and patterns
- `@implementation-engineer` - Write production code
- `@ui-ux-designer` - Design user interfaces
- `@quality-analyst` - Create and improve tests
- `@deployment-engineer` - Handle deployment and infrastructure
- `@maintenance-engineer` - Fix bugs and refactor
- `@production-support-engineer` - Handle production issues

**Template Specialists**:
- `@typescript-library-specialist` - TypeScript library expertise
- `@nextjs-ssr-specialist` - Next.js SSR expertise
- `@react-router-spa-specialist` - React Router SPA expertise
- `@react-router-ssr-specialist` - React Router SSR expertise
- `@tanstack-router-spa-specialist` - TanStack Router expertise
- `@expo-react-native-specialist` - Expo React Native expertise

### Workflow Labels

- `ai-generated` - Created by AI workflow
- `ai-review` - Has AI code review
- `concept-proposal` - New concept suggestion
- `coverage-gap` - Test coverage improvement needed
- `template:*` - Specific template affected

### Useful Commands

```bash
# Run tests with coverage
pnpm test:coverage

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Build all templates
pnpm build

# Run specific template tests
pnpm --filter react-router-v7-spa test
```

## Best Practices

1. **Always use plan mode** - Plan before implementing
2. **Tag the right agents** - Use specialists for their expertise
3. **Provide context** - Give agents enough information
4. **Iterate based on feedback** - Refine your approach
5. **Validate AI output** - Always review and test
6. **Document decisions** - Keep ADRs and docs updated

## Getting Help

### Documentation
- [Full AI Workflows Guide](/docs/ai-workflows/README.md)
- [Usage Examples](/docs/ai-workflows/examples.md)
- [Custom Agents Guide](/agents/README.md)

### Support
- Open an issue with `workflow-automation` label
- Tag `@seanmcquaid` for maintainer help
- Check [GitHub Actions docs](https://docs.github.com/en/actions)

## Next Steps

1. ✅ Read this quick start (you're here!)
2. ✅ Review AI-generated issues with `ai-generated` label
3. ✅ Try tagging an agent in a comment
4. ✅ Read the [full workflows guide](/docs/ai-workflows/README.md)
5. ✅ Review [usage examples](/docs/ai-workflows/examples.md)

---

**Happy coding with AI! 🤖✨**
