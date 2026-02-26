#!/bin/bash

# TypeScript Library Template Setup Script
# This script automates the initial setup process for the TypeScript library template
#
# Platform Support: macOS, major Linux distributions
# Windows Support: Not supported - use WSL2 with Ubuntu instead

set -e  # Exit on any error

# Configuration
readonly TEMPLATE_NAME="TypeScript Library Template"
readonly REQUIRED_NODE_VERSION="22.12.0"
readonly NVM_VERSION="v0.39.7"

echo "🚀 Setting up $TEMPLATE_NAME..."
echo

# Utility functions
check_command() {
    command -v "$1" &> /dev/null
}

exit_with_error() {
    echo "❌ $1"
    exit 1
}

check_exit_code() {
    local exit_code=$1
    local error_message="$2"
    if [ $exit_code -ne 0 ]; then
        exit_with_error "$error_message"
    fi
}

show_windows_not_supported() {
    echo "❌ Windows is not supported by this setup script."
    echo "💡 Please use WSL2 with Ubuntu instead:"
    echo "   https://docs.microsoft.com/en-us/windows/wsl/install"
    exit 1
}

get_shell_profile() {
    if [ -n "$ZSH_VERSION" ]; then
        echo "$HOME/.zshrc"
    elif [ -n "$BASH_VERSION" ]; then
        echo "$HOME/.bashrc"
    else
        echo "$HOME/.profile"
    fi
}

install_with_package_manager() {
    local package="$1"
    echo "📦 Installing $package..."

    if check_command apt-get; then
        sudo apt-get update && sudo apt-get install -y "$package"
    elif check_command dnf; then
        sudo dnf install -y "$package"
    elif check_command yum; then
        sudo yum install -y "$package"
    elif check_command pacman; then
        sudo pacman -Sy --noconfirm "$package"
    else
        exit_with_error "No supported package manager found (apt, dnf, yum, pacman). Please install $package manually."
    fi
    echo "✅ $package installed"
}

# Check for Windows (not supported)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    show_windows_not_supported
fi

install_git() {
    if check_command git; then
        return 0
    fi

    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if check_command brew; then
            echo "📦 Installing git..."
            brew install git
            echo "✅ git installed"
        else
            exit_with_error "Homebrew not found. Please install Homebrew first:
    /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"
Then re-run this setup script."
        fi
    else
        # Linux
        install_with_package_manager git
    fi
}

install_git

install_nvm() {
    if check_command nvm; then
        return 0
    fi

    echo "📦 Installing NVM..."
    curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh" | bash
    check_exit_code $? "Failed to install NVM. Please check your internet connection and try again."

    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    echo "✅ NVM installed"

    # Add nvm source to shell profile if not present
    local shell_profile
    shell_profile=$(get_shell_profile)

    if ! grep -q 'NVM_DIR' "$shell_profile" 2>/dev/null; then
        {
            echo '\nexport NVM_DIR="$HOME/.nvm"'
            echo '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"'
        } >> "$shell_profile"
        echo "✅ Added nvm source to $shell_profile"
        echo "Please restart your terminal or run: source $shell_profile"
    fi
}

install_nvm

setup_nodejs() {
    # Load NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    # Install Node.js if needed
    if ! nvm ls "$REQUIRED_NODE_VERSION" &> /dev/null; then
        echo "📦 Installing Node.js $REQUIRED_NODE_VERSION with nvm..."
        nvm install "$REQUIRED_NODE_VERSION"
        check_exit_code $? "Failed to install Node.js $REQUIRED_NODE_VERSION with nvm. Please check your internet connection and try again."
    fi

    # Switch to required Node.js version
    echo "📦 Switching to Node.js $REQUIRED_NODE_VERSION..."
    nvm use "$REQUIRED_NODE_VERSION"
    check_exit_code $? "Failed to switch to Node.js $REQUIRED_NODE_VERSION. Please ensure Node.js $REQUIRED_NODE_VERSION is properly installed."

    # Verify Node.js version
    local node_version node_major
    node_version=$(node --version)
    node_major=$(echo "$node_version" | cut -d 'v' -f 2 | cut -d '.' -f 1)

    if [ "$node_major" -lt "22" ]; then
        exit_with_error "Node.js version 22.12.0 or higher is required. Current version: $node_version. Please update Node.js and run this script again."
    fi

    echo "✅ Node.js version: $node_version"
}

install_pnpm() {
    if check_command pnpm; then
        echo "✅ pnpm is available"
        return 0
    fi

    echo "📦 Installing pnpm..."
    npm install -g pnpm
    check_exit_code $? "Failed to install pnpm. Please check your npm configuration and try again."
    echo "✅ pnpm installed"
}

setup_nodejs
install_pnpm
echo

install_dependencies() {
    echo "📦 Installing dependencies..."
    pnpm install
    check_exit_code $? "Failed to install dependencies. Please check your network connection and try again."
    echo "✅ Dependencies installed"
}

setup_git_hooks() {
    echo "🪝 Setting up git hooks..."
    if [ -d ".git" ]; then
        pnpm run prepare
        echo "✅ Git hooks initialized"
    else
        echo "⚠️  Not in a git repository - skipping git hooks setup"
    fi
}

install_dependencies
echo
setup_git_hooks
echo

show_completion_message() {
    echo "🎉 $TEMPLATE_NAME setup complete!"
    echo
    echo "📋 Available commands:"
    echo "   pnpm dev          - Start development mode (test watch)"
    echo "   pnpm build        - Build the library"
    echo "   pnpm test         - Run tests"
    echo "   pnpm lint         - Run linting"
    echo "   pnpm check-types  - Check TypeScript types"
    echo
    echo "Happy coding! 🎯"
}

show_completion_message
