import userEvent from '@testing-library/user-event';
import { KitchenSinkPage } from '..';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('KitchenSinkPage', () => {
  it('Displays an error message if the name is too short', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        component: KitchenSinkPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('KitchenSinkPage.submit')).toBeInTheDocument(),
    );
    await user.type(screen.getByLabelText('KitchenSinkPage.name'), 'a');
    await waitFor(() =>
      expect(
        screen.getByText('Name must be between 3 and 10 characters'),
      ).toBeInTheDocument(),
    );
  });

  it('Shows a toast on valid form submission', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        component: KitchenSinkPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('KitchenSinkPage.submit')).toBeInTheDocument(),
    );
    await user.type(screen.getByLabelText('KitchenSinkPage.name'), 'ValidName');
    await user.click(screen.getByText('KitchenSinkPage.submit'));
    await waitFor(() =>
      expect(screen.getByText('Hello ValidName!')).toBeInTheDocument(),
    );
  });

  it('Toggles filter visibility when the show/hide button is clicked', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        component: KitchenSinkPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(
        screen.getByText('KitchenSinkPage.show KitchenSinkPage.filters'),
      ).toBeInTheDocument(),
    );
    await user.click(
      screen.getByText('KitchenSinkPage.show KitchenSinkPage.filters'),
    );
    await waitFor(() =>
      expect(
        screen.getByText('KitchenSinkPage.enableDarkMode'),
      ).toBeInTheDocument(),
    );
    await user.click(
      screen.getByText('KitchenSinkPage.hide KitchenSinkPage.filters'),
    );
    await waitFor(() =>
      expect(
        screen.queryByText('KitchenSinkPage.enableDarkMode'),
      ).not.toBeInTheDocument(),
    );
  });

  it('Increments and decrements counter', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        component: KitchenSinkPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('KitchenSinkPage.count: 0')).toBeInTheDocument(),
    );

    await user.click(screen.getByText('+'));
    await waitFor(() =>
      expect(screen.getByText('KitchenSinkPage.count: 1')).toBeInTheDocument(),
    );

    await user.click(screen.getByText('-'));
    await waitFor(() =>
      expect(screen.getByText('KitchenSinkPage.count: 0')).toBeInTheDocument(),
    );
  });

  it('Resets counter to zero', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        component: KitchenSinkPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByText('KitchenSinkPage.count: 0')).toBeInTheDocument(),
    );

    await user.click(screen.getByText('+'));
    await user.click(screen.getByText('KitchenSinkPage.reset'));
    await waitFor(() =>
      expect(screen.getByText('KitchenSinkPage.count: 0')).toBeInTheDocument(),
    );
  });

  it('Toggles dropdown open and closed', async () => {
    const user = userEvent.setup();
    const RoutesStub = createRoutesStub([
      {
        component: KitchenSinkPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() =>
      expect(
        screen.getByText('KitchenSinkPage.dropdownMenu ▼'),
      ).toBeInTheDocument(),
    );
    await user.click(screen.getByText('KitchenSinkPage.dropdownMenu ▼'));
    await waitFor(() =>
      expect(
        screen.getByText('KitchenSinkPage.clickOutsideToClose'),
      ).toBeInTheDocument(),
    );
    await user.click(screen.getByText('KitchenSinkPage.dropdownMenu ▲'));
    await waitFor(() =>
      expect(
        screen.queryByText('KitchenSinkPage.clickOutsideToClose'),
      ).not.toBeInTheDocument(),
    );
  });
});
