import { z } from 'zod';
import { zock } from 'zocker';

// Test Zocker with the existing Post schema
const postSchema = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

// Generate a single post
const post = zock(postSchema);
console.log('Generated Post:', post);

// Generate multiple posts
const posts = Array.from({ length: 5 }, () => zock(postSchema));
console.log('Generated Posts:', posts);

export { zock, postSchema };