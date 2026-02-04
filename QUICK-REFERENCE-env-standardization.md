# Quick Reference: Type-Safe Environment Variables Standardization

## 📄 Main Document
**Location**: `ARCHITECTURE-type-safe-env-variables.md` (1540 lines)

---

## 🎯 Standardization Rules

### File Naming
```
✅ env.client.ts    (all templates)
✅ env.server.ts    (SSR only)
❌ env.ts           (non-standard)
❌ envClient.ts     (non-standard)
```

### Export Pattern
```typescript
✅ export default clientEnv;
❌ export const clientEnv = ...;
❌ export { clientEnv };
```

### Parsing Pattern
```typescript
✅ clientEnvSchema.parse(import.meta.env);
❌ clientEnvSchema.parse({ VITE_APP_X: import.meta.env.VITE_APP_X });
```

### Import Pattern
```typescript
✅ import env from '@/env.client';
❌ import { clientEnv } from '@/env.client';
❌ import env from '@/env';
```

---

## 🔧 Template Patterns

| Template | Files | Parse Source |
|----------|-------|--------------|
| next-ssr | client + server | `process.env` |
| react-router-v7-ssr | client + server | `import.meta.env` / `process.env` |
| react-router-v7-spa | client only | `import.meta.env` |
| tanstack-router-spa | client only | `import.meta.env` |
| expo-react-native | client only | `process.env` |

---

## 🚀 Migration Checklist

### TanStack Router SPA
- [ ] Rename `src/env.ts` → `src/env.client.ts`
- [ ] Update schema name: `envSchema` → `clientEnvSchema`
- [ ] Update variable name: `env` → `clientEnv`
- [ ] Update imports: `@/env` → `@/env.client`
- [ ] Update tsconfig paths
- [ ] Run tests

### Expo React Native
- [ ] Change to default export
- [ ] Remove manual field mapping
- [ ] Update all imports to default import
- [ ] Update variable usage
- [ ] Run tests

---

## 📋 Implementation Template

```typescript
// env.client.ts (Standard Pattern)
import { z } from 'zod';

const clientEnvSchema = z.object({
  MODE: z.enum(['development', 'test', 'production']),
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
  VITE_APP_API_URL: z.string().url(),
});

const clientEnv = clientEnvSchema.parse(import.meta.env);

export default clientEnv;
```

---

## 🧪 Testing Pattern

```typescript
// env.client.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('clientEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should parse valid environment variables', async () => {
    process.env = {
      ...originalEnv,
      VITE_APP_ENVIRONMENT: 'dev',
      VITE_APP_MSW_ENABLED: 'true',
    };

    const { default: env } = await import('./env.client');

    expect(env.VITE_APP_ENVIRONMENT).toBe('dev');
    expect(env.VITE_APP_MSW_ENABLED).toBe(true);
  });
});
```

---

## ⚠️ Common Pitfalls

### 1. Manual Field Mapping
```typescript
❌ const env = schema.parse({
  VAR1: process.env.VAR1,
  VAR2: process.env.VAR2,
});

✅ const env = schema.parse(process.env);
```

### 2. Forgetting Transformations
```typescript
❌ VITE_APP_ENABLED: z.enum(['true', 'false'])
// Later: if (env.VITE_APP_ENABLED === 'true') // String comparison

✅ VITE_APP_ENABLED: z
  .enum(['true', 'false'])
  .transform(value => value === 'true')
// Later: if (env.VITE_APP_ENABLED) // Boolean check
```

### 3. Weak Validation
```typescript
❌ VITE_APP_API_URL: z.string()
✅ VITE_APP_API_URL: z.string().url()
```

### 4. Server Variables in Client
```typescript
❌ // env.client.ts
const clientEnvSchema = z.object({
  DATABASE_URL: z.string().url(), // SECURITY RISK!
});

✅ // env.server.ts
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});
```

---

## 📝 Documentation Requirements

### .env.example
```bash
###############################################################################
# CLIENT-SIDE ENVIRONMENT VARIABLES
###############################################################################

# Application Environment (dev | qa | staging | prod)
VITE_APP_ENVIRONMENT=dev

# Enable MSW for API mocking
VITE_APP_MSW_ENABLED=true
```

### Inline Comments
```typescript
const clientEnvSchema = z.object({
  /**
   * Application environment tier
   * - dev: Local development
   * - qa: QA testing
   * - staging: Pre-production
   * - prod: Production
   */
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
});
```

---

## 🔄 Migration Timeline

| Phase | Template | Duration | Tasks |
|-------|----------|----------|-------|
| 1 | Assessment | 1 hour | Audit current state |
| 2 | TanStack Router | 2 hours | Rename file + update imports |
| 3 | Expo React Native | 2 hours | Change export pattern |
| 4 | Validation | 1 hour | Cross-template verification |

**Total**: ~6 hours

---

## ✅ Success Criteria

- [ ] All templates use `env.client.ts` / `env.server.ts`
- [ ] All templates use `export default`
- [ ] All templates parse full environment object
- [ ] All imports use `@/env.client` or `@/env.server`
- [ ] All tests passing
- [ ] All builds succeeding
- [ ] Documentation updated

---

## 📚 Related Documents

- **Full Architecture**: `ARCHITECTURE-type-safe-env-variables.md`
- **ADR Template**: Section 7 of architecture doc (lines 1182-1360)
- **Implementation Guide**: Section 4 of architecture doc (lines 452-720)
- **Best Practices**: Section 5 of architecture doc (lines 722-960)
- **Migration Strategy**: Section 6 of architecture doc (lines 962-1180)

---

## 🤔 Decision Summary

**Choice**: Zod schema validation  
**Why**: Runtime safety + type inference + rich validation + existing adoption  
**Alternatives Considered**: Plain env vars, TS declarations, custom utility  
**Status**: Approved for implementation

---

## 🔗 Quick Links

```bash
# View full architecture
cat ARCHITECTURE-type-safe-env-variables.md

# View ADR only
sed -n '1182,1360p' ARCHITECTURE-type-safe-env-variables.md

# Check current implementations
ls -la templates/*/src/env*.ts templates/*/app/env*.ts
```
