
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game').del()
    .then(function () {
      // Inserts seed entries
      return knex('game').insert([
        {
          board_id: 1,
          playername_id: 1,

        },
        {
          board_id: 2,
          playername_id: 2,

        },
        {
          board_id: 3,
          playername_id: 3,

        },
        {
          board_id: 4,
          playername_id: 4,

        }
      ]);
    });
};
