
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments()
    table.boolean('set1')
    table.boolean('set2')
    table.json('commands')
    // table.integer('user_id').references('user_table.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('roles')
};
