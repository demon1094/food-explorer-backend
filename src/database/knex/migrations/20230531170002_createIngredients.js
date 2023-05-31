export function up(knex) {
  return knex.schema.createTable('ingredients', table => {
    table.increments('id')
    table.text('name')
    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE')
  })
}

export function down(knex) {
  return knex.schema.dropTable('ingredients')
}