
exports.up = function(knex, Promise) {
  return knex.schema.createTable('game', (table) => {
    table.increments()
    table.json('user_id').references('user.id')
    table.integer('terminal_id').references('terminal.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('game')
};
