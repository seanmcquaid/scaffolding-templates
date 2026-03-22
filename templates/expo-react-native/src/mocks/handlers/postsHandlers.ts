import { HttpResponse, http } from 'msw';
import type Post from '@/types/Post';

const mockPosts: Post[] = [
  { id: 1, title: 'First mock post title', body: 'First mock post body', userId: 1 },
  { id: 2, title: 'Second mock post title', body: 'Second mock post body', userId: 1 },
  { id: 3, title: 'Third mock post title', body: 'Third mock post body', userId: 2 },
  { id: 4, title: 'Fourth mock post title', body: 'Fourth mock post body', userId: 2 },
  { id: 5, title: 'Fifth mock post title', body: 'Fifth mock post body', userId: 3 },
];

export const getPostsHandler = http.get('https://jsonplaceholder.typicode.com/posts', () => {
  return HttpResponse.json(mockPosts);
});

export const getPostByIdHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts/:id',
  ({ params }) => {
    const post = mockPosts.find((p) => p.id === Number(params.id)) ?? mockPosts[0];
    return HttpResponse.json(post);
  }
);

export const deletePostByIdHandler = http.delete(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json({})
);
