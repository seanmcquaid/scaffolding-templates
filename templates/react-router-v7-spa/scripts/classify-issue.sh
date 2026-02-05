#!/bin/bash
set -e

# Classify a GitHub issue and determine agents, labels, and next steps
# Usage: ./scripts/classify-issue.sh <issue-title> <issue-body> [--format json]
# Output: JSON with classification, agents, labels, next steps, and metadata

TITLE="${1:-}"
BODY="${2:-}"
FORMAT="${3:-json}"

if [ -z "$TITLE" ]; then
  echo '{"error": "Issue title is required"}' >&2
  exit 1
fi

# Combine title and body for analysis (convert to lowercase)
CONTENT=$(echo "$TITLE $BODY" | tr '[:upper:]' '[:lower:]')

# Initialize variables
ANALYSIS=""
AGENTS=""
LABELS=""
NEXT_STEPS=""
COMPLEXITY="medium"
PRIORITY="medium"
ESTIMATED_EFFORT="unknown"
RELATED_CONCEPTS=""

# Bug-related
if echo "$CONTENT" | grep -qE "(bug|error|fix|broken|issue|problem)"; then
  ANALYSIS="This appears to be a bug report or fix request."
  AGENTS="@maintenance-engineer"
  LABELS="bug"
  NEXT_STEPS="1. **Investigation** (Use @maintenance-engineer):
   - Reproduce the issue
   - Identify root cause
   - Determine affected templates/components

2. **Implementation** (Use template specialist if needed):
   - Create fix following template patterns
   - Add regression tests
   - Verify fix across affected areas

3. **Validation** (Use @quality-analyst):
   - Review test coverage for the fix
   - Ensure no side effects
   - Validate fix resolves the issue"
fi

# Feature request
if echo "$CONTENT" | grep -qE "(feature|enhancement|add|new|implement|support)"; then
  if [ -z "$ANALYSIS" ]; then
    ANALYSIS="This appears to be a feature request or enhancement."
  else
    ANALYSIS="$ANALYSIS This also appears to be a feature request or enhancement."
  fi
  AGENTS="$AGENTS @requirements-analyst @software-architect"
  LABELS="$LABELS enhancement"
  NEXT_STEPS="1. **Requirements Analysis** (Use @requirements-analyst):
   - Clarify requirements and scope
   - Define acceptance criteria
   - Identify affected templates
   - Assess complexity and effort

2. **Design Phase** (Use @software-architect):
   - Create architectural design
   - Define implementation approach
   - Consider cross-template consistency
   - Create ADR if significant change

3. **Implementation Phase** (Use template specialists):
   - Implement feature following design
   - Maintain template consistency
   - Add comprehensive tests
   - Update documentation"
fi

# Test-related
if echo "$CONTENT" | grep -qE "(test|coverage|testing|spec|e2e|integration|unit)"; then
  if [ -z "$ANALYSIS" ]; then
    ANALYSIS="This appears to be related to testing or test coverage."
  fi
  AGENTS="$AGENTS @quality-analyst"
  LABELS="$LABELS testing"
  if [ -z "$NEXT_STEPS" ]; then
    NEXT_STEPS="1. **Analysis** (Use @quality-analyst):
   - Review current test coverage
   - Identify specific gaps
   - Plan test cases needed

2. **Implementation** (Use @quality-analyst + template specialist):
   - Write tests following template patterns
   - Ensure proper test isolation
   - Verify coverage improvements

3. **Validation**:
   - Run \`pnpm test:coverage\` locally
   - Verify coverage meets threshold
   - Ensure tests are stable"
  fi
fi

# Documentation
if echo "$CONTENT" | grep -qE "(doc|documentation|readme|guide|docs)"; then
  if [ -z "$ANALYSIS" ]; then
    ANALYSIS="This appears to be related to documentation."
  fi
  AGENTS="$AGENTS @ui-ux-designer"
  LABELS="$LABELS documentation"
  if [ -z "$NEXT_STEPS" ]; then
    NEXT_STEPS="1. **Content Planning** (Use @ui-ux-designer):
   - Identify documentation needs
   - Plan content structure
   - Ensure clarity and completeness

2. **Implementation**:
   - Write clear, concise documentation
   - Add examples where helpful
   - Maintain consistency with existing docs

3. **Review**:
   - Verify technical accuracy
   - Check for clarity
   - Ensure proper formatting"
  fi
fi

# Template-specific detection
TEMPLATE_LABELS=""
if echo "$CONTENT" | grep -qE "(typescript-library|ts library)"; then
  AGENTS="$AGENTS @typescript-library-specialist"
  TEMPLATE_LABELS="$TEMPLATE_LABELS template:typescript-library"
fi
if echo "$CONTENT" | grep -qE "(next|nextjs)"; then
  AGENTS="$AGENTS @nextjs-ssr-specialist"
  TEMPLATE_LABELS="$TEMPLATE_LABELS template:next-ssr"
fi
if echo "$CONTENT" | grep -qE "react-router.*(spa|single)"; then
  AGENTS="$AGENTS @react-router-spa-specialist"
  TEMPLATE_LABELS="$TEMPLATE_LABELS template:react-router-v7-spa"
fi
if echo "$CONTENT" | grep -qE "react-router.*(ssr|server)"; then
  AGENTS="$AGENTS @react-router-ssr-specialist"
  TEMPLATE_LABELS="$TEMPLATE_LABELS template:react-router-v7-ssr"
fi
if echo "$CONTENT" | grep -qE "(tanstack|tanstack router)"; then
  AGENTS="$AGENTS @tanstack-router-spa-specialist"
  TEMPLATE_LABELS="$TEMPLATE_LABELS template:tanstack-router-spa"
fi
if echo "$CONTENT" | grep -qE "(expo|react-native|mobile)"; then
  AGENTS="$AGENTS @expo-react-native-specialist"
  TEMPLATE_LABELS="$TEMPLATE_LABELS template:expo-react-native"
fi

# Combine all labels
LABELS="$LABELS $TEMPLATE_LABELS"

# Default if nothing detected
if [ -z "$ANALYSIS" ]; then
  ANALYSIS="This issue requires further analysis to determine the appropriate approach."
  AGENTS="@requirements-analyst"
  NEXT_STEPS="1. **Analysis Phase** (Use @requirements-analyst):
   - Understand the request in detail
   - Define clear requirements
   - Identify affected templates/components

2. **Planning Phase** (Use @software-architect if architectural change):
   - Design the solution approach
   - Consider consistency across templates
   - Plan implementation steps

3. **Implementation Phase** (Use appropriate specialists):
   - Follow template-specific patterns
   - Maintain code quality standards
   - Add necessary tests
   - Update documentation"
fi

# Estimate complexity based on keywords
if echo "$CONTENT" | grep -qE "(architecture|refactor|migrate|redesign)"; then
  COMPLEXITY="high"
  ESTIMATED_EFFORT="2-4 weeks"
elif echo "$CONTENT" | grep -qE "(authentication|authorization|security|performance|optimization)"; then
  COMPLEXITY="high"
  ESTIMATED_EFFORT="1-3 weeks"
elif echo "$CONTENT" | grep -qE "(new feature|add|implement|integration)"; then
  COMPLEXITY="medium"
  ESTIMATED_EFFORT="3-7 days"
elif echo "$CONTENT" | grep -qE "(bug|fix|issue|problem)"; then
  COMPLEXITY="low"
  ESTIMATED_EFFORT="1-3 days"
elif echo "$CONTENT" | grep -qE "(documentation|readme|docs)"; then
  COMPLEXITY="low"
  ESTIMATED_EFFORT="1-2 days"
fi

# Determine priority
if echo "$CONTENT" | grep -qE "(critical|urgent|security|vulnerability|broken|production)"; then
  PRIORITY="high"
elif echo "$CONTENT" | grep -qE "(enhancement|improvement|optimization|nice to have)"; then
  PRIORITY="low"
fi

# Identify related concepts/technologies
if echo "$CONTENT" | grep -qE "(authentication|auth|jwt|oauth|session)"; then
  RELATED_CONCEPTS="${RELATED_CONCEPTS}authentication,"
fi
if echo "$CONTENT" | grep -qE "(testing|test|coverage|spec)"; then
  RELATED_CONCEPTS="${RELATED_CONCEPTS}testing,"
fi
if echo "$CONTENT" | grep -qE "(typescript|type|interface)"; then
  RELATED_CONCEPTS="${RELATED_CONCEPTS}typescript,"
fi
if echo "$CONTENT" | grep -qE "(api|rest|graphql|endpoint)"; then
  RELATED_CONCEPTS="${RELATED_CONCEPTS}api,"
fi
if echo "$CONTENT" | grep -qE "(ui|ux|design|layout|component)"; then
  RELATED_CONCEPTS="${RELATED_CONCEPTS}ui-ux,"
fi
if echo "$CONTENT" | grep -qE "(performance|optimization|speed|slow)"; then
  RELATED_CONCEPTS="${RELATED_CONCEPTS}performance,"
fi
if echo "$CONTENT" | grep -qE "(security|vulnerability|xss|csrf)"; then
  RELATED_CONCEPTS="${RELATED_CONCEPTS}security,"
fi

# Clean up related concepts (remove trailing comma, convert to array)
RELATED_CONCEPTS=$(echo "$RELATED_CONCEPTS" | sed 's/,$//' | tr ',' '\n' | grep -v '^$')

# Always add implementation engineer for code changes
if echo "$LABELS" | grep -qE "(enhancement|bug)"; then
  if ! echo "$AGENTS" | grep -q "@implementation-engineer"; then
    AGENTS="$AGENTS @implementation-engineer"
  fi
fi

# Clean up whitespace and convert to arrays
AGENTS=$(echo "$AGENTS" | xargs -n1 | sort -u | xargs)
LABELS=$(echo "$LABELS" | xargs -n1 | sort -u | xargs)

# Output JSON
cat << EOF
{
  "analysis": $(echo "$ANALYSIS" | jq -Rs .),
  "agents": $(echo "$AGENTS" | xargs -n1 | jq -Rs 'split("\n") | map(select(length > 0))'),
  "labels": $(echo "$LABELS" | xargs -n1 | jq -Rs 'split("\n") | map(select(length > 0))'),
  "next_steps": $(echo "$NEXT_STEPS" | jq -Rs .),
  "metadata": {
    "complexity": "$COMPLEXITY",
    "priority": "$PRIORITY",
    "estimated_effort": "$ESTIMATED_EFFORT",
    "related_concepts": $(echo "$RELATED_CONCEPTS" | jq -Rs 'split("\n") | map(select(length > 0))')
  }
}
EOF
