# AI Workflow Automation Scripts

This directory contains scripts used by the AI workflow automation system. These scripts can be run locally for testing and development.

## Available Scripts

### Issue Processing Scripts

#### `classify-issue.sh`
Classifies a GitHub issue and determines agents, labels, and next steps for Ralph workflow.

**Usage:**
```bash
./scripts/classify-issue.sh <issue-title> <issue-body>
```

**Example:**
```bash
# Classify an issue
./scripts/classify-issue.sh "Bug in next-ssr template" "Authentication flow is broken"
```

**Output:** JSON with classification, suggested agents, suggested labels, and Ralph workflow next steps

**Prerequisites:** `jq` for JSON processing

#### `analyze-issue.sh`
Analyzes a GitHub issue and suggests Ralph workflow approach with agent routing.

**Usage:**
```bash
./scripts/analyze-issue.sh <issue-number>
```

**Example:**
```bash
# Analyze issue #123
./scripts/analyze-issue.sh 123
```

**Output:** Classification, suggested agents, suggested labels, and Ralph workflow plan

**Prerequisites:** Requires GitHub CLI (`gh`) to be installed and authenticated.

### Code Review Scripts

#### `analyze-changed-files.sh`
Analyzes changed files between two git refs and determines affected templates.

**Usage:**
```bash
./scripts/analyze-changed-files.sh [base-ref] [head-ref]
```

**Example:**
```bash
# Compare current branch to main
./scripts/analyze-changed-files.sh main HEAD

# Compare two specific commits
./scripts/analyze-changed-files.sh abc123 def456
```

**Output:** JSON with changed files and affected templates

#### `determine-agents.sh`
Determines which AI agents are relevant based on changed files and templates.

**Usage:**
```bash
./scripts/determine-agents.sh [changed-files-file] [templates]
```

**Example:**
```bash
# Pipe changed files
git diff --name-only main...HEAD | ./scripts/determine-agents.sh - "next-ssr react-router-v7-spa"

# From a file
./scripts/determine-agents.sh changes.txt "typescript-library"
```

**Output:** JSON with relevant agent tags

### Concept Discovery Scripts

#### `analyze-templates.sh`
Analyzes all templates for dependencies and version information.

**Usage:**
```bash
./scripts/analyze-templates.sh
```

**Example:**
```bash
./scripts/analyze-templates.sh
```

**Output:** List of templates with their major dependencies

#### `identify-concepts.sh`
Identifies potential concept opportunities for templates.

**Usage:**
```bash
./scripts/identify-concepts.sh
```

**Example:**
```bash
./scripts/identify-concepts.sh
```

**Output:** List of identified concepts organized by category

### Test Coverage Scripts

#### `run-coverage-analysis.sh`
Runs test coverage analysis for all templates.

**Usage:**
```bash
./scripts/run-coverage-analysis.sh [output-dir]
```

**Example:**
```bash
# Use default output directory (coverage-reports)
./scripts/run-coverage-analysis.sh

# Use custom output directory
./scripts/run-coverage-analysis.sh ./my-reports
```

**Output:** Coverage reports saved to specified directory

#### `identify-coverage-gaps.sh`
Identifies test coverage gaps across all templates.

**Usage:**
```bash
./scripts/identify-coverage-gaps.sh [threshold]
```

**Example:**
```bash
# Use default threshold (80%)
./scripts/identify-coverage-gaps.sh

# Use custom threshold
./scripts/identify-coverage-gaps.sh 85
```

**Output:** List of templates with coverage below threshold

#### `identify-missing-tests.sh`
Identifies missing test types (unit, integration, e2e) across templates.

**Usage:**
```bash
./scripts/identify-missing-tests.sh
```

**Example:**
```bash
./scripts/identify-missing-tests.sh
```

**Output:** List of templates with missing test types

## Prerequisites

All scripts require the following tools to be installed:

- **bash** - Shell interpreter
- **git** - Version control (for file analysis)
- **jq** - JSON processor
- **pnpm** - Package manager (for coverage scripts)
- **bc** - Basic calculator (for threshold comparisons)

### Installing Prerequisites

**On macOS:**
```bash
brew install jq bc
```

**On Ubuntu/Debian:**
```bash
sudo apt-get install jq bc
```

**On Fedora:**
```bash
sudo dnf install jq bc
```

## Running Scripts Locally

### Testing Issue Processing

```bash
# 1. Classify an issue (requires title and body)
./scripts/classify-issue.sh "Bug in authentication" "Users cannot log in"

# 2. Analyze an existing GitHub issue (requires gh CLI)
./scripts/analyze-issue.sh 123
```

### Testing Code Review Logic

```bash
# 1. Analyze what files changed in your PR
./scripts/analyze-changed-files.sh main HEAD

# 2. Determine which agents should review
git diff --name-only main...HEAD | ./scripts/determine-agents.sh - "next-ssr"
```

### Testing Concept Discovery

```bash
# 1. Analyze templates for dependencies
./scripts/analyze-templates.sh

# 2. Identify concept opportunities
./scripts/identify-concepts.sh
```

### Testing Coverage Analysis

```bash
# 1. Run coverage analysis
./scripts/run-coverage-analysis.sh

# 2. Identify coverage gaps
./scripts/identify-coverage-gaps.sh 80

# 3. Identify missing test types
./scripts/identify-missing-tests.sh
```

## Integration with GitHub Actions

These scripts are called by the GitHub Actions workflows:

- `.github/workflows/ai-code-review.yml` uses `analyze-changed-files.sh` and `determine-agents.sh`
- `.github/workflows/ai-concept-discovery.yml` uses `analyze-templates.sh` and `identify-concepts.sh`
- `.github/workflows/ai-test-coverage.yml` uses `run-coverage-analysis.sh`, `identify-coverage-gaps.sh`, and `identify-missing-tests.sh`
- `.github/workflows/ai-issue-processing.yml` uses `classify-issue.sh`

## Troubleshooting

### Script Permission Issues

If you get "Permission denied" errors:
```bash
chmod +x scripts/*.sh
```

### Missing Dependencies

If jq is not found:
```bash
# Check if jq is installed
which jq || echo "jq not installed"

# Install jq (see Prerequisites section above)
```

### Coverage Analysis Fails

If coverage analysis fails:
1. Ensure you're in the repository root
2. Run `pnpm install` to install dependencies
3. Verify templates have test scripts in package.json
4. Check that test frameworks (Vitest) are properly configured

## Adding to Templates

To add these scripts to individual templates:

1. Copy the `scripts/` directory to the template root
2. Update paths in scripts to be relative to template root
3. Add npm scripts to template's package.json:

```json
{
  "scripts": {
    "analyze:coverage": "./scripts/run-coverage-analysis.sh",
    "analyze:gaps": "./scripts/identify-coverage-gaps.sh",
    "analyze:tests": "./scripts/identify-missing-tests.sh"
  }
}
```

## Contributing

When adding new scripts:

1. Follow existing naming conventions
2. Include usage documentation in script comments
3. Make scripts executable: `chmod +x scripts/new-script.sh`
4. Add entry to this README
5. Test locally before committing
6. Update relevant workflow files if needed

## Related Documentation

- [AI Workflows Documentation](/docs/ai-workflows.md)
- [GitHub Actions Workflows](/.github/workflows/)
- [Repository Guidelines](/AGENTS.md)
