import { Repository } from 'typeorm'
import { AppDataSource } from '../..'
import { User } from '../../entity/User'
import { CreateUser, UsersRepository } from '../contracts/users-repository'

export class UsersTypeOrmRepository implements UsersRepository {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async create(data: CreateUser) {
    const newUser = new User()

    newUser.firstName = data.firstName
    newUser.lastName = data.firstName
    newUser.email = data.email

    await this.userRepository.save(newUser)

    return newUser
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id })

    return user
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email })

    return user
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepository.update(id, { ...data })
  }

  async delete(id: number) {
    await this.userRepository.delete(id)
  }
}
