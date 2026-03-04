#!/bin/bash
set -e

# Identify test coverage gaps for this template
# Usage: ./scripts/identify-coverage-gaps.sh [threshold] [--format json|text]

THRESHOLD="80"
FORMAT="text"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --format)
      FORMAT="$2"
      shift 2
      ;;
    *)
      THRESHOLD="$1"
      shift
      ;;
  esac
done

TEMPLATE_NAME=$(basename "$(pwd)")
COVERAGE_FILE="coverage/coverage-summary.json"

echo "Identifying coverage gaps for $TEMPLATE_NAME (threshold: ${THRESHOLD}%)..." >&2

if [ ! -f "$COVERAGE_FILE" ]; then
  if [ "$FORMAT" = "json" ]; then
    echo "[{\"template\": \"$TEMPLATE_NAME\", \"has_gaps\": true, \"error\": \"Coverage report not found\"}]"
  else
    echo "$TEMPLATE_NAME: Coverage report not generated"
    echo "  ✗ Run './scripts/run-coverage-analysis.sh' to generate coverage first" >&2
  fi
  exit 0
fi

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

# Get low coverage files
LOW_COVERAGE_FILES=$(jq -r "to_entries | map(select(.key != \"total\" and .value.lines.pct < $THRESHOLD)) | map(\"\(.key): \(.value.lines.pct)%\") | .[]" "$COVERAGE_FILE" 2>/dev/null | head -5 || echo "")

UNCOVERED_DETAILS=""
if [ -n "$LOW_COVERAGE_FILES" ]; then
  UNCOVERED_DETAILS=$(jq -r "to_entries | map(select(.key != \"total\" and .value.lines.pct < $THRESHOLD)) | sort_by(.value.lines.pct) | .[0:3] | map(\"\(.key) (\(.value.lines.pct)%): Uncovered lines \(.value.lines.total - .value.lines.covered)/\(.value.lines.total)\") | .[]" "$COVERAGE_FILE" 2>/dev/null || echo "")
fi

if [ "$FORMAT" = "json" ]; then
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

  echo "[{
    \"template\": \"$TEMPLATE_NAME\",
    \"has_gaps\": $HAS_GAPS,
    \"coverage\": {
      \"lines\": {\"pct\": $LINE_PCT, \"covered\": $LINE_COVERED, \"total\": $LINE_TOTAL},
      \"branches\": {\"pct\": $BRANCH_PCT, \"covered\": $BRANCH_COVERED, \"total\": $BRANCH_TOTAL},
      \"functions\": {\"pct\": $FUNC_PCT, \"covered\": $FUNC_COVERED, \"total\": $FUNC_TOTAL},
      \"statements\": {\"pct\": $STMT_PCT}
    },
    \"gaps\": $GAPS_ARRAY,
    \"low_coverage_files\": $LOW_COVERAGE_FILES_JSON
  }]"
else
  GAPS=""
  LINE_MISSING=$((LINE_TOTAL - LINE_COVERED))
  BRANCH_MISSING=$((BRANCH_TOTAL - BRANCH_COVERED))
  FUNC_MISSING=$((FUNC_TOTAL - FUNC_COVERED))

  if (( $(echo "$LINE_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
    GAPS="$GAPS\n$TEMPLATE_NAME: Line coverage ${LINE_PCT}% (target: ${THRESHOLD}%) - Missing ${LINE_MISSING} lines"
    echo "  ⚠ Line coverage below threshold" >&2
  fi
  if (( $(echo "$BRANCH_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
    GAPS="$GAPS\n$TEMPLATE_NAME: Branch coverage ${BRANCH_PCT}% (target: ${THRESHOLD}%) - Missing ${BRANCH_MISSING} branches"
    echo "  ⚠ Branch coverage below threshold" >&2
  fi
  if (( $(echo "$FUNC_PCT < $THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
    GAPS="$GAPS\n$TEMPLATE_NAME: Function coverage ${FUNC_PCT}% (target: ${THRESHOLD}%) - Missing ${FUNC_MISSING} functions"
    echo "  ⚠ Function coverage below threshold" >&2
  fi

  if [ -n "$UNCOVERED_DETAILS" ]; then
    while IFS= read -r line; do
      GAPS="$GAPS\n$TEMPLATE_NAME: $line"
    done <<< "$UNCOVERED_DETAILS"
  fi

  echo "" >&2
  if [ -n "$GAPS" ]; then
    echo "Coverage gaps identified:" >&2
    echo -e "$GAPS" | grep -v "^$"
  else
    echo "✓ $TEMPLATE_NAME meets coverage threshold!" >&2
  fi
fi
