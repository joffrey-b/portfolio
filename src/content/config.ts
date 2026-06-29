import { defineCollection, z } from 'astro:content';

const roleSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

const roles = defineCollection({ type: 'content', schema: roleSchema });
const rolesFr = defineCollection({ type: 'content', schema: roleSchema });

const infrastructure = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      type: z.enum(['hardware', 'service']),
      group: z.enum(['core', 'app']).default('core'),
      category: z.string().optional(),
      subtitle: z.string(),
      description: z.string(),
      order: z.number(),
      specs: z.array(z.string()).default([]),
      icon: z.string().optional(),
      openSource: z.boolean().optional(),
      screenshots: z
        .array(
          z.object({
            caption: z.string(),
            image: image().optional(),
          }),
        )
        .default([]),
      relatedRoles: z.array(z.string()).default([]),
    }),
});

const infrastructureFr = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      type: z.enum(['hardware', 'service']),
      group: z.enum(['core', 'app']).default('core'),
      category: z.string().optional(),
      subtitle: z.string(),
      description: z.string(),
      order: z.number(),
      specs: z.array(z.string()).default([]),
      icon: z.string().optional(),
      openSource: z.boolean().optional(),
      screenshots: z
        .array(
          z.object({
            caption: z.string(),
            image: image().optional(),
          }),
        )
        .default([]),
      relatedRoles: z.array(z.string()).default([]),
    }),
});

export const collections = {
  roles,
  'roles-fr': rolesFr,
  infrastructure,
  'infrastructure-fr': infrastructureFr,
};
