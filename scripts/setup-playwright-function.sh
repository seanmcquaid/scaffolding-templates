setup_playwright() {
    if [ ! -f "playwright.config.ts" ] && [ ! -f "playwright.config.js" ]; then
        return 0
    fi

    if ! pnpm list --depth -1 2>/dev/null | grep -q "@playwright/test"; then
        return 0
    fi

    echo "🎭 Installing Playwright browsers..."
    if npx playwright install --with-deps; then
        echo "✅ Playwright browsers installed"
    else
        exit_with_error "Failed to install Playwright browsers. Setup is incomplete. Run 'npx playwright install --with-deps' to install them, then rerun this setup script."
    fi
}
