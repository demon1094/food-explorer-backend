import knex from '../database/knex/index.js'

export class DishRepository {
  async findById(id) {
    const dish = await knex('dishes').where({ id }).first()

    return dish
  }

  async create({ name, price, description, category, ingredients }) {
    const [ dish_id ] = await knex('dishes').insert({
      name,
      price,
      description,
      category
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dish_id,
        name: ingredient
      }
    })

    await knex('ingredients').insert(ingredientsInsert)
  }

  async update({ id, name, price, description, category, ingredients }) {
    await knex('dishes')
    .where({ id })
    .update({
      name,
      price,
      description,
      category,
      updated_at: knex.fn.now()
    })

    const ingredientsUpdate = ingredients.map(ingredient => {
      return {
        dish_id: id,
        name: ingredient
      }
    })

    await knex('ingredients')
    .where({ dish_id: id })
    .delete()

    await knex('ingredients').insert(ingredientsUpdate)
  }

  async show(id) {
    const dishes = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients').where({ dish_id: id })

    return {
      ...dishes,
      ingredients
    }
  }

  async index({ name }) {
    const dishes = await knex('ingredients')
    .select([
      'dishes.name',
      'dishes.id'
    ])
    .whereLike('dishes.name', `%${name}%`)
    .orWhereLike('ingredients.name', `%${name}%`)
    .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
    .groupBy('dishes.id')
    .orderBy('dishes.name')

    return dishes
  }

  async delete(id) {
    const deletedDish = await knex('dishes').where({ id }).delete()

    return deletedDish
  }
}