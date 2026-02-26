# Skills for expo-react-native Template

This directory contains agent skills for the expo-react-native template. These skills work with GitHub Copilot, Claude Code, Cursor, and 20+ other AI coding agents.

## Available Skills

### SDLC Phase Skills (8 skills)
- **requirements-analysis** - Available in `./requirements-analysis/SKILL.md`
- **software-architecture** - Available in `./software-architecture/SKILL.md`
- **implementation-engineering** - Available in `./implementation-engineering/SKILL.md`
- **ui-ux-design** - Available in `./ui-ux-design/SKILL.md`
- **quality-analysis** - Available in `./quality-analysis/SKILL.md`
- **deployment-engineering** - Available in `./deployment-engineering/SKILL.md`
- **maintenance-engineering** - Available in `./maintenance-engineering/SKILL.md`
- **production-support** - Available in `./production-support/SKILL.md`

### Template-Specific Skill
- **expo-react-native** - Specialized for this template (`./expo-react-native/SKILL.md`)

## Installation

From this template directory:

```bash
# Install all skills for this template
npx skills add . --all -a github-copilot

# Install specific skill
npx skills add . --skill requirements-analysis
```

## Self-Contained

This template includes all necessary skills so you can use it independently without the parent repository.

For more information about the skills system, see the [root skills README](../../.agents/skills/README.md).
