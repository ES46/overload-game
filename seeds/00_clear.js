exports.seed = (knex, Promise) => {
	// Deletes ALL existing entries
	return knex('game').del()
	.then(() => {	
		return knex('board').del()
	})
	.then(() => {
		return knex('player').del()
	}) 
}
