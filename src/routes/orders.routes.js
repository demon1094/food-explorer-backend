import { Router } from "express"

import { OrdersController } from '../controllers/OrdersController.js'

import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated.js'

const ordersController = new OrdersController()

export const ordersRoutes = Router()

ordersRoutes.post('/', EnsureAuthenticated, ordersController.create)
ordersRoutes.put('/', EnsureAuthenticated, ordersController.update)