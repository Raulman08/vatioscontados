// Bloque de anuncio manual de AdSense (unidad adaptable). Se reutiliza en el plugin rehype y en Anuncio.astro.
export function htmlAnuncio(client, slot) {
  return (
    '<aside class="anuncio" aria-label="Publicidad">' +
    '<span class="anuncio__etiqueta">Publicidad</span>' +
    `<ins class="adsbygoogle" style="display:block" data-ad-client="${client}" data-ad-slot="${slot}"` +
    ' data-ad-format="auto" data-full-width-responsive="true"></ins>' +
    '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>' +
    '</aside>'
  );
}
