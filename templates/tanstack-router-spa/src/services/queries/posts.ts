import { queryOptions } from '@tanstack/react-query';
import postsService from '@/services/postsService';

export const PostsQueryKeys = {
  GET_POST: 'GET_POST',
  GET_POSTS: 'GET_POSTS',
} as const;

export const getPostQueryOptions = (id: string) =>
  queryOptions({
    queryFn: async () => postsService.getPost(id),
    queryKey: [PostsQueryKeys.GET_POST, id],
  });

export const getPostsQueryOptions = () =>
  queryOptions({
    queryFn: () => postsService.getPosts(),
    queryKey: [PostsQueryKeys.GET_POSTS],
  });
