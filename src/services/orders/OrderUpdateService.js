import { AppError } from "../../utils/AppError.js"

export class OrderUpdateService {
  constructor(orderRepository, userRepository) {
    this.orderRepository = orderRepository
    this.userRepository = userRepository
  }

  async execute(user_id, id, status) {
    const user = await this.userRepository.findById(user_id)

    if (!user.isAdmin) {
      throw new AppError('Somente usuários admin podem atualizar o pedido.', 401)
    }

    const orderUpdated = await this.orderRepository.update(id, status)

    return orderUpdated
  }
}