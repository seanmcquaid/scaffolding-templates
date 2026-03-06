# Expo React Native Template

A modern, production-ready template for building cross-platform mobile applications with Expo and React Native, featuring type-safe i18n, comprehensive testing, and excellent developer experience.

## ✨ Features

- **📱 Expo & React Native** - Build truly native apps for iOS, Android, and web
- **🛤️ Expo Router** - File-based routing with type safety
- **🌍 Internationalization** - Type-safe i18n with `useAppTranslation` hook and mandatory translations
- **🔍 Type Safety** - Strict TypeScript configuration with comprehensive type checking
- **🧪 Comprehensive Testing** - Jest + React Native Testing Library
- **📊 State Management** - TanStack Query + React Hook Form + usehooks-ts
- **📋 Code Quality** - ESLint + Prettier with pre-commit hooks via Husky
- **🚀 Performance** - Bundle size monitoring and modern build optimizations
- **♿ Accessibility** - Built-in accessibility best practices

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
- Initialize git hooks for code quality

> **ℹ️ Note:** The `setup.sh` script will automatically install **git**, **nvm**, and **pnpm** if they are not already available on your system (macOS and Linux supported). You may still install them manually if you prefer.

### Prerequisites (for Manual Setup)

- **git** (version control)
- **nvm** (Node Version Manager)
- **Node.js** >=22.12.0
- **pnpm** (recommended package manager)
- **Expo Go** app on your mobile device (for testing)

### Manual Installation

```bash
# Copy environment file
cp .env.example .env

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📂 Project Structure

```
├── src/                    # Source code directory
│   ├── app/               # Application routes (Expo Router)
│   │   ├── (tabs)/        # Tab navigation routes
│   │   │   ├── index.tsx  # Home screen
│   │   │   └── explore.tsx # Explore screen
│   │   ├── _layout.tsx    # Root layout with navigation
│   │   └── modal.tsx      # Example modal screen
│   ├── components/        # Reusable components
│   │   ├── app/          # Feature-specific components
│   │   └── ui/           # UI/design system components
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization setup
│   │   ├── locales/      # Translation files
│   │   └── i18next.client.ts # i18n configuration
│   ├── services/         # API clients and business logic
│   └── __tests__/        # Test files
├── assets/               # Static assets (images, fonts)
└── index.js             # Entry point
```

## 🛠️ Available Scripts

### Development

| Script         | Description                   |
| -------------- | ----------------------------- |
| `pnpm dev`     | Start Expo development server |
| `pnpm start`   | Start Expo development server |
| `pnpm ios`     | Run on iOS simulator          |
| `pnpm android` | Run on Android emulator       |
| `pnpm web`     | Run in web browser            |
| `pnpm build`   | Build for production          |

### Testing & Quality

| Script               | Description              |
| -------------------- | ------------------------ |
| `pnpm test`          | Run tests                |
| `pnpm test:watch`    | Run tests in watch mode  |
| `pnpm test:coverage` | Run tests with coverage  |
| `pnpm lint`          | Lint source code         |
| `pnpm lint:fix`      | Lint and auto-fix issues |
| `pnpm bundlesize`    | Check bundle size        |

## 🌍 Internationalization

This template enforces **mandatory internationalization** with type-safe translation keys:

### Using Translations

```tsx
import useAppTranslation from '@/hooks/useAppTranslation';

const MyComponent = () => {
  const { t } = useAppTranslation();

  return (
    <View>
      <Text>{t('HomePage.title')}</Text>
      <Text>{t('HomePage.description')}</Text>
    </View>
  );
};
```

### Adding Translations

1. Add translation keys to `i18n/locales/en-US.ts`
2. TypeScript will enforce type safety for all translation keys
3. ESLint prevents hardcoded strings in components

## 🧪 Testing

The template includes Jest configured with jest-expo:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

> **Note:** Testing React Native components requires additional setup and is best done with the Expo development environment. The current test setup validates the basic configuration. For comprehensive component testing, consider using Expo's testing documentation and tools.

### Writing Tests

```tsx
// Basic test example
describe('Template Setup', () => {
  it('should have jest configured correctly', () => {
    expect(true).toBe(true);
  });
});
import { ThemedText } from '@/components/ui/ThemedText';

test('renders correctly', () => {
  const { getByText } = render(<ThemedText>HomePage.title</ThemedText>);
  expect(getByText('HomePage.title')).toBeTruthy();
});
```

## 📊 State Management

The template follows a **hierarchical state management approach**:

- **URL State** - For shareable application state (Expo Router)
- **Local Storage** - For user preferences (AsyncStorage)
- **Component State** - For UI state (useState/useReducer)
- **TanStack Query** - For server state management
- **React Hook Form** - For form state and validation

## 🎨 Styling & Components

- **React Native StyleSheet** - Native styling approach
- **Themed Components** - Automatic dark mode support
- **Type-safe theming** - Custom hooks for theme management

## 🔧 Development Workflow

### Adding New Screens

1. Create screen files in `app/` or `app/(tabs)/`
2. Expo Router automatically creates routes
3. Add navigation and translations as needed

### Creating Components

1. **UI Components** - Place in `components/ui/`
2. **Feature Components** - Place in `components/app/`
3. Write tests alongside components
4. Use `useAppTranslation` for all user-facing text

### API Integration

1. Define types in TypeScript
2. Create API clients in `services/`
3. Use TanStack Query for data fetching
4. Handle loading and error states

## 🚀 Building for Production

### iOS

```bash
# Build for iOS
pnpm ios --configuration Release
```

### Android

```bash
# Build for Android
pnpm android --variant release
```

### Web

```bash
# Build for web
pnpm build
```

## 📱 Running on Devices

### Using Expo Go

1. Start the development server: `pnpm dev`
2. Install Expo Go on your mobile device
3. Scan the QR code displayed in the terminal

### Using Simulators/Emulators

**iOS Simulator (macOS only):**

```bash
pnpm ios
```

**Android Emulator:**

```bash
pnpm android
```

## 🌐 Web Support

This template supports running on web:

```bash
pnpm web
```

The app will open in your default browser at `http://localhost:8081`

## 📖 Documentation

For more detailed information, see:

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

## 🔒 Environment Variables

Configure your app using environment variables in `.env`:

```env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_APP_NAME=My App
EXPO_PUBLIC_APP_VERSION=1.0.0
```

All `EXPO_PUBLIC_*` variables are available in your app code.

## 🚨 Troubleshooting

### Dev Server Won't Start

If the development server fails to start, try these steps:

**1. Clear Cache and Restart:**

```bash
npx expo start --clear
```

**2. Check Node Version:**

```bash
node --version  # Should be >=22.12.0
```

If needed, use nvm to switch:

```bash
nvm use 22
```

**3. Reinstall Dependencies:**

```bash
rm -rf node_modules
pnpm install
```

**4. Clear Expo Cache:**

```bash
rm -rf .expo
rm -rf node_modules/.cache
npx expo start --clear
```

### Web Build Issues

If `pnpm web` fails:

**1. Ensure all dependencies are installed:**

```bash
pnpm install
```

**2. Check for missing assets:**

- The template includes placeholder asset files in `assets/`
- Replace `.placeholder` files with actual images before production
- Missing assets will show warnings but won't prevent the app from running

**3. Build for web explicitly:**

```bash
pnpm build
```

This creates a static export in the `./build` directory.

### Port Already in Use

If port 8081 is already in use:

```bash
# Find and kill the process
lsof -ti:8081 | xargs kill -9

# Or use a different port
npx expo start --port 8082
```

### Metro Bundler Issues

**Reset Metro Bundler:**

```bash
rm -rf node_modules
rm -rf .expo
pnpm install
npx expo start --clear
```

**Check for conflicting Metro instances:**

```bash
ps aux | grep metro
# Kill any stray metro processes
```

### iOS Simulator Issues

**Reset Simulator:**

```bash
xcrun simctl erase all
```

### Android Emulator Issues

**Restart ADB:**

```bash
adb kill-server
adb start-server
```

### Common Errors

**"Unable to resolve module"**

- Clear cache: `npx expo start --clear`
- Reinstall: `rm -rf node_modules && pnpm install`

**"Metro bundler failed to start"**

- Check if another metro instance is running
- Clear watchman cache: `watchman watch-del-all` (if watchman is installed)

**"CI mode" errors**

- Ensure CI environment variable is not set incorrectly
- Use `CI=false pnpm dev` to disable CI mode locally

### Still Having Issues?

1. Check the [Expo Documentation](https://docs.expo.dev/troubleshooting/overview/)
2. Search [Expo Forums](https://forums.expo.dev/)
3. Check [GitHub Issues](https://github.com/expo/expo/issues)

## 📄 License

This template is open source and available under the MIT License.
