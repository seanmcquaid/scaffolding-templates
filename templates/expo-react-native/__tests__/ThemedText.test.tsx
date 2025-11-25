import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedText } from '@/components/ui/ThemedText';

describe('ThemedText', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<ThemedText>HomePage.title</ThemedText>);
    expect(getByText('HomePage.title')).toBeTruthy();
  });

  it('renders with custom type', () => {
    const { getByText } = render(<ThemedText type="title">ExplorePage.title</ThemedText>);
    expect(getByText('ExplorePage.title')).toBeTruthy();
  });
});
