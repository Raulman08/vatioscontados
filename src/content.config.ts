import { defineCollection, reference, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const faq = z.object({ question: z.string(), answer: z.string() });

const guias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guias' }),
  schema: z.object({
    title: z.string(),
    // <title> alternativo cuando el H1 pasa de ~60 caracteres (Google lo cortaría).
    seoTitle: z.string().max(60).optional(),
    // Límite práctico: Google corta la meta description hacia los 155–160 caracteres.
    description: z.string().max(160),
    resumen: z.string().optional(),
    tipo: z.enum(['pilar', 'guia', 'comparativa', 'medidas', 'pagina']),
    image: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    orden: z.number().default(100),
    modelos: z.array(reference('modelos')).default([]),
    siguiente: z.array(reference('guias')).default([]),
    faqs: z.array(faq).default([]),
    draft: z.boolean().default(false),
  }),
});

// Modelos concretos que se recomiendan dentro de las guías. Sin precios: los términos de Amazon
// Afiliados no permiten mostrar precios que no vengan de su API y se actualicen a diario.
const modelos = defineCollection({
  loader: file('src/data/modelos.json'),
  schema: z
    .object({
      nombre: z.string(),
      marca: z.string().optional(),
      asin: z.string().regex(/^[A-Z0-9]{10}$/).optional(),
      url: z.string().url().optional(),
      tienda: z.string().default('Amazon'),
      etiqueta: z.string().optional(),
      resumen: z.string().optional(),
      medidas: z.object({
        ancho: z.number().positive(),
        fondo: z.number().positive(),
        alto: z.number().positive(),
        abierto: z.string().optional(),
      }),
      pros: z.array(z.string()).default([]),
      contras: z.array(z.string()).default([]),
      verificado: z.coerce.date(),
    })
    .refine((m) => m.asin || m.url, { message: 'Cada modelo necesita "asin" (Amazon) o "url" (otra tienda).' }),
});

const rango = z
  .object({ min: z.number().positive(), tipico: z.number().positive(), max: z.number().positive() })
  .refine((r) => r.min <= r.tipico && r.tipico <= r.max, { message: 'Debe cumplirse min ≤ tipico ≤ max.' });

// Una página por aparato (/aparatos/<archivo>/). El consumo se calcula en src/utils/consumo.ts y el coste con
// el precio de la luz del build, así los euros de la página nunca quedan desfasados respecto a los kWh.
const aparatos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/aparatos' }),
  schema: z.object({
    nombre: z.string(),
    // Para concordar en los textos generados: "una lavadora", "un horno".
    articulo: z.enum(['un', 'una']).default('un'),
    title: z.string(),
    seoTitle: z.string().max(60).optional(),
    description: z.string().max(160),
    categoria: z.enum(['climatizacion', 'cocina', 'lavado', 'agua-caliente', 'electronica', 'iluminacion']),
    calculo: z.discriminatedUnion('modo', [
      // Aparatos que se miden por potencia × horas. cargaMedia < 1 en los que tienen termostato o compresor,
      // que no trabajan a plena potencia todo el tiempo que están encendidos.
      z.object({
        modo: z.literal('potencia'),
        vatios: rango,
        horasDia: z.number().positive(),
        cargaMedia: z.number().min(0.05).max(1).default(1),
      }),
      z.object({
        modo: z.literal('ciclo'),
        kwhCiclo: rango,
        ciclosSemana: z.number().positive(),
        nombreCiclo: z.string().default('ciclo'),
      }),
      // Aparatos que están siempre funcionando y cuya etiqueta energética da el consumo anual.
      z.object({ modo: z.literal('anual'), kwhAnual: rango }),
    ]),
    // Meses al año que se usa (aire acondicionado, radiadores…). El coste anual se calcula con ellos.
    mesesUso: z.number().int().min(1).max(12).default(12),
    usoSupuesto: z.string(),
    standbyW: z.number().nonnegative().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    relacionados: z.array(reference('aparatos')).default([]),
    guias: z.array(reference('guias')).default([]),
    modelos: z.array(reference('modelos')).default([]),
    faqs: z.array(faq).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guias, modelos, aparatos };
