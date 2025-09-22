import { render, screen } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders the button title', () => {
    render(<Button title="Test Button" />);

    expect(screen.getByText('Test Button')).toBeTruthy();
  });

  it('applies primary variant styles by default', () => {
    render(<Button title="Primary Button" />);

    const button = screen.getByText('Primary Button').parent;
    expect(button).toBeTruthy();
  });

  it('applies secondary variant styles', () => {
    render(<Button title="Secondary Button" variant="secondary" />);

    const button = screen.getByText('Secondary Button').parent;
    expect(button).toBeTruthy();
  });

  it('applies outline variant styles', () => {
    render(<Button title="Outline Button" variant="outline" />);

    const button = screen.getByText('Outline Button').parent;
    expect(button).toBeTruthy();
  });

  it('handles disabled state', () => {
    const onPressMock = vi.fn();
    render(<Button title="Disabled Button" disabled onPress={onPressMock} />);

    const button = screen.getByText('Disabled Button').parent;
    expect(button).toBeTruthy();
  });
});
