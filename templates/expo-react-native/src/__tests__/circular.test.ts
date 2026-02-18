import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('dependencies', () => {
  it('has no circular dependencies', async () => {
    const { stdout } = await execAsync(
      'pnpm exec dpdm --no-tree --no-warning --exit-code circular:1 src/app/_layout.tsx'
    );

    // DPDM exits with code 1 if circular dependencies are found
    // If we reach here, no circular dependencies were found
    expect(stdout).toContain('no circular dependency');
  });
});
