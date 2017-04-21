const config = require('../knexfile')

const environment = process.env.NODE_ENV || 'development'
const connection = config[environment]

const pg = require('knex')(connection)

module.exports = pg
