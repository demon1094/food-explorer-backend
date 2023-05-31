import { AppError } from "../../utils/AppError.js"

export class DishDeleteService {
  constructor(dishRepository, userRepository) {
    this.dishRepository = dishRepository
    this.userRepository = userRepository
  }

  async execute({ dish_id, user_id }) {
    const user = await this.userRepository.findById(user_id)

    const isAdmin = user.isAdmin

    if (!isAdmin) {
      throw new AppError('Somente usuários admin podem deletar um prato.')
    }

    const deletedDish = await this.dishRepository.delete(dish_id)

    return deletedDish
  }
}