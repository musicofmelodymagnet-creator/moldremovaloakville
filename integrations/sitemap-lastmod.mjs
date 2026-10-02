// Генерирует dist/sitemap.xml после сборки и сам следит за <lastmod>.
//
// Как это работает: для каждой собранной страницы считается хэш итогового HTML.
// Хэши и даты хранятся в src/data/sitemap-state.json (коммитится в git).
// Если HTML страницы изменился (текст, картинка, общий компонент, CSS — у Astro
// меняется имя CSS-файла, а значит и HTML), lastmod ставится на сегодняшнюю дату.
// Если не изменился — дата остаётся прежней. Руками ничего бампать не нужно.
//
// В карту сайта не попадают: 404.html и страницы с <meta name="robots" content="noindex">.
import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const STATE_FILE = 'src/data/sitemap-state.json';

async function listHtml(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listHtml(full, base)));
    else if (entry.name.endsWith('.html')) out.push(path.relative(base, full));
  }
  return out;
}

// dist/index.html → /, dist/about/index.html → /about/, dist/about.html → /about
function toUrlPath(rel) {
  const p = '/' + rel.split(path.sep).join('/');
  if (p === '/index.html') return '/';
  if (p.endsWith('/index.html')) return p.slice(0, -'index.html'.length);
  return p.replace(/\.html$/, '');
}

const isNoindex = (html) =>
  /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) ||
  /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);

// Сегодняшняя дата по времени Торонто, а не UTC
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto' }).format(new Date());

const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function sitemapLastmod() {
  let site;
  let root;
  return {
    name: 'sitemap-lastmod',
    hooks: {
      'astro:config:done': ({ config }) => {
        if (!config.site) throw new Error('sitemap-lastmod: задайте `site` в astro.config.mjs');
        site = config.site.replace(/\/$/, '');
        root = fileURLToPath(config.root);
      },
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const statePath = path.join(root, STATE_FILE);
        let state = {};
        try { state = JSON.parse(await readFile(statePath, 'utf8')); } catch { /* первый запуск */ }

        const next = {};
        const changed = [];
        for (const rel of (await listHtml(distDir)).sort()) {
          if (rel === '404.html') continue;
          const html = await readFile(path.join(distDir, rel), 'utf8');
          if (isNoindex(html)) continue;
          const url = toUrlPath(rel);
          const hash = createHash('sha256').update(html).digest('hex').slice(0, 16);
          const prev = state[url];
          if (prev && prev.hash === hash) {
            next[url] = prev;
          } else {
            next[url] = { hash, lastmod: today() };
            changed.push(url);
          }
        }

        const removed = Object.keys(state).filter((u) => !(u in next));
        await writeFile(statePath, JSON.stringify(next, null, 2) + '\n');

        const body = Object.entries(next)
          .map(([url, { lastmod }]) => `  <url>\n    <loc>${xmlEscape(site + url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
          .join('\n');
        await writeFile(
          path.join(distDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
        );

        logger.info(`sitemap.xml: ${Object.keys(next).length} стр., lastmod обновлён: ${changed.length ? changed.join(', ') : 'нет'}`);
        if (removed.length) logger.info(`убраны из карты сайта: ${removed.join(', ')}`);
      },
    },
  };
}
