
exports.up = function(knex, Promise) {
  return knex.schema.table('Templates', function (table){
    table.string('defaults')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Templates', function (table) {
    table.dropColumn('defaults');
  })
};
