import { Router } from "express"

import { DishesController } from '../controllers/DishesController.js'

import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated.js'

const dishesController = new DishesController()

export const dishesRoutes = Router()

dishesRoutes.post('/', EnsureAuthenticated, dishesController.create)
dishesRoutes.put('/', EnsureAuthenticated, dishesController.update)