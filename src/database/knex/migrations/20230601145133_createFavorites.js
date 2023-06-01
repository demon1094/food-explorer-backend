export function up(knex) {
  return knex.schema.createTable('favorites', table => {
    table.increments('id')
    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE')
    table.integer('user_id').references('id').inTable('users')
  })
}

export function down(knex) {
  return knex.schema.dropTable('favorites')
}
