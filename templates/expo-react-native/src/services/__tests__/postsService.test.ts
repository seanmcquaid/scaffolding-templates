import postsService from '@/services/postsService';

jest.mock('@/services/createApiClient', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    get: jest.fn(() => ({ json: jest.fn().mockResolvedValue([]) })),
    post: jest.fn(() => ({ json: jest.fn().mockResolvedValue({}) })),
    put: jest.fn(() => ({ json: jest.fn().mockResolvedValue({}) })),
    delete: jest.fn(() => ({ json: jest.fn().mockResolvedValue({}) })),
    patch: jest.fn(() => ({ json: jest.fn().mockResolvedValue({}) })),
  })),
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  },
}));

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

  it('deletePost returns a response object', () => {
    const result = postsService.deletePost('1');
    expect(result).toBeDefined();
  });

  it('getPost returns a response with json method', () => {
    const result = postsService.getPost('1');
    expect(result).toBeDefined();
  });

  it('getPosts returns a response with json method', () => {
    const result = postsService.getPosts();
    expect(result).toBeDefined();
  });
});
