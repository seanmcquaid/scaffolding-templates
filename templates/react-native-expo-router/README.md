# React Native Expo Router Template

A modern React Native scaffolding template with Expo Router, TypeScript, and best practices for mobile development. This template provides a solid foundation for building React Native applications with file-based routing, state management, internationalization, and comprehensive testing.

## Features

- 🚀 **Expo Router** - File-based routing for React Native
- 📱 **React Native 0.79** - Latest React Native with New Architecture support
- 🔷 **TypeScript** - Full type safety with strict configuration
- 🎨 **NativeWind** - Tailwind CSS for React Native with utility-first styling
- 🧩 **React Native Reusables** - shadcn/ui equivalent components for React Native
- 🧪 **Testing Setup** - Jest + React Native Testing Library
- 🌍 **Internationalization** - i18next with locale management
- 📡 **API Client** - Ky-based HTTP client with Zod validation
- 🔍 **Code Quality** - ESLint, Prettier, and pre-commit hooks
- 📝 **Form Handling** - React Hook Form with Zod validation
- 🗃️ **State Management** - TanStack Query for server state
- 🛠️ **Development Tools** - Husky, lint-staged, and type checking

## Quick Start

### Prerequisites

- Node.js 22.12.0 or higher
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

1. **Clone the template:**
   ```bash
   npx degit https://github.com/seanmcquaid/scaffolding-templates/templates/react-native-expo-router my-expo-app
   cd my-expo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

### Development Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start web development server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run typecheck` - Type check with TypeScript

## Project Structure

```
├── app/                    # Expo Router pages and source code
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Home screen
│   ├── about.tsx          # About screen
│   ├── components/        # Reusable components
│   │   ├── ui/           # Generic UI components
│   │   └── app/          # App-specific components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API clients and external services
│   ├── utils/            # Utility functions
│   ├── constants/        # App constants and themes
│   ├── types/            # TypeScript type definitions
│   ├── i18n/             # Internationalization setup
│   ├── setupTests.ts     # Test configuration
│   └── env.ts            # Environment variable validation
├── assets/                # Static assets (images, fonts)
├── docs/                 # Documentation
└── package.json
```

## Core Concepts

### Navigation

This template uses Expo Router for file-based routing. Routes are automatically generated based on the file structure in the `app/` directory.

```typescript
// Navigate programmatically
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/about');

// Or use Link component
import { Link } from 'expo-router';

<Link href="/about">Go to About</Link>
```

### Internationalization

All user-facing text must be translated using the i18n system:

```typescript
import useAppTranslation from '@/hooks/useAppTranslation';

const { t } = useAppTranslation();

// Use translation keys instead of hardcoded text
<Text>{t('HomePage.title')}</Text>
```

### Styling with NativeWind

This template uses **NativeWind** to bring Tailwind CSS to React Native, providing consistency with web templates:

```typescript
import { View, Text } from 'react-native';
import { cn } from '@/utils/styles';

// Use Tailwind classes directly
<View className="flex-1 bg-white p-4">
  <Text className="text-h1 text-center text-gray-800">
    Welcome
  </Text>
</View>

// Combine with conditional classes
const buttonClasses = cn(
  'py-3 px-6 rounded-lg items-center',
  variant === 'primary' ? 'bg-primary' : 'bg-secondary',
  disabled && 'opacity-50'
);
```

Custom design tokens are defined in `tailwind.config.js` with colors, spacing, and typography that align with the design system.

### API Integration

The template includes a typed API client using Ky and Zod:

```typescript
import { getUsers, User } from '@/services/api';

// Automatically typed and validated
const users: User[] = await getUsers();
```

### State Management

Use TanStack Query for server state management:

```typescript
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/api';

const { data: users, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
});
```

### Form Handling

Use React Hook Form with Zod validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

## Testing

The template includes a comprehensive testing setup:

```typescript
import { render, screen } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

test('renders button', () => {
  render(<Button title="Test" onPress={() => {}} />);
  expect(screen.getByText('Test')).toBeTruthy();
});
```

### Running Tests

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

## Environment Configuration

Create a `.env.local` file based on `.env.example`:

```env
# API Configuration
EXPO_PUBLIC_API_URL=https://api.example.com

# App Configuration
EXPO_PUBLIC_APP_NAME=My App Name
```

## Code Quality

The template enforces code quality through:

- **ESLint** - Code linting with React Native rules
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Husky** - Git hooks for pre-commit validation
- **lint-staged** - Run linters only on staged files

## Deployment

### Building for Production

1. **Configure app.json** with your app details
2. **Build the app:**
   ```bash
   eas build --platform all
   ```

### Store Deployment

Follow Expo's deployment guides for:
- [App Store deployment](https://docs.expo.dev/submit/ios/)
- [Google Play deployment](https://docs.expo.dev/submit/android/)

## Documentation

For detailed guides and advanced usage, see the documentation in the `docs/` folder:

- [React Native Reusables Integration](./docs/react-native-reusables.md) - Component library integration guide
- [File Structure](./docs/file-structure.md) - Project organization guide
- [Styling Guide](./docs/styling.md) - NativeWind and component styling
- [API Integration](./docs/api-integration.md) - HTTP client and API patterns
- [Testing Guide](./docs/testing.md) - Testing strategies and examples
- [Deployment Options](./docs/deployment-options.md) - Build and deployment guide

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Resources

- [Expo Router Documentation](https://expo.github.io/router/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

This template is available under the MIT License.