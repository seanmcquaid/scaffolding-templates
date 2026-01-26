#!/bin/bash
set -e

# Determine relevant agents based on changed files and templates
# Usage: ./scripts/determine-agents.sh [changed-files-file] [templates]

CHANGED_FILES_FILE="${1:-}"
TEMPLATES="${2:-}"

if [ -n "$CHANGED_FILES_FILE" ]; then
  CHANGED_FILES=$(cat "$CHANGED_FILES_FILE")
else
  # Read from stdin if no file provided
  CHANGED_FILES=$(cat)
fi

AGENTS=""

# SDLC Phase Agents
if echo "$CHANGED_FILES" | grep -qE '\.(test|spec)\.(ts|tsx|js|jsx)$'; then
  AGENTS="$AGENTS @quality-analyst"
fi

if echo "$CHANGED_FILES" | grep -qE '(README|\.md)$'; then
  AGENTS="$AGENTS @ui-ux-designer"
fi

if echo "$CHANGED_FILES" | grep -qE '(package\.json|pnpm-lock\.yaml|\.github/workflows)'; then
  AGENTS="$AGENTS @deployment-engineer"
fi

if echo "$CHANGED_FILES" | grep -qE '\.(ts|tsx|js|jsx)$' && ! echo "$CHANGED_FILES" | grep -qE '\.(test|spec)\.(ts|tsx|js|jsx)$'; then
  AGENTS="$AGENTS @implementation-engineer"
fi

# Template Specialist Agents
if echo "$TEMPLATES" | grep -q "typescript-library"; then
  AGENTS="$AGENTS @typescript-library-specialist"
fi
if echo "$TEMPLATES" | grep -q "next-ssr"; then
  AGENTS="$AGENTS @nextjs-ssr-specialist"
fi
if echo "$TEMPLATES" | grep -q "react-router-v7-spa"; then
  AGENTS="$AGENTS @react-router-spa-specialist"
fi
if echo "$TEMPLATES" | grep -q "react-router-v7-ssr"; then
  AGENTS="$AGENTS @react-router-ssr-specialist"
fi
if echo "$TEMPLATES" | grep -q "tanstack-router-spa"; then
  AGENTS="$AGENTS @tanstack-router-spa-specialist"
fi
if echo "$TEMPLATES" | grep -q "expo-react-native"; then
  AGENTS="$AGENTS @expo-react-native-specialist"
fi

echo "Relevant agents:$AGENTS"

# Output in JSON format for easy parsing
cat << EOF
{
  "agents": $(echo "$AGENTS" | xargs -n1 | jq -Rs 'split("\n") | map(select(length > 0))')
}
EOF
