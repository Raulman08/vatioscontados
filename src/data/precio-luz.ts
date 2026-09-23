import respaldo from './precio-luz-respaldo.json';
import { descargarPrecioLuz } from '../utils/precio-luz.mjs';

export interface PrecioLuz {
  fuente: 'ree' | 'respaldo';
  consultado: string;
  dia: string;
  horas: { hora: number; eurKwh: number }[];
  mediaDia: number;
  media30: number;
  media30SinImpuestos: number;
  dias30: { desde: string; hasta: string };
}

let cache: Promise<PrecioLuz> | undefined;

// Una sola descarga por build. Si REE falla, se usa la última copia guardada (scripts/actualizar-respaldo-precio.mjs)
// para que el build no se rompa; las páginas muestran siempre la fecha de los datos.
export function obtenerPrecioLuz(): Promise<PrecioLuz> {
  cache ??= descargarPrecioLuz().catch((error: Error) => {
    console.warn(`[precio-luz] REE no disponible (${error.message}); usando el respaldo del ${respaldo.dia}.`);
    return { ...respaldo, fuente: 'respaldo' } as PrecioLuz;
  });
  return cache;
}
