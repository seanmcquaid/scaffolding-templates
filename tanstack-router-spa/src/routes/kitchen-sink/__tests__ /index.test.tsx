import userEvent from '@testing-library/user-event';
import { KitchenSinkPage } from '..';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import createRoutesStub from '@/utils/testing/createRoutesStub';

describe('KitchenSinkPage', () => {
  it('Displays an error message if the name is too short', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        component: KitchenSinkPage,
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() => expect(screen.getByText('Submit')).toBeInTheDocument());
    await user.type(screen.getByLabelText('Name'), 'a');
    await waitFor(() =>
      expect(
        screen.getByText('Name must be between 3 and 10 characters'),
      ).toBeInTheDocument(),
    );
  });
});
