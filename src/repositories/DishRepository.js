import knex from '../database/knex/index.js'

export class DishRepository {
  constructor() {
    this.dishes = knex('dishes')
    this.ingredients = knex('ingredients')
  }

  async findById(id) {
    const dish = await this.dishes.where({ id })

    return dish
  }

  async create({ name, price, description, category, ingredients }) {
    const [ dish_id ] = await this.dishes.insert({
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

    await this.ingredients.insert(ingredientsInsert)

    return dish_id
  }

  async update({ id, name, price, description, category, ingredients }) {
    await this.dishes
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

    await this.ingredients
    .where({ dish_id: id })
    .delete()

    await this.ingredients.insert(ingredientsUpdate)
  }

  async updateImage(id, image) {
    await this.dishes
    .where({ id })
    .update({
      image,
      updated_at: knex.fn.now()
    })
  }

  async show(id) {
    const dishes = await this.dishes.where({ id }).first()
    const ingredients = await this.ingredients.where({ dish_id: id })

    return {
      ...dishes,
      ingredients
    }
  }

  async index({ name }) {
    const dishes = await this.ingredients
    .select([
      'dishes.id',
      'dishes.name',
      'dishes.price',
      'dishes.description',
      'dishes.category',
      'dishes.image'
    ])
    .whereLike('dishes.name', `%${name}%`)
    .orWhereLike('ingredients.name', `%${name}%`)
    .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
    .groupBy('dishes.id')
    .orderBy('dishes.name')

    return dishes
  }

  async delete(id) {
    const deletedDish = await this.dishes.where({ id }).delete()

    return deletedDish
  }
}