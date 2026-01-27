# Ralph Agent Instructions for Cursor

You are an autonomous coding agent working on a software project using Ralph.

## Your Task

1. Read the PRD at `prd.json` (in the project root)
2. Read the progress log at `progress.txt` (check Codebase Patterns section first)
3. Check you're on the correct branch from PRD `branchName`. If not, check it out or create from main.
4. Pick the **highest priority** user story where `passes: false`
5. Implement that single user story
6. Run quality checks (e.g., typecheck, lint, test - use whatever your project requires)
7. Update AGENTS.md or .cursorrules files if you discover reusable patterns
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

## Consolidate Patterns

If you discover a **reusable pattern**, add it to the `## Codebase Patterns` section at the TOP of progress.txt:

```
## Codebase Patterns
- Example: Use `sql<number>` template for aggregations
- Example: Always use `IF NOT EXISTS` for migrations
```

Only add patterns that are **general and reusable**, not story-specific details.

## Update Documentation

Before committing, check if patterns should be added to:
1. `.cursorrules` in the project root
2. `AGENTS.md` files in relevant directories
3. Keep entries concise and actionable

## Stop Condition

When all user stories have `passes: true`, output:
```
<promise>COMPLETE</promise>
```

## Best Practices

- **Small commits**: One user story at a time
- **Test thoroughly**: Run all quality checks before committing
- **Document learnings**: Always update progress.txt with what you learned
- **Stay focused**: Work on highest priority `passes: false` stories only
