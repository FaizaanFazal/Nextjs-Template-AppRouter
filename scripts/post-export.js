#!/usr/bin/env node
import { mkdirSync, existsSync, renameSync } from 'fs';
import { resolve, join } from 'path';

// 1) Locate your out/ directory
const projectRoot = process.cwd();
const outDir = resolve(projectRoot, 'out');

// 2) Create out/next-assets
const assetsDir = join(outDir, 'next-assets');
mkdirSync(assetsDir, { recursive: true });

// 3) Move out/_next → out/next-assets/_next
const oldNext = join(outDir, '_next');
if (existsSync(oldNext)) {
  renameSync(oldNext, join(assetsDir, '_next'));
  console.log('✔️  moved _next → next-assets/_next');
} else {
  console.warn('⚠️  no _next folder found to move');
}

// 4) Now invoke your inline‐script replacement
import('./replace-inline-scripts.mjs')
  .then(() => console.log('✔️  inline scripts extracted'))
  .catch((err) => {
    console.error('❌  error extracting inline scripts:', err);
    process.exit(1);
  });
