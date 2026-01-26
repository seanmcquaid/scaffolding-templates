# Skills vs Agents - Understanding the Difference

## Overview

This repository contains two complementary AI assistance systems:

1. **Skills** (`/skills/` directory) - Standard agentskills.io format
2. **Agents** (`/agents/` directory) - Custom sub-agents pattern

Both work together to provide comprehensive AI-assisted development across multiple platforms.

## What are Skills?

**Skills** follow the [Agent Skills specification](https://agentskills.io) - a standardized format supported by GitHub Copilot and 20+ other AI coding agents.

### Skills Format

```yaml
---
name: skill-name
description: Brief description of what the skill does
---

# Skill Content
Instructions and guidelines...
```

### Skills Characteristics

- ✅ **Standardized**: Follow agentskills.io specification
- ✅ **Broad Support**: Work with 20+ AI coding tools
- ✅ **Simple Format**: Name and description only in frontmatter
- ✅ **File Location**: `/skills/[skill-name]/SKILL.md`
- ✅ **Naming**: Use `SKILL.md` (uppercase)

### Available Skills (14 total)

**8 SDLC Phase Skills:**
1. requirements-analysis
2. software-architecture
3. implementation-engineering
4. ui-ux-design
5. quality-analysis
6. deployment-engineering
7. maintenance-engineering
8. production-support

**6 Template Specialist Skills:**
1. nextjs-ssr
2. react-router-spa
3. react-router-ssr
4. tanstack-router-spa
5. typescript-library
6. expo-react-native

## What are Agents?

**Agents** are custom sub-agents specifically designed for GitHub Copilot, Claude, and Cursor with enhanced functionality.

### Agents Format

```yaml
---
name: agent-name
description: Brief description
tools: ["read", "search", "edit", "create", "bash", "grep", "glob"]
---

# Agent Content
Detailed instructions, examples, checklists...
```

### Agents Characteristics

- ✅ **Platform-Specific**: Optimized for Copilot, Claude, Cursor
- ✅ **Enhanced Format**: Includes tool specifications
- ✅ **Rich Content**: Detailed examples, checklists, workflows
- ✅ **File Location**: `/agents/[agent-name].agent.md`
- ✅ **Naming**: Use `.agent.md` extension

### Available Agents (14 total)

**8 SDLC Phase Agents:**
1. requirements-analyst
2. software-architect
3. implementation-engineer
4. quality-analyst
5. ui-ux-designer
6. deployment-engineer
7. maintenance-engineer
8. production-support-engineer

**6 Template Specialist Agents:**
1. nextjs-ssr-specialist
2. react-router-spa-specialist
3. react-router-ssr-specialist
4. tanstack-router-spa-specialist
5. typescript-library-specialist
6. expo-react-native-specialist

## Key Differences

| Feature | Skills | Agents |
|---------|--------|--------|
| **Standard** | agentskills.io spec | Custom format |
| **File Name** | `SKILL.md` | `.agent.md` |
| **Frontmatter** | name, description only | name, description, tools |
| **Platform Support** | 20+ AI tools | Copilot, Claude, Cursor |
| **Content Depth** | Concise guidelines | Detailed examples & checklists |
| **Tool Access** | Not specified | Explicitly defined |
| **Documentation** | `/skills/README.md` | `/docs/custom-agents-guide.md` |

## How They Work Together

### Complementary Strengths

**Skills provide:**
- ✅ Broad platform compatibility
- ✅ Standardized format for portability
- ✅ Quick, focused instructions
- ✅ Wide ecosystem support

**Agents provide:**
- ✅ Platform-specific optimizations
- ✅ Detailed examples and patterns
- ✅ Quality checklists and workflows
- ✅ Tool specifications for enhanced functionality

### Usage Strategy

**For GitHub Copilot:**
```
Option 1 (Skills): Uses agentskills.io discovery
Option 2 (Agents): Uses @agent-name with custom format
Both work! Skills for broad compatibility, Agents for rich features.
```

**For Cursor:**
```
Option 1 (Skills): Discovers SKILL.md files
Option 2 (Agents): Discovers .agent.md files with @agent-name
Both work! Use Skills for standard format, Agents for detailed guidance.
```

**For Claude:**
```
Option 1 (Skills): Reference /skills/[name]/SKILL.md
Option 2 (Agents): Reference /agents/[name].agent.md
Both work! Choose based on your needs for detail vs simplicity.
```

## Name Mapping

Skills and Agents cover the same functional areas but use slightly different naming:

| Skill Name | Agent Name | Function |
|------------|------------|----------|
| requirements-analysis | requirements-analyst | Requirements analysis |
| software-architecture | software-architect | Architecture design |
| implementation-engineering | implementation-engineer | Code implementation |
| ui-ux-design | ui-ux-designer | UI/UX design |
| quality-analysis | quality-analyst | Testing & QA |
| deployment-engineering | deployment-engineer | Deployment & CI/CD |
| maintenance-engineering | maintenance-engineer | Bug fixes & maintenance |
| production-support | production-support-engineer | Production operations |
| nextjs-ssr | nextjs-ssr-specialist | Next.js expertise |
| react-router-spa | react-router-spa-specialist | React Router SPA |
| react-router-ssr | react-router-ssr-specialist | React Router SSR |
| tanstack-router-spa | tanstack-router-spa-specialist | TanStack Router |
| typescript-library | typescript-library-specialist | TypeScript libraries |
| expo-react-native | expo-react-native-specialist | React Native/Expo |

## When to Use Which

### Use Skills When:

- ✅ You want maximum platform compatibility
- ✅ You're using an AI tool that supports agentskills.io
- ✅ You prefer standardized, portable formats
- ✅ You need quick, focused instructions
- ✅ You're working with tools beyond Copilot/Claude/Cursor

### Use Agents When:

- ✅ You're using GitHub Copilot, Claude, or Cursor
- ✅ You want detailed examples and code patterns
- ✅ You need quality checklists and workflows
- ✅ You want tool access specifications
- ✅ You prefer comprehensive guidance with context

### Use Both When:

- ✅ You work across multiple AI platforms
- ✅ You want redundancy and flexibility
- ✅ You're comparing different approaches
- ✅ You're learning from different documentation styles

## Example Usage

### Using a Skill (GitHub Copilot)

```
With agentskills.io support, Copilot discovers:
/skills/implementation-engineering/SKILL.md

Usage: Natural conversation referencing the skill context
"Help me implement this feature following implementation-engineering practices"
```

### Using an Agent (GitHub Copilot)

```
With custom agents, Copilot discovers:
/agents/implementation-engineer.agent.md

Usage: @implementation-engineer
"@implementation-engineer implement a user dashboard following template patterns"
```

### Using Both (Cursor)

```
Cursor discovers both:
- /skills/*/SKILL.md (standard format)
- /agents/*.agent.md (custom format)

Usage:
"Use implementation engineering best practices" (Skills)
@implementation-engineer "Implement this feature" (Agents)
```

## Platform Compatibility Matrix

| Platform | Skills Support | Agents Support | Recommendation |
|----------|---------------|----------------|----------------|
| **GitHub Copilot** | ✅ Via agentskills.io | ✅ Via custom agents | Use Agents for rich features |
| **Cursor** | ✅ Auto-discovery | ✅ Auto-discovery | Use both based on needs |
| **Claude Desktop** | ✅ Project knowledge | ✅ Project knowledge | Use Agents for detail |
| **Other AI Tools** | ✅ If agentskills.io | ⚠️ May not support | Use Skills for portability |

## Best Practices

### For Repository Maintainers

1. **Keep Content Aligned**: Skills and Agents should provide similar guidance
2. **Update Both**: When patterns change, update both formats
3. **Name Consistently**: Use parallel naming conventions
4. **Test Both**: Verify both formats work with target platforms

### For Developers

1. **Start with Documentation**: Read `/skills/README.md` and `/docs/custom-agents-guide.md`
2. **Choose Based on Platform**: Use Skills for broad support, Agents for rich features
3. **Mix and Match**: Use both formats as needed
4. **Provide Feedback**: Report which format works better for your workflow

## Migration Between Formats

### From Skills to Agents

If you prefer Agents over Skills:
```
Skill: /skills/implementation-engineering/SKILL.md
→ Agent: /agents/implementation-engineer.agent.md

Change: Use agent naming (@implementation-engineer)
Benefit: More detailed examples, tool specifications
```

### From Agents to Skills

If you prefer Skills over Agents:
```
Agent: /agents/implementation-engineer.agent.md
→ Skill: /skills/implementation-engineering/SKILL.md

Change: Reference skill by context
Benefit: Broader platform compatibility
```

## Conclusion

**Skills** and **Agents** are complementary systems that enhance AI-assisted development:

- **Skills** provide standardized, portable instructions following agentskills.io
- **Agents** provide platform-specific, detailed guidance with rich examples

Both formats coexist peacefully and serve different needs. Use Skills for broad compatibility, Agents for enhanced functionality, or both for maximum flexibility.

## Additional Resources

### Skills Documentation
- `/skills/README.md` - Skills overview and usage
- [agentskills.io](https://agentskills.io) - Official specification
- Individual `SKILL.md` files in `/skills/` subdirectories

### Agents Documentation
- `/docs/custom-agents-guide.md` - Comprehensive agents guide
- `/docs/QUICK_START.md` - Quick start for agents
- `/docs/AGENT_TEMPLATE.md` - Agent creation template
- `.cursor/README.md` - Cursor-specific agent usage
- `.claude/README.md` - Claude-specific agent usage

### Repository Patterns
- `/AGENTS.md` - Repository-wide coding patterns
- Template-specific `AGENTS.md` files
- Template-specific `/docs` directories
