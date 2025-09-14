import { render } from '@testing-library/react';

import { ThemedText } from './ThemedText';

describe('ThemedText', () => {
  it('renders correctly with default props', () => {
    // eslint-disable-next-line react-native/no-raw-text
    const { getByText } = render(<ThemedText>Hello World</ThemedText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies title type styling', () => {
    // eslint-disable-next-line react-native/no-raw-text
    const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);
    const element = getByText('Title Text');
    expect(element).toBeTruthy();
  });

  it('applies custom light and dark colors', () => {
    const { getByText } = render(
      // eslint-disable-next-line react-native/no-raw-text
      <ThemedText lightColor="#FF0000" darkColor="#00FF00">
        Colored Text
      </ThemedText>
    );
    expect(getByText('Colored Text')).toBeTruthy();
  });
});
