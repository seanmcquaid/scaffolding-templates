# Template Consistency Analysis

**Date:** December 5, 2025  
**Repository:** seanmcquaid/scaffolding-templates  
**Analyzed Templates:** 6 templates across web and mobile platforms

## Executive Summary

This document provides a comprehensive analysis of all scaffolding templates in the repository, examining consistency of approach, test coverage, and overall patterns. The analysis aims to identify gaps, inconsistencies, and opportunities for improvement across the template collection.

### Templates Analyzed

1. **next-ssr** - Next.js Server-Side Rendered Application
2. **react-router-v7-spa** - React Router v7 Single-Page Application
3. **react-router-v7-ssr** - React Router v7 Server-Side Rendered Application
4. **tanstack-router-spa** - TanStack Router Single-Page Application
5. **typescript-library** - TypeScript Library Template
6. **expo-react-native** - Expo React Native Mobile Application

---

## 1. Overall Consistency Assessment

### 1.1 Strengths

✅ **Excellent consistency across templates:**
- All templates use pnpm as package manager (v10.12.4)
- Consistent Node.js version requirement (>=22.12.0)
- Standardized tooling: ESLint, Prettier, Husky, lint-staged
- Unified testing approach with appropriate frameworks
- Consistent i18n setup across web templates
- All templates include comprehensive documentation
- Setup scripts provided for all templates

### 1.2 Key Patterns Identified

#### Directory Structure Consistency
**Web Templates (Next.js, React Router, TanStack Router):**
```
src/ or app/
├── components/
│   ├── app/          # Feature-specific components
│   └── ui/           # Reusable UI components
├── hooks/
├── services/
├── utils/
├── types/
├── constants/
├── i18n/
│   └── locales/
└── styles/
```

**TypeScript Library:**
```
src/
├── [feature]/
│   └── [feature].test.ts
└── __tests__/
```

**Expo React Native:**
```
src/
├── app/              # Expo Router structure
├── components/
├── hooks/
├── services/
├── types/
└── i18n/
```

#### Testing Framework Consistency

| Template | Unit Tests | E2E Tests | Coverage Tool | Test Count |
|----------|-----------|-----------|---------------|------------|
| next-ssr | Vitest | Playwright | Istanbul | 15 files (23 tests) |
| react-router-v7-spa | Vitest | Playwright | Istanbul | 16 files (27 tests) |
| react-router-v7-ssr | Vitest | Playwright | Istanbul | 16 files |
| tanstack-router-spa | Vitest | Playwright | Istanbul | 16 files |
| typescript-library | Vitest | N/A | v8 | 2 files (2 tests) |
| expo-react-native | Jest | N/A | Jest | 4 files (15 tests) |

---

## 2. Test Coverage Analysis

### 2.1 Web Templates (Next.js, React Router, TanStack Router)

**Test Categories:**
1. **Unit Tests** (Vitest)
   - Component tests (`__tests__/` directories)
   - Utility function tests
   - Service/API client tests
   - Hook tests
   
2. **Integration Tests** (Playwright)
   - Accessibility tests (a11y.spec.ts)
   - Performance tests (lighthouse.spec.ts)
   - Mock API integration (mock-api.spec.ts)
   
3. **E2E Tests** (Playwright)
   - Real API tests (real-api.spec.ts)

**Coverage Configuration:**
All web templates exclude the following from coverage:
- Setup/configuration files
- i18n files
- Type definitions
- Entry points
- Asset/style files
- Constants

**Test Coverage Patterns:**
- ✅ Components have co-located tests (`__tests__` directories)
- ✅ Services have dedicated test files
- ✅ Utilities have dedicated test files
- ✅ All tests use proper mocking (MSW for API, i18n mocks)
- ✅ Consistent test setup files (`setupTests.ts`)

### 2.2 TypeScript Library Template

**Test Approach:**
- Minimal but focused test coverage
- Tests for circular dependencies
- Example hook test (useFunPackage)
- Uses Vitest with v8 coverage provider
- No integration/E2E tests (appropriate for library)

**Gap:** Only 2 test files - this is appropriate for a scaffolding template as the actual library code is minimal.

### 2.3 Expo React Native Template

**Test Approach:**
- Uses Jest (React Native standard)
- Component tests with @testing-library/react-native
- Hook tests
- Service tests
- 4 test files with 15 tests

**Gap:** Missing E2E tests - no Detox or Maestro setup. This is a significant gap for a mobile template.

### 2.4 Test Coverage Gaps Summary

| Template | Unit Tests | Integration | E2E | Accessibility | Performance |
|----------|-----------|-------------|-----|--------------|-------------|
| next-ssr | ✅ | ✅ | ✅ | ✅ | ✅ |
| react-router-v7-spa | ✅ | ✅ | ✅ | ✅ | ✅ |
| react-router-v7-ssr | ✅ | ✅ | ✅ | ✅ | ✅ |
| tanstack-router-spa | ✅ | ✅ | ✅ | ✅ | ✅ |
| typescript-library | ✅ | N/A | N/A | N/A | N/A |
| expo-react-native | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 3. Configuration Consistency

### 3.1 ESLint Configuration

**All templates use:**
- ESLint v9.39.1
- typescript-eslint v8.48.1
- eslint-config-prettier v10.1.8
- eslint-plugin-prettier v5.5.4

**Web templates additionally include:**
- eslint-plugin-react v7.37.2
- eslint-plugin-react-hooks v7.0.1
- eslint-plugin-jsx-a11y v6.10.2
- eslint-plugin-i18next v6.1.3
- eslint-plugin-import v2.31.0
- eslint-plugin-no-relative-import-paths v1.6.1
- @tanstack/eslint-plugin-query v5.91.2
- eslint-plugin-playwright v2.4.0

**Consistency:** ✅ Excellent - all templates have matching ESLint versions and configs

**Note:** next-ssr includes react-compiler plugins (babel-plugin-react-compiler and eslint-plugin-react-compiler)

### 3.2 Prettier Configuration

**All templates use:**
- prettier v3.7.4
- prettier-plugin-tailwindcss v0.7.2 (web templates only)

**Consistency:** ✅ Excellent

### 3.3 Husky & lint-staged

**Husky hooks:**
- ✅ All templates have pre-commit hooks
- ✅ Most templates have pre-push hooks
- ⚠️ expo-react-native has executable pre-commit (chmod +x) while others don't

**lint-staged configuration:**
- ✅ All templates have .lintstagedrc.json
- ⚠️ Minor inconsistency:
  - Most: `"*.{js,ts,jsx,tsx}": ["eslint --fix --max-warnings=0", "prettier --write"]`
  - expo: `"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]` (missing max-warnings)

**Recommendations:**
1. Standardize lint-staged config to include `--max-warnings=0` in all templates
2. Standardize file permissions for husky hooks

### 3.4 TypeScript Configuration

**All templates have:**
- typescript v5.9.3 (typescript-library uses ~5.9.2)
- tsconfig.json files
- Strict mode enabled

**Variations:**
- Library has different export configuration (ESM/CJS)
- Web templates have framework-specific configs
- expo uses Expo-specific tsconfig

**Consistency:** ✅ Good - variations are appropriate for template type

### 3.5 Bundle Size Monitoring

**All templates include:**
- bundlesize2 v0.0.35
- bundlesize.config.json

**Consistency:** ✅ Excellent - all templates monitor bundle size

---

## 4. Dependency Analysis

### 4.1 Core Dependencies Alignment

**React & React DOM:**
- All React templates: v19.2.1 ✅

**TanStack Query:**
- All web templates: @tanstack/react-query v5.90.11 ✅
- All web templates: @tanstack/react-query-devtools v5.91.1 ✅

**Form Handling:**
- All web templates: react-hook-form v7.67.0 ✅
- All web templates: @hookform/resolvers v5.2.2 ✅

**Internationalization:**
- All templates with i18n: i18next v25.7.1 ✅
- All templates with i18n: react-i18next v16.3.5 ✅

**Styling:**
- All web templates: tailwindcss v4.1.17 ✅
- All web templates: clsx v2.1.1 ✅
- All web templates: class-variance-authority v0.7.1 ✅

**API Client:**
- All templates: ky v1.14.0 ✅

**Validation:**
- All templates: zod v4.1.13 ✅

**Hooks:**
- All templates: usehooks-ts v3.1.1 ✅

**UI Components:**
- Web templates: @radix-ui/react-slot v1.2.4 ✅
- Web templates: @radix-ui/react-toast v1.2.15 ✅
- Web templates: lucide-react v0.555.0 ✅

### 4.2 Testing Dependencies Alignment

**Vitest (Web templates):**
- vitest v4.0.15 ✅
- @vitest/coverage-istanbul v4.0.15 ✅
- @vitest/eslint-plugin v1.5.1 ✅
- happy-dom v20.0.11 ✅

**Testing Library:**
- @testing-library/react v16.3.0 ✅
- @testing-library/jest-dom v6.9.1 ✅
- @testing-library/user-event v14.6.1 ✅

**Playwright (Web templates):**
- @playwright/test v1.57.0 ✅
- playwright-lighthouse v4.0.0 ✅
- @axe-core/playwright v4.11.0 ✅
- @msw/playwright v0.4.2 ✅

**MSW:**
- msw v2.12.3 ✅

### 4.3 Build Tools Alignment

**Vite:**
- Web templates: vite v7.2.6 ✅
- vite-tsconfig-paths v5.1.4 ✅
- @vitejs/plugin-react v5.1.1 ✅

**React Compiler (Beta):**
- Web templates with React Router/TanStack Router:
  - babel-plugin-react-compiler 19.0.0-beta-714736e-20250131
  - eslint-plugin-react-compiler 19.0.0-beta-714736e-20250131
- ⚠️ next-ssr also includes these but might not be necessary as Next.js may have its own handling

---

## 5. Architectural Patterns

### 5.1 Component Organization

**All web templates follow:**
```
components/
├── app/          # Feature-specific, business logic components
│   ├── PageWrapper.tsx
│   ├── PageError.tsx
│   └── __tests__/
└── ui/           # Reusable, presentational components
    ├── Button.tsx
    ├── Input.tsx
    ├── LoadingOverlay.tsx
    ├── Toast.tsx
    └── __tests__/
```

**Consistency:** ✅ Excellent separation of concerns

### 5.2 State Management

**All web templates use:**
- TanStack Query for server state
- React Hook Form for form state
- Local state with useState/useReducer
- usehooks-ts for common patterns
- URL state for shareable app state (routing frameworks handle this)

**No global state management libraries** (Redux, Zustand, Jotai) - this is intentional and appropriate for scaffolding templates.

**Consistency:** ✅ Excellent

### 5.3 API Client Pattern

All templates with API calls use a consistent pattern:
1. Create API client with `ky`
2. Validate responses with Zod schemas
3. Handle errors consistently
4. Include proper TypeScript types

**Consistency:** ✅ Excellent

### 5.4 i18n Implementation

**Web templates:**
- i18next client configuration
- Browser language detector
- Locale storage (localStorage + cookies)
- Domain-based locale detection (for SSR templates)
- Type-safe translation hooks
- ESLint enforcement (no hardcoded strings)

**Consistency:** ✅ Excellent

**expo-react-native:**
- Simpler i18n setup (no SSR concerns)
- Missing domain detection (not applicable)

**typescript-library:**
- No i18n (not applicable)

### 5.5 Environment Variable Handling

**All templates with env vars:**
- Zod validation schemas
- Separate client/server env files (where applicable)
- Type-safe environment access

**Patterns observed:**
- next-ssr: `env.client.ts` and `env.server.ts`
- react-router-v7-spa: `env.client.ts` only (SPA)
- react-router-v7-ssr: `env.client.ts` and `env.server.ts`
- tanstack-router-spa: `env.ts` (SPA)
- expo-react-native: `env.client.ts`

**Consistency:** ✅ Excellent - variations appropriate for template type

---

## 6. Documentation Quality

### 6.1 README Files

| Template | Lines | Completeness |
|----------|-------|--------------|
| expo-react-native | 393 | ✅ Excellent |
| next-ssr | 224 | ✅ Good |
| react-router-v7-ssr | 224 | ✅ Good |
| tanstack-router-spa | 246 | ✅ Good |
| react-router-v7-spa | 212 | ✅ Good |
| typescript-library | 141 | ✅ Adequate |

**All READMEs include:**
- Setup instructions
- Available scripts
- Technology stack
- Folder structure
- Development workflow
- Testing instructions

### 6.2 Documentation Folders

**All templates include `docs/` directory** with:
- Architecture decisions
- Best practices
- Framework-specific guides
- Testing strategies

**Consistency:** ✅ Excellent

### 6.3 Setup Scripts

**All templates include `setup.sh`:**
- Automated environment setup
- Dependency installation
- Configuration validation
- Platform detection (macOS, Linux)

**Line counts:**
- expo-react-native: 7,929 lines
- next-ssr: 8,543 lines
- react-router-v7-spa: 8,788 lines
- react-router-v7-ssr: 8,789 lines
- tanstack-router-spa: 8,862 lines
- typescript-library: 5,956 lines

**Consistency:** ✅ Excellent - comprehensive setup automation

---

## 7. Identified Inconsistencies

### 7.1 Critical Issues

None identified. All templates maintain excellent consistency where it matters.

### 7.2 Minor Inconsistencies

1. **lint-staged configuration:**
   - Most templates: `--max-warnings=0` flag
   - expo-react-native: missing `--max-warnings=0`
   - **Impact:** Low
   - **Recommendation:** Add flag to expo template

2. **Husky hook permissions:**
   - Most templates: regular file permissions
   - Some templates: executable permissions
   - **Impact:** Very low
   - **Recommendation:** Standardize (doesn't affect functionality)

3. **Vitest configuration structure:**
   - next-ssr: Separate `vitest.config.ts`
   - Other web templates: Merged with `vite.config.ts`
   - **Impact:** None (both approaches valid)
   - **Recommendation:** Document the reasoning in each template

4. **Test file naming:**
   - typescript-library: `[feature].test.ts` (same directory as source)
   - Other templates: `__tests__/[feature].test.ts` (separate directory)
   - **Impact:** None (both approaches valid)
   - **Recommendation:** Keep as-is (typescript-library is intentionally simpler)

### 7.3 Gaps

1. **expo-react-native missing E2E testing:**
   - No Detox or Maestro setup
   - No integration tests
   - No accessibility tests
   - No performance monitoring
   - **Impact:** Medium-High
   - **Recommendation:** Add Detox or Maestro for E2E testing

2. **React Compiler usage:**
   - Most templates include React Compiler (beta)
   - Not documented in READMEs
   - **Impact:** Low
   - **Recommendation:** Document React Compiler usage and benefits

3. **Missing vitest config in react-router-v7-spa:**
   - No separate vitest.config.ts (merged with vite.config.ts)
   - Inconsistent with next-ssr approach
   - **Impact:** None (functionality identical)
   - **Recommendation:** Document the different approaches

---

## 8. Best Practices Observed

### 8.1 Testing

✅ **Three-tier testing approach:**
1. Unit tests for components, hooks, utils
2. Integration tests with mocked APIs
3. E2E tests with real APIs

✅ **Accessibility testing** with @axe-core/playwright

✅ **Performance testing** with Lighthouse

✅ **Consistent test setup** with proper mocking

✅ **Co-located tests** in `__tests__` directories

### 8.2 Code Quality

✅ **Strict TypeScript** configuration

✅ **Comprehensive linting** with multiple plugins

✅ **Consistent formatting** with Prettier

✅ **Pre-commit hooks** to enforce quality

✅ **Bundle size monitoring** for all templates

✅ **Circular dependency detection** (dpdm in some templates)

### 8.3 Developer Experience

✅ **Automated setup scripts** for quick start

✅ **Comprehensive documentation** in READMEs and docs/

✅ **Type-safe development** throughout

✅ **Hot module replacement** in dev mode

✅ **Environment variable validation** with Zod

✅ **Consistent script naming** across templates

### 8.4 Internationalization

✅ **Type-safe translations** with i18next

✅ **Locale persistence** with localStorage/cookies

✅ **ESLint enforcement** of translation usage

✅ **Consistent translation key structure**

---

## 9. Recommendations

### 9.1 High Priority

1. **Add E2E testing to expo-react-native:**
   - Implement Detox or Maestro
   - Add integration tests
   - Add accessibility testing strategy
   - Add performance monitoring

2. **Standardize lint-staged configuration:**
   - Add `--max-warnings=0` to expo-react-native
   - Ensure consistent across all templates

3. **Document React Compiler usage:**
   - Add section to READMEs about React Compiler
   - Explain benefits and considerations
   - Document any known issues

### 9.2 Medium Priority

4. **Add circular dependency detection to all templates:**
   - Some templates have `dpdm`, others don't
   - Add to all web templates consistently
   - Add npm script for checking

5. **Standardize Husky hook approach:**
   - Document whether hooks should be executable
   - Apply consistently across all templates

6. **Consider adding playwright to expo-react-native:**
   - For web testing support
   - Expo supports web platform

### 9.3 Low Priority

7. **Document vitest configuration approaches:**
   - Explain when to merge vs separate configs
   - Add comments in config files

8. **Add more test examples:**
   - typescript-library could have more example tests
   - Demonstrate advanced testing patterns

9. **Consider adding Storybook:**
   - For component documentation
   - Particularly useful for UI library patterns

---

## 10. Conclusion

### Overall Assessment: ⭐⭐⭐⭐⭐ (5/5)

The scaffolding templates repository demonstrates **excellent consistency** in approach, patterns, and implementation. The templates are:

✅ **Well-architected** with clear separation of concerns  
✅ **Comprehensive** in testing coverage (except expo-react-native)  
✅ **Consistent** in tooling, dependencies, and patterns  
✅ **Well-documented** with READMEs and docs/  
✅ **Developer-friendly** with automated setup scripts  
✅ **Production-ready** with linting, testing, and monitoring  

### Key Strengths

1. **Exceptional dependency alignment** - all templates use matching versions where applicable
2. **Consistent architectural patterns** - component organization, state management, API clients
3. **Comprehensive testing** - unit, integration, E2E, accessibility, performance (web templates)
4. **Strong developer experience** - automation, documentation, type safety
5. **Modern tooling** - latest versions of React, TypeScript, build tools

### Areas for Improvement

1. **expo-react-native E2E testing** - only significant gap identified
2. **Minor configuration inconsistencies** - easily addressed
3. **Documentation of beta features** - React Compiler usage

### Final Verdict

This is a **high-quality, production-ready** collection of scaffolding templates that serves as an excellent starting point for new projects. The consistency across templates makes it easy for developers to switch between different frameworks while maintaining familiar patterns.

The few identified gaps are minor and don't detract from the overall quality. With the recommended improvements, particularly adding E2E testing to expo-react-native, this would be a near-perfect scaffolding templates repository.

---

## Appendix: Template Comparison Matrix

| Feature | next-ssr | react-router-spa | react-router-ssr | tanstack-router | typescript-lib | expo-rn |
|---------|----------|------------------|------------------|-----------------|----------------|---------|
| TypeScript | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ESLint | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Prettier | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Husky | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| lint-staged | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Unit Tests | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Integration Tests | ✅ | ✅ | ✅ | ✅ | N/A | ❌ |
| E2E Tests | ✅ | ✅ | ✅ | ✅ | N/A | ❌ |
| A11y Testing | ✅ | ✅ | ✅ | ✅ | N/A | ❌ |
| Performance | ✅ | ✅ | ✅ | ✅ | N/A | ❌ |
| i18n | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| Bundle Monitoring | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Setup Script | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Documentation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| TanStack Query | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| React Hook Form | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ | ✅ | N/A | N/A |
| Radix UI | ✅ | ✅ | ✅ | ✅ | N/A | N/A |

**Legend:**
- ✅ Fully implemented
- ⚠️ Implemented with minor issue
- ❌ Missing/Not implemented
- N/A Not applicable for this template type
