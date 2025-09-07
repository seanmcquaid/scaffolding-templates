# Adding UI Components

This template provides a foundation for creating consistent UI components in React Native. Here's how to add new components following the established patterns.

## Component Structure

### UI Components (`app/components/ui/`)
Generic, reusable components that can be used throughout the app:

```typescript
// Example: app/components/ui/Card.tsx
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated';
}

const Card = ({ style, variant = 'default', children, ...props }: CardProps) => {
  return (
    <View 
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Card;
```

### App Components (`app/components/app/`)
Application-specific components that implement business logic:

```typescript
// Example: app/components/app/UserProfile.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface UserProfileProps {
  user: User;
  onEdit: () => void;
}

const UserProfile = ({ user, onEdit }: UserProfileProps) => {
  return (
    <Card variant="elevated">
      <Text>{user.name}</Text>
      <Button title="Edit Profile" onPress={onEdit} />
    </Card>
  );
};

export default UserProfile;
```

## Export Pattern

Update `app/components/ui/index.ts` to export new UI components:

```typescript
export { default as Card } from './Card';
// ... other exports
```

## Testing Components

Create tests in `__tests__` directories:

```typescript
// app/components/ui/__tests__/Card.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import Card from '../Card';

describe('Card', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Test content</Text>
      </Card>
    );
    
    expect(getByText('Test content')).toBeTruthy();
  });
});
```

## Best Practices

1. **TypeScript**: Always use TypeScript for type safety
2. **Props interface**: Extend React Native component props when appropriate
3. **Styling**: Use StyleSheet.create() for performance
4. **Accessibility**: Include proper accessibility props
5. **Testing**: Write tests for component behavior
6. **Documentation**: Include JSDoc comments for complex components