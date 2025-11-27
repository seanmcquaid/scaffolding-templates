# Agent Instructions for Expo React Native Template

This document contains specific instructions and guidelines for AI agents working with this Expo React Native template.

## Template Overview

This is a production-ready Expo React Native template for building cross-platform mobile applications (iOS, Android, and Web) with modern tooling and best practices.

## Key Patterns to Maintain

### 1. Mandatory Internationalization
- **All user-facing text MUST use translations** - enforced by ESLint `i18next/no-literal-string` rule
- Translation keys follow the pattern: `Namespace.key` (e.g., `HomePage.title`, `Common.loading`)
- Use `useAppTranslation()` hook for all components
- Translation files located in `i18n/locales/`

### 2. File-Based Routing (Expo Router)
- Routes are defined by file structure in `app/` directory
- Use `(tabs)` for grouped routes (tab navigation)
- `_layout.tsx` files define layouts
- Modal screens use `presentation: 'modal'` option

### 3. Component Organization
- **UI Components**: `components/ui/` - Generic, reusable components (ThemedText, ThemedView, IconSymbol)
- **App Components**: `components/app/` - Feature-specific components with business logic
- All components use TypeScript with strict types

### 4. Theming & Styling
- Use `ThemedText` and `ThemedView` for automatic dark mode support
- StyleSheet.create() for component styles
- Color themes defined in `hooks/useThemeColor.ts`
- Support both light and dark color schemes

### 5. State Management Hierarchy
- **TanStack Query** - Server state and data fetching
- **React Hook Form** - Form state management
- **useState/useReducer** - Local component state
- **usehooks-ts** - Common utility hooks

### 6. TypeScript Standards
- Strict mode enabled
- Use `type` imports: `import type { ... }`
- Define prop types as interfaces
- Path aliases: `@/*` maps to root directory

### 7. API Integration
- API clients in `services/` directory
- Use `ky` for HTTP requests
- Validate with Zod schemas
- Environment variables validated in `env.client.ts`

## Development Workflow

### Adding New Screens
1. Create screen file in `app/` or `app/(tabs)/`
2. Add translations to i18n locales
3. Use themed components
4. Implement proper loading/error states

### Adding New Components
1. Place in appropriate directory (ui/ or app/)
2. Use TypeScript interfaces for props
3. Add translations for any text
4. Create tests if appropriate
5. Export from component file

### Modifying Existing Code
- Maintain existing patterns
- Don't break i18n enforcement
- Keep TypeScript strict
- Test linting: `pnpm lint`

## Common Pitfalls to Avoid

1. **Hardcoded Strings**: Never use string literals for user-facing text
2. **Direct Imports**: Always use `@/` path alias instead of relative imports beyond same folder
3. **Missing Types**: All functions and components should have proper TypeScript types
4. **Breaking Layouts**: Maintain Expo Router file structure
5. **Theme Violations**: Always use themed components for consistent styling

## Testing Considerations

- Jest configured with jest-expo preset
- Testing React Native components requires Expo development environment
- Basic tests validate configuration
- Full component testing should be done in Expo environment

## Build & Deployment

- **iOS**: `pnpm ios` (requires macOS and Xcode)
- **Android**: `pnpm android` (requires Android Studio/SDK)
- **Web**: `pnpm web` (runs in browser)
- **Production Build**: `pnpm build`

## Environment Variables

- All client-accessible variables must start with `EXPO_PUBLIC_`
- Defined in `.env.example`
- Validated with Zod in `env.client.ts`
- Never commit actual `.env` file

## Code Quality Tools

- **ESLint**: Configured with React Native and i18n rules
- **Prettier**: Code formatting (runs on pre-commit)
- **Husky**: Git hooks for code quality
- **lint-staged**: Runs checks on staged files only

## When Making Changes

1. Read existing code patterns first
2. Follow the established conventions
3. Run `pnpm lint` before committing
4. Ensure i18n is maintained
5. Test on actual device/simulator when possible
6. Update documentation if adding new patterns

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
