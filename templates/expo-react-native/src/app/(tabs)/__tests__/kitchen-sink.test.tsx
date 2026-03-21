import { userEvent } from '@testing-library/user-event';
import { render, screen, waitFor } from '@/utils/testing/reactTestingLibraryUtils';
import KitchenSinkScreen from '@/app/(tabs)/kitchen-sink';

describe('KitchenSinkScreen', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows advanced settings when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkScreen />);
    expect(screen.queryByText('KitchenSinkPage.enableAutoSave')).not.toBeInTheDocument();
    await user.click(screen.getByText(/KitchenSinkPage.advancedSettings/));
    expect(screen.getByText('KitchenSinkPage.enableAutoSave')).toBeInTheDocument();
  });

  it('increments the counter when + is pressed', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage.count: 0/)).toBeInTheDocument();
    await user.click(screen.getByText('+'));
    expect(screen.getByText(/KitchenSinkPage.count: 1/)).toBeInTheDocument();
  });

  it('decrements the counter when - is pressed', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage.count: 0/)).toBeInTheDocument();
    await user.click(screen.getByText('-'));
    expect(screen.getByText(/KitchenSinkPage.count: -1/)).toBeInTheDocument();
  });

  it('resets the counter when reset is pressed', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkScreen />);
    await user.click(screen.getByText('+'));
    expect(screen.getByText(/KitchenSinkPage.count: 1/)).toBeInTheDocument();
    await user.click(screen.getByText('KitchenSinkPage.reset'));
    expect(screen.getByText(/KitchenSinkPage.count: 0/)).toBeInTheDocument();
  });

  it('toggles the theme between light and dark', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage.darkTheme/)).toBeInTheDocument();
    await user.click(screen.getByText(/KitchenSinkPage.switchTo/));
    expect(screen.getByText(/KitchenSinkPage.lightTheme/)).toBeInTheDocument();
  });

  it('toggles autoSave when the switch is clicked in advanced settings', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkScreen />);
    await user.click(screen.getByText(/KitchenSinkPage.advancedSettings/));
    const autoSaveSwitch = screen.getByRole('checkbox');
    expect(autoSaveSwitch).toBeChecked();
    await user.click(autoSaveSwitch);
    expect(autoSaveSwitch).not.toBeChecked();
  });

  it('shows no posts found when search term does not match any posts', async () => {
    const user = userEvent.setup();
    render(<KitchenSinkScreen />);
    const searchInput = await screen.findByPlaceholderText('KitchenSinkPage.typeToSearch');
    await user.type(searchInput, 'xyznotfound');
    await waitFor(
      () => expect(screen.getByText(/KitchenSinkPage.noPostsFound/)).toBeInTheDocument(),
      { timeout: 600 }
    );
  });
});
