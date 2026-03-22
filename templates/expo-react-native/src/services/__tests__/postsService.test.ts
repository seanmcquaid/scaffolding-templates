import postsService from '@/services/postsService';

describe('postsService', () => {
  it('exports postsService as default', () => {
    expect(postsService).toBeDefined();
  });

  it('has a deletePost method', () => {
    expect(typeof postsService.deletePost).toBe('function');
  });

  it('has a getPost method', () => {
    expect(typeof postsService.getPost).toBe('function');
  });

  it('has a getPosts method', () => {
    expect(typeof postsService.getPosts).toBe('function');
  });

  it('getPosts returns an array of posts from the API', async () => {
    const posts = await postsService.getPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(5);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
    expect(posts[0]).toHaveProperty('userId');
  });

  it('getPost returns a single post from the API', async () => {
    const post = await postsService.getPost('1');
    expect(post).toBeDefined();
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  it('deletePost resolves without throwing', async () => {
    await expect(postsService.deletePost('1').json()).resolves.toBeDefined();
  });
});
