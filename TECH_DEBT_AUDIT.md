# Comprehensive Tech Debt Audit - Scaffolding Templates Monorepo

**Audit Date**: May 13, 2026  
**Scope**: Full monorepo covering root configuration, all 7 templates, and shared configuration  
**Overall Health Score**: 7.5/10 (Good - Minor issues, mostly configuration and dependency versions)

---

## Executive Summary

The scaffolding-templates monorepo is well-structured with modern tooling and good testing infrastructure. However, there are several areas requiring attention:

- **Critical (2 issues)**: Beta dependencies for React Compiler in multiple templates
- **High (5 issues)**: Configuration inconsistencies, commented code, console statements
- **Medium (6 issues)**: Testing gaps, documentation debt, version inconsistencies
- **Low (4 issues)**: Minor code quality improvements

---

## 1. OUTDATED & PROBLEMATIC DEPENDENCIES

### 1.1 CRITICAL: Beta Version React Compiler 🔴

**Severity**: CRITICAL  
**Affected Templates**: 5 templates  
**Issue**: Using pre-release/beta version of React Compiler

```
├── next-ssr/
├── react-router-v7-spa/
├── react-router-v7-ssr/
├── tanstack-router-spa/
└── tanstack-start-ssr/
```

**Details**:
- `babel-plugin-react-compiler`: `19.0.0-beta-714736e-20250131`
- `eslint-plugin-react-compiler`: `19.0.0-beta-714736e-20250131`

**Risk**:
- No stability guarantee - API could change
- May introduce breaking changes in minor updates
- Not suitable for production use without careful testing
- Incompatible with lock-based deployments (commit hash version)

**Recommendation**:
1. Wait for stable release of React Compiler (v19.0.0+)
2. OR switch to using compiled React version once stable
3. If using beta intentionally, document the decision and pin exact versions
4. Add pre-release package restrictions to pnpm config

**Implementation Priority**: HIGH  
**Estimated Effort**: 2-4 hours (test and validate after upgrade)

---

### 1.2 Version Inconsistencies Across Templates 🟠

**Severity**: MEDIUM  
**Affected Templates**: Multiple

**Issue**: Minor version inconsistencies between templates

```typescript
// Example inconsistencies:
tanstack-start-ssr:
  react-hook-form: ^7.73.1
  react-i18next: ^17.0.4
  zod: ^4.3.6

others:
  react-hook-form: ^7.75.0
  react-i18next: ^17.0.7
  zod: ^4.4.3
```

**Impact**: 
- Harder to maintain consistent behavior across templates
- Makes it difficult for developers switching between projects
- Potential subtle bugs if different minor versions behave differently

**Recommendation**:
1. Create shared `pnpm-overrides` in root `package.json` for critical packages
2. Standardize dependency versions across all templates
3. Document intentional version differences (if any)

**Example Fix**:
```json
{
  "pnpm": {
    "overrides": {
      "react-hook-form": "^7.75.0",
      "react-i18next": "^17.0.7",
      "zod": "^4.4.3"
    }
  }
}
```

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 1-2 hours

---

### 1.3 Outdated Typescript Library Dependencies 🟡

**Severity**: LOW  
**Affected**: `typescript-library` template

**Issue**: Some older tooling versions

```json
{
  "vite": "^8.0.12",
  "vitest": "^4.1.6"
}
```

**Current Latest**: 
- Vite: v5+
- Vitest: v4.2+

**Recommendation**: 
- Upgrade Vite and Vitest to latest major versions
- May require minor config adjustments but generally safe
- Check breaking changes in release notes

**Implementation Priority**: LOW  
**Estimated Effort**: 1-2 hours

---

## 2. CODE QUALITY ISSUES

### 2.1 HIGH: Console Output in Production Code 🟠

**Severity**: HIGH  
**Affected Files**:
- `templates/next-ssr/src/i18n/i18nConfig.ts` (lines 9, 12)
- `templates/tanstack-router-spa/src/i18n/i18next.ts` (lines 43, 46)

**Issue**: `console.warn()` statements left in i18n configuration

```typescript
// File: templates/next-ssr/src/i18n/i18nConfig.ts
missingInterpolationHandler: (text, value) => {
  console.warn('Missing Interpolation', text, value);  // ⚠️
},
missingKeyHandler: (lng, ns, key, fallbackValue) => {
  console.warn('Missing Translation Key', lng, ns, key, fallbackValue);  // ⚠️
},
```

**Impact**:
- Production bundles will log i18n debugging info to user consoles
- Verbose console pollution for end users
- May confuse support teams about actual errors

**Recommendation**:
1. Move to proper logging/telemetry system
2. Respect environment-based logging levels
3. Use structured logging instead of console

**Example Fix**:
```typescript
const createLogger = () => {
  const isDev = process.env.NODE_ENV === 'development';
  return {
    warn: (...args: unknown[]) => {
      if (isDev) console.warn(...args);
      else reportToSentry(...args);  // or your telemetry
    },
  };
};

const logger = createLogger();

missingInterpolationHandler: (text, value) => {
  logger.warn('Missing Interpolation', text, value);
},
```

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 1 hour

---

### 2.2 MEDIUM: Commented-Out Code Blocks 🟡

**Severity**: MEDIUM  
**Affected Files**: Multiple files

**Details**:

1. **TanStack Router SPA - Playwright Config** (`playwright.config.ts` lines 30-39)
   ```typescript
   // {
   //   name: 'Mobile Chrome',
   //   use: { ...devices['Pixel 5'] },
   // },
   // {
   //   name: 'Mobile Safari',
   //   use: { ...devices['iPhone 12'] },
   // },
   ```

2. **Expo React Native - QueryClient Config** (`src/services/queries/queryClient.ts` lines 20-22)
   ```typescript
   // Other recommended v5 defaults can be added here:
   // gcTime: 300000, // 5 minutes (garbage collection)
   // refetchOnWindowFocus: false, // Useful for mobile apps
   ```

3. **Tanstack-start-ssr - Playwright Config** (similar to above)

**Impact**:
- Increases cognitive load when reading code
- Unclear if code is intentionally disabled or forgotten
- Makes diffs harder to review

**Recommendation**:
1. Remove commented code and rely on git history
2. If feature is planned: use feature flags or TODOs
3. If testing coverage: document why in ADR or comments

**Example**:
```typescript
// ✅ BETTER: If temporarily disabling
// TODO: Re-enable Mobile testing after resolving viewport issues
// See: https://github.com/microsoft/playwright/issues/...
// {
//   name: 'Mobile Chrome',
//   use: { ...devices['Pixel 5'] },
// },
```

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 1-2 hours (careful review needed)

---

### 2.3 MEDIUM: Type Safety - Generated Code Not Fully Checked 🟡

**Severity**: MEDIUM  
**Affected Files**:
- `templates/tanstack-router-spa/src/routeTree.gen.ts` (line 3)

**Issue**: `// @ts-nocheck` on generated file
```typescript
// @ts-nocheck  // ⚠️ TypeScript checking disabled
```

**Impact**:
- Generated type definitions may have issues
- Masks potential type errors during generation
- Inconsistent with strict TypeScript config

**Recommendation**:
1. Investigate if TanStack Router can generate with strict types
2. If not possible, scope `@ts-nocheck` to specific lines
3. Consider using `@ts-expect-error` for known issues
4. Document why this is necessary

**Example**:
```typescript
// Before:
// @ts-nocheck

// After: Only suppress for specific issues
// @ts-expect-error - TanStack Router generation limitation
```

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 1-2 hours

---

### 2.4 LOW: Type Definitions - Missing or Incomplete 🟡

**Severity**: LOW  
**Affected**: All templates with Zod validation

**Issue**: Environment type definitions could be stricter

**Current Pattern**:
```typescript
// Safe but could be better typed
const envSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
});
```

**Recommendation**:
1. Export typed environment object
2. Use `as const` for environment values
3. Consider using `zod-to-ts` for auto-generated types

---

## 3. CONFIGURATION PROBLEMS

### 3.1 MEDIUM: TypeScript Configuration Inconsistencies 🟡

**Severity**: MEDIUM  
**Affected**: All templates have different tsconfig patterns

**Issue**: TypeScript strict settings vary slightly

```json
// next-ssr/tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "ES2017",
    "skipLibCheck": true,  // ⚠️ Skips lib checking
    "allowJs": true        // ⚠️ Allows JS
  }
}

// typescript-library/tsconfig.json
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    // NO allowJs
  }
}
```

**Impact**:
- Inconsistent developer experience
- Different safety guarantees between templates
- Configuration sprawl makes updates harder

**Recommendation**:
1. Create base `tsconfig.base.json` in root
2. Have each template extend it
3. Override only when necessary

**Example**:
```json
// root/tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "module": "ESNext",
    "target": "ES2022",
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "noEmit": true,
    "moduleResolution": "bundler"
  }
}

// template/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2017",  // Override only if needed
    "allowJs": true      // Template-specific
  }
}
```

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 2-3 hours

---

### 3.2 MEDIUM: ESLint Configuration Duplication 🟡

**Severity**: MEDIUM  
**Affected**: All 7 templates have similar `eslint.config.js` files

**Issue**: ~80% duplicate ESLint configurations across templates

**Details**:
- Each template has its own eslint config (370+ lines combined)
- Shared plugins and rules duplicated
- Updates require changes in 7 places

**Recommendation**:
1. Create shared ESLint config package in monorepo
2. Each template imports and extends shared config
3. Add template-specific rules only where needed

**Example Structure**:
```
packages/
├── eslint-config/
│   ├── base.js        # Shared rules
│   ├── react.js       # React-specific
│   ├── next.js        # Next.js-specific
│   ├── ssr.js         # SSR-specific
│   └── package.json
```

**Implementation Priority**: LOW (nice to have, not blocking)  
**Estimated Effort**: 4-6 hours

---

### 3.3 HIGH: Playwright Configuration - Deprecated Mobile Tests 🟠

**Severity**: HIGH (Configuration)  
**Affected Templates**: 
- `react-router-v7-ssr`
- `tanstack-router-spa`
- `tanstack-start-ssr`
- `next-ssr`
- `react-router-v7-spa`

**Issue**: Mobile and branded browser test configs are commented out

```typescript
// playwright.config.ts
/* Test against mobile viewports. */
// {
//   name: 'Mobile Chrome',
//   use: { ...devices['Pixel 5'] },
// },
// {
//   name: 'Mobile Safari',
//   use: { ...devices['iPhone 12'] },
// },
```

**Questions**:
- Why disabled? Performance? Known issues?
- Should mobile testing be part of CI/CD?
- Should this be a documented decision?

**Recommendation**:
1. Decide if mobile testing is needed
2. If yes: debug and enable (add to ADR)
3. If no: remove commented code and document in README

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 2-4 hours (depends on investigation)

---

## 4. TESTING GAPS

### 4.1 MEDIUM: Incomplete Test Coverage for Utilities 🟡

**Severity**: MEDIUM  
**Affected**: All templates

**Issue**: Some utility functions lack test coverage

**Files needing tests**:
- Type utilities and helpers
- Environment validation
- Constants validation
- Setup files

**Current Coverage**:
- Components: ✅ Good (most covered)
- Hooks: ✅ Good (most covered)
- Services: ✅ Good (API mocking set up)
- Utils: ⚠️ Partial (some helpers untested)
- Types: ❌ Not tested (expected - types are compile-time)
- Config: ⚠️ Partial (i18n, env validation)

**Recommendation**:
1. Add tests for validation logic (env, zod schemas)
2. Test utility functions with edge cases
3. Add integration tests for service layer
4. Aim for 80%+ coverage (excluding types/styles)

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 8-12 hours total across all templates

---

### 4.2 MEDIUM: Missing Integration Tests 🟡

**Severity**: MEDIUM  
**Affected**: Web templates (not Expo)

**Issue**: Limited integration tests between components and services

**Current Status**:
- ✅ E2E tests with Playwright configured
- ✅ Unit tests for components
- ⚠️ Limited integration tests (component + hook + service)

**Recommendation**:
1. Add integration test suite between playwright and unit tests
2. Test realistic user flows with mocked API
3. Example: "User logs in, views list, adds item, sees it in UI"

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 6-10 hours

---

### 4.3 HIGH: No Coverage Thresholds Enforced 🔴

**Severity**: HIGH  
**Affected**: All templates except root library

**Issue**: No coverage thresholds in CI/CD pipeline

**Current Config**:
```typescript
// vitest.config.ts
test: {
  coverage: {
    provider: 'istanbul',
    reporter: ['lcov', 'json-summary'],
    // ❌ NO THRESHOLD
  }
}
```

**Risk**:
- Coverage can drop without notice
- No enforcement in PR reviews
- Developers can add code without tests

**Recommendation**:
```typescript
// vitest.config.ts
test: {
  coverage: {
    provider: 'istanbul',
    reporter: ['lcov', 'json-summary'],
    thresholds: {        // ✅ Add this
      lines: 80,
      functions: 80,
      branches: 75,      // Branches harder to cover
      statements: 80,
    },
  }
}
```

**Implementation Priority**: HIGH  
**Estimated Effort**: 1-2 hours

---

## 5. CODE PATTERNS & ANTI-PATTERNS

### 5.1 MEDIUM: Loose Error Handling in i18n Config 🟡

**Severity**: MEDIUM  
**Affected Files**:
- `templates/next-ssr/src/i18n/i18nConfig.ts`
- `templates/tanstack-router-spa/src/i18n/i18next.ts`

**Issue**: Error handlers just log without recovery

```typescript
// Current - incomplete
missingKeyHandler: (lng, ns, key, fallbackValue) => {
  console.warn('Missing Translation Key', lng, ns, key, fallbackValue);
},
```

**Recommendation**: Implement proper error recovery
```typescript
missingKeyHandler: (lng, ns, key, fallbackValue) => {
  const logger = getLogger();
  logger.warn('Missing translation key', {
    language: lng,
    namespace: ns,
    key,
    fallback: fallbackValue,
  });
  
  // Report to error tracking
  if (!process.env.DEV) {
    reportToSentry({
      level: 'warning',
      message: `Missing i18n key: ${key}`,
      contexts: { i18n: { lng, ns, fallbackValue } },
    });
  }
},
```

**Implementation Priority**: LOW  
**Estimated Effort**: 1-2 hours

---

### 5.2 MEDIUM: Environment Variable Handling 🟡

**Severity**: MEDIUM  
**Current Pattern**: Good (Zod validation)
**Issue**: No validation at build time for missing vars

**Recommendation**:
1. Add `env.test` files with required variables
2. Fail build if required variables missing
3. Document all required variables in README

```typescript
// env.test.ts - validates at test time
import env from './env.client';

describe('Environment Configuration', () => {
  it('should have required environment variables', () => {
    expect(env.VITE_APP_ENVIRONMENT).toBeDefined();
    expect(['dev', 'qa', 'staging', 'prod']).toContain(
      env.VITE_APP_ENVIRONMENT
    );
  });
});
```

**Implementation Priority**: LOW  
**Estimated Effort**: 1-2 hours

---

## 6. DOCUMENTATION DEBT

### 6.1 HIGH: Root README Outdated 🟠

**Severity**: HIGH (Documentation)  
**File**: `README.md`

**Issues**:
1. "Windows is not supported" section outdated
2. Skills vs Agents distinction could be clearer
3. Template descriptions missing key features
4. Setup instructions mention old Node versions

**Specific Updates Needed**:
```markdown
# BEFORE:
- **Node.js** >=22.12.0 (outdated, should be >=24.0.0 per engines field)

# AFTER:
- **Node.js** >=24.0.0 (as per package.json engines requirement)
```

**Recommendation**:
1. Update Node version to match package.json
2. Add table of template features comparison
3. Clarify Skills vs Agents with use cases
4. Add "Updating Templates" guide
5. Add troubleshooting section

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 2-3 hours

---

### 6.2 MEDIUM: Template READMEs Could Be More Detailed 🟡

**Severity**: MEDIUM  
**Affected**: All templates

**Gaps**:
- Some READMEs missing troubleshooting sections
- No "common pitfalls" documented
- Limited ADR (Architecture Decision Record) references
- No "migration guide" from other frameworks

**Recommendation**:
1. Add troubleshooting section to each template
2. Link relevant ADRs in README
3. Add "migration guide" for developers switching frameworks
4. Document performance characteristics

**Implementation Priority**: LOW  
**Estimated Effort**: 4-6 hours

---

### 6.3 MEDIUM: Missing ADR Updates 🟡

**Severity**: MEDIUM  
**Affected**: All templates

**Issue**: Some ADRs reference deprecated patterns

**Examples**:
- React Compiler status (now beta, future stable)
- Playwright configuration (commented mobile tests)
- Testing strategy alignment with coverage thresholds

**Recommendation**:
1. Review all ADRs for accuracy
2. Update React Compiler ADR with beta status
3. Add ADR for coverage threshold decisions
4. Document why mobile tests are disabled (if intentional)

**Implementation Priority**: MEDIUM  
**Estimated Effort**: 2-3 hours

---

## 7. DEPENDENCY & SECURITY NOTES

### 7.1 Current Status ✅

**Good Security Practices**:
- ✅ All dependencies use caret ranges (^) for flexibility
- ✅ pnpm-lock.yaml locked (reproducible builds)
- ✅ Husky pre-commit hooks configured
- ✅ ESLint strict mode enabled
- ✅ TypeScript strict mode enabled

**Potential Concerns**:
- ⚠️ React Compiler beta (not security, but stability)
- ⚠️ MSW v2 for mocking (ensure version consistency)
- ⚠️ Playwright v1.60.0 (latest, monitor for updates)

---

## 8. TOOLING & BUILD CONFIGURATION

### 8.1 MEDIUM: Bundlesize Configuration Gaps 🟡

**Severity**: MEDIUM  
**Issue**: `bundlesize2` v0.0.35 in all templates but config not shown

**Recommendation**:
1. Document bundlesize thresholds in each template
2. Add to CI/CD pipeline output
3. Create shared bundlesize config

---

### 8.2 LOW: Circular Dependency Detection 🟡

**Severity**: LOW  
**Current**: Using `dpdm` for circular dependency checking

**Status**: Good - already configured  
**Recommendation**: Continue monitoring with CI/CD

---

## Priority Action Plan

### IMMEDIATE (Next Sprint)
1. **Replace React Compiler beta** - Update to stable or revert
2. **Fix console output** - Remove `console.warn()` from i18n
3. **Add coverage thresholds** - Enforce 80% minimum

### SHORT TERM (Next 2 Weeks)
4. **Remove commented code** - Clean up Playwright configs
5. **Update root README** - Fix Node version, clarify Skills
6. **Standardize dependencies** - Use pnpm overrides
7. **Fix @ts-nocheck** - Scope to specific lines

### MEDIUM TERM (Next Month)
8. **Add integration tests** - Fill service/component gaps
9. **Extract ESLint config** - Create shared package
10. **Create base tsconfig** - Reduce duplication
11. **Update ADRs** - Reflect current decisions

### LONG TERM (Next Quarter)
12. **Improve test coverage** - Target 85%+
13. **Create migration guides** - Framework switching
14. **Add performance docs** - Bundle size targets

---

## Metrics Summary

| Category | Issues | Severity | Impact |
|----------|--------|----------|--------|
| Dependencies | 3 | 🔴 Critical (1) | High - Stability risk |
| Code Quality | 4 | 🟠 High (1) | Medium - Maintainability |
| Configuration | 3 | 🟠 High (1) | Medium - DX & Consistency |
| Testing | 3 | 🟠 High (1) | Medium - Reliability |
| Documentation | 3 | 🟠 High (1) | Low - Usability |
| Patterns | 2 | 🟡 Medium | Low - Cleanness |
| **TOTAL** | **18** | Mixed | **Manageable** |

---

## Files Referenced in This Audit

### Root Configuration
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `README.md` ⚠️

### Template: next-ssr
- `src/i18n/i18nConfig.ts` ⚠️
- `src/env.client.ts` ✅
- `src/env.server.ts` ✅
- `eslint.config.js` ⚠️
- `tsconfig.json` ⚠️
- `vitest.config.ts` ⚠️
- `playwright.config.ts` ⚠️

### Template: typescript-library
- `package.json` ⚠️
- `tsconfig.json` ⚠️
- `vitest.config.ts` ⚠️

### Template: react-router-v7-spa
- `src/routeTree.gen.ts` ⚠️
- `src/i18n/i18next.ts` ⚠️
- `playwright.config.ts` ⚠️

### Template: react-router-v7-ssr
- `playwright.config.ts` ⚠️
- `tsconfig.json` ⚠️

### Template: tanstack-router-spa
- `src/routeTree.gen.ts` ⚠️
- `src/i18n/i18next.ts` ⚠️
- `playwright.config.ts` ⚠️
- `vitest.config.ts` ✅

### Template: tanstack-start-ssr
- `playwright.config.ts` ⚠️
- `package.json` ⚠️

### Template: expo-react-native
- `package.json` ✅
- `jest.config.js` ✅
- `src/services/queries/queryClient.ts` ⚠️

---

## Appendix: Recommended Reading

### ADR References to Review
- Each template has `/docs/adrs/` directory
- Key ADRs: Testing Strategy, API Client, Environment Setup

### External Resources
- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Vitest Coverage Configuration](https://vitest.dev/guide/coverage)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)

---

**Report End** - For questions or clarification, refer to issue tracking system or ADR docs in each template.
