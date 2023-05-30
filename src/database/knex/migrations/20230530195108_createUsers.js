export function up(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.text('name')
    table.text('email')
    table.text('password')
    table.boolean('isAdmin').default(false)
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })
}

export function down(knex) {
  return knex.schema.dropTable('users')
}