// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { satteri } from '@astrojs/markdown-satteri';

import sitemap from '@astrojs/sitemap';
import anuncios from './src/plugins/anuncios.mjs';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_');

// https://astro.build/config
export default defineConfig({
  // Pendiente de dominio propio (candidato: vatioscontados.es). Al cambiarlo, el robots.txt y el sitemap se actualizan solos.
  site: 'https://vatioscontados.pages.dev',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      hastPlugins: [anuncios({ client: env.PUBLIC_ADSENSE_CLIENT_ID, slot: env.PUBLIC_ADSENSE_SLOT_CONTENIDO })],
    }),
  },
});
