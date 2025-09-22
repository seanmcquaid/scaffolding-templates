# Expo React Native Template - CoPilot Instructions

## Project Overview

This is a modern Expo React Native template with monorepo architecture using pnpm workspaces and Turborepo. The template follows established patterns from the scaffolding-templates repository while being specifically optimized for cross-platform mobile development.

## Architecture Patterns

### Monorepo Structure
- **apps/mobile** - Main Expo React Native application
- **packages/ui** - Shared UI components library
- **packages/feature-home** - Home feature domain logic
- **packages/eslint-config** - Shared linting configuration

### Navigation Architecture
Uses Expo Router (file-based routing) with:
- Tab-based navigation structure
- Type-safe route parameters
- Automatic deep linking support
- Web compatibility

### Component Architecture
- **UI Components** (`packages/ui`) - Reusable, presentational components
- **Feature Components** (`packages/feature-*`) - Domain-specific logic and screens
- **App Components** (`apps/mobile/src/components/app`) - App-specific implementations

## Development Patterns

### File Organization Best Practices
```
apps/mobile/src/
├── components/
│   ├── app/          # App-specific components
│   └── ui/           # Local UI components (rare, prefer packages/ui)
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization setup
├── services/         # API clients and external services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and helpers
└── constants/        # App constants and configuration
```

### Component Development Standards

#### UI Components (`packages/ui`)
```typescript
// Good: Prop-based styling with sensible defaults
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  // Implementation with proper TypeScript and React Native patterns
};
```

#### Feature Components (`packages/feature-*`)
```typescript
// Good: Domain-focused components with translations
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from '@acme/ui';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <View padding="large">
      <Text variant="h1">{t('HomeScreen.title')}</Text>
      <Button title={t('HomeScreen.getStarted')} onPress={handlePress} />
    </View>
  );
};
```

### State Management Hierarchy

| State Type | Use Case | Example |
|------------|----------|---------|
| **Local State** | Component UI state | Form inputs, modal visibility |
| **Shared State** | Cross-component state | User authentication, theme |
| **Persistent State** | User preferences | Settings, login state |
| **Server State** | API data | User profile, content data |

### Testing Patterns

#### Component Testing
```typescript
// Good: Test behavior, not implementation
import { render, screen, fireEvent } from '../utils/testing/reactNativeTestingLibraryUtils';
import { HomeScreen } from '@acme/feature-home';

describe('HomeScreen', () => {
  it('displays welcome message', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomeScreen.title')).toBeTruthy();
  });

  it('handles get started action', () => {
    const onGetStarted = vi.fn();
    render(<HomeScreen onGetStarted={onGetStarted} />);
    
    fireEvent.press(screen.getByText('HomeScreen.getStarted'));
    expect(onGetStarted).toHaveBeenCalled();
  });
});
```

#### Hook Testing
```typescript
// Good: Test custom hooks with renderHook
import { renderHook } from '../utils/testing/reactNativeTestingLibraryUtils';
import { useAppTranslation } from '../hooks/useAppTranslation';

describe('useAppTranslation', () => {
  it('provides translation function', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(result.current.t).toBeInstanceOf(Function);
  });
});
```

## Internationalization Requirements

### ⚠️ Translation Requirements

**ALL USER-FACING TEXT MUST BE TRANSLATED** - This is mandatory across the entire template.

#### Correct Usage
```typescript
// ✅ ALWAYS use translation keys
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('MyScreen.title')}</Text>
      <Button title={t('Common.submit')} onPress={handleSubmit} />
    </View>
  );
};
```

#### Incorrect Usage
```typescript
// ❌ NEVER use hardcoded strings
const BadComponent = () => {
  return (
    <View>
      <Text>Welcome to the app</Text>  {/* ESLint error */}
      <Button title="Submit" onPress={handleSubmit} />  {/* ESLint error */}
    </View>
  );
};
```

### Translation Organization
```json
// src/i18n/locales/en-US.json
{
  "Common": {
    "submit": "Submit",
    "cancel": "Cancel",
    "loading": "Loading..."
  },
  "HomeScreen": {
    "title": "Welcome to Expo React Native",
    "subtitle": "Modern cross-platform development",
    "getStarted": "Get Started"
  },
  "Navigation": {
    "home": "Home",
    "explore": "Explore"
  }
}
```

## Platform-Specific Considerations

### React Native vs Web
```typescript
// Good: Platform-aware styling
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      web: {
        maxWidth: 800,
        marginHorizontal: 'auto',
      },
      default: {
        padding: 16,
      },
    }),
  },
});
```

### Navigation Differences
```typescript
// Good: Consider platform navigation patterns
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Platform-specific tab bar positioning
        tabBarPosition: Platform.OS === 'web' ? 'top' : 'bottom',
      }}
    >
      {/* Tab screens */}
    </Tabs>
  );
}
```

## Performance Best Practices

### Bundle Size Management
- Use bundlesize configuration to monitor build sizes
- Lazy load heavy components and features
- Optimize images and assets for multiple screen densities

### React Native Performance
```typescript
// Good: Optimize FlatList for large datasets
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  getItemLayout={getItemLayout} // If item size is known
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={10}
/>
```

### Memory Management
```typescript
// Good: Clean up subscriptions and listeners
useEffect(() => {
  const subscription = someService.subscribe(handler);
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## API Integration Patterns

### Environment Configuration
```typescript
// Good: Type-safe environment variables
import { z } from 'zod';

const clientEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_API_KEY: z.string().min(1),
});

export const clientEnv = clientEnvSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
});
```

### API Client Configuration
```typescript
// Good: Centralized API client with error handling
import ky from 'ky';
import { clientEnv } from '../env';

export const apiClient = ky.create({
  prefixUrl: clientEnv.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        // Add authentication headers
        const token = getAuthToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_, __, response) => {
        if (response.status === 401) {
          // Handle authentication errors
          await handleAuthError();
        }
        return response;
      },
    ],
  },
});
```

## Deployment Considerations

### Build Configuration
```json
// Good: EAS Build configuration
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "platforms": ["ios", "android", "web"],
    "newArchEnabled": true,
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

### Environment Management
- Use different environment files for development/staging/production
- Validate all required environment variables at startup
- Keep sensitive data in EAS Secrets, not in source code

## Code Quality Standards

### ESLint Configuration
The template includes comprehensive ESLint rules for:
- React Native best practices
- TypeScript strict mode
- i18n validation
- Import organization
- Prettier integration

### Pre-commit Hooks
All code is automatically:
- Linted and formatted with ESLint/Prettier
- Type-checked with TypeScript
- Tested with Vitest (on relevant changes)

### Testing Standards
- Unit tests for all components and hooks
- Integration tests for complex user flows
- Minimum 80% code coverage target
- Mock external dependencies and APIs

## Development Workflow

### Package Development
When working on shared packages:
1. Make changes in the package directory
2. Test changes in the consuming app
3. Update package version if needed
4. Document any breaking changes

### Monorepo Commands
```bash
# Work on specific apps/packages
pnpm dev:app              # Start only mobile app
pnpm build:app            # Build only mobile app
pnpm test packages/ui     # Test specific package

# Global operations
pnpm dev                  # Start all development servers
pnpm build                # Build all apps and packages
pnpm lint                 # Lint all code
pnpm test                 # Run all tests
```

This template provides a solid foundation for scalable React Native development with modern tooling and best practices.