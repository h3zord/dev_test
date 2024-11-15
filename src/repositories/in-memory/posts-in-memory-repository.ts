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

  // async findByEmail(email: string) {}

  // async update(id: number, data: Partial<User>) {}

  // async delete(id: number) {}
}
