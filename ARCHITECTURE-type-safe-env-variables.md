# Architecture: Type-Safe Environment Variables with Zod

**Version**: 1.0.0  
**Last Updated**: 2025-01-23  
**Status**: Proposed

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Design](#component-design)
3. [Template-Specific Designs](#template-specific-designs)
4. [Implementation Guidelines](#implementation-guidelines)
5. [Best Practices](#best-practices)
6. [Migration Strategy](#migration-strategy)
7. [ADR Template](#adr-template)

---

## Architecture Overview

### Purpose

Establish a standardized, type-safe approach to environment variable management across all scaffolding templates using Zod validation. This ensures:

- **Runtime Safety**: Catch missing or invalid environment variables at application startup
- **Type Safety**: Provide TypeScript types derived from Zod schemas
- **Developer Experience**: Clear error messages and autocomplete support
- **Consistency**: Uniform patterns across all project templates
- **Documentation**: Self-documenting schemas that serve as environment variable reference

### Technology Choice: Zod

**Rationale:**
- **Runtime Validation**: Validates environment variables at runtime, catching configuration errors early
- **Type Inference**: Automatically generates TypeScript types from schemas
- **Transformation Support**: Converts string values to appropriate types (boolean, number, etc.)
- **Rich Validation**: Supports complex validation rules (URLs, enums, optionals, etc.)
- **Composability**: Easy to compose and extend schemas
- **Error Messages**: Clear, descriptive error messages for debugging
- **Zero Dependencies**: Minimal overhead, already used across templates

### Key Architectural Decisions

1. **Separation of Client/Server Variables**
   - SSR templates use separate `env.client.ts` and `env.server.ts` files
   - SPA/Mobile templates use single `env.client.ts` file
   - Clear security boundary prevents accidental exposure of server secrets

2. **Default Export Pattern**
   - All env modules use `export default` for consistency
   - Enables clean imports: `import env from '@/env.client'`
   - Avoids naming confusion with named exports

3. **Full Object Parsing**
   - Parse entire `process.env` or `import.meta.env` object
   - Avoids manual field mapping and potential sync issues
   - Zod extracts only defined schema fields automatically

4. **Standardized File Naming**
   - `env.client.ts` for client-side variables (all templates)
   - `env.server.ts` for server-side variables (SSR only)
   - No abbreviations or alternative naming conventions

5. **Schema-First Design**
   - Schema definition drives both validation and types
   - Single source of truth for environment configuration
   - Types automatically stay in sync with validation rules

---

## Component Design

### File Structure and Naming Conventions

#### SSR Templates (Next.js, React Router v7 SSR)
```
src/  (or app/)
├── env.client.ts    # Client-side environment variables
└── env.server.ts    # Server-side environment variables
```

#### SPA Templates (React Router v7 SPA, TanStack Router)
```
src/  (or app/)
└── env.client.ts    # Client-side environment variables only
```

#### Mobile Templates (Expo React Native)
```
src/
└── env.client.ts    # Client-side environment variables only
```

### Schema Design Patterns

#### Basic Schema Structure
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  // Environment type
  MODE: z.enum(['development', 'test', 'production']),
  
  // Application environment
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  
  // Feature flags
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
  
  // URLs with validation
  VITE_APP_API_URL: z.string().url(),
  
  // Optional values
  VITE_APP_SENTRY_DSN: z.string().url().optional(),
});
```

#### Schema Naming Conventions
- `clientEnvSchema` for client-side schemas
- `serverEnvSchema` for server-side schemas
- `envSchema` only in legacy single-environment contexts (to be migrated)

#### Common Schema Patterns

**Boolean from String:**
```typescript
VITE_APP_FEATURE_ENABLED: z
  .enum(['true', 'false'])
  .transform(value => value === 'true')
```

**Number from String:**
```typescript
VITE_APP_PORT: z
  .string()
  .transform(val => parseInt(val, 10))
  .pipe(z.number().min(1024).max(65535))
```

**URL Validation:**
```typescript
VITE_APP_API_URL: z.string().url()
```

**Enum with Specific Values:**
```typescript
VITE_APP_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error'])
```

**Optional with Default:**
```typescript
VITE_APP_TIMEOUT: z
  .string()
  .transform(val => parseInt(val, 10))
  .pipe(z.number().positive())
  .default(30000)
```

### Export Patterns

#### Standard Export Pattern (Recommended)
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  MODE: z.enum(['development', 'test', 'production']),
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
});

const clientEnv = clientEnvSchema.parse(import.meta.env);

export default clientEnv;
```

#### Type Export Pattern
```typescript
// Export inferred type for advanced use cases
export type ClientEnv = z.infer<typeof clientEnvSchema>;

// Optional: Export schema for testing or extension
export { clientEnvSchema };
```

### Usage Patterns in Application Code

#### Basic Usage
```typescript
import env from '@/env.client';

// Direct property access with type safety
const apiUrl = env.VITE_APP_API_URL;
const isMswEnabled = env.VITE_APP_MSW_ENABLED; // boolean, not string

if (env.MODE === 'development') {
  console.log('Running in development mode');
}
```

#### In Services
```typescript
import ky from 'ky';
import env from '@/env.client';

export const apiClient = ky.create({
  prefixUrl: env.VITE_APP_API_URL,
  timeout: 30000,
});
```

#### Server-Side (SSR)
```typescript
import serverEnv from '@/env.server';

// Server-only variables
const dbConnection = connectToDatabase(serverEnv.DATABASE_URL);
```

#### Conditional Logic
```typescript
import env from '@/env.client';

const enableAnalytics = 
  env.VITE_APP_ENVIRONMENT === 'prod' && 
  env.VITE_APP_ANALYTICS_ENABLED;
```

---

## Template-Specific Designs

### Next.js SSR

**Location**: `src/env.client.ts` and `src/env.server.ts`

#### Client Environment (`src/env.client.ts`)
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

const clientEnv = clientEnvSchema.parse(process.env);

export default clientEnv;
```

#### Server Environment (`src/env.server.ts`)
```typescript
import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  EXAMPLE_SECRET_KEY: z.string().min(32),
  SESSION_SECRET: z.string().min(32),
});

const serverEnv = serverEnvSchema.parse(process.env);

export default serverEnv;
```

**Key Points:**
- Uses `process.env` for both client and server
- Client variables prefixed with `NEXT_PUBLIC_`
- Server-side variables never exposed to client bundle

---

### React Router v7 SSR

**Location**: `app/env.client.ts` and `app/env.server.ts`

#### Client Environment (`app/env.client.ts`)
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  MODE: z.enum(['development', 'test', 'production']),
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
});

const clientEnv = clientEnvSchema.parse(import.meta.env);

export default clientEnv;
```

#### Server Environment (`app/env.server.ts`)
```typescript
import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
});

const serverEnv = serverEnvSchema.parse(process.env);

export default serverEnv;
```

**Key Points:**
- Uses `import.meta.env` for client (Vite)
- Uses `process.env` for server
- Client variables prefixed with `VITE_APP_`
- Can share some variables between client and server

---

### React Router v7 SPA

**Location**: `app/env.client.ts`

```typescript
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

**Key Points:**
- Single file for client-only variables
- Uses `import.meta.env` (Vite)
- Variables prefixed with `VITE_APP_`

---

### TanStack Router SPA

**Location**: `src/env.client.ts` (migrate from `src/env.ts`)

#### Current State (`src/env.ts`)
```typescript
import { z } from 'zod';

const envSchema = z.object({
  MODE: z.enum(['development', 'test', 'production']),
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
});

const env = envSchema.parse(import.meta.env);

export default env;
```

#### Target State (`src/env.client.ts`)
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  MODE: z.enum(['development', 'test', 'production']),
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
});

const clientEnv = clientEnvSchema.parse(import.meta.env);

export default clientEnv;
```

**Migration Required:**
- Rename `src/env.ts` → `src/env.client.ts`
- Rename `envSchema` → `clientEnvSchema`
- Rename `env` → `clientEnv`
- Update import path from `@/env` → `@/env.client`

---

### Expo React Native

**Location**: `src/env.client.ts`

#### Current State
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_NAME: z.string().optional(),
  EXPO_PUBLIC_APP_VERSION: z.string().optional(),
});

export const clientEnv = clientEnvSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
  EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
});
```

#### Target State
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_NAME: z.string().optional(),
  EXPO_PUBLIC_APP_VERSION: z.string().optional(),
});

const clientEnv = clientEnvSchema.parse(process.env);

export default clientEnv;
```

**Migration Required:**
- Change from named export to default export
- Remove manual field mapping, parse entire `process.env`
- Update imports from `import { clientEnv }` → `import clientEnv`

---

## Implementation Guidelines

### Step-by-Step Implementation

#### For New Templates

1. **Create Schema File(s)**
   ```bash
   # SPA/Mobile templates
   touch src/env.client.ts  # or app/env.client.ts
   
   # SSR templates
   touch src/env.client.ts src/env.server.ts  # or app/
   ```

2. **Define Schema**
   ```typescript
   import { z } from 'zod';
   
   const clientEnvSchema = z.object({
     // Define all required environment variables
   });
   ```

3. **Parse Environment**
   ```typescript
   const clientEnv = clientEnvSchema.parse(import.meta.env); // or process.env
   ```

4. **Export Default**
   ```typescript
   export default clientEnv;
   ```

5. **Configure Path Alias**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "paths": {
         "@/env.client": ["./src/env.client"],
         "@/env.server": ["./src/env.server"]
       }
     }
   }
   ```

6. **Document Variables**
   Create `.env.example` file:
   ```bash
   # Application Environment
   VITE_APP_ENVIRONMENT=dev
   
   # Feature Flags
   VITE_APP_MSW_ENABLED=true
   
   # API Configuration
   VITE_APP_API_URL=https://api.example.com
   ```

#### For Existing Templates (Migration)

**TanStack Router SPA Migration:**

1. **Rename File**
   ```bash
   git mv src/env.ts src/env.client.ts
   ```

2. **Update File Content**
   ```typescript
   // Change schema name
   - const envSchema = z.object({
   + const clientEnvSchema = z.object({
   
   // Change variable name
   - const env = envSchema.parse(import.meta.env);
   + const clientEnv = clientEnvSchema.parse(import.meta.env);
   
   // Exports remain the same
   export default clientEnv;
   ```

3. **Update All Imports**
   ```bash
   # Find all imports
   grep -r "from '@/env'" src/
   
   # Update each file
   - import env from '@/env';
   + import env from '@/env.client';
   ```

4. **Update Path Alias**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "paths": {
   -     "@/env": ["./src/env"],
   +     "@/env.client": ["./src/env.client"]
       }
     }
   }
   ```

**Expo React Native Migration:**

1. **Update Export Pattern**
   ```typescript
   // src/env.client.ts
   - export const clientEnv = clientEnvSchema.parse({
   -   EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
   -   EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
   -   EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
   - });
   
   + const clientEnv = clientEnvSchema.parse(process.env);
   + export default clientEnv;
   ```

2. **Update All Imports**
   ```bash
   # Find all imports
   grep -r "from '@/env.client'" src/
   
   # Update each file
   - import { clientEnv } from '@/env.client';
   + import clientEnv from '@/env.client';
   ```

### Code Migration Examples

#### Before and After: Import Pattern

**Before (Inconsistent):**
```typescript
// TanStack Router
import env from '@/env';

// Expo
import { clientEnv } from '@/env.client';

// React Router SSR
import clientEnv from '@/env.client';
```

**After (Consistent):**
```typescript
// All templates
import env from '@/env.client';

// SSR templates also have
import serverEnv from '@/env.server';
```

#### Before and After: Usage Pattern

**Before (Expo - Named Export):**
```typescript
import { clientEnv } from '@/env.client';

export const apiClient = ky.create({
  prefixUrl: clientEnv.EXPO_PUBLIC_API_URL,
});
```

**After (Expo - Default Export):**
```typescript
import env from '@/env.client';

export const apiClient = ky.create({
  prefixUrl: env.EXPO_PUBLIC_API_URL,
});
```

#### Before and After: Parsing Pattern

**Before (Manual Mapping):**
```typescript
export const clientEnv = clientEnvSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
  EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
});
```

**After (Full Object Parsing):**
```typescript
const clientEnv = clientEnvSchema.parse(process.env);
export default clientEnv;
```

### Testing Approach

#### Unit Tests for Environment Parsing

```typescript
// env.client.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('clientEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset modules to ensure clean slate
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

  it('should throw error for invalid environment variables', async () => {
    process.env = {
      ...originalEnv,
      VITE_APP_ENVIRONMENT: 'invalid',
    };

    await expect(async () => {
      await import('./env.client');
    }).rejects.toThrow();
  });

  it('should throw error for missing required variables', async () => {
    process.env = { ...originalEnv };
    delete process.env.VITE_APP_ENVIRONMENT;

    await expect(async () => {
      await import('./env.client');
    }).rejects.toThrow();
  });

  it('should handle optional variables', async () => {
    process.env = {
      ...originalEnv,
      VITE_APP_ENVIRONMENT: 'dev',
      VITE_APP_MSW_ENABLED: 'false',
    };

    const { default: env } = await import('./env.client');

    expect(env.VITE_APP_SENTRY_DSN).toBeUndefined();
  });
});
```

#### Integration Tests

```typescript
// In application tests, mock the env module
vi.mock('@/env.client', () => ({
  default: {
    MODE: 'test',
    VITE_APP_ENVIRONMENT: 'dev',
    VITE_APP_MSW_ENABLED: true,
  },
}));
```

### Validation Strategy

#### Startup Validation

Environment validation happens at module load time:
```typescript
// This runs immediately when imported
const clientEnv = clientEnvSchema.parse(import.meta.env);
```

**Benefits:**
- Fails fast at application startup
- Prevents runtime errors in production
- Clear error messages for developers

#### Pre-Deployment Validation

Add to CI/CD pipeline:
```bash
# .github/workflows/ci.yml
- name: Validate Environment Schema
  run: |
    # Create test env file
    cp .env.example .env
    
    # Run type check (will fail if env is invalid)
    pnpm type-check
```

#### Development Environment Validation

Add to `package.json`:
```json
{
  "scripts": {
    "dev": "pnpm validate-env && vite",
    "validate-env": "tsx scripts/validate-env.ts"
  }
}
```

```typescript
// scripts/validate-env.ts
import { clientEnvSchema } from '../src/env.client';

try {
  clientEnvSchema.parse(process.env);
  console.log('✓ Environment variables are valid');
  process.exit(0);
} catch (error) {
  console.error('✗ Invalid environment variables:');
  console.error(error);
  process.exit(1);
}
```

---

## Best Practices

### Error Handling Patterns

#### Graceful Degradation
```typescript
const clientEnvSchema = z.object({
  VITE_APP_ANALYTICS_ID: z.string().optional(),
});

// In application code
if (env.VITE_APP_ANALYTICS_ID) {
  initializeAnalytics(env.VITE_APP_ANALYTICS_ID);
} else {
  console.warn('Analytics disabled: VITE_APP_ANALYTICS_ID not configured');
}
```

#### Strict Required Variables
```typescript
const clientEnvSchema = z.object({
  VITE_APP_API_URL: z.string().url(), // Required - will throw if missing
});
```

#### Custom Error Messages
```typescript
const clientEnvSchema = z.object({
  VITE_APP_API_URL: z
    .string()
    .url()
    .refine(
      url => url.startsWith('https://'),
      'API URL must use HTTPS in production'
    ),
});
```

### Type Export Patterns

#### Basic Type Export
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
});

const clientEnv = clientEnvSchema.parse(import.meta.env);

// Export type for advanced use cases
export type ClientEnv = z.infer<typeof clientEnvSchema>;

export default clientEnv;
```

#### Using Exported Types
```typescript
import env, { type ClientEnv } from '@/env.client';

function configureApp(environment: ClientEnv) {
  // Type-safe configuration
}

configureApp(env);
```

#### Extending Environment Types
```typescript
// For testing or mocking
import { type ClientEnv } from '@/env.client';

const mockEnv: ClientEnv = {
  MODE: 'test',
  VITE_APP_ENVIRONMENT: 'dev',
  VITE_APP_MSW_ENABLED: true,
};
```

### Documentation Standards

#### Inline Documentation
```typescript
const clientEnvSchema = z.object({
  /**
   * Application environment tier
   * - dev: Local development
   * - qa: QA testing environment
   * - staging: Pre-production environment
   * - prod: Production environment
   */
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),

  /**
   * Mock Service Worker (MSW) enabled flag
   * Set to 'true' to enable API mocking in development
   */
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
});
```

#### .env.example Documentation
```bash
###############################################################################
# CLIENT-SIDE ENVIRONMENT VARIABLES
# These variables are bundled into the client application
# DO NOT include secrets or sensitive data
###############################################################################

# Application Environment (dev | qa | staging | prod)
VITE_APP_ENVIRONMENT=dev

# Enable Mock Service Worker for API mocking in development
# Set to 'true' to enable, 'false' to disable
VITE_APP_MSW_ENABLED=true

# API Base URL
# Must be a valid HTTPS URL in production
VITE_APP_API_URL=https://api.example.com

###############################################################################
# SERVER-SIDE ENVIRONMENT VARIABLES (SSR only)
# These variables are only available on the server
# Safe for secrets and sensitive configuration
###############################################################################

# Database connection string
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Session secret for cookie encryption (minimum 32 characters)
SESSION_SECRET=your-secret-key-here-minimum-32-chars
```

#### README Documentation
```markdown
## Environment Variables

This project uses type-safe environment variables validated with Zod.

### Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update values in `.env` for your local development

### Available Variables

See [Environment Variables Documentation](./docs/environment-variables.md) for a complete list of available variables and their purposes.

### Validation

Environment variables are validated at application startup. If a required variable is missing or invalid, the application will fail to start with a clear error message.

```

### Common Pitfalls to Avoid

#### ❌ Manual Field Mapping
```typescript
// DON'T: Manually map each field
const clientEnv = clientEnvSchema.parse({
  VITE_APP_ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT,
  VITE_APP_MSW_ENABLED: import.meta.env.VITE_APP_MSW_ENABLED,
});
```

```typescript
// DO: Parse entire object
const clientEnv = clientEnvSchema.parse(import.meta.env);
```

#### ❌ Named Exports
```typescript
// DON'T: Use named export
export const clientEnv = clientEnvSchema.parse(import.meta.env);
```

```typescript
// DO: Use default export
const clientEnv = clientEnvSchema.parse(import.meta.env);
export default clientEnv;
```

#### ❌ Inconsistent File Naming
```typescript
// DON'T: Use abbreviated or inconsistent names
src/env.ts
src/envClient.ts
src/clientEnv.ts
```

```typescript
// DO: Use standardized naming
src/env.client.ts
src/env.server.ts
```

#### ❌ Forgetting Transformations
```typescript
// DON'T: Leave boolean as string
VITE_APP_MSW_ENABLED: z.enum(['true', 'false'])

// Later in code
if (env.VITE_APP_MSW_ENABLED === 'true') { ... } // String comparison
```

```typescript
// DO: Transform to boolean
VITE_APP_MSW_ENABLED: z
  .enum(['true', 'false'])
  .transform(value => value === 'true')

// Later in code
if (env.VITE_APP_MSW_ENABLED) { ... } // Boolean check
```

#### ❌ Exposing Server Variables to Client
```typescript
// DON'T: Include server variables in client schema
const clientEnvSchema = z.object({
  DATABASE_URL: z.string().url(), // SECURITY RISK!
  SECRET_KEY: z.string(), // SECURITY RISK!
});
```

```typescript
// DO: Keep server variables in server schema
// src/env.server.ts
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string(),
});
```

#### ❌ Weak Validation
```typescript
// DON'T: Use weak validation
VITE_APP_API_URL: z.string() // Accepts any string
```

```typescript
// DO: Use strong validation
VITE_APP_API_URL: z.string().url() // Must be valid URL
```

#### ❌ Missing Optional Handling
```typescript
// DON'T: Treat optional values as required
const apiKey = env.VITE_APP_API_KEY; // Type error if optional
callApiWith(apiKey);
```

```typescript
// DO: Handle optional values properly
if (env.VITE_APP_API_KEY) {
  callApiWith(env.VITE_APP_API_KEY);
}
```

---

## Migration Strategy

### Safe Migration Path

#### Phase 1: Assessment (1 hour)

1. **Audit Current State**
   ```bash
   # Find all env files
   find templates -name "env*.ts" -type f
   
   # Check import patterns
   grep -r "from '@/env" templates/*/src templates/*/app
   ```

2. **Document Deviations**
   - tanstack-router-spa: Uses `env.ts` instead of `env.client.ts`
   - expo-react-native: Uses named export and manual mapping

3. **Identify Impact**
   - tanstack-router-spa: Low impact, file rename + import updates
   - expo-react-native: Low impact, export pattern change + import updates

#### Phase 2: TanStack Router SPA Migration (2 hours)

1. **Create Feature Branch**
   ```bash
   git checkout -b standardize-env-tanstack-router
   ```

2. **Rename File**
   ```bash
   cd templates/tanstack-router-spa
   git mv src/env.ts src/env.client.ts
   ```

3. **Update File Content**
   ```typescript
   // src/env.client.ts
   import { z } from 'zod';

   - const envSchema = z.object({
   + const clientEnvSchema = z.object({
     MODE: z.enum(['development', 'test', 'production']),
     VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
     VITE_APP_MSW_ENABLED: z
       .enum(['true', 'false'])
       .transform(value => value === 'true'),
   });

   - const env = envSchema.parse(import.meta.env);
   + const clientEnv = clientEnvSchema.parse(import.meta.env);

   - export default env;
   + export default clientEnv;
   ```

4. **Update Import Path**
   ```bash
   # Find files importing env
   grep -r "from '@/env'" src/
   
   # Update each file
   sed -i "s/@\/env'/@\/env.client'/g" src/**/*.ts src/**/*.tsx
   ```

5. **Update TypeScript Config**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "paths": {
   -     "@/env": ["./src/env"],
   +     "@/env.client": ["./src/env.client"]
       }
     }
   }
   ```

6. **Test Changes**
   ```bash
   pnpm install
   pnpm type-check
   pnpm test
   pnpm build
   ```

7. **Update Documentation**
   ```markdown
   // README.md
   - Import environment variables: `import env from '@/env'`
   + Import environment variables: `import env from '@/env.client'`
   ```

#### Phase 3: Expo React Native Migration (2 hours)

1. **Create Feature Branch**
   ```bash
   git checkout -b standardize-env-expo
   ```

2. **Update Export Pattern**
   ```typescript
   // src/env.client.ts
   import { z } from 'zod';

   const clientEnvSchema = z.object({
     EXPO_PUBLIC_API_URL: z.string().url(),
     EXPO_PUBLIC_APP_NAME: z.string().optional(),
     EXPO_PUBLIC_APP_VERSION: z.string().optional(),
   });

   - export const clientEnv = clientEnvSchema.parse({
   -   EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
   -   EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
   -   EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
   - });

   + const clientEnv = clientEnvSchema.parse(process.env);
   + export default clientEnv;
   ```

3. **Update All Imports**
   ```bash
   # Find files importing env
   grep -r "from '@/env.client'" src/
   
   # Manual update required (each file)
   - import { clientEnv } from '@/env.client';
   + import env from '@/env.client';
   
   # Update usage
   - clientEnv.EXPO_PUBLIC_API_URL
   + env.EXPO_PUBLIC_API_URL
   ```

4. **Test Changes**
   ```bash
   pnpm install
   pnpm type-check
   pnpm test
   pnpm lint
   ```

5. **Update Documentation**
   ```markdown
   // README.md
   - Import environment variables: `import { clientEnv } from '@/env.client'`
   + Import environment variables: `import env from '@/env.client'`
   ```

#### Phase 4: Validation (1 hour)

1. **Cross-Template Verification**
   ```bash
   # Verify all templates use consistent pattern
   for template in next-ssr react-router-v7-ssr react-router-v7-spa tanstack-router-spa expo-react-native; do
     echo "Checking $template..."
     ls -la templates/$template/src/env*.ts templates/$template/app/env*.ts 2>/dev/null || true
   done
   ```

2. **Import Pattern Verification**
   ```bash
   # Verify consistent imports
   grep -r "from '@/env" templates/*/src templates/*/app | grep -v "node_modules"
   ```

3. **Build Verification**
   ```bash
   # Build all templates
   pnpm build
   ```

### Breaking Changes Assessment

#### TanStack Router SPA

**Breaking Changes:**
- Import path changes from `@/env` to `@/env.client`

**Impact:**
- Low - Only affects import statements
- Auto-fixable with find/replace

**Mitigation:**
- Clear migration guide in CHANGELOG
- Codemod script for automatic migration

#### Expo React Native

**Breaking Changes:**
- Export pattern changes from named to default
- Import pattern changes from destructured to default

**Impact:**
- Low - Only affects import statements and usage
- Requires manual updates to import statements

**Mitigation:**
- Clear migration guide in CHANGELOG
- Example code showing before/after

**Migration Codemod:**
```typescript
// scripts/migrate-expo-env-imports.ts
import fs from 'fs';
import path from 'path';

function migrateFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace import
  content = content.replace(
    /import\s+{\s*clientEnv\s*}\s+from\s+['"]@\/env\.client['"]/g,
    "import env from '@/env.client'"
  );
  
  // Replace usage
  content = content.replace(/clientEnv\./g, 'env.');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

// Usage: tsx scripts/migrate-expo-env-imports.ts
```

### Rollback Plan

#### If Migration Fails

1. **Revert Git Changes**
   ```bash
   git checkout main
   git branch -D standardize-env-tanstack-router
   git branch -D standardize-env-expo
   ```

2. **Restore Previous State**
   - All changes are in feature branches
   - Main branch remains untouched
   - No production impact

3. **Document Issues**
   - Create GitHub issue with error details
   - Note any unexpected dependencies
   - Plan remediation

#### Rollback Procedure per Template

**TanStack Router SPA:**
```bash
# Revert file rename
git mv src/env.client.ts src/env.ts

# Revert content changes
git checkout HEAD -- src/env.ts

# Revert tsconfig changes
git checkout HEAD -- tsconfig.json
```

**Expo React Native:**
```bash
# Revert export changes
git checkout HEAD -- src/env.client.ts
```

---

## ADR Template

### Complete ADR for Type-Safe Environment Variables

```markdown
# ADR-001: Type-Safe Environment Variables with Zod

**Status**: Accepted  
**Date**: 2025-01-23

---

## Context

Environment variables are a critical part of application configuration, controlling everything from API endpoints to feature flags. However, environment variables present several challenges:

1. **Runtime Errors**: Missing or invalid environment variables often cause runtime errors in production
2. **Type Safety**: Environment variables are typically untyped strings, leading to type errors
3. **Documentation**: It's difficult to know which variables are required and their valid values
4. **Validation**: No standard approach to validate environment variable values
5. **Security**: Risk of accidentally exposing server secrets to client bundles
6. **Inconsistency**: Different templates use different patterns for managing environment variables

The scaffolding templates repository contains 6 templates (5 applicable for this pattern). While most templates already use Zod for environment validation, there are inconsistencies:

- **tanstack-router-spa** uses `env.ts` instead of `env.client.ts`
- **expo-react-native** uses named export (`export const`) and manual field mapping
- **Other templates** follow the standard pattern consistently

We need a standardized, type-safe approach to environment variable management that:
- Provides compile-time and runtime type safety
- Validates environment variables at application startup
- Clearly separates client and server variables
- Offers excellent developer experience with autocomplete and error messages
- Maintains consistency across all templates

## Decision Drivers

- **Type Safety**: Compile-time type checking and runtime validation
- **Developer Experience**: Clear error messages, autocomplete, and documentation
- **Security**: Prevention of server secret exposure to client bundles
- **Consistency**: Uniform patterns across all templates
- **Performance**: Minimal runtime overhead
- **Maintainability**: Easy to add, modify, and document variables
- **Fail Fast**: Catch configuration errors at startup, not in production

## Options Considered

### Option 1: Plain Environment Variables (Status Quo Alternative)

**Approach:**
```typescript
// No validation or type safety
const apiUrl = process.env.VITE_APP_API_URL;
const mswEnabled = process.env.VITE_APP_MSW_ENABLED === 'true';
```

**Pros:**
- No additional dependencies
- Simple and straightforward
- No learning curve
- Zero runtime overhead

**Cons:**
- No type safety - all values are `string | undefined`
- No validation - invalid values cause runtime errors
- No autocomplete or IDE support
- Easy to typo variable names
- No documentation of required variables
- No protection against missing variables
- String-to-type conversions scattered throughout codebase

### Option 2: TypeScript Declaration Files

**Approach:**
```typescript
// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_APP_API_URL: string;
      VITE_APP_MSW_ENABLED: 'true' | 'false';
    }
  }
}
```

**Pros:**
- Provides compile-time type safety
- IDE autocomplete support
- No runtime dependencies
- TypeScript-native approach

**Cons:**
- No runtime validation - types don't exist at runtime
- No protection against missing variables
- No validation of variable values
- Types can drift from actual environment
- No transformation support (string to boolean)
- Requires manual synchronization between declaration and usage

### Option 3: Zod Schema Validation (Selected)

**Approach:**
```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  VITE_APP_API_URL: z.string().url(),
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
});

const clientEnv = clientEnvSchema.parse(import.meta.env);
export default clientEnv;
```

**Pros:**
- Runtime validation catches errors at startup
- Automatic type inference from schema
- Rich validation rules (URLs, enums, etc.)
- Transformation support (string to boolean/number)
- Clear, descriptive error messages
- Self-documenting schemas
- IDE autocomplete support
- Single source of truth for types and validation
- Already used across most templates
- Minimal bundle size impact (~10kb)

**Cons:**
- Additional dependency (Zod)
- Small runtime overhead (one-time at startup)
- Requires learning Zod schema syntax
- Slightly more verbose than plain variables

### Option 4: Custom Validation Utility

**Approach:**
```typescript
const env = {
  apiUrl: requireEnv('VITE_APP_API_URL'),
  mswEnabled: requireBooleanEnv('VITE_APP_MSW_ENABLED'),
};

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
}
```

**Pros:**
- No external dependencies
- Custom tailored to specific needs
- Simple implementation
- Full control over error messages

**Cons:**
- Requires maintaining custom code
- Limited validation capabilities
- No automatic type inference
- Must manually define TypeScript types
- Less robust than established libraries
- Doesn't handle complex transformations well
- Reinventing the wheel

## Decision

**We will use Zod schema validation for type-safe environment variables across all templates.**

This decision was made because:

1. **Runtime Safety**: Zod provides runtime validation that catches configuration errors at application startup, before they cause issues in production. This fail-fast approach prevents subtle bugs and production incidents.

2. **Type Safety**: Zod automatically infers TypeScript types from schemas, eliminating the need to maintain separate type definitions. Types are guaranteed to match runtime validation rules.

3. **Rich Validation**: Zod supports comprehensive validation rules (URLs, enums, transformations, etc.) that go beyond simple presence checks. This ensures environment variables are not just present, but also valid.

4. **Developer Experience**: Zod provides excellent error messages, IDE autocomplete, and self-documenting schemas. Developers immediately know what variables are required and their valid formats.

5. **Existing Adoption**: 5 out of 6 applicable templates already use Zod for environment validation, making this a low-friction standardization.

6. **Battle-Tested**: Zod is a mature, well-maintained library with strong community support and proven production usage.

7. **Minimal Overhead**: The runtime overhead is negligible (one-time parse at startup), and the bundle size impact is small (~10kb gzipped).

8. **Security**: Clear separation between client and server environment files prevents accidental exposure of server secrets.

### Implementation Standards

**File Structure:**
- SSR Templates: `env.client.ts` + `env.server.ts`
- SPA/Mobile Templates: `env.client.ts` only

**Export Pattern:**
- Use `export default` for consistency
- Avoid named exports

**Parsing Pattern:**
- Parse entire environment object (`process.env` or `import.meta.env`)
- Avoid manual field mapping

**Naming Convention:**
- Schema: `clientEnvSchema` or `serverEnvSchema`
- Variable: `clientEnv` or `serverEnv`
- File: `env.client.ts` or `env.server.ts`

### Migration Path

**TanStack Router SPA:**
- Rename `env.ts` → `env.client.ts`
- Update import paths from `@/env` → `@/env.client`
- Update schema/variable names for consistency

**Expo React Native:**
- Change from named export to default export
- Remove manual field mapping
- Update import statements

**Timeline:**
- Phase 1: TanStack Router SPA (1 sprint)
- Phase 2: Expo React Native (1 sprint)
- Phase 3: Documentation updates (concurrent)

### Success Criteria

- All templates use consistent env file patterns
- All templates use default export
- All templates parse full environment object
- Documentation updated across all templates
- Zero breaking changes to end users
- All tests passing
- Build succeeds for all templates
