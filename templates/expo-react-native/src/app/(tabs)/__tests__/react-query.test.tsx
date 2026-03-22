import { fireEvent } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { render, screen, waitFor } from '@/utils/testing/reactTestingLibraryUtils';
import ReactQueryScreen from '@/app/(tabs)/react-query';
import server from '@/mocks/server';
import '@/i18n/i18next.client';

describe('ReactQueryScreen', () => {
  it('renders loading state initially', async () => {
    server.use(http.get('https://jsonplaceholder.typicode.com/posts', () => new Promise(() => {})));
    render(<ReactQueryScreen />);
    // Loading state shows ActivityIndicator, not the title
    expect(screen.queryByText('Querying and Mutating Data with React Query')).toBeNull();
  });

  it('renders posts after loading', async () => {
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('Querying and Mutating Data with React Query')).toBeTruthy();
    });
    expect(screen.getAllByText('Delete')).toHaveLength(5);
    expect(screen.getAllByText('View')).toHaveLength(5);
  });

  it('renders error state when query fails', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/posts', () =>
        HttpResponse.json({ error: 'Server error' }, { status: 500 })
      )
    );
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('An error occurred')).toBeTruthy();
    });
  });

  it('calls deletePost when delete button is clicked', async () => {
    let deletedId: string | undefined;
    server.use(
      http.delete('https://jsonplaceholder.typicode.com/posts/:id', ({ params }) => {
        deletedId = params.id as string;
        return HttpResponse.json({});
      })
    );
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getAllByText('Delete')).toHaveLength(5);
    });
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.press(deleteButtons[0]);
    await waitFor(() => {
      expect(deletedId).toBeDefined();
    });
  });

  it('renders empty when no posts returned', async () => {
    server.use(http.get('https://jsonplaceholder.typicode.com/posts', () => HttpResponse.json([])));
    render(<ReactQueryScreen />);
    await waitFor(() => {
      expect(screen.getByText('Querying and Mutating Data with React Query')).toBeTruthy();
    });
    expect(screen.queryByText('Delete')).toBeNull();
  });
});
