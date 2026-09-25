import { z } from 'zod';
import createApiClient from './createApiClient';
import type Post from '@/types/Post';
import { postSchema } from '@/types/Post';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const client = createApiClient(baseUrl);

const postsService = {
  deletePost: (id: string) => client.delete(`posts/${id}`),
  getPost: (id: string) =>
    client.get(`posts/${id}`, { validationSchema: postSchema }).json<Post>(),
  getPosts: () =>
    client
      .get('posts', { validationSchema: z.array(postSchema) })
      .json<Post[]>(),
} as const;

export default postsService;
