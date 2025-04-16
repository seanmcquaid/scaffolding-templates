import { postSchema } from '@/types/Post'
import { generateMock } from '@anatine/zod-mock'
import { http, HttpResponse } from 'msw'
import { z } from 'zod'

export const getPostsHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts',
  () => HttpResponse.json(generateMock(z.array(postSchema))),
)

export const getPostByIdHandler = http.get(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json(generateMock(postSchema)),
)

export const deletePostByIdHandler = http.delete(
  'https://jsonplaceholder.typicode.com/posts/:id',
  () => HttpResponse.json([]),
)
