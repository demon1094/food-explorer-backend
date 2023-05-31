import { SessionCreateService } from "../services/session/SessionCreateService.js"
import { UserRepository } from '../repositories/UserRepository.js'

export class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const userRepository = new UserRepository()
    const sessionCreateService = new SessionCreateService(userRepository)

    const response = await sessionCreateService.execute({ email, password })

    return res.json(response)
  }
}