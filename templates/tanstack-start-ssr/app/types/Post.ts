import { z } from 'zod';

export const postSchema = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

type Post = z.infer<typeof postSchema>;

export default Post;
