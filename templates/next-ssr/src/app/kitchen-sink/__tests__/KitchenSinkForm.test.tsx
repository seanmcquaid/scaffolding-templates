import userEvent from '@testing-library/user-event';
import KitchenSinkForm from '../KitchenSinkForm';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('KitchenSinkForm', () => {
  it('renders the page title', () => {
    render(<KitchenSinkForm />);
    expect(screen.getByText('KitchenSinkPage.title')).toBeInTheDocument();
  });

  it('increments the counter when + button is clicked', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkForm />);

    expect(screen.getByText('KitchenSinkPage.count: 0')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByText('KitchenSinkPage.count: 1')).toBeInTheDocument();
  });

  it('decrements the counter when - button is clicked', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkForm />);

    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '-' }));
    expect(screen.getByText('KitchenSinkPage.count: 1')).toBeInTheDocument();
  });

  it('resets the counter when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkForm />);

    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(
      screen.getByRole('button', { name: 'KitchenSinkPage.reset' }),
    );
    expect(screen.getByText('KitchenSinkPage.count: 0')).toBeInTheDocument();
  });

  it('toggles theme between light and dark', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkForm />);

    await user.click(
      screen.getByRole('button', { name: 'KitchenSinkPage.toggleTheme' }),
    );
    expect(
      screen.getByText(/KitchenSinkPage\.theme: light/),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'KitchenSinkPage.toggleTheme' }),
    );
    expect(
      screen.getByText(/KitchenSinkPage\.theme: dark/),
    ).toBeInTheDocument();
  });

  it('shows and hides details on toggle', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkForm />);

    expect(
      screen.queryByLabelText('KitchenSinkPage.enableNotifications'),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'KitchenSinkPage.show KitchenSinkPage.details',
      }),
    );
    expect(
      screen.getByLabelText('KitchenSinkPage.enableNotifications'),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'KitchenSinkPage.hide KitchenSinkPage.details',
      }),
    );
    await waitFor(() => {
      expect(
        screen.queryByLabelText('KitchenSinkPage.enableNotifications'),
      ).not.toBeInTheDocument();
    });
  });

  it('copies window size to clipboard', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<KitchenSinkForm />);

    await user.click(
      screen.getByRole('button', { name: 'KitchenSinkPage.copyWindowSize' }),
    );

    await waitFor(() => {
      expect(screen.getByText(/KitchenSinkPage\.copied/)).toBeInTheDocument();
    });
  });
});
