import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { createRoutesStub } from 'react-router';
import ReactQueryPage from '..';
import server from '@/mocks/server';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('ReactQueryPage', () => {
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
        return HttpResponse.json({ error: 'Not found' }, { status: 404 });
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
  it('Renders post list with view links after data loads', async () => {
    const RoutesStub = createRoutesStub([
      {
        Component: ReactQueryPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    const viewButtons = await screen.findAllByText('ReactQueryPage.view');
    expect(viewButtons.length).toBeGreaterThan(0);
  });
  it('Disables delete buttons while a deletion is pending', async () => {
    const user = userEvent.setup();
    let resolveDelete: (value: Response) => void;
    server.use(
      http.delete('https://jsonplaceholder.typicode.com/posts/:id', () => {
        return new Promise(resolve => {
          resolveDelete = resolve;
        });
      }),
    );
    const RoutesStub = createRoutesStub([
      {
        Component: ReactQueryPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    const deleteButtons = await screen.findAllByText('ReactQueryPage.delete');
    await user.click(deleteButtons[0]);
    await waitFor(() =>
      expect(deleteButtons[0]).toBeDisabled(),
    );
    resolveDelete!(HttpResponse.json([]));
  });
});
