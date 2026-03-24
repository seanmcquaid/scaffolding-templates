import { postsQueryKeys, getPostQuery, getPostsQuery } from '@/services/queries/posts';

describe('postsQueryKeys', () => {
  it('has a post key', () => {
    expect(postsQueryKeys.post).toEqual(['post']);
  });

  it('has a posts key', () => {
    expect(postsQueryKeys.posts).toEqual(['posts']);
  });

  it('generates a postById key with the given id', () => {
    expect(postsQueryKeys.postById('42')).toEqual(['post', '42']);
  });
});

describe('getPostQuery', () => {
  it('returns query options with the correct query key', () => {
    const options = getPostQuery('1');
    expect(options.queryKey).toEqual(['post', '1']);
  });

  it('returns query options with a queryFn', () => {
    const options = getPostQuery('1');
    expect(typeof options.queryFn).toBe('function');
  });
});

describe('getPostsQuery', () => {
  it('returns query options with the correct query key', () => {
    const options = getPostsQuery();
    expect(options.queryKey).toEqual(['posts']);
  });

  it('returns query options with a queryFn', () => {
    const options = getPostsQuery();
    expect(typeof options.queryFn).toBe('function');
  });
});
