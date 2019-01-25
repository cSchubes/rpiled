
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Colors', function (table){
    table.increments('id');
    table.integer('r').notNull();
    table.integer('g').notNull();
    table.integer('b').notNull();
    table.boolean('favorite');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Colors');
};
