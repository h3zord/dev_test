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
  findByEmail(email: string): Promise<User | null>
  update(id: number, data: Partial<User>): Promise<User | null>
  // delete(id: number): Promise<void | null>
}
