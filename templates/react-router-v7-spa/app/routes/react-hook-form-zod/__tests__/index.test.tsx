import { createRoutesStub } from 'react-router';
import userEvent from '@testing-library/user-event';
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
        path: '/',
        Component: ReactHookFormZodPage,
      },
    ]);
    render(<RoutesStub />);
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.type(screen.getByLabelText('Confirm Password'), 'password1');
    await waitFor(() =>
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument(),
    );
  });
});
