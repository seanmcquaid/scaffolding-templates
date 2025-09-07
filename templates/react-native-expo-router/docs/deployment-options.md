# Deployment Options

React Native apps have different deployment considerations compared to web applications. This guide covers the most common deployment strategies for React Native applications built with Expo.

## Expo Application Services (EAS)

EAS is the recommended deployment platform for Expo applications:

### Setup
```bash
npm install -g @expo/cli
eas login
eas build:configure
```

### Build Configuration
Configure builds in `eas.json`:
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
}
```

### Deployment Process
1. **Development builds**: `eas build --profile preview`
2. **Production builds**: `eas build --profile production`
3. **App Store deployment**: `eas submit`

## Alternative Deployment Options

### Manual Builds
- **iOS**: Use Xcode for local builds
- **Android**: Use Android Studio or CLI tools
- **Requires**: Native development environment setup

### CI/CD Integration
Popular CI/CD solutions:
- **GitHub Actions**: Free tier available
- **Bitrise**: Mobile-focused CI/CD
- **CircleCI**: Docker-based builds
- **Azure DevOps**: Microsoft ecosystem integration

### App Store Distribution
- **Apple App Store**: iOS app distribution
- **Google Play Store**: Android app distribution
- **Internal distribution**: TestFlight (iOS) or Internal App Sharing (Android)

## Environment Management

### Development
- Local development with Expo CLI
- Expo Go app for testing
- Development builds for custom native code

### Staging
- Preview builds for internal testing
- TestFlight/Internal App Sharing distribution
- Feature flags for controlled rollouts

### Production
- App Store releases
- Over-the-air updates via Expo Updates
- Monitoring and analytics integration

## Best Practices

1. **Version management**: Use semantic versioning consistently
2. **Environment separation**: Clear dev/staging/prod boundaries
3. **Automated testing**: Run tests in CI/CD pipeline
4. **Release notes**: Document changes for each release
5. **Rollback strategy**: Plan for quick rollbacks if needed
6. **Performance monitoring**: Track app performance in production