import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateUserUseCase } from './update-user'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: UsersInMemoryRepository
let sut: UpdateUserUseCase // System Under Test

describe('Update user use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new UpdateUserUseCase(usersRepository)

    await usersRepository.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })
  })

  it('should be able to update an user', async () => {
    const { user } = await sut.execute({
      id: 1,
      firstName: 'Ada',
      lastName: 'Lovelace',
    })

    expect(user.firstName).toEqual('Ada')
    expect(user.lastName).toEqual('Lovelace')
    expect(user.updatedAt).toEqual(expect.any(Date))
  })

  it('should throw an error when id is invalid', async () => {
    await expect(() =>
      sut.execute({ id: 2, firstName: 'Ada', lastName: 'Lovelace' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
