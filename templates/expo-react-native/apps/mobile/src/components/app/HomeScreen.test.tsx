import { HomeScreen } from '@acme/feature-home';
import { render, screen } from '../utils/testing/reactNativeTestingLibraryUtils';

describe('HomeScreen', () => {
  it('renders the welcome title', () => {
    render(<HomeScreen />);

    expect(screen.getByText('HomeScreen.title')).toBeTruthy();
  });

  it('renders the subtitle', () => {
    render(<HomeScreen />);

    expect(screen.getByText('HomeScreen.subtitle')).toBeTruthy();
  });

  it('renders the description', () => {
    render(<HomeScreen />);

    expect(screen.getByText('HomeScreen.description')).toBeTruthy();
  });

  it('renders the get started button', () => {
    render(<HomeScreen />);

    expect(screen.getByText('HomeScreen.getStarted')).toBeTruthy();
  });

  it('renders the learn more button', () => {
    render(<HomeScreen />);

    expect(screen.getByText('HomeScreen.learnMore')).toBeTruthy();
  });
});
