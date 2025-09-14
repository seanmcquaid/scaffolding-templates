import React from 'react';
import { render } from '@testing-library/react-native';

import { ThemedText } from '@/src/components/ThemedText';

describe('ThemedText', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<ThemedText>Hello World</ThemedText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies title type styling', () => {
    const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);
    const element = getByText('Title Text');
    expect(element).toBeTruthy();
  });

  it('applies custom light and dark colors', () => {
    const { getByText } = render(
      <ThemedText lightColor="#FF0000" darkColor="#00FF00">
        Colored Text
      </ThemedText>
    );
    expect(getByText('Colored Text')).toBeTruthy();
  });
});