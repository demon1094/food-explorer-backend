import { AppError } from "../../utils/AppError.js"
import { hash, compare } from "bcrypt"

export class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id, name, email, password, newPassword }) {
    const user = await this.userRepository.findById(id)

    const emailAlreadyInUse = await this.userRepository.findByEmail(email)

    if (emailAlreadyInUse && emailAlreadyInUse.id !== user.id) {
      throw new AppError('Este email já está em uso.')
    }

    name = name ?? user.name
    email = email ?? user.email

    if (newPassword && !password) {
      throw new AppError('Senha atual não informada.')
    }

    if (newPassword && password) {
      const checkPassword = await compare(newPassword, user.password)

      if (!checkPassword) {
        throw new AppError('Senha atual inválida.')
      }

      const hashedPassword = await hash(newPassword, 10)

      user.password = hashedPassword
    }

    await this.userRepository.update({
      id,
      name,
      email,
      password: user.password
    })
  }
}