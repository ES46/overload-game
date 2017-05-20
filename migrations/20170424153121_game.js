exports.up = function(knex, Promise){
	return knex.schema.createTable('board', table => {
		table.increments();
		table.integer('playername_id').references('player.id');
		table.boolean('set1');
		table.boolean('set2');
	});
}

exports.down = function(knex, Promise){
	return knex.schema.dropTableIfExists('board');
}
