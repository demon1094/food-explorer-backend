import { AppError } from '../../utils/AppError.js'

export class DishCreateService {
  constructor(dishRepository, userRepository) {
    this.dishRepository = dishRepository
    this.userRepository = userRepository
  }

  async execute({ user_id, name, price, description, category }) {
    const user = await this.userRepository.findById(user_id)

    const isAdmin = user.isAdmin

    if (!isAdmin) {
      throw new AppError('Somente usuários admin podem cadastrar um prato.')
    }

    const response = await this.dishRepository.create({ name, price, description, category })

    return response
  }
}