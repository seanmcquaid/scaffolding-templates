import { faker } from '@faker-js/faker';
import type Post from '@/types/Post';

const DEFAULT_POSTS_COUNT = 5;
const ID_RANGE = { min: 1, max: 1000 };
const USER_ID_RANGE = { min: 1, max: 10 };

export const generatePost = (): Post => {
  return {
    id: faker.number.int(ID_RANGE),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    userId: faker.number.int(USER_ID_RANGE),
  };
};

export const generatePosts = (count = DEFAULT_POSTS_COUNT): Post[] => {
  return faker.helpers.multiple(() => generatePost(), { count });
};