import { Post } from '../entity/Post'
import { PostsRepository } from '../repositories/contracts/posts-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdatePostUseCaseRequest {
  id: number
  title: string
  description: string
}

interface UpdatePostUseCaseResponse {
  post: Post
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    id,
    title,
    description,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    const updatedPost = await this.postsRepository.update(id, {
      title,
      description,
    })

    return {
      post: updatedPost,
    }
  }
}
