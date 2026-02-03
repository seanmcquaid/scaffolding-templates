/**
 * @jest-environment jsdom
 */
import { ThemedText } from '../ThemedText';

describe('ThemedText', () => {
  it('exports ThemedText component', () => {
    expect(ThemedText).toBeDefined();
    expect(typeof ThemedText).toBe('function');
  });

  it('accepts children prop', () => {
    const result = ThemedText({ children: 'Text content' });
    expect(result).toBeDefined();
  });

  it('accepts type prop - default', () => {
    const result = ThemedText({ children: 'Text', type: 'default' });
    expect(result).toBeDefined();
  });

  it('accepts type prop - title', () => {
    const result = ThemedText({ children: 'Text', type: 'title' });
    expect(result).toBeDefined();
  });

  it('accepts type prop - defaultSemiBold', () => {
    const result = ThemedText({
      children: 'Text',
      type: 'defaultSemiBold',
    });
    expect(result).toBeDefined();
  });

  it('accepts type prop - subtitle', () => {
    const result = ThemedText({ children: 'Text', type: 'subtitle' });
    expect(result).toBeDefined();
  });

  it('accepts type prop - link', () => {
    const result = ThemedText({ children: 'Text', type: 'link' });
    expect(result).toBeDefined();
  });

  it('accepts lightColor prop', () => {
    const result = ThemedText({
      children: 'Text',
      lightColor: '#000000',
    });
    expect(result).toBeDefined();
  });

  it('accepts darkColor prop', () => {
    const result = ThemedText({
      children: 'Text',
      darkColor: '#FFFFFF',
    });
    expect(result).toBeDefined();
  });

  it('accepts both light and dark colors', () => {
    const result = ThemedText({
      children: 'Text',
      lightColor: '#000000',
      darkColor: '#FFFFFF',
    });
    expect(result).toBeDefined();
  });

  it('accepts style prop', () => {
    const result = ThemedText({
      children: 'Text',
      style: { fontSize: 20 },
    });
    expect(result).toBeDefined();
  });

  it('accepts Text props', () => {
    const result = ThemedText({
      children: 'Text',
      testID: 'themed-text',
    });
    expect(result).toBeDefined();
  });
});
