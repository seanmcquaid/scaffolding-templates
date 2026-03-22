import { fireEvent } from '@testing-library/react-native';
import { render, screen, waitFor } from '@/utils/testing/reactTestingLibraryUtils';
import KitchenSinkScreen from '@/app/(tabs)/kitchen-sink';
import '@/i18n/i18next.client';

describe('KitchenSinkScreen', () => {
  it('shows advanced settings when the toggle button is clicked', async () => {
    render(<KitchenSinkScreen />);
    expect(screen.queryByText('Enable auto-save')).toBeNull();
    fireEvent.press(screen.getByText(/Advanced Settings/));
    expect(screen.getByText('Enable auto-save')).toBeTruthy();
  });

  it('increments the counter when + is pressed', () => {
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/Count: 0/)).toBeTruthy();
    fireEvent.press(screen.getByText('+'));
    expect(screen.getByText(/Count: 1/)).toBeTruthy();
  });

  it('decrements the counter when - is pressed', () => {
    render(<KitchenSinkScreen />);
    expect(screen.getByText(/Count: 0/)).toBeTruthy();
    fireEvent.press(screen.getByText('-'));
    expect(screen.getByText(/Count: -1/)).toBeTruthy();
  });

  it('resets the counter when reset is pressed', () => {
    render(<KitchenSinkScreen />);
    fireEvent.press(screen.getByText('+'));
    expect(screen.getByText(/Count: 1/)).toBeTruthy();
    fireEvent.press(screen.getByText('Reset'));
    expect(screen.getByText(/Count: 0/)).toBeTruthy();
  });

  it('toggles the theme when the theme button is pressed', () => {
    render(<KitchenSinkScreen />);
    // Initial state: light theme shown in info text
    expect(screen.getByText(/Current theme: light/)).toBeTruthy();
    // Find and press the "Switch to" button
    fireEvent.press(screen.getByText(/Switch to/));
    // After toggle: dark theme shown in info text
    expect(screen.getByText(/Current theme: dark/)).toBeTruthy();
  });

  it('shows no posts found when search term does not match any posts', async () => {
    render(<KitchenSinkScreen />);
    const searchInput = await screen.findByPlaceholderText('Type to search...');
    fireEvent.changeText(searchInput, 'xyznotfound');
    await waitFor(
      () => expect(screen.getByText(/No posts found matching/)).toBeTruthy(),
      { timeout: 600 }
    );
  });
});
