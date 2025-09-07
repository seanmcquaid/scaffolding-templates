# React Native Reusables Integration

This template integrates [React Native Reusables](https://reactnativereusables.com/), a collection of copy-paste components for React Native built with NativeWind and class-variance-authority. This provides the React Native equivalent of shadcn/ui components used in our web templates.

## What is React Native Reusables?

React Native Reusables is a component library that provides:
- Pre-built, accessible UI components
- Built with NativeWind (Tailwind CSS for React Native)
- Type-safe variants using class-variance-authority
- Copy-paste components (not package dependencies)
- Consistent design system with web templates

## Integration Components

### Current Components Included

#### Basic UI Components
- **Button**: Styled button with multiple variants (default, destructive, outline, secondary, ghost, link)
- **Input**: Form input with label and error states
- **Card**: Container component with header, content, and footer sections
- **Badge**: Small status indicator with different variants

#### Utility Components
- **LoadingSpinner**: Loading indicator
- **LoadingOverlay**: Full-screen loading overlay
- **Toast/Toaster**: Notification system
- **PageError**: Error state display
- **PageWrapper**: Container with loading and error states

### Component Variants

Components use class-variance-authority for type-safe variants:

```tsx
import { Button } from '@/components/ui';

// Different button variants
<Button title="Primary" variant="default" onPress={() => {}} />
<Button title="Secondary" variant="secondary" onPress={() => {}} />
<Button title="Outline" variant="outline" onPress={() => {}} />
<Button title="Destructive" variant="destructive" onPress={() => {}} />
<Button title="Ghost" variant="ghost" onPress={() => {}} />
<Button title="Link" variant="link" onPress={() => {}} />

// Different sizes
<Button title="Small" size="sm" onPress={() => {}} />
<Button title="Default" size="default" onPress={() => {}} />
<Button title="Large" size="lg" onPress={() => {}} />
```

## Adding New Components

To add new React Native Reusables components:

1. **Manual Creation**: Create components following the established patterns
2. **CLI Usage**: Use the React Native Reusables CLI (when network allows)

### Manual Component Creation

Follow this pattern for new components:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styles';

const componentVariants = cva(
  // Base classes
  'base-styles-here',
  {
    variants: {
      variant: {
        default: 'default-styles',
        secondary: 'secondary-styles',
      },
      size: {
        sm: 'small-styles',
        lg: 'large-styles',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface ComponentProps 
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof componentVariants> {
  // Custom props here
}

export const Component: React.FC<ComponentProps> = ({
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <View
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  );
};
```

### Using the CLI

When the network allows, you can use the React Native Reusables CLI:

```bash
# Add a specific component
npx @react-native-reusables/cli add button

# Add multiple components
npx @react-native-reusables/cli add button input card

# List available components
npx @react-native-reusables/cli add --help
```

## Configuration Files

### components.json
```json
{
  "$schema": "https://rnr-docs.vercel.app/schema.json",
  "aliases": {
    "components": "@/components",
    "utils": "@/utils"
  },
  "style": "default",
  "tailwind": {
    "baseColor": "slate",
    "config": "tailwind.config.js",
    "css": "global.css",
    "cssVariables": true
  },
  "tsx": true
}
```

### Required Dependencies

The integration requires these dependencies:

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.2.0",
    "@rn-primitives/portal": "^1.0.0"
  },
  "devDependencies": {
    "nativewind": "^4.1.23",
    "react-native-reanimated": "^4.1.0",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## Design Tokens

The template uses CSS variables for consistent theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 9% 3.9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  /* ... more tokens */
}
```

These tokens ensure consistency between light and dark themes and alignment with web templates.

## Styling Utilities

### cn() Function
The `cn()` utility combines clsx and tailwind-merge for efficient class handling:

```tsx
import { cn } from '@/utils/styles';

// Merges classes intelligently
const classes = cn(
  'base-class',
  condition && 'conditional-class',
  'override-class'
);
```

### Theme Integration
Components automatically respect the design system:

```tsx
// Uses design tokens automatically
<Card className="bg-card text-card-foreground">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
</Card>
```

## Testing

Components are tested using simplified mocks to avoid NativeWind complexity in tests:

```tsx
// jest automatically mocks NativeWind and related dependencies
import { Button } from '@/components/ui';

test('Button component', () => {
  const onPress = jest.fn();
  const component = <Button title="Test" onPress={onPress} />;
  expect(component).toBeDefined();
});
```

## Benefits

1. **Consistency**: Aligned with web template component patterns
2. **Type Safety**: Full TypeScript support with variant types
3. **Accessibility**: Built-in accessibility features
4. **Performance**: Optimized with proper tree-shaking
5. **Maintainability**: Shared design tokens and patterns
6. **Developer Experience**: Familiar API from shadcn/ui

## Migration from StyleSheet

If migrating existing components:

1. Replace StyleSheet objects with Tailwind classes
2. Use cva for variant management
3. Add proper TypeScript interfaces
4. Use design tokens for colors and spacing
5. Ensure accessibility props are included

```tsx
// Before (StyleSheet)
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
});

// After (React Native Reusables)
const buttonVariants = cva(
  'bg-primary p-4 rounded-lg'
);
```

This integration provides a modern, scalable component system that aligns with current web development practices while maintaining React Native performance and accessibility standards.