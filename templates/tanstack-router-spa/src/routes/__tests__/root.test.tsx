import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRoute,
  createRouter,
  RouterProvider,
  type AnyRouter,
} from '@tanstack/react-router';
import userEvent from '@testing-library/user-event';
import { NotFoundPage, Route as rootRoute } from '@/routes/__root';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('Root', () => {
  it('renders outlet content', async () => {
    const queryClient = new QueryClient();
    const childRoute = createRoute({
      // eslint-disable-next-line i18next/no-literal-string
      component: () => <div>Outlet Content</div>,
      getParentRoute: () => rootRoute,
      path: '/',
    });
    const routeTree = rootRoute.addChildren([childRoute]);
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const router = createRouter({
      context: { queryClient },
      history,
      routeTree,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router as unknown as AnyRouter} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Outlet Content')).toBeInTheDocument();
    });
  });
});

describe('NotFoundPage', () => {
  it('renders the not found heading', async () => {
    const RoutesStub = createRoutesStub([
      { component: NotFoundPage, path: '/' },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('NotFoundPage.notFound')).toBeInTheDocument(),
    );
  });

  it('renders the descriptive message', async () => {
    const RoutesStub = createRoutesStub([
      { component: NotFoundPage, path: '/' },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(
        screen.getByText('NotFoundPage.pleaseTryADifferentRoute'),
      ).toBeInTheDocument(),
    );
  });

  it('renders the home button', async () => {
    const RoutesStub = createRoutesStub([
      { component: NotFoundPage, path: '/' },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('NotFoundPage.home')).toBeInTheDocument(),
    );
  });

  it('navigates to home when the home button is clicked', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub(
      [
        { component: NotFoundPage, path: '/not-found' },
        {
          // eslint-disable-next-line i18next/no-literal-string
          component: () => <div>Home Page</div>,
          path: '/',
        },
      ],
      { initialPath: '/not-found' },
    );
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('NotFoundPage.home')).toBeInTheDocument(),
    );
    await user.click(screen.getByText('NotFoundPage.home'));
    await waitFor(() =>
      expect(screen.getByText('Home Page')).toBeInTheDocument(),
    );
  });
});
