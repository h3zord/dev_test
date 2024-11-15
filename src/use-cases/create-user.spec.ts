import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: UsersInMemoryRepository
let sut: CreateUserUseCase

describe('Create user use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new CreateUserUseCase(usersRepository)

    await usersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test1@test.com',
    })
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test2@test.com',
    })

    expect(user.id).toEqual(expect.any(Number))
    expect(user.email).toEqual('test2@test.com')
  })

  it('should throw an error when user already exists', async () => {
    await expect(() =>
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test1@test.com',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
