const pg = require('./knex')

function getUser(id) {
  return pg('player').select().where('id', id)
}

function addUser(obj) {
  return pg('player').insert(obj)
}

// function getNewId(id) {
//   return pg('player').select().where('id', id)
// }
//
// function getGoogleId(obj) {
//   return pg('player').insert(obj)
// }
//
module.exports = {
  getUser,
  addUser
};
