# File Structure

This document outlines the file organization and architectural patterns used in the React Native Expo Router template.

## Directory Structure

```
react-native-expo-router/
├── app/                        # Expo Router pages and layouts
│   ├── _layout.tsx            # Root layout with providers
│   ├── index.tsx              # Home screen
│   └── about.tsx              # About screen
├── assets/                    # Static assets
│   ├── icon.png              # App icon
│   ├── splash-icon.png       # Splash screen icon
│   ├── adaptive-icon.png     # Android adaptive icon
│   └── favicon.png           # Web favicon
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── ui/              # Generic UI components
│   │   │   ├── Button.tsx   # Reusable button component
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── index.ts     # UI components barrel export
│   │   └── app/             # App-specific components
│   ├── hooks/               # Custom React hooks
│   │   └── useAppTranslation.tsx
│   ├── services/            # External services and API clients
│   │   └── api.ts          # HTTP client with Zod validation
│   ├── utils/               # Utility functions
│   │   └── helpers.ts      # Common helper functions
│   ├── constants/           # App constants and configuration
│   │   └── index.ts        # Colors, app constants
│   ├── types/               # TypeScript type definitions
│   ├── i18n/                # Internationalization
│   │   ├── locales/         # Translation files
│   │   │   ├── en-US.json
│   │   │   └── en-CA.json
│   │   └── index.ts         # i18n configuration
│   ├── setupTests.ts        # Jest test setup
│   └── env.ts               # Environment variable validation
├── docs/                    # Documentation
├── .expo/                   # Expo configuration (generated)
├── node_modules/            # Dependencies
├── .husky/                  # Git hooks
├── app.json                 # Expo app configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest testing configuration
├── eslint.config.js        # ESLint configuration
├── .prettierrc.json        # Prettier configuration
├── .lintstagedrc.json      # lint-staged configuration
├── .gitignore              # Git ignore rules
├── .nvmrc                  # Node version specification
├── .env.example            # Environment variables example
└── README.md               # Project documentation
```

## Architectural Patterns

### Component Organization

Components are organized by purpose and reusability:

- **`src/components/ui/`** - Generic, reusable UI components
  - These should be framework-agnostic and highly reusable
  - Examples: Button, LoadingSpinner, Input, Modal
  - Should not contain business logic or app-specific behavior

- **`src/components/app/`** - App-specific components
  - Components that contain business logic or app-specific behavior
  - Examples: UserProfile, ProductCard, NavigationHeader
  - Can use UI components but add app-specific functionality

### File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase starting with 'use' (e.g., `useAppTranslation.tsx`)
- **Utilities**: camelCase (e.g., `helpers.ts`, `validation.ts`)
- **Constants**: camelCase for files, SCREAMING_SNAKE_CASE for exports
- **Types**: PascalCase (e.g., `User.ts`, `ApiResponse.ts`)

### Import Path Conventions

The template uses path mapping for clean imports:

```typescript
// Use path aliases instead of relative imports
import { Button } from '@/components/ui';
import { getUsers } from '@/services/api';
import { COLORS } from '@/constants';
import useAppTranslation from '@/hooks/useAppTranslation';
```

### Screen vs Component Pattern

- **Screens** (in `app/` directory): Full-page components that represent routes
- **Components** (in `src/components/`): Reusable pieces that make up screens

## Expo Router Structure

The `app/` directory uses Expo Router's file-based routing:

- `_layout.tsx` - Root layout that wraps all screens
- `index.tsx` - Home screen (matches `/` route)
- `about.tsx` - About screen (matches `/about` route)
- `(tabs)/` - Tab-based navigation group
- `[id].tsx` - Dynamic route parameter
- `+not-found.tsx` - 404 error page

## State Management Hierarchy

Following the established patterns from other templates:

1. **URL State** - For shareable app location (using Expo Router)
2. **Local Storage** - For persistence between sessions (AsyncStorage)
3. **Local State** - Component-level state (useState)
4. **Lifted State** - Shared between related components
5. **Context** - For subtree state or small amounts of global state
6. **Global State** - For significant global state (TanStack Query for server state)

## Testing Strategy

- **Unit Tests** - Individual components and utilities
- **Integration Tests** - Component interactions and workflows
- **Mock Strategy** - Mock external dependencies (API calls, navigation, i18n)

Test files are co-located with their components in `__tests__` directories.