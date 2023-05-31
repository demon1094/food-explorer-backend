import knex from '../database/knex/index.js'

export class DishRepository {
  async findById(id) {
    const dish = await knex('dishes').where({ id }).first()

    return dish
  }

  async create({ name, price, description, category }) {
    const dishId = await knex('dishes').insert({
      name,
      price,
      description,
      category
    })

    return dishId
  }

  async update({ id, name, price, description, category }) {
    const dishUpdated = await knex('dishes')
    .where({ id })
    .update({
      name,
      price,
      description,
      category,
      updated_at: knex.fn.now()
    })

    return dishUpdated
  }

  async delete(id) {
    const deletedDish = await knex('dishes').where({ id }).delete()

    return deletedDish
  }
}