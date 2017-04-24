
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('player').del()
    .then(function () {
      // Inserts seed entries
      return knex('player').insert([
        {
          id:1,
          playername: 'nick',
          score: 2
        },
        {
          id:2,
          playername: 'lee',
          score: 2
        },
        {
          id:3,
          playername: 'derek',
          score: 2
        },
        {
          id:4,
          playername: 'Lena',
          score: 2
        }
      ]);
    });
};
