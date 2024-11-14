import { UsersInMemoryRepository } from '../repositories/in-memory/user-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateUserUseCase } from './create-user'

let usersRepository: UsersInMemoryRepository
let sut: CreateUserUseCase

describe('Create user Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should to create an user', async () => {
    const { user } = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })

    expect(user.id).toEqual(expect.any(Number))
  })
})
