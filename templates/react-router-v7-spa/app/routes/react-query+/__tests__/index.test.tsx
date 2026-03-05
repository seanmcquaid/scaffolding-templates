import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { createRoutesStub } from 'react-router';
import ReactQueryPage from '..';
import server from '@/mocks/server';
import queryClient from '@/services/queries/queryClient';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('ReactQueryPage', () => {
  beforeEach(() => {
    queryClient.clear();
    queryClient.setDefaultOptions({ queries: { retry: false } });
  });

  afterEach(() => {
    queryClient.setDefaultOptions({ queries: { retry: 3 } });
  });

  it('Displays a toast when a post is deleted succesfully', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        Component: ReactQueryPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    const deleteButtons = await screen.findAllByText('ReactQueryPage.delete');
    const firstDeleteButton = deleteButtons[0];

    await user.click(firstDeleteButton);
    await waitFor(() =>
      expect(screen.getByText('I got deleted')).toBeInTheDocument(),
    );
  });
  it('Displays loading state while fetching posts', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: ReactQueryPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
  it('Displays error state when fetching posts fails', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/posts', () => {
        return HttpResponse.json(
          { error: 'Internal server error' },
          { status: 500 },
        );
      }),
    );
    const RoutesStub = createRoutesStub([
      {
        Component: ReactQueryPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('PageError.title')).toBeInTheDocument(),
    );
  });
});
