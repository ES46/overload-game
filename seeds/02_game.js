
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game').del()
    .then(function () {
      // Inserts seed entries
      return knex('game').insert([
        {
          user_id: 1,
          terminal_id: 1
        },
        {
          user_id: 1,
          terminal_id: 1
        },
        {
          user_id: 1,
          terminal_id: 1
        }
      ]);
    });
};
