/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Modal from '@/app/modal';

describe('Modal', () => {
  it('renders without crashing', () => {
    render(<Modal />);
  });

  it('renders the modal title', () => {
    render(<Modal />);
    expect(screen.getByText('Modal.title')).toBeInTheDocument();
  });

  it('renders the modal description', () => {
    render(<Modal />);
    expect(screen.getByText('Modal.description')).toBeInTheDocument();
  });
});
