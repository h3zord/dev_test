import { User } from '../../entity/User'

export interface CreateUser {
  id?: number
  firstName: string
  lastName: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UsersRepository {
  create(data: CreateUser): Promise<User>
  findById(id: number): Promise<User | null>
  // findByEmail(email: string): Promise<User | null>
  // delete(id: number): Promise<null>
}
