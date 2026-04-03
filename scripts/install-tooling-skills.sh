#!/bin/bash

# Tooling-based skills installation script for scaffolding-templates
# This script installs skills specifically matched to the tooling used in each template
# Based on package.json dependency analysis, NOT generic marketplace searches

set -e

ROOT_DIR="/Users/seanmcquaid/Documents/Development/scaffolding-templates"
AGENTS="claude-code cursor"

echo "🚀 Installing tooling-specific skills..."
echo ""

# ROOT: Turborepo & Monorepo
echo "📦 ROOT: Turborepo & pnpm workspaces"
cd "$ROOT_DIR"
npx -y skills add giuseppe-trisciuoglio/developer-kit --skill turborepo-monorepo --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ turborepo-monorepo" || echo "  ✗ turborepo-monorepo FAILED"
npx -y skills add borghei/claude-skills --skill monorepo-navigator --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ monorepo-navigator" || echo "  ✗ monorepo-navigator FAILED"

# EXPO REACT NATIVE: Expo + React Native + Jest
echo ""
echo "📱 EXPO REACT NATIVE: React Native, Expo, Jest"
cd "$ROOT_DIR/templates/expo-react-native"
npx -y skills add jezweb/claude-skills --skill react-native-expo --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ react-native-expo" || echo "  ✗ react-native-expo FAILED"
npx -y skills add mindrally/skills --skill expo-react-native-typescript --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ expo-react-native-typescript" || echo "  ✗ expo-react-native-typescript FAILED"
npx -y skills add pproenca/dot-skills --skill expo-react-native-performance --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ expo-react-native-performance" || echo "  ✗ expo-react-native-performance FAILED"
npx -y skills add manutej/luxor-claude-marketplace --skill jest-react-testing --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ jest-react-testing" || echo "  ✗ jest-react-testing FAILED"

# NEXT.JS: Next.js App Router + Vitest + React
echo ""
echo "⚛️  NEXT.JS SSR: Next.js, Server Components, App Router"
cd "$ROOT_DIR/templates/next-ssr"
npx -y skills add claude-dev-suite/claude-dev-suite --skill nextjs-app-router --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ nextjs-app-router" || echo "  ✗ nextjs-app-router FAILED"
npx -y skills add ashchupliak/dream-team --skill nextjs-patterns --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ nextjs-patterns" || echo "  ✗ nextjs-patterns FAILED"
npx -y skills add epicweb-dev/epic-stack --skill epic-react-patterns --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ epic-react-patterns" || echo "  ✗ epic-react-patterns FAILED"

# REACT ROUTER v7 SPA: React Router + Vite
echo ""
echo "🛣️  REACT ROUTER v7 SPA: React Router, Vite, Vitest (client-side)"
cd "$ROOT_DIR/templates/react-router-v7-spa"
npx -y skills add code-visionary/react-router-skills --skill testing-helper --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ testing-helper" || echo "  ✗ testing-helper FAILED"
npx -y skills add manutej/luxor-claude-marketplace --skill jest-react-testing --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ jest-react-testing" || echo "  ✗ jest-react-testing FAILED"
echo "  ℹ️  EXCLUDED: trpc-type-safety (no tRPC dependency)"

# REACT ROUTER v7 SSR: React Router + SSR
echo ""
echo "🛣️  REACT ROUTER v7 SSR: React Router, SSR, Vite"
cd "$ROOT_DIR/templates/react-router-v7-ssr"
npx -y skills add epicweb-dev/epic-stack --skill epic-react-patterns --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ epic-react-patterns" || echo "  ✗ epic-react-patterns FAILED"
npx -y skills add code-visionary/react-router-skills --skill typescript-patterns --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ typescript-patterns" || echo "  ✗ typescript-patterns FAILED"

# TANSTACK ROUTER: TanStack Router + Vite
echo ""
echo "🗺️  TANSTACK ROUTER SPA: TanStack Router, Vite, type-safe routing"
cd "$ROOT_DIR/templates/tanstack-router-spa"
npx -y skills add deckardger/tanstack-agent-skills --skill tanstack-router-best-practices --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ tanstack-router-best-practices" || echo "  ✗ tanstack-router-best-practices FAILED"
npx -y skills add manutej/luxor-claude-marketplace --skill jest-react-testing --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ jest-react-testing" || echo "  ✗ jest-react-testing FAILED"
echo "  ℹ️  EXCLUDED: Vue/Nuxt skills (React-only)"

# TYPESCRIPT LIBRARY: tsdown + npm publishing
echo ""
echo "📚 TYPESCRIPT LIBRARY: tsdown, ESM/CJS, npm publishing"
cd "$ROOT_DIR/templates/typescript-library"
npx -y skills add hairyf/skills --skill arch-tsdown --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ arch-tsdown" || echo "  ✗ arch-tsdown FAILED"
npx -y skills add huozhi/npm-skills --skill npm-library-setup --agent $AGENTS -y >/dev/null 2>&1 && echo "  ✓ npm-library-setup" || echo "  ✗ npm-library-setup FAILED"
echo "  ℹ️  EXCLUDED: React, Expo, routing (pure TS library)"

echo ""
echo "✅ Tooling-specific skills installation complete"
echo ""
echo "📋 Summary:"
echo "  • Root: 2 skills (Turborepo + Monorepo management)"
echo "  • Expo: 4 skills (React Native, Expo, Jest)"
echo "  • Next.js: 3 skills (App Router, patterns, React)"
echo "  • React Router v7 SPA: 2 skills (React Router, testing)"
echo "  • React Router v7 SSR: 2 skills (React Router SSR, TypeScript)"
echo "  • TanStack Router: 2 skills (TanStack Router, testing)"
echo "  • TypeScript Library: 2 skills (tsdown, npm)"
echo ""
echo "✨ Each template now has only the skills it needs based on its dependencies"
