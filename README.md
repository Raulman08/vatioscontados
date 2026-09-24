#proyecto #pseo #anuncios #energia

# Vatios Contados

Segundo sitio del sistema [[00_Sistema_Webs_Automatizadas|Webs_Automatizadas_pSEO]], creado el 2026-09-23 a partir de `_Base_Astro`. Nicho: **cuánto gasta cada aparato de casa en euros**, con el precio real de la luz (PVPC) de Red Eléctrica. Monetización principal prevista: **anuncios** (búsquedas informativas de mucho volumen); afiliación secundaria (medidores de consumo, aparatos eficientes). Por qué este nicho, en §0.2 del documento maestro.

**Repo independiente del vault**: tiene su propio `.git` y la carpeta está en el `.gitignore` raíz del vault. Remoto: `github.com/Raulman08/vatioscontados` (privado, primer push el 2026-09-24).

## Estado

- En producción: `https://vatioscontados.pages.dev` (Cloudflare Pages, proyecto `vatioscontados`, subida directa con `wrangler`).
- Contenido: 18 aparatos, 5 guías de ahorro, calculadora, precio de la luz por horas, "Cómo calculamos" y "Sobre".
- Google Search Console: propiedad `https://vatioscontados.pages.dev/` verificada el 2026-09-24 (etiqueta HTML en `PUBLIC_GOOGLE_SITE_VERIFICATION` del `.env`; no quitarla). Indexación solicitada a partir del 25/09.
- Pendiente: dominio (candidato `vatioscontados.es`, sin DNS el 2026-09-23; confirmar en el registrador), AdSense, importar los flujos de n8n.

## Cómo funciona

| Qué | Dónde |
|---|---|
| Fichas de aparatos (una por página, `/aparatos/<archivo>/`) | `src/content/aparatos/*.md` |
| Cálculo de kWh (potencia, por ciclo o anual) | `src/utils/consumo.ts` |
| Precio de la luz (API de REE al compilar, con respaldo) | `src/utils/precio-luz.mjs`, `src/data/precio-luz.ts`, `src/data/precio-luz-respaldo.json` |
| Plantillas de aparato, tabla de aparatos, precio y calculadora | `src/pages/aparatos/[slug].astro`, `src/pages/aparatos/index.astro`, `src/pages/precio-luz.astro`, `src/pages/calculadora.astro` |
| Guías (la URL es la ruta del archivo) | `src/content/guias/` |
| Menú y pie | `src/navegacion.ts` |

**Los euros nunca se escriben a mano**: cada ficha define rangos de consumo (kWh o W) y un uso supuesto, y la web calcula el coste con la media del PVPC de los últimos 30 días (con impuesto eléctrico e IVA) en cada build. En los textos y las FAQ, usar kWh y vatios, no euros, para que nunca queden desfasados.

## Añadir un aparato

Crear `src/content/aparatos/<slug>.md` copiando uno parecido:

- `calculo.modo`:
  - `potencia` (W × horas × `cargaMedia`): aparatos con termostato o compresor llevan `cargaMedia` < 1.
  - `ciclo` (kWh por lavado o secado): lavadora, lavavajillas, secadora.
  - `anual` (kWh/año de la etiqueta): nevera, termo.
- `articulo` (`un`/`una`) para que concuerden los textos generados.
- `mesesUso` < 12 para aparatos de temporada.
- `relacionados` y `guias` para el bloque "Siguiente paso".

El build valida los rangos (`min ≤ tipico ≤ max`), las longitudes SEO y las referencias.

## Publicar

- **Contenido:** flujo de n8n "Vatios Contados — Publicar" ([[n8n_vatios_contados]]) o a mano:
  ```sh
  export PATH="/home/raul/.local/node22/bin:$PATH"
  npm run build
  git add -A && git commit -m "..."
  npx wrangler pages deploy dist --project-name=vatioscontados --branch=master
  ```
- **Precios:** flujo diario "Vatios Contados — Precio de la luz diario" (20:45). A mano: `node scripts/actualizar-respaldo-precio.mjs` y publicar.

## Activar AdSense

Igual que en Metros Contados (ver su README): dominio propio + aprobación + CMP de Google + dos bloques de anuncio en el `.env`. Aquí el bloque final ya está en las fichas de aparatos, la tabla, la calculadora y el precio de la luz; los bloques dentro del texto van en las guías.
