# ADR-001: Use Expo for React Native Development

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #framework #expo #react-native #mobile #cross-platform

---

## Context

We need a framework for building cross-platform mobile applications with React Native that provides:

- Simplified development setup and workflow
- Cross-platform support (iOS, Android, Web)
- Good developer experience with fast refresh
- Access to native device capabilities
- OTA updates capability
- Modern build tooling

The framework choice significantly impacts development velocity, deployment options, and application capabilities.

## Decision

We will use **Expo** (SDK 54) as the framework for React Native development.

## Rationale

Expo provides:

1. **Simplified Setup**: No need for Xcode/Android Studio for most development
2. **Cross-Platform**: Single codebase for iOS, Android, and Web
3. **Developer Experience**: Excellent DX with Expo Go and fast refresh
4. **Native APIs**: Comprehensive set of native modules (camera, location, etc.)
5. **OTA Updates**: Push updates without app store review (with EAS Update)
6. **Build Service**: EAS Build for cloud-based builds
7. **Modern Tooling**: Latest React Native and Metro bundler
8. **Large Ecosystem**: Extensive library of Expo modules and plugins

## Consequences

### Positive Consequences
- Fast development without native tooling setup
- Consistent cross-platform behavior
- Easy access to device capabilities
- OTA updates for quick iterations
- Strong community and documentation
- Can eject if needed for custom native code
- Web support out of the box

### Negative Consequences / Trade-offs
- Some limitations vs bare React Native
- May need custom native code for edge cases
- Expo Go has limitations (can use custom dev client)
- Slightly larger app size than bare React Native
- Some third-party native libraries may not work

### Risks and Mitigations
- **Risk**: Expo limitations for specific native functionality
  - **Mitigation**: Can create custom dev client or eject to bare workflow if needed
- **Risk**: Third-party library incompatibility
  - **Mitigation**: Most popular libraries support Expo, use Expo alternatives
- **Risk**: App size concerns
  - **Mitigation**: Use EAS Build with hermes for optimized bundles

## Alternatives Considered

### Alternative 1: Bare React Native
- **Description**: Use React Native CLI without Expo
- **Pros**: 
  - Full control over native code
  - No Expo overhead
  - All third-party libraries work
  - Smaller base app size
- **Cons**: 
  - Requires Xcode and Android Studio
  - More complex setup
  - Manual native module linking
  - No OTA updates without custom setup
  - More manual configuration
- **Reason for rejection**: Expo provides better DX and sufficient capabilities for most apps

### Alternative 2: React Native with Ignite CLI
- **Description**: Use Infinite Red's Ignite boilerplate
- **Pros**: 
  - Opinionated structure
  - Built-in generators
  - Good patterns and practices
- **Cons**: 
  - Still requires native tooling
  - More opinionated than Expo
  - Smaller community
- **Reason for rejection**: Expo provides simpler setup and larger ecosystem

### Alternative 3: Flutter
- **Description**: Use Flutter instead of React Native
- **Pros**: 
  - Fast performance
  - Consistent UI across platforms
  - Good tooling
- **Cons**: 
  - Different language (Dart)
  - Cannot leverage React/JS ecosystem
  - Different paradigm
- **Reason for rejection**: Want to use React and JavaScript/TypeScript

### Alternative 4: Capacitor/Ionic
- **Description**: Use Capacitor to wrap web app as native
- **Pros**: 
  - Web-first approach
  - Can reuse web components
  - Simple deployment
- **Cons**: 
  - Not truly native feel
  - Performance limitations
  - WebView-based
- **Reason for rejection**: Prefer true native rendering with React Native

## Implementation Notes

### Expo SDK Configuration
- Use Expo SDK 54 with latest React Native
- Enable Hermes for better performance
- Configure app.json for proper app metadata
- Set up EAS for builds and updates

### Development Workflow
```bash
# Start development server
pnpm dev

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android

# Run web version
pnpm web
```

### Expo Modules Used
- expo-router - File-based routing
- expo-image - Optimized image component
- expo-haptics - Haptic feedback
- expo-symbols - SF Symbols support
- expo-splash-screen - Splash screen management

## Related Decisions

- [ADR-002: Use Expo Router for Navigation](./ADR-002-expo-router.md)
- [ADR-003: Use React 19](./ADR-003-react-19.md)

## References

- [Expo Documentation](https://docs.expo.dev/)
- [Expo SDK 54 Release](https://expo.dev/changelog/2024/10-22-sdk-54)
- [React Native Documentation](https://reactnative.dev/)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
