import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import ReactHookFormZod from '../index';

describe('ReactHookFormZodPage', () => {
  it('Displays an error message if the passwords do not match', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        Component: ReactHookFormZod,
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
});
