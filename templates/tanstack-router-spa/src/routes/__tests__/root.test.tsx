import userEvent from '@testing-library/user-event';
import { NotFoundPage } from '@/routes/__root';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

vi.mock('@/i18n/i18next', () => ({ default: {} }));

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
