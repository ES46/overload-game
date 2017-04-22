
exports.up = function(knex, Promise) {
  return knex.schema.createTable('terminal', (table) => {
    table.increments()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('terminal')
};
