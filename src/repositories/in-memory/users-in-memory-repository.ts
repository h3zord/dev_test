import { CreateUser, UsersRepository } from '../contracts/users-repository'
import { User } from '../../entity/User'

export class UsersInMemoryRepository implements UsersRepository {
  public items: User[] = []
  private currentId = 1

  async create(data: CreateUser) {
    const user = new User()

    user.id = data.id ?? this.currentId
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.email = data.email
    user.createdAt = data.createdAt ?? new Date()

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

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async update(id: number, data: Partial<User>) {
    const userIndex = this.items.findIndex((item) => item.id === id)

    const user = this.items[userIndex]

    this.items[userIndex].firstName = data.firstName ?? user.firstName
    this.items[userIndex].lastName = data.lastName ?? user.lastName
    this.items[userIndex].email = data.email ?? user.email
    this.items[userIndex].updatedAt = new Date()
  }

  async delete(id: number) {
    const userIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(userIndex, 1)
  }
}
