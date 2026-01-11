# Expo React Native Skills

This document defines the specialized skills and capabilities available in this Expo React Native template for GitHub Copilot agents.

## Core Skills

### Expo Development
**Skill:** `expo-react-native`
- Building cross-platform mobile applications with Expo
- Using Expo SDK for native functionality
- Implementing file-based routing with Expo Router
- Managing app configuration with app.json
- Using Expo development tools and workflows

### React Native Development
**Skill:** `react-native-components`
- Building mobile UI with React Native components
- Using platform-specific components and APIs
- Implementing responsive layouts for mobile
- Managing mobile-specific interactions (touch, gestures)
- Optimizing performance for mobile devices

### Cross-Platform Development
**Skill:** `cross-platform-mobile`
- Writing code that works on iOS and Android
- Handling platform-specific differences
- Using Platform module for platform detection
- Implementing platform-specific styling
- Testing on both iOS and Android simulators

## Navigation Skills

### Expo Router
**Skill:** `expo-router-navigation`
- Implementing file-based routing with Expo Router
- Using stack, tab, and drawer navigation
- Managing navigation state
- Implementing deep linking
- Handling navigation between screens

**Skill:** `mobile-navigation-patterns`
- Implementing tab-based navigation
- Using stack navigation for screen flows
- Creating drawer navigation menus
- Managing modal screens
- Implementing bottom sheets

## UI Development Skills

### React Native Styling
**Skill:** `react-native-styling`
- Using StyleSheet for component styling
- Implementing responsive layouts with Flexbox
- Managing theme and design tokens
- Using platform-specific styles
- Implementing dark mode support

**Skill:** `mobile-ui-components`
- Building accessible mobile UI components
- Using React Native's built-in components
- Implementing custom UI components
- Managing touch interactions
- Creating reusable component libraries

### Native UI Libraries
**Skill:** `expo-ui-libraries`
- Using React Native Paper or similar UI libraries
- Implementing Material Design or iOS design patterns
- Building custom components with native look and feel
- Managing component theming
- Ensuring accessibility compliance

## Native Features Skills

### Expo SDK
**Skill:** `expo-sdk-features`
- Using Expo Camera for photo/video capture
- Implementing location services
- Using device sensors (accelerometer, gyroscope)
- Accessing device storage and file system
- Implementing push notifications

**Skill:** `expo-media-handling`
- Capturing and displaying images
- Recording and playing audio
- Playing video content
- Managing media permissions
- Optimizing media for mobile devices

## State Management Skills

### Mobile State Management
**Skill:** `react-native-state`
- Managing local component state
- Using Context API for global state
- Implementing async storage for persistence
- Managing form state on mobile
- Handling offline state

**Skill:** `mobile-data-sync`
- Implementing data synchronization
- Managing offline-first architecture
- Using local database (SQLite)
- Handling network connectivity changes
- Implementing background sync

## API Integration Skills

### Mobile API Clients
**Skill:** `react-native-networking`
- Making HTTP requests from React Native
- Implementing authentication flows
- Handling network errors and retries
- Managing API tokens securely
- Implementing request/response caching

## Testing Skills

### React Native Testing
**Skill:** `react-native-testing`
- Writing unit tests with Jest
- Testing React Native components
- Mocking native modules
- Testing navigation flows
- Testing async operations

**Skill:** `mobile-e2e-testing`
- Writing E2E tests with Detox or Maestro
- Testing on iOS and Android
- Implementing test automation
- Testing on real devices
- Managing test data and fixtures

## Build & Development Skills

### Expo Development Workflow
**Skill:** `expo-development`
- Using Expo Go for development
- Running on simulators/emulators
- Using development builds
- Debugging with Expo DevTools
- Hot reloading and fast refresh

**Skill:** `expo-build-deploy`
- Building standalone apps with EAS Build
- Configuring app signing (iOS/Android)
- Managing app versions and updates
- Using Expo Application Services (EAS)
- Deploying updates with EAS Update

### App Configuration
**Skill:** `expo-config`
- Configuring app.json/app.config.js
- Managing environment variables
- Configuring app icons and splash screens
- Setting up deep linking schemes
- Managing app permissions

## Performance Skills

### Mobile Performance
**Skill:** `react-native-performance`
- Optimizing list rendering with FlatList
- Implementing lazy loading
- Managing memory usage
- Optimizing images for mobile
- Using performance profiling tools

**Skill:** `react-native-optimization`
- Reducing bundle size
- Implementing code splitting
- Optimizing JavaScript performance
- Using native modules for heavy operations
- Managing app startup time

## Platform-Specific Skills

### iOS Development
**Skill:** `expo-ios`
- iOS-specific configurations
- Using iOS design patterns
- Handling iOS permissions
- Testing on iOS devices/simulator
- Debugging iOS-specific issues

### Android Development
**Skill:** `expo-android`
- Android-specific configurations
- Using Android design patterns
- Handling Android permissions
- Testing on Android devices/emulator
- Debugging Android-specific issues

## Tools & Technologies

- **Expo SDK**: Framework for React Native development
- **React Native**: Mobile UI framework
- **Expo Router**: File-based routing for mobile
- **TypeScript**: Type-safe development
- **Jest**: Testing framework
- **Detox/Maestro**: E2E testing (if configured)
- **EAS (Expo Application Services)**: Build and deployment
- **AsyncStorage**: Local data persistence
- **React Navigation**: Navigation library (via Expo Router)

## Best Practices

1. **Start with Expo Go**: Use Expo Go during development
2. **Platform-specific code**: Use Platform module when needed
3. **Optimize lists**: Always use FlatList for long lists
4. **Image optimization**: Compress and resize images appropriately
5. **Handle permissions**: Request permissions properly on both platforms
6. **Test on both platforms**: Regularly test on iOS and Android
7. **Use EAS for builds**: Leverage EAS Build for production apps
8. **Implement error boundaries**: Handle errors gracefully on mobile
9. **Offline support**: Consider offline-first architecture
10. **Performance monitoring**: Monitor app performance in production

## Mobile-Specific Considerations

### Permissions
- Request permissions at appropriate times
- Explain why permissions are needed
- Handle permission denials gracefully
- Test permission flows thoroughly

### Touch Interactions
- Use proper touch targets (minimum 44x44 points)
- Implement feedback for touch interactions
- Handle gestures appropriately
- Test on real devices

### Screen Sizes
- Support various screen sizes and orientations
- Use responsive layouts with Flexbox
- Test on different device sizes
- Handle safe areas (notches, status bars)

### Performance
- Optimize JavaScript bundle size
- Use native modules for performance-critical code
- Implement pagination for long lists
- Monitor memory usage

## Quick Start Commands

- `pnpm start`: Start Expo development server
- `pnpm android`: Run on Android emulator
- `pnpm ios`: Run on iOS simulator
- `pnpm test`: Run unit tests
- `pnpm lint`: Check code quality
- `pnpm lint:fix`: Auto-fix linting issues
- `pnpm check-types`: Validate TypeScript types
- `eas build`: Build app with EAS (requires setup)
- `eas update`: Deploy OTA update (requires setup)
