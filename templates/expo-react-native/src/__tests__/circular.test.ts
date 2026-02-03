import madge from 'madge';

describe('dependencies', () => {
  it('has no circular dependencies', async () => {
    const res = await madge('src/app/_layout.tsx');
    const circulars = await res.circular();
    expect(circulars).toHaveLength(0);
  });
});
