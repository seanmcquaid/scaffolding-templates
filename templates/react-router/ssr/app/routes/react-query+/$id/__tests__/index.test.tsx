import { HttpResponse, http } from 'msw';
import { createRoutesStub } from 'react-router';
import ReactQueryPostPage from '..';
import server from '@/mocks/server';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...(actual as Record<string, unknown>),
    useNavigate: () => mockNavigate,
  };
});

describe('ReactQueryPostPage', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
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
  it('navigates back when BACK button is clicked', async () => {
    const userEvent = await import('@testing-library/user-event');
    const user = userEvent.default.setup();
    const RoutesStub = createRoutesStub([
      {
        // @ts-expect-error - mock params for testing
        Component: () => <ReactQueryPostPage params={{ id: '1' }} />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByTestId('postHeader')).toBeInTheDocument(),
    );
    await user.click(screen.getByRole('button', { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
