
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Templates', function (table){
    table.increments('id');
    table.string('name').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Templates');
};
