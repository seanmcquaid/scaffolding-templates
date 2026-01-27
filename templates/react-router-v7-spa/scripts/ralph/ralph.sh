#!/bin/bash
# Ralph Wiggum - Long-running AI agent loop
# Usage: ./ralph.sh [--tool amp|claude|copilot|cursor] [max_iterations]

set -e

# Parse arguments
TOOL="amp"  # Default to amp for backwards compatibility
MAX_ITERATIONS=10

while [[ $# -gt 0 ]]; do
  case $1 in
    --tool)
      TOOL="$2"
      shift 2
      ;;
    --tool=*)
      TOOL="${1#*=}"
      shift
      ;;
    *)
      # Assume it's max_iterations if it's a number
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        MAX_ITERATIONS="$1"
      fi
      shift
      ;;
  esac
done

# Validate tool choice
if [[ "$TOOL" != "amp" && "$TOOL" != "claude" && "$TOOL" != "copilot" && "$TOOL" != "cursor" ]]; then
  echo "Error: Invalid tool '$TOOL'. Must be 'amp', 'claude', 'copilot', or 'cursor'."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRD_FILE="$SCRIPT_DIR/../../prd.json"
PROGRESS_FILE="$SCRIPT_DIR/../../progress.txt"
ARCHIVE_DIR="$SCRIPT_DIR/../../archive"
LAST_BRANCH_FILE="$SCRIPT_DIR/../../.last-branch"
PROMPT_FILE="$SCRIPT_DIR/PROMPT.md"

# Archive previous run if branch changed
if [ -f "$PRD_FILE" ] && [ -f "$LAST_BRANCH_FILE" ]; then
  CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>/dev/null || echo "")
  LAST_BRANCH=$(cat "$LAST_BRANCH_FILE" 2>/dev/null || echo "")
  
  if [ -n "$CURRENT_BRANCH" ] && [ -n "$LAST_BRANCH" ] && [ "$CURRENT_BRANCH" != "$LAST_BRANCH" ]; then
    # Archive the previous run
    DATE=$(date +%Y-%m-%d)
    # Strip "ralph/" prefix from branch name for folder
    FOLDER_NAME=$(echo "$LAST_BRANCH" | sed 's|^ralph/||')
    ARCHIVE_FOLDER="$ARCHIVE_DIR/$DATE-$FOLDER_NAME"
    
    echo "Archiving previous run: $LAST_BRANCH"
    mkdir -p "$ARCHIVE_FOLDER"
    [ -f "$PRD_FILE" ] && cp "$PRD_FILE" "$ARCHIVE_FOLDER/"
    [ -f "$PROGRESS_FILE" ] && cp "$PROGRESS_FILE" "$ARCHIVE_FOLDER/"
    echo "   Archived to: $ARCHIVE_FOLDER"
    
    # Reset progress file for new run
    echo "# Ralph Progress Log" > "$PROGRESS_FILE"
    echo "Started: $(date)" >> "$PROGRESS_FILE"
    echo "---" >> "$PROGRESS_FILE"
  fi
fi

# Track current branch
if [ -f "$PRD_FILE" ]; then
  CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>/dev/null || echo "")
  if [ -n "$CURRENT_BRANCH" ]; then
    echo "$CURRENT_BRANCH" > "$LAST_BRANCH_FILE"
  fi
fi

# Initialize progress file if it doesn't exist
if [ ! -f "$PROGRESS_FILE" ]; then
  echo "# Ralph Progress Log" > "$PROGRESS_FILE"
  echo "Started: $(date)" >> "$PROGRESS_FILE"
  echo "---" >> "$PROGRESS_FILE"
fi

echo "Starting Ralph - Tool: $TOOL - Max iterations: $MAX_ITERATIONS"

for i in $(seq 1 $MAX_ITERATIONS); do
  echo ""
  echo "==============================================================="
  echo "  Ralph Iteration $i of $MAX_ITERATIONS ($TOOL)"
  echo "==============================================================="

  # Run the selected tool with the ralph prompt
  case "$TOOL" in
    amp)
      OUTPUT=$(cat "$PROMPT_FILE" | amp --dangerously-allow-all 2>&1 | tee /dev/stderr) || true
      ;;
    claude)
      OUTPUT=$(claude --dangerously-skip-permissions --print < "$PROMPT_FILE" 2>&1 | tee /dev/stderr) || true
      ;;
    copilot)
      echo "📝 For GitHub Copilot integration:"
      echo "   1. Open the project in your IDE with GitHub Copilot"
      echo "   2. Use the prompt in: $PROMPT_FILE"
      echo "   3. Ask Copilot to implement the next user story from prd.json"
      echo ""
      echo "⚠️  Manual mode: Review prd.json and implement the next story with Copilot assistance"
      echo "   Press Enter to mark this iteration as complete, or Ctrl+C to stop..."
      read -r
      OUTPUT=""
      ;;
    cursor)
      echo "📝 For Cursor integration:"
      echo "   1. Open the project in Cursor"
      echo "   2. Use the prompt in: $PROMPT_FILE"
      echo "   3. Ask Cursor to implement the next user story from prd.json"
      echo ""
      echo "⚠️  Manual mode: Review prd.json and implement the next story with Cursor assistance"
      echo "   Press Enter to mark this iteration as complete, or Ctrl+C to stop..."
      read -r
      OUTPUT=""
      ;;
  esac
  
  # Check for completion signal
  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ""
    echo "Ralph completed all tasks!"
    echo "Completed at iteration $i of $MAX_ITERATIONS"
    exit 0
  fi
  
  echo "Iteration $i complete. Continuing..."
  sleep 2
done

echo ""
echo "Ralph reached max iterations ($MAX_ITERATIONS) without completing all tasks."
echo "Check $PROGRESS_FILE for status."
exit 1
