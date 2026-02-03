import { render, screen } from '@testing-library/react-native';
import ExploreScreen from '../explore';

describe('ExploreScreen', () => {
  it('renders explore screen title', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.title')).toBeTruthy();
  });

  it('renders explore screen subtitle', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.subtitle')).toBeTruthy();
  });

  it('renders features section', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featuresTitle')).toBeTruthy();
    expect(screen.getByText('ExplorePage.featureI18n')).toBeTruthy();
    expect(screen.getByText('ExplorePage.featureTypeScript')).toBeTruthy();
  });
});
