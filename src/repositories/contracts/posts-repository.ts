import { Post } from '../../entity/Post'

export interface CreatePost {
  id?: number
  title: string
  description: string
  userId: number
  createdAt?: Date
  updatedAt?: Date
}

export interface PostsRepository {
  create(data: CreatePost): Promise<Post>
  findById(id: number): Promise<Post | null>
  findManyByUserId(userId: number): Promise<Post[]>
  update(id: number, data: Partial<Post>): Promise<Post>
  delete(id: number): Promise<void>
}
