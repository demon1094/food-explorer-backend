import { Router } from 'express'

import { UsersController } from '../controllers/UsersController.js'

const usersController = new UsersController()

export const usersRoutes = Router()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/:id', usersController.update)