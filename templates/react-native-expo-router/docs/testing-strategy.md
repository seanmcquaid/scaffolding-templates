# Testing Strategy

This document outlines the testing approach and best practices for the React Native Expo Router template.

## Testing Philosophy

The template follows a three-tier testing strategy:

1. **Unit Tests** - Test individual components, hooks, and utilities in isolation
2. **Integration Tests** - Test component interactions and workflows with mocked APIs
3. **End-to-End Tests** - Test complete user flows in a real environment (optional for mobile)

## Testing Tools

- **Jest** - Test runner and framework
- **React Native Testing Library** - Component testing utilities
- **Jest Native Matchers** - Additional matchers for React Native
- **MSW** - API mocking (when needed)

## Test Configuration

### Jest Configuration (`jest.config.js`)

```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/app/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    // ... other path mappings
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/__tests__/**',
  ],
};
```

### Test Setup (`app/setupTests.ts`)

```typescript
import '@testing-library/jest-native/extend-expect';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Returns translation key for validation
    i18n: { changeLanguage: jest.fn() },
  }),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  Link: ({ children }) => children,
}));
```

## Writing Tests

### Component Testing

Test components by their behavior, not implementation:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders with correct title', () => {
    render(<Button title="Click me" onPress={() => {}} />);
    
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button title="Click me" onPress={onPress} />);
    
    fireEvent.press(screen.getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button title="Click me" onPress={() => {}} loading />);
    
    expect(screen.queryByText('Click me')).toBeNull();
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });
});
```

### Hook Testing

Test custom hooks using the testing library:

```typescript
import { renderHook } from '@testing-library/react-native';
import useAppTranslation from '@/hooks/useAppTranslation';

describe('useAppTranslation', () => {
  it('returns translation function', () => {
    const { result } = renderHook(() => useAppTranslation());
    
    expect(typeof result.current.t).toBe('function');
    expect(result.current.t('HomePage.title')).toBe('HomePage.title');
  });
});
```

### API Testing

Test API clients with mocked responses:

```typescript
import { getUsers } from '@/services/api';

// Mock the API client
jest.mock('@/services/api', () => ({
  getUsers: jest.fn(),
}));

const mockedGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;

describe('User API', () => {
  beforeEach(() => {
    mockedGetUsers.mockClear();
  });

  it('fetches users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ];
    mockedGetUsers.mockResolvedValue(mockUsers);

    const users = await getUsers();
    expect(users).toEqual(mockUsers);
    expect(mockedGetUsers).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```typescript
// ❌ Testing implementation details
expect(component.state.isVisible).toBe(true);

// ✅ Testing behavior
expect(screen.getByText('Modal Content')).toBeTruthy();
```

### 2. Use Descriptive Test Names

```typescript
// ❌ Vague test name
it('works correctly');

// ✅ Descriptive test name
it('displays error message when form validation fails');
```

### 3. Test Translation Keys

Since we use i18n, test that the correct translation keys are used:

```typescript
it('displays correct translation key', () => {
  render(<HomePage />);
  
  // Our mock returns the translation key, so we can test it
  expect(screen.getByText('HomePage.title')).toBeTruthy();
});
```

### 4. Mock External Dependencies

Always mock external dependencies to keep tests isolated:

```typescript
// Mock navigation
jest.mock('expo-router');

// Mock async storage
jest.mock('@react-native-async-storage/async-storage');

// Mock API calls
jest.mock('@/services/api');
```

### 5. Test Accessibility

Ensure your components are accessible:

```typescript
it('has correct accessibility properties', () => {
  render(<Button title="Submit" onPress={() => {}} />);
  
  const button = screen.getByRole('button');
  expect(button).toHaveAccessibilityState({ disabled: false });
});
```

## Running Tests

### Development Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders"
```

### CI/CD Integration

Tests are automatically run in CI/CD pipelines. Ensure:

- All tests pass before merging
- Coverage thresholds are met
- No console errors or warnings

## Coverage Expectations

Aim for high test coverage while focusing on critical paths:

- **Components**: 80%+ coverage
- **Utilities**: 90%+ coverage
- **API clients**: 85%+ coverage
- **Hooks**: 80%+ coverage

## Test Organization

### File Structure

```
app/
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── __tests__/
│           └── Button.test.tsx
├── hooks/
│   ├── useAppTranslation.tsx
│   └── __tests__/
│       └── useAppTranslation.test.tsx
└── utils/
    ├── helpers.ts
    └── __tests__/
        └── helpers.test.tsx
```

### Test Categories

Organize tests by type using `describe` blocks:

```typescript
describe('Button Component', () => {
  describe('rendering', () => {
    it('renders with title');
    it('renders with icon');
  });

  describe('interaction', () => {
    it('calls onPress when pressed');
    it('prevents press when disabled');
  });

  describe('states', () => {
    it('shows loading state');
    it('shows disabled state');
  });
});
```

## Debugging Tests

### Common Issues

1. **Components not rendering**: Check if all required props are provided
2. **Translation not working**: Ensure i18n mock is properly set up
3. **Navigation not working**: Verify expo-router mock is configured
4. **Async operations**: Use `waitFor` for async state changes

### Debugging Tips

```typescript
// Debug what's rendered
screen.debug();

// Log specific elements
console.log(screen.getByTestId('my-component'));

// Use queries to find elements
screen.getByText('text'); // Throws if not found
screen.queryByText('text'); // Returns null if not found
screen.findByText('text'); // Async, waits for element
```