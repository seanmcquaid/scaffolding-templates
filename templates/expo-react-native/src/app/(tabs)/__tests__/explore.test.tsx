import { render, screen } from '@testing-library/react';
import ExploreScreen from '@/app/(tabs)/explore';

describe('ExploreScreen', () => {
  it('renders the features section with all feature items', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featuresTitle')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureI18n')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureTypeScript')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureTesting')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureQuery')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureNavigation')).toBeInTheDocument();
  });
});
