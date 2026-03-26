import userEvent from '@testing-library/user-event';
import PageError from '@/components/app/PageError';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('PageError', () => {
  describe('Title text', () => {
    it('Displays custom title if provided', async () => {
      const RouteStub = createRoutesStub([
        { component: () => <PageError titleText="Custom title" />, path: '/' },
      ]);
      render(<RouteStub />);
      await waitFor(() =>
        expect(screen.getByText('Custom title')).toBeInTheDocument(),
      );
    });
    it('Displays default title if custom title is not provided', async () => {
      const RouteStub = createRoutesStub([
        { component: () => <PageError />, path: '/' },
      ]);
      render(<RouteStub />);
      await waitFor(() =>
        expect(screen.getByText('PageError.title')).toBeInTheDocument(),
      );
    });
  });
  it('Displays error text if provided', async () => {
    const RouteStub = createRoutesStub([
      { component: () => <PageError errorText="Error message" />, path: '/' },
    ]);
    render(<RouteStub />);
    await waitFor(() =>
      expect(screen.getByText('Error message')).toBeInTheDocument(),
    );
  });
  it('Does not display error text when not provided', async () => {
    const RouteStub = createRoutesStub([
      { component: () => <PageError />, path: '/' },
    ]);
    render(<RouteStub />);
    await waitFor(() =>
      expect(screen.getByText('PageError.title')).toBeInTheDocument(),
    );
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });
  it('navigates to home when the go back button is clicked', async () => {
    const user = userEvent.setup();
    const RouteStub = createRoutesStub(
      [
        { component: () => <PageError />, path: '/error' },
        {
          // eslint-disable-next-line i18next/no-literal-string
          component: () => <div>Home Page</div>,
          path: '/',
        },
      ],
      { initialPath: '/error' },
    );
    render(<RouteStub />);
    await waitFor(() =>
      expect(screen.getByText('PageError.goBack')).toBeInTheDocument(),
    );
    await user.click(screen.getByText('PageError.goBack'));
    await waitFor(() =>
      expect(screen.getByText('Home Page')).toBeInTheDocument(),
    );
  });
});
