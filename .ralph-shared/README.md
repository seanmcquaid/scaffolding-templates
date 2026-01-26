# Shared Ralph Plans

This directory contains Ralph workflow plans that are committed to git for team collaboration and distributed agent access.

> **Note:** Ralph is just a simple bash script at `./scripts/ralph.sh` - not a CLI tool or package. No installation required, just run the script directly.

## Purpose

While the `.ralph/` directory is git-ignored for personal/local planning, `.ralph-shared/` enables:

- **Team Collaboration** - Multiple team members can access and contribute to the same plan
- **Distributed Agents** - AI agents can read committed plans to understand context and requirements
- **Progress Tracking** - Team-wide visibility into ongoing work
- **Historical Record** - Plans are preserved in git history for reference

## Usage

### Creating a Shared Plan

```bash
# Option 1: Create plan directly in shared directory
./scripts/ralph.sh plan "Implement authentication system" --shared

# Option 2: Create locally first, then share
./scripts/ralph.sh plan "Test new feature"
./scripts/ralph.sh share test-new-feature.md
```

### Working with Shared Plans

All ralph commands automatically work with plans in either directory:

```bash
# View shared plan
./scripts/ralph.sh show auth-system.md

# Execute shared plan
./scripts/ralph.sh execute auth-system.md

# Review shared plan
./scripts/ralph.sh review auth-system.md

# View all plans (local and shared)
./scripts/ralph.sh status --shared
```

## Distributed Agent Workflow

When using shared plans with distributed AI agents:

1. **Create Plan** - Use `ralph.sh plan` with `--shared` flag
2. **Commit to Git** - Plan is committed and available to all agents
3. **Agent Access** - Agents can read `.ralph-shared/*.md` files to understand context
4. **Collaborative Execution** - Multiple agents/developers work on different aspects
5. **Progress Updates** - Updates are committed for team visibility

### Example: Multi-Agent Workflow

```markdown
# .ralph-shared/refactor-routing.md

## Agents Assigned
- @software-architect - Design new routing structure
- @implementation-engineer - Implement changes  
- @quality-analyst - Review and test
- @documentation-specialist - Update docs

## Phase 1: Design (Completed by @software-architect)
- [x] Analyze current routing implementation
- [x] Propose new architecture
- [x] Get team approval

## Phase 2: Implementation (In Progress by @implementation-engineer)
- [x] Refactor core routing logic
- [ ] Update route configurations
- [ ] Migrate existing routes

## Phase 3: Testing (Pending @quality-analyst)
- [ ] Write unit tests
- [ ] Integration testing
- [ ] Performance testing
```

## When to Use Shared vs Local

| Scenario | Use Local (.ralph/) | Use Shared (.ralph-shared/) |
|----------|---------------------|----------------------------|
| Personal experimentation | ✅ | ❌ |
| Quick prototypes | ✅ | ❌ |
| Team collaboration | ❌ | ✅ |
| Distributed agents | ❌ | ✅ |
| Formal planning | ❌ | ✅ |
| Work-in-progress ideas | ✅ | ❌ |
| Privacy-sensitive work | ✅ | ❌ |
| CI/CD integration | ❌ | ✅ |

## Best Practices

1. **Start Local, Share When Ready**
   ```bash
   ralph plan "experimental feature"  # Local first
   # After validating approach:
   ralph share experimental-feature.md
   ```

2. **Use Descriptive Filenames**
   - Good: `implement-oauth-authentication.md`
   - Bad: `task-1.md`

3. **Update Status Regularly**
   - Keep the Status field current (Planning/Executing/Reviewing/Complete)
   - Commit updates after significant progress

4. **Reference from GitHub Issues**
   ```markdown
   ## Related Resources
   - GitHub Issue: #123
   - PR: #124
   - Ralph Plan: `.ralph-shared/implement-oauth.md`
   ```

5. **Clean Up Completed Plans**
   - Move completed plans to an `archive/` subdirectory
   - Or remove after merging related PRs

## Integration with GitHub Issues

Shared Ralph plans complement GitHub Issues:

- **GitHub Issue** - High-level task description, public discussion
- **Shared Ralph Plan** - Detailed implementation plan, technical breakdown

Link them together:
```markdown
<!-- In GitHub Issue -->
See detailed implementation plan: `.ralph-shared/feature-name.md`

<!-- In Ralph Plan -->
## Related Resources
- GitHub Issue: #123
- Related PR: #124
```

## Security Considerations

- Don't commit sensitive information (API keys, credentials) in plans
- Use environment variables and configuration files for sensitive data
- Review plans before committing to ensure no secrets are included

## Example Workflow

```bash
# 1. Developer creates local plan
./scripts/ralph.sh plan "Add React 19 support"

# 2. After validation, promote to shared
./scripts/ralph.sh share add-react-19-support.md

# 3. Architect agent reviews and adds design notes
# (Agent reads plan from git, adds design section)
git pull
# Agent commits updates
git push

# 4. Implementation engineer executes plan
./scripts/ralph.sh execute add-react-19-support.md
# Makes progress, updates checklist
git add .ralph-shared/add-react-19-support.md
git commit -m "Update React 19 plan - core migration complete"
git push

# 5. QA agent reviews
# (Agent reads plan, runs tests, adds review notes)
git add .ralph-shared/add-react-19-support.md
git commit -m "Add QA review notes to React 19 plan"
git push

# 6. Complete and archive
mkdir -p .ralph-shared/archive/2026-01
git mv .ralph-shared/add-react-19-support.md .ralph-shared/archive/2026-01/
git commit -m "Archive completed React 19 migration plan"
```

## FAQ

**Q: Why not use GitHub Issues for all planning?**
A: Ralph plans provide structured, detailed technical breakdowns that are more verbose than typical issue descriptions. They're designed for the "Plan → Execute → Review → Iterate" cycle.

**Q: Can I edit shared plans locally?**
A: Yes! Edit `.ralph-shared/*.md` files like any other tracked file, then commit and push your changes.

**Q: How do agents access these plans?**
A: Agents can read files from the repository, including `.ralph-shared/` directory. They use these plans as context for their work.

**Q: What if there are merge conflicts?**
A: Resolve them like any other markdown file conflict. The structured format makes conflicts easy to spot and resolve.

**Q: Should every task have a shared plan?**
A: No. Use shared plans for significant features, complex bugs, or work requiring team coordination. Simple tasks can use local plans or GitHub Issues alone.
