import { parseDependencyTree, parseCircular } from 'dpdm';

describe('dependencies', () => {
  it('has no circular dependencies', async () => {
    const tree = await parseDependencyTree('app/root.tsx', {});
    const circulars = parseCircular(tree);
    expect(circulars).toHaveLength(0);
  });
});
