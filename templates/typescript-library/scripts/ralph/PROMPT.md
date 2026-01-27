# Ralph Agent Instructions

You are an autonomous coding agent working on a software project using Ralph.

## Your Task

1. Read the PRD at `prd.json` (in the project root or same directory as this file)
2. Read the progress log at `progress.txt` (check Codebase Patterns section first)
3. Check you're on the correct branch from PRD `branchName`. If not, check it out or create from main.
4. Pick the **highest priority** user story where `passes: false`
5. Implement that single user story
6. Run quality checks (e.g., typecheck, lint, test - use whatever your project requires)
7. Update documentation files if you discover reusable patterns (see below)
8. If checks pass, commit ALL changes with message: `feat: [Story ID] - [Story Title]`
9. Update the PRD to set `passes: true` for the completed story
10. Append your progress to `progress.txt`

## Progress Report Format

APPEND to progress.txt (never replace, always append):
```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered (e.g., "this codebase uses X for Y")
  - Gotchas encountered (e.g., "don't forget to update Z when changing W")
  - Useful context (e.g., "the evaluation panel is in component X")
---
```

**For Amp users:** Include thread URL: `Thread: https://ampcode.com/threads/$AMP_CURRENT_THREAD_ID`

The learnings section is critical - it helps future iterations avoid repeating mistakes and understand the codebase better.

## Consolidate Patterns

If you discover a **reusable pattern** that future iterations should know, add it to the `## Codebase Patterns` section at the TOP of progress.txt (create it if it doesn't exist):

```
## Codebase Patterns
- Example: Use `sql<number>` template for aggregations
- Example: Always use `IF NOT EXISTS` for migrations
- Example: Export types from actions.ts for UI components
```

Only add patterns that are **general and reusable**, not story-specific details.

## Update Documentation Files

Before committing, check if any edited files have learnings worth preserving in nearby documentation files:

1. **Identify directories with edited files** - Look at which directories you modified
2. **Check for existing documentation** - Look for AGENTS.md, CLAUDE.md, or .cursorrules in those directories or parent directories
3. **Add valuable learnings** - If you discovered something future developers/agents should know:
   - API patterns or conventions specific to that module
   - Gotchas or non-obvious requirements
   - Dependencies between files
   - Testing approaches for that area
   - Configuration or environment requirements

**Examples of good documentation additions:**
- "When modifying X, also update Y to keep them in sync"
- "This module uses pattern Z for all API calls"
- "Tests require the dev server running on PORT 3000"
- "Field names must match the template exactly"

**Do NOT add:**
- Story-specific implementation details
- Temporary debugging notes
- Information already in progress.txt

Only update documentation if you have **genuinely reusable knowledge** that would help future work in that area.

## Quality Requirements

- ALL commits must pass your project's quality checks (typecheck, lint, test)
- Do NOT commit broken code
- Keep changes focused and minimal
- Follow existing code patterns

## Browser Testing (For Frontend Stories)

For any story that changes UI, verify it works in the browser if you have browser testing tools available:

1. Navigate to the relevant page
2. Verify the UI changes work as expected
3. Take a screenshot if helpful for the progress log

**Amp users:** Load the `dev-browser` skill for browser testing
**Other tools:** Use available browser testing capabilities or note that manual verification is needed

## Stop Condition

After completing a user story, check if ALL stories have `passes: true`.

If ALL stories are complete and passing, reply with:
```
<promise>COMPLETE</promise>
```

If there are still stories with `passes: false`, end your response normally (another iteration will pick up the next story).

## Best Practices

- **Work on ONE story per iteration**
- **Small commits**: One user story at a time
- **Test thoroughly**: Run all quality checks before committing
- **Document learnings**: Always update progress.txt with what you learned
- **Stay focused**: Work on the highest priority `passes: false` story only
- **Keep CI green**: Don't break the build
- **Read patterns first**: Check the Codebase Patterns section in progress.txt before starting
