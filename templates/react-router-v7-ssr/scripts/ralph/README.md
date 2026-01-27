# Ralph Script

Ralph is a bash script that implements the "Ralph is a loop" methodology for AI-powered development workflows.

## Quick Usage

```bash
# Run Ralph with different AI tools
./ralph.sh --tool amp 10          # Use Amp (default)
./ralph.sh --tool claude 5        # Use Claude
./ralph.sh --tool copilot 10      # Use GitHub Copilot (via gh agent-task)
./ralph.sh --tool cursor 10       # Use Cursor
```

## Files in This Directory

- **ralph.sh** - Main Ralph script that runs AI agents in a loop
- **PROMPT.md** - Template prompt for AI agents
- **prd.json.example** - Example PRD (Product Requirements Document) format

## Documentation

For complete documentation on Ralph and AI workflows, see:

- **[Main AI Workflows Documentation](/docs/ai-workflows.md)** - Complete guide to Ralph philosophy and workflows
- **[Scripts README](/scripts/README.md)** - Detailed documentation on all available scripts
- **[Custom Agents Guide](/docs/custom-agents-guide.md)** - Information on specialized AI agents

## How It Works

Ralph runs AI tools in an iterative loop:

1. Reads the PRD from `prd.json`
2. Reads progress from `progress.txt`
3. Picks the highest priority incomplete user story
4. Implements the story using the selected AI tool
5. Runs quality checks (typecheck, lint, test)
6. Commits changes and updates the PRD
7. Repeats until all stories are complete or max iterations reached

## Supported Tools

- **amp** - Uses `amp --dangerously-allow-all`
- **claude** - Uses `claude --dangerously-skip-permissions`
- **copilot** - Uses `gh agent-task create` (requires GitHub CLI)
- **cursor** - Uses `cursor` CLI if available, falls back to manual mode

## Learn More

- [Ralph is a Loop concept](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum#1-ralph-is-a-loop) - Original inspiration
- [AI Workflows Documentation](/docs/ai-workflows.md) - Complete implementation details
