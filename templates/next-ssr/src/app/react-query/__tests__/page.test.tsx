import userEvent from '@testing-library/user-event';
import ReactQueryPage from '../page';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

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

  it('Renders the page title and post list', async () => {
    render(<ReactQueryPage />);
    await waitFor(() =>
      expect(screen.getByText('ReactQueryPage.title')).toBeInTheDocument(),
    );
    expect(
      await screen.findAllByText('ReactQueryPage.delete'),
    ).not.toHaveLength(0);
  });

  it('Renders a view link for each post', async () => {
    render(<ReactQueryPage />);
    await waitFor(() =>
      expect(screen.queryAllByText('ReactQueryPage.view')).not.toHaveLength(0),
    );
  });
});
