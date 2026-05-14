# Tech Debt Remediation Action Plan

**Created**: May 13, 2026  
**Next Review**: June 13, 2026  
**Responsible Team**: Platform/Infrastructure Team

---

## 📅 Implementation Timeline

### Phase 1: IMMEDIATE (Week 1-2) - Stability & CI/CD
**Goal**: Fix critical stability issues and enforce quality gates

#### Task 1.1: React Compiler Beta Status
**Priority**: CRITICAL  
**Assignee**: TBD  
**Deadline**: 3 days  
**Effort**: 4-6 hours

**Steps**:
1. [ ] Check React Compiler stable release status
   - Visit: https://github.com/facebook/react/releases
   - Look for v19.0.0 or later stable release
2. [ ] Decision: Upgrade vs. Revert
   - If stable available: Plan upgrade with testing
   - If not: Document why beta is acceptable
3. [ ] Update all 5 affected templates if upgrading
   - next-ssr/package.json
   - react-router-v7-spa/package.json
   - react-router-v7-ssr/package.json
   - tanstack-router-spa/package.json
   - tanstack-start-ssr/package.json
4. [ ] Run full test suite for each template
5. [ ] Create PR with change log entry
6. [ ] Merge and tag release

**Definition of Done**:
- React Compiler version is stable (not beta)
- All tests pass in CI
- Release notes mention compiler update

---

#### Task 1.2: Add Coverage Thresholds to CI
**Priority**: HIGH  
**Assignee**: TBD  
**Deadline**: 5 days  
**Effort**: 2-3 hours

**Affected Files**:
- `templates/next-ssr/vitest.config.ts`
- `templates/react-router-v7-spa/vitest.config.ts` (or vite.config.ts)
- `templates/react-router-v7-ssr/vitest.config.ts` (or vite.config.ts)
- `templates/tanstack-router-spa/vitest.config.ts` (or vite.config.ts)
- `templates/tanstack-start-ssr/vitest.config.ts` (or vite.config.ts)

**Steps**:
1. [ ] Review current coverage levels in each template
   ```bash
   cd templates/next-ssr
   pnpm test:coverage
   # Check coverage/coverage-final.json
   ```
2. [ ] For each template, add threshold config:
   ```typescript
   // vitest.config.ts or vite.config.ts
   test: {
     coverage: {
       thresholds: {
         lines: 80,
         functions: 80,
         branches: 75,      // Slightly lower - harder to achieve
         statements: 80,
       },
     },
   }
   ```
3. [ ] Run test suite to verify threshold enforcement
4. [ ] If tests fail, identify gaps and add tests
5. [ ] Create PR for each template
6. [ ] Merge after approval

**Definition of Done**:
- All templates have coverage.thresholds configured
- Test suite fails if coverage drops below threshold
- Verified in at least one template

---

#### Task 1.3: Fix Console.warn in i18n Config
**Priority**: HIGH  
**Assignee**: TBD  
**Deadline**: 5 days  
**Effort**: 1-2 hours per template

**Affected Files**:
- `templates/next-ssr/src/i18n/i18nConfig.ts` (lines 9, 12)
- `templates/tanstack-router-spa/src/i18n/i18next.ts` (lines 43, 46)

**Steps**:
1. [ ] Create logger utility function:
   ```typescript
   // src/utils/logger.ts
   const createI18nLogger = () => {
     const isDev = typeof window !== 'undefined' 
       ? window.__DEBUG__ || false 
       : process.env.DEBUG === 'true';
     
     return {
       warn: (context: string, ...data: unknown[]) => {
         if (isDev) {
           console.warn(`[i18n:${context}]`, ...data);
         } else {
           // Send to error tracking (Sentry, etc)
           // reportToTelemetry({ level: 'warning', context, data });
         }
       },
     };
   };
   ```
2. [ ] Update i18n config to use logger:
   ```typescript
   import { createI18nLogger } from '@/utils/logger';
   const logger = createI18nLogger();
   
   const i18nConfig = {
     missingInterpolationHandler: (text, value) => {
       logger.warn('missingInterpolation', text, value);
     },
     missingKeyHandler: (lng, ns, key, fallbackValue) => {
       logger.warn('missingKey', { lng, ns, key, fallbackValue });
     },
   };
   ```
3. [ ] Test in development mode (should see console output)
4. [ ] Build for production (no console output)
5. [ ] Create PR per template

**Definition of Done**:
- No console.warn in production builds
- Development mode still shows warnings
- Error tracking ready for integration

---

#### Task 1.4: Update Root README
**Priority**: HIGH  
**Assignee**: TBD  
**Deadline**: 5 days  
**Effort**: 1-2 hours

**Changes**:
1. [ ] Update Node version requirement
   ```markdown
   # BEFORE:
   - **Node.js** >=22.12.0
   
   # AFTER:
   - **Node.js** >=24.0.0 (as specified in package.json)
   ```

2. [ ] Add prerequisites clarity section
   ```markdown
   ## Prerequisites (All Platforms)
   - Node.js >= 24.0.0
   - pnpm >= 11.0.0
   - Git
   ```

3. [ ] Update Windows section
   ```markdown
   ### Windows Support
   
   While setup scripts are optimized for macOS/Linux, you can use:
   - Windows Subsystem for Linux (WSL2) - RECOMMENDED
   - Git Bash with manual configuration
   - PowerShell (experimental - check template docs)
   ```

4. [ ] Add template comparison table
   ```markdown
   | Template | Best For | Framework | Rendering | Testing |
   |----------|----------|-----------|-----------|---------|
   | Next SSR | Traditional SSR | Next.js | Server | Vitest |
   | React Router SPA | SPA with Router | React Router | Client | Vitest |
   | ... | ... | ... | ... | ... |
   ```

5. [ ] Create PR and merge

**Definition of Done**:
- README matches current configurations
- All Node/pnpm versions accurate
- Template table added
- No outdated references

---

### Phase 2: MEDIUM PRIORITY (Week 3-4) - Code Quality
**Goal**: Improve code organization and remove technical debt

#### Task 2.1: Clean Up Commented Playwright Code
**Priority**: MEDIUM  
**Assignee**: TBD  
**Deadline**: 10 days  
**Effort**: 2-4 hours per template

**Affected Templates**: 5 (next-ssr, react-router-v7-spa, react-router-v7-ssr, tanstack-router-spa, tanstack-start-ssr)

**Steps**:
1. [ ] For each template, decide on mobile tests:
   - Option A: Enable + document
   - Option B: Remove commented code + document why
2. [ ] If enabling mobile tests:
   ```typescript
   // playwright.config.ts
   projects: [
     // ... desktop configs ...
     {
       name: 'Mobile Chrome',
       use: { ...devices['Pixel 5'] },
     },
     {
       name: 'Mobile Safari',
       use: { ...devices['iPhone 12'] },
     },
   ],
   ```
   Then test locally: `pnpm playwright test`

3. [ ] If removing (with documentation):
   - Remove all commented blocks
   - Add comment explaining decision:
   ```typescript
   // Note: Mobile browser testing disabled due to:
   // - Performance impact on CI/CD pipeline
   // - Can be enabled via local playwright config
   // - See docs/adrs/ADR-005-testing-strategy.md
   ```

4. [ ] Create PR for each template
5. [ ] Add decision to respective ADR

**Definition of Done**:
- No commented code blocks in playwright.config.ts
- Decision documented in ADR or code comment
- Tests pass

---

#### Task 2.2: Standardize Dependency Versions
**Priority**: MEDIUM  
**Assignee**: TBD  
**Deadline**: 10 days  
**Effort**: 2-3 hours

**Changes to Root package.json**:
```json
{
  "pnpm": {
    "overrides": {
      "react-hook-form": "^7.75.0",
      "react-i18next": "^17.0.7",
      "zod": "^4.4.3",
      "lucide-react": "^1.14.0",
      "@tanstack/react-query": "^5.100.10"
    }
  }
}
```

**Steps**:
1. [ ] Add pnpm.overrides section to root package.json
2. [ ] Run `pnpm install` to validate
3. [ ] Run tests in each template to verify no breaking changes
4. [ ] Commit changes

**Definition of Done**:
- pnpm.overrides applied
- All templates use consistent versions
- All tests pass

---

#### Task 2.3: Scope TypeScript Checks on Generated Files
**Priority**: MEDIUM  
**Assignee**: TBD  
**Deadline**: 7 days  
**Effort**: 1-2 hours

**Affected Files**:
- `templates/tanstack-router-spa/src/routeTree.gen.ts`

**Steps**:
1. [ ] Investigate specific type errors:
   ```bash
   cd templates/tanstack-router-spa
   # Temporarily remove @ts-nocheck
   # npm run build
   # Note the errors
   ```

2. [ ] Replace full `@ts-nocheck` with specific errors:
   ```typescript
   // Before:
   // @ts-nocheck
   
   // After - only suppress known issues:
   // @ts-expect-error - TanStack Router auto-generated file
   // Route type inference has limitations for deeply nested routes
   ```

3. [ ] Or create tsconfig override for generated files
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "skipLibCheck": true,
       "noImplicitAny": false
     },
     "include": ["**/*"],
     "exclude": ["src/routeTree.gen.ts"]
   }
   ```

4. [ ] Test build process

**Definition of Done**:
- `@ts-nocheck` removed (scope narrowed)
- Build still succeeds
- Documentation added

---

#### Task 2.4: Create Shared TypeScript Base Config
**Priority**: MEDIUM  
**Assignee**: TBD  
**Deadline**: 14 days  
**Effort**: 2-3 hours

**New File**: `tsconfig.base.json` (in root)

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "noEmit": true
  }
}
```

**Steps**:
1. [ ] Create tsconfig.base.json in root
2. [ ] Update each template's tsconfig.json:
   ```json
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "target": "ES2017",  // Template-specific if needed
       "lib": ["DOM", "DOM.Iterable", "ES2022"]
     },
     "include": ["**/*.ts", "**/*.tsx"]
   }
   ```
3. [ ] Test each template builds correctly
4. [ ] Document in CONTRIBUTING.md

**Definition of Done**:
- Base config created and all templates extend it
- All builds succeed
- Reduced config duplication

---

### Phase 3: LONG TERM (Week 5-8) - Architecture
**Goal**: Reduce duplication, improve maintainability

#### Task 3.1: Standardize ESLint Configuration
**Priority**: LOW  
**Assignee**: TBD  
**Deadline**: 30 days  
**Effort**: 6-8 hours

**Plan**: Create `@scaffolding/eslint-config` package

**Steps**:
1. [ ] Create new directory: `packages/eslint-config/`
2. [ ] Move common config to `base.js`
3. [ ] Create template-specific configs:
   - `next.js` - with Next.js plugin
   - `react.js` - general React patterns
   - `ssr.js` - SSR-specific rules
4. [ ] Publish to npm or use workspace reference
5. [ ] Update each template to use it

**Result**: Single source of truth for linting rules

---

#### Task 3.2: Add Integration Test Suite
**Priority**: MEDIUM  
**Assignee**: TBD  
**Deadline**: 30 days  
**Effort**: 8-12 hours

**Plan**: Add tests between unit + E2E layers

**New Test Structure**:
```
src/
├── __tests__/              # NEW: Integration tests
│   ├── auth.integration.ts
│   ├── api.integration.ts
│   └── user-flow.integration.ts
├── components/
├── hooks/
└── services/
```

**Example Integration Test**:
```typescript
// src/__tests__/user-flow.integration.ts
describe('User Flow Integration', () => {
  it('should fetch and display user data', async () => {
    // Setup MSW to mock API
    // Render component with provider
    // Verify UI updates correctly
    // Test loading → success → display
  });
});
```

---

#### Task 3.3: Improve Test Coverage
**Priority**: MEDIUM  
**Assignee**: TBD  
**Deadline**: 30 days  
**Effort**: 10-16 hours

**Goal**: Increase coverage to 85%+

**Focus Areas**:
- [ ] Utility functions
- [ ] Config/env validation
- [ ] Service layer edge cases
- [ ] Error boundaries

---

#### Task 3.4: Update and Create ADRs
**Priority**: LOW  
**Assignee**: TBD  
**Deadline**: 21 days  
**Effort**: 4-6 hours

**ADRs to Create/Update**:
- [ ] ADR: React Compiler Status & Stability (update)
- [ ] ADR: Coverage Threshold Enforcement (new)
- [ ] ADR: Testing Strategy Alignment (update)
- [ ] ADR: Dependency Version Strategy (new)

---

## 🎯 Success Metrics

### Immediate (Week 2)
- [ ] No console.warn in production builds
- [ ] Coverage thresholds enforced in CI
- [ ] React Compiler version resolved
- [ ] README updated and accurate

### Short Term (Week 4)
- [ ] No commented code blocks in configs
- [ ] Dependency versions standardized
- [ ] TypeScript base config created
- [ ] All templates follow same patterns

### Medium Term (Week 8)
- [ ] 85%+ test coverage across templates
- [ ] ESLint config shared/centralized
- [ ] ADRs updated and current
- [ ] Integration test suite in place

---

## 📊 Progress Tracking

Create a GitHub issue or tracking board with:
- [ ] Each task as sub-issue
- [ ] Assignee and deadline
- [ ] Checklist for completion
- [ ] Links to PRs/commits

### Template for GitHub Issue:
```markdown
# Tech Debt: [Category] - [Specific Issue]

## Severity
- [ ] CRITICAL
- [ ] HIGH
- [ ] MEDIUM
- [ ] LOW

## Affected Templates
- [ ] next-ssr
- [ ] react-router-v7-spa
- [ ] react-router-v7-ssr
- [ ] tanstack-router-spa
- [ ] tanstack-start-ssr
- [ ] typescript-library
- [ ] expo-react-native

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Related Documentation
- Link to audit
- Link to ADR
- Link to related issues

## Effort Estimate
- Hours: X
- Complexity: Low/Medium/High
```

---

## 🔄 Review & Escalation

### Blockers/Issues Encountered
If you encounter blocking issues:
1. Post in team Slack/Discord
2. Add comment to GitHub issue
3. Schedule 15-min sync if needed
4. Update timeline/effort estimate

### Weekly Sync
- Monday: Plan week's work
- Wednesday: Check progress
- Friday: Review PRs, identify blockers

---

## 📚 Reference Materials

### Documentation
- [TECH_DEBT_AUDIT.md](./TECH_DEBT_AUDIT.md) - Detailed findings
- [TECH_DEBT_QUICK_REFERENCE.md](./TECH_DEBT_QUICK_REFERENCE.md) - Quick lookup
- Each template's `/docs/adrs/` directory

### External Resources
- React Compiler: https://react.dev/learn/react-compiler
- Vitest Coverage: https://vitest.dev/guide/coverage
- ESLint Config: https://eslint.org/docs/latest/use/configure/

---

## 🎓 Learning Resources

Consider sharing with team:
- [ ] React Compiler deprecation patterns
- [ ] Testing best practices (unit vs integration vs E2E)
- [ ] TypeScript strict mode benefits
- [ ] Monorepo maintenance strategies

---

**Questions?** Refer to TECH_DEBT_AUDIT.md or create a discussion issue.
