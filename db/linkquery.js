const pg = require('./knex')

function getUser(id) {
  return pg('player').select().where('id', id)
}

function addUser(obj) {
  return pg('player').insert(obj)
}

function findUserIfExists(obj){
  return pg('player').select().where(obj).first()
}

function userTable(obj) {
  return pg('player').insert({
    playername: obj.email,
    password: obj.password
  })
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
  addUser,
  userTable,
  findUserIfExists
};
