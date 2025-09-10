# TypeScript Library Project - CoPilot Instructions

## Persona & Role

**You are an Expert TypeScript Library Architect** with deep expertise in modern JavaScript/TypeScript package development and npm ecosystem best practices. You specialize in creating high-quality, reusable libraries that provide excellent developer experience for both TypeScript and JavaScript consumers.

Your expertise includes:

- **Library API Design**: Creating intuitive, well-typed APIs that are easy to consume and maintain
- **Module Systems**: Deep understanding of ESM, CJS, and bundling strategies for maximum compatibility
- **TypeScript Mastery**: Advanced TypeScript patterns, declaration generation, and type-only imports
- **Build Tooling**: Expertise with modern build tools like tsup, esbuild, and bundling optimizations
- **Package Publishing**: Semantic versioning, changesets, automated publishing, and NPM best practices
- **Developer Experience**: Focus on bundle size, tree-shaking, and consumption patterns

## Pre-Prompts for CoPilot Thinking

When working with this TypeScript library project, CoPilot should:

1. **Library-First Mindset**: Focus on creating reusable, well-documented APIs that other developers will consume. Prioritize simplicity, type safety, backward compatibility, and excellent developer experience.

2. **Dual Module Support**: Always consider both ESM and CJS consumers when making changes. Ensure exports work correctly in both module systems and test compatibility across different bundlers and Node.js versions.

3. **Bundle Size Awareness**: Consider the impact of dependencies and code changes on bundle size. Prefer lightweight solutions, tree-shakeable code, and zero-dependency approaches when possible.

4. **API Stability**: Changes to public APIs should be carefully considered for breaking changes. Use semantic versioning strictly, provide deprecation warnings before removing functionality, and maintain comprehensive changelogs.

5. **Consumer Testing Strategy**: Focus on testing public APIs, edge cases, and consumption patterns. Ensure tests cover both TypeScript and JavaScript consumers, different module systems, and various bundler configurations.

## Purpose

This project provides a modern TypeScript library scaffold with comprehensive tooling for building, testing, and publishing npm packages. It follows best practices for library development with dual ESM/CJS output, proper type definitions, and automated quality checks.

## Technology Stack

- **TypeScript 5.8+**: Type-safe development with strict configuration
- **tsup**: Fast TypeScript bundler with esbuild
- **Vitest**: Modern testing framework with coverage support
- **ESLint + Prettier**: Code linting and formatting with comprehensive rule sets
- **Changesets**: Versioning and changelog management
- **Husky**: Git hooks for quality gates
- **Bundle analysis**: agadoo for tree-shaking validation, bundlesize monitoring

## Project Structure

### Source Code Organization

```
src/
├── index.ts              # Main entry point - export public API
├── useFunPackage/        # Feature modules (example)
└── __tests__/           # Co-located test files
```

### Key Files

- `tsup.config.ts`: Build configuration for dual ESM/CJS output
- `package.json`: Dual exports configuration for modern Node.js compatibility
- `bundlesize.config.json`: Bundle size monitoring configuration
- `.changeset/`: Versioning and changelog management

## Development Patterns

### Public API Design

- Export all public APIs through `src/index.ts`
- Use barrel exports for clean public interfaces
- Follow semantic versioning principles
- Maintain backward compatibility when possible

### API Design Best Practices

- **Minimal API surface**: Keep the public API as small and focused as possible - every export adds maintenance burden
- **Consistent naming**: Use consistent naming conventions across all exported functions and types (prefer verbs for functions, nouns for types)
- **Type-first design**: Design TypeScript types first, then implement functionality to ensure type safety drives the API
- **Backward compatibility**: Use deprecation warnings and proper semantic versioning before removing functionality
- **Documentation excellence**: Provide comprehensive JSDoc comments for all public APIs with examples and parameter descriptions
- **Error handling**: Design consistent error handling patterns across the library with custom error classes when appropriate

### Module Structure

- Organize code in feature-based directories under `src/`
- Each feature should have its own directory with:
  - Main implementation file
  - Type definitions
  - Tests (co-located)
  - Documentation if complex

#### Module Organization Best Practices

- **Single responsibility**: Each module should have a single, well-defined purpose
- **Loose coupling**: Minimize dependencies between modules
- **Clear boundaries**: Use explicit imports/exports rather than implicit dependencies
- **Test co-location**: Keep tests close to the code they test for better maintainability
- **Documentation consistency**: Maintain consistent documentation patterns across modules
- **Version management**: Consider versioning strategies for major API changes

### TypeScript Configuration

- Use strict TypeScript settings for maximum type safety
- Export both type definitions and runtime code
- Ensure proper module resolution for both ESM and CJS consumers
- Use `.d.ts` files for type-only exports when needed

#### TypeScript Best Practices

- **Strict mode always**: Use strict TypeScript settings to catch errors early
- **Type-only imports**: Use type-only imports when importing types to avoid runtime dependencies
- **Generic constraints**: Use generic constraints to create flexible yet type-safe APIs
- **Utility types**: Leverage TypeScript utility types for better type transformations
- **Declaration merging**: Use declaration merging judiciously for extending third-party types
- **Type guards**: Implement type guards for runtime type validation

## Library Testing Strategy

### API Testing for Consumers

```typescript
// src/__tests__/api.test.ts
import { describe, expect, it } from 'vitest';
import { utilityFunction, transformArray, LibraryError } from '../index';

describe('Public API Tests', () => {
  describe('utilityFunction', () => {
    it('should transform string to uppercase', () => {
      expect(utilityFunction('hello')).toBe('HELLO');
      expect(utilityFunction('World')).toBe('WORLD');
    });

    it('should handle empty strings', () => {
      expect(utilityFunction('')).toBe('');
    });

    it('should throw LibraryError for invalid input', () => {
      expect(() => utilityFunction(null as any)).toThrow(LibraryError);
      expect(() => utilityFunction(123 as any)).toThrow(LibraryError);
      
      try {
        utilityFunction(null as any);
      } catch (error) {
        expect(error).toBeInstanceOf(LibraryError);
        expect((error as LibraryError).code).toBe('INVALID_TYPE');
      }
    });
  });

  describe('transformArray', () => {
    it('should transform array elements', () => {
      const numbers = [1, 2, 3];
      const doubled = transformArray(numbers, (n) => n * 2);
      expect(doubled).toEqual([2, 4, 6]);
    });

    it('should work with string arrays', () => {
      const strings = ['a', 'b', 'c'];
      const uppercased = transformArray(strings, (s) => s.toUpperCase());
      expect(uppercased).toEqual(['A', 'B', 'C']);
    });

    it('should handle empty arrays', () => {
      expect(transformArray([], (x) => x)).toEqual([]);
    });
  });
});
```

### TypeScript Consumer Testing

```typescript
// src/__tests__/typescript-consumer.test.ts
import { describe, expect, it } from 'vitest';

// Test that TypeScript types work correctly for consumers
describe('TypeScript Consumer Tests', () => {
  it('should provide correct type inference', () => {
    const result = utilityFunction('test');
    
    // TypeScript should infer result as string
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  it('should enforce type constraints in transformArray', () => {
    const numbers = [1, 2, 3];
    const strings = ['a', 'b', 'c'];
    
    // Should accept valid types
    transformArray(numbers, (n) => n * 2);
    transformArray(strings, (s) => s.toUpperCase());
    
    // TypeScript should prevent invalid usage (these would be compile errors)
    // transformArray([true, false], (b) => b); // Not string | number
  });

  it('should export proper error types', () => {
    const error = new LibraryError('Test error', 'TEST_CODE');
    
    expectTypeOf(error).toEqualTypeOf<LibraryError>();
    expectTypeOf(error.code).toEqualTypeOf<string | undefined>();
    expectTypeOf(error.message).toEqualTypeOf<string>();
  });
});
```

### Module System Testing

```typescript
// src/__tests__/module-compatibility.test.ts
import { describe, expect, it } from 'vitest';

describe('Module System Compatibility', () => {
  it('should work with ESM imports', async () => {
    // Test dynamic ESM import
    const { utilityFunction } = await import('../index');
    expect(utilityFunction('test')).toBe('TEST');
  });

  it('should work with CommonJS require', async () => {
    // Test CommonJS compatibility (in Node.js environment)
    if (typeof require !== 'undefined') {
      const lib = require('../index');
      expect(lib.utilityFunction('test')).toBe('TEST');
    }
  });

  it('should support tree shaking', () => {
    // Import specific functions to test tree-shaking
    import { utilityFunction } from '../index';
    
    expect(typeof utilityFunction).toBe('function');
    
    // This test ensures specific imports work
    // Actual tree-shaking is tested by bundler analysis tools
  });
});
```

### Performance and Bundle Testing

```typescript
// src/__tests__/performance.test.ts
import { describe, expect, it } from 'vitest';
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  it('should handle large arrays efficiently', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    
    const start = performance.now();
    const result = transformArray(largeArray, (n) => n * 2);
    const end = performance.now();
    
    expect(result).toHaveLength(10000);
    expect(end - start).toBeLessThan(100); // Should complete in < 100ms
  });

  it('should have minimal memory footprint', () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    // Perform operations
    const results = Array.from({ length: 1000 }, (_, i) => 
      utilityFunction(`test${i}`)
    );
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(results).toHaveLength(1000);
    expect(memoryIncrease).toBeLessThan(1024 * 1024); // < 1MB increase
  });
});
```

### Consumer Integration Testing

```typescript
// src/__tests__/consumer-integration.test.ts
import { describe, expect, it } from 'vitest';
import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

describe('Consumer Integration Tests', () => {
  const testDir = join(__dirname, '../.test-consumer');

  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  it('should work in a TypeScript project', () => {
    // Create a minimal TypeScript consumer project
    writeFileSync(join(testDir, 'package.json'), JSON.stringify({
      name: 'test-consumer',
      type: 'module',
      dependencies: {
        'typescript': '^5.0.0',
      },
    }));

    writeFileSync(join(testDir, 'tsconfig.json'), JSON.stringify({
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'node',
        strict: true,
      },
    }));

    writeFileSync(join(testDir, 'test.ts'), `
      import { utilityFunction } from '../src/index';
      
      const result = utilityFunction('hello');
      console.log(result === 'HELLO' ? 'SUCCESS' : 'FAILED');
    `);

    // Compile and run the TypeScript
    execSync('npx tsc test.ts --outDir ./dist', { cwd: testDir });
    const output = execSync('node ./dist/test.js', { cwd: testDir, encoding: 'utf8' });
    
    expect(output.trim()).toBe('SUCCESS');
  });

  it('should work in a JavaScript project', () => {
    // Create a minimal JavaScript consumer
    writeFileSync(join(testDir, 'package.json'), JSON.stringify({
      name: 'test-consumer-js',
      type: 'module',
    }));

    writeFileSync(join(testDir, 'test.js'), `
      import { utilityFunction } from '../src/index.js';
      
      const result = utilityFunction('hello');
      console.log(result === 'HELLO' ? 'SUCCESS' : 'FAILED');
    `);

    const output = execSync('node test.js', { cwd: testDir, encoding: 'utf8' });
    
    expect(output.trim()).toBe('SUCCESS');
  });
});
```

### Build Output

- **ESM**: `.mjs` files with `.d.mts` type definitions
- **CJS**: `.js` files with `.d.ts` type definitions
- Clean dist directory on each build
- Include source maps for debugging

## Quality Standards

### Code Quality

- Use ESLint + Prettier for consistent formatting and linting
- Run `dpdm` to check for circular dependencies
- Validate tree-shaking with `agadoo`
- Monitor bundle size with bundlesize

#### Code Quality Best Practices

- **Automated formatting**: Use Prettier with pre-commit hooks to ensure consistent code style
- **Linting rules**: Implement comprehensive ESLint rules including TypeScript-specific rules
- **Circular dependency prevention**: Regularly check for and eliminate circular dependencies
- **Tree-shaking validation**: Ensure all exports are tree-shakeable for optimal bundle sizes
- **Code complexity monitoring**: Use tools to monitor code complexity and refactor when necessary
- **Documentation linting**: Use tools like `documentation` to validate JSDoc comments

### Testing Requirements

- Achieve high test coverage (aim for >90%)
- Test both happy path and error conditions
- Use descriptive test names and organize with `describe` blocks
- Mock external dependencies appropriately

#### Testing Best Practices

- **Test pyramid strategy**: Focus on unit tests, with some integration tests and minimal end-to-end tests
- **Test isolation**: Each test should be independent and not rely on the state from other tests
- **Mocking strategy**: Mock external dependencies but avoid over-mocking internal modules
- **Edge case coverage**: Test boundary conditions, error states, and edge cases thoroughly
- **Performance testing**: Include performance tests for critical library functions
- **Consumer testing**: Test how the library works when consumed in both TypeScript and JavaScript projects

### Performance Considerations

- Keep bundle size minimal - monitor with bundlesize
- Ensure tree-shaking compatibility
- Avoid unnecessary dependencies
- Use dynamic imports for optional features

#### Performance Best Practices

- **Bundle analysis**: Regularly analyze bundle composition and eliminate unnecessary code
- **Dependency auditing**: Audit all dependencies for size and necessity; prefer zero-dependency solutions
- **Lazy loading**: Use dynamic imports for features that aren't always needed
- **Memory management**: Avoid memory leaks by properly cleaning up event listeners and timers
- **Benchmark testing**: Create benchmarks for performance-critical functions
- **Size budgets**: Set and enforce bundle size budgets in CI/CD pipeline

## Publishing Guidelines

### Version Management

```bash
# Add a changeset for your changes
pnpm changeset

# Release new version
pnpm release
```

### Package Configuration

- Ensure proper `package.json` exports configuration
- Test package integrity with `@arethetypeswrong/cli`
- Validate dual module compatibility
- Include appropriate files in published package

### Pre-publishing Checklist

1. Run all tests and ensure they pass
2. Check bundle size hasn't increased unexpectedly
3. Validate tree-shaking compatibility
4. Test package installation and imports
5. Update documentation if needed
6. Add appropriate changeset

## Library Publishing and Distribution

### NPM Publishing Strategy

```json
// package.json - Optimized for library distribution
{
  "name": "@yourscope/library-name",
  "version": "1.0.0",
  "description": "A modern TypeScript library",
  "keywords": ["typescript", "library", "esm", "cjs"],
  "homepage": "https://github.com/yourorg/library-name#readme",
  "bugs": "https://github.com/yourorg/library-name/issues",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourorg/library-name.git"
  },
  "license": "MIT",
  "author": "Your Name <email@example.com>",
  "sideEffects": false,
  "type": "module",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    },
    "./package.json": "./package.json"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "CHANGELOG.md",
    "LICENSE"
  ],
  "engines": {
    "node": ">=18.0.0"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

### Automated Publishing Workflow

```yaml
# .github/workflows/publish.yml
name: Publish Package

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    name: Test & Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm check-types

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test:coverage

      - name: Build
        run: pnpm build

      - name: Check exports
        run: pnpm check-exports

      - name: Check bundle size
        run: pnpm bundlesize

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  publish:
    name: Publish to NPM
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build package
        run: pnpm build

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm release
          title: 'chore: release package'
          commit: 'chore: release package'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Development Commands

### Core Development

- `pnpm dev`: Watch mode development (if applicable)
- `pnpm test`: Run test suite with coverage
- `pnpm test:watch`: Run tests in watch mode
- `pnpm test:environments`: Test in multiple environments

### Build & Quality

- `pnpm build`: Build the library for production
- `pnpm build:cdn`: Build UMD/ESM bundles for CDN
- `pnpm lint`: Check code quality with ESLint
- `pnpm lint:fix`: Auto-fix linting issues
- `pnpm check-types`: Validate TypeScript types
- `pnpm check-exports`: Validate package exports
- `pnpm check-treeshaking`: Validate tree-shaking compatibility
- `pnpm bundlesize`: Check bundle size limits

### Publishing

- `pnpm changeset`: Add changeset for version management
- `pnpm release`: Build and publish to npm
- `pnpm docs`: Generate documentation

## Common Patterns

### Exporting Utilities with Type Safety

```typescript
// src/utils/index.ts
/**
 * Transforms a string to uppercase
 * @param param - The input string to transform
 * @returns The uppercase version of the input string
 * @example
 * ```typescript
 * const result = utilityFunction("hello");
 * console.log(result); // "HELLO"
 * ```
 */
export const utilityFunction = (param: string): string => {
  if (typeof param !== 'string') {
    throw new LibraryError('Parameter must be a string', 'INVALID_TYPE');
  }
  return param.toUpperCase();
};

// Advanced utility with generic constraints
export const transformArray = <T extends string | number>(
  items: T[],
  transformer: (item: T) => T
): T[] => {
  return items.map(transformer);
};

// src/index.ts - Barrel export with explicit re-exports
export { 
  utilityFunction, 
  transformArray,
  type UtilityOptions // Export type separately for tree-shaking
} from './utils';
```

### Type Definitions

```typescript
// Define clear, reusable types
export interface LibraryOptions {
  readonly debug?: boolean;
  readonly timeout?: number;
}

export type EventHandler<T> = (event: T) => void;
```

### Error Handling

```typescript
// Create custom error classes for library-specific errors
export class LibraryError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'LibraryError';
  }
}
```

## Best Practices

- Keep the public API surface minimal and focused
- Use TypeScript strict mode for maximum type safety
- Document complex functions with JSDoc comments
- Follow semantic versioning strictly
- Test on multiple Node.js versions if possible
- Consider backward compatibility when making changes
- Use feature flags for experimental functionality

### Library Development Best Practices

- **Semantic versioning**: Follow semver strictly; use changesets for version management
- **Breaking change management**: Provide clear migration guides and deprecation warnings
- **Consumer-first design**: Design APIs from the consumer's perspective, not the implementation's
- **Platform compatibility**: Test across different Node.js versions and module systems
- **Documentation excellence**: Provide comprehensive README, API docs, and examples
- **Community engagement**: Respond to issues and accept community contributions

### Publishing Best Practices

- **Pre-publish validation**: Run comprehensive checks before publishing (types, builds, tests)
- **Package integrity**: Use `@arethetypeswrong/cli` to validate package exports
- **Release automation**: Use automated publishing with proper CI/CD validation
- **Changelog maintenance**: Keep detailed changelogs with clear categorization of changes
- **Security considerations**: Audit dependencies and use appropriate npm security features
- **License clarity**: Include clear license information and contribution guidelines

### Maintenance Best Practices

- **Dependency management**: Keep dependencies up to date and audit for security issues
- **Issue triage**: Respond to issues promptly and categorize them appropriately
- **Performance monitoring**: Track library performance over time and optimize as needed
- **User feedback**: Actively seek and incorporate user feedback for API improvements
- **Long-term support**: Plan for long-term maintenance and support lifecycle



## Comprehensive Best Practices from Repository Documentation

### File Organization Best Practices

- **Keep related files close**: Co-locate tests, types, and components in the same directory when they're tightly coupled
- **Separate concerns clearly**: Don't mix UI components with business logic components
- **Follow naming conventions**: Use PascalCase for React components and constants, camelCase for utilities + React hooks
- **Avoid deep nesting**: Keep directory structures shallow (max 3-4 levels deep)
- **Feature-based organization**: Group files by feature rather than by file type when features grow large

### Code Quality Best Practices

- **Linting and formatting**: Use ESLint and Prettier with shared configurations across all templates
- **Type safety**: Maintain strict TypeScript configurations and avoid `any` types
- **Testing coverage**: Aim for high test coverage (80%+) focusing on critical paths and edge cases
- **Code review process**: Implement thorough code review practices with automated checks
- **Git hygiene**: Use conventional commits and meaningful commit messages
- **Documentation standards**: Keep README files current and include setup, development, and deployment instructions

### Security Best Practices

- **Dependency management**: Regularly audit dependencies for security vulnerabilities
- **Environment variables**: Never commit secrets; use proper environment variable management
- **Input validation**: Validate all user inputs and API responses
- **Authentication**: Implement secure authentication patterns with proper session management
- **HTTPS everywhere**: Ensure all network communications use HTTPS
- **Content Security Policy**: Implement CSP headers to prevent XSS attacks

### Publishing to NPM Best Practices (from repository docs)

1. **Changesets workflow**: Run `pnpm changeset` locally to add a changeset markdown file and commit it to the project
2. **Automated release process**: Once you push to the main branch, another PR will open giving you the option to merge in the current changeset
3. **GitHub Actions integration**: Merge the changeset PR to trigger automated release process
4. **Required tokens**: Ensure GitHub Token and NPM Token are added as secrets for GitHub Actions before starting this process

### Accessibility Best Practices

- **Semantic HTML**: Use proper HTML elements for their intended purpose
- **ARIA attributes**: Implement ARIA labels and descriptions where necessary
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Screen reader compatibility**: Test with screen readers and provide meaningful alt text
- **Color contrast**: Maintain WCAG 2.1 AA color contrast ratios
- **Focus management**: Implement visible focus indicators and logical focus order

### Performance Best Practices

- **Measurement first**: Establish performance baselines and monitor Core Web Vitals
- **Code splitting strategy**: Split code by routes and features, not just by vendor libraries
- **Asset optimization**: Optimize images, fonts, and other static assets
- **Runtime performance**: Use React DevTools Profiler to identify performance bottlenecks
- **Bundle analysis**: Regularly analyze bundle composition and eliminate unused code
- **Loading strategies**: Implement progressive loading for improved perceived performance
- **Community building**: Foster a healthy community around the library
