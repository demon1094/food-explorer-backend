export class OrderIndexService {
  constructor(orderRepository, userRepository) {
    this.orderRepository = orderRepository
    this.userRepository = userRepository
  }

  async execute(user_id) {
    const user = await this.userRepository.findById(user_id)

    if (user.isAdmin) {
      const response = this.orderRepository.index()

      return response
    }

    const response = await this.orderRepository.findByUserId(user_id)

    return response
  }
}