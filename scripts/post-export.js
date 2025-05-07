#!/usr/bin/env node
import { existsSync, mkdirSync, renameSync, copyFileSync, cpSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root   = process.cwd();
const outDir = resolve(root, 'out');

// 1) Move _next → next-assets/_next
const oldNext = join(outDir, '_next');
const newNextAssets = join(outDir, 'next-assets');
if (existsSync(oldNext)) {
  // ensure out/next-assets exists
  mkdirSync(newNextAssets, { recursive: true });
  renameSync(oldNext, join(newNextAssets, '_next'));
  console.log('✔ moved _next → next-assets/_next');
}

// 2) Recursively copy your public subfolders
for (const folder of ['assets', 'icons', 'images']) {
  const src = join(root, 'public', folder);
  const dst = join(outDir, folder);
  if (!existsSync(src)) {
    console.warn(`⚠ public/${folder} not found, skipping`);
    continue;
  }
  // fs.cpSync does a recursive copy
  cpSync(src, dst, { recursive: true });
  console.log(`✔ copied public/${folder} → out/${folder}`);
}

// 3) Copy manifest.json (single file)
const manifestSrc = join(root, 'public', 'manifest.json');
const manifestDst = join(outDir, 'manifest.json');
if (existsSync(manifestSrc)) {
  copyFileSync(manifestSrc, manifestDst);
  console.log('✔ copied manifest.json → out/manifest.json');
} else {
  console.warn('⚠ public/manifest.json not found, skipping');
}
