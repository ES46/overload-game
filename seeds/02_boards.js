
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('board').del()
    .then(function () {
      // Inserts seed entries
      return knex('board').insert([
        {
          id: 1,
          playername_id: 1,
          set1: true,
          set2: false
        },
        {
          id: 2,
          playername_id: 2,
          set1: true,
          set2: false
        },
        {
          id: 3,
          playername_id: 3,
          set1: true,
          set2: false
        },
        {
          id: 4,
          playername_id: 4,
          set1: true,
          set2: false
        }
      ]);
    });
};
