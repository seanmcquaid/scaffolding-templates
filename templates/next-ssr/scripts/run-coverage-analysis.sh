#!/bin/bash
set -e

# Run test coverage analysis for all templates
# Usage: ./scripts/run-coverage-analysis.sh [output-dir]

OUTPUT_DIR="${1:-coverage-reports}"

echo "Running test coverage for all templates..."

TEMPLATES="typescript-library next-ssr react-router-v7-spa react-router-v7-ssr tanstack-router-spa expo-react-native"

mkdir -p "$OUTPUT_DIR"

COVERAGE_SUMMARY=""

for TEMPLATE in $TEMPLATES; do
  echo ""
  echo "Analyzing coverage for $TEMPLATE..."
  
  if [ -d "templates/$TEMPLATE" ]; then
    cd "templates/$TEMPLATE"
    
    # Run tests with coverage
    if pnpm test:coverage 2>&1 | tee "../../$OUTPUT_DIR/$TEMPLATE.log"; then
      echo "✓ Coverage generated for $TEMPLATE"
      
      # Extract coverage summary if available
      if [ -f "coverage/coverage-summary.json" ]; then
        TOTAL=$(jq -r '.total' coverage/coverage-summary.json 2>/dev/null || echo "{}")
        COVERAGE_SUMMARY="$COVERAGE_SUMMARY\n$TEMPLATE: $TOTAL"
        
        # Display summary
        echo "  Coverage summary:"
        jq -r '.total | "    Lines: \(.lines.pct)%, Branches: \(.branches.pct)%, Functions: \(.functions.pct)%, Statements: \(.statements.pct)%"' coverage/coverage-summary.json 2>/dev/null || echo "    Unable to parse coverage summary"
      fi
    else
      echo "✗ Coverage generation failed for $TEMPLATE"
    fi
    
    cd ../..
  else
    echo "✗ Template directory not found: $TEMPLATE"
  fi
done

echo ""
echo "Coverage analysis complete!"
echo "Reports saved to: $OUTPUT_DIR/"
