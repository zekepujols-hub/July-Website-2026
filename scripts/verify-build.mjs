import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const pages = [
  'index.html', 'about.html', 'music.html', 'tour.html', 'videos.html',
  'community.html', 'vault.html', 'merch.html', 'contact.html', 'contact-us.html',
];
const required = ['CNAME', '.nojekyll', 'robots.txt', 'sitemap.xml', 'favicon.png'];
const titles = new Set();
const descriptions = new Set();
const failures = [];

const count = (html, expression) => [...html.matchAll(expression)].length;
const contentOf = (html, expression) => html.match(expression)?.[1]?.trim();

for (const file of [...pages, ...required]) {
  if (!existsSync(join(dist, file))) failures.push(`Missing dist/${file}`);
}

for (const page of pages) {
  const html = readFileSync(join(dist, page), 'utf8');
  const title = contentOf(html, /<title>([^<]+)<\/title>/i);
  const description = contentOf(html, /<meta name="description" content="([^"]+)"/i);
  if (!title || titles.has(title)) failures.push(`${page}: missing or duplicate title`);
  if (!description || descriptions.has(description)) failures.push(`${page}: missing or duplicate meta description`);
  titles.add(title);
  descriptions.add(description);
  if (count(html, /<h1(?:\s|>)/gi) !== 1) failures.push(`${page}: expected exactly one H1`);
  if (count(html, /rel="canonical"/gi) !== 1) failures.push(`${page}: expected exactly one canonical`);
  if (!/<meta property="og:url" content="https:\/\/zekepujols\.com\//i.test(html)) failures.push(`${page}: missing absolute Open Graph URL`);
  const jsonBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (!jsonBlocks.length) failures.push(`${page}: missing JSON-LD`);
  for (const [, json] of jsonBlocks) {
    try { JSON.parse(json); } catch (error) { failures.push(`${page}: invalid JSON-LD (${error.message})`); }
  }
}

if (existsSync(join(dist, 'CNAME')) && readFileSync(join(dist, 'CNAME'), 'utf8').trim() !== 'zekepujols.com') {
  failures.push('dist/CNAME must contain exactly zekepujols.com');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Verified ${pages.length} pages, unique metadata, JSON-LD, and Pages deployment files.`);
