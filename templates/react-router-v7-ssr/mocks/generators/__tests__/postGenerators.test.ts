import { describe, expect, it } from 'vitest';
import { generatePost, generatePosts } from '../postGenerators';
import { postSchema } from '@/types/Post';

describe('Zocker Post Generators', () => {
  it('should generate a single post with Zocker', () => {
    const post = generatePost();
    
    // Validate the generated post matches the schema
    const parseResult = postSchema.safeParse(post);
    expect(parseResult.success).toBe(true);
    
    // Check that all required fields are present
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
    
    // Check types
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(typeof post.userId).toBe('number');
  });
  
  it('should generate a post with specific id when provided', () => {
    const specificId = 123;
    const post = generatePost(specificId);
    
    expect(post.id).toBe(specificId);
    
    // Validate the rest of the post
    const parseResult = postSchema.safeParse(post);
    expect(parseResult.success).toBe(true);
  });
  
  it('should generate multiple posts', () => {
    const count = 3;
    const posts = generatePosts(count);
    
    expect(posts).toHaveLength(count);
    
    posts.forEach(post => {
      const parseResult = postSchema.safeParse(post);
      expect(parseResult.success).toBe(true);
    });
  });
  
  it('should generate default number of posts when count not specified', () => {
    const posts = generatePosts();
    
    expect(posts).toHaveLength(5); // Default count is 5
    
    posts.forEach(post => {
      const parseResult = postSchema.safeParse(post);
      expect(parseResult.success).toBe(true);
    });
  });
});