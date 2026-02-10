# ESLint 10 Compatibility Patches

This directory contains pnpm patches to make ESLint plugins compatible with ESLint 10.0.0, which introduced breaking changes by removing deprecated context methods.

## Patches

### eslint-plugin-no-relative-import-paths@1.6.1

**Issue**: The plugin used deprecated `context.getCwd()` and `context.getFilename()` methods that were removed in ESLint 10.

**Changes**:
- Replaced `context.getCwd()` with `context.cwd`
- Replaced `context.getFilename()` with `context.physicalFilename`

**Upstream Status**: As of ESLint 10 release (February 2026), the plugin maintainer has not yet released a compatible version.

### eslint-plugin-i18next@6.1.3

**Issue**: The plugin used deprecated `context.getSourceCode()` method that was removed in ESLint 10.

**Changes**:
- Replaced `context.getSourceCode()` with `context.sourceCode`

**Upstream Status**: As of ESLint 10 release (February 2026), the plugin maintainer has not yet released a compatible version.

## ESLint 10 Breaking Changes

ESLint 10 removed several deprecated context methods:
- `context.getCwd()` → use `context.cwd` (property, not method)
- `context.getFilename()` → use `context.physicalFilename` (property, not method)
- `context.getSourceCode()` → use `context.sourceCode` (property, not method)

## When to Remove These Patches

These patches should be removed once the upstream plugins release versions compatible with ESLint 10. Monitor the following:
- [eslint-plugin-no-relative-import-paths](https://github.com/MelvinVermeer/eslint-plugin-no-relative-import-paths)
- [eslint-plugin-i18next](https://github.com/edvardchen/eslint-plugin-i18next)

## Additional Notes

- These patches are automatically applied by pnpm when installing dependencies
- The peer dependency warnings for other plugins (typescript-eslint, eslint-plugin-import, etc.) are expected and do not affect functionality - these plugins work despite not officially declaring ESLint 10 support yet
