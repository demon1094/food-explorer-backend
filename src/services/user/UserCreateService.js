import { AppError } from "../../utils/AppError.js"
import { hash } from "bcrypt"

export class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const emailAlreadyInUse = await this.userRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new AppError('Este email já está em uso.', 401)
    }

    const hashedPassword = await hash(password, 10)

    const createdUser = await this.userRepository.create({ name, email, password: hashedPassword })

    return createdUser
  }
}