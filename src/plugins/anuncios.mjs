// Plugin HAST de Sätteri (el procesador Markdown por defecto de Astro 7) que inserta anuncios dentro del
// texto de las guías según las reglas del documento maestro (§1.5): solo en guías informativas (nunca en
// comparativas, que compiten con el clic de afiliado), como mucho uno cada `cadaPalabras` palabras, solo
// entre bloques de primer nivel tras un párrafo (nunca dentro de listas o tablas, ni entre un párrafo y la
// lista o tabla que introduce) y nunca al final del texto, que ya lleva su propio bloque.
// Sin cliente o sin slot devuelve null y no se registra.
const TIPOS = new Set(['pilar', 'guia', 'medidas']);
const NO_SEPARAR_DE = new Set(['ul', 'ol', 'table']);

// Mismo marcado que src/utils/anuncios.mjs, como nodos HAST (Sätteri no admite HTML en crudo en insertAfter).
const bloque = (client, slot) => ({
  type: 'element',
  tagName: 'aside',
  properties: { className: ['anuncio'], ariaLabel: 'Publicidad' },
  children: [
    {
      type: 'element',
      tagName: 'span',
      properties: { className: ['anuncio__etiqueta'] },
      children: [{ type: 'text', value: 'Publicidad' }],
    },
    {
      type: 'element',
      tagName: 'ins',
      properties: {
        className: ['adsbygoogle'],
        style: 'display:block',
        dataAdClient: client,
        dataAdSlot: slot,
        dataAdFormat: 'auto',
        dataFullWidthResponsive: 'true',
      },
      children: [],
    },
    {
      type: 'element',
      tagName: 'script',
      properties: {},
      children: [{ type: 'text', value: '(adsbygoogle = window.adsbygoogle || []).push({});' }],
    },
  ],
});

export default function anuncios({ client, slot, cadaPalabras = 350, maximo = 3 } = {}) {
  if (!client || !slot) return null;

  return {
    name: 'metros-contados-anuncios',
    after(root, ctx) {
      if (!TIPOS.has(ctx.data.astro?.frontmatter?.tipo)) return;

      const elementos = root.children.filter((n) => n.type === 'element');
      let acumuladas = 0;
      let puestos = 0;

      elementos.forEach((nodo, i) => {
        acumuladas += ctx.textContent(nodo).split(/\s+/).filter(Boolean).length;
        const siguiente = elementos[i + 1];
        const puedeIr =
          nodo.tagName === 'p' &&
          siguiente !== undefined &&
          !NO_SEPARAR_DE.has(siguiente.tagName) &&
          acumuladas >= cadaPalabras &&
          puestos < maximo;

        if (puedeIr) {
          ctx.insertAfter(nodo, bloque(client, slot));
          acumuladas = 0;
          puestos += 1;
        }
      });
    },
  };
}
