import { render, screen } from '@testing-library/react-native';
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
  it('renders react query screen title', () => {
    render(<ReactQueryScreen />);
    expect(screen.getByText('ReactQueryPage.title')).toBeTruthy();
  });
});
