#!/usr/bin/env node
import {
  existsSync,
  mkdirSync,
  cpSync,
  rmSync,
  readFileSync,
  writeFileSync,
  copyFileSync
} from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { globSync } from 'glob';

const root    = process.cwd();
const outDir  = resolve(root, 'out');

// 1) Move `_next` → `next-assets/_next` via copy + remove
const nextDir    = join(outDir, '_next');
const assetsBase = join(outDir, 'next-assets');
const assetsNext = join(assetsBase, '_next');

if (existsSync(nextDir)) {
  mkdirSync(assetsNext, { recursive: true });
  cpSync(nextDir, assetsNext, { recursive: true });
  rmSync(nextDir, { recursive: true, force: true });
  console.log('✔ moved _next → next-assets/_next');
}

// 2) Externalize all inline <script>…</script> into a hashed chunk
const htmlFiles = globSync(`${outDir}/**/*.html`);
htmlFiles.forEach((htmlPath) => {
  let html = readFileSync(htmlPath, 'utf-8');
  const snippets = [];

  // Pull out every inline script
  html = html.replace(
    /<script(?: type="module")?>([\s\S]*?)<\/script>/g,
    (_, js) => {
      const code = js.trim().endsWith(';') ? js.trim() : js.trim() + ';';
      snippets.push(code);
      return '__INLINE_PLACEHOLDER__';
    }
  );

  if (!snippets.length) return; // nothing to do

  // Write the external bundle
  const bundle   = snippets.join('\n');
  const hash     = createHash('sha256').update(bundle).digest('hex');
  const filename = `static/chunks/inline-${hash}.js`;
  const fileOut  = join(assetsNext, filename);
  mkdirSync(dirname(fileOut), { recursive: true });
  writeFileSync(fileOut, bundle, 'utf-8');
  console.log(`✔ externalized inline scripts to ${filename}`);

  // Inject the external <script> tag
  html = html.replace(
    '</head>',
    `  <script src="/next-assets/_next/${filename}" crossorigin="anonymous"></script>\n</head>`
  );

  // Save modified HTML
  writeFileSync(htmlPath, html, 'utf-8');
});

// 3) Copy manifest.json
const manifestSrc = join(root, 'public', 'manifest.json');
const manifestDst = join(outDir, 'manifest.json');
if (existsSync(manifestSrc)) {
  copyFileSync(manifestSrc, manifestDst);
  console.log('✔ copied manifest.json → out/manifest.json');
}

// 4) Copy remaining public assets to out/
for (const name of [
  'assets',
  'icons',
  'images',
  'globals.css',
  'index.html',
  'popup.html',
  'options.html',
]) {
  const src = join(root, 'public', name);
  const dst = join(outDir, name);
  if (!existsSync(src)) continue;
  cpSync(src, dst, { recursive: true });
  console.log(`✔ copied public/${name} → out/${name}`);
}
