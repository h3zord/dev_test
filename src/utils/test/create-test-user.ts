import { AppDataSource } from '../../data-source'
import { User } from '../../entity/User'

export interface CreateTestUser {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  createdAt?: Date
  updatedAt?: Date
}

export async function createTestUser(data: CreateTestUser = {}) {
  const newUser = new User()

  newUser.firstName = data.firstName ?? 'John'
  newUser.lastName = data.lastName ?? 'Doe'
  newUser.email = data.email ?? 'test@test.com'

  const userRepository = AppDataSource.getRepository(User)

  await userRepository.save(newUser)

  return newUser
}
