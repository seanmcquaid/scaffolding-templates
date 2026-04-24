import { createServerFn } from '@tanstack/start/server';
import { z } from 'zod';
import { postSchema } from '@/types/Post';

export const getPostsServerFn = createServerFn().handler(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return z.array(postSchema).parse(data);
});

export const getPostServerFn = createServerFn()
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${data.id}`,
    );
    const json = await response.json();
    return postSchema.parse(json);
  });
