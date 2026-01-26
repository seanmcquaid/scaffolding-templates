#!/bin/bash
set -e

# Analyze changed files and determine affected templates
# Usage: ./scripts/analyze-changed-files.sh [base-ref] [head-ref]

BASE_REF="${1:-main}"
HEAD_REF="${2:-HEAD}"

echo "Analyzing changed files..."

# Get list of changed files
CHANGED_FILES=$(git diff --name-only "$BASE_REF"..."$HEAD_REF")
echo "Changed files:"
echo "$CHANGED_FILES"
echo ""

# Determine affected templates
TEMPLATES=""
if echo "$CHANGED_FILES" | grep -q "templates/typescript-library/"; then
  TEMPLATES="$TEMPLATES typescript-library"
fi
if echo "$CHANGED_FILES" | grep -q "templates/next-ssr/"; then
  TEMPLATES="$TEMPLATES next-ssr"
fi
if echo "$CHANGED_FILES" | grep -q "templates/react-router-v7-spa/"; then
  TEMPLATES="$TEMPLATES react-router-v7-spa"
fi
if echo "$CHANGED_FILES" | grep -q "templates/react-router-v7-ssr/"; then
  TEMPLATES="$TEMPLATES react-router-v7-ssr"
fi
if echo "$CHANGED_FILES" | grep -q "templates/tanstack-router-spa/"; then
  TEMPLATES="$TEMPLATES tanstack-router-spa"
fi
if echo "$CHANGED_FILES" | grep -q "templates/expo-react-native/"; then
  TEMPLATES="$TEMPLATES expo-react-native"
fi

echo "Affected templates:$TEMPLATES"

# Output in JSON format for easy parsing
cat << EOF
{
  "changed_files": $(echo "$CHANGED_FILES" | jq -Rs 'split("\n") | map(select(length > 0))'),
  "templates": $(echo "$TEMPLATES" | xargs -n1 | jq -Rs 'split("\n") | map(select(length > 0))')
}
EOF
