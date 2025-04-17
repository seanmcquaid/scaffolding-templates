import userEvent from '@testing-library/user-event';
import { ReactHookFormZodPage } from '@/routes/react-hook-form-zod/index.lazy';
import createRoutesStub from '@/utils/testing/createRoutesStub';
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
        component: ReactHookFormZodPage,
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
