export function up(knex) {
  return knex.schema.createTable('orders', table => {
    table.increments('id')
    table.integer('user_id').references('id').inTable('users')
    table.text('description')
    table.text('status').default('pending')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })
}

export function down(knex) {
  return knex.schema.dropTable('orders')
}