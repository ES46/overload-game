
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increment()
    table.string('username')
    table.string('password')
    table.integer('highscore')
  })
};

exports.down = function(knex, Promise) {

};
