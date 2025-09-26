#!/bin/bash

# Expo React Native Template Setup Script
# This script automates the initial setup process for the Expo React Native template
#
# Platform Support: macOS, major Linux distributions
# Windows Support: Not supported - use WSL2 with Ubuntu instead

set -e  # Exit on any error

# Configuration
readonly TEMPLATE_NAME="Expo React Native Template"
readonly REQUIRED_NODE_VERSION="22.12.0"
readonly NVM_VERSION="v0.39.7"
readonly REQUIRED_EXPO_VERSION="6.0.0"

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

get_package_manager() {
    if check_command brew; then
        echo "brew"
    elif check_command apt-get; then
        echo "apt"
    elif check_command dnf; then
        echo "dnf"
    elif check_command yum; then
        echo "yum"
    elif check_command pacman; then
        echo "pacman"
    else
        exit_with_error "Unsupported package manager. Please install dependencies manually."
    fi
}

# Platform detection
detect_platform() {
    case "$(uname -s)" in
        Darwin*)    echo "macOS" ;;
        Linux*)     echo "Linux" ;;
        CYGWIN*|MINGW32*|MSYS*|MINGW*) show_windows_not_supported ;;
        *)          exit_with_error "Unsupported operating system: $(uname -s)" ;;
    esac
}

install_nvm() {
    echo "📦 Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh | bash
    check_exit_code $? "Failed to install NVM"
    
    # Source nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    
    echo "✅ NVM installed successfully"
}

setup_nodejs() {
    echo "🔧 Setting up Node.js..."
    
    if ! check_command nvm; then
        install_nvm
    fi
    
    # Install and use required Node.js version
    nvm install $REQUIRED_NODE_VERSION
    check_exit_code $? "Failed to install Node.js $REQUIRED_NODE_VERSION"
    
    nvm use $REQUIRED_NODE_VERSION
    check_exit_code $? "Failed to switch to Node.js $REQUIRED_NODE_VERSION"
    
    nvm alias default $REQUIRED_NODE_VERSION
    check_exit_code $? "Failed to set default Node.js version"
    
    echo "✅ Node.js $REQUIRED_NODE_VERSION installed and configured"
}

install_pnpm() {
    echo "📦 Installing pnpm..."
    npm install -g pnpm@10.12.4
    check_exit_code $? "Failed to install pnpm"
    echo "✅ pnpm installed successfully"
}

install_expo_cli() {
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli@latest
    check_exit_code $? "Failed to install Expo CLI"
    echo "✅ Expo CLI installed successfully"
}

install_watchman() {
    local platform="$1"
    local package_manager="$2"
    
    echo "📦 Installing Watchman (file watcher)..."
    
    case "$package_manager" in
        brew)
            brew install watchman
            check_exit_code $? "Failed to install Watchman via Homebrew"
            ;;
        apt)
            # Install Watchman dependencies
            sudo apt-get update
            sudo apt-get install -y build-essential python3-dev libssl-dev libbz2-dev libreadline-dev libsqlite3-dev curl
            
            # Install from source (Ubuntu doesn't have a good Watchman package)
            cd /tmp
            git clone https://github.com/facebook/watchman.git
            cd watchman
            git checkout v2023.11.20.00
            ./autogen.sh
            ./configure --enable-lenient
            make
            sudo make install
            ;;
        dnf)
            sudo dnf install -y watchman
            check_exit_code $? "Failed to install Watchman via dnf"
            ;;
        yum)
            sudo yum install -y epel-release
            sudo yum install -y watchman
            check_exit_code $? "Failed to install Watchman via yum"
            ;;
        pacman)
            sudo pacman -S --noconfirm watchman
            check_exit_code $? "Failed to install Watchman via pacman"
            ;;
    esac
    
    echo "✅ Watchman installed successfully"
}

setup_environment() {
    echo "🔧 Setting up environment..."
    
    # Copy environment file if it doesn't exist
    if [ ! -f .env ]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            echo "📝 Created .env file from .env.example"
        else
            exit_with_error ".env.example file not found"
        fi
    else
        echo "📝 .env file already exists"
    fi
    
    echo "✅ Environment configured"
}

install_dependencies() {
    echo "📦 Installing project dependencies..."
    pnpm install
    check_exit_code $? "Failed to install project dependencies"
    echo "✅ Dependencies installed successfully"
}

run_initial_checks() {
    echo "🔍 Running initial checks..."
    
    # Check if all required binaries are available
    local required_commands=("node" "npm" "pnpm" "expo" "watchman")
    
    for cmd in "${required_commands[@]}"; do
        if ! check_command "$cmd"; then
            exit_with_error "Required command '$cmd' not found in PATH"
        fi
    done
    
    # Verify Node.js version
    local node_version=$(node -v | sed 's/v//')
    if [ "$node_version" != "$REQUIRED_NODE_VERSION" ]; then
        echo "⚠️  Warning: Expected Node.js $REQUIRED_NODE_VERSION, but found $node_version"
    fi
    
    # Check if Expo CLI is properly installed
    expo --version &> /dev/null
    check_exit_code $? "Expo CLI not properly installed"
    
    echo "✅ All checks passed"
}

show_next_steps() {
    echo
    echo "🎉 Setup complete! Your $TEMPLATE_NAME is ready."
    echo
    echo "📱 Next steps:"
    echo "  1. Start the development server:"
    echo "     pnpm dev"
    echo
    echo "  2. Open your app on different platforms:"
    echo "     • Press 'i' for iOS Simulator"
    echo "     • Press 'a' for Android Emulator" 
    echo "     • Press 'w' for Web Browser"
    echo
    echo "  3. Optional: Install platform-specific tools:"
    echo "     • iOS: Install Xcode from Mac App Store"
    echo "     • Android: Install Android Studio"
    echo
    echo "📚 Useful commands:"
    echo "  pnpm dev          - Start development server"
    echo "  pnpm build        - Build for production"
    echo "  pnpm test         - Run tests"
    echo "  pnpm lint         - Check code quality"
    echo
    echo "📖 Documentation:"
    echo "  • README.md - Getting started guide"
    echo "  • docs/file-structure.md - Project organization"
    echo "  • AGENTS.md - Development guidelines"
    echo
    echo "🔗 Resources:"
    echo "  • Expo Documentation: https://docs.expo.dev/"
    echo "  • React Native Guide: https://reactnative.dev/"
    echo
    echo "Happy coding! 🚀"
}

# Main setup process
main() {
    local platform=$(detect_platform)
    local package_manager=$(get_package_manager)
    
    echo "🖥️  Platform: $platform"
    echo "📦 Package Manager: $package_manager"
    echo
    
    # Setup Node.js environment
    setup_nodejs
    
    # Install global dependencies
    install_pnpm
    install_expo_cli
    
    # Install platform-specific tools
    if [ "$platform" = "macOS" ] || [ "$package_manager" != "brew" ]; then
        install_watchman "$platform" "$package_manager"
    fi
    
    # Setup project
    setup_environment
    install_dependencies
    
    # Final checks
    run_initial_checks
    
    # Show completion message
    show_next_steps
}

# Run main function
main "$@"