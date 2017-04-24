
exports.up = function(knex, Promise) {
  return knex.schema.createTable('terminal', (table) => {
    table.increments()
    table.integer('user_id').references('user.id')
    table.json('commands')
    table.integer('timer')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('terminal')
};
