#!/bin/bash
set -e

# Ralph - Local AI Workflow Orchestrator
#
# This is a simple bash script (not a CLI tool or package) that implements
# the "Ralph is a loop" methodology for local development workflows.
#
# NO INSTALLATION REQUIRED - Just run this script directly:
#   ./scripts/ralph plan "your task"
#
# Copy this script to any project to use Ralph workflows locally.
# Only dependencies: bash and git (standard on most systems)
# 
# Usage: 
#   ralph plan <task-description> [--shared]  - Create a plan for a task
#   ralph execute <plan-file>                 - Execute a plan step by step
#   ralph review <plan-file>                  - Review progress and suggest iterations
#   ralph iterate <plan-file>                 - Update plan based on review
#   ralph status [--shared]                   - Show all active plans
#   ralph show <plan-file>                    - Show plan details
#   ralph share <plan-file>                   - Move local plan to shared location
#
# Plans are stored in .ralph/ (local, git-ignored) or .ralph-shared/ (team, committed)
#
# For full documentation, see:
#   - /scripts/README.md - Ralph command reference
#   - /docs/ai-workflows.md - Complete AI workflows guide
#   - /.ralph-shared/README.md - Team collaboration guide

RALPH_DIR=".ralph"
RALPH_SHARED_DIR=".ralph-shared"
COMMAND="${1:-}"
TASK="${2:-}"
SHARED_MODE=false

# Check for --shared flag
for arg in "$@"; do
  if [ "$arg" = "--shared" ]; then
    SHARED_MODE=true
  fi
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Ensure ralph directories exist
mkdir -p "$RALPH_DIR"
mkdir -p "$RALPH_SHARED_DIR"

# Ensure .gitignore includes .ralph (but NOT .ralph-shared)
if [ -f ".gitignore" ]; then
  if ! grep -q "^\.ralph/$" .gitignore 2>/dev/null; then
    echo ".ralph/" >> .gitignore
  fi
fi

show_usage() {
  cat << EOF
${CYAN}Ralph - Local AI Workflow Orchestrator${NC}

${YELLOW}Usage:${NC}
  ralph plan <task-description> [--shared]  Create a plan for a task
  ralph execute <plan-file>                 Execute a plan step by step
  ralph review <plan-file>                  Review progress and suggest iterations
  ralph iterate <plan-file>                 Update plan based on review
  ralph status [--shared]                   Show all active plans
  ralph show <plan-file>                    Show plan details
  ralph share <plan-file>                   Move local plan to shared location

${YELLOW}Examples:${NC}
  # Start a new local task (private, not committed)
  ralph plan "Add authentication to next-ssr template"
  
  # Start a new shared task (committed for team collaboration)
  ralph plan "Refactor routing system" --shared
  
  # Share an existing local plan with the team
  ralph share test-new-feature.md
  
  # Execute the plan
  ralph execute auth-next-ssr.md
  
  # View all plans (local and shared)
  ralph status --shared

${YELLOW}Philosophy:${NC}
  Ralph follows the "Plan → Execute → Review → Iterate" cycle.
  Always start in plan mode before implementing.

${YELLOW}Plan Storage:${NC}
  ${BLUE}.ralph/${NC}        - Local plans (git-ignored, personal)
  ${BLUE}.ralph-shared/${NC} - Shared plans (committed, team-accessible)
  
${YELLOW}When to use local vs shared:${NC}
  Local:  Experiments, WIP, personal planning
  Shared: Team collaboration, distributed agents, formal planning

EOF
}

create_plan() {
  local task="$1"
  
  # Remove --shared flag from task if present
  task=$(echo "$task" | sed 's/--shared//g' | xargs)
  
  if [ -z "$task" ]; then
    echo -e "${RED}Error: Task description is required${NC}"
    echo "Usage: ralph plan <task-description> [--shared]"
    exit 1
  fi
  
  # Determine target directory
  local target_dir="$RALPH_DIR"
  if [ "$SHARED_MODE" = true ]; then
    target_dir="$RALPH_SHARED_DIR"
    echo -e "${CYAN}Creating SHARED plan (will be committed to git)${NC}"
  else
    echo -e "${CYAN}Creating LOCAL plan (git-ignored, personal)${NC}"
  fi
  
  # Generate filename from task description
  local filename=$(echo "$task" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//' | cut -c1-50)
  local plan_file="$target_dir/${filename}.md"
  
  if [ -f "$plan_file" ]; then
    echo -e "${YELLOW}Plan already exists: $plan_file${NC}"
    echo -e "${YELLOW}Use 'ralph show $filename.md' to view or 'ralph iterate $filename.md' to update${NC}"
    exit 1
  fi
  
  echo -e "${CYAN}Creating plan for: ${NC}$task"
  echo -e "${CYAN}Plan file: ${NC}$plan_file"
  echo ""
  
  # Analyze the task and suggest breakdown
  local task_type="general"
  local suggested_agents=""
  local templates=""
  
  # Detect task type
  if echo "$task" | grep -qiE "(bug|fix|error|broken)"; then
    task_type="bug"
    suggested_agents="@maintenance-engineer"
  elif echo "$task" | grep -qiE "(test|coverage|spec)"; then
    task_type="test"
    suggested_agents="@quality-analyst"
  elif echo "$task" | grep -qiE "(feature|add|implement|new)"; then
    task_type="feature"
    suggested_agents="@requirements-analyst @software-architect @implementation-engineer"
  elif echo "$task" | grep -qiE "(doc|documentation|readme)"; then
    task_type="documentation"
    suggested_agents="@ui-ux-designer"
  fi
  
  # Detect affected templates
  if echo "$task" | grep -qiE "(next|nextjs)"; then
    templates="$templates next-ssr"
    suggested_agents="$suggested_agents @nextjs-ssr-specialist"
  fi
  if echo "$task" | grep -qiE "react-router.*(spa|single)"; then
    templates="$templates react-router-v7-spa"
    suggested_agents="$suggested_agents @react-router-spa-specialist"
  fi
  if echo "$task" | grep -qiE "react-router.*(ssr|server)"; then
    templates="$templates react-router-v7-ssr"
    suggested_agents="$suggested_agents @react-router-ssr-specialist"
  fi
  if echo "$task" | grep -qiE "(tanstack|tanstack router)"; then
    templates="$templates tanstack-router-spa"
    suggested_agents="$suggested_agents @tanstack-router-spa-specialist"
  fi
  if echo "$task" | grep -qiE "(typescript-library|ts library)"; then
    templates="$templates typescript-library"
    suggested_agents="$suggested_agents @typescript-library-specialist"
  fi
  if echo "$task" | grep -qiE "(expo|react-native|mobile)"; then
    templates="$templates expo-react-native"
    suggested_agents="$suggested_agents @expo-react-native-specialist"
  fi
  
  # Create plan file
  cat > "$plan_file" << EOF
# Ralph Plan: $task

**Created:** $(date '+%Y-%m-%d %H:%M:%S')
**Status:** Planning
**Type:** $task_type
**Affected Templates:** ${templates:-all}

## Task Description

$task

## Suggested Agents

${suggested_agents:-@requirements-analyst}

## Ralph Workflow: Plan → Execute → Review → Iterate

### Phase 1: PLAN (Current)

#### Analysis
- [ ] Understand requirements in detail
- [ ] Identify affected files and templates
- [ ] Consider edge cases and constraints
- [ ] Review existing patterns in codebase

#### Task Breakdown
EOF

  # Add task-specific breakdown
  case $task_type in
    bug)
      cat >> "$plan_file" << EOF
- [ ] Reproduce the issue
- [ ] Identify root cause
- [ ] Determine affected areas
- [ ] Plan fix approach
- [ ] Consider regression tests
EOF
      ;;
    test)
      cat >> "$plan_file" << EOF
- [ ] Review current test coverage
- [ ] Identify specific gaps
- [ ] Plan test cases needed
- [ ] Determine test types (unit/integration/e2e)
- [ ] Consider edge cases to test
EOF
      ;;
    feature)
      cat >> "$plan_file" << EOF
- [ ] Clarify requirements and scope
- [ ] Define acceptance criteria
- [ ] Design architecture approach
- [ ] Identify impacted components
- [ ] Plan implementation steps
- [ ] Consider cross-template consistency
- [ ] Plan tests and documentation
EOF
      ;;
    documentation)
      cat >> "$plan_file" << EOF
- [ ] Identify documentation needs
- [ ] Plan content structure
- [ ] Review existing docs for consistency
- [ ] Gather technical details
- [ ] Plan examples and code samples
EOF
      ;;
    *)
      cat >> "$plan_file" << EOF
- [ ] Break down task into subtasks
- [ ] Estimate complexity
- [ ] Identify dependencies
- [ ] Plan validation approach
EOF
      ;;
  esac

  cat >> "$plan_file" << EOF

### Phase 2: EXECUTE

*Move to this phase after planning is complete*

#### Implementation Steps
- [ ] Set up development environment
- [ ] Implement planned changes
- [ ] Follow template-specific patterns
- [ ] Add tests as you go
- [ ] Update documentation

#### Progress Notes

(Add notes as you work)

### Phase 3: REVIEW

*Move to this phase after implementation*

#### Validation Checklist
- [ ] All tests pass (\`pnpm test\`)
- [ ] Linting passes (\`pnpm lint\`)
- [ ] Build succeeds (\`pnpm build\`)
- [ ] Changes follow template patterns
- [ ] Documentation is updated
- [ ] No unintended side effects

#### Review Notes

(Add observations and findings)

### Phase 4: ITERATE

*Based on review, identify improvements*

#### Iteration Points

(Add items that need refinement)

---

## History

- $(date '+%Y-%m-%d %H:%M:%S') - Plan created

## Notes

(Add any additional notes or context)
EOF

  echo -e "${GREEN}✓ Plan created: $plan_file${NC}"
  echo ""
  echo -e "${YELLOW}Next steps:${NC}"
  echo "1. Review and refine the plan: ${BLUE}ralph show $filename.md${NC}"
  echo "2. Execute the plan: ${BLUE}ralph execute $filename.md${NC}"
  echo "3. Track your progress in the markdown file"
  echo ""
  echo -e "${CYAN}Opening plan file...${NC}"
  
  # Try to open with default editor
  if [ -n "${EDITOR:-}" ]; then
    $EDITOR "$plan_file"
  elif command -v code >/dev/null 2>&1; then
    code "$plan_file"
  elif command -v vim >/dev/null 2>&1; then
    vim "$plan_file"
  else
    cat "$plan_file"
  fi
}

show_status() {
  echo -e "${CYAN}Ralph Plans Status${NC}"
  echo ""
  
  if [ ! -d "$RALPH_DIR" ] || [ -z "$(ls -A $RALPH_DIR 2>/dev/null)" ]; then
    echo -e "${YELLOW}No active plans found.${NC}"
    echo ""
    echo "Create a new plan with: ${BLUE}ralph plan <task-description>${NC}"
    return
  fi
  
  local count=0
  for plan in "$RALPH_DIR"/*.md; do
    if [ -f "$plan" ]; then
      count=$((count + 1))
      local filename=$(basename "$plan")
      local status=$(grep "^\*\*Status:\*\*" "$plan" | sed 's/\*\*Status:\*\* //')
      local created=$(grep "^\*\*Created:\*\*" "$plan" | sed 's/\*\*Created:\*\* //')
      local task=$(head -1 "$plan" | sed 's/# Ralph Plan: //')
      
      echo -e "${GREEN}$count.${NC} ${BLUE}$filename${NC}"
      echo -e "   Task: $task"
      echo -e "   Status: ${YELLOW}$status${NC}"
      echo -e "   Created: $created"
      echo ""
    fi
  done
  
  if [ $count -eq 0 ]; then
    echo -e "${YELLOW}No active plans found.${NC}"
  else
    echo -e "${CYAN}Total plans: $count${NC}"
  fi
}

show_plan() {
  local plan_file="$1"
  
  if [ -z "$plan_file" ]; then
    echo -e "${RED}Error: Plan file is required${NC}"
    echo "Usage: ralph show <plan-file>"
    exit 1
  fi
  
  # Add .ralph/ prefix if not present
  if [[ ! "$plan_file" =~ ^\.ralph/ ]]; then
    plan_file="$RALPH_DIR/$plan_file"
  fi
  
  if [ ! -f "$plan_file" ]; then
    echo -e "${RED}Error: Plan file not found: $plan_file${NC}"
    echo ""
    echo "Available plans:"
    show_status
    exit 1
  fi
  
  # Display with colors if possible
  if command -v bat >/dev/null 2>&1; then
    bat --style=plain --paging=never "$plan_file"
  elif command -v mdcat >/dev/null 2>&1; then
    mdcat "$plan_file"
  else
    cat "$plan_file"
  fi
}

execute_plan() {
  local plan_file="$1"
  
  if [ -z "$plan_file" ]; then
    echo -e "${RED}Error: Plan file is required${NC}"
    echo "Usage: ralph execute <plan-file>"
    exit 1
  fi
  
  # Add .ralph/ prefix if not present
  if [[ ! "$plan_file" =~ ^\.ralph/ ]]; then
    plan_file="$RALPH_DIR/$plan_file"
  fi
  
  if [ ! -f "$plan_file" ]; then
    echo -e "${RED}Error: Plan file not found: $plan_file${NC}"
    exit 1
  fi
  
  echo -e "${CYAN}Executing plan: $plan_file${NC}"
  echo ""
  
  # Update status
  sed -i.bak 's/\*\*Status:\*\* .*/\*\*Status:\*\* Executing/' "$plan_file"
  rm -f "$plan_file.bak"
  
  # Add history entry
  echo "- $(date '+%Y-%m-%d %H:%M:%S') - Execution started" >> "$plan_file"
  
  echo -e "${GREEN}✓ Plan status updated to 'Executing'${NC}"
  echo ""
  echo -e "${YELLOW}Now implement the planned changes:${NC}"
  echo "1. Follow the implementation steps in the plan"
  echo "2. Check off items as you complete them"
  echo "3. Add progress notes in the plan file"
  echo ""
  echo -e "${CYAN}When done, review your work:${NC}"
  echo "${BLUE}ralph review $(basename $plan_file)${NC}"
  echo ""
  
  # Open the plan file
  if [ -n "${EDITOR:-}" ]; then
    $EDITOR "$plan_file"
  elif command -v code >/dev/null 2>&1; then
    code "$plan_file"
  fi
}

review_plan() {
  local plan_file="$1"
  
  if [ -z "$plan_file" ]; then
    echo -e "${RED}Error: Plan file is required${NC}"
    echo "Usage: ralph review <plan-file>"
    exit 1
  fi
  
  # Add .ralph/ prefix if not present
  if [[ ! "$plan_file" =~ ^\.ralph/ ]]; then
    plan_file="$RALPH_DIR/$plan_file"
  fi
  
  if [ ! -f "$plan_file" ]; then
    echo -e "${RED}Error: Plan file not found: $plan_file${NC}"
    exit 1
  fi
  
  echo -e "${CYAN}Reviewing plan: $plan_file${NC}"
  echo ""
  
  # Update status
  sed -i.bak 's/\*\*Status:\*\* .*/\*\*Status:\*\* Reviewing/' "$plan_file"
  rm -f "$plan_file.bak"
  
  # Add history entry
  echo "- $(date '+%Y-%m-%d %H:%M:%S') - Review started" >> "$plan_file"
  
  echo -e "${YELLOW}Review Checklist:${NC}"
  echo ""
  echo "Run the following commands and check results:"
  echo ""
  echo -e "  ${BLUE}pnpm test${NC}          # Run all tests"
  echo -e "  ${BLUE}pnpm lint${NC}          # Check code quality"
  echo -e "  ${BLUE}pnpm build${NC}         # Verify build succeeds"
  echo ""
  echo "Then add review notes to the plan file."
  echo ""
  echo -e "${CYAN}After review, either:${NC}"
  echo "  - Complete if satisfied: Update status to 'Complete' in plan"
  echo "  - Iterate if improvements needed: ${BLUE}ralph iterate $(basename $plan_file)${NC}"
  echo ""
  
  # Open the plan file
  if [ -n "${EDITOR:-}" ]; then
    $EDITOR "$plan_file"
  elif command -v code >/dev/null 2>&1; then
    code "$plan_file"
  fi
}

iterate_plan() {
  local plan_file="$1"
  
  if [ -z "$plan_file" ]; then
    echo -e "${RED}Error: Plan file is required${NC}"
    echo "Usage: ralph iterate <plan-file>"
    exit 1
  fi
  
  # Add .ralph/ prefix if not present
  if [[ ! "$plan_file" =~ ^\.ralph/ ]]; then
    plan_file="$RALPH_DIR/$plan_file"
  fi
  
  if [ ! -f "$plan_file" ]; then
    echo -e "${RED}Error: Plan file not found: $plan_file${NC}"
    exit 1
  fi
  
  echo -e "${CYAN}Iterating on plan: $plan_file${NC}"
  echo ""
  
  # Update status
  sed -i.bak 's/\*\*Status:\*\* .*/\*\*Status:\*\* Iterating/' "$plan_file"
  rm -f "$plan_file.bak"
  
  # Add history entry
  echo "- $(date '+%Y-%m-%d %H:%M:%S') - Iteration started" >> "$plan_file"
  
  echo -e "${GREEN}✓ Plan status updated to 'Iterating'${NC}"
  echo ""
  echo -e "${YELLOW}Based on your review, update the plan with:${NC}"
  echo "1. New tasks identified"
  echo "2. Refinements needed"
  echo "3. Issues to address"
  echo ""
  echo -e "${CYAN}After updating, execute again:${NC}"
  echo "${BLUE}ralph execute $(basename $plan_file)${NC}"
  echo ""
  
  # Open the plan file
  if [ -n "${EDITOR:-}" ]; then
    $EDITOR "$plan_file"
  elif command -v code >/dev/null 2>&1; then
    code "$plan_file"
  fi
}

share_plan() {
  local plan_file="$1"
  
  if [ -z "$plan_file" ]; then
    echo -e "${RED}Error: Plan file is required${NC}"
    echo "Usage: ralph share <plan-file>"
    exit 1
  fi
  
  # Check if file exists in local directory
  local local_plan="$RALPH_DIR/$plan_file"
  if [[ ! "$plan_file" =~ ^\.ralph/ ]]; then
    if [ ! -f "$local_plan" ]; then
      echo -e "${RED}Error: Local plan not found: $local_plan${NC}"
      echo ""
      echo "Available local plans:"
      ls -1 "$RALPH_DIR"/*.md 2>/dev/null || echo "  (none)"
      exit 1
    fi
  else
    local_plan="$plan_file"
  fi
  
  if [ ! -f "$local_plan" ]; then
    echo -e "${RED}Error: Plan file not found: $local_plan${NC}"
    exit 1
  fi
  
  local filename=$(basename "$local_plan")
  local shared_plan="$RALPH_SHARED_DIR/$filename"
  
  if [ -f "$shared_plan" ]; then
    echo -e "${YELLOW}Shared plan already exists: $shared_plan${NC}"
    echo -e "${YELLOW}Overwrite? (y/n)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
      echo "Operation cancelled"
      exit 0
    fi
  fi
  
  echo -e "${CYAN}Moving plan to shared location...${NC}"
  cp "$local_plan" "$shared_plan"
  echo -e "${GREEN}✓ Plan copied to: $shared_plan${NC}"
  echo ""
  
  echo -e "${YELLOW}Next steps:${NC}"
  echo "1. Review the plan: ${BLUE}ralph show $filename${NC}"
  echo "2. Commit to git:"
  echo -e "   ${BLUE}git add $shared_plan${NC}"
  echo -e "   ${BLUE}git commit -m \"Add shared plan: $filename\"${NC}"
  echo -e "   ${BLUE}git push${NC}"
  echo ""
  echo "3. Optionally remove local copy:"
  echo -e "   ${BLUE}rm $local_plan${NC}"
  echo ""
  echo -e "${CYAN}The shared plan is now accessible to all team members and distributed agents.${NC}"
}

# Main command router
case "$COMMAND" in
  plan)
    create_plan "$TASK"
    ;;
  execute)
    execute_plan "$TASK"
    ;;
  review)
    review_plan "$TASK"
    ;;
  iterate)
    iterate_plan "$TASK"
    ;;
  status)
    show_status
    ;;
  show)
    show_plan "$TASK"
    ;;
  share)
    share_plan "$TASK"
    ;;
  ""|help|--help|-h)
    show_usage
    ;;
  *)
    echo -e "${RED}Error: Unknown command: $COMMAND${NC}"
    echo ""
    show_usage
    exit 1
    ;;
esac
