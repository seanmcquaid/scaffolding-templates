export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
}
