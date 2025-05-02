import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import KitchenSinkPage from '..';

describe('KitchenSinkPage', () => {
  it('Renders loader data', async () => {
    const RoutesStub = createRoutesStub([
      {
        Component: () => (
          // @ts-expect-error
          <KitchenSinkPage
            loaderData={[
              { body: 'Body 1', id: 1, title: 'Pos1', userId: 1 },
              { body: 'Body 2', id: 2, title: 'Post 2', userId: 2 },
            ]}
          />
        ),
        path: '/',
      },
    ]);

    render(<RoutesStub />);

    expect(screen.queryByText('Pos1')).toBeInTheDocument();
  });
  it('Displays an error message if the name is too short', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        Component: () => (
          // @ts-expect-error
          <KitchenSinkPage
            loaderData={[
              { body: 'Body 1', id: 1, title: 'Pos1', userId: 1 },
              { body: 'Body 2', id: 2, title: 'Post 2', userId: 2 },
            ]}
          />
        ),
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await user.type(screen.getByLabelText('Name'), 'a');
    await waitFor(() =>
      expect(
        screen.getByText('Name must be between 3 and 10 characters'),
      ).toBeInTheDocument(),
    );
  });
});
