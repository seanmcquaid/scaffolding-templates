#!/bin/bash
set -e

# Identify missing test types (unit, integration, e2e) for this template
# Usage: ./scripts/identify-missing-tests.sh

TEMPLATE_NAME=$(basename "$(pwd)")

echo "Identifying missing test types for $TEMPLATE_NAME..."

MISSING=""

echo ""

# Check for unit tests
UNIT_TESTS=$(find . -type f \( -name "*.test.ts*" -o -name "*.spec.ts*" \) | wc -l)
echo "  Unit tests: $UNIT_TESTS"

# Check for integration tests
INTEGRATION_TESTS=$(find . -type f -path "*/integration/*" -name "*.test.ts*" 2>/dev/null | wc -l)
echo "  Integration tests: $INTEGRATION_TESTS"

# Check for e2e tests
E2E_TESTS=$(find . -type f \( -path "*/__e2e__/*" -o -path "*/e2e/*" \) 2>/dev/null | grep -E '\.(test|spec)\.' | wc -l)
echo "  E2E tests: $E2E_TESTS"

if [ "$UNIT_TESTS" -eq 0 ]; then
  MISSING="$MISSING\n$TEMPLATE_NAME: Missing unit tests"
  echo "  ⚠ No unit tests found"
fi

if [ "$INTEGRATION_TESTS" -eq 0 ]; then
  MISSING="$MISSING\n$TEMPLATE_NAME: Missing integration tests"
  echo "  ⚠ No integration tests found"
fi

if [ "$E2E_TESTS" -eq 0 ]; then
  MISSING="$MISSING\n$TEMPLATE_NAME: Consider adding e2e tests"
  echo "  ℹ No e2e tests found (optional)"
fi

echo ""
if [ -n "$MISSING" ]; then
  echo "Missing test types:"
  echo -e "$MISSING" | grep -v "^$"
else
  echo "✓ $TEMPLATE_NAME has comprehensive test coverage!"
fi
