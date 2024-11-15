import { User } from '../entity/User'
import { UsersRepository } from '../repositories/contracts/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateUserUseCaseRequest {
  firstName: string
  lastName: string
  email: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    firstName,
    lastName,
    email,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new UserAlreadyExistsError()
    }

    const newUser = await this.usersRepository.create({
      firstName,
      lastName,
      email,
    })

    return {
      user: newUser,
    }
  }
}
