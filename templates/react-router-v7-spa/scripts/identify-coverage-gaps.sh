#!/bin/bash
set -e

# Identify test coverage gaps across templates
# Usage: ./scripts/identify-coverage-gaps.sh [threshold]

THRESHOLD="${1:-80}"

echo "Identifying coverage gaps (threshold: ${THRESHOLD}%)..."

GAPS=""

for TEMPLATE in typescript-library next-ssr react-router-v7-spa react-router-v7-ssr tanstack-router-spa expo-react-native; do
  if [ -f "templates/$TEMPLATE/coverage/coverage-summary.json" ]; then
    COVERAGE_FILE="templates/$TEMPLATE/coverage/coverage-summary.json"
    
    echo ""
    echo "Checking $TEMPLATE..."
    
    # Extract coverage percentages
    LINE_PCT=$(jq -r '.total.lines.pct' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    BRANCH_PCT=$(jq -r '.total.branches.pct' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    FUNC_PCT=$(jq -r '.total.functions.pct' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    STMT_PCT=$(jq -r '.total.statements.pct' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    
    echo "  Lines: ${LINE_PCT}%"
    echo "  Branches: ${BRANCH_PCT}%"
    echo "  Functions: ${FUNC_PCT}%"
    echo "  Statements: ${STMT_PCT}%"
    
    # Check if any metric is below threshold
    if (( $(echo "$LINE_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
      GAPS="$GAPS\n$TEMPLATE: Line coverage ${LINE_PCT}% (target: ${THRESHOLD}%)"
      echo "  ⚠ Line coverage below threshold"
    fi
    if (( $(echo "$BRANCH_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
      GAPS="$GAPS\n$TEMPLATE: Branch coverage ${BRANCH_PCT}% (target: ${THRESHOLD}%)"
      echo "  ⚠ Branch coverage below threshold"
    fi
    if (( $(echo "$FUNC_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
      GAPS="$GAPS\n$TEMPLATE: Function coverage ${FUNC_PCT}% (target: ${THRESHOLD}%)"
      echo "  ⚠ Function coverage below threshold"
    fi
  else
    GAPS="$GAPS\n$TEMPLATE: Coverage report not generated"
    echo ""
    echo "Checking $TEMPLATE..."
    echo "  ✗ Coverage report not found"
  fi
done

echo ""
if [ -n "$GAPS" ]; then
  echo "Coverage gaps identified:"
  echo -e "$GAPS" | grep -v "^$"
else
  echo "✓ All templates meet coverage threshold!"
fi
