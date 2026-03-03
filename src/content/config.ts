import { defineCollection, z } from 'astro:content';

const roleSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

const roles = defineCollection({ type: 'content', schema: roleSchema });
const rolesFr = defineCollection({ type: 'content', schema: roleSchema });

export const collections = { roles, 'roles-fr': rolesFr };
