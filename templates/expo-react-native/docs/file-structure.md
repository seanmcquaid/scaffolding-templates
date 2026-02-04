# File Structure

This document explains the organization and purpose of files and directories in the Expo React Native template.

## Root Level

```
expo-react-native/
├── src/                    # Source code directory
│   ├── app/               # Application routes (Expo Router)
│   ├── components/        # Reusable React components
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization configuration
│   ├── services/          # API clients and business logic
│   ├── __tests__/         # Test files
│   ├── env.ts             # Environment variable validation
│   └── jest-setup.ts      # Jest test setup
├── assets/                 # Static assets (images, fonts, etc.)
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore rules
├── .nvmrc                  # Node version specification
├── app.json                # Expo configuration
├── index.js                # Entry point
├── metro.config.js         # Metro bundler configuration
├── package.json            # Dependencies and scripts
├── setup.sh                # Automated setup script
└── tsconfig.json           # TypeScript configuration
```

## Directory Details

### `/src`

All source code is contained within the `src` directory, following common project organization patterns.

### `/src/app`

Contains all application screens organized with Expo Router's file-based routing.

```
src/app/
├── (tabs)/                 # Tab navigation group
│   ├── _layout.tsx        # Tab navigator configuration
│   ├── index.tsx          # Home screen (default route)
│   └── explore.tsx        # Explore screen
├── _layout.tsx            # Root layout with providers
└── modal.tsx              # Modal screen example
```

**Key Files:**
- `_layout.tsx` - Root layout component that wraps all screens
- `(tabs)/` - Route group for tab-based navigation
- Screen files automatically become routes

### `/src/components`

Reusable React Native components organized by purpose.

```
src/components/
├── app/                    # Feature-specific components
└── ui/                     # Generic UI components
    ├── ThemedText.tsx     # Themed text component
    ├── ThemedView.tsx     # Themed view component
    └── IconSymbol.tsx     # Icon wrapper component
```

**Guidelines:**
- **UI components** - Generic, reusable components (buttons, inputs, cards)
- **App components** - Feature-specific components with business logic
- Co-locate tests with components when appropriate

### `/src/hooks`

Custom React hooks for shared logic.

```
src/hooks/
├── useAppTranslation.tsx   # Type-safe i18n hook
├── useColorScheme.ts       # Theme detection hook
└── useThemeColor.ts        # Theme color management
```

**Best Practices:**
- Start hook names with `use`
- Keep hooks focused on single responsibility
- Document complex hooks with JSDoc comments

### `/src/i18n`

Internationalization setup and translation files.

```
src/i18n/
├── locales/
│   ├── en-US.ts           # English (US) translations
│   └── en-CA.ts           # English (Canada) translations
└── i18next.client.ts      # i18next configuration
```

**Translation Structure:**
```typescript
export default {
  Common: {
    loading: 'Loading...',
    error: 'An error occurred',
  },
  HomePage: {
    title: 'Welcome!',
    description: 'Get started...',
  },
} as const;
```

### `/src/services`

API clients, data fetching, and business logic.

```
src/services/
└── createApiClient.ts      # API client configuration
```

**Guidelines:**
- Create API clients using ky
- Validate responses with Zod schemas
- Use TanStack Query for data fetching
- Implement proper error handling

### `/src/__tests__`

Test files for components and utilities.

```
src/__tests__/
└── ThemedText.test.tsx     # Component test example
```

**Testing Approach:**
- Co-locate tests with components when appropriate
- Use Jest with React Native mocks
- Mock i18n in tests (returns translation keys)
- Test component behavior, not implementation

## Configuration Files

### `app.json`

Expo app configuration including:
- App name and version
- Bundle identifiers
- Icon and splash screen paths
- Platform-specific settings
- Expo plugins (including expo-router root configuration)

### `index.js`

Entry point that loads the Expo Router application from `src/app`.

### `metro.config.js`

Metro bundler configuration for:
- Module resolution
- Asset handling
- Transformer options
- Cache management

### `tsconfig.json`

TypeScript configuration with:
- Strict type checking enabled
- Path aliases (`@/*` for `src/*` imports)
- React Native specific settings
- Compiler options

### `eslint.config.js`

ESLint configuration enforcing:
- TypeScript best practices
- React Native patterns
- Import organization
- Mandatory i18n (no hardcoded strings)
- Accessibility rules

### `.env.example`

Template for environment variables:
- API endpoints
- Feature flags
- App configuration
- All variables prefixed with `EXPO_PUBLIC_`

## Asset Organization

```
assets/
├── images/                 # Image files
├── icon.png               # App icon
├── splash.png             # Splash screen
├── adaptive-icon.png      # Android adaptive icon
└── favicon.png            # Web favicon
```

**Guidelines:**
- Use optimized images (WebP for web, PNG for native)
- Provide @2x and @3x versions for high-DPI screens
- Keep assets organized by feature or type
- Use `require()` for static assets in React Native

## Import Aliases

The template uses path aliases for cleaner imports:

```typescript
// Instead of: import { ThemedText } from '../../../components/ui/ThemedText'
import { ThemedText } from '@/components/ui/ThemedText';

// Instead of: import useAppTranslation from '../../hooks/useAppTranslation'
import useAppTranslation from '@/hooks/useAppTranslation';
```

**Configured Aliases:**
- `@/*` - Maps to `src/*` directory

## Best Practices

### File Naming

- **Components**: PascalCase (e.g., `ThemedText.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAppTranslation.tsx`)
- **Utilities**: camelCase (e.g., `createApiClient.ts`)
- **Types**: PascalCase (e.g., `User.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Component Organization

1. Imports (external, then internal)
2. Type definitions
3. Component definition
4. Styles (StyleSheet.create)
5. Exports

### Keep Files Focused

- One component per file (with related types)
- Extract complex logic into custom hooks
- Split large files into smaller, focused modules
- Co-locate related files when it makes sense
