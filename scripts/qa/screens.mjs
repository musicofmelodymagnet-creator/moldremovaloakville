// Скриншоты страницы (desktop 1440 + iPhone 13) и проверка ошибок консоли / горизонтального скролла.
// Запуск: node scripts/qa/screens.mjs <папка-для-скриншотов> [url]
import { chromium, devices } from 'playwright';
const out = process.argv[2], url = process.argv[3] || 'http://localhost:4321/';
const b = await chromium.launch();
for (const [n, o] of [['desk', { viewport: { width: 1440, height: 900 } }], ['mob', devices['iPhone 13']]]) {
  const p = await (await b.newContext({ ...o, reducedMotion: 'reduce' })).newPage();
  const errs = []; p.on('console', m => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', e => errs.push(e.message));
  await p.goto(url, { waitUntil: 'networkidle' });
  // прокрутить страницу, чтобы подгрузились lazy-картинки
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${out}/${n}-full.png`, fullPage: true });
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  const ov = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log(n, 'height', h, 'overflowX', ov, 'errors', JSON.stringify(errs));
}
await b.close();
