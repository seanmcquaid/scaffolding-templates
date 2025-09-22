# Expo React Native Template

A modern, production-ready template for building cross-platform mobile applications with Expo, featuring a monorepo architecture, TypeScript, comprehensive testing, and excellent developer experience.

## ✨ Features

### Core Technologies
- **Expo SDK 54** - Cross-platform development with web support
- **React Native 0.81** - Modern React Native with New Architecture support  
- **TypeScript** - Type-safe development with strict configuration
- **Expo Router** - File-based routing with type safety

### Development Experience
- **pnpm Workspaces** - Fast, efficient monorepo management
- **Turborepo** - Build system with intelligent caching
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Pre-commit quality checks
- **Vitest** - Fast unit testing with React Native Testing Library

### Architecture
- **Monorepo Structure** - Apps and shared packages
- **Shared UI Components** - Reusable design system
- **Feature-Based Architecture** - Domain-driven development
- **Type-Safe i18n** - Internationalization with validation
- **Environment Configuration** - Zod-validated environment variables

### Mobile Features
- **Cross-Platform** - iOS, Android, and Web support
- **Performance Monitoring** - Bundle size tracking
- **Modern Navigation** - Tab-based navigation with Expo Router
- **Development Tools** - Hot reload, debugging, and DevTools

## 🚀 Quick Start

### Prerequisites
- Node.js >= 22.12.0
- pnpm >= 10.12.4
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Manual Installation

```bash
# Copy environment file
cp .env.example .env

# Install dependencies
pnpm install

# Start development server
pnpm dev:app

# Or start all projects
pnpm dev
```

### Using Setup Script (Recommended)

```bash
chmod +x setup.sh
./setup.sh
```

## 📂 Project Structure

```
├── apps/
│   └── mobile/                # Expo React Native app
│       ├── app/              # Expo Router pages
│       ├── src/              # Application source code
│       │   ├── components/   # App-specific components
│       │   ├── hooks/        # Custom React hooks
│       │   ├── i18n/         # Internationalization
│       │   ├── services/     # API clients
│       │   ├── types/        # TypeScript definitions
│       │   └── utils/        # Utility functions
│       └── assets/           # Static assets
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── feature-home/         # Home feature package
│   └── eslint-config/        # Shared ESLint configuration
├── docs/                     # Project documentation
└── turbo.json               # Turborepo configuration
```

## 🛠️ Available Scripts

### Root Level Scripts
- `pnpm dev` - Start all development servers
- `pnpm dev:app` - Start only the mobile app
- `pnpm build` - Build all packages and apps
- `pnpm build:app` - Build only the mobile app
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Fix linting issues

### Mobile App Scripts
- `pnpm dev` - Start Expo development server
- `pnpm ios` - Run on iOS simulator
- `pnpm android` - Run on Android emulator
- `pnpm web` - Run on web browser
- `pnpm build` - Export production build
- `pnpm test` - Run unit tests
- `pnpm lint` - Lint source code

## 🌍 Internationalization

The template includes a complete i18n setup with type-safe translations:

### Translation Keys
All user-facing text uses translation keys:

```tsx
import useAppTranslation from '@/hooks/useAppTranslation';

const MyComponent = () => {
  const { t } = useAppTranslation();
  
  return <Text>{t('HomeScreen.title')}</Text>;
};
```

### Supported Languages
- English (US) - `en-US`
- English (Canada) - `en-CA`

### Adding New Languages
1. Create new locale file in `src/i18n/locales/`
2. Update the resources in `src/i18n/i18n.ts`
3. Add to supported languages list

## 🧪 Testing Strategy

The template implements a comprehensive testing approach:

### Unit Tests
- Component testing with React Native Testing Library
- Hook testing with custom utilities  
- Utility function testing
- Type-safe mocking of translations

### Test Commands
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests
```tsx
import { render, screen } from '@/utils/testing/reactNativeTestingLibraryUtils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('HomeScreen.title')).toBeTruthy();
  });
});
```

## 📊 State Management

The template follows a hierarchical state management approach:

| State Type | Use Case | Implementation |
|------------|----------|----------------|
| **Local State** | Component UI state | `useState`, `useReducer` |
| **Shared State** | Cross-component state | React Context |
| **Server State** | API data | TanStack Query (future) |
| **Form State** | Form handling | React Hook Form (future) |
| **Persistent State** | User preferences | AsyncStorage + hooks |

## 🎨 UI Components

### Design System
The `@acme/ui` package provides reusable components:

- **Button** - Variants: primary, secondary, outline
- **Text** - Typography variants: h1, h2, h3, body, caption  
- **View** - Layout component with spacing utilities

### Usage Example
```tsx
import { Button, Text, View } from '@acme/ui';

const MyScreen = () => (
  <View padding="large">
    <Text variant="h1">Welcome</Text>
    <Button 
      title="Get Started"
      variant="primary"
      onPress={handlePress}
    />
  </View>
);
```

## 🔧 Development Workflow

### Adding New Screens
1. Create screen file in `apps/mobile/app/`
2. Use Expo Router file-based routing conventions
3. Add navigation and translations as needed

### Creating Shared Components
1. **UI Components** - Add to `packages/ui/src/`
2. **Feature Components** - Add to `packages/feature-*/src/`
3. Write tests alongside components
4. Export from package index

### API Integration
1. Define types in appropriate `types/` directory
2. Create API clients in `services/`
3. Use environment variables for configuration
4. Add error handling and logging

## 🚀 Production Build

### Build Process
```bash
# Build for production
pnpm build:app

# Check bundle sizes
pnpm bundlesize
```

### Deployment Options
- **EAS Build** - Expo Application Services
- **EAS Hosting** - Static web hosting
- **App Store** - iOS App Store deployment
- **Google Play** - Android Play Store deployment

### Environment Configuration
The template uses Zod for environment variable validation:

```typescript
// src/env.ts
const clientEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
});

export const clientEnv = clientEnvSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});
```

## 📖 Documentation

- [File Structure](./docs/file-structure.md) - Detailed directory organization
- [Architecture Decisions](./docs/architecture.md) - Design choices and rationale
- [Deployment Guide](./docs/deployment.md) - Production deployment instructions
- [Contributing Guide](./docs/contributing.md) - Development guidelines

## 🔗 Useful Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## 🆘 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
# Clear Metro cache
pnpm expo start --clear
```

**Package resolution issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**iOS build issues:**
```bash
# Reset iOS simulator
xcrun simctl erase all
```

**Android build issues:**
```bash
# Clean Android build
cd android && ./gradlew clean
```

---

Built with ❤️ using modern React Native development practices.