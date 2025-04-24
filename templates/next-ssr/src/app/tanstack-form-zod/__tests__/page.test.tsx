import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import TanStackFormZodPage from '../page';

describe('TanStackFormZodPage', () => {
  it('Displays an error message if the passwords do not match', async () => {
    const user = userEvent.setup();
    render(<TanStackFormZodPage />);
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.type(screen.getByLabelText('Confirm Password'), 'password1');
    await waitFor(() =>
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument(),
    );
  });
});
