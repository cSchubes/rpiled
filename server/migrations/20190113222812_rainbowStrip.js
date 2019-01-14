
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rainbowStrip', function (table){
    table.integer('id');
    table.foreign('id').references('Animations.id');
    table.integer('time').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rainbowGradient');
};
