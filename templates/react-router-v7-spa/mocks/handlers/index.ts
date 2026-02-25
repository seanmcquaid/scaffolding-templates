import {
  deletePostByIdHandler,
  getPostByIdHandler,
  getPostsHandler,
} from './postsHandlers.js';

const handlers = [getPostsHandler, getPostByIdHandler, deletePostByIdHandler];

export default handlers;
