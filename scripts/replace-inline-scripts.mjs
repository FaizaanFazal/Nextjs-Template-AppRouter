#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { globSync } from 'glob';

const OUT = resolve(process.cwd(), 'out');
const ASSETS = resolve(OUT, 'next-assets', '_next');
const MAGIC = '__INLINE_PLACEHOLDER__';

// 1) Find every HTML file under out/
const htmlFiles = globSync(`${OUT}/**/*.html`);

htmlFiles.forEach((htmlPath) => {
  let html = readFileSync(htmlPath, 'utf-8');
  const snippets = [];

  // 2) Pull out every inline <script>…</script>
  html = html.replace(
    /<script( type="module")?>([\s\S]*?)<\/script>/g,
    (_, _mod, js) => {
      const code = js.trim().endsWith(';') ? js.trim() : js.trim() + ';';
      snippets.push(code);
      return MAGIC;      // leave a single placeholder
    }
  );

  if (snippets.length === 0) return; // nothing to do

  // 3) Write them out as one hashed chunk
  const bundle = snippets.join('\n');
  const hash   = createHash('sha256').update(bundle).digest('hex');
  const fileRel = `static/chunks/inline-${hash}.js`;
  const fileOut = join(ASSETS, fileRel);
  mkdirSync(dirname(fileOut), { recursive: true });
  writeFileSync(fileOut, bundle, 'utf-8');

  // 4) Replace placeholder with an external <script src=…>
  const scriptTag = `<script src="/next-assets/_next/${fileRel}" crossorigin="anonymous"></script>`;
  html = html.replace(MAGIC, scriptTag);

  // 5) Save the modified HTML
  writeFileSync(htmlPath, html, 'utf-8');
  console.log(`✅  Externalized inline scripts to ${fileRel}`);
});


// import { resolve } from 'node:path';
// import { readFileSync, writeFileSync } from 'node:fs';
// import { createHash } from 'node:crypto';
// import { globSync } from 'glob';

// const distDir = 'out';
// const basePath = 'next-assets/_next';

// const MAGIC_STRING = '__this_is_a_placeholder_for_the_inline_scripts__';

// console.log('grab all the html files');
// const baseDir = resolve(distDir.replace(/^\//, ''));
// console.log('baseDir', baseDir);
// const htmlFiles = globSync(`${baseDir}/**/*.html`);
// htmlFiles.forEach((file) => {
//   // grab inline scripts from each html file
//   const contents = readFileSync(file).toString();
//   const scripts = [];
//   const newFile = contents.replace(/<script>(.+?)<\/script>/g, (_, data) => {
//     const addMagicString = scripts.length === 0;
//     scripts.push(`${data}${data.endsWith(';') ? '' : ';'}`);
//     return addMagicString ? MAGIC_STRING : '';
//   });

//   // early exit if we have no inline scripts
//   if (!scripts.length) {
//     console.log(`No scripts found in HTML file ${file}`);
//     return;
//   }
//   console.log(`processing ${file}`);

//   // combine all the inline scripts, add a hash, and reference the new file
//   console.log('\trewriting');
//   const chunk = scripts.join('');
//   const hash = createHash('md5').update(chunk).digest('hex');
//   const filePath = `${basePath}/static/chunks/chunk.${hash}.js`
//   writeFileSync(`${baseDir}/${filePath}`, chunk);
//   writeFileSync(
//     file,
//     newFile.replace(
//       MAGIC_STRING,
//       `<script src="${filePath}" crossorigin=""></script>`
//     )
//   );
//   console.log('\tfinished');
// });