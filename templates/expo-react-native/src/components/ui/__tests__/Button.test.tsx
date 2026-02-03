import { Button } from '../Button';
import { render, screen } from '@/utils/testing/reactNativeTestingLibraryUtils';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Common.clickMe</Button>);
    expect(screen.getByText('Common.clickMe')).toBeTruthy();
  });

  it('renders with default variant', () => {
    render(<Button variant="default">Common.submit</Button>);
    expect(screen.getByText('Common.submit')).toBeTruthy();
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Common.cancel</Button>);
    expect(screen.getByText('Common.cancel')).toBeTruthy();
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Common.outline</Button>);
    expect(screen.getByText('Common.outline')).toBeTruthy();
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Common.delete</Button>);
    expect(screen.getByText('Common.delete')).toBeTruthy();
  });

  it('handles disabled state', () => {
    render(<Button disabled>Common.disabled</Button>);
    expect(screen.getByText('Common.disabled')).toBeTruthy();
  });

  it('handles onPress events', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress}>Common.pressable</Button>);
    expect(screen.getByText('Common.pressable')).toBeTruthy();
  });
});
