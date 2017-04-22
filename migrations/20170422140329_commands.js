
exports.up = function(knex, Promise) {
  return knex.schema.createTable('commands', (table) => {
    table.increment()
    table.string('color')
    table.string('shape')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('commands')
};
