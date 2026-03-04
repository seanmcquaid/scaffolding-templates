#!/bin/bash
set -e

# Run test coverage analysis for this template
# Usage: ./scripts/run-coverage-analysis.sh [output-dir]

OUTPUT_DIR="${1:-coverage-reports}"

# Convert OUTPUT_DIR to absolute path
if [[ "$OUTPUT_DIR" != /* ]]; then
  OUTPUT_DIR="$(pwd)/$OUTPUT_DIR"
fi

TEMPLATE_NAME=$(basename "$(pwd)")

echo "Running test coverage for $TEMPLATE_NAME..."

mkdir -p "$OUTPUT_DIR"

if pnpm test:coverage 2>&1 | tee "$OUTPUT_DIR/$TEMPLATE_NAME.log"; then
  echo "✓ Coverage generated for $TEMPLATE_NAME"

  # Extract coverage summary if available
  if [ -f "coverage/coverage-summary.json" ]; then
    echo "  Coverage summary:"
    jq -r '.total | "    Lines: \(.lines.pct)%, Branches: \(.branches.pct)%, Functions: \(.functions.pct)%, Statements: \(.statements.pct)%"' coverage/coverage-summary.json 2>/dev/null || echo "    Unable to parse coverage summary"
  fi
else
  echo "✗ Coverage generation failed for $TEMPLATE_NAME"
fi

echo ""
echo "Coverage analysis complete!"
echo "Report saved to: $OUTPUT_DIR/$TEMPLATE_NAME.log"
