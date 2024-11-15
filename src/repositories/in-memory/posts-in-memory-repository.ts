import { CreatePost, PostsRepository } from '../contracts/posts-repository'
import { Post } from '../../entity/Post'

export class PostsInMemoryRepository implements PostsRepository {
  public items: Post[] = []
  private currentId = 1

  async create(data: CreatePost) {
    const post = {
      id: data.id ?? this.currentId++,
      title: data.title,
      description: data.description,
      user: { id: data.userId },
      createdAt: data.createdAt ?? new Date(),
    } as Post

    this.items.push(post)

    return post
  }

  async findById(id: number) {
    const post = this.items.find((item) => item.id === id)

    if (!post) {
      return null
    }

    return post
  }

  async findManyByUserId(userId: number) {
    const posts = this.items.filter((item) => item.user.id === userId)

    return posts
  }

  async update(id: number, data: Partial<Post>) {
    const postIndex = this.items.findIndex((item) => item.id === id)

    const post = this.items[postIndex]

    this.items[postIndex] = {
      ...post,
      title: data.title ?? post.title,
      description: data.description ?? post.description,
      updatedAt: new Date(),
    }

    return this.items[postIndex]
  }

  async delete(id: number) {
    const postIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(postIndex, 1)
  }
}
