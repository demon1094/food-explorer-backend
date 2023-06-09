import { Router } from "express"

import { DishesController } from '../controllers/DishesController.js'

import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated.js'
import { DishImageController } from "../controllers/DishImageController.js"

import * as uploadConfig from "../configs/upload.js"
import multer from "multer"
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const dishImageController = new DishImageController()

export const dishesRoutes = Router()

dishesRoutes.post('/', EnsureAuthenticated, dishesController.create)
dishesRoutes.put('/', EnsureAuthenticated, dishesController.update)
dishesRoutes.patch('/image', EnsureAuthenticated, upload.single('image'), dishImageController.update)
dishesRoutes.get('/:id', EnsureAuthenticated, dishesController.show)
dishesRoutes.get('/', EnsureAuthenticated, dishesController.index)
dishesRoutes.delete('/', EnsureAuthenticated, dishesController.delete)