---
name: typescript-library-development
description: Expert in TypeScript library development with dual ESM/CJS exports, build optimization, and NPM publishing. Specializes in creating reusable, type-safe libraries.
---

# TypeScript Library Development

Build production-ready TypeScript libraries with modern tooling, dual package support, and excellent developer experience.

## When to Use

Use this skill for TypeScript library projects that need:
- Dual package exports (ESM + CommonJS)
- Comprehensive TypeScript type definitions
- Tree-shakeable builds
- NPM publishing workflow
- Bundle size optimization
- API design for public libraries

## Package Configuration

### package.json Structure
```json
{
  "name": "@scope/library-name",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "build": "tsdown",
    "test": "vitest",
    "lint": "eslint src",
    "prepublishOnly": "pnpm build && pnpm test"
  }
}
```

## Build Configuration

### tsdown.config.ts
```typescript
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  sourcemap: true,
  minify: true,
  treeshake: true,
  splitting: false,
});
```

## API Design Best Practices

### Clear Public API
```typescript
// ✅ Good: Focused, well-typed API
export interface ValidationOptions {
  strict?: boolean;
  customRules?: ValidationRule[];
}

export function validateEmail(
  email: string,
  options?: ValidationOptions
): ValidationResult {
  // Implementation
}

// Export all types
export type { ValidationOptions, ValidationResult, ValidationRule };

// ❌ Bad: Vague API
export function validate(thing: any, opts?: any): any;
```

### Type Safety
```typescript
// Use discriminated unions
export type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

// Provide utility types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

// Use branded types for primitive values
type Email = string & { __brand: 'Email' };
```

## Tree-Shaking Support

```typescript
// ✅ Good: Separate exports for tree-shaking
export { validateEmail } from './validators/email';
export { validatePhone } from './validators/phone';

// ❌ Bad: Barrel exports that break tree-shaking
export * from './validators';

// Use side-effect-free modules
// Set "sideEffects": false in package.json
```

## Testing Libraries

```typescript
import { describe, it, expect } from 'vitest';
import { validateEmail } from './index';

describe('validateEmail', () => {
  it('validates correct email', () => {
    const result = validateEmail('test@example.com');
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = validateEmail('invalid');
    expect(result.success).toBe(false);
  });

  it('respects strict mode', () => {
    const result = validateEmail('test@localhost', { strict: true });
    expect(result.success).toBe(false);
  });
});
```

## Publishing Workflow

### Changesets
```bash
# Add changeset
pnpm changeset

# Version packages
pnpm changeset version

# Publish to NPM
pnpm changeset publish
```

### GitHub Actions Publishing
```yaml
name: Publish

on:
  push:
    branches: [main]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          registry-url: 'https://registry.npmjs.org'
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm test
      
      - name: Publish
        run: pnpm changeset publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Bundle Size Monitoring

```json
{
  "bundlesize": [
    {
      "path": "./dist/**/*.js",
      "maxSize": "10 kB"
    }
  ]
}
```

## Documentation

### JSDoc Comments
```typescript
/**
 * Validates an email address
 * 
 * @param email - The email address to validate
 * @param options - Optional validation options
 * @returns Validation result with success status
 * 
 * @example
 * ```typescript
 * const result = validateEmail('test@example.com');
 * if (result.success) {
 *   console.log('Valid email');
 * }
 * ```
 */
export function validateEmail(
  email: string,
  options?: ValidationOptions
): ValidationResult {
  // Implementation
}
```

### README Template
```markdown
# Library Name

Description of what the library does.

## Installation

\`\`\`bash
npm install @scope/library-name
# or
pnpm add @scope/library-name
\`\`\`

## Usage

\`\`\`typescript
import { validateEmail } from '@scope/library-name';

const result = validateEmail('test@example.com');
\`\`\`

## API

### validateEmail(email, options?)

Description...

## License

MIT
```

## Key Principles

1. **API Simplicity**: Keep the public API small and intuitive
2. **Type Safety**: Provide comprehensive TypeScript types
3. **Zero Dependencies**: Minimize external dependencies when possible
4. **Tree-Shakeable**: Enable dead code elimination
5. **Well Tested**: Aim for 100% test coverage
6. **Well Documented**: Provide clear documentation and examples
