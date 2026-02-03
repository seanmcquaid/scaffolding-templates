/**
 * @jest-environment jsdom
 */
import ReactQueryScreen from '../react-query';

// Mock postsService before importing the component
jest.mock('@/services/postsService', () => ({
  __esModule: true,
  default: {
    getPosts: jest.fn(() => Promise.resolve([])),
    getPost: jest.fn(() => Promise.resolve({})),
    deletePost: jest.fn(() => Promise.resolve()),
  },
}));

// Mock @tanstack/react-query hooks
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: [],
    isLoading: false,
    isError: false,
  })),
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
  queryOptions: jest.fn((options) => options),
}));

describe('ReactQueryScreen', () => {
  it('exports ReactQueryScreen component', () => {
    expect(ReactQueryScreen).toBeDefined();
    expect(typeof ReactQueryScreen).toBe('function');
  });

  it('renders ReactQueryScreen component', () => {
    const result = ReactQueryScreen({});
    expect(result).toBeDefined();
  });
});
