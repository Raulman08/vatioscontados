// Precio de la luz PVPC desde la API pública de Red Eléctrica (apidatos.ree.es, sin clave).
// REE da el término de energía en €/MWh con peajes y cargos, sin impuestos. Aquí se pasa a €/kWh con
// impuesto especial sobre la electricidad (5,11269632 %) e IVA (21 %): es el coste real de cada kWh extra
// que gasta un aparato. La potencia contratada y el contador no dependen del consumo y no se incluyen.
const API = 'https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real';
export const FACTOR_IMPUESTOS = 1.0511269632 * 1.21;
const DIA_MS = 86_400_000;

const fechaMadrid = (fecha) => fecha.toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const media = (lista) => lista.reduce((a, b) => a + b, 0) / lista.length;
const redondear = (n) => Math.round(n * 10_000) / 10_000;

export async function descargarPrecioLuz(ahora = new Date()) {
  // La API admite como mucho 31 días por petición: 29 hacia atrás + hoy + mañana (si ya está publicado, tras las 20:15).
  const inicio = fechaMadrid(new Date(ahora.getTime() - 29 * DIA_MS));
  const fin = fechaMadrid(new Date(ahora.getTime() + DIA_MS));
  const url = `${API}?start_date=${inicio}T00:00&end_date=${fin}T23:59&time_trunc=hour`;

  const respuesta = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!respuesta.ok) throw new Error(`REE respondió ${respuesta.status}`);
  const pvpc = (await respuesta.json()).included?.find((serie) => serie.type === 'PVPC');
  if (!pvpc) throw new Error('la respuesta de REE no trae la serie PVPC');

  const valores = pvpc.attributes.values.map((v) => ({
    fecha: v.datetime.slice(0, 10),
    hora: Number(v.datetime.slice(11, 13)),
    eurKwh: v.value / 1000,
  }));

  const porDia = Map.groupBy(valores, (v) => v.fecha);
  // Un día completo tiene 24 horas (23 o 25 en los cambios de hora).
  const diasCompletos = [...porDia].filter(([, horas]) => horas.length >= 23).map(([fecha]) => fecha).sort();
  const dia = diasCompletos.at(-1);
  if (!dia) throw new Error('REE no devolvió ningún día completo');

  const ultimos30 = diasCompletos.slice(-30);
  const valores30 = valores.filter((v) => ultimos30.includes(v.fecha)).map((v) => v.eurKwh);
  const horas = porDia
    .get(dia)
    .sort((a, b) => a.hora - b.hora)
    .map((h) => ({ hora: h.hora, eurKwh: redondear(h.eurKwh * FACTOR_IMPUESTOS) }));

  return {
    fuente: 'ree',
    consultado: ahora.toISOString(),
    dia,
    horas,
    mediaDia: redondear(media(horas.map((h) => h.eurKwh))),
    media30: redondear(media(valores30) * FACTOR_IMPUESTOS),
    media30SinImpuestos: redondear(media(valores30)),
    dias30: { desde: ultimos30[0], hasta: ultimos30.at(-1) },
  };
}
