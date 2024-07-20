// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const articleCollection = defineCollection({
  type: "content",
  schema: z.object({
    articleId: z.string(),
    title: z.string(),
    pubDate: z.coerce.date(),
    lastUpdated: z.coerce.date(),
    description: z.string(),
    authorId: z.string(),
    cover: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    totalLikes: z.number(),
    totalComments: z.number(),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    projectId: z.string(),
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    github: z.string(),
    totalLikes: z.number(),
    totalComments: z.number(),
    authorId: z.string(),
  }),
});

const eventCollection = defineCollection({
  type: "content",
  schema: z.object({
    eventId: z.string(),
    title: z.string(),
    description: z.string(),
    timeline: z.object({
      registration: z.array(
        z.object({
          start: z.coerce.date(),
          end: z.coerce.date(),
        })
      ),
      start: z.coerce.date(),
      end: z.coerce.date(),
      timezone: z.string(),
      location: z.string(),
    }),
    registrationLink: z.string(),
    fee: z.number(),
    location: z.string(),
    cover: z.string(),
    totalLikes: z.number(),
    totalComments: z.number(),
    totalInterested: z.number(),
    category: z.enum(["workshop", "competition", "seminar", "conference"]),
    authorId: z.string(),
    contacts: z
      .object({
        email: z.string().nullable(),
        phone: z.string().nullable(),
        twitter: z.string().nullable(),
        linkedin: z.string().nullable(),
        github: z.string().nullable(),
        instagram: z.string().nullable(),
        website: z.string().nullable(),
      })
      .refine(
        (data) =>
          Object.values(data).some((value) => value !== null && value !== ""),
        {
          message: "At least one contact is required",
          path: ["contacts"],
        }
      ),
  }),
});

const communityCollection = defineCollection({
  type: "content",
  schema: z.object({
    communityId: z.string(),
    name: z.string(),
    description: z.string(),
    cover: z.string(),
    authorId: z.string(),
    totalMembers: z.number(),
    createdAt: z.date(),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  articles: articleCollection,
  projects: projectCollection,
  events: eventCollection,
  communities: communityCollection,
};
