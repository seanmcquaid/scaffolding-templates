import { fireEvent } from '@testing-library/react-native';
import { render, screen, waitFor } from '@/utils/testing/reactNativeTestingLibraryUtils';
import KitchenSinkScreen from '@/app/(tabs)/kitchen-sink';

describe('KitchenSinkScreen', () => {
  it('shows advanced settings when the toggle button is clicked', async () => {
    render(<KitchenSinkScreen />);
    expect(screen.queryByText(/KitchenSinkPage\.enableAutoSave/)).toBeNull();
    fireEvent.press(screen.getByText(/KitchenSinkPage\.advancedSettings/));
    expect(screen.getByText(/KitchenSinkPage\.enableAutoSave/)).toBeTruthy();
  });

  it('increments the counter when + is pressed', () => {
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
    fireEvent.press(screen.getByText('+'));
    expect(screen.getByText(/KitchenSinkPage\.count.*1/)).toBeTruthy();
  });

  it('decrements the counter when - is pressed', () => {
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
    fireEvent.press(screen.getByText('-'));
    expect(screen.getByText(/KitchenSinkPage\.count.*-1/)).toBeTruthy();
  });

  it('resets the counter when reset is pressed', () => {
    render(<KitchenSinkScreen />);
    fireEvent.press(screen.getByText('+'));
    expect(screen.getByText(/KitchenSinkPage\.count.*1/)).toBeTruthy();
    fireEvent.press(screen.getByText(/KitchenSinkPage\.reset/));
    expect(screen.getByText(/KitchenSinkPage\.count.*0/)).toBeTruthy();
  });

  it('toggles the theme when the theme button is pressed', () => {
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/KitchenSinkPage\.currentTheme.*light/)).toBeTruthy();
    fireEvent.press(screen.getByText(/KitchenSinkPage\.switchTo/));
    expect(screen.getByText(/KitchenSinkPage\.currentTheme.*dark/)).toBeTruthy();
  });

  it('shows no posts found when search term does not match any posts', async () => {
    render(<KitchenSinkScreen />);
    const searchInput = await screen.findByPlaceholderText('KitchenSinkPage.typeToSearch');
    fireEvent.changeText(searchInput, 'xyznotfound');
    await waitFor(() => expect(screen.getByText(/KitchenSinkPage\.noPostsFound/)).toBeTruthy(), {
      timeout: 600,
    });
  });
});
