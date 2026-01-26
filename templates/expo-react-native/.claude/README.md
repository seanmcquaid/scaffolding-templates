# Claude Configuration for Expo React Native Template

This directory contains Claude configuration for the Expo React Native scaffolding template with custom sub-agents.

## Quick Start

Claude understands the sub-agent pattern through explicit file references and context management.

### In Claude Desktop/Projects

1. **Add Agent Files to Project Knowledge:**
   - Add `/agents/*.agent.md` to project knowledge
   - Add `/README.md` for template context
   - Add `../../AGENTS.md` for repository patterns

2. **Reference Agents in Conversations:**
   ```
   Please act as the Expo React Native Specialist agent defined in 
   /agents/expo-react-native-specialist.agent.md
   
   Task: Implement deep linking with Expo Router for this mobile app
   ```

### In Cursor with Claude

Use `@` references to include agent context:

```
@agents/expo-react-native-specialist.agent.md

How should I implement push notifications for iOS and Android?
```

## Available Agents

### Template Agents (9 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `requirements-analyst` - Feature requests, user stories, mobile requirements
- `software-architect` - Mobile architecture, offline-first design, native patterns
- `implementation-engineer` - React Native coding, TypeScript development
- `ui-ux-designer` - Mobile UI design, touch interactions, accessibility
- `quality-analyst` - Unit tests, component tests, E2E tests (Detox/Maestro)
- `deployment-engineer` - EAS Build, App Store deployment, CI/CD
- `maintenance-engineer` - Bug fixes, native debugging, performance optimization
- `production-support-engineer` - Crash analytics, production debugging, monitoring

**Expo Specialist (1):**
- `expo-react-native-specialist` - Expo Router, native modules, EAS, mobile optimization

## Usage Patterns

### Pattern 1: Mobile Feature Implementation

**Direct reference with mobile context:**
```
Based on the Expo React Native Specialist agent defined in 
agents/expo-react-native-specialist.agent.md, implement a 
camera feature with the following requirements:

Context:
- Platform: iOS 14+ and Android SDK 23+
- Requirements: Photo/video capture, filters, gallery save
- Performance: < 100ms camera launch time
- Permissions: Handle runtime permissions gracefully

Implementation Requirements:
1. Use expo-camera with custom controls
2. Apply real-time filters using shaders
3. Save to device gallery with expo-media-library
4. Handle permission denials gracefully
5. Optimize for 60fps preview
6. Support both orientations
```

### Pattern 2: Native Module Integration

**Multi-stage native integration:**

```
Stage 1: Architecture
-------------------------
Act as the Software Architect (agents/software-architect.agent.md).
Design the architecture for integrating a third-party biometric
authentication SDK with Expo config plugins.

[Wait for and review architecture]

Stage 2: Implementation
-------------------------
Now act as the Expo React Native Specialist 
(agents/expo-react-native-specialist.agent.md).
Implement the biometric authentication:
1. Create config plugin
2. Write native code (Swift for iOS, Kotlin for Android)
3. Expose JavaScript API
4. Add TypeScript definitions
5. Test in development client

[Wait for and review implementation]

Stage 3: Testing
-------------------------
Finally, act as the Quality Analyst (agents/quality-analyst.agent.md).
Create test strategy including:
- Unit tests with native module mocks
- Platform-specific test cases
- Manual testing checklist
- Error scenario handling
```

### Pattern 3: Performance Optimization

**Mobile performance workflow:**

```
Context Setup:
-------------------
I'm optimizing the Expo React Native app. Please reference:
- agents/expo-react-native-specialist.agent.md
- ../../AGENTS.md (React Native performance patterns)

Now act as the Expo React Native Specialist.

Task 1: Profile current performance
[Provide performance metrics, FPS data, bundle size]

Task 2: Identify bottlenecks
Focus on: List rendering, image loading, navigation animations

Task 3: Implement optimizations
Use: FlashList, react-native-fast-image, reanimated 3

Task 4: Verify improvements
Target: 60fps sustained, < 500ms TTI
```

## Claude Projects Setup

### Project Configuration

Create a Claude Project specifically for Expo React Native development:

**Project Name:** Expo React Native Development

**Project Instructions:**
```
This is an Expo React Native mobile app template with custom sub-agents
for specialized mobile development tasks. When I reference an agent file,
adopt that agent's persona completely.

Mobile Context:
- Platform: iOS 14+ and Android SDK 23+
- Framework: Expo SDK 52+, React Native
- Navigation: Expo Router (file-based)
- State Management: TanStack Query, React hooks
- Testing: Jest, React Native Testing Library
- Build: EAS Build

Key Documents:
- ../../AGENTS.md - Repository patterns
- ./README.md - Expo template specifics
- /agents/*.agent.md - Agent definitions

When acting as an agent:
1. Consider mobile-first constraints (touch, gestures, performance)
2. Address platform differences (iOS vs Android)
3. Follow Expo and React Native best practices
4. Optimize for mobile performance (60fps, low memory)
5. Handle offline scenarios and app backgrounding
```

**Project Knowledge (Add these files):**

**Always Include:**
- `../../AGENTS.md` - Repository patterns
- `./README.md` - Expo template overview
- `./agents/expo-react-native-specialist.agent.md`

**SDLC Agents (add based on need):**
- `./agents/requirements-analyst.agent.md`
- `./agents/software-architect.agent.md`
- `./agents/implementation-engineer.agent.md`
- `./agents/quality-analyst.agent.md`
- `./agents/deployment-engineer.agent.md`

**Mobile-Specific Docs:**
- `./app.json` - Expo configuration
- `./eas.json` - Build configuration
- `./docs/**/*.md` - Mobile-specific documentation

## Best Practices

### 1. Mobile-First Context

✅ **Good - Mobile-specific context:**
```
Act as the Expo React Native Specialist (agents/expo-react-native-specialist.agent.md).

Context:
- Feature: Product list with infinite scroll
- Platforms: iOS and Android
- Data: 10,000+ products from REST API
- Performance Target: 60fps scrolling, < 2s initial load
- Offline: Cache last 50 products
- Devices: Support mid-range Android (2GB RAM)

How should I implement this optimally?
```

❌ **Bad - Vague request:**
```
How do I make a list?
```

### 2. Platform Considerations

✅ **Good - Platform-aware:**
```
As the Expo React Native Specialist, implement push notifications:

iOS Specific:
- APNs integration
- Notification categories and actions
- Badge count management
- Silent notifications

Android Specific:
- FCM integration
- Notification channels
- Background restrictions
- Foreground service for persistent notifications

Cross-Platform:
- Expo push notification service
- Deep linking from notifications
- Permission handling
```

### 3. Performance Context

✅ **Good - Performance-focused:**
```
Act as the Expo React Native Specialist.

Current Performance Issue:
- List scroll drops to 30fps
- 200+ items with images
- Using standard FlatList
- High memory usage on Android

Profile Data:
- JS thread: 90% utilization
- Image decoding: Main bottleneck
- Re-renders: High frequency

Optimize for 60fps on mid-range devices.
```

## Mobile-Specific Workflows

### Workflow 1: New Mobile Screen

```markdown
# Stage 1: Mobile UI Design
Act as UI/UX Designer (agents/ui-ux-designer.agent.md).
Design a mobile product details screen:
- Touch-optimized button sizes (44pt minimum)
- Native-feeling animations
- Bottom sheet for actions
- Optimized for one-handed use
- Accessibility (screen reader, dynamic type)

[Wait, review design]

# Stage 2: Implementation
Act as Expo React Native Specialist (agents/expo-react-native-specialist.agent.md).
Implement the product details screen:
- Expo Router file: app/products/[id].tsx
- Animated header on scroll
- Bottom sheet with react-native-bottom-sheet
- Image gallery with pinch-to-zoom
- Share functionality (native share sheet)
- Deep link support

[Wait, review implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Create mobile test suite:
- Unit tests for data fetching
- Component tests with mocks
- Accessibility tests (a11y rules)
- Manual test cases for gestures
- Platform-specific scenarios
```

### Workflow 2: App Store Deployment

```markdown
# Context
Preparing Expo app for App Store and Play Store submission

# Stage 1: Build Configuration
Act as Deployment Engineer (agents/deployment-engineer.agent.md).
Set up production build configuration:

EAS Build:
- Configure eas.json for production
- Set up iOS certificates and provisioning
- Configure Android keystore
- Environment variables and secrets
- Build versioning strategy

[Wait for build config]

# Stage 2: Store Preparation
Continue as Deployment Engineer.
Prepare for store submission:

iOS App Store:
- App Store Connect setup
- Screenshots (all required sizes)
- Privacy policy and data usage
- TestFlight distribution

Google Play:
- Play Console setup
- Feature graphic and screenshots
- Content rating
- Internal testing track

[Wait for store prep]

# Stage 3: CI/CD
Set up GitHub Actions workflow:
- Automated EAS builds on release tags
- TestFlight/Play Store beta deployment
- Notification on build completion
```

### Workflow 3: Offline-First Feature

```markdown
# Feature
Implement offline-first product catalog

# Stage 1: Architecture
Act as Software Architect (agents/software-architect.agent.md).
Design offline-first architecture:
- Data sync strategy (immediate/periodic/on-demand)
- Local storage (AsyncStorage, SQLite, or Realm)
- Conflict resolution
- Background sync with BackgroundFetch
- Optimistic updates with rollback

[Wait for architecture]

# Stage 2: Implementation
Act as Expo React Native Specialist (agents/expo-react-native-specialist.agent.md).
Implement offline functionality:
- Persist data with appropriate storage
- Network status detection
- Background sync implementation
- UI feedback for sync status
- Handle edge cases (app kill during sync)

[Wait for implementation]

# Stage 3: Testing
Act as Quality Analyst (agents/quality-analyst.agent.md).
Test offline scenarios:
- Airplane mode functionality
- Poor connection (simulate 2G)
- Conflict scenarios
- App backgrounding during sync
- Storage full scenarios
```

## Troubleshooting

### Issue: Agent Gives Web Solutions

**Symptoms:** Agent suggests web patterns instead of mobile-specific solutions

**Solutions:**
1. Always specify "mobile" or "React Native" in context
2. Reference platform constraints (iOS/Android)
3. Explicitly state it's an Expo React Native project
4. Provide device/platform specifications
5. Mention mobile-specific requirements (gestures, permissions)

**Example Fix:**
```
I need you to act as the Expo React Native Specialist. This is a 
mobile app for iOS and Android, NOT a web app. 

[Paste relevant expo-react-native-specialist.agent.md sections]

Now implement this mobile feature with React Native patterns...
```

### Issue: Missing Platform-Specific Considerations

**Symptoms:** Solution works on one platform but not the other

**Solutions:**
1. Always ask for both iOS and Android implementations
2. Specify minimum OS versions (iOS 14+, Android SDK 23+)
3. Request platform-specific testing instructions
4. Mention known platform differences
5. Ask about permission handling for both platforms

**Example Fix:**
```
As the Expo React Native Specialist, implement this feature
for BOTH iOS and Android. Explicitly address:

iOS-specific:
- [List iOS considerations]

Android-specific:
- [List Android considerations]

Test on both platforms before considering complete.
```

### Issue: Performance Not Mobile-Optimized

**Symptoms:** Solution works but performs poorly on mobile

**Solutions:**
1. Provide performance constraints (60fps, memory limits)
2. Specify target devices (include mid-range Android)
3. Request performance optimization techniques
4. Ask about profiling and measurement
5. Reference React Native Performance best practices

**Example Fix:**
```
Review this implementation for mobile performance:

[Paste code]

Performance Requirements:
- 60fps sustained scrolling
- < 300ms interaction response
- Work on devices with 2GB RAM
- Low battery impact

As the Expo React Native Specialist, identify performance
issues and provide optimized implementation.
```

## Resources

- **Template README:** `./README.md` - Expo template setup
- **Repository Patterns:** `../../AGENTS.md` - Cross-template guidelines
- **Agent Definitions:** `./agents/*.agent.md` - Agent capabilities
- **Example Config:** `.claude/project.example.json` - Project configuration
- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev

---

**Happy mobile development with Claude agents! 📱**

For more information, see the [root custom agents guide](../../docs/custom-agents-guide.md).
