export function up(knex) {
  return knex.schema.createTable('dishes', table => {
    table.increments('id')
    table.text('name')
    table.integer('price')
    table.text('description')
    table.text('category')
    table.text('image')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })
}

export function down(knex) {
  return knex.schema.dropTable('dishes')
}