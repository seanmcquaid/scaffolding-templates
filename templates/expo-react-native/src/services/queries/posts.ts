import type { QueryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';
import type { Post } from '@/types';

export const postsQueryKeys = {
  posts: ['posts'] as const,
  post: (id: string) => ['posts', id] as const,
};

export const getPostsQuery = (): QueryOptions<Post[]> => ({
  queryKey: postsQueryKeys.posts,
  queryFn: postsService.getPosts,
});

export const getPostQuery = (id: string): QueryOptions<Post> => ({
  queryKey: postsQueryKeys.post(id),
  queryFn: () => postsService.getPost(id),
});