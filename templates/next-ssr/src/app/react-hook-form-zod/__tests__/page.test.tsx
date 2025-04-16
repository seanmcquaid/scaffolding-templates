import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import userEvent from '@testing-library/user-event';
import ReactHookFormZodPage from '../page';

describe('ReactHookFormZodPage', () => {
  it('Displays an error message if the passwords do not match', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormZodPage />);
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.type(screen.getByLabelText('Confirm Password'), 'password1');
    await waitFor(() =>
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument(),
    );
  });
});
