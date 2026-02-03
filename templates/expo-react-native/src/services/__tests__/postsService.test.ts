import postsService from '../postsService';

// Mock createApiClient to avoid Expo imports
jest.mock('@/services/createApiClient', () => {
  const mockClient = {
    get: jest.fn(() => ({
      json: jest.fn(() => Promise.resolve([])),
    })),
    post: jest.fn(() => Promise.resolve()),
    put: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
    patch: jest.fn(() => Promise.resolve()),
  };

  return {
    __esModule: true,
    default: jest.fn(() => mockClient),
  };
});

// Mock env.client to avoid Expo imports
jest.mock('@/env.client', () => ({
  clientEnv: {
    EXPO_PUBLIC_API_URL: 'https://api.example.com',
  },
}));

describe('postsService', () => {
  it('exports getPosts method', () => {
    expect(postsService).toHaveProperty('getPosts');
    expect(typeof postsService.getPosts).toBe('function');
  });

  it('exports getPost method', () => {
    expect(postsService).toHaveProperty('getPost');
    expect(typeof postsService.getPost).toBe('function');
  });

  it('exports deletePost method', () => {
    expect(postsService).toHaveProperty('deletePost');
    expect(typeof postsService.deletePost).toBe('function');
  });

  it('getPosts returns a promise', () => {
    const result = postsService.getPosts();
    expect(result).toBeInstanceOf(Promise);
  });

  it('getPost accepts id parameter', () => {
    const result = postsService.getPost('1');
    expect(result).toBeInstanceOf(Promise);
  });

  it('deletePost accepts id parameter', () => {
    const result = postsService.deletePost('1');
    expect(result).toBeInstanceOf(Promise);
  });
});
