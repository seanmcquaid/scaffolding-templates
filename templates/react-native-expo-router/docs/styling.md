# Styling

React Native uses StyleSheet for styling, which provides a CSS-like approach with performance optimizations. This template includes a comprehensive styling system with reusable design tokens.

## Styling Architecture

### Common Styles (`app/styles/index.ts`)
- **Colors**: Consistent color palette with light/dark theme support
- **Spacing**: Standardized spacing values for consistent layouts
- **Typography**: Text styles for different semantic elements
- **Layout**: Reusable layout patterns (centered, rows, shadows)

### Component-Specific Styles
Each component includes its own StyleSheet with:
- Local component styles
- Theme-aware color usage
- Responsive design considerations

## Design Tokens

The template includes design tokens in `app/styles/index.ts`:

```typescript
export const colors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000',
  // ... more colors
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  // ... more spacing
};
```

## Customization

### Colors
Update colors in `app/styles/index.ts` and `app/constants/index.ts` to match your brand.

### Typography
Modify typography styles in `app/styles/index.ts` for consistent text styling across the app.

### Theme Support
The template is ready for dark mode implementation. Update components to use theme-aware colors.

## Best Practices

1. **Use design tokens**: Always reference colors and spacing from the design system
2. **Component isolation**: Keep styles close to components for maintainability
3. **Performance**: Use StyleSheet.create() for style optimization
4. **Accessibility**: Include proper contrast ratios and touch targets
5. **Responsive design**: Consider different screen sizes and orientations