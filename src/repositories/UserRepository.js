import knex from '../database/knex/index.js'

export class UserRepository {
  constructor() {
    this.users = knex('users')
  }

  async findByEmail(email) {
    const user = await this.users.where({ email }).first()

    return user
  }
  
  async findById(id) {
    const user = await this.users.where({ id }).first()

    return user
  }

  async create({ name, email, password }) {
    const user_id = await this.users.insert({
      name,
      email,
      password
    })

    return { id: user_id }
  }

  async update({ id, name, email, password }) {
    const userUpdated = await this.users
    .where({ id })
    .update({
      name,
      email,
      password,
      updated_at: knex.fn.now()
    })

    return userUpdated
  }

  async delete(id) {
    const userDeleted = await this.users.where({ id }).delete()

    return userDeleted
  }
}