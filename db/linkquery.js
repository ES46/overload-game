const pg = require('./knex')

function getUser(id) {
  return pg('user').select().where('id', id)
}

module.exports = {
  getUser
};
