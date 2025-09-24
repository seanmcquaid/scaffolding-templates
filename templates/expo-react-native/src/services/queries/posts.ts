import { queryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';

export const postsQueryKeys = {
  posts: ['posts'] as const,
  post: (id: string) => ['posts', id] as const,
};

export const getPostsQuery = () =>
  queryOptions({
    queryKey: postsQueryKeys.posts,
    queryFn: () => postsService.getPosts(),
  });

export const getPostQuery = (id: string) =>
  queryOptions({
    queryKey: postsQueryKeys.post(id),
    queryFn: () => postsService.getPost(id),
  });
