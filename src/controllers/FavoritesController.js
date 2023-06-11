import { FavoritesCreateService } from "../services/favorites/FavoriteCreateService.js"
import { FavoritesRepository } from "../repositories/FavoritesRepository.js"
import { DishRepository } from "../repositories/DishRepository.js"

export class FavoritesController {
  async create(req, res) {
    const { dish_id } = req.query
    const user_id = req.user.id

    const favoritesRepository = new FavoritesRepository()
    const dishRepository = new DishRepository()

    const favoritesCreateService = new FavoritesCreateService(
      favoritesRepository, dishRepository
    )

    await favoritesCreateService.execute({ dish_id, user_id })

    return res.status(201).json()
  }

  async index(req, res) {
    const user_id = req.user.id

    const favoritesRepository = new FavoritesRepository()

    const userFavoriteDishes = await favoritesRepository.index(user_id)

    return res.json(userFavoriteDishes)
  }

  async delete(req, res) {
    const { dish_id } = req.params
    const user_id = req.user.id

    const favoritesRepository = new FavoritesRepository()

    await favoritesRepository.delete(dish_id, user_id)

    return res.json()
  }
}