# Skills Installation Manifest

## Overview
This document records the template-specific skills installed based on each template's actual package.json tooling dependencies.

## Installation Summary

### Root Workspace (2 skills)
- `turborepo-monorepo` - Turborepo task orchestration
- `monorepo-navigator` - pnpm workspace navigation

### Expo React Native (3 skills)
- `expo-react-native-typescript` - TypeScript in React Native
- `expo-react-native-performance` - Performance optimization
- `jest-react-testing` - Jest + React Testing Library

**Key dependencies:** Expo, React Native, Jest, React Navigation, React Hook Form, TanStack Query

### Next.js SSR (3 skills)
- `nextjs-app-router` - Next.js 16 App Router
- `nextjs-patterns` - Next.js best practices
- `epic-react-patterns` - Advanced React patterns

**Key dependencies:** Next.js 16, React 19, Vitest, Server Components

### React Router v7 SPA (2 skills)
- `testing-helper` - React Router patterns
- `jest-react-testing` - Component testing

**Key dependencies:** React Router v7, Vite, Vitest

### React Router v7 SSR (2 skills)
- `epic-react-patterns` - Advanced React + SSR
- `typescript-patterns` - TypeScript patterns

**Key dependencies:** React Router v7, SSR, Vite, Vitest

### TanStack Router SPA (2 skills)
- `tanstack-router-best-practices` - TanStack Router patterns
- `jest-react-testing` - Component testing

**Key dependencies:** TanStack Router, Vite, Vitest

### TypeScript Library (2 skills)
- `arch-tsdown` - tsdown-based architecture
- `npm-library-setup` - NPM package configuration

**Key dependencies:** tsdown, ESM/CJS exports, Changesets

## Total Skills Installed: 16

## Installation Method
All skills installed via: `npx -y skills add <repo> --skill <skill> --agent claude-code cursor`

## Verification
```bash
# Check root skills
ls -1 .agents/skills

# Check template skills
for t in templates/*/; do echo "$(basename $t):"; ls -1 "$t/.agents/skills"; done
```

## Notes
- Each template has only skills matching its actual tooling
- No cross-framework pollution (e.g., Vue skills in React templates)
- Skills are template-specific, not shared via symlinks
- Installation completed via background automation script
