# Styling with NativeWind

This template uses **NativeWind** to bring Tailwind CSS to React Native, providing a utility-first CSS approach that aligns with the web templates in this repository.

## What is NativeWind?

NativeWind is a React Native utility library that allows you to use Tailwind CSS classes in React Native applications. It provides:
- **Consistency**: Same utility classes as web Tailwind
- **Type Safety**: TypeScript support for class names
- **Performance**: Optimized for React Native
- **Developer Experience**: Familiar Tailwind workflow

## Configuration

The template includes:
- `tailwind.config.js` - Tailwind configuration with custom design tokens
- `global.css` - Tailwind CSS imports
- NativeWind Babel plugin in `babel.config.js`
- TypeScript support via `nativewind-env.d.ts`

## Design System

### Colors
```typescript
// Tailwind config extends with custom colors:
colors: {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  gray: {
    300: '#d1d5db',
    600: '#6b7280',
    700: '#374151',
    800: '#1f2937',
  },
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
}
```

### Typography
```typescript
fontSize: {
  'h1': ['32px', { lineHeight: '40px', fontWeight: 'bold' }],
  'h2': ['24px', { lineHeight: '32px', fontWeight: 'bold' }],
  'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
  'body': ['16px', { lineHeight: '24px' }],
  'caption': ['14px', { lineHeight: '20px' }],
  'small': ['12px', { lineHeight: '16px' }],
}
```

### Spacing
```typescript
spacing: {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
}
```

## Usage Examples

### Basic Component Styling
```tsx
import { View, Text } from 'react-native';

export const Card = ({ children }) => (
  <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
    <Text className="text-h3 text-gray-800 mb-2">Card Title</Text>
    {children}
  </View>
);
```

### Button with Variants
```tsx
import { TouchableOpacity, Text } from 'react-native';
import { cn } from '@/utils/styles';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Button = ({ variant = 'primary', className, ...props }) => {
  const baseClasses = 'py-3 px-6 rounded-lg items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary', 
    outline: 'bg-transparent border border-primary',
  };

  return (
    <TouchableOpacity 
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      <Text className={cn(
        'text-base font-semibold',
        variant === 'outline' ? 'text-primary' : 'text-white'
      )}>
        Button Text
      </Text>
    </TouchableOpacity>
  );
};
```

### Responsive Layout
```tsx
import { View } from 'react-native';

export const Layout = ({ children }) => (
  <View className="flex-1 bg-background p-4">
    <View className="flex-1 justify-center items-center">
      {children}
    </View>
  </View>
);
```

## Class Utility Helper

The template includes a `cn` utility function for merging classes:

```typescript
// app/utils/styles.ts
import clsx, { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

Usage:
```tsx
const buttonClasses = cn(
  'base-button-classes',
  variant === 'primary' && 'bg-primary',
  disabled && 'opacity-50',
  className // External classes
);
```

## Customization

### Extending the Design System
Update `tailwind.config.js` to add new colors, spacing, or typography:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      spacing: {
        '18': '72px',
      }
    }
  }
}
```

### Dark Mode Support
NativeWind supports dark mode through class variants:

```tsx
<View className="bg-white dark:bg-gray-900">
  <Text className="text-gray-900 dark:text-white">
    Theme-aware text
  </Text>
</View>
```

## Best Practices

1. **Use the design system**: Reference colors and spacing from Tailwind config
2. **Component composition**: Create reusable components with Tailwind classes
3. **Conditional classes**: Use the `cn` utility for conditional styling
4. **Performance**: NativeWind optimizes classes at build time
5. **Type safety**: TypeScript provides autocomplete for class names
6. **Consistency**: Follow the same patterns as web templates in this repository

## Migration from StyleSheet

If you have existing StyleSheet code, you can gradually migrate:

```tsx
// Before (StyleSheet)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  }
});

// After (NativeWind)
<View className="flex-1 p-4 bg-white">
```

## Alignment with Web Templates

This approach aligns the React Native template with the web templates in this repository that use Tailwind CSS, providing:
- **Consistent developer experience** across platforms
- **Shared design tokens** and utility patterns
- **Familiar workflow** for developers working across templates