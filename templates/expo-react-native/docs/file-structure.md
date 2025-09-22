# File Structure

This document explains the file organization and architecture decisions for the Expo React Native template.

## Root Directory

```
expo-react-native/
├── apps/                    # Applications
├── packages/                # Shared packages
├── docs/                   # Documentation
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore patterns
├── .husky/               # Git hooks
├── .lintstagedrc.json    # Lint-staged configuration
├── .nvmrc                # Node version specification
├── .prettierrc.json      # Prettier configuration
├── eslint.config.js      # Root ESLint configuration
├── package.json          # Root package configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── setup.sh              # Setup script
└── turbo.json            # Turborepo configuration
```

## Apps Directory

### apps/mobile/
The main Expo React Native application with cross-platform support.

```
apps/mobile/
├── app/                  # Expo Router pages (file-based routing)
│   ├── (tabs)/          # Tab navigation group
│   │   ├── _layout.tsx  # Tab layout configuration
│   │   ├── index.tsx    # Home tab (/)
│   │   └── explore.tsx  # Explore tab (/explore)
│   ├── _layout.tsx      # Root layout
│   └── +not-found.tsx   # 404 page
├── src/                 # Application source code
│   ├── components/      # App-specific components
│   │   ├── app/        # Feature-specific components
│   │   └── ui/         # Local UI components (rare)
│   ├── hooks/          # Custom React hooks
│   ├── i18n/           # Internationalization
│   │   ├── locales/    # Translation files
│   │   └── i18n.ts     # i18n configuration
│   ├── services/       # API clients and external services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   │   └── testing/    # Testing utilities
│   └── constants/      # App constants
├── assets/             # Static assets (images, fonts)
├── app.json           # Expo configuration
├── metro.config.js    # Metro bundler configuration
├── package.json       # App dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vitest.config.ts   # Testing configuration
```

## Packages Directory

### packages/ui/
Shared UI components library providing the design system.

```
packages/ui/
├── src/
│   ├── Button.tsx       # Button component with variants
│   ├── Text.tsx         # Typography component
│   ├── View.tsx         # Layout component
│   ├── Button.test.tsx  # Component tests
│   └── index.ts         # Package exports
├── package.json         # Package configuration
├── eslint.config.js     # ESLint configuration
├── vitest.config.ts     # Test configuration
└── test-setup.ts        # Test environment setup
```

**Key Features:**
- Variant-based styling system
- TypeScript prop interfaces
- Consistent spacing and typography
- Cross-platform compatibility
- Comprehensive test coverage

### packages/feature-home/
Home feature domain logic and components.

```
packages/feature-home/
├── src/
│   ├── HomeScreen.tsx   # Main home screen component
│   └── index.ts         # Package exports
├── package.json         # Package configuration
├── eslint.config.js     # ESLint configuration
├── vitest.config.ts     # Test configuration
└── test-setup.ts        # Test environment setup
```

**Key Features:**
- Domain-driven design
- Feature-specific business logic
- Integration with UI components
- Internationalization support
- Isolated testing environment

### packages/eslint-config/
Shared ESLint configuration for all packages and apps.

```
packages/eslint-config/
├── index.js             # ESLint configuration export
└── package.json         # Package configuration
```

**Configuration Features:**
- TypeScript support with strict rules
- React Native specific rules
- i18n validation (no hardcoded strings)
- Import organization
- Prettier integration
- Testing framework support

## File Organization Principles

### Component Organization
Components are organized by their scope and reusability:

1. **UI Components** (`packages/ui/`) - Highly reusable, presentational components
2. **Feature Components** (`packages/feature-*/`) - Domain-specific components with business logic
3. **App Components** (`apps/mobile/src/components/app/`) - App-specific implementations

### Directory Naming Conventions
- **PascalCase**: Component files (`HomeScreen.tsx`, `Button.tsx`)
- **camelCase**: Utility files (`apiClient.ts`, `useAppTranslation.tsx`)
- **kebab-case**: Package directories (`feature-home`, `eslint-config`)
- **lowercase**: Configuration files (`package.json`, `tsconfig.json`)

### Import Path Organization
TypeScript path mapping provides clean imports:

```typescript
// Good: Absolute imports
import { Button } from '@acme/ui';
import { HomeScreen } from '@acme/feature-home';
import { apiClient } from '@/services/apiClient';
import useAppTranslation from '@/hooks/useAppTranslation';

// Avoid: Relative imports for distant files
import { HomeScreen } from '../../../packages/feature-home/src/HomeScreen';
```

## Testing Organization

### Test File Naming
- **Unit tests**: `ComponentName.test.tsx`
- **Integration tests**: `feature.integration.test.tsx`
- **Test utilities**: `setupTests.ts`, `reactNativeTestingLibraryUtils.tsx`

### Test Location Strategy
- **Co-located**: Tests next to their source files
- **Utilities**: Centralized in `src/utils/testing/`
- **Configuration**: Package root level (`test-setup.ts`, `vitest.config.ts`)

## Configuration Files

### Package.json Structure
Each package follows consistent script naming:
- `build`: Build the package/app
- `dev`: Start development server
- `lint`: Run ESLint
- `lint:fix`: Fix ESLint issues
- `test`: Run tests
- `test:watch`: Run tests in watch mode
- `test:coverage`: Run tests with coverage

### TypeScript Configuration
- **Strict mode**: Enabled across all packages
- **Path mapping**: Configured for clean imports
- **Expo compatibility**: Using Expo's base configuration
- **Monorepo support**: References between packages

### Build Tool Configuration
- **Turborepo**: Orchestrates builds across the monorepo
- **Metro**: Configures React Native bundling
- **Vitest**: Fast testing with ESM support
- **ESLint**: Comprehensive code quality rules

## Asset Organization

### Static Assets
```
apps/mobile/assets/
├── icon.png            # App icon (1024x1024)
├── adaptive-icon.png   # Android adaptive icon
├── splash-icon.png     # Splash screen icon
└── favicon.png         # Web favicon
```

### Asset Best Practices
- Use PNG for icons with transparency
- Provide multiple resolutions for different screen densities
- Optimize images for mobile performance
- Follow platform-specific design guidelines

## Development Workflow Files

### Git Configuration
- `.gitignore`: Excludes build artifacts, dependencies, and platform-specific files
- `.husky/pre-commit`: Runs lint-staged before commits
- `.lintstagedrc.json`: Configures pre-commit quality checks

### Environment Management
- `.env.example`: Template for environment variables
- `.nvmrc`: Specifies required Node.js version
- Package.json engines: Enforces Node.js version requirements

This file structure promotes:
- **Scalability**: Clear separation of concerns
- **Maintainability**: Consistent organization patterns
- **Developer Experience**: Intuitive navigation and tooling
- **Code Quality**: Automated checks and standards
- **Cross-Platform**: Optimized for iOS, Android, and Web