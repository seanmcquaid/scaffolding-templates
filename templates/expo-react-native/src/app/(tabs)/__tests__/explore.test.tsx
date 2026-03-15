/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import ExploreScreen from '@/app/(tabs)/explore';

describe('ExploreScreen', () => {
  it('renders without crashing', () => {
    render(<ExploreScreen />);
  });

  it('renders the page title', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.title')).toBeInTheDocument();
  });

  it('renders the page subtitle', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.subtitle')).toBeInTheDocument();
  });

  it('renders the features title', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featuresTitle')).toBeInTheDocument();
  });

  it('renders i18n feature', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featureI18n')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureI18nDescription')).toBeInTheDocument();
  });

  it('renders TypeScript feature', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featureTypeScript')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureTypeScriptDescription')).toBeInTheDocument();
  });

  it('renders Testing feature', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featureTesting')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureTestingDescription')).toBeInTheDocument();
  });

  it('renders Query feature', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featureQuery')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureQueryDescription')).toBeInTheDocument();
  });

  it('renders Navigation feature', () => {
    render(<ExploreScreen />);
    expect(screen.getByText('ExplorePage.featureNavigation')).toBeInTheDocument();
    expect(screen.getByText('ExplorePage.featureNavigationDescription')).toBeInTheDocument();
  });
});
