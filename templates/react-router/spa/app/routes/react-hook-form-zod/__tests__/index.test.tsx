import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import ReactHookFormZodPage from '..';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('ReactHookFormZodPage', () => {
  it('Displays an error message if the passwords do not match', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        Component: ReactHookFormZodPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.type(screen.getByLabelText('Confirm Password'), 'password1');
    await waitFor(() =>
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument(),
    );
  });
  it('Renders the form with username, password, and confirm password fields', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: ReactHookFormZodPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });
  it('Displays an error when username is not a valid email', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        Component: ReactHookFormZodPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await user.type(screen.getByLabelText('Username'), 'notanemail');
    await user.tab();
    await waitFor(() =>
      expect(
        screen.getByText('Please enter a valid email'),
      ).toBeInTheDocument(),
    );
  });
  it('Displays a password length error when password is too long', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        Component: ReactHookFormZodPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await user.type(screen.getByLabelText('Password'), 'toolongpassword');
    await user.tab();
    await waitFor(() =>
      expect(
        screen.getByText('Password must be between 3 and 10 characters'),
      ).toBeInTheDocument(),
    );
  });
});
