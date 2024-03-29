import { DishCreateService } from "../services/dishes/DishCreateService.js"
import { DishUpdateService } from "../services/dishes/DishUpdateService.js"
import { DishDeleteService } from "../services/dishes/DishDeleteService.js"
import { DishRepository } from "../repositories/DishRepository.js"
import { UserRepository } from "../repositories/UserRepository.js"

export class DishesController {
  async create(req, res) {
    const { name, price, description, category, ingredients } = req.body
    const user_id = req.user.id

    const dishRepository = new DishRepository()
    const userRepository = new UserRepository()
    const dishCreateService = new DishCreateService(dishRepository, userRepository)

    const response = await dishCreateService.execute({
      user_id,
      name,
      price,
      description,
      category,
      ingredients
    })

    return res.status(201).json(response)
  }

  async update(req, res) {
    const { name, price, description, category, ingredients } = req.body
    const { dish_id } = req.query
    const user_id = req.user.id

    const dishRepository = new DishRepository()
    const userRepository = new UserRepository()
    const dishUpdateService = new DishUpdateService(dishRepository, userRepository)

    const response = await dishUpdateService.execute({
      dish_id,
      user_id,
      name,
      price,
      description,
      category,
      ingredients
    })

    return res.json(response)
  }

  async show(req, res) {
    const { id } = req.params

    const dishRepository = new DishRepository()

    const dish = await dishRepository.show(id)

    return res.json(dish)
  }

  async index(req, res) {
    const { name } = req.query

    const dishRepository = new DishRepository()
    
    const response = await dishRepository.index({ name })

    return res.json(response)
  } 

  async delete(req, res) {
    const { dish_id } = req.query
    const user_id = req.user.id

    const dishRepository = new DishRepository()
    const userRepository = new UserRepository()
    const dishDeleteService = new DishDeleteService(dishRepository, userRepository)

    const response = await dishDeleteService.execute({ dish_id, user_id })

    return res.json(response)
  }
}