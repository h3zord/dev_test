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

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async update(id: number, data: Partial<User>) {
    const userIndex = this.items.findIndex((item) => item.id === id)

    if (userIndex < 0) {
      return null
    }

    const user = this.items[userIndex]

    this.items[userIndex] = {
      ...user,
      firstName: data.firstName ?? user.firstName,
      lastName: data.lastName ?? user.lastName,
      email: data.email ?? user.email,
      updatedAt: new Date(),
    }

    return this.items[userIndex]
  }

  // async delete(id: number) {}
}
