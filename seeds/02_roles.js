
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {
          set1:true,
          set2:false,
          user_id: 1
        },
        {
          set1:false,
          set2:true,
          user_id: 2
        },
        {
          set1:true,
          set2:false,
          user_id: 3
        }
      ]);
    });
};
