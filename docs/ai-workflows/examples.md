# AI Workflow Usage Examples

This document provides practical examples of how to use the AI workflow automation in the Scaffolding Templates repository.

## Table of Contents

- [Example 1: Responding to AI Code Review](#example-1-responding-to-ai-code-review)
- [Example 2: Working with AI-Generated Concept Issues](#example-2-working-with-ai-generated-concept-issues)
- [Example 3: Addressing Test Coverage Gaps](#example-3-addressing-test-coverage-gaps)
- [Example 4: Using Plan Mode for Feature Development](#example-4-using-plan-mode-for-feature-development)
- [Example 5: Agent Orchestration for Complex Changes](#example-5-agent-orchestration-for-complex-changes)

---

## Example 1: Responding to AI Code Review

### Scenario
You've opened a PR that adds a new component to the `react-router-v7-spa` template. The AI code review workflow has posted a comment with feedback.

### AI Review Comment
```
🤖 AI Code Review & Agent Tagging

PR Title: Add UserProfile component
Branch: feature/user-profile
Author: contributor

Affected Templates: react-router-v7-spa

Relevant Agents:
@implementation-engineer @react-router-spa-specialist @quality-analyst

Changed Files:
- templates/react-router-v7-spa/src/components/app/UserProfile.tsx
- templates/react-router-v7-spa/src/components/app/UserProfile.test.tsx

Review Guidelines:
- Verify i18n requirements are met
- Check TypeScript type safety
- Validate test coverage
```

### Your Response

1. **Address i18n requirement** (noticed no translations):
   ```tsx
   // Before (missing i18n)
   <h1>User Profile</h1>
   
   // After (with i18n)
   import useAppTranslation from '@/hooks/useAppTranslation';
   
   const UserProfile = () => {
     const { t } = useAppTranslation();
     return <h1>{t('UserProfile.title')}</h1>;
   };
   ```

2. **Tag the quality analyst for test review**:
   ```
   @quality-analyst Can you review the test coverage for this component?
   I've added unit tests but would like feedback on edge cases.
   ```

3. **Ask template specialist for pattern validation**:
   ```
   @react-router-spa-specialist Does this component follow the established
   patterns for the template? Should I be using any specific hooks or patterns?
   ```

---

## Example 2: Working with AI-Generated Concept Issues

### Scenario
The weekly concept discovery workflow has created an issue about React Compiler integration.

### AI-Generated Issue
```
[Concept Discovery] React Compiler integration

This concept was identified during automated ecosystem scanning as a potential
improvement opportunity for one or more templates.

Next Steps:
1. Validation Phase (Use @requirements-analyst agent)
2. Design Phase (Use @software-architect agent)
3. Implementation Phase (Use template specialist agents)
```

### Your Workflow

#### Step 1: Validation with Requirements Analyst

Open GitHub Copilot and tag the requirements analyst:

```
@requirements-analyst Please analyze the React Compiler concept for our templates.

Context:
- We have 6 templates: TypeScript library, Next.js SSR, React Router SPA/SSR,
  TanStack Router SPA, Expo React Native
- All use TypeScript and modern React patterns
- Focus on developer experience and best practices

Questions:
1. What is React Compiler and what problems does it solve?
2. Which templates would benefit most?
3. What are the adoption requirements and compatibility concerns?
4. What's the implementation complexity?
5. Are there any risks or downsides?
```

**Expected Response**: Detailed analysis with recommendations

#### Step 2: Design with Software Architect

After validation, consult the architect:

```
@software-architect Based on the requirements analysis, please design how we
should integrate React Compiler into our templates.

Context:
- React Compiler provides automatic memoization
- Most beneficial for React Router SSR and Next.js SSR templates
- Need to maintain backward compatibility

Design needs:
1. Integration approach for each template
2. Build configuration changes
3. Developer experience considerations
4. Migration guide for existing users
5. Testing strategy
```

**Expected Response**: Architectural design with ADR

#### Step 3: Implementation with Template Specialists

For React Router SSR template:

```
@react-router-ssr-specialist Please help implement React Compiler in the
react-router-v7-ssr template following the architectural design.

Requirements:
- Enable React Compiler in Vite config
- Update package dependencies
- Add necessary babel/swc plugins
- Update documentation
- Add tests to verify compilation

Please use plan mode: create implementation plan first, then execute.
```

---

## Example 3: Addressing Test Coverage Gaps

### Scenario
The weekly test coverage analysis has identified gaps in the `tanstack-router-spa` template.

### AI-Generated Issue
```
[Test Coverage] Improve tanstack-router-spa test coverage

Template: tanstack-router-spa
Coverage Threshold: 80%

Identified Gaps:
- Line coverage 72% (target: 80%)
- Missing integration tests
- Untested error boundary paths
```

### Your Workflow

#### Step 1: Analyze with Quality Analyst

```
@quality-analyst Please analyze the test coverage gaps in tanstack-router-spa
and create a comprehensive test improvement plan.

Current coverage:
- Line coverage: 72%
- Missing integration tests
- Untested error boundaries

Please identify:
1. Specific files with low coverage
2. Untested code paths and edge cases
3. Missing integration test scenarios
4. Test implementation priorities
```

#### Step 2: Get Framework-Specific Guidance

```
@tanstack-router-spa-specialist What are the best practices for testing
TanStack Router specific features?

Areas to test:
1. Route navigation and parameters
2. Search parameter validation
3. Route loaders and error handling
4. File-based routing structure

Please provide example test patterns specific to TanStack Router.
```

#### Step 3: Implement Tests

Create test files based on agent recommendations:

```typescript
// src/routes/__root.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

describe('Root Route', () => {
  it('renders error boundary on route error', async () => {
    const router = createRouter({
      routeTree,
      defaultErrorComponent: () => <div>Error occurred</div>,
    });
    
    // Simulate route error
    router.navigate({ to: '/invalid-route' });
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
```

#### Step 4: Validate Coverage

```bash
cd templates/tanstack-router-spa
pnpm test:coverage
```

Check that coverage now exceeds 80%.

---

## Example 4: Using Plan Mode for Feature Development

### Scenario
You want to add authentication to the Next.js SSR template.

### Plan Mode Workflow

#### Phase 1: Requirements Analysis

```
@requirements-analyst I need to add authentication to the next-ssr template.

Current state:
- Next.js App Router template
- No authentication currently
- Uses server components and server actions

Requirements:
1. Support email/password authentication
2. Session management
3. Protected routes
4. User profile data
5. Server-side auth checks

Please analyze and provide:
1. Detailed requirements breakdown
2. User stories
3. Technical requirements
4. Dependencies and libraries needed
5. Acceptance criteria
```

#### Phase 2: Architectural Design

```
@software-architect Based on the requirements analysis, design the
authentication system for the next-ssr template.

Requirements:
- Email/password authentication
- Session management with cookies
- Protected routes and middleware
- Server-side auth checks

Please provide:
1. Architecture diagram
2. Component structure
3. API routes design
4. Database schema (if needed)
5. Security considerations
6. ADR document
```

#### Phase 3: UI/UX Design

```
@ui-ux-designer Design the authentication user interfaces.

Screens needed:
1. Login page
2. Sign-up page
3. Profile page
4. Password reset flow

Requirements:
- Accessible (WCAG 2.1 AA)
- Responsive design
- Consistent with template style
- Internationalized (i18n)

Please provide:
- Component specifications
- Wireframes (text descriptions)
- Accessibility considerations
```

#### Phase 4: Implementation

```
@nextjs-ssr-specialist Implement the authentication system following the
architectural design and UI specifications.

Implementation plan:
1. Set up auth library (next-auth or similar)
2. Create auth API routes
3. Implement middleware for protected routes
4. Create UI components
5. Add server actions for auth operations
6. Set up session management

Please create step-by-step implementation plan first, then execute each step.
```

#### Phase 5: Testing

```
@quality-analyst Create comprehensive tests for the authentication system.

Test coverage needed:
1. Unit tests for auth utilities
2. Integration tests for auth flows
3. E2E tests for critical paths

Test scenarios:
- Successful login/logout
- Failed login attempts
- Session persistence
- Protected route access
- Token refresh
- Error handling
```

#### Phase 6: Deployment

```
@deployment-engineer Prepare the authentication system for deployment.

Tasks:
1. Environment variable setup
2. Database migration (if needed)
3. Security configuration
4. Monitoring setup
5. Deployment documentation

Please provide deployment checklist and configuration guide.
```

---

## Example 5: Agent Orchestration for Complex Changes

### Scenario
You need to migrate all templates from Vitest v1 to Vitest v2.

### Orchestration Strategy

#### Step 1: Initial Analysis

```
@maintenance-engineer Analyze the effort required to migrate all templates
from Vitest v1 to Vitest v2.

Templates affected:
- typescript-library
- next-ssr
- react-router-v7-spa
- react-router-v7-ssr
- tanstack-router-spa
- expo-react-native

Please identify:
1. Breaking changes in Vitest v2
2. Affected test files per template
3. Required code changes
4. Risks and challenges
5. Migration strategy
```

#### Step 2: Create Migration Plan

```
@software-architect Create a migration plan for Vitest v2 upgrade across
all templates.

Context: 6 templates need migration
Goal: Maintain test compatibility while upgrading

Plan should include:
1. Migration order (dependencies first)
2. Step-by-step approach
3. Testing strategy during migration
4. Rollback plan
5. Timeline estimate
```

#### Step 3: Template-Specific Migration

For each template, use the appropriate specialist:

```
@typescript-library-specialist Migrate typescript-library to Vitest v2
following the migration plan.

Changes needed:
- Update package.json dependencies
- Update vitest.config.ts
- Fix breaking changes in tests
- Verify all tests pass

Please execute migration in small commits with validation at each step.
```

```
@nextjs-ssr-specialist Migrate next-ssr to Vitest v2 following the plan.
```

```
@react-router-spa-specialist Migrate react-router-v7-spa to Vitest v2.
```

(Continue for other templates)

#### Step 4: Cross-Template Validation

```
@quality-analyst Validate that all templates have successfully migrated
to Vitest v2.

Validation checklist:
1. All tests pass in each template
2. Coverage reporting works correctly
3. Test performance is acceptable
4. No regression in test functionality
5. Documentation is updated

Please create validation report.
```

#### Step 5: Documentation Update

```
@ui-ux-designer Update template documentation to reflect Vitest v2 changes.

Documentation updates needed:
1. Update testing sections in README files
2. Update testing best practices
3. Add migration guide for users
4. Update troubleshooting guides

Ensure documentation is clear and helpful for template users.
```

---

## Tips for Effective Agent Usage

### Do's

✅ **Provide context**: Always give agents sufficient context about what you're working on

✅ **Use plan mode**: Ask for a plan before implementation

✅ **Iterate**: Review agent responses and refine your requests

✅ **Combine agents**: Use multiple agents in sequence for complex tasks

✅ **Validate output**: Review and test agent-generated code

✅ **Reference docs**: Point agents to relevant documentation

### Don'ts

❌ **Skip planning**: Don't jump straight to implementation

❌ **Ignore agent advice**: Consider agent recommendations carefully

❌ **Use wrong agent**: Use specialists for their specific domains

❌ **Accept blindly**: Always review and validate agent output

❌ **Overcomplicate**: Break complex tasks into smaller, manageable pieces

---

## Troubleshooting Agent Interactions

### Agent doesn't understand context

**Solution**: Provide more specific information
```
# Instead of:
"Help me with the tests"

# Write:
"@quality-analyst Help me add unit tests for the UserProfile component
in templates/react-router-v7-spa/src/components/app/UserProfile.tsx.
The component displays user data and handles form submission."
```

### Agent suggests incorrect patterns

**Solution**: Reference specific documentation
```
"@react-router-spa-specialist Your suggestion doesn't match our template
patterns. Please review /templates/react-router-v7-spa/AGENTS.md for
established patterns and revise your recommendation."
```

### Need more detailed guidance

**Solution**: Ask for step-by-step breakdown
```
"@implementation-engineer Please break this down into smaller steps with
code examples for each step. I need detailed guidance for implementing
each piece."
```

---

## Additional Resources

- [Main AI Workflows Documentation](/docs/ai-workflows/README.md)
- [Custom Agents Documentation](/agents/README.md)
- [Repository Guidelines](/AGENTS.md)
- [GitHub Copilot Agents Guide](https://docs.github.com/en/copilot/using-github-copilot/using-agents)
