// Генерирует фирменные картинки в public/ из аватарки сайта (src/assets/brand/mold-removal-oakville-logo.jpg):
// favicon.svg, favicon.ico, apple-touch-icon.png, logo.png (для JSON-LD), og-image.png (1200×630).
// Запуск: npm run brand
import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';

const logo = `data:image/jpeg;base64,${(await readFile('src/assets/brand/mold-removal-oakville-logo.jpg')).toString('base64')}`;
const heroPhoto = `data:image/jpeg;base64,${(await readFile('src/assets/hero/mold-removal-oakville-technician-treatment.jpeg')).toString('base64')}`;
const BG = '#f9f6f1'; // фон аватарки

const browser = await chromium.launch();
const page = await browser.newPage();
async function shot(html, w, h, path) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0">${html}</body></html>`);
  await page.waitForLoadState('networkidle');
  return page.screenshot({ path, clip: { x: 0, y: 0, width: w, height: h } });
}
// Квадратная иконка: аватарка чуть обрезана по краям, чтобы домик читался в маленьком размере
const icon = (size, zoom = 1.12) =>
  `<div style="width:${size}px;height:${size}px;background:${BG};overflow:hidden;display:grid;place-items:center">
     <img src="${logo}" style="width:${size * zoom}px;height:${size * zoom}px;object-fit:cover"></div>`;

await shot(icon(512, 1), 512, 512, 'public/logo.png');
await shot(icon(180), 180, 180, 'public/apple-touch-icon.png');
const png64 = await shot(icon(64, 1.2), 64, 64, undefined);
await writeFile('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${png64.toString('base64')}"/></svg>`);
const ico32 = await shot(icon(32, 1.2), 32, 32, undefined);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(ico32.length, 14); header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, ico32]));

// OG image: главное фото + название сайта, как на первом экране (без выдуманных цифр)
await shot(`<div style="width:1200px;height:630px;position:relative;overflow:hidden;font-family:'Manrope','Inter',system-ui,sans-serif">
  <img src="${heroPhoto}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:68% 12%">
  <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(24,29,22,.92) 0%,rgba(24,29,22,.55) 40%,rgba(24,29,22,0) 75%)"></div>
  <div style="position:absolute;left:64px;top:56px;display:flex;align-items:center;gap:16px">
    <div style="width:72px;height:72px;border-radius:18px;overflow:hidden;background:${BG}"><img src="${logo}" style="width:100%;height:100%"></div>
  </div>
  <div style="position:absolute;left:64px;bottom:64px;color:#fff">
    <div style="font-size:104px;font-weight:800;line-height:.92;letter-spacing:-.02em">Mold Removal<br><span style="color:#cfd6c8">Oakville</span></div>
    <div style="margin-top:26px;font-size:30px;font-weight:600;color:#d4af72">Mold does not always stop where the stain stops.</div>
  </div>
</div>`, 1200, 630, 'public/og-image.png');

await browser.close();
console.log('brand assets generated');
