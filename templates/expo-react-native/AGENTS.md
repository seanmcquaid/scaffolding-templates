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

## Guiding Principles

### 1. Cross-Platform Consistency
This app runs on iOS, Android, and Web. Any change must be tested conceptually on all three platforms. Platform-specific code should be isolated using `.ios.tsx`, `.android.tsx`, or the `Platform` API — don't scatter platform checks throughout shared components.

### 2. Tests Are Mandatory
All non-trivial code should have tests. Use Jest with the `jest-expo` preset:
- **Unit tests** for utilities, hooks, and isolated component logic
- Full component rendering tests require the Expo environment — at minimum, test that components mount without errors

### 3. Right Level of Abstraction
- Separate UI components (`components/ui/` — generic, themed, reusable like `ThemedText`, `ThemedView`) from app components (`components/app/` — feature-specific with business logic).
- Keep components focused and composable. Single Responsibility Principle applies.
- Only extract shared logic once you've seen the pattern repeated at least twice.

### 4. Always Use Themed Components
Use `ThemedText` and `ThemedView` instead of raw React Native `Text` and `View` for all user-facing content. Using raw RN primitives with hardcoded colors breaks dark mode support.

### 5. Type Safety Throughout
TypeScript strict mode is required. No `any` types. All component props must have properly typed interfaces.

### 6. Internationalization is Not Optional
All user-facing text must use the `useAppTranslation()` hook. ESLint enforces this — literal strings in JSX fail the build.

### 7. State Management Hierarchy
1. **Local component state** for UI-only concerns
2. **TanStack Query** for all server/async state (fetching, caching, mutations)
3. **React Hook Form** for all form state
4. **`useLocalStorage` / `useSessionStorage`** from `usehooks-ts` for persistent client state

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
