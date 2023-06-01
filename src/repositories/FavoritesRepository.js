import knex from '../database/knex/index.js'

export class FavoritesRepository {
  constructor() {
    this.favorites = knex('favorites')
  }

  async findByDishId(dish_id) {
    const favoriteDish = await this.favorites.where({ dish_id }).first()

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
    .where({ user_id })
    .orderBy('id')

    return userFavoriteDishes
  }

  async delete(id) {
    const deletedFavorite = await this.favorites.where({ id }).first().delete()

    return deletedFavorite
  }
}