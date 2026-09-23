#!/usr/bin/env node
// Guarda en src/data/precio-luz-respaldo.json los últimos precios de REE, que el build usa si la API falla.
// Uso (desde la raíz del sitio): node scripts/actualizar-respaldo-precio.mjs
import { writeFileSync } from 'node:fs';
import { descargarPrecioLuz } from '../src/utils/precio-luz.mjs';

const datos = await descargarPrecioLuz();
writeFileSync(new URL('../src/data/precio-luz-respaldo.json', import.meta.url), `${JSON.stringify(datos, null, 2)}\n`);
console.log(`Respaldo actualizado: día ${datos.dia}, media 30 días ${datos.media30} €/kWh con impuestos.`);
