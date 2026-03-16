import { render, screen } from '@testing-library/react';
import Modal from '@/app/modal';

describe('Modal', () => {
  it('renders the modal title and description', () => {
    render(<Modal />);
    expect(screen.getByText('Modal.title')).toBeInTheDocument();
    expect(screen.getByText('Modal.description')).toBeInTheDocument();
  });
});
