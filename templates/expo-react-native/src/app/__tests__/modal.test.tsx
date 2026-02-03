import { render, screen } from '@testing-library/react-native';
import Modal from '../modal';

describe('Modal', () => {
  it('renders modal title', () => {
    render(<Modal />);
    expect(screen.getByText('Modal.title')).toBeTruthy();
  });

  it('renders modal description', () => {
    render(<Modal />);
    expect(screen.getByText('Modal.description')).toBeTruthy();
  });
});
