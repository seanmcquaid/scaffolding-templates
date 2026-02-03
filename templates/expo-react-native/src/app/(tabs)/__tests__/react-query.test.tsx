import { render, screen, waitFor } from '@/utils/testing/reactNativeTestingLibraryUtils';
import ReactQueryScreen from '../react-query';

// Mock the postsService to return data instead of using MSW
jest.mock('@/services/postsService', () => ({
  __esModule: true,
  default: {
    getPosts: jest.fn(() =>
      Promise.resolve([
        { id: 1, title: 'First Post', body: 'First Body', userId: 1 },
        { id: 2, title: 'Second Post', body: 'Second Body', userId: 1 },
      ]),
    ),
    getPost: jest.fn(() =>
      Promise.resolve({ id: 1, title: 'Test Post', body: 'Test Body', userId: 1 }),
    ),
    deletePost: jest.fn(() => Promise.resolve()),
  },
}));

describe('ReactQueryScreen', () => {
  it('renders react query screen title', async () => {
    render(<ReactQueryScreen />);

    // Wait for the title to appear
    await waitFor(() => {
      expect(screen.getByText('ReactQueryPage.title')).toBeTruthy();
    });
  });

  it('displays posts after loading', async () => {
    render(<ReactQueryScreen />);

    // Wait for posts to be displayed - check for the beginning of the text
    await waitFor(
      () => {
        const firstPost = screen.queryByText('First Post', { exact: false });
        expect(firstPost).toBeTruthy();
      },
      { timeout: 5000 }
    );
  });
});
