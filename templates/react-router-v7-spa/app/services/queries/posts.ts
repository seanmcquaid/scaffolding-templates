import { queryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';

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
