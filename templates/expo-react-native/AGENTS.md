# Expo React Native Template - Agent Instructions

The role of this file is to describe common mistakes and confusion points that agents might encounter as they work in this project. If you ever encounter something like this in the project, please alert the developer working with you and indicate this is the case in the AGENTS.md file to help prevent future agents from having the same issue.

## Commands

```bash
# Install dependencies
pnpm install

# Start Expo development server
pnpm dev

# Run on iOS simulator (requires macOS + Xcode)
pnpm ios

# Run on Android emulator (requires Android Studio/SDK)
pnpm android

# Run in browser
pnpm web

# Build for all platforms (production export)
pnpm build

# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run linting
pnpm lint

# Fix lint errors
pnpm lint:fix

# Type checking
pnpm typecheck
```

## Common Mistakes and Confusion Points

### 1. File-Based Routing with Expo Router
- Routes are defined by the file structure in the `app/` directory. Do not manually register routes. Adding a file in `app/` automatically creates a route. `_layout.tsx` files define layouts for route groups.
- The `(tabs)` directory creates a tab-based navigation group — files inside are tab screens.

### 2. Hardcoded Strings / Missing Translations
- All user-facing text **must** use the `useAppTranslation()` hook with i18n keys. ESLint enforces this with `i18next/no-literal-string`. Adding any string literal in JSX will fail linting.
- Translation files are in `i18n/locales/`. Always add new keys there when adding new text.

### 3. Themed Components for Dark Mode
- Use `ThemedText` and `ThemedView` instead of raw `Text` and `View` for automatic dark/light mode support. Using raw RN primitives with hardcoded colors breaks the theming system.

### 4. Environment Variables
- All client-accessible env vars must be prefixed with `EXPO_PUBLIC_`. Validated with Zod in `env.ts`. If adding new env vars, update both `.env.example` and the Zod schema.

### 5. Testing React Native Components
- Jest is configured with the `jest-expo` preset. Full component rendering tests require the Expo environment. Basic tests validate configuration. For visual testing, use the actual device/simulator.

### 6. Import Paths
- Use the `@/` alias (maps to the root directory) — not relative paths like `../../components`.

### 7. Package Manager
- Use **`pnpm`** only. Do not use `npm install` or `yarn add`.
