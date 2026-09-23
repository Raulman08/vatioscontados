import type { CollectionEntry } from 'astro:content';

export type Aparato = CollectionEntry<'aparatos'>;
type Calculo = Aparato['data']['calculo'];
export type Escenario = 'min' | 'tipico' | 'max';

const SEMANAS_POR_MES = 52 / 12;

// kWh de una "unidad" de uso: una hora encendido, un ciclo o un día (aparatos siempre en marcha).
export function kwhUnidad(calculo: Calculo, escenario: Escenario): number {
  switch (calculo.modo) {
    case 'potencia':
      return (calculo.vatios[escenario] / 1000) * calculo.cargaMedia;
    case 'ciclo':
      return calculo.kwhCiclo[escenario];
    case 'anual':
      return calculo.kwhAnual[escenario] / 365;
  }
}

export function kwhMes(calculo: Calculo, escenario: Escenario): number {
  switch (calculo.modo) {
    case 'potencia':
      return kwhUnidad(calculo, escenario) * calculo.horasDia * 30;
    case 'ciclo':
      return calculo.kwhCiclo[escenario] * calculo.ciclosSemana * SEMANAS_POR_MES;
    case 'anual':
      return calculo.kwhAnual[escenario] / 12;
  }
}

export const kwhAno = (aparato: Aparato, escenario: Escenario) =>
  kwhMes(aparato.data.calculo, escenario) * aparato.data.mesesUso;

export function etiquetaUnidad(calculo: Calculo): string {
  if (calculo.modo === 'potencia') return 'Por hora de uso';
  if (calculo.modo === 'ciclo') return `Por ${calculo.nombreCiclo}`;
  return 'Al día';
}

export const CATEGORIAS: Record<Aparato['data']['categoria'], string> = {
  climatizacion: 'Climatización',
  cocina: 'Cocina',
  lavado: 'Lavado',
  'agua-caliente': 'Agua caliente',
  electronica: 'Electrónica',
  iluminacion: 'Iluminación',
};

const numero = (n: number, decimales: number) =>
  n.toLocaleString('es-ES', { minimumFractionDigits: decimales, maximumFractionDigits: decimales });

// Céntimos cuando la cifra es pequeña, para que un cargador no salga "0,00 €".
export const euros = (n: number) => `${numero(n, n < 0.1 ? 3 : 2)} €`;
export const kwh = (n: number) => `${numero(n, n < 1 ? 2 : n < 100 ? 1 : 0)} kWh`;
export const eurKwh = (n: number) => `${numero(n, 3)} €/kWh`;
export const vatios = (n: number) => `${n.toLocaleString('es-ES')} W`;
