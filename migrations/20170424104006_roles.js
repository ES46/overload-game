
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments()
    table.json('set1')
    table.json('set2')
    table.integer('user_id').references('user.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('roles')
};
