#!/bin/bash

# React Router v7 SPA Template Setup Script
# This script automates the initial setup process for the React Router v7 SPA template

set -e  # Exit on any error

echo "🚀 Setting up React Router v7 SPA Template..."
echo
# Install git if not available
if ! command -v git &> /dev/null; then
    echo "📦 Installing git..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install git
        else
            echo "❌ Homebrew not found. Please install Homebrew first:"
            echo "    /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            echo "Then re-run this setup script."
            exit 1
        fi
    else
        # Linux
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y git
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y git
        elif command -v yum &> /dev/null; then
            sudo yum install -y git
        elif command -v pacman &> /dev/null; then
            sudo pacman -Sy --noconfirm git
        else
            echo "❌ No supported package manager found (apt, dnf, yum, pacman). Please install git manually."
            exit 1
        fi
    fi
    echo "✅ git installed"
fi

# Install NVM if not available
if ! command -v nvm &> /dev/null; then
    echo "📦 Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    echo "✅ NVM installed"
        # Add nvm source to shell profile if not present
        SHELL_PROFILE=""
        if [ -n "$ZSH_VERSION" ]; then
            SHELL_PROFILE="$HOME/.zshrc"
        elif [ -n "$BASH_VERSION" ]; then
            SHELL_PROFILE="$HOME/.bashrc"
        else
            SHELL_PROFILE="$HOME/.profile"

        fi
        if ! grep -q 'NVM_DIR' "$SHELL_PROFILE" 2>/dev/null; then
            echo '\nexport NVM_DIR="$HOME/.nvm"' >> "$SHELL_PROFILE"
            echo '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"' >> "$SHELL_PROFILE"
            echo "✅ Added nvm source to $SHELL_PROFILE"
            echo "Please restart your terminal or run: source $SHELL_PROFILE"
        fi
fi

# Install pnpm if not available
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
    echo "✅ pnpm installed"
fi

# Check Node.js version (basic check for major version)
NODE_VERSION=$(node --version)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_MAJOR" -lt "22" ]; then
    echo "❌ Node.js version 22.12.0 or higher is required. Current version: $NODE_VERSION"
    echo "Please update Node.js and run this script again."
    exit 1
fi

# Use nvm to install and use Node.js 22.12.0
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

REQUIRED_NODE_VERSION="22.12.0"
if ! nvm ls "$REQUIRED_NODE_VERSION" &> /dev/null; then
    echo "📦 Installing Node.js $REQUIRED_NODE_VERSION with nvm..."
    nvm install $REQUIRED_NODE_VERSION
fi
nvm use $REQUIRED_NODE_VERSION

# Install pnpm if not available (using nvm-managed node)
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
    echo "✅ pnpm installed"
fi
# Check Node.js version (basic check for major version)
NODE_VERSION=$(node --version)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_MAJOR" -lt "22" ]; then
    echo "❌ Node.js version 22.12.0 or higher is required. Current version: $NODE_VERSION"
    echo "Please update Node.js and run this script again."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"
echo "✅ pnpm is available"
echo

# Setup environment file
echo "🔧 Setting up environment configuration..."
if [ -f ".env.example" ] && [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Environment file created from .env.example"
elif [ -f ".env" ]; then
    echo "✅ Environment file already exists"
else
    echo "⚠️  No .env.example file found - skipping environment setup"
fi
echo

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo


# Install Playwright browsers (if Playwright is present)
if [ -f "playwright.config.ts" ] || [ -f "playwright.config.js" ]; then
    if pnpm list --depth -1 | grep -q "@playwright/test"; then
        echo "🎭 Installing Playwright browsers..."
        npx playwright install --with-deps
        echo "✅ Playwright browsers installed"
        echo
    fi
fi

# Initialize Husky git hooks
echo "🪝 Setting up git hooks..."
if [ -d ".git" ]; then
    pnpm run prepare
    echo "✅ Git hooks initialized"
else
    echo "⚠️  Not in a git repository - skipping git hooks setup"
fi
echo

# Initialize MSW service worker
echo "🔧 Setting up MSW service worker..."
pnpm exec msw init public/ --save
echo "✅ MSW service worker initialized"
echo

echo "🎉 React Router v7 SPA Template setup complete!"
echo
echo "📋 Available commands:"
echo "   pnpm dev                     - Start development server"
echo "   pnpm build                   - Build for production"
echo "   pnpm start                   - Serve production build"
echo "   pnpm test                    - Run unit tests"
echo "   pnpm lint                    - Run linting"
echo "   pnpm playwright:run-integration - Run integration tests"
echo "   pnpm playwright:run-e2e      - Run end-to-end tests"
echo
echo "🌐 Development server will be available at: http://localhost:3000"
echo "Happy coding! 🎯"