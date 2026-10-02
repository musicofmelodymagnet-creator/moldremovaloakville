// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemapLastmod from './integrations/sitemap-lastmod.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://moldremovaloakville.ca',
  integrations: [sitemapLastmod()],
  vite: {
    plugins: [tailwindcss()]
  }
});