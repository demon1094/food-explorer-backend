import { AppError } from "../../utils/AppError.js"
import { compare } from "bcrypt"

import authConfig from '../../configs/auth.js'
import jwt from "jsonwebtoken"
const { sign } = jwt

export class SessionCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError('Email e senha precisam ser informados', 401)
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email e/ou senha incorreta.', 401)
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      throw new AppError('Email e/ou senha incorreta.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return { user, token }
  }
}