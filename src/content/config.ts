import { defineCollection, z } from 'astro:content';

const PillarEnum = z.enum(['money', 'health', 'character', 'relationships', 'faith']);
const BookSizeEnum = z.enum(['tall', 'med', 'short']);
const TitleSizeEnum = z.enum(['default', 'sm', 'xs']);

const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pillar: PillarEnum,
    shelf: z.string(),
    shelfLabel: z.string(),
    shelfOrder: z.number(),
    bookColor: z.string(),
    bookSize: BookSizeEnum,
    titleSize: TitleSizeEnum.default('default'),
    hasExcerpts: z.boolean().default(false),
    hasTakeaways: z.boolean().default(false),
    hasDeepDive: z.boolean().default(false),
    metaDescription: z.string().optional(),
  }),
});

// Takeaways collection: one .md file per book slug, raw markdown notes
const takeaways = defineCollection({
  type: 'content',
  schema: z.object({}),
});

// Excerpts collection: one .md file per book slug, raw HTML from source site.
// Kept as .md (not .mdx) so HTML attributes like class="…" pass through intact.
const excerpts = defineCollection({
  type: 'content',
  schema: z.object({}),
});

export const collections = { books, takeaways, excerpts };
