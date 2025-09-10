import { z } from 'zod';
import { zocker } from 'zocker';
import { postSchema } from './app/types/Post';

// Test Zocker with existing Post schema
console.log('Testing Zocker with Post schema...');

const postZocker = zocker(postSchema);
const post = postZocker.generate();
console.log('Generated Post:', post);

const posts = postZocker.generateMany(5);
console.log('Generated Posts:', posts);

// Compare with the old approach
import { generatePost, generatePosts } from './mocks/generators/postGenerators';
console.log('\n--- Comparison with Faker ---');
console.log('Old Faker Post:', generatePost());
console.log('Old Faker Posts:', generatePosts(3));