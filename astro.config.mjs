// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Site configuration. Update the values in site.config.ts to customize.
const SITE = {
  url: 'https://kbber.github.io',
};

export default defineConfig({
  site: SITE.url,
  integrations: [
    react(),
    sitemap(),
  ],
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      assetsInlineLimit: 4096,
    },
  },
});
