import { AppError } from "../../utils/AppError.js"

export class FavoritesCreateService {
  constructor(favoritesRepository, dishRepository) {
    this.favoritesRepository = favoritesRepository
    this.dishRepository = dishRepository
  }

  async execute({ dish_id, user_id }) {
    const dishExists = await this.dishRepository.findById(dish_id)

    if (!dishExists) {
      throw new AppError('Prato não encontrado.', 404)
    }

    const dishAlreadyFavorited = await this.favoritesRepository.findByDishId(dish_id)

    if (dishAlreadyFavorited) {
      throw new AppError('Este prato já está na lista de favoritos.', 401)
    }

    const favoritedDish = await this.favoritesRepository.create({ dish_id, user_id })

    return favoritedDish
  }
}