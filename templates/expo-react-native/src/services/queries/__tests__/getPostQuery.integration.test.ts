import { useQuery } from '@tanstack/react-query';
import { renderHook, waitFor } from '@/utils/testing/reactNativeTestingLibraryUtils';
import { getPostQuery } from '@/services/queries/posts';

describe('getPostQuery', () => {
  it('fetches a single post by id and returns the expected data shape', async () => {
    const { result } = renderHook(() => useQuery(getPostQuery('1')));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveProperty('id');
    expect(result.current.data).toHaveProperty('title');
    expect(result.current.data).toHaveProperty('body');
    expect(result.current.data).toHaveProperty('userId');
  });
});
