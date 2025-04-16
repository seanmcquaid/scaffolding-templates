import type Post from '@/types/Post';
import { postSchema } from '@/types/Post';
import { z } from 'zod';
import createApiClient from './createApiClient';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const client = createApiClient(baseUrl);

const postsService = {
  getPosts: () =>
    client
      .get('posts', { validationSchema: z.array(postSchema) })
      .json<Post[]>(),
  getPost: (id: string) =>
    client.get(`posts/${id}`, { validationSchema: postSchema }).json<Post>(),
  deletePost: (id: string) => client.delete(`posts/${id}`),
} as const;

export default postsService;
