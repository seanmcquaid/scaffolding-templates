# AI Workflow Automation Documentation

This document provides complete documentation for the AI workflow automation system in the Scaffolding Templates repository.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Philosophy: Ralph is a Loop](#philosophy-ralph-is-a-loop)
4. [Workflows](#workflows)
5. [Scripts](#scripts)
6. [Agent System](#agent-system)
7. [Usage Examples](#usage-examples)
8. [Architecture](#architecture)
9. [Troubleshooting](#troubleshooting)
10. [Implementation Details](#implementation-details)
11. [Advanced: Ralph in Cron Jobs](#advanced-ralph-in-cron-jobs)

---

## Overview

The AI workflow automation system implements automated, continuous improvement cycles for maintaining and evolving templates. Based on the "Ralph is a loop" concept, it provides three primary workflows that run automatically to maintain code quality, discover new opportunities, and ensure comprehensive test coverage.

### Key Features

✅ **Automated @copilot tagging** on every PR
✅ **Proactive concept discovery** (weekly ecosystem scans)
✅ **Test coverage monitoring** (80% threshold)
✅ **Integration with 14 custom agents** (8 SDLC phase + 6 template specialists)
✅ **"Ralph is a loop" methodology** - Plan first, execute, review, iterate
✅ **Runnable scripts** for local analysis and testing

### Benefits

**For Contributors:**
- Faster feedback on pull requests
- Guidance from specialized agents
- Clear direction for improvements
- Reduced review cycles

**For Maintainers:**
- Proactive issue identification
- Consistent code review standards
- Better test coverage visibility
- Ecosystem awareness
- Automated routine tasks

---

## Quick Start

### Using Ralph Locally (No GitHub Required)

**Ralph** is a simple bash script (`./scripts/ralph.sh`) that implements the "Ralph is a loop" methodology without requiring GitHub Issues. It's just a regular shell script - no installation or CLI tool needed:

```bash
# Create a local plan (git-ignored, personal)
./scripts/ralph.sh plan "Add authentication to next-ssr template"

# Or create a shared plan (committed, accessible to team/agents)
./scripts/ralph.sh plan "Refactor routing system" --shared

# Execute the plan
./scripts/ralph.sh execute auth-next-ssr.md

# Review your work
./scripts/ralph.sh review auth-next-ssr.md

# Iterate based on feedback
./scripts/ralph.sh iterate auth-next-ssr.md

# Share a local plan with the team
./scripts/ralph.sh share auth-next-ssr.md

# Check all plans
./scripts/ralph.sh status --shared
```

**Features:**
- ✅ Fully local (no GitHub needed) or shared for team collaboration
- ✅ Automatic task classification and agent suggestions
- ✅ Structured breakdown with checklists
- ✅ Template detection (next-ssr, react-router-v7-spa, etc.)
- ✅ Progress tracking in markdown files
- ✅ Support for distributed AI agents via shared plans

**When to use Ralph locally:**
- Individual work or experimentation
- Planning before creating GitHub issues
- Privacy-sensitive work
- Local-first workflow preference

**When to use shared Ralph plans:**
- Team collaboration needed
- Distributed AI agents require access to plans
- Formal planning that should be tracked in git
- Complex tasks requiring multiple agents

See `/scripts/README.md` for complete Ralph documentation and `.ralph-shared/README.md` for team collaboration details.

---

### For Contributors

#### 1. Understanding AI Code Reviews

When you open a pull request, @copilot is automatically tagged to review your changes.

**What you should do:**
1. Wait for @copilot's review
2. Address any concerns raised in the review
3. Reply to comments if you disagree or need clarification
4. For specialized feedback, you can manually tag specific agents

**Optional - Run analysis locally before submitting:**
```bash
# Analyze your changes
./scripts/analyze-changed-files.sh main HEAD

# See which agents might be relevant
./scripts/determine-agents.sh
```

**Example of tagging additional agents:**
```
@quality-analyst Can you review the test coverage for this component?
@react-router-spa-specialist Does this follow the template's patterns?
```

#### 2. Working with AI-Generated Issues

Every week, AI agents scan the codebase and create issues for:
- New concepts and technologies to explore
- Test coverage gaps that need attention

**Look for issues with labels:**
- `ai-generated` - Created by AI workflows
- `concept-proposal` - New feature/technology suggestions
- `coverage-gap` - Test coverage improvements needed

#### 3. Using Plan Mode

**Always start with planning before implementing**:

```
Step 1: Analyze (Use @requirements-analyst)
Step 2: Design (Use @software-architect)
Step 3: Implement (Use template specialist)
Step 4: Test (Use @quality-analyst)
```

### For Maintainers

#### Setting Up Workflows

Workflows are configured in `.github/workflows/`:

1. **ai-concept-discovery.yml** - Runs weekly (Monday 9 AM UTC)
2. **ai-test-coverage.yml** - Runs weekly (Monday 10 AM UTC)
3. **ai-issue-processing.yml** - Runs daily (8 AM UTC)

#### Running Scripts Locally

All workflow logic is extracted to scripts in `/scripts/`:

```bash
# Analyze a GitHub issue
./scripts/analyze-issue.sh 123

# Test code review logic
./scripts/analyze-changed-files.sh main HEAD
./scripts/determine-agents.sh

# Test concept discovery
./scripts/analyze-templates.sh
./scripts/identify-concepts.sh

# Test coverage analysis
./scripts/run-coverage-analysis.sh
./scripts/identify-coverage-gaps.sh 80
./scripts/identify-missing-tests.sh
```

See `/scripts/README.md` for complete script documentation.

---

## Philosophy: Ralph is a Loop

The "Ralph is a loop" concept from [AI Hero](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum#1-ralph-is-a-loop) recognizes that AI agents work best in iterative cycles:

### Core Principles

1. **Plan Mode First**: Always start with planning before implementation
2. **Automated Loops**: Set up continuous cycles for maintenance, discovery, and improvement
3. **Proactive Analysis**: AI agents actively look for opportunities, not just respond to issues
4. **Feedback Integration**: Incorporate results from each cycle into the next iteration

### The Loop

```
┌─────────────────────────────────────────┐
│             Ralph is a Loop              │
│                                          │
│   START → PLAN → EXECUTE → REVIEW      │
│     ↑                            ↓      │
│     └────────── ITERATE ─────────┘      │
│                                          │
│  Key: Always start with planning,       │
│       iterate based on feedback          │
└─────────────────────────────────────────┘
```

### Ralph: Local vs GitHub

The Ralph methodology works in **two modes** to fit different workflows:

#### Local Mode (`./scripts/ralph.sh`)

**Best for:**
- Individual work and experimentation
- Privacy-sensitive features
- Quick prototyping
- Learning and exploration
- Planning before creating issues

**How it works:**
- Stores plans locally in `.ralph/` directory
- Markdown-based tracking
- Manual progression through phases
- Fully offline operation
- Personal task management

**Workflow:**
```bash
ralph.sh plan "task"     # Create structured plan
ralph.sh execute "plan"  # Start implementation
ralph.sh review "plan"   # Validate work
ralph.sh iterate "plan"  # Refine based on feedback
```

#### GitHub Issues Mode (Automated)

**Best for:**
- Team collaboration
- Public tracking
- Automated agent routing
- CI/CD integration
- Cross-team visibility

**How it works:**
- GitHub Actions workflows process issues
- Automated classification and agent tagging
- Team-wide progress tracking
- Integration with PR reviews
- Scheduled proactive analysis

**Workflow:**
```
1. Create GitHub issue → Auto-classified by AI
2. AI adds agents and labels → Team notified
3. Contributor implements → Tests run in CI
4. AI reviews PR → Suggests improvements
5. Iterate → Process repeats
```

### Choosing Your Approach

| Need | Use Local Ralph | Use GitHub Issues |
|------|-----------------|-------------------|
| Experiment with idea | ✅ | ❌ |
| Team collaboration | ❌ | ✅ |
| Privacy required | ✅ | ❌ |
| Automated workflows | ❌ | ✅ |
| Quick prototyping | ✅ | ❌ |
| Progress tracking | Local only | Team-wide |
| Agent routing | Manual reference | Automatic |
| CI/CD integration | ❌ | ✅ |

**Pro Tip:** Start with local Ralph to plan, then create GitHub issue when ready to collaborate!

---

## Workflows

### 1. AI Code Review

**Trigger:** Pull request events (opened, synchronize, reopened)

**Purpose:** Automatically tag @copilot for code review on every PR

**Process:**
1. Detects when a PR is opened or updated
2. Posts a comment tagging @copilot for review

**Output:**
- GitHub comment tagging @copilot

**Note:** This workflow is intentionally simple - it just ensures @copilot is always tagged for review. For detailed analysis, contributors can use the scripts locally:
- `scripts/analyze-changed-files.sh` - Analyze what changed
- `scripts/determine-agents.sh` - Identify relevant agents

### 2. AI Concept Discovery

**Trigger:** Weekly (Monday 9:00 AM UTC) + manual

**Purpose:** Identify new technologies, patterns, and best practices for templates

**Process:**
1. Scan ecosystem for new framework releases
2. Check current package versions against latest available
3. Analyze community trends and best practices
4. Review related repositories for new patterns
5. Compare current templates against latest practices
6. Generate detailed GitHub issues with comprehensive metadata
7. Tag software architect and template specialists

**Concept Categories:**
- Framework version updates (React Router, Next.js, TanStack Query, etc.)
- Emerging patterns (Server Components, Edge runtime, etc.)
- Testing improvements (Playwright, MSW v2, etc.)
- Developer experience enhancements
- Build and tooling optimizations

**Enhanced Output (v2):**
- **Detailed GitHub Issues** with:
  - Current vs. latest version information
  - Migration effort estimation (low/medium/high)
  - Breaking changes indicators
  - Benefits and success metrics
  - Implementation checklist with phases
  - Resource links and documentation
  - Related template specialists
- **Categorized labels**: Priority (`priority:high`), category (`category:framework-update`), affected templates
- **Comprehensive summary reports** with:
  - Statistics by priority and category
  - Quick wins identification (low effort, high/medium priority)
  - High impact opportunities
  - Prioritized recommendations
- **JSON data output** for automation and integration

**Scripts Used:**
- `scripts/analyze-templates.sh` - Analyze template dependencies
- `scripts/identify-concepts.sh` - Identify opportunities with `--format json` support

**Example Enhanced Issue:**
```markdown
## 🔍 AI-Discovered Concept Opportunity

**Concept**: React Router v7 latest features and patterns
**Category**: framework-update
**Priority**: high

### 📊 Current State
**Affected Templates**: react-router-v7-spa, react-router-v7-ssr
**Current Version**: 7.13.0
**Latest Version**: 7.x

### 📝 Description
Review and adopt latest React Router v7 features including improved type safety...

**Migration Effort**: 🟡 Medium
**Breaking Changes**: ✅ No

### ✨ Benefits
- Improved type safety
- Enhanced error handling
- Better developer experience

### 📚 Resources
- https://reactrouter.com/en/main
- https://github.com/remix-run/react-router/releases

### 🎯 Implementation Plan
[Detailed phase-by-phase checklist]
```

### 3. AI Test Coverage Analysis

**Trigger:** Weekly (Monday 10:00 AM UTC) + manual

**Purpose:** Identify and create issues for missing test coverage

**Process:**
1. Analyze unit test coverage across all templates
2. Generate detailed metrics by file and type
3. Identify files with lowest coverage percentages
4. Calculate specific gap counts (lines, branches, functions)
5. Check integration test coverage for key user flows
6. Identify missing end-to-end test scenarios
7. Generate comprehensive GitHub issues with actionable data
8. Tag quality analyst agent for follow-up

**Coverage Checks:**
- Line coverage % with gap counts
- Branch coverage % with missing branch counts
- Function coverage % with uncovered function counts
- Statement coverage %
- File-level coverage breakdown
- Test type presence (unit, integration, e2e)

**Enhanced Output (v2):**
- **Detailed GitHub Issues** with:
  - Coverage metrics table (current, target, gap)
  - Coverage gaps by type with specific numbers
  - Files needing attention (lowest coverage first)
  - Missing test types identification
  - Prioritized action items (high/medium/low priority)
  - Comprehensive testing strategy guide
  - Implementation plan with phases
  - Testing best practices from repository docs
- **JSON data output** with:
  - Per-template coverage statistics
  - File-level coverage details
  - Specific gap information
  - Low coverage file list
- **Enhanced summary reports** with:
  - Coverage statistics and trends
  - Template-specific breakdowns
  - Prioritized recommendations

**Scripts Used:**
- `scripts/run-coverage-analysis.sh` - Run coverage tests
- `scripts/identify-coverage-gaps.sh` - Identify gaps with `--format json` support
- `scripts/identify-missing-tests.sh` - Find missing test types

**Example Enhanced Issue:**
```markdown
## 🧪 Test Coverage Gap Analysis

**Template**: next-ssr
**Coverage Threshold**: 80%

### 📈 Coverage Metrics
| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| **Lines** | 70% (175/250) | 80% | 75 lines |
| **Branches** | 62.5% (50/80) | 80% | 30 branches |
| **Functions** | 70% (35/50) | 80% | 15 functions |

### 📊 Coverage Gaps by Type
📝 **Line Coverage**
- Current: 70%
- Target: 80%
- Missing: 75 lines need coverage

### 🎯 Files Needing Attention
| File | Coverage | Uncovered Lines |
|------|----------|----------------|
| `src/components/Header.tsx` | 40% | 15/25 |
| `src/utils/api-client.ts` | 50% | 20/40 |

### 💡 Recommended Actions
[Prioritized implementation plan with phases]
```

### 4. AI Issue Processing (Ralph Workflow)

**Trigger:** Daily (8:00 AM UTC) + manual

**Purpose:** Process outstanding GitHub issues using Ralph workflow methodology

**Process:**
1. Fetch open issues without `ralph-processed` label
2. Analyze issue content and context with enhanced metadata
3. Classify issue type (bug, feature, test, documentation)
4. Estimate complexity and priority
5. Identify related concepts and technologies
6. Determine affected templates and components
7. Suggest relevant agents for the issue
8. Generate structured Ralph workflow plan
9. Post detailed analysis comment with metadata (includes @copilot mention)
10. Add `ralph-processed`, `copilot-assigned`, and suggested labels

**Issue Classification:**
- **Bug Reports** → @maintenance-engineer + template specialists
- **Feature Requests** → @requirements-analyst + @software-architect
- **Testing** → @quality-analyst + template specialists
- **Documentation** → @ui-ux-designer
- **Template-specific** → Relevant template specialist

**Enhanced Output (v2):**
- **Detailed analysis comments** with:
  - Issue metadata section (complexity, priority, estimated effort)
  - Related concepts identification (authentication, testing, API, etc.)
  - Suggested agents with descriptions
  - Structured Ralph workflow steps
  - Key principles and best practices
  - Tips for success
  - Additional resources
- **JSON metadata output** from `classify-issue.sh`:
  - Complexity estimation (low/medium/high)
  - Priority detection (low/medium/high)
  - Estimated effort ranges (1-3 days, 3-7 days, 1-3 weeks, etc.)
  - Related concepts array
- **Enhanced labels**: Issue type, template, priority (if detected)
- **Daily summary report** with processing statistics

**Scripts Used:**
- `scripts/classify-issue.sh` - Enhanced workflow classification with metadata
- `scripts/analyze-issue.sh` - Local issue analysis

**Key Features:**
- Applies "plan → execute → review → iterate" methodology to all issues
- Routes issues to specialized agents automatically
- **Provides complexity and effort estimates** for planning
- **Identifies related concepts** to help with research and implementation
- **Labels issues with `copilot-assigned`** to indicate Copilot should handle them
- **Mentions @copilot in analysis comments** to trigger notification
- Provides structured approach with actionable steps
- Can be run manually on-demand
- Reprocessing: Remove `ralph-processed` label to reanalyze

**Example Enhanced Comment:**
```markdown
## 🤖 Ralph Workflow Analysis

**Automated Analysis Date**: 2026-02-05
**Auto-Assigned to**: @copilot

### 📊 Issue Metadata
**Complexity**: 🔴 High
**Priority**: ⬆️  High
**Estimated Effort**: 1-3 weeks
**Related Concepts**: authentication, api, security

### 📋 Issue Classification
This appears to be a feature request involving authentication...

### 👥 Suggested Agents
- **@requirements-analyst** - Initial research and validation
- **@software-architect** - Design and architecture
- **@nextjs-ssr-specialist** - Framework-specific implementation

### 🔄 Ralph Workflow: Plan → Execute → Review → Iterate
[Detailed phase-by-phase approach]

### 💡 Tips for Success
[Context-specific guidance for this issue type]
```

---

## Scripts

All workflow logic has been extracted into standalone scripts in the `/scripts/` directory for local testing and development.

### Available Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `ralph` | **Local workflow orchestrator** | `./scripts/ralph.sh plan "<task>"` |
| `classify-issue.sh` | Classify issue for workflow | `./scripts/classify-issue.sh "<title>" "<body>"` |
| `analyze-issue.sh` | Analyze GitHub issue | `./scripts/analyze-issue.sh <issue-number>` |
| `analyze-changed-files.sh` | Analyze git changes | `./scripts/analyze-changed-files.sh [base] [head]` |
| `determine-agents.sh` | Find relevant agents | `./scripts/determine-agents.sh [files] [templates]` |
| `analyze-templates.sh` | Check dependencies | `./scripts/analyze-templates.sh` |
| `identify-concepts.sh` | Find opportunities | `./scripts/identify-concepts.sh` |
| `run-coverage-analysis.sh` | Run coverage tests | `./scripts/run-coverage-analysis.sh [dir]` |
| `identify-coverage-gaps.sh` | Find coverage gaps | `./scripts/identify-coverage-gaps.sh [threshold]` |
| `identify-missing-tests.sh` | Find missing tests | `./scripts/identify-missing-tests.sh` |

### Prerequisites

- bash
- git
- jq (JSON processor)
- pnpm (for coverage scripts)
- bc (for threshold comparisons)

See `/scripts/README.md` for complete documentation, examples, and troubleshooting.

---

## Agent System

### SDLC Phase Agents (8)

1. **@requirements-analyst** - Analyze and document requirements
2. **@software-architect** - Design architecture and patterns
3. **@implementation-engineer** - Write production code
4. **@ui-ux-designer** - Design user interfaces
5. **@quality-analyst** - Create and improve tests
6. **@deployment-engineer** - Handle deployment/infrastructure
7. **@maintenance-engineer** - Fix bugs and refactor
8. **@production-support-engineer** - Handle production issues

### Template Specialists (6)

1. **@typescript-library-specialist** - TypeScript library expertise
2. **@nextjs-ssr-specialist** - Next.js SSR expertise
3. **@react-router-spa-specialist** - React Router SPA expertise
4. **@react-router-ssr-specialist** - React Router SSR expertise
5. **@tanstack-router-spa-specialist** - TanStack Router expertise
6. **@expo-react-native-specialist** - Expo React Native expertise

### Agent Tagging Strategy

Different scenarios require different agent combinations:

**New Feature:**
- Requirements Analyst → Software Architect → Template Specialist → Implementation Engineer → Quality Analyst

**Bug Fix:**
- Maintenance Engineer → Template Specialist (if template-specific) → Quality Analyst

**Performance Optimization:**
- Deployment Engineer → Template Specialist → Production Support Engineer

**Test Coverage Improvement:**
- Quality Analyst → Template Specialist (for framework-specific test patterns)

---

## Usage Examples

### Example 1: Responding to AI Code Review

**Scenario:** You've opened a PR that adds a new component.

**AI Review Comment:**
```
🤖 AI Code Review & Agent Tagging

Affected Templates: react-router-v7-spa
Relevant Agents: @implementation-engineer @react-router-spa-specialist @quality-analyst
```

**Your Response:**

1. **Address i18n requirement:**
```tsx
// Before
<h1>User Profile</h1>

// After
import useAppTranslation from '@/hooks/useAppTranslation';
const { t } = useAppTranslation();
<h1>{t('UserProfile.title')}</h1>
```

2. **Request specialized review:**
```
@quality-analyst Can you review the test coverage for this component?
@react-router-spa-specialist Does this follow the template's patterns?
```

### Example 2: Working with Concept Issues

**Scenario:** Weekly discovery creates a React Compiler integration issue.

**Workflow:**

**Step 1 - Validation:**
```
@requirements-analyst Please analyze the React Compiler concept for our templates.

Questions:
1. What is React Compiler and what problems does it solve?
2. Which templates would benefit most?
3. What are the adoption requirements?
4. What's the implementation complexity?
5. Are there any risks or downsides?
```

**Step 2 - Design:**
```
@software-architect Based on the requirements analysis, please design how we
should integrate React Compiler into our templates.
```

**Step 3 - Implementation:**
```
@react-router-ssr-specialist Please help implement React Compiler in the
react-router-v7-ssr template following the architectural design.

Please use plan mode: create implementation plan first, then execute.
```

### Example 3: Addressing Test Coverage Gaps

**Scenario:** Weekly coverage analysis identifies gaps in `tanstack-router-spa`.

**AI-Generated Issue:**
```
[Test Coverage] Improve tanstack-router-spa test coverage

Identified Gaps:
- Line coverage 72% (target: 80%)
- Missing integration tests
- Untested error boundary paths
```

**Workflow:**

**Step 1 - Analyze:**
```
@quality-analyst Please analyze the test coverage gaps in tanstack-router-spa
and create a comprehensive test improvement plan.

Current coverage: 72% lines
Missing: integration tests, error boundary tests
```

**Step 2 - Get Framework Guidance:**
```
@tanstack-router-spa-specialist What are the best practices for testing
TanStack Router specific features?

Areas to test:
1. Route navigation and parameters
2. Search parameter validation
3. Route loaders and error handling
4. File-based routing structure
```

**Step 3 - Implement:**
Create test files based on agent recommendations and run coverage locally.

### Example 4: Plan Mode for Feature Development

**Scenario:** Add authentication to Next.js SSR template.

**Complete Workflow:**

```
Phase 1: Requirements (Use @requirements-analyst)
Phase 2: Architecture (Use @software-architect)
Phase 3: UI/UX Design (Use @ui-ux-designer)
Phase 4: Implementation (Use @nextjs-ssr-specialist)
Phase 5: Testing (Use @quality-analyst)
Phase 6: Deployment (Use @deployment-engineer)
```

Each phase builds on the previous, following the plan-execute-review-iterate loop.

---

## Architecture

### System Overview

```
┌────────────────────────────────────────────┐
│     Scaffolding Templates Repository        │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │   AI Workflow Automation Layer        │ │
│  │                                       │ │
│  │  • AI Code Review Workflow           │ │
│  │  • Concept Discovery Workflow        │ │
│  │  • Test Coverage Workflow            │ │
│  └───────────────────────────────────────┘ │
│                     │                       │
│                     ▼                       │
│  ┌───────────────────────────────────────┐ │
│  │       Custom AI Agents Layer          │ │
│  │                                       │ │
│  │  SDLC Agents (8) + Specialists (6)   │ │
│  └───────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

### Workflow Execution Schedule

| Workflow | Trigger | Frequency | Purpose |
|----------|---------|-----------|---------|
| AI Code Review | PR events | On-demand | Review changes, tag agents |
| Concept Discovery | Scheduled | Weekly (Mon 9 AM UTC) | Find new opportunities |
| Test Coverage | Scheduled | Weekly (Mon 10 AM UTC) | Identify coverage gaps |
| Issue Processing | Scheduled | Daily (8 AM UTC) | Process issues with Ralph workflow |

### Data Flow

```
GitHub Actions Workflow
    ↓
Run Script (from /scripts/)
    ↓
Analyze/Process Data
    ↓
Generate Output
    ↓
Create GitHub Issues/Comments
    ↓
Tag Relevant Agents
```

### Labels System

**AI-Related:**
- `ai-generated` - Created by AI workflow
- `ai-review` - Has AI code review

**Issue Types:**
- `concept-proposal` - New concept suggestion
- `coverage-gap` - Test coverage needed
- `enhancement` - Feature request
- `testing` - Test-related

**Template-Specific:**
- `template:typescript-library`
- `template:next-ssr`
- `template:react-router-v7-spa`
- `template:react-router-v7-ssr`
- `template:tanstack-router-spa`
- `template:expo-react-native`

---

## Troubleshooting

### Workflow Execution Issues

#### Issue: Workflow Not Triggering

**Possible Causes:**
1. Workflow permissions not set correctly
2. GitHub Actions usage limits reached
3. Workflow file syntax errors
4. Branch protection rules blocking execution

**Solutions:**
1. Check repository Settings → Actions → General
2. Ensure "Allow all actions and reusable workflows" is enabled
3. Check "Read and write permissions" for workflows
4. Validate YAML syntax: `python3 -c "import yaml; yaml.safe_load(open('file.yml'))"`

#### Issue: Script Permission Denied

**Solution:**
```bash
chmod +x scripts/*.sh
```

#### Issue: Missing Dependencies

**Solution:**
```bash
# Install jq (macOS)
brew install jq bc

# Install jq (Ubuntu/Debian)
sudo apt-get install jq bc

# Install jq (Fedora)
sudo dnf install jq bc
```

### AI-Generated Issues

#### Issue: Too Many Duplicate Issues

**Solutions:**
1. Manually close duplicates: `gh issue close <number> --comment "Duplicate of #<original>"`
2. Adjust workflow frequency in `.github/workflows/*.yml`
3. Improve duplicate detection in workflow scripts

#### Issue: Low Quality Issues

**Solutions:**
1. Review and adjust prompts in workflow files
2. Add more specific examples and validation criteria
3. Increase context in issue templates

### Test Coverage

#### Issue: Coverage Reports Not Generated

**Solutions:**
1. Test locally first: `cd templates/[name] && pnpm test:coverage`
2. Check vitest.config.ts has coverage configured
3. Verify test script exists in package.json
4. Ensure dependencies are installed

#### Issue: Coverage Threshold Too Strict

**Solutions:**
1. Adjust threshold in workflow: `MIN_COVERAGE_THRESHOLD: 70`
2. Implement per-template thresholds in scripts
3. Exclude non-testable files from coverage

### Script Issues

#### Issue: Scripts Fail Locally

**Debugging:**
```bash
# Enable debug mode
bash -x ./scripts/script-name.sh

# Check prerequisites
which jq && echo "✓ jq installed" || echo "✗ jq missing"
which bc && echo "✓ bc installed" || echo "✗ bc missing"

# Test with verbose output
./scripts/run-coverage-analysis.sh 2>&1 | tee debug.log
```

### Common Commands Reference

```bash
# Validate workflow YAML
python3 -c "import yaml; yaml.safe_load(open('workflow.yml'))"

# List workflows
gh workflow list

# Run workflow manually
gh workflow run ai-concept-discovery.yml

# List issues by label
gh issue list --label ai-generated

# Test scripts locally
./scripts/analyze-changed-files.sh main HEAD
./scripts/determine-agents.sh
./scripts/run-coverage-analysis.sh
```

---

## Implementation Details

### Files Created

**Documentation (this file):**
- `/docs/ai-workflows.md` - Complete consolidated documentation

**Scripts (7 files):**
- `/scripts/analyze-changed-files.sh`
- `/scripts/determine-agents.sh`
- `/scripts/analyze-templates.sh`
- `/scripts/identify-concepts.sh`
- `/scripts/run-coverage-analysis.sh`
- `/scripts/identify-coverage-gaps.sh`
- `/scripts/identify-missing-tests.sh`
- `/scripts/README.md`

**GitHub Actions Workflows (2 files):**
- `/.github/workflows/ai-concept-discovery.yml`
- `/.github/workflows/ai-test-coverage.yml`

**Main README:**
- Updated with AI workflows section

### Configuration

**Environment Variables:**
- `MIN_COVERAGE_THRESHOLD: 80` - Test coverage threshold percentage
- `MIN_ISSUE_PRIORITY: medium` - Minimum priority for created issues

**Workflow Schedules:**
- Concept Discovery: `0 9 * * 1` (Monday 9:00 AM UTC)
- Test Coverage: `0 10 * * 1` (Monday 10:00 AM UTC)

### Metrics to Track

**Code Quality:**
- Test coverage percentage per template
- Linting issues per PR
- Code review turnaround time

**AI Effectiveness:**
- AI-generated issues opened
- AI-generated issues closed
- AI suggestion acceptance rate

**Template Health:**
- Consistency across templates
- Dependency freshness
- Documentation completeness

### Next Steps

**Immediate:**
1. Review and merge PR
2. Monitor workflow executions
3. Review AI-generated issues
4. Test scripts locally

**Short-term (1-2 weeks):**
- Gather contributor feedback
- Adjust thresholds if needed
- Refine agent prompts

**Medium-term (1-3 months):**
- Analyze effectiveness metrics
- Expand discovery sources
- Improve test coverage analysis

**Long-term (3+ months):**
- ML-based pattern detection
- Automated dependency updates
- Performance monitoring integration

---

## Best Practices

### Do's

✅ Always start in plan mode before implementing
✅ Use specialized agents for their domain expertise
✅ Review AI-generated content before acting on it
✅ Provide context when tagging agents
✅ Iterate based on feedback
✅ Document decisions and rationale
✅ Test scripts locally before relying on workflows

### Don'ts

❌ Don't skip the planning phase
❌ Don't ignore AI-generated suggestions without consideration
❌ Don't use generic agents when specialists are available
❌ Don't implement without proper validation
❌ Don't merge without code review
❌ Don't bypass quality checks

---

## References

### External Resources
- [AI Hero: Tips for AI Coding with Ralph Wiggum](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum#1-ralph-is-a-loop)
- [GitHub Copilot Custom Agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Internal Resources
- Repository `/AGENTS.md` - Custom agents documentation
- Repository `/agents/README.md` - Agent usage guide
- `/scripts/README.md` - Script documentation

---

## Advanced: Ralph in Cron Jobs

### Automated Implementation with Ralph

While the current workflows focus on **discovering** issues (concepts, test gaps, etc.), it's also possible to use Ralph to **automatically implement** those discoveries.

**Key Concepts:**
- Current workflows: Discover + Create Issues
- Advanced workflows: Discover + Create Issues + **Auto-implement with Ralph**

**Use Cases:**
- Automated test coverage improvements
- Automated documentation updates
- Automated dependency updates
- Automated code quality fixes

**Implementation Approaches:**
1. **GitHub Copilot Integration** - Use `gh agent-task` in GitHub Actions
2. **API-Based Integration** - Use AI provider APIs (OpenAI, Anthropic)
3. **Hybrid Approach** - Human-in-the-loop with manual triggers

**Security Considerations:**
- Requires careful safeguards and human oversight
- Start with low-risk tasks (tests, docs)
- Implement quality gates and code review
- Monitor costs and rate limits

**Documentation:**

For complete details on leveraging Ralph in automated cron jobs, see:

📘 **[Ralph in Cron Jobs Guide](/docs/ralph-in-cron-jobs.md)**

This comprehensive guide covers:
- Integration approaches and implementation patterns
- Security considerations and best practices
- Example workflow implementations
- Limitations and trade-offs
- Phased rollout recommendations

**Example Workflow:**

A reference implementation is available at:
- `.github/workflows/ralph-on-demand.yml.example` - Trigger Ralph via comment

To try it out:
1. Copy the example workflow (remove `.example` extension)
2. Comment `/ralph implement` on an AI-generated issue
3. Ralph will create a PR with the implementation
4. Review and merge if acceptable

**Important Notes:**

⚠️ **Not recommended for production** without:
- Thorough testing and validation
- Proper security safeguards
- Human review processes
- Cost and rate limit controls

✅ **Best for**:
- Experimentation and learning
- Low-risk automated tasks
- Controlled pilot programs
- Gradual rollout with monitoring

---

**Implementation Date:** January 26, 2026  
**Last Updated:** February 5, 2026  
**Status:** Complete ✅  
**Version:** 2.0

## Changelog

### Version 2.0 (February 5, 2026) - Enhanced Information Output

**Major Enhancements:**

1. **AI Concept Discovery**
   - ✨ Added JSON output format with structured data
   - ✨ Current vs. latest version comparisons from package.json
   - ✨ Migration effort estimation (low/medium/high)
   - ✨ Breaking changes indicators
   - ✨ Benefits and resources sections
   - ✨ Categorized summary reports with quick wins
   - ✨ Priority-based issue labeling
   - ✨ Comprehensive implementation plans

2. **AI Test Coverage**
   - ✨ Added JSON output format with detailed metrics
   - ✨ File-level coverage breakdown with specifics
   - ✨ Gap counts (missing lines, branches, functions)
   - ✨ Low coverage files identification
   - ✨ Prioritized action items (high/medium/low)
   - ✨ Comprehensive testing recommendations
   - ✨ Enhanced issue templates with metrics tables

3. **AI Issue Processing**
   - ✨ Complexity estimation (low/medium/high)
   - ✨ Priority detection (low/medium/high)
   - ✨ Estimated effort ranges
   - ✨ Related concepts identification
   - ✨ Enhanced metadata sections in comments
   - ✨ Tips for success based on issue type
   - ✨ More comprehensive guidance

**Scripts Enhanced:**
- `scripts/identify-concepts.sh` - Added `--format json` support
- `scripts/identify-coverage-gaps.sh` - Added `--format json` support
- `scripts/classify-issue.sh` - Added metadata output

**Impact:**
- Significantly more actionable information in GitHub issues
- Better prioritization with metadata
- Clearer implementation guidance
- Improved JSON output for automation
- Enhanced developer experience

### Version 1.0 (January 26, 2026) - Initial Release

**Initial Features:**
- AI Concept Discovery workflow
- AI Test Coverage Analysis workflow
- AI Issue Processing (Ralph) workflow
- Custom agent integration
- Automated issue generation
- Summary reports
