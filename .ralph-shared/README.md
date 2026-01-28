# Shared Ralph Plans

This directory contains **shared Ralph plans** that are committed to git for team collaboration and distributed AI agent access.

## What are Shared Plans?

Shared plans are Ralph workflow plans that are:
- ✅ **Committed to git** - Tracked in version control
- ✅ **Team-accessible** - All team members can view and edit
- ✅ **AI agent compatible** - Distributed AI agents can access these plans
- ✅ **Formally tracked** - Part of the repository's development history

## When to Use Shared Plans

Use shared plans when:
- **Team collaboration** is needed
- **Distributed AI agents** need to access the plan
- **Formal planning** that should be tracked in git
- **Complex tasks** requiring multiple team members or agents
- **Cross-template work** that affects multiple areas

## Creating Shared Plans

```bash
# Create a new shared plan
./scripts/ralph.sh plan "Task description" --shared

# Or share an existing local plan
./scripts/ralph.sh share my-plan.md
```

## Shared vs Local Plans

| Aspect | Shared Plans (.ralph-shared/) | Local Plans (.ralph/) |
|--------|------------------------------|----------------------|
| **Storage** | Committed to git | Git-ignored |
| **Visibility** | Team-wide | Personal only |
| **Use Case** | Team collaboration | Individual work |
| **AI Agent Access** | Full access | No access |
| **Version Control** | Tracked | Not tracked |

## Best Practices

### ✅ Do's

- **Use for team tasks** - Any work requiring collaboration
- **Clear naming** - Use descriptive filenames
- **Update status** - Keep status current (Planning → Executing → Reviewing → Iterating)
- **Document decisions** - Add notes about choices made
- **Complete iterations** - Follow full Ralph cycle: Plan → Execute → Review → Iterate

### ❌ Don'ts

- **Don't share sensitive work** - Use local plans for experimental/private work
- **Don't commit incomplete plans** - Ensure plans are ready for team review
- **Don't skip planning** - Always start with thorough planning phase
- **Don't ignore feedback** - Update plans based on review feedback

## Ralph Workflow Phases

All shared plans follow the Ralph methodology:

### 1. PLAN 🎯
- Understand requirements
- Design approach
- Break down into steps
- Get team input

### 2. EXECUTE 🔨
- Implement solution
- Follow patterns
- Add tests
- Update docs

### 3. REVIEW 🔍
- Run quality checks
- Validate implementation
- Get team feedback
- Test thoroughly

### 4. ITERATE 🔄
- Address feedback
- Refine implementation
- Update plan
- Re-review

## Integration with AI Agents

Shared plans enable distributed AI agents to:
- **Access task context** - Understand what needs to be done
- **Follow structured approach** - Use Ralph methodology
- **Coordinate work** - Multiple agents can work on different phases
- **Track progress** - Update plans as work progresses

### Example Agent Workflow

1. **Create shared plan** with requirements
2. **@requirements-analyst** reviews and adds acceptance criteria
3. **@software-architect** adds design approach
4. **Template specialist** implements following the plan
5. **@quality-analyst** validates and reviews
6. **Team reviews** and merges

## Related Documentation

- **[Ralph CLI Guide](/scripts/README.md)** - Complete Ralph command reference
- **[AI Workflows Documentation](/docs/ai-workflows.md)** - Full workflow system guide
- **[Custom Agents Guide](/docs/custom-agents-guide.md)** - Agent usage and capabilities

## Commands Reference

```bash
# Create shared plan
./scripts/ralph.sh plan "Task" --shared

# Execute a shared plan
./scripts/ralph.sh execute plan-name.md

# Review shared plan
./scripts/ralph.sh review plan-name.md

# Iterate on shared plan
./scripts/ralph.sh iterate plan-name.md

# View all plans (including shared)
./scripts/ralph.sh status --shared

# Share a local plan
./scripts/ralph.sh share local-plan.md
```

## Notes

- Shared plans are in Markdown format for easy editing
- Plans include status, type, affected templates, and suggested agents
- Use checklist format for tracking progress
- Update plans as work progresses
- Complete plans can serve as documentation of decisions made
