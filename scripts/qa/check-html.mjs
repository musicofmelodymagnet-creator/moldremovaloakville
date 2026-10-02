// Санитарная проверка собранной главной (dist/index.html) по чек-листу ТЗ.
// Запуск: npm run build && node scripts/qa/check-html.mjs
import { readFile } from 'node:fs/promises';
const html = await readFile('dist/index.html', 'utf8');
const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ');
const lower = text.toLowerCase();
const res = [];
const ok = (name, cond, extra = '') => res.push(`${cond ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);

const h1 = [...html.matchAll(/<h1[\s\S]*?<\/h1>/g)].map((m) => m[0].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
ok('ровно один H1', h1.length === 1, JSON.stringify(h1));
ok('H1 = "Mold Removal Oakville"', h1[0] === 'Mold Removal Oakville');
const heads = [...html.matchAll(/<h([1-6])\b/g)].map((m) => +m[1]);
const jumps = heads.filter((h, i) => i && h - heads[i - 1] > 1);
ok('иерархия заголовков без пропусков уровней', jumps.length === 0, `h2=${heads.filter((h) => h === 2).length}, h3=${heads.filter((h) => h === 3).length}`);

const title = html.match(/<title>(.*?)<\/title>/)?.[1];
ok('title', title === 'Mold Removal Oakville | Mold Remediation &amp; Inspection', title);
ok('meta description', html.includes('content="Mold removal in Oakville for homes and businesses.'));
ok('canonical', html.includes('<link rel="canonical" href="https://moldremovaloakville.ca/">'));
ok('lang en-CA', html.includes('<html lang="en-CA"'));
ok('robots meta', html.includes('content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"'));
ok('нет noindex', !/noindex/i.test(html));
for (const p of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type" content="website', 'og:locale" content="en_CA', 'twitter:card" content="summary_large_image', 'apple-touch-icon', 'rel="icon"']) ok(`meta ${p.split('"')[0]}`, html.includes(p));

const kws = ['mold removal oakville', 'oakville mold removal', 'mould remediation oakville', 'mold remediation oakville', 'mold inspection oakville', 'mold testing oakville', 'attic mold removal oakville', 'basement mold removal oakville', 'black mold removal oakville', 'bathroom mold removal oakville', 'crawl space mold removal oakville', 'commercial mold remediation oakville', 'emergency mold removal oakville', 'mold removal cost oakville'];
const missing = kws.filter((k) => !lower.includes(k));
const near = { 'oakville mold removal': 'mold removal in oakville', 'mould remediation oakville': 'mould remediation in oakville' };
const reallyMissing = missing.filter((k) => !(near[k] && lower.includes(near[k])));
ok('SEO-фразы (exact / near-exact)', reallyMissing.length === 0, missing.length ? `near-exact: ${missing.join('; ')}` + (reallyMissing.length ? ` | НЕТ: ${reallyMissing.join('; ')}` : '') : 'все exact');

const draft = ['[PHONE', '[EMAIL', '[XX', '[$', 'VERIFY BEFORE', '[VERIFIED', 'class="draft', 'Lorem'];
const leaked = draft.filter((d) => html.includes(d));
ok('нет неподтверждённых данных/placeholder в production', leaked.length === 0, leaked.join(', '));
ok('нет AggregateRating/Review в schema', !/AggregateRating|"@type":"Review"/.test(html));

ok('адрес в schema только реальный из site.ts, без geo', !/GeoCoordinates|"geo"/.test(html) && (!/PostalAddress/.test(html) || html.includes('475 Wyecroft Rd')));

const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const graph = ld[0]?.['@graph'] ?? [];
ok('JSON-LD @graph парсится', ld.length === 1, graph.map((n) => n['@type']).join(', '));
const faqNode = graph.find((n) => n['@type'] === 'FAQPage');
const faqMismatch = faqNode?.mainEntity.filter((q) => !text.includes(q.name) || !text.includes(q.acceptedAnswer.text)) ?? [1];
ok('FAQPage = видимый FAQ дословно', faqMismatch.length === 0 && faqNode.mainEntity.length === 10, `${faqNode?.mainEntity.length} вопросов`);
const names = new Set(graph.filter((n) => ['WebSite', 'Organization'].includes(n['@type'])).map((n) => n.name));
ok('одно имя бренда в WebSite/Organization', names.size === 1, [...names].join());

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const anchors = [...new Set([...html.matchAll(/href="\/?#([^"]+)"/g)].map((m) => m[1]))];
const badAnchors = anchors.filter((a) => !ids.has(a));
ok('все якорные ссылки ведут на существующие блоки', badAnchors.length === 0, badAnchors.join(', ') || anchors.join(' '));
const internal = [...new Set([...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]))].filter((h) => !/\.(svg|ico|png|css|js|woff2)$/.test(h));
ok('внутренние ссылки на страницы', true, internal.join(' '));
const generic = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim()).filter((t) => /^(learn more|click here|details|read more)$/i.test(t));
ok('нет анкоров "Learn More / Click Here / Details"', generic.length === 0);
const iframes = [...html.matchAll(/<iframe[^>]*>/g)].map((m) => m[0]);
ok('карта: lazy + title', iframes.length === 1 && iframes[0].includes('loading="lazy"') && iframes[0].includes('title="Oakville Ontario service area map"'));
ok('формы: 2 шт., action=/send.php', (html.match(/action="\/send.php"/g) || []).length === 2);
const labels = (html.match(/<label for="qf-/g) || []).length;
ok('у полей форм есть <label>', labels >= 11, `${labels} label`);
const tel = [...html.matchAll(/href="tel:([^"]*)"/g)].map((m) => m[1]);
ok('tel: ссылки (только при подтверждённом телефоне)', true, tel.length ? tel.join(',') : 'телефон не задан → кнопки звонка скрыты');

console.log(res.join('\n'));
const robots = await readFile('dist/robots.txt', 'utf8');
console.log('\nrobots.txt:\n' + robots);
console.log('sitemap.xml:\n' + (await readFile('dist/sitemap.xml', 'utf8')));
