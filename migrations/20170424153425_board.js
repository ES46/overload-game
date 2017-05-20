exports.up = function(knex, Promise){
	return knex.schema.createTable('game', table => {
		table.increments();
		table.integer('playername_id').references('player.id');
		table.integer('board_id').references('board.id');
	});
}

exports.down = function(knex, Promise){
	return knex.schema.dropTableIfExists('game');
}
