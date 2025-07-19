import { HttpResponse, http } from 'msw';
import { generatePost, generatePosts } from '../generators/postGenerators';

export const getPostsHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts',
  () => {
    const posts = generatePosts();
    return HttpResponse.json(posts);
  },
);

export const getPostByIdHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => {
    return HttpResponse.json(generatePost());
  },
);

export const deletePostByIdHandler = http.delete(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json([]),
);
