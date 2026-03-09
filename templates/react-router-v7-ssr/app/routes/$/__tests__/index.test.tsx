import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import NotFoundPage from '..';
import {
  render,
  screen,
} from '@/utils/testing/reactTestingLibraryUtils';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...(actual as Record<string, unknown>),
    useNavigate: () => mockNavigate,
  };
});

const RouteStub = createRoutesStub([{ Component: NotFoundPage, path: '/' }]);

describe('NotFoundPage', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('Renders the not found heading', () => {
    render(<RouteStub />);
    expect(screen.getByText('NotFoundPage.notFound')).toBeInTheDocument();
  });

  it('Renders the description text', () => {
    render(<RouteStub />);
    expect(
      screen.getByText('NotFoundPage.pleaseTryADifferentRoute'),
    ).toBeInTheDocument();
  });

  it('Renders the home button', () => {
    render(<RouteStub />);
    expect(screen.getByText('NotFoundPage.home')).toBeInTheDocument();
  });

  it('Navigates to home when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<RouteStub />);
    await user.click(screen.getByText('NotFoundPage.home'));
    expect(mockNavigate).toHaveBeenCalledWith('Routes.home');
  });
});
