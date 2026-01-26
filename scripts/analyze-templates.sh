#!/bin/bash
set -e

# Analyze all templates for dependencies and opportunities
# Usage: ./scripts/analyze-templates.sh

echo "Analyzing all templates for concept opportunities..."

TEMPLATES="typescript-library next-ssr react-router-v7-spa react-router-v7-ssr tanstack-router-spa expo-react-native"

for TEMPLATE in $TEMPLATES; do
  echo ""
  echo "Analyzing $TEMPLATE..."
  
  # Check package.json for version information
  PACKAGE_JSON="templates/$TEMPLATE/package.json"
  if [ -f "$PACKAGE_JSON" ]; then
    echo "  Dependencies:"
    # Extract major dependencies
    jq -r '.dependencies + .devDependencies | keys[]' "$PACKAGE_JSON" | head -10 | sed 's/^/    - /'
  else
    echo "  No package.json found"
  fi
done

echo ""
echo "Analysis complete!"
