# Cursor IDE Configuration for Expo React Native Template

This directory contains Cursor IDE configuration for the Expo React Native scaffolding template with custom sub-agents.

## Quick Start

Cursor automatically discovers agent files in the `/agents/` directory. No additional configuration needed!

### Using Agents in Chat (`Cmd/Ctrl+L`)

```
@expo-react-native-specialist how should I implement deep linking?
@requirements-analyst analyze this mobile feature request
@quality-analyst create tests for the UserProfile screen
```

### Using Agents in Composer (`Cmd/Ctrl+K`)

1. Open Composer mode
2. Select agent from dropdown
3. Describe your task - agent guides multi-file implementation

## Available Agents

### Template Agents (9 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `@requirements-analyst` - Feature requests, user stories, acceptance criteria
- `@software-architect` - System design, ADRs, component architecture
- `@implementation-engineer` - Feature coding, TypeScript development
- `@ui-ux-designer` - Interface design, accessibility, design systems
- `@quality-analyst` - Unit tests, integration tests, E2E tests
- `@deployment-engineer` - EAS Build, CI/CD pipelines, app store deployment
- `@maintenance-engineer` - Bug fixes, refactoring, dependency updates
- `@production-support-engineer` - Incident response, crash analytics, debugging

**Expo Specialist (1):**
- `@expo-react-native-specialist` - Expo Router, native modules, EAS Build, mobile performance

## Usage Patterns

### Pattern 1: Mobile-Specific Implementation

```
@expo-react-native-specialist

Context: Building a camera feature with custom controls
Requirements: Camera capture, filters, and save to gallery
Current Setup: Using expo-camera

How should I implement this following Expo best practices?
```

### Pattern 2: Native Module Integration

```
@expo-react-native-specialist

I need to integrate a custom native module for biometric authentication.
Guide me through:
1. Config plugin setup
2. Native code integration
3. TypeScript types
4. Testing on iOS and Android
```

### Pattern 3: Feature Development Workflow

```
# Stage 1: Requirements
@requirements-analyst create spec for offline-first data sync

[Review spec output]

# Stage 2: Architecture
@software-architect design architecture for offline sync
with AsyncStorage and background sync

[Review architecture]

# Stage 3: Implementation
@expo-react-native-specialist implement offline sync
following the architecture design

[Review implementation]

# Stage 4: Testing
@quality-analyst create tests for offline scenarios
including edge cases and error handling
```

## Best Practices

### 1. Prioritize Expo Specialist

For React Native and Expo-specific questions, always start with `@expo-react-native-specialist`:

| Task | Agent | Why |
|------|-------|-----|
| Expo Router navigation | `@expo-react-native-specialist` | Framework-specific patterns |
| Native modules | `@expo-react-native-specialist` | Expo config plugins |
| EAS Build setup | `@expo-react-native-specialist` | Deployment expertise |
| Mobile performance | `@expo-react-native-specialist` | Platform optimization |
| Generic implementation | `@implementation-engineer` | Cross-platform patterns |
| UI components | `@ui-ux-designer` | Design systems |
| Testing | `@quality-analyst` | Test coverage |

### 2. Provide Mobile Context

✅ **Good:**
```
@expo-react-native-specialist

Context: Building a profile screen with image upload
Platform: iOS and Android (min SDK 23)
Requirements: Image picker, cropping, compression
Current Setup: Expo Router with app/(tabs)/profile.tsx
Performance: Images should be < 1MB after compression

How should I implement this?
```

❌ **Bad:**
```
@expo-react-native-specialist how do I upload images?
```

### 3. Consider Platform Differences

Always ask about iOS/Android differences:

```
@expo-react-native-specialist

Implementing push notifications. What are the platform-specific
considerations for iOS vs Android? Include permission handling
and testing strategies for both platforms.
```

### 4. Performance First

For mobile apps, always consider performance:

```
@expo-react-native-specialist

Review this list rendering for performance issues.
The list has 1000+ items. Should I use FlashList?
What optimizations should I apply?

[Include code]
```

## Mobile-Specific Workflows

### Workflow 1: New Screen Development

```
# In Chat (Cmd+L)
@ui-ux-designer design a mobile-first product listing screen
with infinite scroll and pull-to-refresh

[Review design]

# In Composer (Cmd+K)
@expo-react-native-specialist implement the product listing
screen following the design above. Create:
- app/products/index.tsx
- components/ProductCard.tsx
- hooks/useProducts.ts
- Optimize for 60fps scrolling
```

### Workflow 2: Native Feature Integration

```
@expo-react-native-specialist

Integrate device motion sensors for shake detection:
1. Choose appropriate expo-sensors API
2. Implement shake detection algorithm
3. Add permission handling
4. Test on real devices
5. Provide fallback for unsupported devices
```

### Workflow 3: App Store Deployment

```
@deployment-engineer

Set up EAS Build for production deployment:
1. Configure build profiles (development, preview, production)
2. Set up code signing (iOS certificates, Android keystore)
3. Configure app.json for both platforms
4. Set up GitHub Actions for automated builds
5. Prepare for App Store and Play Store submission
```

## Configuration

### Agent Settings (Optional)

Create `.cursor/config.json` to customize agent behavior:

```json
{
  "agents": {
    "autoDiscover": true,
    "directories": [
      "./agents"
    ],
    "priorityByDirectory": {
      ".": ["expo-react-native-specialist"]
    }
  },
  "composer": {
    "defaultAgent": "expo-react-native-specialist",
    "showAgentSelector": true
  }
}
```

See `config.example.json` for full configuration options.

## Troubleshooting

### Issue: Agent Gives Web Advice for Mobile

**Symptoms:** Agent suggests web-specific solutions instead of mobile patterns

**Solutions:**
1. Explicitly mention "mobile" and "React Native" in your prompt
2. Reference Expo documentation in your question
3. Specify iOS/Android requirements
4. Use `@expo-react-native-specialist` instead of generic agents
5. Provide device/platform context (iOS 14+, Android SDK 23+)

### Issue: Performance Recommendations Not Mobile-Specific

**Symptoms:** Agent suggests web performance patterns for mobile

**Solutions:**
1. Mention target devices (e.g., "mid-range Android devices")
2. Specify performance constraints (e.g., "must maintain 60fps")
3. Ask about mobile-specific optimizations (FlashList, reanimated)
4. Include device testing results if available
5. Reference React Native performance best practices

### Issue: Build/Deployment Issues

**Symptoms:** Agent can't help with EAS Build or native build issues

**Solutions:**
1. Use `@deployment-engineer` for build pipeline issues
2. Provide eas.json configuration
3. Include build logs and error messages
4. Specify build profile (development/preview/production)
5. Mention target platform (iOS/Android/both)

## Expo-Specific Tips

### 1. Expo Router Patterns

```
@expo-react-native-specialist

How should I structure deep linking for this navigation hierarchy?
- (tabs)/_layout.tsx
  - index.tsx (Home)
  - profile.tsx (Profile)
- products/[id].tsx (Product Details)

Include linking configuration and universal link setup.
```

### 2. Native Module Config

```
@expo-react-native-specialist

I need to add a custom native module. Guide me through:
1. Creating a config plugin
2. Modifying native code (iOS Swift, Android Kotlin)
3. Exposing API to JavaScript
4. TypeScript definitions
5. Testing in development client
```

### 3. Offline-First Patterns

```
@software-architect

Design offline-first architecture for this mobile app:
- Data sync with REST API
- Local storage with AsyncStorage
- Optimistic updates
- Conflict resolution
- Background sync

Follow React Native and Expo best practices.
```

### 4. Mobile Testing Strategy

```
@quality-analyst

Create testing strategy for mobile app:
1. Unit tests (Jest + React Native Testing Library)
2. Component tests with mocks for native modules
3. E2E tests (Detox or Maestro)
4. Manual testing checklist (iOS/Android)
5. Performance testing approach
```

## Resources

- **Template README:** `/README.md` - Expo template-specific setup
- **Repository Patterns:** `../../AGENTS.md` - Repository-wide guidelines  
- **Agent Definitions:** `/agents/*.agent.md` - Individual agent capabilities
- **Example Config:** `.cursor/config.example.json` - Full configuration options
- **Expo Documentation:** https://docs.expo.dev

## Integration with Cursor Features

### With Cursor Tab (Auto-complete)

The Expo specialist agent context influences auto-complete suggestions for React Native patterns.

### With Cursor CMD+K (Quick Edit)

```
Cmd+K → Select code → @quality-analyst add tests for this hook
```

### Terminal Integration

```
@deployment-engineer what EAS commands should I run to build for TestFlight?
@maintenance-engineer suggest expo commands to diagnose why my app crashes on launch
```

---

**Happy mobile development with Cursor agents! 📱**

For more information about the agent system, see the [root custom agents guide](../../docs/custom-agents-guide.md).
