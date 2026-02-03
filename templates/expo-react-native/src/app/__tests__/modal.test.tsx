import Modal from '../modal';
import { render, screen } from '@/utils/testing/reactNativeTestingLibraryUtils';

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
