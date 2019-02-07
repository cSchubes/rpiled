
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('Colors', function (table){
    table.string('hex').unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn('hex');
};
