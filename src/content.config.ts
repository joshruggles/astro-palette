import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { slugifyTag } from './lib/tags';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // Tags with the same slug share an archive page, so keep the first spelling.
    tags: z.array(z.string()).default([]).transform(tags => {
      const slugs = tags.map(slugifyTag);
      return tags.filter((_, index) => slugs.indexOf(slugs[index]) === index);
    }),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
