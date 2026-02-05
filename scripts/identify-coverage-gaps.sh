#!/bin/bash
set -e

# Identify test coverage gaps across templates
# Usage: ./scripts/identify-coverage-gaps.sh [threshold] [--format json|text]

THRESHOLD="${1:-80}"
FORMAT="${2:-text}"

echo "Identifying coverage gaps (threshold: ${THRESHOLD}%)..." >&2

GAPS=""
TEMPLATES_DATA="[]"

# Initialize JSON array if format is json
if [ "$FORMAT" = "json" ]; then
  TEMPLATES_DATA="["
  FIRST=true
fi

for TEMPLATE in typescript-library next-ssr react-router-v7-spa react-router-v7-ssr tanstack-router-spa expo-react-native; do
  if [ -f "templates/$TEMPLATE/coverage/coverage-summary.json" ]; then
    COVERAGE_FILE="templates/$TEMPLATE/coverage/coverage-summary.json"
    
    echo "" >&2
    echo "Checking $TEMPLATE..." >&2
    
    # Extract coverage percentages
    LINE_PCT=$(jq -r '.total.lines.pct' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    BRANCH_PCT=$(jq -r '.total.branches.pct' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    FUNC_PCT=$(jq -r '.total.functions.pct' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    STMT_PCT=$(jq -r '.total.statements.pct' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    
    LINE_COVERED=$(jq -r '.total.lines.covered' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    LINE_TOTAL=$(jq -r '.total.lines.total' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    BRANCH_COVERED=$(jq -r '.total.branches.covered' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    BRANCH_TOTAL=$(jq -r '.total.branches.total' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    FUNC_COVERED=$(jq -r '.total.functions.covered' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    FUNC_TOTAL=$(jq -r '.total.functions.total' "$COVERAGE_FILE" 2>/dev/null || echo "0")
    
    echo "  Lines: ${LINE_PCT}% (${LINE_COVERED}/${LINE_TOTAL})" >&2
    echo "  Branches: ${BRANCH_PCT}% (${BRANCH_COVERED}/${BRANCH_TOTAL})" >&2
    echo "  Functions: ${FUNC_PCT}% (${FUNC_COVERED}/${FUNC_TOTAL})" >&2
    echo "  Statements: ${STMT_PCT}%" >&2
    
    # Get low coverage files (files with coverage < threshold)
    LOW_COVERAGE_FILES=$(jq -r "to_entries | map(select(.key != \"total\" and .value.lines.pct < $THRESHOLD)) | map(\"\(.key): \(.value.lines.pct)%\") | .[]" "$COVERAGE_FILE" 2>/dev/null | head -5 || echo "")
    
    # Get uncovered lines for top files
    UNCOVERED_DETAILS=""
    if [ -n "$LOW_COVERAGE_FILES" ]; then
      UNCOVERED_DETAILS=$(jq -r "to_entries | map(select(.key != \"total\" and .value.lines.pct < $THRESHOLD)) | sort_by(.value.lines.pct) | .[0:3] | map(\"\(.key) (\(.value.lines.pct)%): Uncovered lines \(.value.lines.total - .value.lines.covered)/\(.value.lines.total)\") | .[]" "$COVERAGE_FILE" 2>/dev/null || echo "")
    fi
    
    if [ "$FORMAT" = "json" ]; then
      [ "$FIRST" = false ] && TEMPLATES_DATA="${TEMPLATES_DATA},"
      FIRST=false
      
      # Build gaps array
      GAPS_ARRAY="[]"
      HAS_GAPS=false
      
      if (( $(echo "$LINE_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
        HAS_GAPS=true
        GAPS_ARRAY=$(echo "$GAPS_ARRAY" | jq ". += [{\"type\": \"line\", \"current\": $LINE_PCT, \"target\": $THRESHOLD, \"covered\": $LINE_COVERED, \"total\": $LINE_TOTAL, \"missing\": $(echo "$LINE_TOTAL - $LINE_COVERED" | bc)}]")
      fi
      if (( $(echo "$BRANCH_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
        HAS_GAPS=true
        GAPS_ARRAY=$(echo "$GAPS_ARRAY" | jq ". += [{\"type\": \"branch\", \"current\": $BRANCH_PCT, \"target\": $THRESHOLD, \"covered\": $BRANCH_COVERED, \"total\": $BRANCH_TOTAL, \"missing\": $(echo "$BRANCH_TOTAL - $BRANCH_COVERED" | bc)}]")
      fi
      if (( $(echo "$FUNC_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
        HAS_GAPS=true
        GAPS_ARRAY=$(echo "$GAPS_ARRAY" | jq ". += [{\"type\": \"function\", \"current\": $FUNC_PCT, \"target\": $THRESHOLD, \"covered\": $FUNC_COVERED, \"total\": $FUNC_TOTAL, \"missing\": $(echo "$FUNC_TOTAL - $FUNC_COVERED" | bc)}]")
      fi
      
      # Get low coverage files as JSON array
      LOW_COVERAGE_FILES_JSON="[]"
      if [ -n "$UNCOVERED_DETAILS" ]; then
        LOW_COVERAGE_FILES_JSON=$(echo "$UNCOVERED_DETAILS" | while IFS= read -r line; do
          FILE=$(echo "$line" | cut -d' ' -f1)
          PCT=$(echo "$line" | grep -oP '\(\K[0-9.]+(?=%\))' || echo "0")
          UNCOVERED=$(echo "$line" | grep -oP 'Uncovered lines \K[0-9]+' || echo "0")
          TOTAL=$(echo "$line" | grep -oP 'Uncovered lines [0-9]+/\K[0-9]+' || echo "0")
          echo "{\"file\": \"$FILE\", \"coverage\": $PCT, \"uncovered\": $UNCOVERED, \"total\": $TOTAL}"
        done | jq -s .)
      fi
      
      TEMPLATES_DATA="${TEMPLATES_DATA}
      {
        \"template\": \"$TEMPLATE\",
        \"has_gaps\": $HAS_GAPS,
        \"coverage\": {
          \"lines\": {\"pct\": $LINE_PCT, \"covered\": $LINE_COVERED, \"total\": $LINE_TOTAL},
          \"branches\": {\"pct\": $BRANCH_PCT, \"covered\": $BRANCH_COVERED, \"total\": $BRANCH_TOTAL},
          \"functions\": {\"pct\": $FUNC_PCT, \"covered\": $FUNC_COVERED, \"total\": $FUNC_TOTAL},
          \"statements\": {\"pct\": $STMT_PCT}
        },
        \"gaps\": $GAPS_ARRAY,
        \"low_coverage_files\": $LOW_COVERAGE_FILES_JSON
      }"
    else
      # Text format (original behavior)
      if (( $(echo "$LINE_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
        GAPS="$GAPS\n$TEMPLATE: Line coverage ${LINE_PCT}% (target: ${THRESHOLD}%) - Missing ${LINE_TOTAL} - ${LINE_COVERED} lines"
        echo "  ⚠ Line coverage below threshold" >&2
      fi
      if (( $(echo "$BRANCH_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
        GAPS="$GAPS\n$TEMPLATE: Branch coverage ${BRANCH_PCT}% (target: ${THRESHOLD}%) - Missing ${BRANCH_TOTAL} - ${BRANCH_COVERED} branches"
        echo "  ⚠ Branch coverage below threshold" >&2
      fi
      if (( $(echo "$FUNC_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
        GAPS="$GAPS\n$TEMPLATE: Function coverage ${FUNC_PCT}% (target: ${THRESHOLD}%) - Missing ${FUNC_TOTAL} - ${FUNC_COVERED} functions"
        echo "  ⚠ Function coverage below threshold" >&2
      fi
      
      # Add file-level details in text mode
      if [ -n "$UNCOVERED_DETAILS" ]; then
        while IFS= read -r line; do
          GAPS="$GAPS\n$TEMPLATE: $line"
        done <<< "$UNCOVERED_DETAILS"
      fi
    fi
  else
    if [ "$FORMAT" = "json" ]; then
      [ "$FIRST" = false ] && TEMPLATES_DATA="${TEMPLATES_DATA},"
      FIRST=false
      TEMPLATES_DATA="${TEMPLATES_DATA}
      {
        \"template\": \"$TEMPLATE\",
        \"has_gaps\": true,
        \"error\": \"Coverage report not found\"
      }"
    else
      GAPS="$GAPS\n$TEMPLATE: Coverage report not generated"
      echo "" >&2
      echo "Checking $TEMPLATE..." >&2
      echo "  ✗ Coverage report not found" >&2
    fi
  fi
done

if [ "$FORMAT" = "json" ]; then
  TEMPLATES_DATA="${TEMPLATES_DATA}]"
  echo "$TEMPLATES_DATA"
else
  echo "" >&2
  if [ -n "$GAPS" ]; then
    echo "Coverage gaps identified:" >&2
    echo -e "$GAPS" | grep -v "^$"
  else
    echo "✓ All templates meet coverage threshold!" >&2
  fi
fi
