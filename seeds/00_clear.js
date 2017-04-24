
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game').del()
    .then(function () {
      // Inserts seed entries
      return knex('board').del()
      .then(function () {
        return knex('player').del()
      })
    });
};
