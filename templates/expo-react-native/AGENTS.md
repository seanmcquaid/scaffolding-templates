# Expo React Native Template

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
```

## Project Notes

- **File-based routing** — adding a file in `app/` automatically creates a route; `_layout.tsx` files define layouts; the `(tabs)` directory creates tab navigation
- **Themed components** — use `ThemedText` and `ThemedView` instead of raw React Native `Text`/`View`; raw primitives with hardcoded colors break dark mode
- **Environment variables** — must be prefixed with `EXPO_PUBLIC_`; validated with Zod in `env.ts`; update both `.env.example` and the schema when adding new vars
- **Testing** — Jest uses the `jest-expo` preset; full component rendering tests require the Expo environment
- **Cross-platform** — any change must conceptually work on iOS, Android, and Web; isolate platform-specific code with `.ios.tsx`/`.android.tsx` or the `Platform` API
- **i18n** — all user-facing text must use `useAppTranslation()`; translation files are in `i18n/locales/`
- **Import paths** — use the `@/` alias (maps to root), not `../../` relative paths
- **Package manager** — use `pnpm` only
