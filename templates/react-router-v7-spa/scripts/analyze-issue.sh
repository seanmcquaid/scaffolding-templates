#!/bin/bash
set -e

# Analyze a GitHub issue and suggest workflow approach
# Usage: ./scripts/analyze-issue.sh <issue-number>

ISSUE_NUMBER="${1:-}"

if [ -z "$ISSUE_NUMBER" ]; then
  echo "Usage: ./scripts/analyze-issue.sh <issue-number>"
  echo ""
  echo "Example:"
  echo "  ./scripts/analyze-issue.sh 123"
  exit 1
fi

echo "Analyzing issue #${ISSUE_NUMBER}..."
echo ""

# Fetch issue data using gh CLI if available, otherwise show instructions
if command -v gh &> /dev/null; then
  # Get issue details
  ISSUE_DATA=$(gh issue view "$ISSUE_NUMBER" --json number,title,body,labels,author,createdAt)
  
  TITLE=$(echo "$ISSUE_DATA" | jq -r '.title')
  BODY=$(echo "$ISSUE_DATA" | jq -r '.body // ""')
  LABELS=$(echo "$ISSUE_DATA" | jq -r '.labels[].name' | tr '\n' ', ')
  AUTHOR=$(echo "$ISSUE_DATA" | jq -r '.author.login')
  
  echo "Issue #${ISSUE_NUMBER}: $TITLE"
  echo "Author: $AUTHOR"
  echo "Current Labels: $LABELS"
  echo ""
  
  # Analyze content
  CONTENT=$(echo "$TITLE $BODY" | tr '[:upper:]' '[:lower:]')
  
  SUGGESTED_AGENTS=""
  SUGGESTED_LABELS=""
  ISSUE_TYPE=""
  
  # Bug-related
  if echo "$CONTENT" | grep -qE "(bug|error|fix|broken|issue|problem)"; then
    ISSUE_TYPE="Bug Report"
    SUGGESTED_AGENTS="@maintenance-engineer"
    SUGGESTED_LABELS="bug"
  fi
  
  # Feature request
  if echo "$CONTENT" | grep -qE "(feature|enhancement|add|new|implement|support)"; then
    if [ -z "$ISSUE_TYPE" ]; then
      ISSUE_TYPE="Feature Request"
    else
      ISSUE_TYPE="$ISSUE_TYPE / Feature Request"
    fi
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @requirements-analyst @software-architect"
    SUGGESTED_LABELS="$SUGGESTED_LABELS enhancement"
  fi
  
  # Test-related
  if echo "$CONTENT" | grep -qE "(test|coverage|testing|spec|e2e|integration|unit)"; then
    if [ -z "$ISSUE_TYPE" ]; then
      ISSUE_TYPE="Testing"
    fi
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @quality-analyst"
    SUGGESTED_LABELS="$SUGGESTED_LABELS testing"
  fi
  
  # Documentation
  if echo "$CONTENT" | grep -qE "(doc|documentation|readme|guide|docs)"; then
    if [ -z "$ISSUE_TYPE" ]; then
      ISSUE_TYPE="Documentation"
    fi
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @ui-ux-designer"
    SUGGESTED_LABELS="$SUGGESTED_LABELS documentation"
  fi
  
  # Template-specific
  if echo "$CONTENT" | grep -qE "(typescript-library|ts library)"; then
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @typescript-library-specialist"
    SUGGESTED_LABELS="$SUGGESTED_LABELS template:typescript-library"
  fi
  if echo "$CONTENT" | grep -qE "(next|nextjs)"; then
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @nextjs-ssr-specialist"
    SUGGESTED_LABELS="$SUGGESTED_LABELS template:next-ssr"
  fi
  if echo "$CONTENT" | grep -qE "react-router.*(spa|single)"; then
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @react-router-spa-specialist"
    SUGGESTED_LABELS="$SUGGESTED_LABELS template:react-router-v7-spa"
  fi
  if echo "$CONTENT" | grep -qE "react-router.*(ssr|server)"; then
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @react-router-ssr-specialist"
    SUGGESTED_LABELS="$SUGGESTED_LABELS template:react-router-v7-ssr"
  fi
  if echo "$CONTENT" | grep -qE "(tanstack|tanstack router)"; then
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @tanstack-router-spa-specialist"
    SUGGESTED_LABELS="$SUGGESTED_LABELS template:tanstack-router-spa"
  fi
  if echo "$CONTENT" | grep -qE "(expo|react-native|mobile)"; then
    SUGGESTED_AGENTS="$SUGGESTED_AGENTS @expo-react-native-specialist"
    SUGGESTED_LABELS="$SUGGESTED_LABELS template:expo-react-native"
  fi
  
  # Default if nothing detected
  if [ -z "$ISSUE_TYPE" ]; then
    ISSUE_TYPE="General Issue"
    SUGGESTED_AGENTS="@requirements-analyst"
  fi
  
  # Output analysis
  echo "═══════════════════════════════════════════════════════════"
  echo "WORKFLOW ANALYSIS"
  echo "═══════════════════════════════════════════════════════════"
  echo ""
  echo "Issue Type: $ISSUE_TYPE"
  echo ""
  echo "Suggested Agents:"
  for agent in $SUGGESTED_AGENTS; do
    echo "  • $agent"
  done
  echo ""
  echo "Suggested Labels:"
  for label in $SUGGESTED_LABELS; do
    echo "  • $label"
  done
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  echo "WORKFLOW: PLAN → EXECUTE → REVIEW → ITERATE"
  echo "═══════════════════════════════════════════════════════════"
  echo ""
  
  case "$ISSUE_TYPE" in
    *"Bug"*)
      echo "1. PLAN - Investigation (@maintenance-engineer):"
      echo "   • Reproduce the issue"
      echo "   • Identify root cause"
      echo "   • Determine affected templates/components"
      echo ""
      echo "2. EXECUTE - Implementation:"
      echo "   • Create fix following template patterns"
      echo "   • Add regression tests"
      echo "   • Verify fix across affected areas"
      echo ""
      echo "3. REVIEW - Validation (@quality-analyst):"
      echo "   • Review test coverage for the fix"
      echo "   • Ensure no side effects"
      echo "   • Validate fix resolves the issue"
      ;;
    *"Feature"*)
      echo "1. PLAN - Requirements (@requirements-analyst):"
      echo "   • Clarify requirements and scope"
      echo "   • Define acceptance criteria"
      echo "   • Identify affected templates"
      echo "   • Assess complexity and effort"
      echo ""
      echo "2. PLAN - Design (@software-architect):"
      echo "   • Create architectural design"
      echo "   • Define implementation approach"
      echo "   • Consider cross-template consistency"
      echo "   • Create ADR if significant change"
      echo ""
      echo "3. EXECUTE - Implementation (template specialists):"
      echo "   • Implement feature following design"
      echo "   • Maintain template consistency"
      echo "   • Add comprehensive tests"
      echo "   • Update documentation"
      ;;
    *"Testing"*)
      echo "1. PLAN - Analysis (@quality-analyst):"
      echo "   • Review current test coverage"
      echo "   • Identify specific gaps"
      echo "   • Plan test cases needed"
      echo ""
      echo "2. EXECUTE - Implementation:"
      echo "   • Write tests following template patterns"
      echo "   • Ensure proper test isolation"
      echo "   • Verify coverage improvements"
      echo ""
      echo "3. REVIEW - Validation:"
      echo "   • Run 'pnpm test:coverage' locally"
      echo "   • Verify coverage meets threshold"
      echo "   • Ensure tests are stable"
      ;;
    *"Documentation"*)
      echo "1. PLAN - Content Planning (@ui-ux-designer):"
      echo "   • Identify documentation needs"
      echo "   • Plan content structure"
      echo "   • Ensure clarity and completeness"
      echo ""
      echo "2. EXECUTE - Implementation:"
      echo "   • Write clear, concise documentation"
      echo "   • Add examples where helpful"
      echo "   • Maintain consistency with existing docs"
      echo ""
      echo "3. REVIEW - Validation:"
      echo "   • Verify technical accuracy"
      echo "   • Check for clarity"
      echo "   • Ensure proper formatting"
      ;;
    *)
      echo "1. PLAN - Analysis (@requirements-analyst):"
      echo "   • Understand the request in detail"
      echo "   • Define clear requirements"
      echo "   • Identify affected templates/components"
      echo ""
      echo "2. PLAN - Design (@software-architect if needed):"
      echo "   • Design the solution approach"
      echo "   • Consider consistency across templates"
      echo "   • Plan implementation steps"
      echo ""
      echo "3. EXECUTE - Implementation (appropriate specialists):"
      echo "   • Follow template-specific patterns"
      echo "   • Maintain code quality standards"
      echo "   • Add necessary tests"
      echo "   • Update documentation"
      ;;
  esac
  
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  echo "KEY PRINCIPLES"
  echo "═══════════════════════════════════════════════════════════"
  echo ""
  echo "✓ Always start in plan mode"
  echo "✓ Use specialized agents for their expertise"
  echo "✓ Iterate based on feedback"
  echo "✓ Maintain template consistency"
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  
else
  echo "Error: 'gh' CLI not found"
  echo ""
  echo "To use this script, install the GitHub CLI:"
  echo "  https://cli.github.com/"
  echo ""
  echo "Or manually fetch issue details and analyze the content for:"
  echo "  - Issue type (bug, feature, test, docs)"
  echo "  - Relevant templates"
  echo "  - Suggested agents"
  exit 1
fi
