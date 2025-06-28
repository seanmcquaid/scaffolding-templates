import userEvent from '@testing-library/user-event';
import KitchenSinkPage from '../page';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('KitchenSinkPage', () => {
  it('Displays an error message if the name is too short', async () => {
    const user = userEvent.setup();
    render(await KitchenSinkPage());
    await user.type(screen.getByLabelText('Name'), 'a');
    await waitFor(() =>
      expect(
        screen.getByText('Name must be between 3 and 10 characters'),
      ).toBeInTheDocument(),
    );
  });
});
