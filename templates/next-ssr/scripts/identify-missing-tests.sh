#!/bin/bash
set -e

# Identify missing test types (unit, integration, e2e) across templates
# Usage: ./scripts/identify-missing-tests.sh

echo "Identifying missing test types..."

MISSING=""

for TEMPLATE in typescript-library next-ssr react-router-v7-spa react-router-v7-ssr tanstack-router-spa expo-react-native; do
  TEMPLATE_PATH="templates/$TEMPLATE"
  
  if [ -d "$TEMPLATE_PATH" ]; then
    echo ""
    echo "Checking $TEMPLATE..."
    
    # Check for unit tests
    UNIT_TESTS=$(find "$TEMPLATE_PATH" -type f \( -name "*.test.ts*" -o -name "*.spec.ts*" \) | wc -l)
    echo "  Unit tests: $UNIT_TESTS"
    
    # Check for integration tests
    INTEGRATION_TESTS=$(find "$TEMPLATE_PATH" -type f -path "*/integration/*" -name "*.test.ts*" 2>/dev/null | wc -l)
    echo "  Integration tests: $INTEGRATION_TESTS"
    
    # Check for e2e tests
    E2E_TESTS=$(find "$TEMPLATE_PATH" -type f \( -path "*/__e2e__/*" -o -path "*/e2e/*" \) 2>/dev/null | grep -E '\.(test|spec)\.' | wc -l)
    echo "  E2E tests: $E2E_TESTS"
    
    if [ "$UNIT_TESTS" -eq 0 ]; then
      MISSING="$MISSING\n$TEMPLATE: Missing unit tests"
      echo "  ⚠ No unit tests found"
    fi
    
    if [ "$INTEGRATION_TESTS" -eq 0 ]; then
      MISSING="$MISSING\n$TEMPLATE: Missing integration tests"
      echo "  ⚠ No integration tests found"
    fi
    
    if [ "$E2E_TESTS" -eq 0 ]; then
      MISSING="$MISSING\n$TEMPLATE: Consider adding e2e tests"
      echo "  ℹ No e2e tests found (optional)"
    fi
  else
    echo ""
    echo "Checking $TEMPLATE..."
    echo "  ✗ Template directory not found"
  fi
done

echo ""
if [ -n "$MISSING" ]; then
  echo "Missing test types:"
  echo -e "$MISSING" | grep -v "^$"
else
  echo "✓ All templates have comprehensive test coverage!"
fi
