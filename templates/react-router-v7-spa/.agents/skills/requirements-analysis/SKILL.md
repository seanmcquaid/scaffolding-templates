---
name: requirements-analysis
description: Analyzes user requirements and creates technical specifications. Translates user needs into actionable development tasks aligned with repository patterns and best practices.
---

# Requirements Analysis

Transform user requirements into clear, actionable technical specifications that align with scaffolding template patterns.

## When to Use

Use this skill when you need to:
- Analyze feature requests or user stories
- Break down complex requirements into specific tasks
- Create technical specifications for new features
- Define acceptance criteria and test scenarios
- Identify dependencies, risks, and technical constraints

## Process

### 1. Understand Context
- Read `/AGENTS.md` for repository-wide patterns
- Review `/templates/[template-name]/AGENTS.md` for template-specific conventions
- Study existing code patterns and architectural decisions

### 2. Analyze Requirements
Extract and clarify:
- Core functionality needed
- User personas and use cases
- Performance and scalability needs
- Security and accessibility requirements
- Cross-template consistency needs

### 3. Create Specification

Document the following:

#### Overview
- Brief summary of the requirement
- Business/technical value proposition
- Affected templates

#### Functional Requirements
- What the system must do
- User interactions and workflows
- Data inputs and outputs

#### Non-Functional Requirements
- Performance criteria (bundle size, load times)
- Security requirements (authentication, data protection)
- Accessibility standards (WCAG 2.1 AA)
- Browser/platform compatibility
- Internationalization needs

#### Technical Specifications
- Required code changes
- Files to be created/modified
- API endpoints or data schemas needed
- State management approach

#### Acceptance Criteria
- Clear, testable completion criteria
- Unit test requirements
- Integration test scenarios
- E2E test cases

#### Dependencies & Risks
- External dependencies
- Breaking change potential
- Technical challenges
- Migration requirements

## Template Considerations

### Common Patterns
- **File Organization**: Follow `/src` or `/app` structure
- **Component Patterns**: Separate UI (presentational) from app (business logic) components
- **State Management**: URL state → Local state → Lifted state → Context → Global state
- **API Clients**: Use `ky` with Zod validation
- **Testing**: Three-tier approach (unit → integration → e2e)
- **i18n**: ALL user-facing text must use translation keys

### Framework-Specific
- **Next.js**: Server Components, Server Actions, metadata API
- **React Router**: Loaders, actions, form submissions
- **TanStack Router**: Type-safe routing, search params validation

## Example Output

```markdown
## Feature: Add User Profile Management

### Overview
Enable users to view and edit their profile information with proper validation and error handling.

### Functional Requirements
1. Display user profile with name, email, avatar
2. Edit mode with form validation
3. Save changes with API integration
4. Success/error feedback

### Non-Functional Requirements
- Form submission < 500ms
- WCAG 2.1 AA compliant
- Works on mobile and desktop
- All text uses i18n keys

### Acceptance Criteria
- [ ] User can view current profile data
- [ ] Edit button toggles edit mode
- [ ] Form validates email format
- [ ] API errors are handled gracefully
- [ ] Success message shown after save
- [ ] All UI text is translated

### Technical Approach
- Create `/components/app/UserProfile.tsx`
- Use React Hook Form + Zod validation
- Integrate with `/services/userApi.ts`
- Add translations to `en-US.json`
- Write unit tests with Vitest
```

## Key Principles

1. **Clarity**: Specifications should be unambiguous and actionable
2. **Consistency**: Maintain patterns across all templates
3. **Testability**: All requirements must be testable
4. **Completeness**: Cover functional, non-functional, and edge cases
5. **Alignment**: Follow AGENTS.md guidelines and best practices

## Next Steps

After creating requirements:
1. Review with Software Architect for technical design
2. Hand off to Implementation Engineer or template specialist
3. Coordinate with Quality Analyst for test planning
