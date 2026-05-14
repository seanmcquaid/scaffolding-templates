# Tech Debt Audit - Quick Reference

**Last Updated**: May 13, 2026  
**Templates Audited**: 7 (next-ssr, react-router-v7-spa/ssr, tanstack-router-spa, tanstack-start-ssr, typescript-library, expo-react-native)

---

## 🔴 CRITICAL ISSUES (Act Immediately)

### 1. React Compiler Beta Dependency
```
Templates: next-ssr, react-router-v7-spa, react-router-v7-ssr, tanstack-router-spa, tanstack-start-ssr

Issue: Using pre-release version (19.0.0-beta-714736e-20250131)
  - babel-plugin-react-compiler
  - eslint-plugin-react-compiler

Timeline: Upgrade when stable release available
Effort: 2-4 hours per template
```

---

## 🟠 HIGH PRIORITY (This Sprint)

### 2. Console Output in Production Code
```
Files:
  - templates/next-ssr/src/i18n/i18nConfig.ts (lines 9, 12)
  - templates/tanstack-router-spa/src/i18n/i18next.ts (lines 43, 46)

Issue: console.warn() in i18n error handlers
Solution: Use proper logging/telemetry instead
Effort: 1 hour
```

### 3. Coverage Thresholds Not Enforced
```
All Web Templates (Vitest)

Issue: No minimum coverage requirement in CI
Solution: Add coverage.thresholds to vitest.config.ts
Effort: 1 hour

thresholds: {
  lines: 80,
  functions: 80,
  branches: 75,
  statements: 80,
}
```

### 4. Outdated Root README
```
Issue: Node version outdated (shows 22.12.0, should be 24.0.0)
       Windows support section needs review
       Skills vs Agents distinction unclear

Effort: 2-3 hours
```

---

## 🟡 MEDIUM PRIORITY (Next 2 Weeks)

### 5. Commented Code Blocks
```
Files:
  - next-ssr/playwright.config.ts (mobile test configs)
  - react-router-v7-spa/playwright.config.ts
  - react-router-v7-ssr/playwright.config.ts
  - tanstack-router-spa/playwright.config.ts
  - tanstack-start-ssr/playwright.config.ts

Issue: Disabled mobile browser test configurations
Solution: Either enable + document OR remove entirely
Effort: 2-4 hours (needs investigation)
```

### 6. Version Inconsistencies Between Templates
```
Examples:
  tanstack-start-ssr/package.json:
    - react-hook-form: ^7.73.1 (others: ^7.75.0)
    - react-i18next: ^17.0.4 (others: ^17.0.7)
    - zod: ^4.3.6 (others: ^4.4.3)

Solution: Use pnpm-overrides in root package.json
Effort: 1-2 hours
```

### 7. TypeScript Configuration Duplication
```
Issue: Each template has different tsconfig settings
       Some have allowJs: true, skipLibCheck differences

Solution: Create root tsconfig.base.json
          Have templates extend it
Effort: 2-3 hours
```

### 8. Generated Code Type Checking Disabled
```
File: templates/tanstack-router-spa/src/routeTree.gen.ts

Issue: // @ts-nocheck on entire file
Solution: Scope to specific errors or resolve at generation
Effort: 1-2 hours
```

### 9. Testing Gaps
```
Issues:
  - No integration tests between components + services
  - Limited utility function coverage
  - Some config validation not tested

Solution: Add integration test suite
Effort: 6-10 hours total
```

---

## 🟢 LOW PRIORITY (Nice to Have)

### 10. ESLint Configuration Duplication
```
Issue: 7 similar eslint.config.js files (~80% duplicate)

Solution: Create shared @scaffolding/eslint-config package
          Each template imports + extends
Effort: 4-6 hours (one-time, high reuse)
```

### 11. Shared Tooling Base
```
Ideas:
  - Shared tsconfig.base.json
  - Shared vitest.config.ts base
  - Shared prettier.config.js

Benefit: Easier maintenance, consistency
Effort: 4-6 hours (one-time)
```

### 12. ADR Updates
```
Need to review/update:
  - React Compiler ADR (now beta, impacts decisions)
  - Playwright configuration decisions
  - Testing strategy alignment with thresholds

Effort: 2-3 hours
```

---

## 📊 Issues by Template

### next-ssr
- ⚠️ console.warn in i18n config
- ⚠️ Coverage thresholds not enforced
- ⚠️ React Compiler beta
- ⚠️ Commented mobile tests in Playwright
- ⚠️ TypeScript config has allowJs + skipLibCheck

### react-router-v7-spa
- ⚠️ @ts-nocheck on routeTree.gen.ts
- ⚠️ console.warn in i18n config
- ⚠️ React Compiler beta
- ⚠️ Commented mobile tests
- ⚠️ Coverage thresholds not enforced

### react-router-v7-ssr
- ⚠️ React Compiler beta
- ⚠️ Commented mobile tests
- ⚠️ Coverage thresholds not enforced
- ⚠️ Version inconsistencies (same as SPA)

### tanstack-router-spa
- ⚠️ @ts-nocheck on routeTree.gen.ts
- ⚠️ console.warn in i18n config
- ⚠️ React Compiler beta
- ⚠️ Commented mobile tests
- ⚠️ Coverage thresholds not enforced

### tanstack-start-ssr
- ⚠️ React Compiler beta
- ⚠️ Commented mobile tests
- ⚠️ Coverage thresholds not enforced
- ⚠️ Version inconsistencies (hook-form, i18next, zod)

### typescript-library
- ⚠️ Vite/Vitest slightly outdated (v8.0.12, v4.1.6)
- ✅ Otherwise clean

### expo-react-native
- ⚠️ Commented code in queryClient.ts (planned features)
- ✅ Otherwise solid

### Root Configuration
- ⚠️ README outdated (Node version, Windows section)
- ✅ Turbo + pnpm workspace well configured

---

## 📋 Immediate Checklist

### This Week
- [ ] Replace React Compiler beta OR document decision
- [ ] Remove console.warn statements or route to proper logger
- [ ] Add coverage.thresholds to vitest configs
- [ ] Update README.md with correct Node version

### Next Week
- [ ] Remove or enable Playwright mobile tests (investigate)
- [ ] Standardize dependency versions via pnpm-overrides
- [ ] Create git issues for each medium priority item
- [ ] Review and update ADRs

### Next Sprint
- [ ] Add integration tests (service + component)
- [ ] Create shared tsconfig.base.json
- [ ] Add test coverage for utilities
- [ ] Review ESLint duplication solution

---

## 🔗 References

### Configuration Files
- Root: `/package.json`, `/pnpm-workspace.yaml`, `/turbo.json`, `/README.md`
- Templates: Each has `/eslint.config.js`, `/tsconfig.json`, `/vitest.config.ts`

### Key Source Files
- i18n Config: `templates/*/src/i18n/` (i18nConfig.ts or i18next.ts)
- Environment: `templates/*/src/env*.ts`
- Playwright: `templates/*/playwright.config.ts`

### Documentation
- Each template: `/docs/adrs/` (Architecture Decision Records)
- Root: `/docs/` (Skills vs Agents, Custom Agents Guide)

---

## Health Score Breakdown

| Area | Score | Status |
|------|-------|--------|
| Dependencies | 6/10 | ⚠️ Beta versions need attention |
| Code Quality | 7/10 | ✅ Generally good, minor logging issues |
| Configuration | 6/10 | ⚠️ Duplication, inconsistencies |
| Testing | 7/10 | ✅ Good structure, coverage gaps |
| Documentation | 7/10 | ✅ Good, minor updates needed |
| Tooling | 8/10 | ✅ Modern, well-configured |
| **OVERALL** | **7.5/10** | ✅ **GOOD** |

---

**Report Details**: See [TECH_DEBT_AUDIT.md](./TECH_DEBT_AUDIT.md) for comprehensive analysis
