# React Native Expo Router Template

A modern, production-ready template for building cross-platform mobile applications with React Native, Expo Router, featuring type-safe navigation, comprehensive testing, and excellent developer experience.

## ✨ Features

- **📱 Expo SDK 52** - Latest Expo with file-based routing and native modules
- **🧭 Expo Router** - File-based routing with type-safe navigation and deep linking
- **🌍 Internationalization** - Type-safe i18n with `useAppTranslation` hook and mandatory translations
- **🔍 Type Safety** - Strict TypeScript configuration with comprehensive type checking
- **🧪 Comprehensive Testing** - Jest + React Native Testing Library + Maestro for E2E testing
- **📊 State Management** - TanStack Query + React Hook Form + usehooks-ts
- **📋 Code Quality** - ESLint + Prettier with pre-commit hooks via Husky
- **🎨 Modern Styling** - Expo's theming system with light/dark mode support
- **⚡ Performance** - React Native Reanimated for smooth animations
- **🚀 Cross-Platform** - iOS, Android, and Web support out of the box
- **♿ Accessibility** - Built-in accessibility best practices and testing

## 🚀 Quick Start

### Automated Setup (Recommended)

Run the setup script to automatically configure everything:

```bash
# Make the setup script executable and run it
chmod +x setup.sh && ./setup.sh
```

This script will:

- Install pnpm if not already available
- Copy `.env.example` to `.env` for environment configuration
- Validate environment variables and warn about example values
- Install all dependencies
- Set up git hooks for code quality

> **ℹ️ Note:** The `setup.sh` script will automatically install **git**, **nvm**, and **pnpm** if they are not already available on your system (macOS and Linux supported). You may still install them manually if you prefer.

### Prerequisites (for Manual Setup)

- **git** (version control)
- **nvm** (Node Version Manager)
- **Node.js** >=22.12.0
- **pnpm** (recommended package manager)
- **Expo CLI** or **Expo Go** app on your device

### Manual Installation

```bash
# Copy environment file
cp .env.example .env

# Install dependencies
pnpm install

# Start development
pnpm start
```

## 📱 Development Workflow

### Running the App

```bash
# Start Expo development server
pnpm start

# Run on specific platforms
pnpm android     # Android device/emulator
pnpm ios         # iOS device/simulator
pnpm web         # Web browser

# Development client mode (recommended for custom native code)
pnpm dev
```

### Building the App

```bash
# Local builds (requires platform-specific setup)
pnpm build:android
pnpm build:ios

# Or use Expo Application Services (EAS) for cloud builds
npx eas build --platform android
npx eas build --platform ios
```

## 🧪 Testing

This template includes a comprehensive testing setup:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Type checking
pnpm typecheck

# E2E testing with Maestro (requires Maestro CLI installed)
pnpm maestro:test

# Platform-specific E2E tests
pnpm maestro:test:android
pnpm maestro:test:ios
```

### Testing Philosophy

- **Unit Tests**: Test individual components and hooks in isolation with Jest + React Native Testing Library
- **E2E Tests**: End-to-end testing with Maestro for real user interaction flows
- **Type Safety**: Comprehensive TypeScript coverage with strict configuration
- **Mocking**: Proper mocking of Expo modules and React Native components

## 📋 Code Quality

### Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Fix linting issues automatically
pnpm lint:fix

# Format with Prettier (runs automatically on save)
npm run format
```

### Pre-commit Hooks

The template uses Husky and lint-staged to run quality checks before each commit:

- ESLint fixes and validation
- Prettier formatting
- TypeScript type checking

## 🌍 Internationalization

The app includes a type-safe i18n system:

```typescript
import { useAppTranslation } from '@/hooks/useAppTranslation';

function MyComponent() {
  const { t } = useAppTranslation();

  return <Text>{t('home.welcome')}</Text>; // Type-safe translation keys
}
```

Translation files are located in `lib/i18n.ts` with automatic language detection based on device locale.

## 📁 Project Structure

```
├── src/                    # Application source code
│   ├── app/               # File-based routing (Expo Router)
│   │   ├── (tabs)/        # Tab navigation group
│   │   │   ├── _layout.tsx # Tab layout
│   │   │   ├── index.tsx   # Home tab
│   │   │   └── explore.tsx # Explore tab
│   │   ├── _layout.tsx    # Root layout
│   │   └── +not-found.tsx # 404 page
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components
│   │   ├── HelloWave.tsx # Example animated component
│   │   ├── ThemedText.tsx # Themed text component
│   │   └── ThemedView.tsx # Themed view component
│   ├── constants/        # App constants
│   │   └── Colors.ts     # Color scheme definitions
│   ├── hooks/           # Custom React hooks
│   │   ├── useAppTranslation.ts # Type-safe i18n hook
│   │   ├── useColorScheme.ts    # Color scheme hook
│   │   └── useThemeColor.ts     # Theme color hook
│   └── lib/            # Utility libraries
│       └── i18n.ts     # Internationalization setup
├── .maestro/           # E2E test flows
│   ├── app_launch.yaml # App launch test
│   ├── navigation.yaml # Navigation test
│   └── explore_interactions.yaml # User interactions
└── tests/              # Unit test files
    ├── components/     # Component tests
    ├── hooks/         # Hook tests
    └── setup.ts       # Test configuration
```

## 🎯 Key Concepts

### File-based Routing

Expo Router uses the file system to define routes:
- `src/app/(tabs)/index.tsx` → `/` (Home tab)
- `src/app/(tabs)/explore.tsx` → `/explore` (Explore tab)
- `src/app/+not-found.tsx` → 404 page

### Theming System

The app supports both light and dark modes with a consistent theming system:

```typescript
// Use themed components
<ThemedView style={styles.container}>
  <ThemedText type="title">Hello World</ThemedText>
</ThemedView>

// Or use theme colors directly
const { useThemeColor } = require('@/hooks/useThemeColor');
const backgroundColor = useThemeColor({}, 'background');
```

### Type-safe Navigation

Navigation is fully typed with Expo Router:

```typescript
import { Link, router } from 'expo-router';

// Declarative navigation
<Link href="/explore">Go to Explore</Link>

// Imperative navigation
router.push('/explore');
```

## 🛠 Customization

### Adding New Screens

1. Create a new file in the `src/app/` directory
2. Export a React component as the default export
3. The route is automatically available based on the file path

### Adding New Components

1. Create component files in `src/components/`
2. Use the `ThemedText` and `ThemedView` for consistent theming
3. Follow the established patterns for props and styling

### Styling

The template uses React Native's built-in styling system with:
- Themed components for consistent colors
- StyleSheet for optimized styling
- Support for both light and dark modes

## 📚 Resources

### Learn More

- [Expo Documentation](https://docs.expo.dev) - Learn about Expo SDK and tools
- [Expo Router Documentation](https://docs.expo.dev/router/introduction) - File-based routing
- [React Native Documentation](https://reactnative.dev) - React Native fundamentals
- [TypeScript Documentation](https://www.typescriptlang.org) - TypeScript best practices

### Deployment

- [Expo Application Services (EAS)](https://docs.expo.dev/eas) - Cloud build and deployment
- [App Store Connect](https://developer.apple.com/app-store-connect) - iOS deployment
- [Google Play Console](https://developer.android.com/distribute/console) - Android deployment
- [Maestro](https://maestro.mobile.dev) - E2E testing tool (install with `curl -Ls "https://get.maestro.mobile.dev" | bash`)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
# Clear Metro cache
npx expo start --clear
```

**TypeScript errors:**
```bash
# Regenerate Expo types
npx expo install --fix
```

**Dependencies issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
pnpm install
```

**iOS Simulator issues:**
```bash
# Reset iOS Simulator
npx expo run:ios --device
```

For more help, visit the [Expo documentation](https://docs.expo.dev) or [React Native troubleshooting guide](https://reactnative.dev/docs/troubleshooting).