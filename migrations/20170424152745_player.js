exports.up = function(knex, Promise){
	return knex.schema.createTable('player', table => {
		table.increments();
		table.string('playername');
		table.integer('score').defaultTo(0);
		table.string('password');
	});
}

exports.down = function(knex, Promise){
	return knex.schema.dropTableIfExists('player');
}
