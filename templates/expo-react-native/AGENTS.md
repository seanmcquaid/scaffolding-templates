# Expo React Native Template - CoPilot Instructions

## Project Overview

This is a modern Expo React Native template designed as a monolith application for cross-platform mobile development. The template follows established patterns from the scaffolding-templates repository while being specifically optimized for React Native development with TypeScript, testing, and modern tooling.

## Architecture Patterns

### Monolith Structure
The template uses a simple, clean monolith architecture:
- **src/app/** - Expo Router pages (file-based routing)
- **src/** - Application source code organized by feature
- **assets/** - Static assets (images, icons, fonts)
- Root-level configuration files

**Note**: The app directory is located inside `src/app` using the `EXPO_ROUTER_APP_ROOT` environment variable configuration.

### Navigation Architecture
Uses Expo Router (file-based routing) with:
- Tab-based navigation structure
- Type-safe route parameters
- Automatic deep linking support
- Web compatibility

### Component Architecture
- **UI Components** (`src/components/ui/`) - Reusable, presentational components
- **App Components** (`src/components/app/`) - Feature-specific components with business logic
- Flat, easy-to-navigate structure without complex nesting

## Development Patterns

### File Organization Best Practices
```
src/
├── components/
│   ├── app/          # Feature-specific components
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization setup
├── services/         # API clients and external services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and helpers
└── constants/        # App constants and configuration
```

### Component Development Standards

#### UI Components (`src/components/ui/`)
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

#### App Components (`src/components/app/`)
```typescript
// Good: Feature-focused components with translations
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('HomeScreen.title')}</Text>
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
import { HomeScreen } from '@/components/app/HomeScreen';

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
      request => {
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
- Tested with Jest (on relevant changes)

### Testing Standards
- Unit tests for all components and hooks
- Integration tests for complex user flows
- Minimum 80% code coverage target
- Mock external dependencies and APIs

## Development Workflow

### Simple Structure Commands
```bash
# Start development
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Lint code
pnpm lint
```

### File Organization
- Keep components small and focused
- Use absolute imports with TypeScript path mapping
- Co-locate tests with their components
- Maintain consistent naming conventions

This template provides a solid foundation for React Native development with modern tooling and best practices while maintaining a simple, understandable monolith architecture.