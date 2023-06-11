import knex from '../database/knex/index.js'

export class FavoritesRepository {
  constructor() {
    this.favorites = knex('favorites')
  }

  async findById({ dish_id, user_id }) {
    const favoriteDish = await this.favorites
    .where({ dish_id })
    .andWhere({ user_id })
    .first()

    return favoriteDish
  }

  async create({ dish_id, user_id }) {
    const favorite_id = await this.favorites.insert({
      dish_id,
      user_id
    })

    return favorite_id
  }

  async index(user_id) {
    const userFavoriteDishes = await this.favorites
    .select([
      'dishes.id',
      'dishes.name',
      'dishes.image'
    ])
    .where({ user_id })
    .innerJoin('dishes', 'dishes.id', 'favorites.dish_id')
    .orderBy('favorites.id')

    return userFavoriteDishes
  }

  async show(dish_id, user_id) {
    const favoriteDish = await this.favorites
    .where({ dish_id })
    .where({ user_id })

    return favoriteDish
  }

  async delete(dish_id, user_id) {
    const deletedFavorite = await this.favorites
    .where({ dish_id })
    .andWhere({ user_id })
    .first()
    .delete()

    return deletedFavorite
  }
}