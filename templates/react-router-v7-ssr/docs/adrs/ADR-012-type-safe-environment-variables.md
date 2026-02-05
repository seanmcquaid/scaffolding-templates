# ADR-012: Type-Safe Environment Variables with Zod

**Status**: Accepted

**Date**: 2026-02-04

**Decision Makers**: Template Author

**Tags**: #environment #configuration #type-safety #zod #validation

---

## Context

Modern web applications require configuration through environment variables for different deployment environments (development, staging, production). These environment variables control application behavior, API endpoints, feature flags, and sensitive credentials.

However, environment variables in Node.js and browser environments present several challenges:

1. **No Type Safety**: `process.env` returns `string | undefined` for all variables, losing type information
2. **Runtime Errors**: Missing or malformed environment variables cause runtime crashes
3. **No Validation**: No guarantee that variables exist or have valid values
4. **Poor Developer Experience**: No IDE autocomplete or type checking
5. **Security Risks**: Easy to accidentally expose server-side secrets to the client
6. **Complex Transformations**: Converting strings to booleans, numbers, URLs requires manual code

For a React Router v7 SSR application, we also need to:
- Clearly separate server-side and client-side environment variables
- Validate variables at application startup, not during runtime
- Provide clear error messages when configuration is invalid
- Support type transformations (string to boolean, number, URL, etc.)
- Enable TypeScript autocomplete for all environment variables

## Decision Drivers

- **Type Safety**: Environment variables must have strong TypeScript types
- **Early Failure**: Invalid configuration should fail at startup, not in production
- **Developer Experience**: IDE autocomplete and clear error messages
- **Security**: Clear separation between server and client variables
- **Maintainability**: Easy to add new variables and understand existing ones
- **Performance**: Validation should happen once at startup, not on every access

## Options Considered

### Option 1: Plain process.env (Status Quo)

**Description**: Use raw `process.env` directly throughout the application.

**Pros:**
- No additional dependencies
- Simple and straightforward
- No learning curve

**Cons:**
- No type safety - everything is `string | undefined`
- No validation - missing variables cause runtime errors
- No IDE autocomplete
- No transformation support
- Easy to make mistakes
- Hard to find all usages

### Option 2: Custom Validation Functions

**Description**: Create custom validation and type conversion functions for each variable.

**Pros:**
- Full control over validation logic
- No external dependencies
- Can customize error messages

**Cons:**
- Need to write and maintain custom validation code
- Reinventing the wheel for common patterns
- No standard schema definition
- Error-prone manual type definitions
- More code to maintain

### Option 3: Zod Schema Validation

**Description**: Use Zod to define typed schemas for environment variables with automatic validation and transformation.

**Pros:**
- Strong type safety with TypeScript inference
- Comprehensive validation with clear error messages
- Built-in transformations (string to boolean, number, etc.)
- Single source of truth for types and validation
- Excellent IDE autocomplete support
- Validates once at startup
- Proven, well-maintained library
- Clear separation of concerns (schemas vs. usage)

**Cons:**
- Additional dependency (~14KB gzipped)
- Learning curve for Zod schema syntax
- Slightly more verbose than raw process.env

### Option 4: Vite's import.meta.env with Manual Types

**Description**: Use Vite's built-in environment variable support with manual type definitions.

**Pros:**
- No additional validation library needed
- Built into Vite

**Cons:**
- No runtime validation
- Manual type definitions required
- No transformation support
- Types can diverge from reality

## Decision

**We will use Zod schema validation with separate server and client environment files.**

This decision was made because:

1. **Best Balance**: Zod provides the best balance of type safety, validation, developer experience, and simplicity
2. **Type Inference**: Zod's `z.infer` automatically generates perfect TypeScript types from schemas
3. **Clear Errors**: Zod provides detailed, actionable error messages when validation fails
4. **Transformations**: Built-in support for string-to-boolean, string-to-number, URL validation, etc.
5. **Security**: File-level separation (env.server.ts vs env.client.ts) prevents accidental client exposure
6. **Developer Experience**: Excellent IDE autocomplete from inferred types
7. **Startup Validation**: Validation happens once at application startup, failing fast if misconfigured
8. **Ecosystem Fit**: Zod is already used throughout the template for API validation (consistency)

## Implementation

### File Structure

```
app/
├── env.server.ts    # Server-side environment variables
└── env.client.ts    # Client-side environment variables (VITE_*)
```

### Server Environment Variables (app/env.server.ts)

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

### Client Environment Variables (app/env.client.ts)

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

### Usage in Application Code

```typescript
// Server-side code (loaders, actions, entry.server.tsx)
import serverEnv from '~/env.server';

console.log(serverEnv.NODE_ENV);               // 'development' | 'test' | 'production' (typed!)
console.log(serverEnv.VITE_APP_MSW_ENABLED);   // boolean (typed!)

// Client-side code (components, entry.client.tsx)
import env from '~/env.client';

console.log(env.MODE);                   // 'development' | 'test' | 'production' (typed!)
console.log(env.VITE_APP_ENVIRONMENT);   // 'dev' | 'qa' | 'staging' | 'prod' (typed!)
```

### Environment File (.env.example)

```bash
# Application environment
VITE_APP_ENVIRONMENT=dev
VITE_APP_MSW_ENABLED=false

# Server-only variables (not exposed to browser)
EXAMPLE_SECRET_KEY=example
```

## Consequences

### Positive Consequences

- ✅ **Type Safety**: Full TypeScript support with inferred types
- ✅ **Early Failure**: Application fails at startup with clear error if misconfigured
- ✅ **IDE Support**: Autocomplete and type checking for all environment variables
- ✅ **Clear Errors**: Zod provides detailed validation error messages
- ✅ **Security**: File-level separation prevents accidental exposure of secrets
- ✅ **Transformations**: Built-in support for booleans, numbers, URLs, enums
- ✅ **Maintainability**: Single schema is source of truth for types and validation
- ✅ **Documentation**: Schema serves as living documentation
- ✅ **Consistency**: Same validation approach used for API schemas

### Negative Consequences / Trade-offs

- ⚠️ **Dependency**: Adds Zod as a dependency (~14KB)
- ⚠️ **Learning Curve**: Developers need to learn Zod schema syntax
- ⚠️ **Verbosity**: More verbose than raw `import.meta.env` access
- ⚠️ **Build-Time Variables**: Vite inlines variables at build time

### Risks and Mitigations

- **Risk**: Developers might bypass env files and use import.meta.env directly
  - **Mitigation**: Add ESLint rule to prevent direct import.meta.env usage; document in README
  
- **Risk**: Forgetting to add variables to both .env and schema
  - **Mitigation**: Application fails immediately at startup with clear error message
  
- **Risk**: Confusion about server vs. client variables
  - **Mitigation**: Clear naming (env.server.ts vs env.client.ts) and comprehensive documentation

## Best Practices

1. **Always Define Schema First**: Add variable to schema before using in code
2. **Use Specific Types**: Use `z.enum()`, `z.number()`, `z.url()` instead of `z.string()`
3. **Provide Defaults**: Use `.default()` for optional variables with fallback values
4. **Document Variables**: Add comments in .env.example explaining each variable
5. **Never Expose Secrets**: Keep server-only variables in env.server.ts
6. **Validate at Import**: Schemas parse immediately when imported (fail-fast)

## Common Patterns

### String to Boolean Transformation

```typescript
const schema = z.object({
  VITE_FEATURE_FLAG: z
    .enum(['true', 'false'])
    .transform(value => value === 'true')
    .default('false'),
});
```

### Optional with Default

```typescript
const schema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});
```

### URL Validation

```typescript
const schema = z.object({
  VITE_API_URL: z.string().url(),
  DATABASE_URL: z.string().url().optional(),
});
```

## Related Decisions

- [ADR-008: API Client with Zod Validation](./ADR-008-api-client.md) - Uses Zod for API response validation
- [ADR-009: Form Handling with React Hook Form and Zod](./ADR-009-form-handling.md) - Uses Zod for form validation

## References

- [Zod Documentation](https://zod.dev/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Router v7 Documentation](https://reactrouter.com/)
- [TypeScript Handbook - Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)

## Review and Update History

- 2026-02-04: Initial decision (Status: Accepted)
