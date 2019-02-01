
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meteor', function (table){
    table.integer('id');
    table.foreign('id').references('Animations.id');
    table.integer('time').notNull();
    table.integer('color').notNull();
    table.integer('meteors').notNull();
    table.integer('size').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meteor');
};
