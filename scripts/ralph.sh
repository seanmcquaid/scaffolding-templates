#!/bin/bash
# Ralph - Local workflow orchestrator
# Implements "Ralph is a loop" methodology for local development
# Usage: ./ralph.sh <command> [args]

set -e

RALPH_DIR=".ralph"
SHARED_RALPH_DIR=".ralph-shared"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Cross-platform sed in-place editing
# macOS requires -i '', Linux requires -i
sed_inplace() {
  if sed --version &>/dev/null 2>&1; then
    # GNU sed (Linux)
    sed -i "$@"
  else
    # BSD sed (macOS)
    sed -i '' "$@"
  fi
}

# Print usage
usage() {
  cat <<EOF
Ralph - Local Workflow Orchestrator

USAGE:
  ./scripts/ralph.sh <command> [args]

COMMANDS:
  plan <task> [--shared]     Create a structured plan for a task
  execute <plan>             Mark plan as executing and guide implementation
  review <plan>              Review completed work against validation checklist
  iterate <plan>             Update plan based on review feedback
  status [--shared]          Show all active plans with their status
  show <plan>                Display a plan file
  share <plan>               Move a local plan to shared directory

EXAMPLES:
  ./scripts/ralph.sh plan "Add authentication to next-ssr template"
  ./scripts/ralph.sh plan "Fix routing bug" --shared
  ./scripts/ralph.sh execute auth-next-ssr.md
  ./scripts/ralph.sh review auth-next-ssr.md
  ./scripts/ralph.sh iterate auth-next-ssr.md
  ./scripts/ralph.sh status
  ./scripts/ralph.sh status --shared
  ./scripts/ralph.sh show auth-next-ssr.md
  ./scripts/ralph.sh share auth-next-ssr.md

NOTES:
  - Plans are stored in .ralph/ directory (local, git-ignored)
  - Use --shared flag to create plans in .ralph-shared/ (committed to git)
  - Shared plans enable team collaboration and distributed AI agents

EOF
}

# Detect template from current directory or task description
detect_template() {
  local task="$1"
  local templates=("next-ssr" "react-router-v7-spa" "react-router-v7-ssr" "tanstack-router-spa" "typescript-library" "expo-react-native")
  
  # Check if we're in a template directory
  for template in "${templates[@]}"; do
    if [[ "$PWD" == *"/templates/$template"* ]]; then
      echo "$template"
      return
    fi
  done
  
  # Check task description for template mentions
  for template in "${templates[@]}"; do
    if [[ "$task" == *"$template"* ]]; then
      echo "$template"
      return
    fi
  done
  
  echo "multiple"
}

# Classify task type
classify_task() {
  local task="$1"
  
  # Keywords for classification
  if [[ "$task" =~ (bug|fix|error|issue|broken) ]]; then
    echo "bug"
  elif [[ "$task" =~ (test|coverage|spec) ]]; then
    echo "testing"
  elif [[ "$task" =~ (doc|documentation|readme) ]]; then
    echo "documentation"
  elif [[ "$task" =~ (refactor|clean|improve) ]]; then
    echo "refactor"
  else
    echo "feature"
  fi
}

# Get suggested agents based on task type and template
get_suggested_agents() {
  local task_type="$1"
  local template="$2"
  
  local agents=""
  
  case "$task_type" in
    bug)
      agents="@maintenance-engineer"
      ;;
    feature)
      agents="@requirements-analyst @software-architect @implementation-engineer"
      ;;
    testing)
      agents="@quality-analyst"
      ;;
    documentation)
      agents="@ui-ux-designer"
      ;;
    refactor)
      agents="@software-architect @maintenance-engineer"
      ;;
  esac
  
  # Add template specialist
  case "$template" in
    next-ssr)
      agents="$agents @nextjs-ssr-specialist"
      ;;
    react-router-v7-spa)
      agents="$agents @react-router-spa-specialist"
      ;;
    react-router-v7-ssr)
      agents="$agents @react-router-ssr-specialist"
      ;;
    tanstack-router-spa)
      agents="$agents @tanstack-router-spa-specialist"
      ;;
    typescript-library)
      agents="$agents @typescript-library-specialist"
      ;;
    expo-react-native)
      agents="$agents @expo-react-native-specialist"
      ;;
  esac
  
  echo "$agents" | xargs
}

# Create a plan
cmd_plan() {
  local task="$1"
  local shared=false
  
  if [[ "$2" == "--shared" ]]; then
    shared=true
  fi
  
  if [[ -z "$task" ]]; then
    echo -e "${RED}Error: Task description required${NC}"
    echo "Usage: ./scripts/ralph.sh plan \"<task description>\" [--shared]"
    exit 1
  fi
  
  # Determine target directory
  local target_dir="$RALPH_DIR"
  if [[ "$shared" == true ]]; then
    target_dir="$SHARED_RALPH_DIR"
  fi
  
  # Create directory if it doesn't exist
  mkdir -p "$target_dir"
  
  # Generate filename from task
  local filename=$(echo "$task" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
  filename="${filename:0:50}.md"  # Limit length
  local filepath="$target_dir/$filename"
  
  # Check if plan already exists
  if [[ -f "$filepath" ]]; then
    echo -e "${YELLOW}Plan already exists: $filepath${NC}"
    echo "Use 'show' command to view it, or 'iterate' to update it"
    exit 1
  fi
  
  # Detect template and classify task
  local template=$(detect_template "$task")
  local task_type=$(classify_task "$task")
  local agents=$(get_suggested_agents "$task_type" "$template")
  
  # Create plan content
  cat > "$filepath" <<EOF
# Ralph Plan: $task

**Status:** Planning  
**Type:** $task_type  
**Affected Templates:** $template  
**Created:** $(date +"%Y-%m-%d %H:%M:%S")

## Suggested Agents

$agents

## Ralph Workflow: Plan → Execute → Review → Iterate

### Phase 1: PLAN 🎯

**Goal:** Understand requirements and design approach

- [ ] Analyze the requirements thoroughly
- [ ] Review existing code patterns in affected templates
- [ ] Identify dependencies and potential conflicts
- [ ] Design the solution approach
- [ ] Break down into implementable steps

**Key Questions:**
- What problem are we solving?
- What are the acceptance criteria?
- What existing patterns should we follow?
- What are the risks and dependencies?

---

### Phase 2: EXECUTE 🔨

**Goal:** Implement the solution

- [ ] Set up necessary environment/dependencies
- [ ] Implement core functionality
- [ ] Add unit tests
- [ ] Add integration tests (if applicable)
- [ ] Update documentation
- [ ] Follow repository coding standards

**Implementation Checklist:**
- [ ] Code follows TypeScript best practices
- [ ] All user-facing text uses i18next (no hardcoded strings)
- [ ] Components use proper error boundaries
- [ ] Forms use React Hook Form
- [ ] Server state uses TanStack Query
- [ ] Styling uses Tailwind CSS patterns

---

### Phase 3: REVIEW 🔍

**Goal:** Validate the implementation

- [ ] Run linter: \`pnpm lint\`
- [ ] Run type checker: \`pnpm typecheck\`
- [ ] Run tests: \`pnpm test\`
- [ ] Test manually (if UI changes)
- [ ] Review code for consistency with patterns
- [ ] Check test coverage meets threshold (80%+)
- [ ] Verify all acceptance criteria are met

**Quality Gates:**
- [ ] All tests pass
- [ ] No linting errors
- [ ] No TypeScript errors
- [ ] Code follows repository patterns
- [ ] Documentation is updated

---

### Phase 4: ITERATE 🔄

**Goal:** Refine based on feedback

_Add refinements, feedback, and improvements here as you iterate_

**Feedback Log:**

---

## Notes

_Add any additional context, decisions, or learnings here_

---

**Plan Location:** \`$filepath\`  
**Next Step:** Run \`./scripts/ralph.sh execute $filename\`
EOF

  echo -e "${GREEN}✓ Created plan: $filepath${NC}"
  echo ""
  echo "Next steps:"
  echo "  1. Review the plan: ./scripts/ralph.sh show $filename"
  echo "  2. Start execution: ./scripts/ralph.sh execute $filename"
  echo ""
  if [[ "$shared" == true ]]; then
    echo -e "${BLUE}This is a shared plan (committed to git) for team collaboration${NC}"
  else
    echo -e "${BLUE}This is a local plan (git-ignored) for individual work${NC}"
    echo "To share with team: ./scripts/ralph.sh share $filename"
  fi
}

# Execute a plan
cmd_execute() {
  local plan="$1"
  
  if [[ -z "$plan" ]]; then
    echo -e "${RED}Error: Plan filename required${NC}"
    echo "Usage: ./scripts/ralph.sh execute <plan-file>"
    exit 1
  fi
  
  # Find the plan file
  local filepath=""
  if [[ -f "$RALPH_DIR/$plan" ]]; then
    filepath="$RALPH_DIR/$plan"
  elif [[ -f "$SHARED_RALPH_DIR/$plan" ]]; then
    filepath="$SHARED_RALPH_DIR/$plan"
  elif [[ -f "$plan" ]]; then
    filepath="$plan"
  else
    echo -e "${RED}Error: Plan not found: $plan${NC}"
    echo "Available plans:"
    cmd_status
    exit 1
  fi
  
  # Update status to Executing
  sed_inplace 's/\*\*Status:\*\* Planning/\*\*Status:\*\* Executing/' "$filepath"
  sed_inplace 's/\*\*Status:\*\* Reviewing/\*\*Status:\*\* Executing/' "$filepath"
  sed_inplace 's/\*\*Status:\*\* Iterating/\*\*Status:\*\* Executing/' "$filepath"
  
  echo -e "${GREEN}✓ Plan marked as executing: $filepath${NC}"
  echo ""
  echo "Implementation guidance:"
  echo "  1. Follow the EXECUTE phase checklist in the plan"
  echo "  2. Check off items as you complete them"
  echo "  3. Refer to suggested agents for guidance"
  echo "  4. When done, run: ./scripts/ralph.sh review $plan"
  echo ""
  echo "Opening plan..."
  cmd_show "$plan"
}

# Review a plan
cmd_review() {
  local plan="$1"
  
  if [[ -z "$plan" ]]; then
    echo -e "${RED}Error: Plan filename required${NC}"
    echo "Usage: ./scripts/ralph.sh review <plan-file>"
    exit 1
  fi
  
  # Find the plan file
  local filepath=""
  if [[ -f "$RALPH_DIR/$plan" ]]; then
    filepath="$RALPH_DIR/$plan"
  elif [[ -f "$SHARED_RALPH_DIR/$plan" ]]; then
    filepath="$SHARED_RALPH_DIR/$plan"
  elif [[ -f "$plan" ]]; then
    filepath="$plan"
  else
    echo -e "${RED}Error: Plan not found: $plan${NC}"
    exit 1
  fi
  
  # Update status to Reviewing
  sed_inplace 's/\*\*Status:\*\* Executing/\*\*Status:\*\* Reviewing/' "$filepath"
  sed_inplace 's/\*\*Status:\*\* Planning/\*\*Status:\*\* Reviewing/' "$filepath"
  
  echo -e "${GREEN}✓ Plan marked as reviewing: $filepath${NC}"
  echo ""
  echo "Review checklist:"
  echo "  1. Follow the REVIEW phase checklist in the plan"
  echo "  2. Run all quality gates (lint, typecheck, test)"
  echo "  3. Verify acceptance criteria are met"
  echo "  4. Document any issues in the plan"
  echo ""
  echo "Next steps:"
  echo "  - If issues found: ./scripts/ralph.sh iterate $plan"
  echo "  - If all good: Mark as complete in the plan"
  echo ""
  echo "Opening plan..."
  cmd_show "$plan"
}

# Iterate on a plan
cmd_iterate() {
  local plan="$1"
  
  if [[ -z "$plan" ]]; then
    echo -e "${RED}Error: Plan filename required${NC}"
    echo "Usage: ./scripts/ralph.sh iterate <plan-file>"
    exit 1
  fi
  
  # Find the plan file
  local filepath=""
  if [[ -f "$RALPH_DIR/$plan" ]]; then
    filepath="$RALPH_DIR/$plan"
  elif [[ -f "$SHARED_RALPH_DIR/$plan" ]]; then
    filepath="$SHARED_RALPH_DIR/$plan"
  elif [[ -f "$plan" ]]; then
    filepath="$plan"
  else
    echo -e "${RED}Error: Plan not found: $plan${NC}"
    exit 1
  fi
  
  # Update status to Iterating
  sed_inplace 's/\*\*Status:\*\* .*/\*\*Status:\*\* Iterating/' "$filepath"
  
  # Add iteration timestamp
  local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
  sed_inplace "/\*\*Feedback Log:\*\*/a\\
\\
**Iteration $timestamp:**\\
- _Add feedback and refinements here_\\
" "$filepath"
  
  echo -e "${GREEN}✓ Plan marked as iterating: $filepath${NC}"
  echo ""
  echo "Iteration guidance:"
  echo "  1. Document feedback in the ITERATE phase"
  echo "  2. Update the plan based on review findings"
  echo "  3. Make necessary refinements to implementation"
  echo "  4. When done, run: ./scripts/ralph.sh execute $plan"
  echo ""
  echo "Opening plan..."
  cmd_show "$plan"
}

# Show status of all plans
cmd_status() {
  local show_shared=false
  
  if [[ "$1" == "--shared" ]]; then
    show_shared=true
  fi
  
  echo -e "${BLUE}=== Ralph Plans Status ===${NC}"
  echo ""
  
  # Show local plans
  if [[ -d "$RALPH_DIR" ]] && [[ $(ls -A "$RALPH_DIR" 2>/dev/null) ]]; then
    echo -e "${GREEN}Local Plans (.ralph/):${NC}"
    for plan in "$RALPH_DIR"/*.md; do
      if [[ -f "$plan" ]]; then
        local status=$(grep -m 1 "^\*\*Status:\*\*" "$plan" | sed 's/\*\*Status:\*\* //' || echo "Unknown")
        local task=$(grep -m 1 "^# Ralph Plan:" "$plan" | sed 's/# Ralph Plan: //' || echo "Untitled")
        local filename=$(basename "$plan")
        echo "  - $filename"
        echo "    Status: $status"
        echo "    Task: $task"
        echo ""
      fi
    done
  else
    echo -e "${YELLOW}No local plans found${NC}"
    echo ""
  fi
  
  # Show shared plans if requested or if no local plans
  if [[ "$show_shared" == true ]] || [[ ! -d "$RALPH_DIR" ]] || [[ ! $(ls -A "$RALPH_DIR" 2>/dev/null) ]]; then
    if [[ -d "$SHARED_RALPH_DIR" ]] && [[ $(ls -A "$SHARED_RALPH_DIR" 2>/dev/null) ]]; then
      echo -e "${GREEN}Shared Plans (.ralph-shared/):${NC}"
      for plan in "$SHARED_RALPH_DIR"/*.md; do
        if [[ -f "$plan" ]]; then
          local status=$(grep -m 1 "^\*\*Status:\*\*" "$plan" | sed 's/\*\*Status:\*\* //' || echo "Unknown")
          local task=$(grep -m 1 "^# Ralph Plan:" "$plan" | sed 's/# Ralph Plan: //' || echo "Untitled")
          local filename=$(basename "$plan")
          echo "  - $filename"
          echo "    Status: $status"
          echo "    Task: $task"
          echo ""
        fi
      done
    else
      if [[ "$show_shared" == true ]]; then
        echo -e "${YELLOW}No shared plans found${NC}"
        echo ""
      fi
    fi
  fi
  
  echo "Commands:"
  echo "  - View a plan: ./scripts/ralph.sh show <plan-file>"
  echo "  - Create plan: ./scripts/ralph.sh plan \"<task>\""
  echo "  - Show shared: ./scripts/ralph.sh status --shared"
}

# Show a plan
cmd_show() {
  local plan="$1"
  
  if [[ -z "$plan" ]]; then
    echo -e "${RED}Error: Plan filename required${NC}"
    echo "Usage: ./scripts/ralph.sh show <plan-file>"
    exit 1
  fi
  
  # Find the plan file
  local filepath=""
  if [[ -f "$RALPH_DIR/$plan" ]]; then
    filepath="$RALPH_DIR/$plan"
  elif [[ -f "$SHARED_RALPH_DIR/$plan" ]]; then
    filepath="$SHARED_RALPH_DIR/$plan"
  elif [[ -f "$plan" ]]; then
    filepath="$plan"
  else
    echo -e "${RED}Error: Plan not found: $plan${NC}"
    exit 1
  fi
  
  echo -e "${BLUE}=== Plan: $plan ===${NC}"
  echo ""
  cat "$filepath"
}

# Share a local plan (move to shared directory)
cmd_share() {
  local plan="$1"
  
  if [[ -z "$plan" ]]; then
    echo -e "${RED}Error: Plan filename required${NC}"
    echo "Usage: ./scripts/ralph.sh share <plan-file>"
    exit 1
  fi
  
  # Find the plan file in local directory
  local filepath="$RALPH_DIR/$plan"
  if [[ ! -f "$filepath" ]]; then
    echo -e "${RED}Error: Local plan not found: $plan${NC}"
    echo "Only local plans can be shared"
    exit 1
  fi
  
  # Create shared directory if it doesn't exist
  mkdir -p "$SHARED_RALPH_DIR"
  
  # Move the plan
  mv "$filepath" "$SHARED_RALPH_DIR/$plan"
  
  echo -e "${GREEN}✓ Plan moved to shared directory: $SHARED_RALPH_DIR/$plan${NC}"
  echo ""
  echo "Next steps:"
  echo "  1. Commit the shared plan: git add .ralph-shared/$plan && git commit"
  echo "  2. Push to remote: git push"
  echo "  3. Team members and AI agents can now access the plan"
}

# Main command router
main() {
  if [[ $# -eq 0 ]]; then
    usage
    exit 0
  fi
  
  local command="$1"
  shift
  
  case "$command" in
    plan)
      cmd_plan "$@"
      ;;
    execute)
      cmd_execute "$@"
      ;;
    review)
      cmd_review "$@"
      ;;
    iterate)
      cmd_iterate "$@"
      ;;
    status)
      cmd_status "$@"
      ;;
    show)
      cmd_show "$@"
      ;;
    share)
      cmd_share "$@"
      ;;
    help|--help|-h)
      usage
      ;;
    *)
      echo -e "${RED}Error: Unknown command: $command${NC}"
      echo ""
      usage
      exit 1
      ;;
  esac
}

main "$@"
