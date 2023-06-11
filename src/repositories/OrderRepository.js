import knex from "../database/knex/index.js"

export class OrderRepository {
  constructor() {
    this.orders = knex('orders')
  }

  async findById(id) {
    const order = await this.orders.where({ id })

    return order
  }

  async findByUserId(user_id) {
    const orders = await this.orders.where({ user_id })

    return orders
  }

  async create(user_id, description) {
    const [ order_id ] = await this.orders.insert({
      user_id,
      description
    })

    return order_id
  }

  async update(id, status) {
    const orderUpdated = await this.orders
    .where({ id })
    .update({
      status,
      updated_at: knex.fn.now()
    })

    return orderUpdated
  }

  async index() {
    const orders = await this.orders

    return orders
  }
}