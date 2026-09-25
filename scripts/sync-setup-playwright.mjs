import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'scripts/setup-playwright-function.sh');
const targets = [
  'templates/react-router/ssr/scripts/setup.sh',
  'templates/react-router/spa/scripts/setup.sh',
  'templates/next-ssr/scripts/setup.sh',
  'templates/tanstack-start-ssr/scripts/setup.sh',
  'templates/tanstack-router-spa/scripts/setup.sh',
];
const mode = process.argv[2] ?? '--check';

if (!['--check', '--write'].includes(mode) || process.argv.length > 3) {
  console.error('Usage: node scripts/sync-setup-playwright.mjs [--check|--write]');
  process.exit(2);
}

const canonical = (await readFile(sourcePath, 'utf8')).trimEnd();
const functionPattern = /^setup_playwright\(\) \{\n[\s\S]*?^\}/gm;
let driftFound = false;

for (const relativePath of targets) {
  const targetPath = path.join(root, relativePath);
  const contents = await readFile(targetPath, 'utf8');
  const matches = [...contents.matchAll(functionPattern)];

  if (matches.length !== 1) {
    console.error(`${relativePath}: expected exactly one setup_playwright() function, found ${matches.length}`);
    process.exitCode = 1;
    continue;
  }

  const current = matches[0][0];
  if (current === canonical) continue;

  driftFound = true;
  if (mode === '--write') {
    await writeFile(targetPath, contents.replace(current, canonical));
    console.log(`Updated ${relativePath}`);
  } else {
    console.error(`${relativePath}: setup_playwright() differs from scripts/setup-playwright-function.sh`);
  }
}

if (mode === '--check' && driftFound) process.exitCode = 1;
if (mode === '--check' && !process.exitCode) {
  console.log('All app starter Playwright setup functions match the canonical source.');
}
