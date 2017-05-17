exports.up = (knex, Promise) => {
	return knex.schema.createTable('player', table => {
		table.increments()
		table.string('playername')
		table.integer('score').defaultTo(0)
		table.string('password')
	})
}

exports.down = (knex, Promise) => {
	return knex.schema.dropTableIfExists('player')
}
