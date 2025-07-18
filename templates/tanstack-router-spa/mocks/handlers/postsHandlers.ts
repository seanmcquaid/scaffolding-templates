import { HttpResponse, http } from 'msw';

export const getPostsHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts',
  () =>
    HttpResponse.json([
      {
        id: 1,
        title: 'Sample Post',
        body: 'This is a sample post content.',
        userId: 1,
      },
    ]),
);

export const getPostByIdHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () =>
    HttpResponse.json({
      id: 1,
      title: 'Sample Post',
      body: 'This is a sample post content.',
      userId: 1,
    }),
);

export const deletePostByIdHandler = http.delete(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json([]),
);
