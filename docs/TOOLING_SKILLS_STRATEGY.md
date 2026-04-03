# Tooling-Specific Skills Strategy

## Overview

This repository uses a **tooling-based skills selection strategy** instead of generic marketplace searches. Each template receives skills matched specifically to its package.json dependencies and framework choices.

## Why This Approach?

Previously, skills were installed based on:
- ❌ Broad marketplace searches (e.g., "expo react native")
- ❌ All skills from multiple competing repositories
- ❌ Skills for technologies NOT in the template (e.g., tRPC when not used)

This led to:
- Irrelevant skills cluttering the workspace
- Confusion about which skill to use
- Installed skills for frameworks not present in the template

**New approach** ✅
- Match skills to actual package.json dependencies
- Template-specific skills directories (not symlinked to root)
- Exclude irrelevant tools (no Vue in React templates, no tRPC when unused)

## Skills by Template

### 🔧 Root Workspace
**Purpose**: Monorepo orchestration

| Skill | Package | Why |
|-------|---------|-----|
| `turborepo-monorepo` | `giuseppe-trisciuoglio/developer-kit` | Turborepo task management |
| `monorepo-navigator` | `borghei/claude-skills` | pnpm workspace navigation |

**Package.json signals:**
```json
"scripts": {
  "build": "turbo build",
  "dev": "turbo dev",
  "test": "turbo test"
}
```

---

### 📱 Expo React Native
**Purpose**: Mobile app development with Expo, React Native, Jest

| Skill | Package | Why |
|-------|---------|-----|
| `react-native-expo` | `jezweb/claude-skills` | Expo/React Native patterns |
| `expo-react-native-typescript` | `mindrally/skills` | TypeScript in mobile |
| `expo-react-native-performance` | `pproenca/dot-skills` | Performance optimization |
| `jest-react-testing` | `manutej/luxor-claude-marketplace` | Jest + React Testing Library |

**Package.json signals:**
```json
"dependencies": {
  "expo": "~55.0.8",
  "react-native": "0.84.1"
},
"devDependencies": {
  "@testing-library/react-native": "^13.2.0",
  "jest": "^29.7.0"
}
```

---

### ⚛️ Next.js SSR
**Purpose**: Server Components, App Router, SSR with Vitest

| Skill | Package | Why |
|-------|---------|-----|
| `nextjs-app-router` | `claude-dev-suite/claude-dev-suite` | Next.js 16 App Router |
| `nextjs-patterns` | `ashchupliak/dream-team` | Next.js best practices |
| `epic-react-patterns` | `epicweb-dev/epic-stack` | Advanced React patterns |

**Package.json signals:**
```json
"dependencies": {
  "next": "16.2.2",
  "react": "19.2.4"
},
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "test": "vitest run"
}
```

---

### 🛣️ React Router v7 SPA
**Purpose**: Client-side routing with React Router v7, Vite

| Skill | Package | Why |
|-------|---------|-----|
| `testing-helper` | `code-visionary/react-router-skills` | React Router patterns |
| `jest-react-testing` | `manutej/luxor-claude-marketplace` | Component + Router testing |

**Excluded**: ❌ `trpc-type-safety` (no tRPC dependency)

**Package.json signals:**
```json
"dependencies": {
  "react-router": "^7.13.2"
},
"scripts": {
  "dev": "react-router dev",
  "test": "vitest run"
}
```

---

### 🛣️ React Router v7 SSR
**Purpose**: Server-side routing with loaders/actions

| Skill | Package | Why |
|-------|---------|-----|
| `epic-react-patterns` | `epicweb-dev/epic-stack` | Advanced React + SSR |
| `typescript-patterns` | `code-visionary/react-router-skills` | TypeScript + React Router |

**Excluded**: ❌ SolidJS, Remix, or other framework skills

**Package.json signals:**
```json
"dependencies": {
  "react-router": "^7.13.2",
  "@react-router/node": "^7.13.2"
},
"scripts": {
  "dev": "react-router dev",
  "start": "cross-env NODE_ENV=production react-router-serve ./build/server/index.js"
}
```

---

### 🗺️ TanStack Router SPA  
**Purpose**: Type-safe routing with TanStack Router

| Skill | Package | Why |
|-------|---------|-----|
| `tanstack-router-best-practices` | `deckardger/tanstack-agent-skills` | TanStack Router patterns |
| `jest-react-testing` | `manutej/luxor-claude-marketplace` | Component testing |

**Excluded**: ❌ Vue, Nuxt, or other framework skills

**Package.json signals:**
```json
"dependencies": {
  "@tanstack/react-router": "^1.168.4",
  "@tanstack/react-query": "^5.95.2"
},
"scripts": {
  "dev": "vite",
  "test": "vitest run"
}
```

---

### 📚 TypeScript Library
**Purpose**: Pure TypeScript library with tsdown, dual ESM/CJS exports

| Skill | Package | Why |
|-------|---------|-----|
| `arch-tsdown` | `hairyf/skills` | tsdown-based library architecture |
| `npm-library-setup` | `huozhi/npm-skills` | ESM/CJS package configuration |

**Excluded**: ❌ React, Vue, Expo, routing, or frontend frameworks

**Package.json signals:**
```json
"type": "module",
"exports": {
  ".": "./dist/index.js"
},
"scripts": {
  "build": "tsdown",
  "test": "vitest run",
  "release": "pnpm build && changeset publish"
},
"devDependencies": {
  "tsdown": "^0.21.5",
  "@changesets/cli": "^2.30.0"
}
```

---

## Installation

### Manual (Recommended for Review)
See [`skills-manifest.json`](../skills-manifest.json) for detailed installation commands per template.

### Automated Script
```bash
bash scripts/install-tooling-skills.sh
```

## Key Principles

1. **Dependencies First**: Skills match actual package.json, not guesses
2. **Template Isolation**: No shared .agents/skills symlinks - each template has its own
3. **No Cross-Framework Pollution**: 
   - React templates don't get Vue/Nuxt skills
   - TypeScript library doesn't get frontend skills
   - SPA templates don't get framework skills for other frameworks
4. **Minimal but Complete**: Only include skills needed for the specific tooling

## Maintenance

When updating a template's dependencies:
1. Review the new package.json tooling
2. Check if existing skills are still appropriate
3. Add new skills only if they match the new dependencies
4. Remove skills if their tooling is no longer used
5. Update this documentation

## References

- [`skills-manifest.json`](../skills-manifest.json) - Detailed skill mappings
- Template `package.json` files - Source of truth for tooling
- Individual template AGENTS.md - Framework-specific guidance
