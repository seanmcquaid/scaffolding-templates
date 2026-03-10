import { submitName } from '../actions';

describe('submitName', () => {
  it('returns errors when the name is too short', async () => {
    const formData = new FormData();
    formData.append('name', 'ab');

    const result = await submitName(undefined, formData);

    expect(result).toEqual({
      name: 'Name must be between 3 and 10 characters',
    });
  });

  it('returns errors when the name is too long', async () => {
    const formData = new FormData();
    formData.append('name', 'this is way too long');

    const result = await submitName(undefined, formData);

    expect(result).toEqual({
      name: 'Name must be between 3 and 10 characters',
    });
  });

  it('returns undefined when the name is valid', async () => {
    const formData = new FormData();
    formData.append('name', 'John');

    const result = await submitName(undefined, formData);

    expect(result).toBeUndefined();
  });
});
