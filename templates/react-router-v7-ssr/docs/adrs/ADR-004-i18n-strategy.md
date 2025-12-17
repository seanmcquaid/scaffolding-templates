# ADR-004: Type-Safe Internationalization with i18next

**Status**: Accepted

**Date**: 2024-12-11

**Decision Makers**: Template Author

**Tags**: #i18n #internationalization #typescript #localization

---

## Context

Modern web applications often need to support multiple languages and locales. We need an internationalization (i18n) solution that:

- Supports multiple languages with easy translation management
- Provides type safety for translation keys
- Works seamlessly with React and Next.js
- Supports SSR and client-side rendering
- Has good developer experience
- Can detect and persist user language preferences

Additionally, we want to enforce that ALL user-facing strings are translated, preventing hardcoded strings in components.

## Decision

We will use **i18next** with **react-i18next** for internationalization, with:
- Type-safe translation keys via TypeScript
- Custom `useAppTranslation` hook for consistent usage
- ESLint rule to enforce translation usage (`i18next/no-literal-string`)
- Domain-based locale detection for regional variants
- Multiple fallback strategies for language detection

## Rationale

i18next provides:

1. **Industry Standard**: Most popular i18n library for JavaScript
2. **Type Safety**: Can generate TypeScript types from translation files
3. **React Integration**: react-i18next provides excellent hooks and components
4. **SSR Support**: Works seamlessly with server-side rendering
5. **Feature Rich**: Pluralization, interpolation, formatting, namespacing
6. **Flexible**: Multiple language detection strategies
7. **Ecosystem**: Large ecosystem with plugins for various needs

The enforced translation pattern ensures consistency and prevents accidental hardcoded strings.

## Consequences

### Positive Consequences
- Type-safe translation keys prevent typos and missing translations
- Consistent translation usage across the application
- Easy to add new languages
- Good developer experience with auto-complete for translation keys
- Prevents hardcoded strings through linting
- Supports complex translation needs (pluralization, interpolation)
- Language preferences persist across sessions

### Negative Consequences / Trade-offs
- Initial setup complexity with TypeScript types
- All user-facing text must go through translation system (even for single-language apps)
- Small bundle size increase for i18n library
- Developers must remember to use `useAppTranslation` hook
- Translation files need to be maintained alongside code

### Risks and Mitigations
- **Risk**: Developers may find mandatory translations cumbersome for single-language apps
  - **Mitigation**: Provide clear documentation and examples, explain benefits of consistency
- **Risk**: Type generation may break if translation files have syntax errors
  - **Mitigation**: Validate JSON structure in CI/CD pipeline
- **Risk**: Missing translations may not be caught until runtime
  - **Mitigation**: Use type checking to catch missing keys at build time

## Alternatives Considered

### Alternative 1: next-intl
- **Description**: Next.js-specific i18n library
- **Pros**: 
  - Built specifically for Next.js
  - Good TypeScript support
  - App Router support
- **Cons**: 
  - Framework lock-in (Next.js only)
  - Smaller community than i18next
  - Less mature ecosystem
- **Reason for rejection**: i18next is more flexible and portable across frameworks

### Alternative 2: FormatJS (react-intl)
- **Description**: Industry standard i18n library from Yahoo
- **Pros**: 
  - Standards-based (ECMA-402, ICU MessageFormat)
  - Strong formatting capabilities
  - Large community
- **Cons**: 
  - More complex API
  - Less flexible than i18next
  - Harder to set up type safety
- **Reason for rejection**: i18next provides better DX and easier type safety

### Alternative 3: No i18n Library (DIY)
- **Description**: Build custom translation system
- **Pros**: 
  - Full control
  - Minimal bundle size
- **Cons**: 
  - Significant development effort
  - Missing advanced features (pluralization, etc.)
  - Maintenance burden
  - Reinventing the wheel
- **Reason for rejection**: i18next is battle-tested and feature-complete

## Implementation Notes

### Setup
1. Create translation files in `src/i18n/locales/`
2. Configure i18next with custom language detector
3. Create `useAppTranslation` hook for consistent usage
4. Enable ESLint rule `i18next/no-literal-string`

### Language Detection Order
1. Query string (`?lng=en-US`)
2. Domain-based detection (`.ca` → `en-CA`)
3. Cookie storage
4. localStorage (`i18nextLng`)
5. Browser navigator language
6. HTML tag language attribute

### Usage Pattern
```tsx
import useAppTranslation from '@/hooks/useAppTranslation';

const Component = () => {
  const { t } = useAppTranslation();
  return <h1>{t('HomePage.title')}</h1>;
};
```

## Related Decisions

- [ADR-001: Use Next.js 15 with App Router](./ADR-001-nextjs-15-app-router.md)
- [ADR-010: Code Quality Tooling](./ADR-010-code-quality.md)

## References

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [TypeScript Support](https://www.i18next.com/overview/typescript)

## Review and Update History

- 2024-12-11: Initial decision (Status: Accepted)
