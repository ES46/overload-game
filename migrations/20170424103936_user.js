
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_table', (table) => {
    table.increments()
    table.integer('score')
    table.string('username')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_table')
};
