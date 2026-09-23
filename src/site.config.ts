// Config central del sitio. Un valor por sitio de nicho — no se toca el contenido para cambiar de tienda o de red de anuncios.
export const SITE = {
  name: import.meta.env.PUBLIC_SITE_NAME ?? 'Vatios Contados',
  description: import.meta.env.PUBLIC_SITE_DESCRIPTION ?? '',
  googleSiteVerification: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
  homeTitle: 'Vatios Contados: cuánto gasta cada aparato, en euros',
  // Imagen para redes (PNG/JPG 1200×630): se usa cuando la página no tiene imagen propia o es SVG,
  // porque Facebook, WhatsApp o X no muestran SVG en la vista previa. Vacío = sin og:image.
  ogImage: '/og-default.png',
};

// Tag de afiliado de Amazon por región. AmazonLink.astro decide el dominio/tag según esta tabla.
export const AMAZON_AFFILIATE = {
  defaultRegion: 'ES',
  regions: {
    ES: { domain: 'amazon.es', tag: import.meta.env.PUBLIC_AMAZON_TAG_ES ?? '' },
    US: { domain: 'amazon.com', tag: import.meta.env.PUBLIC_AMAZON_TAG_US ?? '' },
  },
} as const;

// Texto literal que exige el Acuerdo Operativo de Amazon Afiliados, visible en el sitio (pie y política de afiliación).
export const AMAZON_DISCLOSURE =
  'Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.';

// Anuncios manuales: el script solo se carga con el ID de cliente, y cada bloque solo aparece si además tiene su slot.
// Los bloques dentro del texto los inserta src/plugins/anuncios.mjs (configurado en astro.config.mjs).
export const ADSENSE = {
  clientId: import.meta.env.PUBLIC_ADSENSE_CLIENT_ID ?? '',
  enabled: Boolean(import.meta.env.PUBLIC_ADSENSE_CLIENT_ID),
  slotFinal: import.meta.env.PUBLIC_ADSENSE_SLOT_FINAL ?? '',
};

// Ezoic — alternativa/complemento a AdSense, sin mínimo de tráfico para entrar.
// No activar junto a ADSENSE en el mismo despliegue: Ezoic ya media anuncios de Google
// internamente, y cargar los dos scripts a la vez compite por el mismo inventario y duplica peso JS (CLS/LCP).
export const EZOIC = {
  siteId: import.meta.env.PUBLIC_EZOIC_SITE_ID ?? '',
  enabled: Boolean(import.meta.env.PUBLIC_EZOIC_SITE_ID),
};
