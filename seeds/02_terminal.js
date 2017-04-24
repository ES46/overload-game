
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('terminal').del()
    .then(function () {
      // Inserts seed entries
      return knex('terminal').insert([
        {
          user_id: 1,
          timer: 100
        },
        {
          user_id: 2,
          timer: 100

        },
        {
          user_id: 3,
          timer: 100
        }
      ]);
    });
};
