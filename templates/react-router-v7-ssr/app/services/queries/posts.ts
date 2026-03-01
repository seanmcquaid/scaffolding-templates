import { useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';
import type Post from '@/types/Post';

/**
 * Query keys for post-related queries.
 *
 * Following TanStack Query v5 best practices:
 * - Use hierarchical structure for easy cache invalidation
 * - Mark as const for better TypeScript inference
 * - Use factory functions for parameterized keys
 *
 * @example
 * // Invalidate all posts
 * queryClient.invalidateQueries({ queryKey: postsQueryKeys.post });
 *
 * // Invalidate specific post
 * queryClient.invalidateQueries({ queryKey: postsQueryKeys.postById('123') });
 */
export const postsQueryKeys = {
  post: ['post'] as const,
  postById: (id: string) => [...postsQueryKeys.post, id] as const,
  posts: ['posts'] as const,
} as const;

/**
 * Query options for fetching a single post by ID.
 *
 * @param id - The post ID to fetch
 * @returns Query options that can be used with useQuery, useSuspenseQuery, or prefetchQuery
 *
 * @example
 * ```tsx
 * // In a component with Suspense
 * const { data: post } = useSuspenseQuery(getPostQuery(postId));
 *
 * // Prefetch on hover
 * queryClient.prefetchQuery(getPostQuery(postId));
 * ```
 */
export const getPostQuery = (id: string) =>
  queryOptions({
    queryFn: async () => postsService.getPost(id),
    queryKey: postsQueryKeys.postById(id),
  });

/**
 * Query options for fetching all posts.
 *
 * @returns Query options that can be used with useQuery, useSuspenseQuery, or prefetchQuery
 *
 * @example
 * ```tsx
 * // In a component with Suspense
 * const { data: posts } = useSuspenseQuery(getPostsQuery());
 *
 * // With manual loading states
 * const { data: posts, isLoading } = useQuery(getPostsQuery());
 * ```
 */
export const getPostsQuery = () =>
  queryOptions({
    queryFn: () => postsService.getPosts(),
    queryKey: postsQueryKeys.posts,
  });

/**
 * Hook for deleting a post with optimistic updates.
 *
 * Implements the TanStack Query v5 optimistic update pattern:
 * - onMutate: Immediately removes the post from the cache for instant UI feedback
 * - onError: Rolls back to the previous state if the deletion fails
 * - onSettled: Always refetches to ensure the cache is in sync with the server
 *
 * @example
 * ```tsx
 * const { mutate: deletePost, isPending } = useDeletePostMutation();
 * deletePost(postId, { onSuccess: () => toast({ title: 'Post deleted' }) });
 * ```
 */
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postsService.deletePost(id),
    onError: (_err, _id, context) => {
      queryClient.setQueryData(postsQueryKeys.posts, context?.previousPosts);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: postsQueryKeys.posts });
      const previousPosts = queryClient.getQueryData<Post[]>(
        postsQueryKeys.posts,
      );
      queryClient.setQueryData<Post[]>(postsQueryKeys.posts, old =>
        old?.filter(post => post.id.toString() !== id) ?? [],
      );
      return { previousPosts };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.posts });
    },
  });
};
