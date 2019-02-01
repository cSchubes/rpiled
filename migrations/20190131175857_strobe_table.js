
exports.up = function(knex, Promise) {
  return knex.schema.createTable('strobe', function (table){
    table.integer('id');
    table.foreign('id').references('Animations.id');
    table.integer('time').notNull();
    table.integer('color').notNull();
    table.integer('brightness').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('strobe');
};
