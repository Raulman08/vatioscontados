---
title: "Cómo calculamos el consumo y el coste"
description: "De dónde sale el precio de la luz que usamos, qué impuestos incluye, cómo estimamos el consumo de cada aparato y qué no tenemos en cuenta."
tipo: "pagina"
pubDate: 2026-09-23
---

Todas las cifras en euros de Vatios Contados salen de dos datos: **lo que consume el aparato** y **lo que cuesta cada kWh**. Así es como obtenemos cada uno.

## El precio de la luz

- **Fuente:** el precio voluntario para el pequeño consumidor (PVPC), hora a hora, publicado por Red Eléctrica en su API pública de datos.
- **Precio medio:** la media de todas las horas de los últimos 30 días disponibles. Es la cifra que usamos en las fichas y en la calculadora, y en cada página indicamos las fechas.
- **Impuestos:** el dato de Red Eléctrica incluye la energía, los peajes y los cargos, pero no los impuestos. Le añadimos el impuesto especial sobre la electricidad (5,11269632 %) y el IVA (21 %), que es lo que pagas por cada kWh extra.
- **Actualización:** la web se reconstruye con los datos más recientes. Si un día la fuente no respondiera, usaríamos los últimos datos guardados y la fecha lo indicaría.

**Lo que no incluye:** el término de potencia y el alquiler del contador, porque no dependen de cuánto uses cada aparato. Tampoco el bono social ni descuentos de tu comercializadora.

**Si no tienes PVPC:** con una tarifa del mercado libre pagas el precio de tu contrato. Pon ese precio (con impuestos) en la calculadora de cualquier ficha y el resultado será el tuyo.

**Canarias, Ceuta y Melilla:** allí no se aplica el IVA sino otros impuestos indirectos (IGIC o IPSI), así que el precio real por kWh es algo distinto; también conviene poner el tuyo en la calculadora.

## El consumo de cada aparato

- **Rangos, no un único número.** Para cada aparato damos un consumo bajo, típico y alto, basados en las potencias y consumos habituales de los modelos que se venden en España y en sus etiquetas energéticas.
- **Uso supuesto explícito.** Cada ficha dice cuántas horas o ciclos suponemos. Si tu uso es distinto, la calculadora te deja cambiarlo.
- **Aparatos con termostato o compresor** (nevera, horno, aire acondicionado, radiadores): no funcionan a plena potencia todo el tiempo, así que aplicamos un porcentaje de uso a plena potencia, indicado en cada caso, o usamos el consumo anual de la etiqueta.

Son estimaciones razonables para decidir, no una medición de tu aparato. Para saber lo que gasta el tuyo, lo más fiable es medirlo: lo explicamos en [cómo calcular el consumo](/ahorro/como-calcular-consumo/).

## Correcciones

Si ves un dato que no cuadra, escríbenos (el contacto está en el [aviso legal](/aviso-legal/)) y lo revisamos.
