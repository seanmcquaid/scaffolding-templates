#!/bin/bash
set -e

# Identify concept opportunities for templates
# Usage: ./scripts/identify-concepts.sh [--format json|text]

FORMAT="text"
if [ "$1" = "--format" ] && [ -n "$2" ]; then
  FORMAT="$2"
fi

# Function to get current package version from template
get_package_version() {
  local template="$1"
  local package="$2"
  local package_json="templates/$template/package.json"
  
  if [ -f "$package_json" ]; then
    jq -r ".dependencies[\"$package\"] // .devDependencies[\"$package\"] // \"not-found\"" "$package_json" 2>/dev/null | sed 's/[\^~]//g'
  else
    echo "not-found"
  fi
}

# Function to get latest package version from npm (simulated for now)
get_latest_version() {
  local package="$1"
  # TODO: Implement actual npm version lookup
  # In a real implementation, this would call: npm view "$package" version
  # For now, return a placeholder that indicates "latest available"
  echo "latest"
}

# Initialize JSON array if format is json
if [ "$FORMAT" = "json" ]; then
  echo "["
fi

OPPORTUNITIES=""
FIRST_ITEM=true

# Framework version checks with actual version info
echo "Checking for framework updates..." >&2
TEMPLATES="next-ssr react-router-v7-spa react-router-v7-ssr tanstack-router-spa"

# React Router v7
RR_TEMPLATES="react-router-v7-spa react-router-v7-ssr"
RR_CURRENT=""
for t in $RR_TEMPLATES; do
  if [ -d "templates/$t" ]; then
    version=$(get_package_version "$t" "react-router")
    RR_CURRENT="$version"
    break
  fi
done

if [ "$FORMAT" = "json" ]; then
  [ "$FIRST_ITEM" = false ] && echo ","
  cat << EOF
  {
    "concept": "React Router v7 latest features and patterns",
    "category": "framework-update",
    "priority": "high",
    "affected_templates": ["react-router-v7-spa", "react-router-v7-ssr"],
    "current_version": "${RR_CURRENT:-unknown}",
    "latest_version": "7.x",
    "details": {
      "description": "Review and adopt latest React Router v7 features including improved type safety, new data loading patterns, and enhanced error handling",
      "migration_effort": "medium",
      "breaking_changes": false,
      "resources": [
        "https://reactrouter.com/en/main",
        "https://github.com/remix-run/react-router/releases"
      ]
    }
  }
EOF
  FIRST_ITEM=false
else
  OPPORTUNITIES="$OPPORTUNITIES
- React Router v7 latest features and patterns (Current: ${RR_CURRENT:-unknown}, Templates: react-router-v7-spa, react-router-v7-ssr)
"
fi

# Next.js
NEXT_CURRENT=$(get_package_version "next-ssr" "next")
if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "Next.js latest App Router patterns",
    "category": "framework-update",
    "priority": "high",
    "affected_templates": ["next-ssr"],
    "current_version": "${NEXT_CURRENT:-unknown}",
    "latest_version": "16.x",
    "details": {
      "description": "Adopt latest Next.js App Router patterns including improved streaming, React Server Components, and server actions",
      "migration_effort": "low",
      "breaking_changes": false,
      "resources": [
        "https://nextjs.org/docs/app",
        "https://nextjs.org/blog"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- Next.js latest App Router patterns (Current: ${NEXT_CURRENT:-unknown}, Template: next-ssr)
"
fi

# TanStack Query
TQ_CURRENT=$(get_package_version "next-ssr" "@tanstack/react-query")
if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "TanStack Query v5 best practices",
    "category": "library-update",
    "priority": "medium",
    "affected_templates": ["next-ssr", "react-router-v7-spa", "react-router-v7-ssr", "tanstack-router-spa"],
    "current_version": "${TQ_CURRENT:-unknown}",
    "latest_version": "5.x",
    "details": {
      "description": "Implement TanStack Query v5 best practices including new query options API, improved TypeScript support, and optimistic updates patterns",
      "migration_effort": "low",
      "breaking_changes": false,
      "resources": [
        "https://tanstack.com/query/latest/docs/framework/react/overview",
        "https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- TanStack Query v5 best practices (Current: ${TQ_CURRENT:-unknown}, Templates: next-ssr, react-router-v7-spa, react-router-v7-ssr, tanstack-router-spa)
"
fi

# TypeScript
TS_CURRENT=$(get_package_version "typescript-library" "typescript")
if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "TypeScript 5.x new features",
    "category": "language-update",
    "priority": "medium",
    "affected_templates": ["all"],
    "current_version": "${TS_CURRENT:-unknown}",
    "latest_version": "5.x",
    "details": {
      "description": "Adopt TypeScript 5.x features including decorators, const type parameters, and improved type inference",
      "migration_effort": "low",
      "breaking_changes": false,
      "resources": [
        "https://www.typescriptlang.org/docs/handbook/release-notes/overview.html",
        "https://devblogs.microsoft.com/typescript/"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- TypeScript 5.x new features (Current: ${TS_CURRENT:-unknown}, Templates: all)
"
fi

# Emerging patterns
echo "Checking for emerging patterns..." >&2

if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "Server Components patterns across frameworks",
    "category": "architectural-pattern",
    "priority": "high",
    "affected_templates": ["next-ssr", "react-router-v7-ssr"],
    "details": {
      "description": "Implement and standardize React Server Components patterns across SSR templates for improved performance and developer experience",
      "migration_effort": "high",
      "breaking_changes": true,
      "benefits": [
        "Reduced bundle size",
        "Improved initial page load",
        "Better SEO",
        "Simplified data fetching"
      ],
      "resources": [
        "https://react.dev/reference/rsc/server-components",
        "https://nextjs.org/docs/app/building-your-application/rendering/server-components"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- Server Components patterns across frameworks (Templates: next-ssr, react-router-v7-ssr | Effort: high | Benefits: reduced bundle, better performance)
"
fi

if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "React Compiler integration",
    "category": "build-optimization",
    "priority": "medium",
    "affected_templates": ["all"],
    "details": {
      "description": "Integrate React Compiler to automatically optimize React components, eliminating manual memoization needs",
      "migration_effort": "low",
      "breaking_changes": false,
      "benefits": [
        "Automatic optimization",
        "Reduced boilerplate",
        "Better performance"
      ],
      "current_status": "experimental",
      "resources": [
        "https://react.dev/learn/react-compiler",
        "https://github.com/facebook/react/tree/main/compiler"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- React Compiler integration (Templates: all | Status: experimental | Benefits: auto-optimization, reduced boilerplate)
"
fi

if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "Type-safe environment variables patterns",
    "category": "developer-experience",
    "priority": "medium",
    "affected_templates": ["all"],
    "details": {
      "description": "Implement type-safe environment variable patterns using Zod validation and TypeScript",
      "migration_effort": "low",
      "breaking_changes": false,
      "benefits": [
        "Runtime validation",
        "Type safety",
        "Better error messages",
        "IntelliSense support"
      ],
      "resources": [
        "https://github.com/t3-oss/t3-env",
        "https://zod.dev/"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- Type-safe environment variables patterns (Templates: all | Benefits: runtime validation, type safety, better DX)
"
fi

# Testing improvements
echo "Checking for testing improvements..." >&2

MSW_CURRENT=$(get_package_version "next-ssr" "msw")
if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "MSW v2 integration improvements",
    "category": "testing",
    "priority": "medium",
    "affected_templates": ["next-ssr", "react-router-v7-spa", "react-router-v7-ssr", "tanstack-router-spa"],
    "current_version": "${MSW_CURRENT:-unknown}",
    "latest_version": "2.x",
    "details": {
      "description": "Upgrade to MSW v2 for improved API mocking with better TypeScript support and enhanced debugging",
      "migration_effort": "medium",
      "breaking_changes": true,
      "resources": [
        "https://mswjs.io/docs/",
        "https://mswjs.io/docs/migrations/1.x-to-2.x"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- MSW v2 integration improvements (Current: ${MSW_CURRENT:-unknown}, Templates: next-ssr, react-router-v7-spa, react-router-v7-ssr, tanstack-router-spa)
"
fi

if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "Playwright component testing patterns",
    "category": "testing",
    "priority": "low",
    "affected_templates": ["all"],
    "details": {
      "description": "Implement Playwright component testing for isolated component tests with real browser rendering",
      "migration_effort": "medium",
      "breaking_changes": false,
      "benefits": [
        "Real browser testing",
        "Better accessibility testing",
        "Visual testing support"
      ],
      "resources": [
        "https://playwright.dev/docs/test-components",
        "https://playwright.dev/docs/best-practices"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- Playwright component testing patterns (Templates: all | Benefits: real browser testing, better accessibility tests)
"
fi

# Developer experience
echo "Checking for DX improvements..." >&2

if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "Build performance optimizations",
    "category": "developer-experience",
    "priority": "medium",
    "affected_templates": ["all"],
    "details": {
      "description": "Implement build performance optimizations including SWC, Turbopack integration, and bundle size monitoring",
      "migration_effort": "low",
      "breaking_changes": false,
      "benefits": [
        "Faster build times",
        "Improved hot reload",
        "Better development experience"
      ],
      "resources": [
        "https://nextjs.org/docs/architecture/turbopack",
        "https://swc.rs/"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- Build performance optimizations (Templates: all | Benefits: faster builds, improved hot reload)
"
fi

ESLINT_CURRENT=$(get_package_version "next-ssr" "eslint")
if [ "$FORMAT" = "json" ]; then
  echo ","
  cat << EOF
  {
    "concept": "ESLint v9 migration",
    "category": "tooling",
    "priority": "low",
    "affected_templates": ["all"],
    "current_version": "${ESLINT_CURRENT:-unknown}",
    "latest_version": "9.x",
    "details": {
      "description": "Migrate to ESLint v9 with flat config format for improved performance and simpler configuration",
      "migration_effort": "medium",
      "breaking_changes": true,
      "resources": [
        "https://eslint.org/docs/latest/use/configure/migration-guide",
        "https://eslint.org/blog/2024/04/eslint-v9.0.0-released/"
      ]
    }
  }
EOF
else
  OPPORTUNITIES="$OPPORTUNITIES
- ESLint v9 migration (Current: ${ESLINT_CURRENT:-unknown}, Templates: all | Config: flat format)
"
fi

# Close JSON array
if [ "$FORMAT" = "json" ]; then
  echo ""
  echo "]"
else
  echo ""
  echo "Identified concept opportunities:"
  echo "$OPPORTUNITIES" | grep "^-" || true
fi
