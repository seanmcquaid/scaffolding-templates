# Scripts

This directory contains utility scripts for the scaffolding-templates repository.

## Available Scripts

### `setup.sh`

Automates the initial setup of the repository on macOS and Linux (Windows users should use WSL2).

**Usage:**
```bash
./scripts/setup.sh
```

This script will:
- Install git (if not present)
- Install NVM
- Install and activate the required Node.js version
- Install pnpm
- Run `pnpm install` to install all dependencies

### Test Coverage Scripts

#### `run-coverage-analysis.sh`

Runs test coverage analysis for all templates.

**Usage:**
```bash
./scripts/run-coverage-analysis.sh [output-dir]
```

#### `identify-coverage-gaps.sh`

Identifies test coverage gaps across all templates below a given threshold.

**Usage:**
```bash
./scripts/identify-coverage-gaps.sh [threshold]
# e.g. ./scripts/identify-coverage-gaps.sh 80
```

#### `identify-missing-tests.sh`

Identifies missing test types (unit, integration, e2e) across templates.

**Usage:**
```bash
./scripts/identify-missing-tests.sh
```

These scripts are used by the `.github/workflows/ai-test-coverage.yml` workflow and can also be run locally. See [docs/ai-workflows.md](/docs/ai-workflows.md) for more details.
