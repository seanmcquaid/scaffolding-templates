# Cursor IDE Configuration for TypeScript Library Template

This directory contains Cursor IDE configuration for the TypeScript Library scaffolding template with custom sub-agents.

## Quick Start

Cursor automatically discovers agent files in the `/agents/` directory. No additional configuration needed!

### Using Agents in Chat (`Cmd/Ctrl+L`)

```
@typescript-library-specialist how should I structure exports for tree-shaking?
@requirements-analyst analyze requirements for this utility library
@quality-analyst create comprehensive tests for the public API
```

### Using Agents in Composer (`Cmd/Ctrl+K`)

1. Open Composer mode
2. Select agent from dropdown
3. Describe your task - agent guides multi-file implementation

## Available Agents

### Template Agents (9 Total)

Located in `/agents/`:

**SDLC Phase Agents (8):**
- `@requirements-analyst` - Feature requests, API requirements, acceptance criteria
- `@software-architect` - Library architecture, module design, API patterns
- `@implementation-engineer` - Feature coding, TypeScript development
- `@ui-ux-designer` - API ergonomics, developer experience design
- `@quality-analyst` - Unit tests, integration tests, type tests
- `@deployment-engineer` - NPM publishing, CI/CD pipelines, release automation
- `@maintenance-engineer` - Bug fixes, refactoring, dependency updates
- `@production-support-engineer` - Issue debugging, performance optimization

**TypeScript Library Specialist (1):**
- `@typescript-library-specialist` - Dual ESM/CJS exports, API design, bundle optimization, TypeScript declarations, tree-shaking, versioning with changesets

## Usage Patterns

### Pattern 1: API Design and Export Configuration

```
@typescript-library-specialist

Context: Building a validation utility library
Requirements: 
- Tree-shakeable exports
- Dual ESM/CJS support
- TypeScript types for autocomplete
- Zero dependencies
Current Setup: src/index.ts with barrel exports
Performance: Bundle size < 5KB minified, supports tree-shaking

How should I structure the public API and configure package.json exports?
```

### Pattern 2: Bundle Optimization

```
@typescript-library-specialist

I need to optimize bundle size and ensure tree-shaking works correctly.
Guide me through:
1. Analyzing current bundle with agadoo
2. Identifying non-tree-shakeable code
3. Restructuring exports for optimal tree-shaking
4. Setting up bundlesize monitoring
5. Validating with @arethetypeswrong/cli
6. Testing consumption in both ESM and CJS projects
```

### Pattern 3: Feature Development Workflow

```
# Stage 1: Requirements
@requirements-analyst create spec for a date formatting utility
with timezone support and localization

[Review spec output]

# Stage 2: Architecture
@software-architect design API for date utility
with type-safe options and minimal dependencies

[Review architecture]

# Stage 3: Implementation
@typescript-library-specialist implement the date utility
following the architecture with proper types and exports

[Review implementation]

# Stage 4: Testing
@quality-analyst create tests for the date utility
including edge cases, timezone handling, and type safety
```

## Best Practices

### 1. Prioritize TypeScript Library Specialist

For library-specific questions, always start with `@typescript-library-specialist`:

| Task | Agent | Why |
|------|-------|-----|
| API design | `@typescript-library-specialist` | Public interface patterns |
| ESM/CJS exports | `@typescript-library-specialist` | Dual module expertise |
| Tree-shaking | `@typescript-library-specialist` | Bundle optimization |
| Type declarations | `@typescript-library-specialist` | .d.ts generation |
| Versioning | `@typescript-library-specialist` | Changesets workflow |
| NPM publishing | `@typescript-library-specialist` | Release automation |
| Generic implementation | `@implementation-engineer` | Cross-platform patterns |
| API ergonomics | `@ui-ux-designer` | Developer experience |
| Testing | `@quality-analyst` | Test coverage |

### 2. Provide Library Context

✅ **Good:**
```
@typescript-library-specialist

Context: Building a form validation library
Module: Dual ESM/CJS with TypeScript
Requirements: 
- Tree-shakeable validator functions
- Type-safe error messages
- Zero runtime dependencies
- Bundle size < 3KB per validator
- Works in Node.js and browsers
Current Setup: src/validators/index.ts with individual validators
Performance Target: Each validator < 500 bytes

How should I structure exports and ensure optimal tree-shaking?
```

❌ **Bad:**
```
@typescript-library-specialist how do I make a validation library?
```

### 3. Module System Considerations

Always specify target environments and module systems:

```
@typescript-library-specialist

Implementing a utility library. Needs to support:
- ESM imports (import { util } from 'lib')
- CJS requires (const { util } = require('lib'))
- Tree-shaking for ESM consumers
- TypeScript autocomplete
- Node.js 18+ and modern browsers

Consider: package.json exports, tsup config, and .d.ts files.
```

### 4. API Surface Design

For public APIs, always consider breaking changes:

```
@typescript-library-specialist

Review this API change for breaking changes.
Current API:
- function validate(input: string): boolean

Proposed API:
- function validate(input: string | number, options?: Options): Result

Requirements:
- Maintain backward compatibility if possible
- Use deprecation warnings for old signatures
- Follow semantic versioning
- Update TypeScript types
- Document migration path

[Include code]
```

## TypeScript Library Workflows

### Workflow 1: New Library Module Development

```
# In Chat (Cmd+L)
@software-architect design a caching utility module
with TTL support, LRU eviction, and TypeScript generics

[Review design]

# In Composer (Cmd+K)
@typescript-library-specialist implement the cache module
following the design above. Create:
- src/cache/index.ts (main implementation)
- src/cache/types.ts (TypeScript interfaces)
- src/cache/__tests__/cache.test.ts (test suite)
- Export through src/index.ts
- Ensure tree-shaking compatibility
- Add JSDoc comments for all public APIs
- Keep bundle size under 2KB
```

### Workflow 2: Publishing Workflow

```
@typescript-library-specialist

Prepare library for NPM publishing:
1. Review public API surface in src/index.ts
2. Validate TypeScript declarations with @arethetypeswrong/cli
3. Check tree-shaking with agadoo
4. Verify bundle size with bundlesize
5. Test in both ESM and CJS projects
6. Create changeset with appropriate version bump
7. Build and validate dist output
8. Review package.json exports field
9. Test package installation locally (npm pack)
10. Document breaking changes if any
```

### Workflow 3: API Versioning and Migration

```
@typescript-library-specialist

Planning a breaking change for v2.0:
Current API: function process(data: string): string
New API: function process(input: Input): Output

Guide me through:
1. Creating deprecation warnings for v1 API
2. Implementing v2 API alongside v1
3. Using changesets for major version bump
4. Writing migration guide
5. Updating TypeScript types
6. Adding compatibility layer if possible
7. Testing both APIs work correctly
8. Documenting breaking changes
```

## Configuration

### Agent Settings (Optional)

Create `.cursor/config.json` to customize agent behavior:

```json
{
  "agents": {
    "autoDiscover": true,
    "directories": [
      "./agents"
    ],
    "priorityByDirectory": {
      ".": ["typescript-library-specialist"]
    }
  },
  "composer": {
    "defaultAgent": "typescript-library-specialist",
    "showAgentSelector": true
  }
}
```

See `config.example.json` for full configuration options.

## Troubleshooting

### Issue: Package Doesn't Tree-Shake

**Symptoms:** ESM imports include entire library, not just used functions

**Solutions:**
1. Run `pnpm check-treeshaking` to identify issues
2. Check for side effects in module code
3. Verify package.json has `"sideEffects": false`
4. Ensure exports use named exports, not default
5. Review tsup config for proper ESM output
6. Ask specialist about tree-shaking patterns

### Issue: TypeScript Types Not Working

**Symptoms:** Consumers don't get type autocomplete or type errors

**Solutions:**
1. Verify `package.json` has correct `types` field
2. Check `.d.ts` files are generated in dist/
3. Run `@arethetypeswrong/cli` to validate types
4. Ensure tsup generates both `.d.ts` and `.d.mts`
5. Check exports field points to correct type files
6. Test in a TypeScript project locally

### Issue: CJS/ESM Compatibility

**Symptoms:** Import errors in Node.js or bundlers

**Solutions:**
1. Verify package.json exports field is correct
2. Check both .js (CJS) and .mjs (ESM) files exist
3. Test with `node -e "require('./dist/index.js')"`
4. Test with `node --input-type=module -e "import './dist/index.mjs'"`
5. Review tsup config for dual output
6. Ask specialist about module compatibility

## TypeScript Library Tips

### 1. Optimal File Structure

```
@typescript-library-specialist

How should I structure a TypeScript library?
src/
├── index.ts                 # Barrel export of public API
├── module1/
│   ├── index.ts            # Module implementation
│   ├── types.ts            # Module-specific types
│   └── __tests__/
│       └── module1.test.ts
├── module2/
│   ├── index.ts
│   ├── types.ts
│   └── __tests__/
│       └── module2.test.ts
└── utils/
    ├── internal.ts         # Not exported publicly
    └── __tests__/

Include:
- Clear public API surface
- Co-located tests
- Internal utilities not exported
- Type definitions
- JSDoc comments
```

### 2. Package.json Exports Configuration

```
@typescript-library-specialist

Configure package.json exports for optimal compatibility:
- Support ESM and CJS
- Provide TypeScript types
- Support Node.js and bundlers
- Enable tree-shaking
- Handle default and named imports
- Subpath exports (optional)
- Conditional exports

Review current package.json and optimize exports field.
```

### 3. Build Configuration

```
@typescript-library-specialist

Optimize tsup.config.ts for library builds:
- Dual ESM (.mjs) and CJS (.js) output
- TypeScript declarations (.d.ts, .d.mts)
- Source maps for debugging
- Minification options
- External dependencies handling
- Clean dist on build
- Watch mode for development
```

### 4. Tree-Shaking Validation

```
@typescript-library-specialist

Ensure library is tree-shakeable:
- Use named exports exclusively
- Avoid side effects in modules
- Set "sideEffects": false in package.json
- Use pure annotations where needed
- Test with agadoo tool
- Verify in consuming projects
- Check bundle size per export
```

### 5. Testing Strategy

```
@quality-analyst

Create testing strategy for TypeScript library:
1. Unit tests (Vitest)
   - Test all exported functions
   - Test edge cases and errors
   - Test TypeScript types
2. Integration tests
   - Test module interactions
   - Test in ESM project
   - Test in CJS project
3. Type tests
   - Validate type inference
   - Test generic constraints
   - Check error messages
4. Bundle tests
   - Verify tree-shaking works
   - Check bundle sizes
   - Test in different bundlers
```

## Resources

- **Template README:** `/README.md` - TypeScript library setup
- **Repository Patterns:** `../../AGENTS.md` - Repository-wide guidelines  
- **Agent Definitions:** `/agents/*.agent.md` - Individual agent capabilities
- **Example Config:** `.cursor/config.example.json` - Full configuration options
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/handbook/
- **tsup Documentation:** https://tsup.egoist.dev/

## Integration with Cursor Features

### With Cursor Tab (Auto-complete)

The TypeScript Library specialist agent context influences auto-complete suggestions for library patterns.

### With Cursor CMD+K (Quick Edit)

```
Cmd+K → Select code → @quality-analyst add tests for this exported function
```

### Terminal Integration

```
@deployment-engineer what commands should I run to publish to npm?
@maintenance-engineer suggest commands to diagnose bundle size issues
```

## TypeScript Library Specific Features

### Public API Design

```
@typescript-library-specialist

Design public API for maximum usability:
- Intuitive function names
- Consistent parameter ordering
- Type-safe with generics
- Optional parameters for flexibility
- Clear error messages
- JSDoc documentation
- Usage examples in comments
```

### Dual Module Output

```
@typescript-library-specialist

Configure for dual ESM/CJS output:
- tsup with format: ['esm', 'cjs']
- package.json exports with conditional exports
- Proper file extensions (.mjs, .js)
- Type declarations for both (.d.mts, .d.ts)
- Test both module systems
- Validate with @arethetypeswrong/cli
```

### Type Declarations

```
@typescript-library-specialist

Optimize TypeScript type definitions:
- Generate .d.ts files automatically
- Export both types and runtime code
- Use type-only imports where possible
- Provide generics for flexibility
- Document complex types with JSDoc
- Validate with tsc --noEmit
```

### Bundle Size Optimization

```
@typescript-library-specialist

Minimize bundle size:
- Monitor with bundlesize tool
- Use agadoo for tree-shaking validation
- Avoid unnecessary dependencies
- Use dynamic imports for optional features
- Minify production builds
- Set size budgets in CI
- Analyze with bundle analyzer
```

### Version Management

```
@typescript-library-specialist

Manage versions with Changesets:
- Add changeset: pnpm changeset
- Choose version bump (major/minor/patch)
- Write clear changelog entry
- Commit changeset file
- Automated release via GitHub Actions
- Follow semantic versioning strictly
- Document breaking changes
```

### NPM Publishing

```
@typescript-library-specialist

Publish to NPM registry:
1. Validate package with prepublish checks
2. Run all tests and quality checks
3. Build production bundle
4. Test package locally (npm pack)
5. Verify package.json metadata
6. Ensure .npmignore excludes dev files
7. Publish with changesets workflow
8. Verify on NPM registry
9. Test installation in new project
```

### API Documentation

```
@typescript-library-specialist

Create comprehensive API documentation:
- JSDoc comments for all public APIs
- Usage examples in code
- README with quick start guide
- API reference documentation
- Migration guides for breaking changes
- TypeScript type examples
- Common use cases and patterns
```

### Backwards Compatibility

```
@typescript-library-specialist

Maintain backwards compatibility:
- Avoid breaking changes in minor versions
- Use deprecation warnings for old APIs
- Provide migration paths
- Test against previous versions
- Document compatibility matrix
- Use semver strictly
- Consider compatibility layers
```

---

**Happy TypeScript library development with Cursor agents! 📦**

For more information about the agent system, see the [root custom agents guide](../../docs/custom-agents-guide.md).
