import { DishImageUpdateService } from "../services/dishes/DishImageUpdateService.js"
import { UserRepository } from "../repositories/UserRepository.js"
import { DishRepository } from "../repositories/DishRepository.js"

export class DishImageController {
  async update(req, res) {
    const user_id = req.user.id
    const { dish_id } = req.query
    const imageFilename = req.file.filename

    const userRepository = new UserRepository()
    const dishRepository = new DishRepository()

    const dishImageUpdateService = new DishImageUpdateService(userRepository, dishRepository)

    await dishImageUpdateService.execute({ user_id, dish_id, imageFilename })

    return res.json()
  }
}