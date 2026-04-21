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
