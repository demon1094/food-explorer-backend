import { OrderCreateService } from "../services/orders/OrderCreateService.js"
import { OrderUpdateService } from "../services/orders/OrderUpdateService.js"
import { OrderRepository } from "../repositories/OrderRepository.js"
import { UserRepository } from "../repositories/UserRepository.js"

export class OrdersController {
  async create(req, res) {
    const user_id = req.user.id
    const { description } = req.body

    const orderRepository = new OrderRepository()
    const orderCreateService = new OrderCreateService(orderRepository)

    const order = await orderCreateService.execute(user_id, description)

    return res.json(order)
  }

  async update(req, res) {
    const user_id = req.user.id
    const { id, status } = req.query

    const orderRepository = new OrderRepository()
    const userRepository = new UserRepository()
    const orderUpdateService = new OrderUpdateService(orderRepository, userRepository)

    const oderUpdated = await orderUpdateService.execute(user_id, id, status)

    return res.json(oderUpdated)
  }
}