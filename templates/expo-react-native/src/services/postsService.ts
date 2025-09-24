import ky from 'ky';
import type { Post } from '@/types';

export interface PostsService {
  getPosts: () => Promise<Post[]>;
  getPost: (id: string) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;
}

const postsService: PostsService = {
  getPosts: async (): Promise<Post[]> => {
    return ky.get('posts').json<Post[]>();
  },

  getPost: async (id: string): Promise<Post> => {
    return ky.get(`posts/${id}`).json<Post>();
  },

  deletePost: async (id: string): Promise<void> => {
    await ky.delete(`posts/${id}`);
  },
};

export default postsService;