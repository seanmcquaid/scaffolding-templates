import { HttpResponse, http } from 'msw';
import { zocker } from 'zocker';
import { postSchema } from '@/types/Post';

const postZocker = zocker(postSchema);

export const getPostsHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts',
  () => {
    const posts = postZocker.generateMany(5);
    return HttpResponse.json(posts);
  },
);

export const getPostsErrorHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts',
  () => new HttpResponse(null, { status: 500 }),
);

export const getPostByIdHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => {
    return HttpResponse.json(postZocker.generate());
  },
);

export const getPostByIdErrorHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => new HttpResponse(null, { status: 500 }),
);

export const deletePostByIdHandler = http.delete(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json([]),
);
