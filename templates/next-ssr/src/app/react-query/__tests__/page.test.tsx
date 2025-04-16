import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import userEvent from '@testing-library/user-event';
import ReactQueryPage from '../page';

describe('ReactQueryPage', () => {
  it('Displays a toast when a post is deleted succesfully', async () => {
    const user = userEvent.setup();
    render(<ReactQueryPage />);
    const deleteButtons = await screen.findAllByText('ReactQueryPage.delete');
    const firstDeleteButton = deleteButtons[0];

    await user.click(firstDeleteButton);
    await waitFor(() =>
      expect(screen.getByText('I got deleted')).toBeInTheDocument(),
    );
  });
});
