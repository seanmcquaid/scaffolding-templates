import { parseCircular, parseDependencyTree } from 'dpdm';

describe('dependencies', () => {
  it('has no circular dependencies', async () => {
    const tree = await parseDependencyTree('src/app/_layout.tsx', {});
    const circulars = parseCircular(tree);
    expect(circulars).toHaveLength(0);
  });
});
