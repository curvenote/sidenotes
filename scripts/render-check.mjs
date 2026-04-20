import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, '../dist-demo');

const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8');
const html = indexHtml
  .replace(/<link[^>]+rel="stylesheet"[^>]*>/g, '')
  .replace(/<script[^>]*src="[^"]*googletagmanager[^"]*"[^>]*><\/script>/g, '')
  .replace(/<script[^>]*src="\/assets\/[^"]+\.js"[^>]*><\/script>/g, '');

GlobalRegistrator.register({
  url: 'http://localhost:3013/',
  settings: { disableJavaScriptFileLoading: true, disableCSSFileLoading: true },
});

document.write(html);

const scriptMatch = indexHtml.match(/<script[^>]+src="(\/assets\/[^"]+\.js)"/);
if (!scriptMatch) throw new Error('Could not find demo JS bundle in index.html');
const bundle = readFileSync(resolve(distDir, scriptMatch[1].replace(/^\//, '')), 'utf8');

// eslint-disable-next-line no-eval
(0, eval)(bundle);

await happyDOM.waitUntilComplete();

const root = document.getElementById('root');
const rendered = root?.innerHTML ?? '';

console.log('--- rendered #root (first 1500 chars) ---');
console.log(rendered.slice(0, 1500));
console.log('--- summary ---');
const checks = [
  ['<h1', 'h1 element'],
  ['Deselect Sidenotes', 'deselect button label'],
  ['A sidenote', 'inline anchor text'],
  ['Attached to sidenote base.', 'base sidenote text'],
  ['class="sidenotes"', 'sidenotes container'],
];
let pass = true;
for (const [needle, label] of checks) {
  const ok = rendered.includes(needle);
  if (!ok) pass = false;
  console.log(`${ok ? 'OK ' : 'FAIL'}  ${label}  (looking for ${JSON.stringify(needle)})`);
}

await GlobalRegistrator.unregister();
process.exit(pass ? 0 : 1);
