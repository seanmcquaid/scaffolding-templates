import { faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';

export const getPostsHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts',
  () => {
    // Generate 5 random posts
    const posts = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      userId: faker.number.int({ min: 1, max: 10 }),
    }));

    return HttpResponse.json(posts);
  },
);

export const getPostByIdHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts/:id',
  ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      userId: faker.number.int({ min: 1, max: 10 }),
    });
  },
);

export const deletePostByIdHandler = http.delete(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json([]),
);
