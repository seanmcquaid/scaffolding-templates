# Example TypeScript Package

This is a complete example of a TypeScript npm package configured with ESM.

## Structure

```
example-ts-package/
├── package.json
├── tsconfig.json         # TypeScript configuration
├── src/
│   ├── index.ts          # Main entry point
│   ├── helpers.ts        # Helper module
│   └── index.test.ts     # Tests
└── dist/                 # Build output (generated)
```

## Features

- ✅ TypeScript with ESM (`"type": "module"`)
- ✅ Modern `exports` field (no deprecated `module` field)
- ✅ Bunchee for automatic TypeScript compilation and bundling
- ✅ Vitest for testing with TypeScript
- ✅ Type checking with `tsc --noEmit`
- ✅ Node.js >= 18.0.0

## Usage

### Build

```bash
npm run build
```

This generates:
- `dist/index.js` (ESM)
- `dist/index.d.ts` (TypeScript definitions)
- `dist/index.d.ts.map` (definition source maps)

### Type Check

```bash
npm run typecheck
```

Runs TypeScript compiler in check mode (no emit).

### Test

```bash
npm test        # Watch mode
npm run test:run # Run once
```

### Import

```typescript
// ESM
import { greet, version, MyLibrary } from 'example-ts-package';
import type { GreetingOptions } from 'example-ts-package';
```

## TypeScript Configuration

See `tsconfig.json` for TypeScript compiler options. Key settings:
- `moduleResolution: "NodeNext"` - Node.js-style resolution
- `declaration: true` - Generate `.d.ts` files
- `types: ["node", "vitest/globals"]` - Include type definitions

## Notes

- Use `.js` extensions in TypeScript imports (even though source files are `.ts`)
- Bunchee automatically compiles TypeScript and generates definitions
- TypeScript strict mode is enabled by default
