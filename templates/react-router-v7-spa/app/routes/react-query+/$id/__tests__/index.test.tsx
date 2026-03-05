import { HttpResponse, http } from 'msw';
import { createRoutesStub } from 'react-router';
import ReactQueryPostPage from '..';
import server from '@/mocks/server';
import queryClient from '@/services/queries/queryClient';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('ReactQueryPostPage', () => {
  beforeEach(() => {
    queryClient.clear();
    queryClient.setDefaultOptions({ queries: { retry: false } });
  });

  afterEach(() => {
    queryClient.setDefaultOptions({ queries: { retry: 3 } });
  });

  it('should render successfully', async () => {
    const RoutesStub = createRoutesStub([
      {
        // @ts-expect-error - mock params for testing
        Component: () => <ReactQueryPostPage params={{ id: '1' }} />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() => {
      expect(screen.getByTestId('postHeader')).toBeInTheDocument();
    });
  });
  it('Displays loading state while fetching post', () => {
    const RoutesStub = createRoutesStub([
      {
        // @ts-expect-error - mock params for testing
        Component: () => <ReactQueryPostPage params={{ id: '1' }} />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
  it('Displays error state when fetching post fails', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/posts/:id', () => {
        return HttpResponse.json({ error: 'Not found' }, { status: 404 });
      }),
    );
    const RoutesStub = createRoutesStub([
      {
        // @ts-expect-error - mock params for testing
        Component: () => <ReactQueryPostPage params={{ id: '1' }} />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('PageError.title')).toBeInTheDocument(),
    );
  });
});
