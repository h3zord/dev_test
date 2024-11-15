import { CreateUser, UsersRepository } from '../contracts/users-repository'
import { User } from '../../entity/User'

export class UsersInMemoryRepository implements UsersRepository {
  public items: User[] = []
  private currentId = 1

  async create(data: CreateUser) {
    const user = {
      id: data.id ?? this.currentId++,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      createdAt: data.createdAt ?? new Date(),
    } as User

    this.items.push(user)

    return user
  }

  async findById(id: number) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  // async findByEmail(email: string) {}

  // async delete(id: string) {}
}
