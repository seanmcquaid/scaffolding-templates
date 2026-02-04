# ADR-012: Type-Safe Environment Variables with Zod

**Status**: Accepted

**Date**: 2026-02-04

**Decision Makers**: Template Author

**Tags**: #environment #configuration #type-safety #zod #validation #expo

---

## Context

Modern mobile applications require configuration through environment variables for different deployment environments (development, staging, production). These environment variables control application behavior, API endpoints, feature flags, and app metadata.

However, environment variables in React Native/Expo present several challenges:

1. **No Type Safety**: `process.env` returns `string | undefined` for all variables, losing type information
2. **Runtime Errors**: Missing or malformed environment variables cause runtime crashes
3. **No Validation**: No guarantee that variables exist or have valid values
4. **Poor Developer Experience**: No IDE autocomplete or type checking
5. **Complex Transformations**: Converting strings to booleans, numbers, URLs requires manual code
6. **Expo-Specific**: Must use EXPO_PUBLIC_ prefix for client-side variables

For an Expo React Native application, we need to:
- Validate client-side environment variables at application startup
- Provide clear error messages when configuration is invalid
- Support type transformations (string to boolean, number, URL, etc.)
- Enable TypeScript autocomplete for all environment variables
- Handle Expo's EXPO_PUBLIC_ prefix convention

## Decision Drivers

- **Type Safety**: Environment variables must have strong TypeScript types
- **Early Failure**: Invalid configuration should fail at startup, not in production
- **Developer Experience**: IDE autocomplete and clear error messages
- **Maintainability**: Easy to add new variables and understand existing ones
- **Performance**: Validation should happen once at startup, not on every access
- **Expo Compatibility**: Must work with Expo's environment variable system

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

### Option 4: react-native-dotenv

**Description**: Use react-native-dotenv for environment variables.

**Pros:**
- Popular in React Native community
- Babel plugin integration

**Cons:**
- No runtime validation
- No type safety without additional work
- Babel configuration complexity
- Doesn't work well with Expo

## Decision

**We will use Zod schema validation for client-side environment variables.**

This decision was made because:

1. **Best Balance**: Zod provides the best balance of type safety, validation, developer experience, and simplicity
2. **Type Inference**: Zod's `z.infer` automatically generates perfect TypeScript types from schemas
3. **Clear Errors**: Zod provides detailed, actionable error messages when validation fails
4. **Transformations**: Built-in support for string-to-boolean, string-to-number, URL validation, etc.
5. **Developer Experience**: Excellent IDE autocomplete from inferred types
6. **Startup Validation**: Validation happens once at application startup, failing fast if misconfigured
7. **Ecosystem Fit**: Zod is already used throughout the template for API validation (consistency)
8. **Expo Compatible**: Works perfectly with Expo's EXPO_PUBLIC_ prefix system

## Implementation

### File Structure

```
src/
└── env.ts    # Client-side environment variables (EXPO_PUBLIC_*)
```

### Client Environment Variables (src/env.ts)

```typescript
import { z } from 'zod';

const clientEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_NAME: z.string().optional(),
  EXPO_PUBLIC_APP_VERSION: z.string().optional(),
});

const clientEnv = clientEnvSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
  EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
});

export default clientEnv;
```

### Usage in Application Code

```typescript
// Client-side code (components, screens)
import clientEnv from '@/env';

console.log(clientEnv.EXPO_PUBLIC_API_URL);     // string (typed!)
console.log(clientEnv.EXPO_PUBLIC_APP_NAME);    // string | undefined (typed!)
```

### Environment File (.env.example)

```bash
# Client-side variables (exposed to app)
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_APP_NAME=My App
EXPO_PUBLIC_APP_VERSION=1.0.0
```

## Consequences

### Positive Consequences

- ✅ **Type Safety**: Full TypeScript support with inferred types
- ✅ **Early Failure**: Application fails at startup with clear error if misconfigured
- ✅ **IDE Support**: Autocomplete and type checking for all environment variables
- ✅ **Clear Errors**: Zod provides detailed validation error messages
- ✅ **Transformations**: Built-in support for booleans, numbers, URLs, enums
- ✅ **Maintainability**: Single schema is source of truth for types and validation
- ✅ **Documentation**: Schema serves as living documentation
- ✅ **Consistency**: Same validation approach used for API schemas
- ✅ **Expo Compatible**: Works with Expo's environment variable system

### Negative Consequences / Trade-offs

- ⚠️ **Dependency**: Adds Zod as a dependency (~14KB)
- ⚠️ **Learning Curve**: Developers need to learn Zod schema syntax
- ⚠️ **Verbosity**: More verbose than raw `process.env` access
- ⚠️ **Manual Mapping**: Need to manually map process.env fields to schema

### Risks and Mitigations

- **Risk**: Developers might bypass env files and use process.env directly
  - **Mitigation**: Add ESLint rule to prevent direct process.env usage; document in README
  
- **Risk**: Forgetting to add variables to both .env and schema
  - **Mitigation**: Application fails immediately at startup with clear error message

- **Risk**: Forgetting to map new variables in the parse object
  - **Mitigation**: TypeScript will error if schema and parse object don't match

## Best Practices

1. **Always Define Schema First**: Add variable to schema before using in code
2. **Use Specific Types**: Use `z.enum()`, `z.number()`, `z.url()` instead of `z.string()`
3. **Provide Defaults**: Use `.default()` for optional variables with fallback values
4. **Document Variables**: Add comments in .env.example explaining each variable
5. **Validate at Import**: Schema parses immediately when imported (fail-fast)
6. **Use EXPO_PUBLIC_ Prefix**: All client-side variables must use this prefix

## Common Patterns

### URL Validation

```typescript
const schema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
});
```

### Optional with Default

```typescript
const schema = z.object({
  EXPO_PUBLIC_APP_NAME: z.string().default('My App'),
  EXPO_PUBLIC_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});
```

### Version String

```typescript
const schema = z.object({
  EXPO_PUBLIC_APP_VERSION: z.string().regex(/^\d+\.\d+\.\d+$/),
});
```

## Related Decisions

- [ADR-007: API Client with Zod Validation](./ADR-007-api-client.md) - Uses Zod for API response validation
- [ADR-008: Form Handling with React Hook Form and Zod](./ADR-008-form-handling.md) - Uses Zod for form validation

## References

- [Zod Documentation](https://zod.dev/)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook - Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)

## Review and Update History

- 2026-02-04: Initial decision (Status: Accepted)
