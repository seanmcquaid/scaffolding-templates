import userEvent from '@testing-library/user-event';
import { ReactQueryPage } from '@/routes/react-query/index.lazy';
import createRoutesStub from '@/utils/testing/createRoutesStub';
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
        component: () => <ReactQueryPage />,
        path: '/',
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
