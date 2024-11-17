import { AppDataSource } from '../../data-source'
import { Post } from '../../entity/Post'
import { createTestUser } from './create-test-user'

export interface CreateTestPost {
  id?: number
  title?: string
  description?: string
  post?: Post
  createdAt?: Date
  updatedAt?: Date
}

export async function createTestPost(data: CreateTestPost = {}) {
  const newPost = new Post()
  const user = await createTestUser()

  newPost.title = data.title ?? 'Void title'
  newPost.description = data.description ?? 'Void description'
  newPost.user = user

  const postRepository = AppDataSource.getRepository(Post)

  await postRepository.save(newPost)

  return newPost
}
