import { postsQueryKeys, getPostQuery, getPostsQuery } from '@/services/queries/posts';

jest.mock('@/services/postsService', () => ({
  __esModule: true,
  default: {
    getPosts: jest.fn().mockResolvedValue([]),
    getPost: jest.fn().mockResolvedValue({}),
    deletePost: jest.fn().mockResolvedValue({}),
  },
}));

describe('postsQueryKeys', () => {
  it('has post key', () => {
    expect(postsQueryKeys.post).toEqual(['post']);
  });

  it('has posts key', () => {
    expect(postsQueryKeys.posts).toEqual(['posts']);
  });

  it('postById returns hierarchical key', () => {
    expect(postsQueryKeys.postById('123')).toEqual(['post', '123']);
  });

  it('postById works with different ids', () => {
    expect(postsQueryKeys.postById('456')).toEqual(['post', '456']);
  });
});

describe('getPostQuery', () => {
  it('returns query options with correct queryKey', () => {
    const options = getPostQuery('1');
    expect(options.queryKey).toEqual(['post', '1']);
  });

  it('returns query options with queryFn', () => {
    const options = getPostQuery('1');
    expect(typeof options.queryFn).toBe('function');
  });

  it('queryFn calls postsService.getPost with the correct id', async () => {
    const postsService = require('@/services/postsService').default;
    const options = getPostQuery('42');
    await options.queryFn({
      queryKey: options.queryKey,
      signal: new AbortController().signal,
      meta: undefined,
    });
    expect(postsService.getPost).toHaveBeenCalledWith('42');
  });
});

describe('getPostsQuery', () => {
  it('returns query options with correct queryKey', () => {
    const options = getPostsQuery();
    expect(options.queryKey).toEqual(['posts']);
  });

  it('returns query options with queryFn', () => {
    const options = getPostsQuery();
    expect(typeof options.queryFn).toBe('function');
  });

  it('queryFn calls postsService.getPosts', async () => {
    const postsService = require('@/services/postsService').default;
    const options = getPostsQuery();
    await options.queryFn({
      queryKey: options.queryKey,
      signal: new AbortController().signal,
      meta: undefined,
    });
    expect(postsService.getPosts).toHaveBeenCalled();
  });
});
