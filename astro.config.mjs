// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemapLastmod from './integrations/sitemap-lastmod.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://moldremovaloakville.ca',
  integrations: [sitemapLastmod()],
  // Сжатие фото: визуально без потерь (SSIM ≥ 0.97 к исходнику), мелкая текстура плесени не «замыливается».
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        avif: { quality: 64, effort: 6 },
        webp: { quality: 84, effort: 6, smartSubsample: true },
        jpeg: { quality: 82, mozjpeg: true },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});