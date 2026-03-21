import { userEvent } from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { render, screen, waitFor } from '@/utils/testing/reactTestingLibraryUtils';
import ReactQueryScreen from '@/app/(tabs)/react-query';
import server from '@/mocks/server';

describe('ReactQueryScreen', () => {
  it('renders loading state initially', () => {
    server.use(http.get('https://jsonplaceholder.typicode.com/posts', () => new Promise(() => {})));
    render(<ReactQueryScreen />);
    expect(screen.getByTestId('activity-indicator')).toBeInTheDocument();
  });

  it('renders posts after loading', async () => {
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('ReactQueryPage.title')).toBeInTheDocument();
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
    await waitFor(() => {
      expect(screen.getByText('Common.error')).toBeInTheDocument();
    });
  });

  it('calls deletePost when delete button is clicked', async () => {
    const user = userEvent.setup();
    let deletedId: string | undefined;
    server.use(
      http.delete('https://jsonplaceholder.typicode.com/posts/:id', ({ params }) => {
        deletedId = params.id as string;
        return HttpResponse.json({});
      })
    );
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getAllByText('ReactQueryPage.delete')).toHaveLength(5);
    });
    const deleteButtons = screen.getAllByText('ReactQueryPage.delete');
    await user.click(deleteButtons[0]);
    await waitFor(() => {
      expect(deletedId).toBeDefined();
    });
  });

  it('renders empty when no posts returned', async () => {
    server.use(http.get('https://jsonplaceholder.typicode.com/posts', () => HttpResponse.json([])));
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('ReactQueryPage.title')).toBeInTheDocument();
    });
    expect(screen.queryByText('ReactQueryPage.delete')).not.toBeInTheDocument();
  });
});
