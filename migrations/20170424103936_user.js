
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments()
    table.integer('score')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user')
};
