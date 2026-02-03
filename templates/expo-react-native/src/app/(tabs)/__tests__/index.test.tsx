import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../index';

describe('HomeScreen', () => {
  it('renders home screen title', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.title')).toBeTruthy();
  });

  it('renders home screen subtitle', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.subtitle')).toBeTruthy();
  });

  it('renders navigation links', () => {
    render(<HomeScreen />);
    expect(screen.getByText('HomePage.reactQuery')).toBeTruthy();
    expect(screen.getByText('HomePage.reactHookFormZod')).toBeTruthy();
    expect(screen.getByText('HomePage.kitchenSink')).toBeTruthy();
  });
});
