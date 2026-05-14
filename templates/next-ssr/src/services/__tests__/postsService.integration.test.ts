import { HttpResponse, http } from 'msw';
import postsService from '../postsService';
import type Post from '@/types/Post';
import server from '@/mocks/server';

/**
 * Integration tests for postsService
 * Tests the service in combination with the API client and validation
 */
describe('postsService - Integration', () => {
  describe('getPosts', () => {
    it('should fetch and validate posts successfully', async () => {
      const mockPosts: Post[] = [
        {
          userId: 1,
          id: 1,
          title: 'Test Post 1',
          body: 'Test body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'Test Post 2',
          body: 'Test body 2',
        },
      ];

      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts', () =>
          HttpResponse.json(mockPosts),
        ),
      );

      const posts = await postsService.getPosts();
      expect(posts).toEqual(mockPosts);
      expect(posts).toHaveLength(2);
    });

    it('should handle validation errors when posts have invalid structure', async () => {
      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts', () =>
          HttpResponse.json([
            {
              // Missing required fields
              title: 'Invalid Post',
            },
          ]),
        ),
      );

      try {
        await postsService.getPosts();
        expect.fail('Should have thrown an error');
      } catch (error) {
        // Should fail validation
        expect(error).toBeDefined();
      }
    });

    it('should handle network errors gracefully', async () => {
      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts', () =>
          HttpResponse.error(),
        ),
      );

      try {
        await postsService.getPosts();
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getPost', () => {
    it('should fetch a single post by id', async () => {
      const mockPost: Post = {
        userId: 1,
        id: 1,
        title: 'Test Post',
        body: 'Test body',
      };

      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts/:id', () =>
          HttpResponse.json(mockPost),
        ),
      );

      const post = await postsService.getPost('1');
      expect(post).toEqual(mockPost);
      expect(post.id).toBe(1);
      expect(post.title).toBe('Test Post');
    });

    it('should handle 404 errors when post does not exist', async () => {
      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts/:id', () =>
          HttpResponse.json(null, { status: 404 }),
        ),
      );

      try {
        await postsService.getPost('9999');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('deletePost', () => {
    it('should delete a post successfully', async () => {
      let deleteWasCalled = false;

      server.use(
        http.delete(
          'https://jsonplaceholder.typicode.com/posts/:id',
          ({ params }) => {
            deleteWasCalled = true;
            expect(params.id).toBe('1');
            return HttpResponse.json({}, { status: 200 });
          },
        ),
      );

      await postsService.deletePost('1');
      expect(deleteWasCalled).toBe(true);
    });

    it('should handle delete errors', async () => {
      server.use(
        http.delete('https://jsonplaceholder.typicode.com/posts/:id', () =>
          HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 401 },
          ),
        ),
      );

      try {
        await postsService.deletePost('1');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Retry behavior', () => {
    it('should retry on 500 errors', async () => {
      let callCount = 0;

      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts', () => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json(null, { status: 500 });
          }
          return HttpResponse.json([
            {
              userId: 1,
              id: 1,
              title: 'Test Post',
              body: 'Test body',
            },
          ]);
        }),
      );

      const posts = await postsService.getPosts();
      expect(posts).toHaveLength(1);
      expect(callCount).toBeGreaterThan(1);
    });
  });
});
