import { ThemedText } from '../ThemedText';
import { render, screen } from '@/utils/testing/reactNativeTestingLibraryUtils';

describe('ThemedText', () => {
  it('renders children text', () => {
    render(<ThemedText>Common.text</ThemedText>);
    expect(screen.getByText('Common.text')).toBeTruthy();
  });

  it('renders with default type', () => {
    render(<ThemedText type="default">Common.default</ThemedText>);
    expect(screen.getByText('Common.default')).toBeTruthy();
  });

  it('renders with title type', () => {
    render(<ThemedText type="title">Common.title</ThemedText>);
    expect(screen.getByText('Common.title')).toBeTruthy();
  });

  it('renders with defaultSemiBold type', () => {
    render(<ThemedText type="defaultSemiBold">Common.semiBold</ThemedText>);
    expect(screen.getByText('Common.semiBold')).toBeTruthy();
  });

  it('renders with subtitle type', () => {
    render(<ThemedText type="subtitle">Common.subtitle</ThemedText>);
    expect(screen.getByText('Common.subtitle')).toBeTruthy();
  });

  it('renders with link type', () => {
    render(<ThemedText type="link">Common.link</ThemedText>);
    expect(screen.getByText('Common.link')).toBeTruthy();
  });

  it('renders with custom colors', () => {
    render(
      <ThemedText lightColor="#000000" darkColor="#FFFFFF">
        Common.coloredText
      </ThemedText>
    );
    expect(screen.getByText('Common.coloredText')).toBeTruthy();
  });

  it('renders with testID', () => {
    render(<ThemedText testID="themed-text">Common.testable</ThemedText>);
    expect(screen.getByTestId('themed-text')).toBeTruthy();
  });
});
