import { render, screen } from '@testing-library/react-native';
import Modal from '@/app/modal';

describe('Modal', () => {
  it('renders the modal title', () => {
    render(<Modal />);
    expect(screen.getByText('Modal.title')).toBeTruthy();
  });

  it('renders the modal description', () => {
    render(<Modal />);
    expect(screen.getByText('Modal.description')).toBeTruthy();
  });
});
