import { postsQueryKeys, getPostQuery, getPostsQuery } from '../posts';

// Mock services to avoid API calls
jest.mock('@/services/postsService', () => ({
  __esModule: true,
  default: {
    getPost: jest.fn(),
    getPosts: jest.fn(),
    deletePost: jest.fn(),
  },
}));

describe('posts queries', () => {
  describe('postsQueryKeys', () => {
    it('has post key', () => {
      expect(postsQueryKeys.post).toEqual(['post']);
    });

    it('has posts key', () => {
      expect(postsQueryKeys.posts).toEqual(['posts']);
    });

    it('postById generates correct key', () => {
      const key = postsQueryKeys.postById('1');
      expect(key).toEqual(['post', '1']);
    });

    it('postById generates different keys for different ids', () => {
      const key1 = postsQueryKeys.postById('1');
      const key2 = postsQueryKeys.postById('2');
      expect(key1).not.toEqual(key2);
    });
  });

  describe('getPostQuery', () => {
    it('returns query options with correct structure', () => {
      const options = getPostQuery('1');
      expect(options).toHaveProperty('queryKey');
      expect(options).toHaveProperty('queryFn');
    });

    it('uses correct query key', () => {
      const options = getPostQuery('1');
      expect(options.queryKey).toEqual(['post', '1']);
    });

    it('queryFn is a function', () => {
      const options = getPostQuery('1');
      expect(typeof options.queryFn).toBe('function');
    });
  });

  describe('getPostsQuery', () => {
    it('returns query options with correct structure', () => {
      const options = getPostsQuery();
      expect(options).toHaveProperty('queryKey');
      expect(options).toHaveProperty('queryFn');
    });

    it('uses correct query key', () => {
      const options = getPostsQuery();
      expect(options.queryKey).toEqual(['posts']);
    });

    it('queryFn is a function', () => {
      const options = getPostsQuery();
      expect(typeof options.queryFn).toBe('function');
    });
  });
});
