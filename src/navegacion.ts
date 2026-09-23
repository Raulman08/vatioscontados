// Secciones de guías. Cada una tiene su guía pilar en src/content/guias/<slug>.md (URL /<slug>/)
// y sus guías en src/content/guias/<slug>/*.md (URL /<slug>/<archivo>/).
// Los aparatos (/aparatos/) y las herramientas (/calculadora/, /precio-luz/) son páginas propias, no guías.
export const SECCIONES = [{ slug: 'ahorro', label: 'Ahorrar' }] as const;

export type Seccion = (typeof SECCIONES)[number];

export const MENU = [
  { href: '/aparatos/', label: 'Aparatos' },
  { href: '/calculadora/', label: 'Calculadora' },
  { href: '/precio-luz/', label: 'Precio de la luz' },
  { href: '/ahorro/', label: 'Ahorrar' },
];

export const PIE = [
  { href: '/como-calculamos/', label: 'Cómo calculamos' },
  { href: '/sobre-vatios-contados/', label: 'Sobre Vatios Contados' },
  { href: '/aviso-legal/', label: 'Aviso Legal' },
  { href: '/politica-privacidad/', label: 'Privacidad' },
  { href: '/politica-cookies/', label: 'Cookies' },
  { href: '/politica-afiliacion/', label: 'Afiliación' },
];
