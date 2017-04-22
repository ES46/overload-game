
exports.up = function(knex, Promise) {
  return knex.schema.createTable('board', (table) => {
    table.increment()
    table.string('button1')
    table.string('button2')
    table.string('button3')
    table.string('button4')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('board')
};
