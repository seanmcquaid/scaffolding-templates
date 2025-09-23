# File Structure

This document explains the file organization and architecture decisions for the Expo React Native template.

## Root Directory

```
expo-react-native/
├── src/                    # Application source code
│   ├── app/               # Expo Router pages (file-based routing)
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization
│   ├── services/          # API clients and external services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── constants/         # App constants
├── assets/                # Static assets
├── docs/                  # Documentation
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore patterns
├── .husky/               # Git hooks
├── .lintstagedrc.json    # Lint-staged configuration
├── .nvmrc                # Node version specification
├── .prettierrc.json      # Prettier configuration
├── app.json              # Expo configuration
├── bundlesize.config.json # Bundle size limits
├── eslint.config.js      # ESLint configuration
├── metro.config.js       # Metro bundler configuration
├── package.json          # Dependencies and scripts
├── setup.sh              # Setup script
├── tsconfig.json         # TypeScript configuration
└── vitest.config.ts      # Testing configuration
```

## App Directory (Expo Router)

The `src/app/` directory uses Expo Router's file-based routing system:

```
src/app/
├── (tabs)/               # Tab navigation group
│   ├── _layout.tsx      # Tab layout configuration
│   ├── index.tsx        # Home tab (/)
│   └── explore.tsx      # Explore tab (/explore)
├── _layout.tsx          # Root layout
└── +not-found.tsx       # 404 page
```

**Configuration**: The custom app directory location is configured using the `EXPO_ROUTER_APP_ROOT=src/app` environment variable, which is automatically included in all package.json scripts.

**Key Features:**
- File-based routing with automatic navigation
- Nested layouts for complex navigation structures
- Type-safe routing with TypeScript
- Cross-platform support (iOS, Android, Web)

## Source Directory

The `src/` directory contains all application source code:

```
src/
├── components/          # React components
│   ├── app/            # Feature-specific components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization
│   ├── locales/        # Translation files
│   └── i18n.ts         # i18n configuration
├── services/           # API clients and external services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   └── testing/        # Testing utilities
└── constants/          # App constants
```

### Components Directory

#### `src/components/ui/`
Reusable UI components that form the design system:

```
src/components/ui/
├── Button.tsx           # Button component with variants
├── Button.test.tsx      # Button component tests
└── index.ts             # Component exports
```

**Key Features:**
- Variant-based styling system
- TypeScript prop interfaces
- Comprehensive test coverage
- Cross-platform compatibility

#### `src/components/app/`
Feature-specific components with business logic:

```
src/components/app/
├── HomeScreen.tsx       # Main home screen component
├── HomeScreen.test.tsx  # Home screen tests
└── index.ts             # Component exports
```

**Key Features:**
- Feature-focused components
- Integration with UI components
- Internationalization support
- Business logic encapsulation

### Hooks Directory

Custom React hooks for shared logic:

```
src/hooks/
└── useAppTranslation.tsx # i18n hook wrapper
```

**Key Features:**
- Reusable stateful logic
- Type-safe implementations
- Easy testing with renderHook

### Internationalization (i18n)

Complete i18n setup with type safety:

```
src/i18n/
├── locales/
│   ├── en-US.json       # English (US) translations
│   └── en-CA.json       # English (Canada) translations
└── i18n.ts              # i18n configuration
```

**Key Features:**
- JSON-based translation files
- Namespace organization (Common, HomeScreen, etc.)
- Pluralization support
- Runtime language switching

### Services Directory

API clients and external service integrations:

```
src/services/
└── apiClient.ts         # HTTP client configuration
```

**Key Features:**
- Centralized API configuration
- Error handling and retry logic
- Authentication integration
- Type-safe request/response handling

### Types Directory

TypeScript type definitions:

```
src/types/
└── index.ts             # Shared type definitions
```

**Key Features:**
- Shared interface definitions
- API response types
- Component prop types
- Domain model definitions

### Constants Directory

Application constants and configuration:

```
src/constants/
└── index.ts             # App constants
```

**Key Features:**
- Color schemes and design tokens
- Configuration values
- Environment-specific constants
- Type-safe constant definitions

### Utils Directory

Utility functions and testing helpers:

```
src/utils/
└── testing/
    ├── setupTests.ts    # Test environment setup
    └── reactNativeTestingLibraryUtils.tsx # Testing utilities
```

**Key Features:**
- Test configuration and mocks
- Custom render functions
- Shared testing utilities
- Mock implementations

## Assets Directory

Static assets for the application:

```
assets/
├── icon.png             # App icon (1024x1024)
├── adaptive-icon.png    # Android adaptive icon
├── splash-icon.png      # Splash screen icon
└── favicon.png          # Web favicon
```

**Key Features:**
- Multiple icon formats for different platforms
- Optimized for various screen densities
- Platform-specific assets
- Web compatibility

## Configuration Files

### Package Configuration
- `package.json`: Dependencies, scripts, and project metadata
- `tsconfig.json`: TypeScript compiler configuration
- `metro.config.js`: Metro bundler configuration for React Native

### Code Quality
- `eslint.config.js`: ESLint rules and configuration
- `.prettierrc.json`: Code formatting rules
- `.lintstagedrc.json`: Pre-commit hook configuration

### Development Tools
- `vitest.config.ts`: Test runner configuration
- `bundlesize.config.json`: Bundle size monitoring
- `.nvmrc`: Node.js version specification

### Expo Configuration
- `app.json`: Expo project configuration
- Platform-specific settings
- Build and deployment configuration

## File Naming Conventions

### Components
- **PascalCase**: Component files (`HomeScreen.tsx`, `Button.tsx`)
- **Co-located tests**: `ComponentName.test.tsx`
- **Index exports**: `index.ts` for clean imports

### Utilities and Services
- **camelCase**: Utility files (`apiClient.ts`, `useAppTranslation.tsx`)
- **Descriptive names**: Clear purpose from filename
- **Type definitions**: `.d.ts` for type-only files

### Configuration
- **lowercase**: Configuration files (`package.json`, `tsconfig.json`)
- **Dotfiles**: Hidden configuration (`.prettierrc.json`, `.eslintrc.js`)

## Import Path Organization

TypeScript path mapping provides clean imports:

```typescript
// Good: Absolute imports with path mapping
import { Button } from '@/components/ui/Button';
import { HomeScreen } from '@/components/app/HomeScreen';
import { apiClient } from '@/services/apiClient';
import useAppTranslation from '@/hooks/useAppTranslation';

// Avoid: Relative imports for distant files
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../../services/apiClient';
```

## Testing Organization

### Test File Naming
- **Co-located tests**: Next to source files (`Button.test.tsx`)
- **Descriptive names**: Clear test purpose
- **Consistent extensions**: `.test.tsx` for React components

### Test Utilities
- **Centralized setup**: `src/utils/testing/setupTests.ts`
- **Custom render functions**: Testing library wrappers
- **Mock configurations**: Shared mocks for consistency

## Development Workflow Files

### Git Configuration
- `.gitignore`: Excludes build artifacts, dependencies, and platform-specific files
- `.husky/pre-commit`: Runs lint-staged before commits
- `.lintstagedrc.json`: Configures pre-commit quality checks

### Environment Management
- `.env.example`: Template for environment variables
- Environment variable validation with Zod
- Platform-specific configuration support

This file structure promotes:
- **Simplicity**: Clear, flat structure that's easy to navigate
- **Scalability**: Organized by feature and responsibility
- **Maintainability**: Consistent patterns and naming conventions
- **Developer Experience**: Modern tooling and automated quality checks
- **Cross-Platform**: Optimized for iOS, Android, and Web