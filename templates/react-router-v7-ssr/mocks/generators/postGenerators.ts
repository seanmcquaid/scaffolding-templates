import { faker } from '@faker-js/faker';
import type Post from '@/types/Post';

export const generatePost = (id?: number): Post => {
  return {
    id: id ?? faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    userId: faker.number.int({ min: 1, max: 10 }),
  };
};

export const generatePosts = (count = 5): Post[] => {
  return faker.helpers.multiple(() => generatePost(), { count });
};