import { HttpResponse, http } from 'msw';
import { zocker } from 'zocker';
import { postSchema } from '@/types/Post';

const postZocker = zocker(postSchema);

export const getPostsHandler = http.get('https://jsonplaceholder.typicode.com/posts', () => {
  const posts = postZocker.generateMany(5);
  return HttpResponse.json(posts);
});

export const getPostByIdHandler = http.get('https://jsonplaceholder.typicode.com/posts/:id', () => {
  return HttpResponse.json(postZocker.generate());
});

export const deletePostByIdHandler = http.delete(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json([])
);
