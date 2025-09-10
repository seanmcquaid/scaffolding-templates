import { zocker } from 'zocker';
import type Post from '@/types/Post';
import { postSchema } from '@/types/Post';

const postZocker = zocker(postSchema);

export const generatePost = (id?: number): Post => {
  const generated = postZocker.generate();
  
  // If a specific id is provided, use it
  if (id !== undefined) {
    return { ...generated, id };
  }
  
  return generated;
};

export const generatePosts = (count = 5): Post[] => {
  return postZocker.generateMany(count);
};