/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactQueryScreen from '@/app/(tabs)/react-query';
import type Post from '@/types/Post';

const mockPosts: Post[] = [
  { id: 1, title: 'First post title here', body: 'First post body', userId: 1 },
  { id: 2, title: 'Second post title here', body: 'Second post body', userId: 1 },
  { id: 3, title: 'Third post title here long', body: 'Third post body', userId: 2 },
];

jest.mock('@/services/postsService', () => ({
  __esModule: true,
  default: {
    getPosts: jest.fn(),
    deletePost: jest.fn(),
    getPost: jest.fn(),
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('ReactQueryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    const postsService = require('@/services/postsService').default;
    postsService.getPosts.mockReturnValue(new Promise(() => {}));
    renderWithQueryClient(<ReactQueryScreen />);
    expect(screen.getByTestId('activity-indicator')).toBeInTheDocument();
  });

  it('renders posts after loading', async () => {
    const postsService = require('@/services/postsService').default;
    postsService.getPosts.mockResolvedValue(mockPosts);
    renderWithQueryClient(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('ReactQueryPage.title')).toBeInTheDocument();
    });
    expect(screen.getByText('First post title here...')).toBeInTheDocument();
    expect(screen.getByText('Second post title here...')).toBeInTheDocument();
  });

  it('renders error state when query fails', async () => {
    const postsService = require('@/services/postsService').default;
    postsService.getPosts.mockRejectedValue(new Error('Network error'));
    renderWithQueryClient(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('Common.error')).toBeInTheDocument();
    });
  });

  it('renders delete and view buttons for each post', async () => {
    const postsService = require('@/services/postsService').default;
    postsService.getPosts.mockResolvedValue(mockPosts);
    renderWithQueryClient(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getAllByText('ReactQueryPage.delete')).toHaveLength(3);
    });
    expect(screen.getAllByText('ReactQueryPage.view')).toHaveLength(3);
  });

  it('calls deletePost when delete button is clicked', async () => {
    const user = userEvent.setup();
    const postsService = require('@/services/postsService').default;
    postsService.getPosts.mockResolvedValue(mockPosts);
    postsService.deletePost.mockResolvedValue(undefined);
    renderWithQueryClient(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getAllByText('ReactQueryPage.delete')).toHaveLength(3);
    });
    const deleteButtons = screen.getAllByText('ReactQueryPage.delete');
    await user.click(deleteButtons[0]);
    expect(postsService.deletePost).toHaveBeenCalledWith('1');
  });

  it('renders empty when no posts returned', async () => {
    const postsService = require('@/services/postsService').default;
    postsService.getPosts.mockResolvedValue([]);
    renderWithQueryClient(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('ReactQueryPage.title')).toBeInTheDocument();
    });
    expect(screen.queryByText('ReactQueryPage.delete')).not.toBeInTheDocument();
  });
});
