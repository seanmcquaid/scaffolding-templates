# Skills Installation Summary

## 📋 What Was Done

This work establishes a **tooling-based skills strategy** for the scaffolding-templates monorepo, replacing the previous ad-hoc approach of installing skills from generic marketplace searches.

### Changes Made

1. **✅ Removed incorrect skills**
   - Deleted `trpc-type-safety` (not used in react-router-v7-spa or any template)
   - Removed symlinked `.agents/skills` files from all templates
   
2. **✅ Created template-specific skills directories**
   - Each template now has its own `.agents/skills` directory
   - Skills are no longer globally shared via symlinks
   - Enables template isolation and prevents framework pollution

3. **✅ Documented tooling-based strategy**
   - Created `skills-manifest.json` - detailed mapping of tooling to skills
   - Created `docs/TOOLING_SKILLS_STRATEGY.md` - comprehensive strategy guide
   - Created `scripts/install-tooling-skills.sh` - automated installation script

### Key Files

| File | Purpose |
|------|---------|
| `skills-manifest.json` | Authoritative mapping of package.json → skills per template |
| `docs/TOOLING_SKILLS_STRATEGY.md` | Full strategy guide with rationale & principles |
| `scripts/install-tooling-skills.sh` | Automated installation script (read-only safe) |
| `.agents/skills/` | Root skills (2: turborepo-monorepo, monorepo-navigator) |
| `templates/*//.agents/skills/` | Template-specific skills (each template gets relevant skills only) |

## 🎯 Skills Allocation

### By Template (tooling-based)

**Root Monorepo** (2 skills)
- `turborepo-monorepo` - Turborepo task orchestration
- `monorepo-navigator` - pnpm workspace navigation

**Expo React Native** (4 skills)
- `react-native-expo`, `expo-react-native-typescript`, `expo-react-native-performance`, `jest-react-testing`

**Next.js** (3 skills)
- `nextjs-app-router`, `nextjs-patterns`, `epic-react-patterns`

**React Router v7 SPA** (2 skills)
- `testing-helper`, `jest-react-testing`
- **Excluded**: tRPC (not in package.json)

**React Router v7 SSR** (2 skills)
- `epic-react-patterns`, `typescript-patterns`

**TanStack Router** (2 skills)
- `tanstack-router-best-practices`, `jest-react-testing`
- **Excluded**: Vue/Nuxt (React-only)

**TypeScript Library** (2 skills)
- `arch-tsdown`, `npm-library-setup`
- **Excluded**: React, routing, Expo (pure TS library)

## 🚀 Next Steps

### Option A: Use Automated Script (Recommended)

```bash
cd /Users/seanmcquaid/Documents/Development/scaffolding-templates
bash scripts/install-tooling-skills.sh
```

### Option B: Manual Installation per Template

Refer to `skills-manifest.json` → `installation_commands` section for detailed commands per template.

Example:
```bash
# Root
cd /Users/seanmcquaid/Documents/Development/scaffolding-templates
npx -y skills add giuseppe-trisciuoglio/developer-kit --skill turborepo-monorepo --agent claude-code cursor

# Expo React Native
cd templates/expo-react-native
npx -y skills add jezweb/claude-skills --skill react-native-expo --agent claude-code cursor
# ... etc
```

## ✨ Benefits of This Approach

1. **No Cross-Framework Pollution**
   - React Router SPA doesn't get tRPC skills
   - TanStack Router doesn't get Vue/Nuxt skills
   - TypeScript library doesn't get React/Expo skills

2. **Maintainability**
   - Skills are explicitly mapped to package.json dependencies
   - Future updates are clear: match new deps → add/remove skills
   - Easy to audit which skills are truly needed

3. **Performance**
   - Smaller skill search space per template
   - IDE/CLI performance improvement from relevant skills only
   - Cleaner .agents/skills directories

4. **Portability**
   - Templates can be cloned independently with only their relevant skills
   - No monorepo root dependency for using a single template

5. **Clarity**
   - `skills-manifest.json` serves as source of truth
   - Strategy document explains the "why" for each decision
   - Installation script is auditable and reviewable

## 📝 Implementation Notes

### Skills CLI Behavior
The `npx -y skills` CLI can be interactive despite `-y` flag. For automated runs, redirect output to `/dev/null` as shown in `install-tooling-skills.sh`.

### Selection of Agents
Currently configured for Claude Code & Cursor agents:
- Broader language support than GitHub Copilot
- Available across multiple AI tools
- Can be extended to other agents as needed

### Template Isolation
Each template maintains its own AGENTS (in `/.agents/`, not `.agents/agents` per template) but now has truly independent skills in `.agents/skills/`.

## 🔍 Verification

After installation, verify:

```bash
# Check root skills (should be 2)
ls -1 .agents/skills

# Check template skills (should be template-specific)
ls -1 templates/expo-react-native/.agents/skills
ls -1 templates/typescript-library/.agents/skills

# Verify no tRPC in any template
find templates/ -type f -name "*trpc*" 2>/dev/null || echo "✓ No tRPC found"

# Verify template isolation
for t in templates/*/; do echo "=== $(basename $t) ==="; ls -1 "$t/.agents/skills" || echo "EMPTY"; done
```

## 📚 References

- Commit: `9252e763f` - "docs: establish tooling-based skills strategy"
- GitHub Discussion: (link to related issue if applicable)
- Original Approach: Generic marketplace searches (error-prone, non-maintainable)
- New Approach: Package.json-driven skills mapping (maintainable, accurate)

## ❓ Questions?

Refer to:
1. `docs/TOOLING_SKILLS_STRATEGY.md` - Strategy rationale
2. `skills-manifest.json` - Specific skill-to-tooling mappings  
3. Individual `templates/*/AGENTS.md` - Framework-specific guidance
