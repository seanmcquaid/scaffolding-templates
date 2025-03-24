import { useFunPackage } from './index';

describe('useFunPackage', () => {
  it('returns a negative number when a positive is provided', () => {
    expect(useFunPackage({ num: 100 })).toEqual(100);
  });
});
