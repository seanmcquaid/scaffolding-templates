import { queryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';

export const PostsQueryKeys = {
  GET_POST: 'GET_POST',
  GET_POSTS: 'GET_POSTS',
} as const;

export const getPostQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [PostsQueryKeys.GET_POST, id],
    queryFn: async () => postsService.getPost(id),
  });

export const getPostsQueryOptions = () =>
  queryOptions({
    queryKey: [PostsQueryKeys.GET_POSTS],
    queryFn: () => postsService.getPosts(),
  });
