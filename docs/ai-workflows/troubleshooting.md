# AI Workflow Troubleshooting Guide

This guide helps you troubleshoot common issues with the AI workflow automation system.

## Workflow Execution Issues

### Issue: Workflow Not Triggering

**Symptoms:**
- Scheduled workflow doesn't run at expected time
- PR workflow doesn't trigger on pull request

**Possible Causes & Solutions:**

1. **Workflow Permissions**
   - Navigate to repository Settings → Actions → General
   - Ensure "Allow all actions and reusable workflows" is enabled
   - Check "Read and write permissions" is selected for workflows

2. **GitHub Actions Usage Limits**
   - Free tier has limited minutes
   - Check Actions tab for usage information
   - Consider upgrading if limits are reached

3. **Workflow File Issues**
   - Ensure workflows are in `.github/workflows/` directory
   - Validate YAML syntax: `python3 -c "import yaml; yaml.safe_load(open('file.yml'))"`
   - Check for typos in workflow triggers

4. **Branch Protection Rules**
   - Workflows may be blocked by branch protection
   - Review branch protection settings
   - Ensure workflows have necessary permissions

**Debugging Steps:**
```bash
# Validate workflow YAML
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ai-code-review.yml'))"

# Check workflow syntax with GitHub CLI
gh workflow view ai-code-review.yml

# List all workflows
gh workflow list
```

### Issue: Workflow Runs But Fails

**Symptoms:**
- Workflow starts but exits with error
- Jobs fail with various error messages

**Common Error Messages:**

#### Error: "Resource not accessible by integration"

**Cause:** Insufficient permissions

**Solution:**
```yaml
# Add to workflow file
permissions:
  contents: read
  pull-requests: write
  issues: write
```

#### Error: "Command not found: jq"

**Cause:** Missing dependency

**Solution:**
```yaml
# Add installation step
- name: Install jq
  run: sudo apt-get install -y jq
```

#### Error: "pnpm: command not found"

**Cause:** PNPM not installed

**Solution:**
```yaml
# Ensure PNPM setup step exists
- name: Setup PNPM
  uses: pnpm/action-setup@v4
```

#### Error: "Cannot read coverage-summary.json"

**Cause:** Tests didn't generate coverage

**Solution:**
- Verify tests run successfully: `pnpm test:coverage`
- Check if coverage directory exists
- Review test configuration in `vitest.config.ts`

## AI-Generated Issues

### Issue: Too Many Duplicate Issues

**Symptoms:**
- Multiple similar issues created for same concept
- Spam of coverage gap issues

**Solutions:**

1. **Improve Duplicate Detection**

Edit workflow to enhance duplicate checking:
```yaml
# In concept discovery workflow
const isDuplicate = existingIssues.data.some(issue => 
  issue.title.toLowerCase().includes(concept.toLowerCase())
);
```

2. **Manually Close Duplicates**
```bash
# Close duplicate issues
gh issue close <issue-number> --comment "Duplicate of #<original-issue>"
```

3. **Adjust Workflow Frequency**
```yaml
# Change from weekly to bi-weekly
on:
  schedule:
    - cron: '0 9 * * 1,15'  # 1st and 15th of month
```

### Issue: Low Quality AI-Generated Issues

**Symptoms:**
- Issues lack actionable information
- Recommendations are too generic
- Context is missing

**Solutions:**

1. **Enhance Issue Template**

Edit workflow to include more context:
```yaml
const body = `
**Detailed Analysis**:
${detailedAnalysis}

**Specific Files Affected**:
${fileList}

**Recommended Actions**:
1. ${action1}
2. ${action2}
`;
```

2. **Add More Checks**
```bash
# In workflow script
if [ "$COVERAGE" -lt 60 ]; then
  PRIORITY="high"
elif [ "$COVERAGE" -lt 75 ]; then
  PRIORITY="medium"
else
  PRIORITY="low"
fi
```

3. **Review and Improve Prompts**
- Edit workflow files to add more specific instructions
- Include examples of good vs bad suggestions
- Add validation criteria

### Issue: Issues Not Being Tagged Correctly

**Symptoms:**
- Wrong agents tagged
- Missing template-specific labels
- Labels not applied

**Solutions:**

1. **Verify Label Exists**
```bash
# List all labels
gh label list

# Create missing label
gh label create "coverage-gap" --description "Test coverage improvement needed" --color "d4c5f9"
```

2. **Check Agent File Names**
- Ensure agent files exist in `/agents/` directory
- Verify naming matches tag format
- Check for typos in agent names

3. **Debug Label Application**
```yaml
# Add debug output
- name: Debug Labels
  run: |
    echo "Labels to apply: ${{ steps.labels.outputs.labels }}"
    echo "Issue number: ${{ github.event.issue.number }}"
```

## Code Review Issues

### Issue: AI Review Comments Not Posting

**Symptoms:**
- Workflow runs successfully
- No comments appear on PR

**Solutions:**

1. **Check GitHub Token Permissions**
```yaml
permissions:
  pull-requests: write  # Ensure this exists
```

2. **Verify GitHub Script Version**
```yaml
- uses: actions/github-script@v7  # Use latest version
```

3. **Debug Script Execution**
```yaml
script: |
  console.log('Creating comment...');
  const result = await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: 'Test comment'
  });
  console.log('Comment created:', result.data.id);
```

### Issue: Wrong Agents Tagged

**Symptoms:**
- Template specialist not tagged for template changes
- SDLC agents inappropriately tagged

**Solutions:**

1. **Review File Detection Logic**
```bash
# Test file pattern matching
CHANGED_FILES="templates/next-ssr/src/app/page.tsx"
if echo "$CHANGED_FILES" | grep -q "templates/next-ssr/"; then
  echo "Matched next-ssr template"
fi
```

2. **Add More Specific Patterns**
```yaml
# In workflow
if echo "$CHANGED_FILES" | grep -qE 'src/.*\.(tsx?|jsx?)$'; then
  echo "Source file changed"
fi
```

3. **Create Test PR**
- Open test PR with known file changes
- Verify correct agents are tagged
- Iterate on detection logic

## Test Coverage Analysis Issues

### Issue: Coverage Reports Not Generated

**Symptoms:**
- Workflow completes but reports missing
- Coverage summary not found

**Solutions:**

1. **Verify Test Script**
```bash
# Test locally first
cd templates/react-router-v7-spa
pnpm test:coverage
ls coverage/
```

2. **Check Vitest Configuration**
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'json-summary'],
      reportsDirectory: './coverage'
    }
  }
});
```

3. **Add Error Handling**
```yaml
- name: Run Coverage
  continue-on-error: true
  run: |
    pnpm test:coverage || echo "Coverage generation failed"
```

### Issue: Coverage Threshold Too Strict

**Symptoms:**
- Too many coverage gap issues
- Threshold unrealistic for templates

**Solutions:**

1. **Adjust Threshold**
```yaml
env:
  MIN_COVERAGE_THRESHOLD: 70  # Lower from 80
```

2. **Per-Template Thresholds**
```bash
# In workflow script
case $TEMPLATE in
  "typescript-library")
    THRESHOLD=90
    ;;
  "expo-react-native")
    THRESHOLD=70
    ;;
  *)
    THRESHOLD=80
    ;;
esac
```

### Issue: False Positive Coverage Gaps

**Symptoms:**
- Issues created for files that shouldn't be tested
- Configuration files flagged

**Solutions:**

1. **Exclude Files from Coverage**
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      exclude: [
        '**/*.config.*',
        '**/dist/**',
        '**/.*.js'
      ]
    }
  }
});
```

2. **Filter Results in Workflow**
```bash
# Exclude certain file types
COVERAGE_FILES=$(find . -name "*.tsx" -not -path "*/node_modules/*" -not -path "*/dist/*")
```

## Concept Discovery Issues

### Issue: No Concepts Being Discovered

**Symptoms:**
- Workflow runs but creates no issues
- Discovery seems inactive

**Solutions:**

1. **Add More Discovery Sources**
```bash
# Check npm for updates
npm outdated --json > outdated.json

# Check GitHub releases
gh release list --repo facebook/react

# Check for security advisories
npm audit --json
```

2. **Broaden Discovery Criteria**
```bash
# Look for any updates, not just major versions
if [ "$CURRENT_VERSION" != "$LATEST_VERSION" ]; then
  echo "Update available"
fi
```

3. **Manual Trigger for Testing**
```bash
# Trigger workflow manually
gh workflow run ai-concept-discovery.yml
```

### Issue: Irrelevant Concepts Suggested

**Symptoms:**
- Concepts don't align with template goals
- Suggestions are too experimental

**Solutions:**

1. **Add Filtering Logic**
```bash
# Filter by stability
if [[ "$VERSION" =~ "alpha"|"beta"|"rc" ]]; then
  echo "Skipping pre-release"
  continue
fi
```

2. **Require Minimum Adoption**
```bash
# Check npm downloads
DOWNLOADS=$(npm view package-name dist-tags.latest)
if [ "$DOWNLOADS" -lt 10000 ]; then
  echo "Package not widely adopted"
fi
```

## Performance Issues

### Issue: Workflows Taking Too Long

**Symptoms:**
- Workflows timeout
- Excessive execution time

**Solutions:**

1. **Optimize Dependency Installation**
```yaml
- name: Install Dependencies
  run: pnpm install --frozen-lockfile --prefer-offline
```

2. **Use Caching**
```yaml
- name: Setup Node
  uses: actions/setup-node@v6
  with:
    cache: 'pnpm'  # Enable caching
```

3. **Parallel Execution**
```yaml
strategy:
  matrix:
    template: [typescript-library, next-ssr, react-router-v7-spa]
  parallel: 3
```

4. **Skip Unnecessary Steps**
```yaml
- name: Build
  if: steps.changed-files.outputs.build_needed == 'true'
  run: pnpm build
```

## Getting Additional Help

### Enable Debug Logging

```yaml
- name: Debug Info
  run: |
    echo "GitHub Event: ${{ github.event_name }}"
    echo "Actor: ${{ github.actor }}"
    echo "Ref: ${{ github.ref }}"
    env
```

### Check Workflow Logs

```bash
# View recent runs
gh run list --workflow=ai-code-review.yml

# View specific run logs
gh run view <run-id> --log
```

### Contact Support

If issues persist:
1. Open an issue with `workflow-automation` label
2. Include workflow run ID
3. Attach relevant logs
4. Tag @seanmcquaid for maintainer support

### Useful Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Troubleshooting](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows)
- [YAML Validator](https://www.yamllint.com/)
- [Repository Discussions](https://github.com/seanmcquaid/scaffolding-templates/discussions)

## Common Commands Reference

```bash
# Validate workflow YAML
python3 -c "import yaml; yaml.safe_load(open('workflow.yml'))"

# List workflows
gh workflow list

# View workflow
gh workflow view <workflow-name>

# Run workflow manually
gh workflow run <workflow-name>

# View recent runs
gh run list --workflow=<workflow-name>

# View run logs
gh run view <run-id> --log

# Cancel a run
gh run cancel <run-id>

# List labels
gh label list

# Create label
gh label create <name> --description "<desc>" --color "<color>"

# List issues by label
gh issue list --label ai-generated

# Close issue
gh issue close <issue-number>
```
