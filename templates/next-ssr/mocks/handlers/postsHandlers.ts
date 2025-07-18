import { HttpResponse, http } from 'msw';
import { generatePost, generatePosts } from '../generators/postGenerators';

export const getPostsHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts',
  () => {
    const posts = generatePosts(5);
    return HttpResponse.json(posts);
  },
);

export const getPostByIdHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts/:id',
  ({ params }) => {
    const { id } = params;
    const post = generatePost({ id: Number(id) });
    return HttpResponse.json(post);
  },
);

export const deletePostByIdHandler = http.delete(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json([]),
);
