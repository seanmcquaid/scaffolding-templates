import { render, screen } from '@testing-library/react-native';
import ExploreScreen from '@/app/(tabs)/explore';

describe('ExploreScreen', () => {
  it('renders the explore page title', async () => {
    await render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.title')).toBeTruthy();
  });

  it('renders the features section title', async () => {
    await render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featuresTitle')).toBeTruthy();
  });

  it('renders all feature items', async () => {
    await render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featureI18n')).toBeTruthy();
    expect(screen.getByText('ExplorePage.featureTypeScript')).toBeTruthy();
    expect(screen.getByText('ExplorePage.featureTesting')).toBeTruthy();
    expect(screen.getByText('ExplorePage.featureQuery')).toBeTruthy();
    expect(screen.getByText('ExplorePage.featureNavigation')).toBeTruthy();
  });
});
