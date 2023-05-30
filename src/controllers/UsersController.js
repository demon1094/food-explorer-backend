import { UserRepository } from '../repositories/UserRepository.js'
import { UserCreateService } from '../services/UserCreateService.js'
import { UserUpdateService } from '../services/UserUpdateService.js'

export class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ name, email, password })

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, newPassword } = req.body
    const { id } = req.params

    const userRepository = new UserRepository()
    const userUpdateService = new UserUpdateService(userRepository)

    await userUpdateService.execute({ id, name, email, password, newPassword })

    return res.json()
  }
}