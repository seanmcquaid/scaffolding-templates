import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { zocker } from 'zocker';
import { postSchema } from '@/types/Post';

describe('Zocker Integration Test', () => {
  it('should generate valid Post data using Zocker', () => {
    const postZocker = zocker(postSchema);
    const generatedPost = postZocker.generate();
    
    console.log('Generated Post with Zocker:', generatedPost);
    
    // Validate the generated post matches the schema
    const parseResult = postSchema.safeParse(generatedPost);
    expect(parseResult.success).toBe(true);
    
    // Check that all required fields are present
    expect(generatedPost).toHaveProperty('id');
    expect(generatedPost).toHaveProperty('title');
    expect(generatedPost).toHaveProperty('body');
    expect(generatedPost).toHaveProperty('userId');
    
    // Check types
    expect(typeof generatedPost.id).toBe('number');
    expect(typeof generatedPost.title).toBe('string');
    expect(typeof generatedPost.body).toBe('string');
    expect(typeof generatedPost.userId).toBe('number');
  });
  
  it('should generate multiple Posts using Zocker', () => {
    const postZocker = zocker(postSchema);
    const generatedPosts = postZocker.generateMany(3);
    
    console.log('Generated Posts with Zocker:', generatedPosts);
    
    expect(generatedPosts).toHaveLength(3);
    
    generatedPosts.forEach(post => {
      const parseResult = postSchema.safeParse(post);
      expect(parseResult.success).toBe(true);
    });
  });
});