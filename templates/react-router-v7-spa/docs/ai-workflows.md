# AI Workflow Automation Documentation

This document provides complete documentation for the AI workflow automation system in the Scaffolding Templates repository.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Workflows](#workflows)
4. [Scripts](#scripts)
5. [Agent System](#agent-system)
6. [Usage Examples](#usage-examples)
7. [Architecture](#architecture)
8. [Troubleshooting](#troubleshooting)
9. [Implementation Details](#implementation-details)

---

## Overview

The AI workflow automation system implements automated, continuous improvement cycles for maintaining and evolving templates. It provides workflows that run automatically to maintain code quality and ensure comprehensive test coverage.

### Key Features

✅ **Automated @copilot tagging** on every PR
✅ **Test coverage monitoring** (80% threshold)
✅ **Integration with 14 custom agents** (8 SDLC phase + 6 template specialists)
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
- Automated routine tasks

---

## Quick Start

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

1. **ai-test-coverage.yml** - Runs weekly (Monday 10 AM UTC)
2. **ai-issue-processing.yml** - Runs daily (8 AM UTC)

#### Running Scripts Locally

All workflow logic is extracted to scripts in `/scripts/`:

```bash
# Analyze a GitHub issue
./scripts/analyze-issue.sh 123

# Test code review logic
./scripts/analyze-changed-files.sh main HEAD
./scripts/determine-agents.sh

# Test coverage analysis
./scripts/run-coverage-analysis.sh
./scripts/identify-coverage-gaps.sh 80
./scripts/identify-missing-tests.sh
```

See `/scripts/README.md` for complete script documentation.

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

### 2. AI Test Coverage Analysis

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


---

## Scripts

All workflow logic has been extracted into standalone scripts in the `/scripts/` directory for local testing and development.

### Available Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `classify-issue.sh` | Classify issue for workflow | `./scripts/classify-issue.sh "<title>" "<body>"` |
| `analyze-issue.sh` | Analyze GitHub issue | `./scripts/analyze-issue.sh <issue-number>` |
| `analyze-changed-files.sh` | Analyze git changes | `./scripts/analyze-changed-files.sh [base] [head]` |
| `determine-agents.sh` | Find relevant agents | `./scripts/determine-agents.sh [files] [templates]` |
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
| Test Coverage | Scheduled | Weekly (Mon 10 AM UTC) | Identify coverage gaps |
| Issue Processing | Scheduled | Daily (8 AM UTC) | Process open issues |

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

**Scripts (5 files):**
- `/scripts/analyze-changed-files.sh`
- `/scripts/determine-agents.sh`
- `/scripts/run-coverage-analysis.sh`
- `/scripts/identify-coverage-gaps.sh`
- `/scripts/identify-missing-tests.sh`
- `/scripts/README.md`

**GitHub Actions Workflows (1 file):**
- `/.github/workflows/ai-test-coverage.yml`

**Main README:**
- Updated with AI workflows section

### Configuration

**Environment Variables:**
- `MIN_COVERAGE_THRESHOLD: 80` - Test coverage threshold percentage
- `MIN_ISSUE_PRIORITY: medium` - Minimum priority for created issues

**Workflow Schedules:**
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
- [GitHub Copilot Custom Agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Internal Resources
- Repository `/AGENTS.md` - Custom agents documentation
- Repository `/.agents/README.md` - Agent usage guide
- `/scripts/README.md` - Script documentation

---


---

**Implementation Date:** January 26, 2026  
**Last Updated:** February 5, 2026  
**Status:** Complete ✅  
**Version:** 2.0

## Changelog

### Version 2.0 (February 5, 2026) - Enhanced Information Output

**Major Enhancements:**

1. **AI Test Coverage**
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
- AI Test Coverage Analysis workflow
- AI Issue Processing workflow
- Custom agent integration
- Automated issue generation
- Summary reports
