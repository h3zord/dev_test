import { PostsInMemoryRepository } from '../repositories/in-memory/posts-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdatePostUseCase } from './update-post'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'

let postsRepository: PostsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let sut: UpdatePostUseCase

describe('Update post use case', () => {
  beforeEach(async () => {
    postsRepository = new PostsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()
    sut = new UpdatePostUseCase(postsRepository)

    await usersRepository.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })

    await postsRepository.create({
      id: 1,
      title: 'Void title',
      description: 'Void description',
      userId: 1,
    })
  })

  it('should be able to update a post', async () => {
    const { post } = await sut.execute({
      id: 1,
      title: 'Filled title',
      description: 'Filled description',
    })

    expect(post.title).toEqual('Filled title')
    expect(post.description).toEqual('Filled description')
    expect(post.updatedAt).toEqual(expect.any(Date))
  })

  it('should throw an error when id is invalid', async () => {
    await expect(() =>
      sut.execute({
        id: 2,
        title: 'Filled title',
        description: 'Filled description',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
