import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import ReactQueryPage from '..';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('ReactQueryPage', () => {
  it('Displays a toast when a post is deleted succesfully', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: ReactQueryPage,
      },
    ]);
    render(<RoutesStub />);
    const deleteButtons = await screen.findAllByText('ReactQueryPage.delete');
    const firstDeleteButton = deleteButtons[0];

    await user.click(firstDeleteButton);
    await waitFor(() =>
      expect(screen.getByText('I got deleted')).toBeInTheDocument(),
    );
  });
});
