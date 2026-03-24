import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { ReactQueryPage } from '@/routes/react-query/index.lazy';
import server from '@/mocks/server';
import createRoutesStub from '@/utils/testing/createRoutesStub';
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
        component: () => <ReactQueryPage />,
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

  it('Displays the page title', async () => {
    const RoutesStub = createRoutesStub([
      {
        component: () => <ReactQueryPage />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('ReactQueryPage.title')).toBeInTheDocument(),
    );
  });

  it('Displays posts fetched from the API', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/posts', () =>
        HttpResponse.json([
          { id: 1, title: 'First post', body: 'Body 1', userId: 1 },
          { id: 2, title: 'Second post', body: 'Body 2', userId: 1 },
        ]),
      ),
    );
    const RoutesStub = createRoutesStub([
      {
        component: () => <ReactQueryPage />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() => {
      const deleteButtons = screen.getAllByText('ReactQueryPage.delete');
      expect(deleteButtons.length).toBeGreaterThan(0);
    });
  });

  it('Renders view links for each post', async () => {
    const RoutesStub = createRoutesStub([
      {
        component: () => <ReactQueryPage />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() => {
      const viewLinks = screen.getAllByText('ReactQueryPage.view');
      expect(viewLinks.length).toBeGreaterThan(0);
    });
  });

  it('Re-renders correctly', async () => {
    const RoutesStub = createRoutesStub([
      {
        component: () => <ReactQueryPage />,
        path: '/',
      },
    ]);
    const { rerender } = render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('ReactQueryPage.title')).toBeInTheDocument(),
    );
    rerender(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('ReactQueryPage.title')).toBeInTheDocument(),
    );
  });
});
