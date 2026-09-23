import type { APIRoute } from 'astro';

// Generado desde `site` (astro.config.mjs) para que la URL del sitemap cambie sola al pasar al dominio propio.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
