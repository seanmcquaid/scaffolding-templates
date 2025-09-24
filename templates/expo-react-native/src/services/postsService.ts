import ky from 'ky';
import type { Post } from '@/types';

const postsService = {
  getPosts: () => ky.get('posts').json<Post[]>(),
  getPost: (id: string) => ky.get(`posts/${id}`).json<Post>(),
  deletePost: (id: string) => ky.delete(`posts/${id}`),
};

export default postsService;
