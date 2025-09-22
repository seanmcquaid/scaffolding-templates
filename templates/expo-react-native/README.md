# Expo React Native Template

A modern, production-ready template for building cross-platform mobile applications with Expo, featuring TypeScript, comprehensive testing, and excellent developer experience.

## ✨ Features

### Core Technologies
- **Expo SDK 54** - Cross-platform development with web support
- **React Native 0.81** - Modern React Native with New Architecture support  
- **TypeScript** - Type-safe development with strict configuration
- **Expo Router** - File-based routing with type safety

### Development Experience
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Pre-commit quality checks
- **Vitest** - Fast unit testing with React Native Testing Library
- **Type-Safe i18n** - Internationalization with translation validation

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
pnpm dev
```

### Using Setup Script (Recommended)

```bash
chmod +x setup.sh
./setup.sh
```

## 📂 Project Structure

```
├── app/                    # Expo Router pages (file-based routing)
├── src/                    # Application source code
│   ├── components/         # Reusable components
│   │   ├── app/           # Feature-specific components
│   │   └── ui/            # UI/design system components
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization setup
│   ├── services/          # API clients and business logic
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── constants/         # App constants
├── assets/                # Static assets
├── docs/                  # Project documentation
└── app.json              # Expo configuration
```

## 🛠️ Available Scripts

- `pnpm dev` - Start Expo development server
- `pnpm ios` - Run on iOS simulator
- `pnpm android` - Run on Android emulator
- `pnpm web` - Run on web browser
- `pnpm build` - Export production build
- `pnpm test` - Run unit tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Lint source code
- `pnpm lint:fix` - Fix linting issues

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

The template implements comprehensive testing:

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
The template provides reusable components in `src/components/ui/`:

- **Button** - Variants: primary, secondary, outline

### Usage Example
```tsx
import { Button } from '@/components/ui/Button';

const MyScreen = () => (
  <View>
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
1. Create screen file in `app/`
2. Use Expo Router file-based routing conventions
3. Add navigation and translations as needed

### Creating Components
1. **UI Components** - Add to `src/components/ui/`
2. **Feature Components** - Add to `src/components/app/`
3. Write tests alongside components
4. Use `useAppTranslation` for all user-facing text

### API Integration
1. Define types in `src/types/`
2. Create API clients in `src/services/`
3. Use environment variables for configuration
4. Add error handling and logging

## 🚀 Production Build

### Build Process
```bash
# Build for production
pnpm build

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