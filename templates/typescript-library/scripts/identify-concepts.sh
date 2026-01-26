#!/bin/bash
set -e

# Identify concept opportunities for templates
# Usage: ./scripts/identify-concepts.sh

OPPORTUNITIES=""

# Framework version checks
echo "Checking for framework updates..."
OPPORTUNITIES="$OPPORTUNITIES
- Review React Router v7 latest features and patterns
- Check Next.js latest App Router patterns
- Review TanStack Query v5 best practices
- Evaluate Expo SDK latest features
- Consider TypeScript 5.x new features
"

# Emerging patterns
echo "Checking for emerging patterns..."
OPPORTUNITIES="$OPPORTUNITIES
- Server Components patterns across frameworks
- Streaming SSR implementations
- Edge runtime compatibility
- React Compiler integration
- Type-safe environment variables patterns
"

# Testing improvements
echo "Checking for testing improvements..."
OPPORTUNITIES="$OPPORTUNITIES
- Playwright component testing patterns
- MSW v2 integration improvements
- Testing Library best practices updates
- Visual regression testing approaches
"

# Developer experience
echo "Checking for DX improvements..."
OPPORTUNITIES="$OPPORTUNITIES
- Build performance optimizations
- Hot reload improvements
- TypeScript performance tuning
- ESLint v9 migration
"

echo ""
echo "Identified concept opportunities:"
echo "$OPPORTUNITIES" | grep "^-" || true
