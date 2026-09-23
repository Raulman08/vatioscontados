import type { CollectionEntry } from 'astro:content';
import { SECCIONES, type Seccion } from '../navegacion';

export type Guia = CollectionEntry<'guias'>;

// La URL es la ruta del archivo: guias/dormitorio.md → /dormitorio/, guias/dormitorio/camas-abatibles.md → /dormitorio/camas-abatibles/
export function rutaDe(guia: Guia): string {
  return `/${guia.id}/`;
}

export function seccionDe(guia: Guia): Seccion | undefined {
  const partes = guia.id.split('/');
  if (partes.length > 2) {
    throw new Error(`"${guia.id}": las guías solo admiten un nivel de carpeta (sección/archivo).`);
  }
  const esRaiz = partes.length === 1;
  if (esRaiz && guia.data.tipo !== 'pilar') return undefined;
  if (!esRaiz && guia.data.tipo === 'pilar') {
    throw new Error(`"${guia.id}": una guía pilar va en la raíz (guias/<seccion>.md), no dentro de la carpeta.`);
  }

  const seccion = SECCIONES.find((s) => s.slug === partes[0]);
  if (!seccion) {
    throw new Error(`"${guia.id}": la sección "${partes[0]}" no está definida en src/navegacion.ts.`);
  }
  return seccion;
}

export const ETIQUETA_TIPO: Record<Guia['data']['tipo'], string> = {
  pilar: 'Guía completa',
  guia: 'Guía',
  comparativa: 'Qué comprar',
  medidas: 'Medidas',
  pagina: '',
};

export const fechaDe = (guia: Guia) => guia.data.updatedDate ?? guia.data.pubDate;

export const porOrden = (a: Guia, b: Guia) =>
  a.data.orden - b.data.orden || a.data.title.localeCompare(b.data.title, 'es');
