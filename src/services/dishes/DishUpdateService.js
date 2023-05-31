import { AppError } from "../../utils/AppError.js"

export class DishUpdateService {
  constructor(dishRepositoy, userRepository) {
    this.dishRepositoy = dishRepositoy
    this.userRepository = userRepository
  }

  async execute({ dish_id, user_id, name, price, description, category }) {
    const user = await this.userRepository.findById(user_id)

    const isAdmin = user.isAdmin

    if (!isAdmin) {
      throw new AppError('Somente usuários admin pode atualizar um prato.')
    }

    const dish = await this.dishRepositoy.findById(dish_id)

    name = name ?? dish.name
    price = price ?? dish.price
    description = description ?? dish.description
    category = category ?? dish.category

    await this.dishRepositoy.update({
      id: dish_id,
      name,
      price,
      description,
      category
    })

    return dish
  }
}