import { HttpResponse, http } from 'msw';
import { render, screen, waitFor } from '@/utils/testing/reactNativeTestingLibraryUtils';
import ReactQueryScreen from '@/app/(tabs)/react-query';
import server from '@/mocks/server';

describe('ReactQueryScreen', () => {
  it('renders loading state initially', async () => {
    server.use(http.get('https://jsonplaceholder.typicode.com/posts', () => new Promise(() => {})));
    render(<ReactQueryScreen />);
    expect(screen.queryByText('ReactQueryPage.title')).toBeNull();
  });

  it('renders posts after loading', async () => {
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('ReactQueryPage.title')).toBeTruthy();
    });
    expect(screen.getAllByText('ReactQueryPage.delete')).toHaveLength(5);
    expect(screen.getAllByText('ReactQueryPage.view')).toHaveLength(5);
  });

  it('renders error state when query fails', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/posts', () =>
        HttpResponse.json({ error: 'Server error' }, { status: 500 })
      )
    );
    render(<ReactQueryScreen />);
    await waitFor(
      () => {
        expect(screen.getByText('Common.error')).toBeTruthy();
      },
      { timeout: 5000 }
    );
  });

  it('renders empty when no posts returned', async () => {
    server.use(http.get('https://jsonplaceholder.typicode.com/posts', () => HttpResponse.json([])));
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('ReactQueryPage.title')).toBeTruthy();
    });
    expect(screen.queryByText('ReactQueryPage.delete')).toBeNull();
  });
});
