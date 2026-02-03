/**
 * @jest-environment jsdom
 */
import Modal from '../modal';

describe('Modal', () => {
  it('exports Modal component', () => {
    expect(Modal).toBeDefined();
    expect(typeof Modal).toBe('function');
  });

  it('renders Modal component', () => {
    const result = Modal({});
    expect(result).toBeDefined();
  });
});
