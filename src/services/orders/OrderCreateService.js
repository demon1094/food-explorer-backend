export class OrderCreateService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(user_id, description) {
    const order = await this.orderRepository.create(user_id, description)
    
    return order
  }
}