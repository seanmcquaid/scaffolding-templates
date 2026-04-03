# Example ESM Package

This is a complete example of an npm package configured with ESM.

## Structure

```
example-package/
├── package.json
├── src/
│   ├── index.js        # Main entry point
│   ├── helpers.js      # Helper module
│   └── index.test.js   # Tests
└── dist/               # Build output (generated)
```

## Features

- ✅ ESM with `"type": "module"`
- ✅ Modern `exports` field (no deprecated `module` field)
- ✅ Bunchee for bundling
- ✅ Vitest for testing
- ✅ Node.js >= 20.0.0

## Usage

### Build

```bash
npm run build
```

This generates:
- `dist/index.js` (ESM)

### Test

```bash
npm test        # Watch mode
npm run test:run # Run once
```

### Import

```javascript
// ESM
import { greet, version } from 'example-esm-package';
import MyLibrary from 'example-esm-package';
```
