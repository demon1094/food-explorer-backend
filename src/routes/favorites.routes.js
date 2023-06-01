import { Router } from "express"

import { FavoritesController } from '../controllers/FavoritesController.js'

import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated.js'

const favoritesController = new FavoritesController()

export const favoritesRoutes = Router()

favoritesRoutes.post('/', EnsureAuthenticated, favoritesController.create)
favoritesRoutes.get('/', EnsureAuthenticated, favoritesController.index)