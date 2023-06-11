import { Router } from "express"

import { FavoritesController } from '../controllers/FavoritesController.js'

import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated.js'

const favoritesController = new FavoritesController()

export const favoritesRoutes = Router()

favoritesRoutes.post('/', EnsureAuthenticated, favoritesController.create)
favoritesRoutes.get('/', EnsureAuthenticated, favoritesController.index)
favoritesRoutes.get('/:dish_id', EnsureAuthenticated, favoritesController.show)
favoritesRoutes.delete('/', EnsureAuthenticated, favoritesController.delete)