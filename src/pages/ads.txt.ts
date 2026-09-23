import type { APIRoute } from 'astro';
import { ADSENSE } from '../site.config';

// f08c47fec0942fa0 es el identificador fijo de Google en ads.txt. Sin AdSense, el archivo declara que no hay vendedores autorizados.
export const GET: APIRoute = () => {
  const cuerpo = ADSENSE.enabled
    ? `google.com, ${ADSENSE.clientId.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`
    : '# Sin redes de anuncios activas.\n';
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
