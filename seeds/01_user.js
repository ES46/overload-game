
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_table').insert([
        {
          score: 1000,
          username: 'john'
        },
        {
          score: 1231241,
          username: 'phil'
        },
        {
          score: 2,
          username: 'dude'
        }
      ]);
    });
};
