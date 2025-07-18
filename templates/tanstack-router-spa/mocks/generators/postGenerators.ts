import { faker } from '@faker-js/faker';
import type Post from '../../src/types/Post';

export interface GeneratePostOptions {
  id?: number;
  userId?: number;
}

export function generatePost(options: GeneratePostOptions = {}): Post {
  return {
    id: options.id ?? faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    userId: options.userId ?? faker.number.int({ min: 1, max: 10 }),
  };
}

export function generatePosts(count = 5): Post[] {
  return faker.helpers.multiple(() => generatePost(), { count });
}