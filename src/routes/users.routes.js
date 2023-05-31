import { Router } from 'express'

import { UsersController } from '../controllers/UsersController.js'

import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated.js'

const usersController = new UsersController()

export const usersRoutes = Router()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', EnsureAuthenticated, usersController.update)