
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Animations', function (table){
    table.increments('id');
    table.string('name').notNull();
    table.string('template').notNull();
    table.boolean('favorite').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Animations');
};
