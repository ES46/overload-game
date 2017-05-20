exports.seed = (knex, Promise) => {
	return knex('game').del()
	.then(() => {
		return knex('board').del();
	})
	.then(() => {
		return knex('player').del();
	});
}
